frappe.ui.form.on("Market Vacuum", {
    refresh(frm) {
        frm.set_query("commercial_opportunity", () => ({
            filters: { commercial_development_case: frm.doc.commercial_development_case }
        }));
        frm.set_query("pilot", () => ({
            filters: { commercial_opportunity: frm.doc.commercial_opportunity }
        }));
    }
});
