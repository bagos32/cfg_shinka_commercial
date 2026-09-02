# CFG Shinka Commercial
## User, Workflow & Practical Deployment Guide

**Document Type:** Living User / Workflow / Practical Deployment Guide  
**Project:** CFG Shinka Merchandise  
**Application:** `cfg_shinka_commercial`  
**Application Baseline:** v0.5.x  
**Document Revision:** Rev.00  
**Status:** Controlled Living Draft  
**Date:** 2026-09-02  
**Primary Audience:** Commercial users, managers, reviewers, approvers, pilot teams, management and implementation teams

---

# 0. DOCUMENT PURPOSE

This guide explains how users should understand and practically operate the **CFG Shinka Commercial** platform.

It has two purposes:

1. **Guide users in day-to-day commercial work** using the implemented ERPNext/Frappe workflow.
2. **Create a structured learning loop between real operational use and future development**, so that usability, feasibility, missing information, unnecessary steps and practical constraints can be identified and used to improve subsequent releases.

This document is a **living operational source document**. It should be updated whenever a software release materially changes:

- business workflow,
- terminology,
- roles,
- permissions,
- fields or records users must complete,
- governance decisions,
- pilot operation,
- Workspace navigation,
- reporting,
- practical operating instructions,
- planned-versus-implemented capability.

Printable DOCX/PDF copies should be treated as controlled snapshots generated at defined release or deployment milestones. This Markdown file remains the editable source of truth.

---

# 1. WHAT “CFG SHINKA COMMERCIAL” MEANS

CFG Shinka Commercial is not merely a sales pipeline and is not a replacement for ERPNext sales transactions.

It is a **commercial intelligence, development, governance, experimentation and learning system** designed to help CFG move from observations in the market to better-controlled commercial decisions.

The wider CFG Shinka Merchandise philosophy is to make CFG increasingly valuable and attractive through better understanding, value creation, delivery, trust, learning and improvement.

The commercial operating idea is:

```text
OBSERVE REALITY
      ↓
CAPTURE EVIDENCE
      ↓
UNDERSTAND THE CONDITION
      ↓
DEVELOP A COMMERCIAL CASE
      ↓
FORM A COMMERCIAL OPPORTUNITY
      ↓
GOVERN THE DECISION
      ↓
TEST THROUGH A CONTROLLED PILOT
      ↓
MEASURE AND LEARN
      ↓
SCALE / EXTEND / REDESIGN / HOLD / STOP
      ↓
STANDARDIZE AND IMPROVE
```

This supports the wider corporate loop:

```text
ATTRACT → UNDERSTAND → CREATE → CONVERT → DELIVER
   → RETAIN → SUSTAIN → EVOLVE
```

The system is intended to help CFG make commercial decisions based on **evidence, traceability, controlled experimentation and learning**, rather than assumption alone.

---

# 2. WHAT THE PLATFORM DOES TODAY

## 2.1 Implemented Capability — v0.5.x

The following capability is implemented and may be used operationally.

### Market Intelligence

Users may capture:

- Customer Enquiry
- Field Observation
- Competitor Observation
- Demand Signal
- Channel Observation
- Evidence Record

### Commercial Core

Users may manage:

- Commercial Development Case
- Commercial Opportunity

### Commercial Governance

Users may manage:

- Commercial Assessment
- Risk Review
- Gate Review
- Approval Condition
- Decision Record

Governance currently supports:

- G0 — Lead Accepted
- G1 — Field / Market Validated
- G2 — Business Feasible
- G3 — Pilot Ready
- G4 — Pilot Reviewed

### Pilot Management

Users may manage:

- Pilot
- Pilot Success Criteria
- Pilot Stop Conditions
- Pilot Measurement
- Corrective Action
- Pilot Review
- Scale Decision

### Operational Navigation

The **CFG Shinka Commercial Workspace** provides:

- Quick Actions
- module navigation
- operational Number Cards
- Governance chart
- Pilot status chart

Key records also provide **Connections** so users can trace related records without manually searching across modules.

---

## 2.2 Planned / Future Capability

The following areas are part of the wider platform direction but should **not be treated as fully implemented operational capability in v0.5.x**:

- Market Vacuum
- Customer Access
- Channel Resilience
- Knowledge & Learning
- Platform Administration enhancements
- further reporting and analytics
- future AI-assisted commercial intelligence and analysis
- additional workflow automation where justified by operational evidence

