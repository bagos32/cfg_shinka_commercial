import frappe
from frappe.model.document import Document


class ApprovalCondition(Document):
    def before_validate(self):
        self.apply_gate_review_defaults()

    def validate(self):
        self.validate_gate_review_consistency()

    def apply_gate_review_defaults(self):
        if not self.gate_review:
            return

        gate_review = frappe.get_doc(
            "Gate Review",
            self.gate_review,
        )

        if not self.commercial_opportunity:
            self.commercial_opportunity = gate_review.commercial_opportunity

    def validate_gate_review_consistency(self):
        if not self.gate_review or not self.commercial_opportunity:
            return

        gate_opportunity = frappe.db.get_value(
            "Gate Review",
            self.gate_review,
            "commercial_opportunity",
        )

        if gate_opportunity != self.commercial_opportunity:
            frappe.throw(
                "Approval Condition must belong to the same "
                "Commercial Opportunity as the Gate Review."
            )
