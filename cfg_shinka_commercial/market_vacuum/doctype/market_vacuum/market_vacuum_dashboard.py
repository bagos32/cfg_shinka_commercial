from frappe import _


def get_data():
    return {
        "fieldname": "market_vacuum",
        "transactions": [
            {"label": _("Customer Access"), "items": ["Access Point", "Customer Redirection"]},
            {"label": _("Resilience"), "items": ["Channel Resilience Assessment"]},
        ],
    }
