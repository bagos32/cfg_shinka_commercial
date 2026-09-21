frappe.ui.form.on("Market Price Survey", {
    company(frm) {
        if (!frm.doc.company || frm.doc.currency) return;
        frappe.db.get_value("Company", frm.doc.company, "default_currency").then((r) => {
            if (r.message?.default_currency) frm.set_value("currency", r.message.default_currency);
        });
    },
    cfg_place(frm) {
        if (!frm.doc.cfg_place) return;
        frappe.db.get_doc("CFG Place", frm.doc.cfg_place).then((place) => {
            const values = {
                territory: place.territory,
                location: place.location,
                outlet_name: place.place_name,
                location_source: "Reusable Place",
            };
            if (!frm.doc.outlet_customer && place.customer) values.outlet_customer = place.customer;
            frm.set_value(values);
        });
    },
});

frappe.ui.form.on("Market Price Survey Line", {
    regular_shelf_price: calculate_line,
    promotional_price: calculate_line,
    our_reference_price: calculate_line,
    pack_quantity: calculate_line,
    pack_size: calculate_line,
});

function calculate_line(frm, cdt, cdn) {
    const row = locals[cdt][cdn];
    const regular = flt(row.regular_shelf_price);
    const promotional = flt(row.promotional_price);
    const effective = promotional > 0 ? promotional : regular;
    const reference = flt(row.our_reference_price);
    const basis = flt(row.pack_quantity) * flt(row.pack_size);
    frappe.model.set_value(cdt, cdn, "effective_observed_price", effective);
    frappe.model.set_value(cdt, cdn, "normalized_unit_price", basis > 0 ? effective / basis : 0);
    if (effective > 0 && reference > 0) {
        const difference = effective - reference;
        frappe.model.set_value(cdt, cdn, "price_difference", difference);
        frappe.model.set_value(cdt, cdn, "price_difference_percent", difference / reference * 100);
        frappe.model.set_value(cdt, cdn, "price_position", Math.abs(difference) < 0.005
            ? "Equal to Our Reference"
            : difference < 0 ? "Below Our Reference" : "Above Our Reference");
    } else {
        frappe.model.set_value(cdt, cdn, "price_difference", 0);
        frappe.model.set_value(cdt, cdn, "price_difference_percent", 0);
        frappe.model.set_value(cdt, cdn, "price_position", "Not Compared");
    }
}