These areas will be developed progressively and may be adjusted based on real user experience.

---

# 3. END-TO-END COMMERCIAL WORKFLOW

The current controlled lifecycle is:

```text
MARKET / CUSTOMER / CHANNEL SIGNAL
                ↓
      Market Intelligence Record
                ↓
           Evidence Record
                ↓
   Commercial Development Case
                ↓
     Commercial Opportunity
                ↓
        G0 — Lead Accepted
                ↓
 G1 — Field / Market Validated
                ↓
    G2 — Business Feasible
                ↓
              Pilot
                ↓
       G3 — Pilot Ready
                ↓
 Measurement + Corrective Action
                ↓
          Pilot Review
                ↓
      G4 — Pilot Reviewed
                ↓
          Scale Decision
                ↓
 SCALE / EXTEND / REDESIGN / HOLD / STOP
```

The purpose is not to force every idea to reach the end.

A valid outcome may be:

- request more information,
- return for correction,
- hold,
- reject,
- stop,
- redesign,
- extend the pilot,
- scale.

**Decision quality is more important than passing every gate.**

---

# 4. WHICH RECORD SHOULD I CREATE?

Use the record that best represents what has actually happened.

| Real-world situation | Record to create |
|---|---|
| A customer asks for something, reports a need or expresses interest | Customer Enquiry |
| A salesperson or field team observes something relevant in the market | Field Observation |
| A competitor action or market behaviour is observed | Competitor Observation |
| A repeatable demand pattern or demand indication appears | Demand Signal |
| A distributor, dealer or channel issue/opportunity is observed | Channel Observation |
| A fact, signal or supporting information needs to support a business conclusion | Evidence Record |
| A business condition/problem/opportunity area needs investigation and management | Commercial Development Case |
| A possible commercial response has been identified | Commercial Opportunity |
| A commercial proposition needs structured assessment | Commercial Assessment |
| Risks need explicit review | Risk Review |
| A stage decision must be made | Gate Review |
| A decision is approved subject to conditions | Approval Condition |
| A formal governance decision needs traceability | Decision Record |
| A controlled real-world test is required | Pilot |
| A pilot result or KPI reading is captured | Pilot Measurement |
| A pilot problem requires corrective action | Corrective Action |
| A completed/stopped pilot requires evaluation | Pilot Review |
| Management decides what happens after the pilot | Scale Decision |

Do not create a later-stage record merely because it appears more important. Create the record that accurately represents the current commercial reality.

---

# 5. IMPORTANT CONCEPT SEPARATION

The platform intentionally separates **Evidence**, **Commercial Development Case**, **Commercial Opportunity**, **Pilot**, and standard ERPNext commercial transactions.

## 5.1 Evidence

Evidence is a fact, signal, observation, enquiry or supporting information.

Example:

> Several distributors report recurring stock-outs during the first week of each month.

Evidence supports decisions. It is not itself the commercial solution.

---

## 5.2 Commercial Development Case

A Commercial Development Case represents the underlying business condition that needs investigation, understanding or coordinated action.

Example:

> Repeated availability failure may be causing lost sales and customer dissatisfaction in the Northern Territory.

A Case helps CFG manage the condition before jumping directly to a solution.

---

## 5.3 Commercial Opportunity

A Commercial Opportunity represents a possible commercial response.

Example:

> Introduce a revised replenishment model for selected Northern Territory distributors.

A single Case may produce more than one possible Opportunity.

---

## 5.4 Pilot

A Pilot is a controlled experiment used to test whether the proposed commercial response works in reality.

Example:

> Test the revised replenishment model with five selected distributors for six weeks.

A Pilot should have:

- objective,
- hypothesis,
- defined scope,
- dates,
- success criteria,
- stop conditions,
- measurable results.

---

## 5.5 ERPNext Opportunity and Sales Transactions

CFG Shinka Commercial records do not replace ERPNext's standard transactional system.

ERPNext remains authoritative for normal operational and financial transactions such as:

- Customer
- Lead
- Item
- Quotation
- ERPNext Opportunity
- Sales Order
- Delivery
- Invoice
- stock and accounting transactions

A CFG Commercial Opportunity is a **commercial-development object**. An ERPNext Opportunity is a **qualified prospective sales/account transaction object**.

