frappe.ui.form.on("Channel Resilience Assessment", {
    market_vacuum(frm) {
        if (!frm.doc.market_vacuum) {
            return;
        }
        frappe.db.get_value(
            "Market Vacuum",
            frm.doc.market_vacuum,
            ["commercial_development_case", "company", "territory"]
        ).then(({ message }) => {
            if (!message) {
                return;
            }
            frm.set_value("commercial_development_case", message.commercial_development_case);
            frm.set_value("company", message.company);
            frm.set_value("territory", message.territory);
        });
    }
});
