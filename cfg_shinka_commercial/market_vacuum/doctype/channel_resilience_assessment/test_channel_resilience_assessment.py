import frappe
from frappe.tests.utils import FrappeTestCase


class TestChannelResilienceAssessment(FrappeTestCase):
    def test_resilience_calculation(self):
        assessment = frappe.new_doc("Channel Resilience Assessment")
        assessment.current_access_points = 4
        assessment.practical_independent_access_points = 2
        assessment.target_independent_access_points = 4
        assessment.calculate_resilience()

        self.assertEqual(assessment.customer_access_resilience, 50)
        self.assertEqual(assessment.dependency_gap, 2)
        self.assertEqual(assessment.resilience_rating, "Vulnerable")
