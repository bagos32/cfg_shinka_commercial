# Market Price Survey

Market Price Survey records multiple SKU-level price and shelf observations from one outlet visit. It closes a Phase 1 operational gap without changing the accepted Evidence → Case → Opportunity → G0–G4 → Pilot → Scale architecture.

## Operating flow

1. Create a Market Price Survey from the Workspace.
2. Select Company, Currency and preferably a governed CFG Place.
3. Add one row per own, OEM, competitor or other product.
4. Record pack basis, regular/promotional price, availability, shelf presence and optional image.
5. Complete and verify the survey after location and price checks.
6. Link material findings to an Evidence Record. The survey never creates Evidence or a Case automatically.

The effective observed price uses the promotional price when it is greater than zero; otherwise it uses the regular shelf price. Price difference is `observed − reference`, and percentage difference uses the reference price as denominator. Normalized unit price is calculated only when both units per pack and size per unit are supplied.

## Deployment verification

```bash
bench --site site1.local execute cfg_shinka_commercial.tests.market_price_survey_verification.run
```

The verification creates temporary geography, place and survey records, validates calculations and controlled escalation, and rolls every temporary record back.
