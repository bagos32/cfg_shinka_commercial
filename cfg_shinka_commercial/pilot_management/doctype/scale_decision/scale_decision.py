import frappe
from frappe.model.document import Document


class ScaleDecision(Document):
    def before_validate(self):
        self.apply_pilot_defaults()

    def validate(self):
        self.validate_review_consistency()
        self.validate_relationships()

    def apply_pilot_defaults(self):
        if not self.pilot:
            return

        pilot = frappe.get_doc("Pilot", self.pilot)

        if not self.commercial_opportunity:
            self.commercial_opportunity = pilot.commercial_opportunity

        if not self.commercial_development_case:
            self.commercial_development_case = (
                pilot.commercial_development_case
            )

    def validate_review_consistency(self):
        if not self.pilot_review:
            return

        review_pilot = frappe.db.get_value(
            "Pilot Review",
            self.pilot_review,
            "pilot",
        )

        if review_pilot != self.pilot:
            frappe.throw(
                "Pilot Review must belong to the same Pilot."
            )

    def validate_relationships(self):
        if not self.pilot:
            return

        pilot = frappe.get_doc("Pilot", self.pilot)

        if self.commercial_opportunity != pilot.commercial_opportunity:
            frappe.throw(
                "Scale Decision Commercial Opportunity must match the Pilot."
            )

        if (
            self.commercial_development_case
            != pilot.commercial_development_case
        ):
            frappe.throw(
                "Scale Decision Commercial Development Case must match the Pilot."
            )
