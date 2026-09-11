import frappe
from frappe.tests.utils import FrappeTestCase


class TestMarketVacuum(FrappeTestCase):
    def test_verified_vacuum_requires_validated_demand(self):
        vacuum = frappe.new_doc("Market Vacuum")
        vacuum.status = "Verified"
        vacuum.demand_validated = 0
        vacuum.verification_summary = "Outlet and demand were checked."

        with self.assertRaises(frappe.ValidationError):
            vacuum.validate_verification()

    def test_red_oem_conflict_blocks_response(self):
        vacuum = frappe.new_doc("Market Vacuum")
        vacuum.status = "Response Designed"
        vacuum.oem_conflict_classification = "Red"
        vacuum.oem_review_summary = "Contractual restriction requires approval."

        with self.assertRaises(frappe.ValidationError):
            vacuum.validate_oem_control()

    def test_recovery_time_is_calculated(self):
        vacuum = frappe.new_doc("Market Vacuum")
        vacuum.verified_date = "2026-09-01"
        vacuum.recovery_date = "2026-09-06"
        vacuum.calculate_recovery_time()

        self.assertEqual(vacuum.recovery_days, 5)
