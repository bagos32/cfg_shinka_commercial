frappe.ui.form.on("Commercial Development Case", {
	refresh(frm) {
		if (frm.is_new()) {
			return;
		}

		frm.add_custom_button(
			__("New Commercial Opportunity"),
			() => {
				frappe.new_doc("Commercial Opportunity", {
					commercial_development_case: frm.doc.name,
					company: frm.doc.company,
					customer: frm.doc.customer,
					lead: frm.doc.lead,
					territory: frm.doc.territory,
					business_owner: frm.doc.business_owner,
					priority: frm.doc.priority
				});
			},
			__("Commercial Opportunity")
		);

		frm.add_custom_button(
			__("View Opportunities"),
			() => {
				frappe.route_options = {
					commercial_development_case: frm.doc.name
				};

				frappe.set_route("List", "Commercial Opportunity");
			},
			__("Commercial Opportunity")
		);
	}
});
