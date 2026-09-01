from frappe import _


def get_data():
    return {
        "fieldname": "commercial_development_case",
        "transactions": [
            {
                "label": _("Commercial Development"),
                "items": [
                    "Commercial Opportunity",
                ],
            },
            {
                "label": _("Governance"),
                "items": [
                    "Commercial Assessment",
                    "Risk Review",
                    "Gate Review",
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
