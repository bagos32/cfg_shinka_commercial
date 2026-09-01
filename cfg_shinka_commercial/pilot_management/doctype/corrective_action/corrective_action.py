import frappe
from frappe.model.document import Document
from frappe.utils import getdate, nowdate


class CorrectiveAction(Document):
    def before_validate(self):
        self.apply_completion_defaults()

    def validate(self):
        self.validate_completion()

    def apply_completion_defaults(self):
        if self.status == "Completed" and not self.completion_date:
            self.completion_date = nowdate()

    def validate_completion(self):
        if self.status == "Completed" and not self.completion_evidence:
            frappe.throw(
                "Completion Evidence is required for a completed Corrective Action."
            )

        if self.completion_date and self.issue_date:
            if getdate(self.completion_date) < getdate(self.issue_date):
                frappe.throw(
                    "Completion Date cannot be earlier than Issue Date."
                )