They should not be treated as the same thing.

---

# 6. MARKET INTELLIGENCE — UNDERSTAND REALITY FIRST

Market Intelligence exists to help users capture reality before conclusions become decisions.

## 6.1 Customer Enquiry

Use when a customer or potential customer expresses:

- interest,
- need,
- request,
- question,
- complaint that may reveal commercial value,
- product/availability concern,
- market requirement.

Do not automatically interpret one enquiry as proof of market demand. It is a signal that may require further evidence.

---

## 6.2 Field Observation

Use when CFG staff observe something relevant directly in the field.

Examples:

- product unavailable at several outlets,
- unusual buying behaviour,
- shelf-space change,
- dealer behaviour,
- customer workaround,
- operational obstacle affecting commercial performance.

Record what was actually observed, not only the observer's interpretation.

---

## 6.3 Competitor Observation

Use for factual competitor intelligence.

Examples:

- new product,
- pricing movement,
- new distribution presence,
- promotional activity,
- service model,
- channel change.

Separate observed facts from assumptions about competitor intent.

---

## 6.4 Demand Signal

Use when there is an indication that demand exists or is changing.

Examples:

- repeated enquiries,
- recurring requests,
- volume pattern,
- repeated stock-out complaints,
- emerging segment,
- regional demand shift.

A Demand Signal should support further investigation, not automatically trigger investment.

---

## 6.5 Channel Observation

Use for conditions involving:

- distributors,
- dealers,
- retailers,
- alternative outlets,
- route-to-market,
- availability,
- channel capability,
- channel displacement,
- channel resilience.

This becomes especially important as the future Market Vacuum / Customer Access / Channel Resilience capability is developed.

---

## 6.6 Evidence Record

Evidence should consolidate factual support that can be linked to commercial development and governance.

Good evidence should answer:

- What happened?
- Where?
- When?
- Who observed or reported it?
- Is it verified?
- What records support it?
- What business condition may it support?

Evidence should not be altered merely because it does not support the preferred conclusion.

---

# 7. COMMERCIAL DEVELOPMENT CASE

Create a Commercial Development Case when the organization needs to formally manage a business condition.

A good Case should define:

- what condition exists,
- why it matters,
- available evidence,
- affected customer/market/channel/product,
- business significance,
- ownership,
- current status,
- possible next investigation.

A Case is especially useful when:

- several observations point to one underlying issue,
- more evidence must be collected,
- multiple teams need to collaborate,
- several possible responses may need evaluation.

Avoid creating duplicate Cases for the same underlying condition. Check existing records and Connections first.

---

# 8. COMMERCIAL OPPORTUNITY

Create a Commercial Opportunity when a plausible commercial response has emerged from a Case.

Examples:

- new replenishment model,
- territory expansion,
- channel change,
- pricing experiment,
- SKU adjustment,
- distribution intervention,
- customer-access solution.

The Opportunity should remain linked to its Commercial Development Case so that the reasoning chain remains traceable.

A Commercial Opportunity is not automatically approved business.

It must pass appropriate governance before significant commitment.

---

# 9. GOVERNANCE G0–G4

Governance exists to improve decision quality and control commitment.

## 9.1 G0 — Lead Accepted

**Question:** Is this worth formal investigation?

Typical outcomes may include:

- Accept for Screening
- Return for Missing Information

At G0, do not demand final proof. Determine whether there is enough relevance to continue.

---

## 9.2 G1 — Field / Market Validated

**Question:** Do we have credible evidence that the condition is real?

Possible outcomes include:

- Qualify
- Request Further Validation
- Reject / Hold where appropriate

The purpose is to prevent assumption from being treated as market reality.

---

## 9.3 G2 — Business Feasible

**Question:** Is there a plausible and sufficiently controlled commercial response worth preparing for a pilot?

Review may include:

- commercial implications,
- risk,
- operational feasibility,
- financial considerations,
- quality considerations,
- customer/channel implications.

A G2 pass does not mean “scale immediately.” It means the response is sufficiently feasible to proceed toward controlled testing.

---

## 9.4 G3 — Pilot Ready

**Question:** Is the experiment defined well enough to launch?

Before G3 approval, the Pilot should normally have:

- clear objective,
- testable hypothesis,
- controlled scope,
- owner,
- start/end dates,
- success criteria,
- stop conditions,
- measurement approach.

