import frappe
from frappe.model.document import Document
from frappe.utils import getdate


class AccessPoint(Document):
    def validate(self):
        self.validate_party()
        self.validate_relationships()
        self.validate_availability()
        self.validate_dates()

    def validate_party(self):
        if not self.customer and not self.lead:
            frappe.throw("Link either a Customer or a Lead to the Access Point.")
        if self.customer and self.lead:
            frappe.throw("An Access Point cannot link both a Customer and a Lead.")

    def validate_availability(self):
        if self.status == "Active" and not self.last_verified_date:
            frappe.throw("Last Verified Date is required for an active Access Point.")
        if self.status == "Active" and self.availability_status not in {"Available", "Limited"}:
            frappe.throw("An active Access Point must have Available or Limited availability.")
        if self.independence_group and not self.channel_owner_reference:
            frappe.throw("Channel Owner Reference is required when an Independence Group is used.")
        if self.approved_for_redirection and self.status != "Active":
            frappe.throw("Only an active Access Point can be approved for customer redirection.")

    def validate_relationships(self):
        vacuum = frappe.get_doc("Market Vacuum", self.market_vacuum) if self.market_vacuum else None

        if vacuum:
            self._require_match("company", vacuum.company, "Market Vacuum")
            self._require_match("territory", vacuum.territory, "Market Vacuum")
            self._require_match("item", vacuum.item, "Market Vacuum")
            if self.commercial_opportunity and vacuum.commercial_opportunity:
                self._require_match(
                    "commercial_opportunity", vacuum.commercial_opportunity, "Market Vacuum"
                )

        if self.pilot:
            pilot_opportunity = frappe.db.get_value("Pilot", self.pilot, "commercial_opportunity")
            if not self.commercial_opportunity or pilot_opportunity != self.commercial_opportunity:
                frappe.throw("Access Point Pilot must belong to its Commercial Opportunity.")

        if self.status in {"Approved", "Active"} and vacuum and vacuum.commercial_opportunity:
            if self.commercial_opportunity != vacuum.commercial_opportunity:
                frappe.throw("An approved or active Access Point must use the Market Vacuum opportunity.")

    def _require_match(self, fieldname, expected, source_label):
        value = self.get(fieldname)
        if value and expected and value != expected:
            frappe.throw(f"Access Point {self.meta.get_label(fieldname)} must match the {source_label}.")
        if not value and expected:
            self.set(fieldname, expected)

    def validate_dates(self):
        if self.activation_date and self.last_verified_date:
            if getdate(self.last_verified_date) < getdate(self.activation_date):
                frappe.throw("Last Verified Date cannot be earlier than Activation Date.")
