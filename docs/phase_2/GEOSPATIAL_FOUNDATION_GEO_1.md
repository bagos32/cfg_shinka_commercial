# Geospatial Foundation — GEO-1

GEO-1 adds controlled map and territory detail without changing the accepted commercial lifecycle.

## Operating model

- ERPNext **Territory** remains the commercial hierarchy and reporting reference.
- **CFG Territory Geography** stores a governed Polygon or MultiPolygon, its source, version, effective dates, confidence and validation record. Only one boundary may be Active for a Territory.
- **CFG Place** stores a reusable physical point for an outlet, customer site, distributor, warehouse or route point. Exact coordinates are internal by default.
- **Field Observation** can reuse a CFG Place or capture one exact point. The form previews the active territory boundary before location selection.
- A point outside the selected Territory is retained and marked **Territory Review Required**. It is not rejected. A reason is required only when a place is verified or an observation is Reviewed.

## Architectural controls

Geography supports evidence capture; it does not replace or bypass Evidence → Case → Opportunity → G0–G4 → Pilot → Scale. GEO-1 does not automatically create evidence, cases, opportunities, access points or decisions.

Precise locations must not be made public unless explicitly approved. GEO-1 performs no automatic geocoding and sends no customer coordinates to external services beyond loading the configured base-map tiles in the user interface.

## Deployment verification

After migration, run:

```bash
bench --site site1.local execute cfg_shinka_commercial.tests.geo_1_verification.run
```

The verification creates a temporary territory boundary, reusable place and Field Observation, checks inside/outside behaviour, and rolls all temporary records back.

## Deferred scope

GEO-2 may extend the shared place/location fields to Customer Enquiry, Competitor Observation, Market Vacuum and Access Point after GEO-1 user feedback. Routing, public map publishing, geocoding, heatmaps and mobile offline capture remain outside GEO-1.
