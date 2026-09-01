from frappe import _


def get_data():
    return {
        "fieldname": "gate_review",
        "transactions": [
            {
                "label": _("Governance"),
                "items": [
                    "Approval Condition",
                    "Decision Record",
                ],
            },
        ],
    }
