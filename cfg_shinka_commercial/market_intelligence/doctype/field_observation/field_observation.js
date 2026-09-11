frappe.ui.form.on("Field Observation", {
    refresh: render_territory_boundary,
    territory: render_territory_boundary,
    cfg_place(frm) {
        if (!frm.doc.cfg_place) return;
        frappe.db.get_doc("CFG Place", frm.doc.cfg_place).then((place) => {
            const values = {territory: place.territory, location: place.location, location_outlet: place.place_name};
            if (!frm.doc.customer && place.customer) values.customer = place.customer;
            frm.set_value(values).then(() => render_territory_boundary(frm));
        });
    },
});

function render_territory_boundary(frm) {
    const wrapper = frm.fields_dict.territory_boundary_preview?.$wrapper;
    if (!wrapper) return;
    if (frm.__territory_map) frm.__territory_map.remove();
    wrapper.empty();
    if (!frm.doc.territory) {
        wrapper.html('<p class="text-muted">Select a Territory to preview its active boundary.</p>');
        return;
    }
    frappe.call({
        method: "cfg_shinka_commercial.platform_administration.geospatial.get_active_territory_geography",
        args: {territory: frm.doc.territory},
        callback(r) {
            const geo = r.message;
            if (!geo) {
                wrapper.html('<p class="text-warning">No active boundary is available. Record the location for later review.</p>');
                return;
            }
            const node = $('<div style="height:360px;border-radius:6px"></div>').appendTo(wrapper)[0];
            const map = L.map(node, {scrollWheelZoom: false});
            const defaults = frappe.utils.map_defaults || {};
            L.tileLayer(defaults.tiles || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: defaults.attribution || "&copy; OpenStreetMap contributors"}).addTo(map);
            const data = typeof geo.boundary_geometry === "string" ? JSON.parse(geo.boundary_geometry) : geo.boundary_geometry;
            const layer = L.geoJSON(data, {style: {color: "#2490ef", weight: 2, fillOpacity: 0.12}}).addTo(map);
            map.fitBounds(layer.getBounds(), {padding: [12, 12]});
            frm.__territory_map = map;
        },
    });
}
