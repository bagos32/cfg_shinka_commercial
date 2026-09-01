import frappe
from frappe.model.document import Document


class CommercialAssessment(Document):
    def before_validate(self):
        self.apply_opportunity_defaults()

    def apply_opportunity_defaults(self):
        if not self.commercial_opportunity:
            return

        opportunity = frappe.get_doc(
            "Commercial Opportunity",
            self.commercial_opportunity,
        )

        if not self.commercial_development_case:
            self.commercial_development_case = (
                opportunity.commercial_development_case
            )
