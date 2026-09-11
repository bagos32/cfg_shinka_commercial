import frappe
from frappe.model.document import Document

from cfg_shinka_commercial.platform_administration.geospatial import apply_boundary_validation


class FieldObservation(Document):
    def before_validate(self):
        if self.cfg_place:
            place = frappe.get_doc("CFG Place", self.cfg_place)
            self.territory = self.territory or place.territory
            self.location = self.location or place.location
            self.location_outlet = self.location_outlet or place.place_name
            self.customer = self.customer or place.customer
            if self.territory == place.territory:
                self.territory_geography = place.territory_geography

    def validate(self):
        if self.location:
            apply_boundary_validation(self)
        else:
            self.territory_geography = None
            self.boundary_validation_status = "Not Checked"
            self.boundary_validation_date = None
            self.territory_review_required = 0
        if self.status == "Reviewed" and not self.location:
            frappe.throw("Exact Location is required before reviewing a Field Observation.")
        if self.status == "Reviewed" and self.boundary_validation_status == "Outside Territory" and not self.outside_territory_reason:
            frappe.throw("Outside Territory Reason is required before reviewing this observation.")
