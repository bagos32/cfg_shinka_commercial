import json

import frappe
from frappe.utils import nowdate


def _geo(geometry_type, coordinates):
    return json.dumps({"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":geometry_type,"coordinates":coordinates}}]})


def run():
    report = {"status":"RUNNING","checks":[],"temporary_records":{}}
    savepoint = "cfg_market_price_survey_verification"
    frappe.db.savepoint(savepoint)
    try:
        _verify_metadata(report)
        territory = _territory_without_boundary()
        company = frappe.db.get_value("Company", {}, ["name", "default_currency"], as_dict=True)
        if not company:
            frappe.throw("Verification prerequisite missing: at least one Company is required.")
        geography = _insert(report, {"doctype":"CFG Territory Geography","territory":territory,"boundary_name":"MPS temporary boundary","status":"Active","boundary_version":1,"boundary_source":"Rollback-safe verification","effective_from":nowdate(),"boundary_geometry":_geo("Polygon", [[[101,3],[102,3],[102,4],[101,4],[101,3]]])})
        place = _insert(report, {"doctype":"CFG Place","place_name":"MPS temporary outlet","place_type":"Outlet","status":"Active","territory":territory,"location_source":"Map Selection","location":_geo("Point", [101.5,3.5])})
        evidence_before = frappe.db.count("Evidence Record")
        cases_before = frappe.db.count("Commercial Development Case")
        survey = _insert(report, {
            "doctype":"Market Price Survey","survey_date":nowdate(),"observed_by":"Administrator",
            "company":company.name,"currency":company.default_currency or "MYR","status":"Verified",
            "cfg_place":place.name,"channel_type":"General Trade","visit_purpose":"Price verification",
            "price_observations":[
                {"product_type":"Competitor","brand":"Verification Brand","product_description":"500 ml verification product","pack_quantity":2,"pack_size":0.5,"price_status":"Observed","regular_shelf_price":10,"promotional_price":9,"promotion_present":1,"our_reference_price":12,"availability":"In Stock"},
                {"product_type":"Our Product","product_description":"Unavailable verification product","price_status":"Unavailable","availability":"Out of Stock"}
            ]
        })
        if survey.territory != territory or survey.territory_geography != geography.name or survey.boundary_validation_status != "Inside Territory":
            frappe.throw("Market Price Survey did not inherit and validate its governed place.")
        report["checks"].append("Survey reuses CFG Place and validates inside the active territory boundary")
        line = survey.price_observations[0]
        expected = (9, 9, -3, -25, "Below Our Reference")
        actual = (line.effective_observed_price, line.normalized_unit_price, line.price_difference, line.price_difference_percent, line.price_position)
        if actual != expected:
            frappe.throw(f"Price calculation mismatch: expected {expected}, received {actual}.")
        report["checks"].append("Promotion, normalized price and factual comparison calculations are correct")
        if not survey.verified_by or not survey.verified_on:
            frappe.throw("Verified survey did not record verification ownership and time.")
        report["checks"].append("Verified status records audit ownership and time")
        if frappe.db.count("Evidence Record") != evidence_before or frappe.db.count("Commercial Development Case") != cases_before:
            frappe.throw("Market Price Survey must not automatically create Evidence or Cases.")
        report["checks"].append("Survey preserves controlled Evidence and Case escalation")
    except Exception:
        frappe.db.rollback(save_point=savepoint)
        raise
    frappe.db.rollback(save_point=savepoint)
    for doctype, names in report["temporary_records"].items():
        for name in names:
            if frappe.db.exists(doctype, name):
                frappe.throw(f"Rollback failed for {doctype} {name}.")
    report["checks"].append("All temporary verification records were rolled back")
    report["status"] = "PASSED"
    report["summary"] = f"{len(report['checks'])} Market Price Survey checks passed; test records rolled back."
    return report


def _verify_metadata(report):
    for doctype in ("Market Price Survey", "Market Price Survey Line"):
        if not frappe.db.exists("DocType", doctype):
            frappe.throw(f"Missing DocType: {doctype}")
    labels = set(frappe.get_all("Workspace Link", filters={"parent":"CFG Shinka Commercial"}, pluck="label"))
    if "Market Price Survey" not in labels:
        frappe.throw("Workspace is missing the Market Price Survey link.")
    if not frappe.db.exists("DocPerm", {"parent":"Market Price Survey","role":"CFG Market Intelligence User","read":1,"write":1,"create":1}):
        frappe.throw("Market Price Survey operational permissions are incomplete.")
    report["checks"].append("DocTypes, Workspace access and operational permissions are installed")


def _territory_without_boundary():
    active = set(frappe.get_all("CFG Territory Geography", filters={"status":"Active"}, pluck="territory"))
    for name in frappe.get_all("Territory", filters={"is_group":0}, pluck="name"):
        if name not in active:
            return name
    frappe.throw("Verification needs one leaf Territory without an active boundary.")


def _insert(report, values):
    doc = frappe.get_doc(values).insert(ignore_permissions=True)
    report["temporary_records"].setdefault(doc.doctype, []).append(doc.name)
    return doc
