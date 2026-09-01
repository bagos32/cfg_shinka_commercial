import frappe
from frappe.model.document import Document


class GateReview(Document):
    def before_validate(self):
        self.apply_opportunity_defaults()

    def validate(self):
        self.validate_gate_decision()
        self.validate_linked_records()
        self.validate_pilot_consistency()
        self.validate_pilot_review_consistency()

    def on_update(self):
        self.update_pilot_current_gate()

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

    def validate_gate_decision(self):
        allowed = {
            "G0 — Lead Accepted": {
                "Accept for Screening",
                "Return for Missing Information",
                "Reject",
            },
            "G1 — Field / Market Validated": {
                "Qualify",
                "Request Further Validation",
                "Hold",
                "Reject",
            },
            "G2 — Business Feasible": {
                "Approve for Pilot Preparation",
                "Conditional Approval",
                "Hold",
                "Reject",
            },
            "G3 — Pilot Ready": {
                "Approve Pilot Launch",
                "Conditional Approval",
                "Return for Correction",
                "Hold",
                "Reject",
            },
            "G4 — Pilot Reviewed": {
                "Scale",
                "Extend Pilot",
                "Redesign",
                "Hold",
                "Stop",
            },
        }

        if self.gate not in allowed:
            frappe.throw("Invalid Governance Gate.")

        if self.decision not in allowed[self.gate]:
            frappe.throw(
                f"Decision {self.decision} is not valid for {self.gate}."
            )

    def validate_linked_records(self):
        if self.commercial_assessment:
            opportunity = frappe.db.get_value(
                "Commercial Assessment",
                self.commercial_assessment,
                "commercial_opportunity",
            )

            if opportunity != self.commercial_opportunity:
                frappe.throw(
                    "Commercial Assessment must belong to the same Commercial Opportunity."
                )

        if self.risk_review:
            opportunity = frappe.db.get_value(
                "Risk Review",
                self.risk_review,
                "commercial_opportunity",
            )

            if opportunity != self.commercial_opportunity:
                frappe.throw(
                    "Risk Review must belong to the same Commercial Opportunity."
                )

    def validate_pilot_consistency(self):
        if self.gate not in (
            "G3 — Pilot Ready",
            "G4 — Pilot Reviewed",
        ):
            return

        if not self.pilot:
            frappe.throw(
                "Pilot is required for G3 and G4 Gate Reviews."
            )

        pilot = frappe.get_doc("Pilot", self.pilot)

        if pilot.commercial_opportunity != self.commercial_opportunity:
            frappe.throw(
                "Pilot must belong to the same Commercial Opportunity."
            )

        if (
            pilot.commercial_development_case
            != self.commercial_development_case
        ):
            frappe.throw(
                "Pilot must belong to the same Commercial Development Case."
            )

    def validate_pilot_review_consistency(self):
        if self.gate != "G4 — Pilot Reviewed":
            return

        if not self.pilot_review:
            frappe.throw(
                "Pilot Review is required for a G4 Gate Review."
            )

        review_pilot = frappe.db.get_value(
            "Pilot Review",
            self.pilot_review,
            "pilot",
        )

        if review_pilot != self.pilot:
            frappe.throw(
                "Pilot Review must belong to the selected Pilot."
            )

    def update_pilot_current_gate(self):
        if (
            not self.pilot
            or self.status != "Completed"
            or self.gate not in (
                "G3 — Pilot Ready",
                "G4 — Pilot Reviewed",
            )
        ):
            return

        frappe.db.set_value(
            "Pilot",
            self.pilot,
            "current_gate",
            self.gate,
            update_modified=True,
        )
