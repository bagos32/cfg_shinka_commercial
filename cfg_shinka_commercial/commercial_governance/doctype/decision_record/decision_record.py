import frappe
from frappe.model.document import Document


class DecisionRecord(Document):
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

        if not self.commercial_development_case:
            self.commercial_development_case = (
                gate_review.commercial_development_case
            )

    def validate_gate_review_consistency(self):
        if not self.gate_review:
            return

        gate_review = frappe.get_doc(
            "Gate Review",
            self.gate_review,
        )

        if (
            self.commercial_opportunity
            and self.commercial_opportunity
            != gate_review.commercial_opportunity
        ):
            frappe.throw(
                "Decision Record must belong to the same "
                "Commercial Opportunity as the Gate Review."
            )

        if (
            self.commercial_development_case
            and self.commercial_development_case
            != gate_review.commercial_development_case
        ):
            frappe.throw(
                "Decision Record must belong to the same "
                "Commercial Development Case as the Gate Review."
            )
