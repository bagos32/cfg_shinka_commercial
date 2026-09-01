import frappe
from frappe.model.document import Document


class PilotReview(Document):
    def validate(self):
        self.validate_pilot()
        self.validate_completed_pilot()

    def validate_pilot(self):
        if self.pilot and not frappe.db.exists("Pilot", self.pilot):
            frappe.throw("Pilot does not exist.")

    def validate_completed_pilot(self):
        if self.status != "Completed":
            return

        pilot_status = frappe.db.get_value(
            "Pilot",
            self.pilot,
            "status",
        )

        if pilot_status not in ("Completed", "Stopped"):
            frappe.throw(
                "Pilot Review cannot be completed until the Pilot "
                "is Completed or Stopped."
            )
