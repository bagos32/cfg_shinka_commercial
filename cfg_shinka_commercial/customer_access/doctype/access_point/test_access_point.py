import frappe
from frappe.tests.utils import FrappeTestCase


class TestAccessPoint(FrappeTestCase):
    def test_access_point_requires_exactly_one_party(self):
        access_point = frappe.new_doc("Access Point")
        with self.assertRaises(frappe.ValidationError):
            access_point.validate_party()

        access_point.customer = "Customer A"
        access_point.lead = "Lead A"
        with self.assertRaises(frappe.ValidationError):
            access_point.validate_party()
