import frappe
from frappe.model.document import Document
from frappe.utils import date_diff, getdate, nowdate


class MarketVacuum(Document):
    def before_validate(self):
        self.apply_case_defaults()
        self.apply_status_defaults()
        self.calculate_recovery_time()

    def validate(self):
        self.validate_architecture_links()
        self.validate_dates()
        self.validate_verification()
        self.validate_oem_control()

    def apply_case_defaults(self):
        if not self.commercial_development_case:
            return

        case = frappe.get_doc("Commercial Development Case", self.commercial_development_case)
        defaults = {
            "company": case.company,
            "territory": case.territory,
            "item": case.primary_item,
            "item_group": case.item_group,
            "business_owner": case.business_owner,
            "priority": case.priority,
        }
        for fieldname, value in defaults.items():
            if not self.get(fieldname) and value:
                self.set(fieldname, value)

    def apply_status_defaults(self):
        if self.status in {"Verified", "Qualified", "Response Designed", "Pilot Active", "Recovered", "Closed"}:
            if not self.verified_date:
                self.verified_date = nowdate()

        if self.status == "Recovered" and not self.recovery_date:
            self.recovery_date = nowdate()

    def calculate_recovery_time(self):
        if self.verified_date and self.recovery_date:
            self.recovery_days = date_diff(self.recovery_date, self.verified_date)
        else:
            self.recovery_days = None

    def validate_architecture_links(self):
        if not frappe.db.exists("Commercial Development Case", self.commercial_development_case):
            frappe.throw("A valid Commercial Development Case is required.")

        if self.commercial_opportunity:
            opportunity_case = frappe.db.get_value(
                "Commercial Opportunity", self.commercial_opportunity, "commercial_development_case"
            )
            if opportunity_case != self.commercial_development_case:
                frappe.throw("Commercial Opportunity must belong to the selected Commercial Development Case.")

        if self.pilot:
            pilot_opportunity = frappe.db.get_value("Pilot", self.pilot, "commercial_opportunity")
            if not self.commercial_opportunity or pilot_opportunity != self.commercial_opportunity:
                frappe.throw("Pilot must belong to the selected Commercial Opportunity.")

    def validate_dates(self):
        if self.verified_date and getdate(self.verified_date) < getdate(self.detection_date):
            frappe.throw("Verified Date cannot be earlier than Detection Date.")
        if self.recovery_date and not self.verified_date:
            frappe.throw("Verified Date is required before Recovery Date.")
        if self.recovery_date and getdate(self.recovery_date) < getdate(self.verified_date):
            frappe.throw("Recovery Date cannot be earlier than Verified Date.")

    def validate_verification(self):
        controlled_statuses = {"Verified", "Qualified", "Response Designed", "Pilot Active", "Recovered", "Closed"}
        if self.status in controlled_statuses:
            if not self.demand_validated:
                frappe.throw("Demand must be validated before the Market Vacuum can progress beyond verification.")
            if not self.verification_summary:
                frappe.throw("Verification Summary is required after verification.")

        if self.status in {"Qualified", "Response Designed", "Pilot Active", "Recovered"} and not self.commercial_opportunity:
            frappe.throw("Commercial Opportunity is required when a Market Vacuum is qualified for response.")

        if self.status in {"Response Designed", "Pilot Active", "Recovered"} and not self.response_strategy:
            frappe.throw("Channel Response Strategy is required before response execution.")

        if self.status == "Pilot Active" and not self.pilot:
            frappe.throw("Pilot is required when status is Pilot Active.")
        if self.status == "Pilot Active" and self.pilot:
            pilot_status = frappe.db.get_value("Pilot", self.pilot, "status")
            if pilot_status not in {"Approved for Launch", "Active"}:
                frappe.throw("Pilot must be approved for launch or active before the Market Vacuum is Pilot Active.")

        if self.status == "Recovered" and not self.recovery_summary:
            frappe.throw("Recovery Summary is required when status is Recovered.")

    def validate_oem_control(self):
        if self.oem_conflict_classification in {"Amber", "Red"} and not self.oem_review_summary:
            frappe.throw("OEM Review Summary is required for Amber or Red classifications.")

        controlled_statuses = {"Response Designed", "Pilot Active", "Recovered"}
        if self.oem_conflict_classification not in {"Amber", "Red"} or self.status not in controlled_statuses:
            return

        if not self.oem_governance_decision:
            frappe.throw(
                "An active OEM Governance Decision is required before an Amber or Red conflict can proceed."
            )

        decision = frappe.get_doc("Decision Record", self.oem_governance_decision)
        if decision.decision_type not in {"Gate Decision", "Management Decision", "Risk Decision"}:
            frappe.throw("OEM Governance Decision must be a gate, management or risk decision.")
        if decision.status != "Active" or decision.decision not in {"Proceed", "Approve for Pilot Preparation"}:
            frappe.throw("OEM Governance Decision must be active and authorize the response to proceed.")
        if decision.commercial_development_case != self.commercial_development_case:
            frappe.throw("OEM Governance Decision must belong to the selected Commercial Development Case.")
        if self.commercial_opportunity and decision.commercial_opportunity != self.commercial_opportunity:
            frappe.throw("OEM Governance Decision must belong to the selected Commercial Opportunity.")
