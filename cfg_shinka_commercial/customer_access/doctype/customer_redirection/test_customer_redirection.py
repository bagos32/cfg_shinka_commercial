import frappe
from frappe.tests.utils import FrappeTestCase


class TestCustomerRedirection(FrappeTestCase):
    def test_response_time_is_calculated(self):
        redirection = frappe.new_doc("Customer Redirection")
        redirection.request_date = "2026-09-01"
        redirection.redirection_date = "2026-09-03"
        redirection.calculate_response_time()
        self.assertEqual(redirection.response_days, 2)

    def test_closed_redirection_requires_outcome(self):
        redirection = frappe.new_doc("Customer Redirection")
        redirection.status = "Closed"
        redirection.outcome = "Pending"
        with self.assertRaises(frappe.ValidationError):
            redirection.validate_outcome()
