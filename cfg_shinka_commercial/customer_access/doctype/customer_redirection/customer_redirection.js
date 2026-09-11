frappe.ui.form.on("Customer Redirection", {
    refresh(frm) {
        frm.set_query("access_point", () => {
            const filters = {
                status: "Active",
                approved_for_redirection: 1
            };
            if (frm.doc.market_vacuum) {
                filters.market_vacuum = frm.doc.market_vacuum;
            }
            return { filters };
        });
    }
});
