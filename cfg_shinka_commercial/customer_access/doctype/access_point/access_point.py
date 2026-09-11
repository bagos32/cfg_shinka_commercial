import frappe
from frappe.model.document import Document
from frappe.utils import getdate


class AccessPoint(Document):
    def validate(self):
        self.validate_party()
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

    def validate_dates(self):
        if self.activation_date and self.last_verified_date:
            if getdate(self.last_verified_date) < getdate(self.activation_date):
                frappe.throw("Last Verified Date cannot be earlier than Activation Date.")