Possible decisions include:

- Approve Pilot Launch
- Conditional Approval
- Return for Correction
- Hold
- Reject

---

## 9.5 G4 — Pilot Reviewed

**Question:** What did the pilot prove, and what should happen next?

G4 is linked to a Pilot and its Pilot Review.

Possible outcomes include:

- Scale
- Extend Pilot
- Redesign
- Hold
- Stop

The purpose is to convert actual pilot learning into a controlled management decision.

---

# 10. COMMERCIAL ASSESSMENT, RISK REVIEW AND APPROVAL CONDITIONS

## 10.1 Commercial Assessment

Use Commercial Assessment to document structured business evaluation where required.

The assessment should support governance rather than become a formality.

---

## 10.2 Risk Review

Use Risk Review when material risks require explicit consideration.

Examples include:

- financial risk,
- operational risk,
- quality risk,
- customer risk,
- channel risk,
- supply risk,
- implementation risk,
- reputation risk.

The objective is not to eliminate all risk. It is to make risk visible and consciously managed.

---

## 10.3 Approval Condition

Use Approval Condition where a decision is allowed to proceed only if a specific requirement is satisfied.

Examples:

- finance confirmation required,
- customer agreement required,
- stock availability confirmed,
- quality approval completed,
- pilot boundary restricted,
- corrective action closed.

Conditions should be actively followed to closure.

---

# 11. PILOT MANAGEMENT

A Pilot is a controlled experiment, not an informal trial.

## 11.1 Before Launch

Define:

- Pilot Title
- Commercial Opportunity
- Commercial Development Case
- Pilot Type
- Pilot Owner
- Objective
- Pilot Hypothesis
- Scope Summary
- Start Date
- Planned End Date
- Review Due Date
- relevant Customer / Lead / Territory / Item / Item Group
- Success Criteria
- Stop Conditions

### Critical Rule

> Define what success means before the pilot begins.

Do not redefine success after seeing the result merely to make the pilot appear successful.

---

## 11.2 Success Criteria

A success criterion should be measurable where practical.

It may contain:

- Criterion
- Metric
- Target
- Unit
- Measurement Method
- Mandatory indicator
- Notes

Example:

```text
Criterion: Improve distributor fill rate
Metric: Fill Rate
Target: 95
Unit: %
Measurement Method: Weekly distributor replenishment report
Mandatory: Yes
```

---

## 11.3 Stop Conditions

Define conditions that may require:

- Monitor
- Correct
- Pause Pilot
- Stop Pilot
- Escalate

Examples:

- unacceptable quality issue,
- customer harm,
- repeated supply failure,
- financial exposure beyond approved limit,
- compliance concern,
- pilot cannot produce valid measurement.

A stop condition protects the organization from continuing an experiment simply because effort has already been spent.

---

# 12. PILOT MEASUREMENT AND CORRECTIVE ACTION

## 12.1 Pilot Measurement

Record measurements during the pilot.

Typical information includes:

- Measurement Date
- Metric
- Measured Value
- Unit
- Target Value
- Result Status
- Observation
- Measured By
- Evidence Record

Do not wait until the end of the pilot to reconstruct measurements from memory where ongoing measurement is possible.

---

## 12.2 Corrective Action

Use Corrective Action when pilot execution identifies an issue requiring controlled response.

A Corrective Action should identify:

- issue/finding,
- required action,
- owner,
- due date,
- status,
- completion date,
- completion evidence.

Corrective action is not intended to hide poor pilot performance. It should show what was learned and what intervention was tested.

---

# 13. PILOT REVIEW

A Pilot Review is performed after the Pilot is completed or stopped.

The review should summarize:

- results,
- success-criteria outcome,
- stop conditions triggered,
- commercial result,
- operational result,
- risk result,
- customer/channel result,
- key learning,
- recommendation.

Recommendations may include:

- Scale
- Extend Pilot
- Redesign
- Hold
- Stop

A negative result may still be valuable if it prevents a larger unsuccessful commitment.

---

# 14. SCALE DECISION

The Scale Decision records management's decision after pilot learning and G4 review.

Possible decisions:

- Scale
- Extend
- Redesign
- Hold
- Stop

The decision should include rationale and remain linked to:

- Pilot
- Pilot Review
- Commercial Opportunity
- Commercial Development Case

