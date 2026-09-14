# CFG Shinka Interactive User Manual — Maintenance Guide

The native Desk manual is available at `/app/cfg-shinka-commercia` and is linked from the **CFG Shinka Commercial** Workspace under **User Manual & Learning**.

The unusual route suffix is retained intentionally for compatibility with the Page and Workspace fixtures already deployed. The former website Markdown file remains a controlled reference, but the Workspace no longer redirects to it.

## Content ownership

User-facing manual content is held in `MANUAL_SECTIONS` in:

`cfg_shinka_commercial/commercial_core/page/cfg_shinka_commercia/cfg_shinka_commercia.js`

Each section has:

- a stable `id`, title, icon, status, and summary;
- one or more topics with title, search keywords, body, optional steps, role notes, and related DocTypes;
- a status of `Available`, `Pilot`, `In Progress`, or `Coming Soon`.

To add guidance, copy a topic object into the correct section. Keep instructions task-oriented, name records exactly as their DocType names, and add search synonyms to `keywords`. Related-record buttons use the DocType name in `links` and open that record list in Desk.

To add a category, copy a section object and use a unique lower-case hyphenated `id`. Navigation and dashboard cards are generated automatically.

## Revision control

For every release that changes user workflow:

1. Update affected topics and status labels.
2. Update `MANUAL_REVISION` in the page JavaScript.
3. Add a concise description to the landing-page change note.
4. Confirm every related DocType still exists and that its intended roles can open it.
5. Replace media placeholders only with approved, non-sensitive screenshots.
6. Test search terms, category navigation, expansion panels, mobile layout, and Workspace routing.

The content should remain aligned with the CFG Shinka Merchandise master guideline, the Universal Commercial Opportunity Governance add-on, the Market Vacuum / Customer Access / Channel Resilience add-on, and the single-app multi-module engineering baseline.

## Current content baseline

Rev.02 provides operational learning content for record selection, the complete evidence-to-scale workflow, all Market Intelligence records, Commercial Core, G0–G4 governance, assessment and risk, pilot preparation and execution, Market Vacuum, GEO-1 geography, Customer Access, Channel Resilience, feedback and learning, user responsibilities, rollout, and release control. Future releases should extend these topics in place rather than creating a second manual source.

## Deployment

After installing or updating the app on a Frappe v15 site, run the normal site migration and asset build for that environment, then clear the website/Desk cache. No ERPNext core file is modified.
