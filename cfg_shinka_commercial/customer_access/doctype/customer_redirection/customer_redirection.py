import frappe
from frappe.model.document import Document
from frappe.utils import date_diff, getdate


class CustomerRedirection(Document):
    def before_validate(self):
        self.apply_enquiry_defaults()
        self.calculate_response_time()

    def validate(self):
        self.validate_access_point()
        self.validate_outcome()
        self.validate_dates()

    def apply_enquiry_defaults(self):
        if not self.customer_enquiry:
            return
        enquiry = frappe.get_doc("Customer Enquiry", self.customer_enquiry)
        defaults = {
            "company": enquiry.company,
            "territory": enquiry.territory,
            "customer_area": enquiry.customer_area,
            "item": enquiry.requested_item,
            "customer": enquiry.customer,
            "lead": enquiry.lead,
        }
        for fieldname, value in defaults.items():
            if not self.get(fieldname) and value:
                self.set(fieldname, value)

    def calculate_response_time(self):
        if self.request_date and self.redirection_date:
            self.response_days = date_diff(self.redirection_date, self.request_date)
        else:
            self.response_days = None

    def validate_access_point(self):
        access_point = frappe.get_doc("Access Point", self.access_point)
        if not access_point.approved_for_redirection:
            frappe.throw("The selected Access Point is not approved for customer redirection.")
        if access_point.status != "Active":
            frappe.throw("The selected Access Point must be active.")
        if access_point.availability_status not in {"Available", "Limited"}:
            frappe.throw("The selected Access Point does not have usable availability.")
        if self.market_vacuum and access_point.market_vacuum:
            if access_point.market_vacuum != self.market_vacuum:
                frappe.throw("Access Point must relate to the selected Market Vacuum.")

    def validate_outcome(self):
        if self.status == "Closed" and self.outcome == "Pending":
            frappe.throw("A closed redirection requires a measured outcome.")
        if self.purchase_confirmed and self.outcome != "Purchase Confirmed":
            frappe.throw("Outcome must be Purchase Confirmed when Purchase Confirmed is enabled.")

    def validate_dates(self):
        if self.redirection_date and getdate(self.redirection_date) < getdate(self.request_date):
            frappe.throw("Redirection Date cannot be earlier than Request Date.")
        if self.follow_up_date and self.redirection_date:
            if getdate(self.follow_up_date) < getdate(self.redirection_date):
                frappe.throw("Follow-up Date cannot be earlier than Redirection Date.")
