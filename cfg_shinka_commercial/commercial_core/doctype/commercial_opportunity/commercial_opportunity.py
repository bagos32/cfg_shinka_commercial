import frappe
from frappe.model.document import Document
from frappe.utils import nowdate


class CommercialOpportunity(Document):
    def before_validate(self):
        self.apply_case_defaults()

    def validate(self):
        self.validate_parent_case()
        self.validate_erpnext_conversion()

    def apply_case_defaults(self):
        if not self.commercial_development_case:
            return

        case = frappe.get_doc(
            "Commercial Development Case",
            self.commercial_development_case,
        )

        defaults = {
            "company": case.company,
            "customer": case.customer,
            "lead": case.lead,
            "territory": case.territory,
            "business_owner": case.business_owner,
            "priority": case.priority,
        }

        for fieldname, value in defaults.items():
            if not self.get(fieldname) and value:
                self.set(fieldname, value)

    def validate_parent_case(self):
        if not self.commercial_development_case:
            frappe.throw("Commercial Development Case is required.")

        if not frappe.db.exists(
            "Commercial Development Case",
            self.commercial_development_case,
        ):
            frappe.throw("Commercial Development Case does not exist.")

    def validate_erpnext_conversion(self):
        if self.converted_to_erpnext_opportunity:
            if not self.erpnext_opportunity:
                frappe.throw(
                    "ERPNext Opportunity is required when "
                    "Converted to ERPNext Opportunity is enabled."
                )

            if not self.conversion_date:
                self.conversion_date = nowdate()

        else:
            if self.erpnext_opportunity:
                frappe.throw(
                    "Enable Converted to ERPNext Opportunity before linking "
                    "an ERPNext Opportunity."
                )

            if self.conversion_date:
                frappe.throw(
                    "Conversion Date must be empty when the opportunity "
                    "has not been converted."
                )
