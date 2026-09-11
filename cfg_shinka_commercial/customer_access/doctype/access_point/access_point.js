frappe.ui.form.on("Access Point", {
    refresh(frm) {
        frm.set_query("commercial_opportunity", () => ({
            filters: frm.doc.market_vacuum && frm.doc.commercial_opportunity
                ? { name: frm.doc.commercial_opportunity }
                : {}
        }));
        frm.set_query("pilot", () => ({
            filters: { commercial_opportunity: frm.doc.commercial_opportunity }
        }));
    },

    market_vacuum(frm) {
        if (!frm.doc.market_vacuum) {
            return;
        }
        frappe.db.get_value(
            "Market Vacuum",
            frm.doc.market_vacuum,
            ["commercial_opportunity", "company", "territory", "item", "item_group"]
        ).then(({ message }) => {
            if (!message) {
                return;
            }
            for (const fieldname of ["commercial_opportunity", "company", "territory", "item", "item_group"]) {
                if (message[fieldname]) {
                    frm.set_value(fieldname, message[fieldname]);
                }
            }
        });
    }
});
