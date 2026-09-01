import frappe
from frappe.tests.utils import FrappeTestCase


class TestCommercialDevelopmentCase(FrappeTestCase):
    def setUp(self):
        self.company = frappe.db.get_value("Company", {}, "name")

    def make_case(self, **overrides):
        values = {
            "doctype": "Commercial Development Case",
            "case_title": "Automated Test Case",
            "status": "Open",
            "case_type": "Market Development",
            "priority": "Medium",
            "opened_date": "2026-09-01",
            "business_owner": "Administrator",
            "business_condition": "Automated validation test.",
            "desired_outcome": "Verify Commercial Core behavior.",
            "company": self.company,
        }
        values.update(overrides)
        return frappe.get_doc(values)

    def test_case_can_be_created(self):
        doc = self.make_case()
        doc.insert()

        self.assertTrue(doc.name.startswith("CDC-"))

    def test_closed_case_requires_closed_date(self):
        doc = self.make_case(
            status="Closed",
            closure_reason="Resolved",
        )

        with self.assertRaises(frappe.ValidationError):
            doc.insert()

    def test_closed_case_requires_closure_reason(self):
        doc = self.make_case(
            status="Closed",
            closed_date="2026-09-01",
        )

        with self.assertRaises(frappe.ValidationError):
            doc.insert()

    def test_closed_date_cannot_precede_opened_date(self):
        doc = self.make_case(
            status="Closed",
            opened_date="2026-09-02",
            closed_date="2026-09-01",
            closure_reason="Resolved",
        )

        with self.assertRaises(frappe.ValidationError):
            doc.insert()
