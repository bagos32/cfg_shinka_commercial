from frappe import _


def get_data():
    return {
        "fieldname": "pilot_review",
        "transactions": [
            {
                "label": _("Governance"),
                "items": [
                    "Gate Review",
                ],
            },
            {
                "label": _("Decision"),
                "items": [
                    "Scale Decision",
                ],
            },
        ],
    }
