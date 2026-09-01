import frappe
from frappe.model.document import Document


class Pilot(Document):
    def before_validate(self):
        self.apply_opportunity_defaults()

    def validate(self):
        self.validate_relationships()
        self.validate_dates()
        self.validate_completion()

    def apply_opportunity_defaults(self):
        if not self.commercial_opportunity:
            return

        opportunity = frappe.get_doc(
            "Commercial Opportunity",
            self.commercial_opportunity,
        )

        defaults = {
            "commercial_development_case": opportunity.commercial_development_case,
            "company": opportunity.company,
            "customer": opportunity.customer,
            "lead": opportunity.lead,
            "territory": opportunity.territory,
            "item": opportunity.item,
            "item_group": opportunity.item_group,
            "pilot_owner": opportunity.business_owner,
        }

        for fieldname, value in defaults.items():
            if not self.get(fieldname) and value:
                self.set(fieldname, value)

    def validate_relationships(self):
        if not self.commercial_opportunity:
            return

        opportunity_case = frappe.db.get_value(
            "Commercial Opportunity",
            self.commercial_opportunity,
            "commercial_development_case",
        )

        if (
            self.commercial_development_case
            and self.commercial_development_case != opportunity_case
        ):
            frappe.throw(
                "Pilot Commercial Development Case must match "
                "the Commercial Opportunity."
            )

    def validate_dates(self):
        if (
            self.start_date
            and self.planned_end_date
            and self.planned_end_date < self.start_date
        ):
            frappe.throw(
                "Planned End Date cannot be earlier than Start Date."
            )

        if (
            self.start_date
            and self.actual_end_date
            and self.actual_end_date < self.start_date
        ):
            frappe.throw(
                "Actual End Date cannot be earlier than Start Date."
            )

        if (
            self.review_due_date
            and self.start_date
            and self.review_due_date < self.start_date
        ):
            frappe.throw(
                "Review Due Date cannot be earlier than Start Date."
            )

    def validate_completion(self):
        if self.status in ("Completed", "Stopped") and not self.actual_end_date:
            frappe.throw(
                "Actual End Date is required when Pilot is Completed or Stopped."
            )

        if self.status == "Completed" and self.outcome == "Not Reviewed":
            frappe.throw(
                "A Completed Pilot must have an Outcome."
            )
