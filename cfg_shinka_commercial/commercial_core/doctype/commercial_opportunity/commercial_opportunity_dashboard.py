from frappe import _


def get_data():
    return {
        "fieldname": "commercial_opportunity",
        "transactions": [
            {
                "label": _("Customer Access"),
                "items": [
                    "Market Vacuum",
                    "Access Point",
                ],
            },
            {
                "label": _("Governance"),
                "items": [
                    "Commercial Assessment",
                    "Risk Review",
                    "Gate Review",
                    "Approval Condition",
                    "Decision Record",
                ],
            },
            {
                "label": _("Pilot Management"),
                "items": [
                    "Pilot",
                    "Scale Decision",
                ],
            },
        ],
    }
