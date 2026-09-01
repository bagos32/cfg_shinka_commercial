import frappe
from frappe.model.document import Document


class PilotMeasurement(Document):
    def validate(self):
        self.validate_pilot_exists()

    def validate_pilot_exists(self):
        if self.pilot and not frappe.db.exists("Pilot", self.pilot):
            frappe.throw("Pilot does not exist.")
