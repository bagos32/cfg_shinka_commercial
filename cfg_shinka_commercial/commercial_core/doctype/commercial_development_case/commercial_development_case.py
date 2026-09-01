import frappe
from frappe.model.document import Document
from frappe.utils import nowdate


class CommercialDevelopmentCase(Document):
    def validate(self):
        self.validate_closure()

    def validate_closure(self):
        if self.status == "Closed":
            if not self.closed_date:
                frappe.throw("Closed Date is required when status is Closed.")

            if not self.closure_reason:
                frappe.throw("Closure Reason is required when status is Closed.")

        elif self.status == "Cancelled":
            if not self.closure_reason:
                frappe.throw("Closure Reason is required when status is Cancelled.")

        else:
            if self.closed_date:
                frappe.throw(
                    "Closed Date must be empty unless status is Closed."
                )

        if self.closed_date and self.opened_date and self.closed_date < self.opened_date:
            frappe.throw("Closed Date cannot be earlier than Opened Date.")
