import json

import frappe
from frappe.utils import nowdate

from cfg_shinka_commercial.platform_administration.geospatial import (
    active_territory_geography,
    parse_geolocation,
    point_in_boundary,
)


def _feature(geometry_type, coordinates):
    return json.dumps({"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {}, "geometry": {"type": geometry_type, "coordinates": coordinates}}]})


def run():
    """Run a rollback-safe GEO-1 metadata and behaviour check."""
    report = {"status": "RUNNING", "checks": [], "temporary_records": {}}
    savepoint = "cfg_geo_1_verification"
    frappe.db.savepoint(savepoint)
    try:
        _verify_metadata(report)
        territory = _find_territory()
        geography = _insert(report, {
            "doctype": "CFG Territory Geography", "territory": territory,
            "boundary_name": "GEO-1 temporary verification boundary", "status": "Active",
            "boundary_version": 1, "boundary_source": "Automated rollback-safe verification",
            "confidence_level": "Operationally Confirmed", "effective_from": nowdate(),
            "boundary_geometry": _feature("Polygon", [[[101.0, 3.0], [102.0, 3.0], [102.0, 4.0], [101.0, 4.0], [101.0, 3.0]]]),
        })
        place = _insert(report, {
            "doctype": "CFG Place", "place_name": "GEO-1 temporary place", "place_type": "Outlet",
            "status": "Active", "territory": territory, "location_source": "Map Selection",
            "location": _feature("Point", [101.5, 3.5]),
        })
        if place.boundary_validation_status != "Inside Territory" or place.territory_geography != geography.name:
            frappe.throw("The reusable place was not validated inside its active territory boundary.")
        if place.longitude != 101.5 or place.latitude != 3.5:
            frappe.throw("Point coordinates were not derived correctly.")
        report["checks"].append("Reusable Place validates a point inside the active territory boundary")

        stored_place = frappe.get_doc("CFG Place", place.name)
        stored_geography = active_territory_geography(territory)
        if stored_place.territory_geography != geography.name:
            frappe.throw("CFG Place did not persist its governed Territory Geography link.")
        if not stored_geography or stored_geography.name != geography.name:
            frappe.throw("The newly inserted active territory boundary cannot be resolved in this transaction.")
        report["checks"].append("Governed boundary links persist and resolve within the transaction")

        company = frappe.db.get_value("Company", {}, "name")
        if not company:
            frappe.throw("Verification prerequisite missing: at least one Company is required.")
        observation = _insert(report, {
            "doctype": "Field Observation", "observation_date": nowdate(), "status": "Reviewed",
            "observer": "Administrator", "company": company, "cfg_place": place.name,
            "observation_type": "Availability", "observed_condition": "GEO-1 temporary verification observation.",
        })
        observation_geometry = parse_geolocation(observation.location, "Field Observation Location")
        place_geometry = parse_geolocation(place.location, "CFG Place Location")
        if observation_geometry != place_geometry:
            frappe.throw("Field Observation did not inherit its reusable place geometry.")
        if observation.boundary_validation_status != "Inside Territory":
            frappe.throw(
                "Field Observation inherited the location but boundary validation returned "
                f"{observation.boundary_validation_status}."
            )
        report["checks"].append("Field Observation reuses and validates governed place geometry")

        outside = _insert(report, {
            "doctype": "CFG Place", "place_name": "GEO-1 outside-point verification", "place_type": "Other",
            "status": "Draft", "territory": territory, "location_source": "Operational Estimate",
            "location": _feature("Point", [103.0, 5.0]),
        })
        if outside.boundary_validation_status != "Outside Territory" or not outside.territory_review_required:
            frappe.throw("Outside-territory points must be retained and flagged for review.")
        report["checks"].append("Outside-territory locations warn and require review without being blocked")

        if point_in_boundary([101.0, 3.5], geography.boundary_geometry) != "On Boundary":
            frappe.throw("Boundary-edge classification is incorrect.")
        if point_in_boundary([101.5, 4.5], geography.boundary_geometry) != "Outside Territory":
            frappe.throw("Outside-boundary classification is incorrect.")
        report["checks"].append("Point-in-polygon classification covers inside, edge and outside points")
    except Exception:
        frappe.db.rollback(save_point=savepoint)
        raise
    frappe.db.rollback(save_point=savepoint)
    for doctype, names in report["temporary_records"].items():
        for name in names:
            if frappe.db.exists(doctype, name):
                frappe.throw(f"Rollback failed for {doctype} {name}.")
    report["checks"].append("All GEO-1 temporary records were rolled back")
    report["status"] = "PASSED"
    report["summary"] = f"{len(report['checks'])} GEO-1 checks passed; test records rolled back."
    return report


def _verify_metadata(report):
    for doctype in ("CFG Territory Geography", "CFG Place", "Field Observation"):
        if not frappe.db.exists("DocType", doctype):
            frappe.throw(f"Missing GEO-1 DocType: {doctype}")
    labels = set(frappe.get_all("Workspace Link", filters={"parent": "CFG Shinka Commercial"}, pluck="label"))
    required = {"Geospatial Foundation", "Territory Geography", "Reusable Place"}
    if required - labels:
        frappe.throw("CFG Shinka Commercial Workspace is missing GEO-1 links.")
    report["checks"].append("GEO-1 DocTypes and Workspace links are installed")

    required_fields = {
        "CFG Territory Geography": {"territory", "boundary_geometry", "status"},
        "CFG Place": {"territory", "location", "territory_geography", "boundary_validation_status"},
        "Field Observation": {"cfg_place", "location", "territory_geography", "boundary_validation_status"},
    }
    for doctype, expected in required_fields.items():
        installed = set(frappe.get_all("DocField", filters={"parent": doctype}, pluck="fieldname"))
        if expected - installed:
            frappe.throw(f"{doctype} is missing GEO-1 fields: {', '.join(sorted(expected - installed))}")
    if not frappe.db.exists(
        "DocPerm",
        {"parent": "CFG Territory Geography", "role": "CFG Market Intelligence Manager", "read": 1, "write": 1, "create": 1},
    ):
        frappe.throw("CFG Territory Geography permissions are incomplete.")
    report["checks"].append("GEO-1 fields and operational permissions are installed")


def _find_territory():
    active = set(frappe.get_all("CFG Territory Geography", filters={"status": "Active"}, pluck="territory"))
    for territory in frappe.get_all("Territory", filters={"is_group": 0}, pluck="name"):
        if territory not in active:
            return territory
    frappe.throw("Verification needs one leaf Territory without an active CFG Territory Geography.")


def _insert(report, values):
    document = frappe.get_doc(values).insert(ignore_permissions=True)
    report["temporary_records"].setdefault(document.doctype, []).append(document.name)
    return document
