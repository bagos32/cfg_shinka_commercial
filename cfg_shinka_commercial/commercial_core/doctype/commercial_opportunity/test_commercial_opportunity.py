import frappe
from frappe.tests.utils import FrappeTestCase


class TestCommercialOpportunity(FrappeTestCase):
    def setUp(self):
        self.company = frappe.db.get_value("Company", {}, "name")

        self.case = frappe.get_doc({
            "doctype": "Commercial Development Case",
            "case_title": "Automated Parent Case",
            "status": "Open",
            "case_type": "Market Development",
            "priority": "High",
            "opened_date": "2026-09-01",
            "business_owner": "Administrator",
            "business_condition": "Parent case for automated tests.",
            "desired_outcome": "Validate Commercial Opportunity behavior.",
            "company": self.company,
        }).insert()

    def make_opportunity(self, **overrides):
        values = {
            "doctype": "Commercial Opportunity",
            "opportunity_title": "Automated Test Opportunity",
            "commercial_development_case": self.case.name,
            "status": "Identified",
            "opportunity_type": "New Channel",
            "identified_date": "2026-09-01",
            "opportunity_description": "Automated test opportunity.",
            "proposed_commercial_response": "Validate Commercial Core behavior.",
        }
        values.update(overrides)
        return frappe.get_doc(values)

    def test_opportunity_can_be_created(self):
        doc = self.make_opportunity()
        doc.insert()

        self.assertTrue(doc.name.startswith("COP-"))
        self.assertEqual(doc.commercial_development_case, self.case.name)

    def test_case_defaults_are_inherited(self):
        doc = self.make_opportunity()
        doc.insert()

        self.assertEqual(doc.company, self.case.company)
        self.assertEqual(doc.business_owner, self.case.business_owner)
        self.assertEqual(doc.priority, self.case.priority)

    def test_manual_values_are_not_overwritten(self):
        doc = self.make_opportunity(
            priority="Low",
            business_owner="Administrator",
        )
        doc.insert()

        self.assertEqual(doc.priority, "Low")

    def test_one_case_supports_multiple_opportunities(self):
        first = self.make_opportunity(
            opportunity_title="Automated Opportunity A"
        ).insert()

        second = self.make_opportunity(
            opportunity_title="Automated Opportunity B",
            opportunity_type="Existing Customer Growth",
        ).insert()

        self.assertNotEqual(first.name, second.name)

        count = frappe.db.count(
            "Commercial Opportunity",
            {"commercial_development_case": self.case.name},
        )

        self.assertEqual(count, 2)

    def test_erpnext_conversion_requires_erpnext_opportunity(self):
        doc = self.make_opportunity(
            status="Qualified",
            converted_to_erpnext_opportunity=1,
        )

        with self.assertRaises(frappe.ValidationError):
            doc.insert()

    def test_conversion_date_not_allowed_when_not_converted(self):
        doc = self.make_opportunity(
            conversion_date="2026-09-01",
        )

        with self.assertRaises(frappe.ValidationError):
            doc.insert()
