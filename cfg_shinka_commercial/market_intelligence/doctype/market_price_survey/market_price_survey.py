import frappe
from frappe.model.document import Document
from frappe.utils import flt, now_datetime

from cfg_shinka_commercial.platform_administration.geospatial import apply_boundary_validation


class MarketPriceSurvey(Document):
    def validate(self):
        geography = self._apply_place()
        self._calculate_lines()
        if self.location:
            apply_boundary_validation(self, preferred_geography=geography)
        else:
            self.territory_geography = None
            self.boundary_validation_status = "Not Checked"
            self.boundary_validation_date = None
            self.territory_review_required = 0
        if self.status in {"Completed", "Verified"}:
            if not self.price_observations:
                frappe.throw("Add at least one Price Observation before completing the survey.")
            if not self.location:
                frappe.throw("Exact Location is required before completing the survey.")
            if self.boundary_validation_status == "Outside Territory" and not self.outside_territory_reason:
                frappe.throw("Outside Territory Reason is required before completing the survey.")
        if self.status == "Verified":
            allowed = {"CFG Market Intelligence Manager", "CFG Platform Administrator", "System Manager"}
            if not allowed.intersection(frappe.get_roles()):
                frappe.throw("Only a Market Intelligence Manager or system administrator may verify a survey.")
            self.verified_by = self.verified_by or frappe.session.user
            self.verified_on = self.verified_on or now_datetime()

    def _apply_place(self):
        if not self.cfg_place:
            return None
        place = frappe.get_doc("CFG Place", self.cfg_place)
        self.territory = place.territory
        self.location = self.location or place.location
        self.outlet_name = self.outlet_name or place.place_name
        self.outlet_customer = self.outlet_customer or place.customer
        self.territory_geography = place.territory_geography
        if not place.territory_geography:
            return None
        geography = frappe.get_doc("CFG Territory Geography", place.territory_geography)
        if geography.territory != place.territory or geography.status != "Active":
            frappe.throw("The selected CFG Place does not reference the Active boundary for its Territory.")
        return geography

    def _calculate_lines(self):
        for row in self.price_observations:
            if not row.item and not row.product_description:
                frappe.throw(f"Row {row.idx}: select an Item or enter Product Description.")
            regular = flt(row.regular_shelf_price)
            promotional = flt(row.promotional_price)
            if regular < 0 or promotional < 0 or flt(row.our_reference_price) < 0:
                frappe.throw(f"Row {row.idx}: prices cannot be negative.")
            if self.status in {"Completed", "Verified"} and row.price_status == "Observed" and regular <= 0 and promotional <= 0:
                frappe.throw(f"Row {row.idx}: enter a Regular or Promotional Price.")
            row.effective_observed_price = promotional if promotional > 0 else regular
            basis = flt(row.pack_quantity) * flt(row.pack_size)
            row.normalized_unit_price = row.effective_observed_price / basis if basis > 0 else 0
            reference = flt(row.our_reference_price)
            if row.effective_observed_price > 0 and reference > 0:
                row.price_difference = row.effective_observed_price - reference
                row.price_difference_percent = row.price_difference / reference * 100
                if abs(row.price_difference) < 0.005:
                    row.price_position = "Equal to Our Reference"
                elif row.price_difference < 0:
                    row.price_position = "Below Our Reference"
                else:
                    row.price_position = "Above Our Reference"
            else:
                row.price_difference = 0
                row.price_difference_percent = 0
                row.price_position = "Not Compared"