This preserves the traceability:

```text
Evidence
  ↓
Development Case
  ↓
Commercial Opportunity
  ↓
Governance
  ↓
Pilot
  ↓
Measurement / Corrective Action
  ↓
Pilot Review
  ↓
G4
  ↓
Scale Decision
```

---

# 15. USING THE CFG SHINKA COMMERCIAL WORKSPACE

The Workspace is the normal starting point for users.

## 15.1 Quick Actions

Quick Actions currently provide rapid creation for important records such as:

- Customer Enquiry
- Evidence Record
- Commercial Development Case
- Pilot

Use these for new records where the correct record type is already known.

---

## 15.2 Understand

The Understand area brings together Market Intelligence records used to learn what is happening in the market.

Typical records:

- Customer Enquiry
- Field Observation
- Competitor Observation
- Demand Signal
- Channel Observation
- Evidence Record

---

## 15.3 Develop

The Develop area covers:

- Commercial Development Case
- Commercial Opportunity

This is where observed reality becomes a structured commercial problem/opportunity and a possible response.

---

## 15.4 Govern

The Govern area covers:

- Commercial Assessment
- Risk Review
- Gate Review
- Approval Condition
- Decision Record

Use this area to control major decisions and preserve decision traceability.

---

## 15.5 Pilot

The Pilot area covers:

- Pilot
- Pilot Measurement
- Corrective Action
- Pilot Review
- Scale Decision

---

## 15.6 Number Cards and Charts

Number Cards and charts provide operational visibility.

They are intended to help users and managers answer questions such as:

- How many development cases remain open?
- How many opportunities are active?
- How much evidence remains pending verification?
- How many approval conditions remain open?
- How many pilots are active?
- Which pilots are awaiting review?
- What is the distribution of governance gates?
- What is the current pilot status distribution?

These indicators support attention and management review. They do not replace examination of the underlying records.

---

# 16. USING CONNECTIONS

Key records provide a **Connections** area showing related records.

Use Connections to move through the commercial chain instead of manually searching and duplicating information.

Examples:

### Commercial Development Case

May connect to:

- Commercial Opportunity
- Commercial Assessment
- Risk Review
- Gate Review
- Decision Record
- Pilot
- Scale Decision

### Commercial Opportunity

May connect to:

- Governance records
- Pilot
- Scale Decision

### Pilot

May connect to:

- Gate Review
- Pilot Measurement
- Corrective Action
- Pilot Review
- Scale Decision

### Pilot Review

May connect to:

- G4 Gate Review
- Scale Decision

The purpose of Connections is to preserve a visible evidence-to-decision chain.

---

# 17. USER ROLES AND OPERATING RESPONSIBILITIES

Actual permissions should follow assigned Frappe roles and organizational authority.

The following descriptions explain the intended operating responsibility.

## Commercial User

Typical responsibilities:

- capture commercial information,
- support development cases,
- support opportunities,
- maintain factual and timely records.

## Commercial Manager

Typical responsibilities:

- prioritize cases/opportunities,
- assign ownership,
- challenge weak assumptions,
- ensure commercial discipline.

## Market Intelligence User / Manager / Viewer

Typical responsibilities:

- capture or review market intelligence,
- improve evidence quality,
- verify recurring signals,
- support development cases.

## Governance User / Manager

Typical responsibilities:

- coordinate governance records,
- ensure required review is completed,
- maintain gate traceability.

## Commercial Approver

Typical responsibilities:

- make or support controlled governance decisions within authority.

## Finance Reviewer

Typical responsibilities:

- review financial implications where required.

## Operations Reviewer

Typical responsibilities:

- review operational feasibility and execution risk.

## QA Reviewer

Typical responsibilities:

- review quality/compliance implications where relevant.

## Pilot User / Manager / Reviewer

Typical responsibilities:

- prepare and execute pilots,
- maintain measurements,
- manage corrective actions,
- independently evaluate pilot outcomes where appropriate.

## Management Viewer

Typical responsibilities:

- review portfolio, decisions, performance and learning.

## Platform Administrator

Typical responsibilities:

- maintain platform configuration and controlled administration.

Access should follow the principle of **least privilege consistent with the user's work**.

---

# 18. PRACTICAL OPERATING RULES

