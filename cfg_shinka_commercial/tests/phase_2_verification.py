import frappe
from frappe.utils import add_days, nowdate


PHASE_2_DOCTYPES = (
    "Market Vacuum",
    "Channel Resilience Assessment",
    "Access Point",
    "Customer Redirection",
)


def run():
    """Run a rollback-safe Phase 2 integration check on a Frappe site."""
    report = {"status": "RUNNING", "checks": [], "temporary_records": {}}
    savepoint = "cfg_phase_2_verification"
    frappe.db.savepoint(savepoint)

    try:
        _verify_metadata(report)
        context = _load_context(report)
        records = _create_lifecycle(context, report)
        _verify_results(records, report)
    except Exception:
        frappe.db.rollback(save_point=savepoint)
        raise

    frappe.db.rollback(save_point=savepoint)
    _verify_rollback(report)
    report["status"] = "PASSED"
    report["summary"] = f"{len(report['checks'])} Phase 2 checks passed; test records rolled back."
    return report


def _verify_metadata(report):
    missing = [doctype for doctype in PHASE_2_DOCTYPES if not frappe.db.exists("DocType", doctype)]
    if missing:
        frappe.throw(f"Missing Phase 2 DocTypes: {', '.join(missing)}")

    expected_modules = {
        "Market Vacuum": "Market Vacuum",
        "Channel Resilience Assessment": "Market Vacuum",
        "Access Point": "Customer Access",
        "Customer Redirection": "Customer Access",
    }
    for doctype, expected_module in expected_modules.items():
        actual_module = frappe.db.get_value("DocType", doctype, "module")
        if actual_module != expected_module:
            frappe.throw(f"{doctype} belongs to {actual_module}, expected {expected_module}.")

    report["checks"].append("Phase 2 DocTypes and modules are installed")

    expected_roles = {
        "Market Vacuum": "CFG Commercial User",
        "Channel Resilience Assessment": "CFG Commercial User",
        "Access Point": "CFG Commercial User",
        "Customer Redirection": "CFG Market Intelligence User",
    }
    for doctype, role in expected_roles.items():
        permission = frappe.db.exists(
            "DocPerm",
            {"parent": doctype, "role": role, "read": 1, "write": 1, "create": 1},
        )
        if not permission:
            frappe.throw(f"{doctype} is missing operational permission for {role}.")

    report["checks"].append("Phase 2 operational role permissions are installed")


def _load_context(report):
    company = frappe.db.get_value("Company", {}, "name")
    customer = frappe.db.get_value("Customer", {"disabled": 0}, "name")

    if not company:
        frappe.throw("Verification prerequisite missing: at least one Company is required.")
    if not customer:
        frappe.throw("Verification prerequisite missing: at least one enabled Customer is required.")

    territory = frappe.db.get_value("Territory", {"is_group": 0}, "name")
    item = frappe.db.get_value("Item", {"disabled": 0}, ["name", "item_group"], as_dict=True)
    report["checks"].append("Reusable Company and Customer prerequisites are available")

    return {
        "company": company,
        "customer": customer,
        "territory": territory,
        "item": item.name if item else None,
        "item_group": item.item_group if item else None,
        "owner": "Administrator",
        "today": nowdate(),
    }


def _insert(report, values):
    document = frappe.get_doc(values).insert(ignore_permissions=True)
    report["temporary_records"][document.doctype] = document.name
    return document


