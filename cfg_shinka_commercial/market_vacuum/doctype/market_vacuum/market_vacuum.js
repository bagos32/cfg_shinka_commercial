frappe.ui.form.on("Market Vacuum", {
    refresh(frm) {
        frm.set_query("commercial_opportunity", () => ({
            filters: { commercial_development_case: frm.doc.commercial_development_case }
        }));
        frm.set_query("pilot", () => ({
            filters: { commercial_opportunity: frm.doc.commercial_opportunity }
        }));
        frm.set_query("oem_governance_decision", () => ({
            filters: {
                commercial_development_case: frm.doc.commercial_development_case,
                commercial_opportunity: frm.doc.commercial_opportunity,
                status: "Active"
            }
        }));

        if (!frm.is_new()) {
            frm.add_custom_button(__("Access Point"), () => {
                frappe.new_doc("Access Point", {
                    market_vacuum: frm.doc.name,
                    commercial_opportunity: frm.doc.commercial_opportunity,
                    company: frm.doc.company,
                    territory: frm.doc.territory,
                    item: frm.doc.item,
                    item_group: frm.doc.item_group
                });
            }, __("Create"));
            frm.add_custom_button(__("Resilience Assessment"), () => {
                frappe.new_doc("Channel Resilience Assessment", {
                    market_vacuum: frm.doc.name,
                    commercial_development_case: frm.doc.commercial_development_case,
                    company: frm.doc.company,
                    territory: frm.doc.territory
                });
            }, __("Create"));
        }
    }
});
