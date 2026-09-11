from frappe import _


def get_data():
    return {
        "fieldname": "pilot",
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
                    "Gate Review",
                ],
            },
            {
                "label": _("Pilot Execution"),
                "items": [
                    "Pilot Measurement",
                    "Corrective Action",
                ],
            },
            {
                "label": _("Pilot Review"),
                "items": [
                    "Pilot Review",
                    "Scale Decision",
                ],
            },
        ],
    }
