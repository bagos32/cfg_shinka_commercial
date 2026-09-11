import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime

from cfg_shinka_commercial.platform_administration.geospatial import apply_boundary_validation, extract_single_point


class CFGPlace(Document):
    def validate(self):
        if self.customer and self.lead:
            frappe.throw("Select either Customer or Lead, not both.")
        longitude, latitude = extract_single_point(self.location, "Exact Location")
        self.longitude = longitude
        self.latitude = latitude
        apply_boundary_validation(self)
        if self.location_verified:
            if self.boundary_validation_status == "Outside Territory" and not self.outside_territory_reason:
                frappe.throw("Outside Territory Reason is required before verifying this place.")
            if not self.verified_by:
                self.verified_by = frappe.session.user
            if not self.verified_on:
                self.verified_on = now_datetime()
