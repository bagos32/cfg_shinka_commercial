import frappe
from frappe.model.document import Document
from frappe.utils import getdate, nowdate

from cfg_shinka_commercial.platform_administration.geospatial import validate_geometry_types


class CFGTerritoryGeography(Document):
    def validate(self):
        validate_geometry_types(
            self.boundary_geometry,
            {"Polygon", "MultiPolygon"},
            "Boundary Geometry",
        )
        if self.effective_from and self.effective_to and getdate(self.effective_to) < getdate(self.effective_from):
            frappe.throw("Effective To cannot be before Effective From.")
        if self.status == "Active":
            self._validate_activation()

    def _validate_activation(self):
        if not self.boundary_source:
            frappe.throw("Boundary Source is required before activation.")
        if not self.validated_by:
            self.validated_by = frappe.session.user
        if not self.validation_date:
            self.validation_date = nowdate()
        existing = frappe.db.get_value(
            "CFG Territory Geography",
            {"territory": self.territory, "status": "Active", "name": ["!=", self.name]},
            "name",
        )
        if existing:
            frappe.throw(
                f"Territory {frappe.bold(self.territory)} already has active geography {frappe.bold(existing)}. Supersede it before activating another boundary."
            )
