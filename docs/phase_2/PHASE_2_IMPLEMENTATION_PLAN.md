# CFG Shinka Commercial Phase 2 Implementation Plan

## Baseline and guardrail

Phase 2 extends the accepted v0.5.x baseline. It does not replace or collapse the lifecycle:

`Evidence → Commercial Development Case → Commercial Opportunity → G0–G4 → Pilot → Scale Decision`

Market Vacuum is a specialised condition record attached to a Commercial Development Case. A response cannot become qualified without a Commercial Opportunity, and a live pilot must use the existing Pilot record. ERPNext standard sales transactions remain authoritative.

## Phase 2A implemented scope

| Capability | Record | Purpose |
|---|---|---|
| Detect, verify and quantify | Market Vacuum | MV-A to MV-G classification, verification, exposure, OEM screen and recovery time |
| Map practical supply | Access Point | Candidate-to-active physical or digital buying point linked to ERPNext Customer or Lead |
| Measure dependency | Channel Resilience Assessment | Independent access-point count, target gap and Customer Access Resilience |
| Reconnect demand | Customer Redirection | Controlled link from Customer Enquiry to an approved, active Access Point and measured outcome |

## Controlled feasibility decisions

- Existing Phase 1 roles are reused for the first operational release; new role families are deferred until actual segregation-of-duty needs are observed.
- Customer and Lead remain the authoritative commercial party records. Access Point is a serviceability overlay, not a duplicate customer master.
- Customer Enquiry remains the demand signal. Customer Redirection records the operational response and outcome.
- Recovery and resilience formulas are deliberately transparent and provisional so pilot feedback can tune targets without restructuring the lifecycle.
- Red OEM conflict blocks response activation. Amber and Red classifications require documented review.

## Release sequence

1. Phase 2A: migrate four DocTypes, verify permissions, run controller tests and complete one end-to-end sandbox lifecycle.
2. Phase 2B: add reports, number cards, map/locator presentation and notification rules after users validate required views.
3. Phase 2C: calibrate triggers, travel-radius rules, independence logic and peak-season thresholds from pilot evidence.
4. Phase 2D: formalise stable controls and update the deployed user guide before release acceptance.

## Acceptance scenario

1. Record Customer Enquiry and supporting Evidence.
2. Link Evidence to a Commercial Development Case.
3. Record a Market Vacuum against that case and validate demand.
4. Create the response as a Commercial Opportunity and pass normal gates.
5. Qualify multiple Access Points; activate only verified points.
6. Assess independent practical coverage and the dependency gap.
7. Launch the existing Pilot after G3.
8. Redirect enquiries only to approved active Access Points.
9. Measure access, recovery and commercial results through the Pilot.
10. Use G4 and Scale Decision for scale, extend, redesign, hold or stop.

## Automated verification

After migration, run the rollback-safe integration check on the development site:

```bash
bench --site site1.local execute \
  cfg_shinka_commercial.tests.phase_2_verification.run
```

The runner checks installed metadata and creates a temporary Case → Opportunity → Market Vacuum → Access Point → Channel Resilience Assessment → Customer Enquiry → Customer Redirection chain. It rolls the entire transaction back on both success and failure. A successful result reports `PASSED` and confirms that no temporary records remain.

## Deferred pending operating evidence

- automatic alert thresholds;
- GIS distance and travel-time calculation;
- public Where-to-Buy portal;
- customer-facing messages and consent/privacy workflow;
- automated ERPNext Opportunity creation;
- channel-owner entity matching beyond the initial controlled reference;
- final resilience weighting and peak-season service levels.
