from frappe import _


def get_data():
    return {
        "fieldname": "customer_enquiry",
        "transactions": [
            {"label": _("Customer Access"), "items": ["Customer Redirection"]},
        ],
    }
