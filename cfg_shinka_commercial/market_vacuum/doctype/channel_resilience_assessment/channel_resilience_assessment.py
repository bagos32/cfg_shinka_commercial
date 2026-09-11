import frappe
from frappe.model.document import Document
from frappe.utils import flt


class ChannelResilienceAssessment(Document):
    def before_validate(self):
        self.apply_market_vacuum_defaults()
        self.calculate_resilience()

    def validate(self):
        self.validate_counts()
        self.validate_market_vacuum_alignment()

    def calculate_resilience(self):
        practical = flt(self.practical_independent_access_points)
        target = flt(self.target_independent_access_points)
        self.customer_access_resilience = min((practical / target) * 100, 100) if target else 0
        self.dependency_gap = max(int(target - practical), 0)

        if practical <= 1:
            self.resilience_rating = "Critical"
        elif target and practical < target:
            self.resilience_rating = "Vulnerable"
        elif target and practical == target:
            self.resilience_rating = "Adequate"
        elif target and practical > target:
            self.resilience_rating = "Resilient"
        else:
            self.resilience_rating = "Not Assessed"

    def validate_counts(self):
        for fieldname in (
            "current_access_points", "practical_independent_access_points", "target_independent_access_points"
        ):
            if self.get(fieldname) is not None and int(self.get(fieldname)) < 0:
                frappe.throw(f"{self.meta.get_label(fieldname)} cannot be negative.")

        if self.practical_independent_access_points > self.current_access_points:
            frappe.throw("Practical Independent Access Points cannot exceed Current Access Points.")

    def validate_market_vacuum_alignment(self):
        vacuum = frappe.get_doc("Market Vacuum", self.market_vacuum)
        if self.commercial_development_case != vacuum.commercial_development_case:
            frappe.throw("Assessment and Market Vacuum must use the same Commercial Development Case.")
        if self.company != vacuum.company:
            frappe.throw("Assessment and Market Vacuum must use the same Company.")
        if self.territory and vacuum.territory and self.territory != vacuum.territory:
            frappe.throw("Assessment and Market Vacuum must use the same Territory.")

    def apply_market_vacuum_defaults(self):
        if not self.market_vacuum:
            return
        vacuum = frappe.get_doc("Market Vacuum", self.market_vacuum)
        defaults = {
            "commercial_development_case": vacuum.commercial_development_case,
            "company": vacuum.company,
            "territory": vacuum.territory,
        }
        for fieldname, value in defaults.items():
            if not self.get(fieldname) and value:
                self.set(fieldname, value)
