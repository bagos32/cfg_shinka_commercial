import json

import frappe
from frappe.utils import now_datetime


def parse_geolocation(value, label="Geolocation"):
    if not value:
        return None
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except (TypeError, ValueError):
            frappe.throw(f"{label} must contain valid GeoJSON.")
    if not isinstance(value, dict) or value.get("type") != "FeatureCollection":
        frappe.throw(f"{label} must be a GeoJSON FeatureCollection.")
    return value


def geometries(value, label="Geolocation"):
    collection = parse_geolocation(value, label)
    if not collection:
        return []
    return [
        feature.get("geometry")
        for feature in collection.get("features", [])
        if feature.get("geometry")
    ]


def validate_geometry_types(value, allowed_types, label="Geolocation", require_single=False):
    found = geometries(value, label)
    if not found:
        frappe.throw(f"{label} must contain at least one geometry.")
    if require_single and len(found) != 1:
        frappe.throw(f"{label} must contain exactly one geometry.")

    invalid = sorted({geometry.get("type") for geometry in found} - set(allowed_types))
    if invalid:
        frappe.throw(f"{label} only supports {', '.join(sorted(allowed_types))}; found {', '.join(invalid)}.")
    return found


def extract_single_point(value, label="Location"):
    geometry = validate_geometry_types(value, {"Point"}, label, require_single=True)[0]
    coordinates = geometry.get("coordinates") or []
    if len(coordinates) < 2:
        frappe.throw(f"{label} point must contain two coordinates.")
    return coordinates[:2]


def active_territory_geography(territory):
    if not territory:
        return None
    name = frappe.db.get_value(
        "CFG Territory Geography",
        {"territory": territory, "status": "Active"},
        "name",
        order_by="effective_from desc, modified desc",
    )
    return frappe.get_doc("CFG Territory Geography", name) if name else None


def apply_boundary_validation(document, territory_field="territory", location_field="location"):
    territory = document.get(territory_field)
    location = document.get(location_field)
    if not territory or not location:
        _set_boundary_result(document, None, "Not Checked", False)
        return "Not Checked"

    point = extract_single_point(location, document.meta.get_label(location_field))
    geography = active_territory_geography(territory)
    if not geography and document.get("territory_geography"):
        candidate = frappe.get_doc(
            "CFG Territory Geography", document.get("territory_geography")
        )
        if candidate.territory == territory and candidate.status == "Active":
            geography = candidate
    if not geography:
        _set_boundary_result(document, None, "Boundary Unavailable", True)
        return "Boundary Unavailable"

    result = point_in_boundary(point, geography.boundary_geometry)
    review_required = result not in {"Inside Territory", "On Boundary"}
    _set_boundary_result(document, geography, result, review_required)
    return result


def _set_boundary_result(document, geography, status, review_required):
    document.territory_geography = geography.name if geography else None
    document.boundary_validation_status = status
    document.boundary_validation_date = now_datetime()
    document.territory_review_required = 1 if review_required else 0


def point_in_boundary(point, boundary_value):
    boundary_geometries = validate_geometry_types(
        boundary_value,
        {"Polygon", "MultiPolygon"},
        "Boundary Geometry",
    )
    boundary_hit = False
    for geometry in boundary_geometries:
        polygons = (
            geometry.get("coordinates", [])
            if geometry.get("type") == "MultiPolygon"
            else [geometry.get("coordinates", [])]
        )
        for polygon in polygons:
            status = _point_in_polygon(point, polygon)
            if status == "On Boundary":
                boundary_hit = True
            elif status == "Inside Territory":
                return status
    return "On Boundary" if boundary_hit else "Outside Territory"


def _point_in_polygon(point, rings):
    if not rings:
        return "Outside Territory"
    exterior = _point_in_ring(point, rings[0])
    if exterior == "On Boundary":
        return exterior
    if exterior != "Inside Territory":
        return "Outside Territory"

    for hole in rings[1:]:
        hole_status = _point_in_ring(point, hole)
        if hole_status == "On Boundary":
            return hole_status
        if hole_status == "Inside Territory":
            return "Outside Territory"
    return "Inside Territory"


def _point_in_ring(point, ring):
    if len(ring) < 3:
        return "Outside Territory"
    inside = False
    x, y = point
    previous = ring[-1]
    for current in ring:
        if _point_on_segment(point, previous, current):
            return "On Boundary"
        x1, y1 = previous
        x2, y2 = current
        if (y1 > y) != (y2 > y):
            intersect_x = ((x2 - x1) * (y - y1) / (y2 - y1)) + x1
            if x < intersect_x:
                inside = not inside
        previous = current
    return "Inside Territory" if inside else "Outside Territory"


def _point_on_segment(point, start, end, tolerance=1e-10):
    x, y = point
    x1, y1 = start
    x2, y2 = end
    cross_product = (y - y1) * (x2 - x1) - (x - x1) * (y2 - y1)
    if abs(cross_product) > tolerance:
        return False
    return min(x1, x2) - tolerance <= x <= max(x1, x2) + tolerance and min(
        y1, y2
    ) - tolerance <= y <= max(y1, y2) + tolerance


@frappe.whitelist()
def get_active_territory_geography(territory):
    geography = active_territory_geography(territory)
    if not geography:
        return None
    if not frappe.has_permission("CFG Territory Geography", "read", doc=geography):
        frappe.throw("Not permitted to view Territory Geography.", frappe.PermissionError)
    return {
        "name": geography.name,
        "territory": geography.territory,
        "boundary_version": geography.boundary_version,
        "boundary_geometry": geography.boundary_geometry,
    }