def _create_lifecycle(context, report):
    case = _insert(
        report,
        {
            "doctype": "Commercial Development Case",
            "case_title": "Phase 2 automated verification",
            "status": "Open",
            "case_type": "Channel Development",
            "priority": "High",
            "opened_date": context["today"],
            "business_owner": context["owner"],
            "business_condition": "Verified customer demand has insufficient practical product access.",
            "desired_outcome": "Restore access through multiple independent buying points.",
            "company": context["company"],
            "customer": context["customer"],
            "territory": context["territory"],
            "primary_item": context["item"],
            "item_group": context["item_group"],
        },
    )

    opportunity = _insert(
        report,
        {
            "doctype": "Commercial Opportunity",
            "opportunity_title": "Phase 2 access recovery verification",
            "commercial_development_case": case.name,
            "status": "Qualified",
            "opportunity_type": "Channel Recovery",
            "priority": "High",
            "business_owner": context["owner"],
            "identified_date": context["today"],
            "opportunity_description": "Develop resilient alternative product access.",
            "proposed_commercial_response": "Activate and verify multiple independent access points.",
            "company": context["company"],
            "customer": context["customer"],
            "territory": context["territory"],
            "item": context["item"],
            "item_group": context["item_group"],
        },
    )

    vacuum = _insert(
        report,
        {
            "doctype": "Market Vacuum",
            "vacuum_title": "Phase 2 automated market-vacuum verification",
            "status": "Qualified",
            "vacuum_type": "MV-F — Channel Displacement Gap",
            "priority": "High",
            "detection_date": add_days(context["today"], -2),
            "verified_date": context["today"],
            "business_owner": context["owner"],
            "company": context["company"],
            "commercial_development_case": case.name,
            "commercial_opportunity": opportunity.name,
            "demand_validated": 1,
            "verification_summary": "Temporary integration record confirms a validated access gap.",
            "affected_outlet": "Automated verification outlet",
            "territory": context["territory"],
            "item": context["item"],
            "item_group": context["item_group"],
            "single_channel_dependency": 1,
            "oem_conflict_classification": "Green",
        },
    )

    access_point = _insert(
        report,
        {
            "doctype": "Access Point",
            "access_point_name": "Phase 2 automated access point",
            "status": "Active",
            "access_type": "Independent Retailer",
            "customer": context["customer"],
            "company": context["company"],
            "territory": context["territory"],
            "availability_status": "Available",
            "item": context["item"],
            "item_group": context["item_group"],
            "activation_date": context["today"],
            "last_verified_date": context["today"],
            "market_vacuum": vacuum.name,
            "commercial_opportunity": opportunity.name,
            "approved_for_redirection": 1,
            "verification_notes": "Temporary integration record; transaction will be rolled back.",
        },
    )

    assessment = _insert(
        report,
        {
            "doctype": "Channel Resilience Assessment",
            "assessment_date": context["today"],
            "market_vacuum": vacuum.name,
            "commercial_development_case": case.name,
            "company": context["company"],
            "territory": context["territory"],
            "assessment_scope": "Automated Phase 2 verification area",
            "current_access_points": 3,
            "practical_independent_access_points": 2,
            "target_independent_access_points": 4,
            "finding_summary": "Coverage remains below the controlled target.",
            "assessor": context["owner"],
        },
    )

    enquiry = _insert(
        report,
        {
            "doctype": "Customer Enquiry",
            "enquiry_date": context["today"],
            "status": "Recorded",
            "enquiry_channel": "Phone",
            "customer": context["customer"],
            "customer_area": "Automated verification area",
            "territory": context["territory"],
            "requested_item": context["item"],
            "requested_item_group": context["item_group"],
            "availability_problem": 1,
            "enquiry_details": "Customer requests an accessible CFG buying point.",
            "alternative_outlet_provided": 1,
            "company": context["company"],
            "business_owner": context["owner"],
        },
    )

    redirection = _insert(
        report,
        {
            "doctype": "Customer Redirection",
            "request_date": context["today"],
            "redirection_date": context["today"],
            "status": "Closed",
            "customer_enquiry": enquiry.name,
            "market_vacuum": vacuum.name,
            "access_point": access_point.name,
            "company": context["company"],
            "redirection_channel": "Phone",
            "alternative_options_provided": 1,
            "message_summary": "Customer was given a verified active buying point.",
            "outcome": "Customer Reached",
            "outcome_evidence": "Automated verification confirmed that the customer was reached.",
            "handled_by": context["owner"],
        },
    )

    report["checks"].append("Case and Commercial Opportunity architecture remains usable")
    report["checks"].append("Market Vacuum accepted a validated qualified response")
    report["checks"].append("Approved active Access Point accepted customer redirection")
    return {
        "case": case,
        "opportunity": opportunity,
        "vacuum": vacuum,
        "access_point": access_point,
        "assessment": assessment,
        "enquiry": enquiry,
        "redirection": redirection,
    }


def _verify_results(records, report):
    assessment = records["assessment"]
    if assessment.customer_access_resilience != 50:
        frappe.throw("Customer Access Resilience calculation did not produce 50%.")
    if assessment.dependency_gap != 2 or assessment.resilience_rating != "Vulnerable":
        frappe.throw("Channel dependency calculation did not produce the expected result.")

    redirection = records["redirection"]
    if redirection.response_days != 0:
        frappe.throw("Same-day customer redirection should have a response time of zero days.")

    report["checks"].append("Channel resilience percentage, gap and rating are correct")
    report["checks"].append("Customer redirection response time is correct")

    blocked_vacuum = frappe.new_doc("Market Vacuum")
    blocked_vacuum.status = "Response Designed"
    blocked_vacuum.oem_conflict_classification = "Red"
    blocked_vacuum.oem_review_summary = "A material OEM conflict requires governance authorization."
    try:
        blocked_vacuum.validate_oem_control()
    except frappe.ValidationError:
        report["checks"].append("Red OEM conflict is blocked without governance authorization")
    else:
        frappe.throw("Red OEM conflict was not blocked without governance authorization.")


def _verify_rollback(report):
    residual = []
    for doctype, name in report["temporary_records"].items():
        if frappe.db.exists(doctype, name):
            residual.append(f"{doctype} {name}")

    if residual:
        frappe.throw(f"Temporary verification records were not rolled back: {', '.join(residual)}")

    report["checks"].append("All temporary verification records were rolled back")