1. **Understand reality before proposing a solution.**
2. **Do not treat assumptions as Evidence.**
3. **Do not create an Opportunity merely because someone has an idea.**
4. **Check for an existing Development Case before creating a duplicate.**
5. **Keep Evidence, Case, Opportunity and Pilot as separate concepts.**
6. **Do not pass a governance gate merely to keep work moving.**
7. **Define measurable Pilot success criteria before G3 approval.**
8. **Define stop conditions before pilot launch where material risk exists.**
9. **Record negative findings. They are commercially valuable learning.**
10. **Use Corrective Actions for controlled intervention, not to rewrite history.**
11. **Use Connections to navigate traceability rather than duplicating data.**
12. **ERPNext remains authoritative for standard sales, stock and financial transactions.**
13. **Do not delete inconvenient evidence or unsuccessful outcomes simply to improve appearance.**
14. **Escalate unclear authority rather than assuming approval.**
15. **Where the system does not represent a real business situation properly, record the feasibility issue for development review.**

---

# 19. PRACTICAL END-TO-END EXAMPLE

## Scenario

Several distributors report recurring stock-outs for a product range in the Northern Territory.

### Step 1 — Capture the signals

Create appropriate Channel Observations and/or Customer Enquiries.

Record factual details:

- distributor,
- territory,
- product,
- date,
- observed availability issue,
- supporting information.

### Step 2 — Build Evidence

Create or link Evidence Records showing that the condition occurs repeatedly.

### Step 3 — Open a Commercial Development Case

Example:

> Availability gap in Northern Territory may be causing lost sales and customer dissatisfaction.

### Step 4 — Develop a Commercial Opportunity

Possible response:

> Introduce a revised distributor replenishment method for selected outlets.

### Step 5 — G0

Determine whether the opportunity is worth structured investigation.

### Step 6 — G1

Verify through field/market evidence that the availability problem is real and commercially relevant.

### Step 7 — G2

Assess whether the proposed replenishment intervention is commercially and operationally feasible enough to test.

### Step 8 — Prepare Pilot

Example:

> Test revised replenishment with five distributors for six weeks.

Define success criteria such as:

- fill rate,
- availability,
- order frequency,
- customer complaints,
- lost-sales indicator.

Define stop conditions.

### Step 9 — G3

Approve or return the pilot plan.

### Step 10 — Execute and Measure

Record weekly measurements.

If a problem appears, create Corrective Action.

### Step 11 — Complete Pilot Review

Summarize:

- results,
- criteria achieved/not achieved,
- operational impact,
- customer/channel response,
- key learning.

### Step 12 — G4

Management reviews the Pilot Review.

### Step 13 — Scale Decision

Decide:

- Scale,
- Extend,
- Redesign,
- Hold,
- Stop.

The entire reasoning chain remains visible through linked records and Connections.

---

# 20. PRACTICAL DEPLOYMENT METHOD

Do not deploy every process to every user simultaneously without learning from actual use.

A controlled rollout is recommended.

## Suggested Initial User Group

A representative deployment group may include:

- 2–3 Commercial users
- 1 Commercial manager
- 1 Market Intelligence representative
- 1 Operations reviewer
- 1 Finance reviewer
- 1 Governance / management reviewer
- 1 Pilot manager or reviewer

Use **real business situations**, not only artificial test records.

---

# 21. USER FEEDBACK AS DEVELOPMENT INPUT

Operational use is expected to reveal where the system needs adjustment.

Users should report issues such as:

- process unclear,
- terminology confusing,
- too many steps,
- unnecessary mandatory field,
- missing field,
- duplicate data entry,
- wrong default,
- permission problem,
- workflow bottleneck,
- approval bottleneck,
- missing connection,
- missing report,
- missing dashboard information,
- missing automation,
- field not practically useful,
- mobile usability problem,
- real business scenario cannot be represented,
- need for configuration rather than custom development.

Feedback should not automatically trigger software changes.

First determine whether the issue is primarily:

```text
TRAINING
CONFIGURATION
PERMISSION
DATA QUALITY
PROCESS DESIGN
USER EXPERIENCE
SOFTWARE DESIGN
MISSING FUNCTIONALITY
```

Only genuine software/design gaps should become development candidates.

---

# 22. DEVELOPMENT FEEDBACK LOOP

The development approach should operate as:

```text
BUILD
  ↓
USE IN REAL WORK
  ↓
OBSERVE
  ↓
COLLECT FEEDBACK
  ↓
CLASSIFY THE ISSUE
  ↓
VERIFY WHETHER RECURRING
  ↓
ASSESS BUSINESS IMPACT
  ↓
TRAIN / CONFIGURE / CORRECT / DEVELOP
  ↓
TEST
  ↓
RELEASE
  ↓
LEARN AGAIN
```

This prevents the platform from being developed only from theoretical assumptions.

---

# 23. SUGGESTED DEVELOPMENT FEEDBACK REGISTER

A future structured **CFG Development Feedback / Operational Feasibility** record is recommended.

Suggested fields:

| Field | Purpose |
|---|---|
| Reported By | User who identified the issue |
| Date | Date observed |
| Module | Affected module |
| DocType | Affected record type |
| Record | Specific record where applicable |
| Process Stage | Where in the workflow |
| Feedback Type | UX / process / permission / data / reporting / etc. |
| Description | What happened |
| Expected Behaviour | What the user expected |
| Actual Behaviour | What the system did |
| Business Impact | Why it matters |
| Frequency | One-off / recurring |
| Workaround | Temporary workaround if any |
| Suggested Improvement | User suggestion |
| Evidence / Screenshot | Supporting material |
| Priority | Review priority |
| Status | New / Reviewed / Planned / Rejected / Implemented |
| Development Decision | Agreed response |
| Target Release | Planned release if development is required |

This concept should be validated operationally before it is formally developed.

---

# 24. WEEKLY FEASIBILITY REVIEW

During active rollout and development, conduct a short weekly review.

Questions:

1. What real work did users try to perform?
2. What worked correctly?
3. What was confusing?
4. What required a workaround?
5. Which steps felt unnecessary?
6. What information was missing?
7. What information was requested but not useful?
8. Which decisions could not be represented properly?
9. Were permissions appropriate?
10. Did Connections provide enough traceability?
11. Did the Workspace surface the right operational priorities?
12. Is the issue training, process, configuration or software?
13. What requires development?
14. What should remain unchanged?

The objective is **learning**, not merely collecting complaints.

---

# 25. DOCUMENTATION UPDATE RULE

Every future development batch should include a documentation impact check.

Ask:

```text
Does this change affect:

[ ] User workflow
[ ] Record meaning
[ ] Terminology
[ ] Role responsibility
[ ] Permission/access
[ ] Required fields
[ ] Gate decisions
[ ] Pilot process
[ ] Workspace/navigation
[ ] Dashboard/reporting
[ ] Practical operating instructions
[ ] Planned vs implemented capability
```

If any item is checked, update this Markdown guide in the same development release.

This reduces the risk of software and operating documentation drifting apart.

---

# 26. DOCUMENT CONTROL AND PUBLISHING METHOD

## Controlled Master

The Markdown file is the controlled editable source:

```text
CFG_Shinka_Commercial_User_Workflow_Deployment_Guide.md
```

Recommended application repository location:

```text
docs/user_guides/
CFG_Shinka_Commercial_User_Workflow_Deployment_Guide.md
```

## Printable Versions

Generate controlled DOCX/PDF snapshots at important milestones.

Suggested cadence:

```text
v0.5.x → Rev.00
v0.6.x → Rev.01
v0.7.x → Rev.02
...
v1.0.0 → Formal operational baseline
```

A printable document should identify:

- document revision,
- application release baseline,
- issue date,
- approval/status where required.

The Markdown source continues evolving after each published snapshot.

---

# 27. REVISION HISTORY

| Revision | Application Baseline | Date | Summary |
|---|---|---|---|
| Rev.00 | v0.5.x | 2026-09-02 | Initial user, workflow and practical deployment guide covering Market Intelligence, Commercial Core, G0–G4 Governance, Pilot Management, Workspace, Connections and development feedback loop. |

---

# 28. CURRENT CONTROL NOTE

This guide reflects the **implemented CFG Shinka Commercial v0.5.x capability** described in the current project baseline.

Future functionality—including Market Vacuum, Customer Access, Channel Resilience, Knowledge & Learning, Platform Administration enhancements and AI-assisted intelligence—must be incorporated into this guide only when the relevant operating design and implementation are sufficiently established.

The guiding principle is:

> **The application should evolve from observed commercial reality, and the documentation should evolve together with the application.**

