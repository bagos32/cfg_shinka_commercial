/*
 * CFG Shinka Commercial User Manual
 *
 * Keep the route name because it is already shipped in the Workspace fixture.
 * Add and revise help topics in MANUAL_SECTIONS below. The page is deliberately
 * data-driven so documentation can grow without changing the rendering logic.
 */

frappe.pages["cfg-shinka-commercia"].on_page_load = function (wrapper) {
	frappe.require("/assets/cfg_shinka_commercial/css/cfg_shinka_manual.css", function () {
		new CFGShinkaManual(wrapper);
	});
};

const MANUAL_REVISION = {
	version: "0.5.x",
	revision: "Rev.02",
	date: "14 September 2026",
	status: "Living manual",
};

const MANUAL_SECTIONS = [
	{
		id: "getting-started", title: "Getting Started", icon: "milestone", status: "Available",
		summary: "Understand the operating model, choose the right record, and begin safely.",
		topics: [
			{ title: "The commercial operating loop", keywords: "overview philosophy attract understand create convert deliver retain sustain evolve",
				body: "CFG Shinka Commercial turns observations into controlled decisions. The working sequence is: observe reality, capture evidence, develop a case, form an opportunity, govern the decision, run a controlled pilot, measure, learn, and then scale, extend, redesign, hold, or stop.",
				steps: ["Capture what actually happened in a Market Intelligence record.", "Consolidate verified facts in an Evidence Record.", "Use a Commercial Development Case to investigate the condition.", "Create a Commercial Opportunity only when a defined response is ready for evaluation.", "Use governance gates and a controlled pilot before material commitment."],
				roles: ["All users"], links: ["Customer Enquiry", "Evidence Record", "Commercial Development Case", "Commercial Opportunity"] },
			{ title: "Which record should I create?", keywords: "choose record difference enquiry evidence case opportunity pilot",
				body: "Use an enquiry or observation for a raw signal; Evidence Record for substantiated facts; Commercial Development Case for investigation; Commercial Opportunity for a qualified value proposition; and Pilot for a time-bound approved experiment. Do not duplicate the same fact across records—link it.",
				roles: ["CFG Commercial User", "CFG Market Intelligence User"], links: ["Field Observation", "Market Price Survey", "Competitor Observation", "Demand Signal", "Channel Observation"] },
			{ title: "Record selection quick reference", keywords: "real world situation record selection assessment risk gate condition decision measurement corrective review scale",
				body: "Match the record to what has actually happened: customer request → Customer Enquiry; direct field fact → Field Observation; competitor fact → Competitor Observation; recurring demand indication → Demand Signal; dealer or route-to-market condition → Channel Observation; substantiated conclusion → Evidence Record; condition requiring investigation → Commercial Development Case; defined response → Commercial Opportunity; structured evaluation → Commercial Assessment; material uncertainty → Risk Review; stage decision → Gate Review; conditional approval → Approval Condition; formal rationale → Decision Record; controlled experiment → Pilot; result reading → Pilot Measurement; execution issue → Corrective Action; completed experiment evaluation → Pilot Review; management disposition → Scale Decision.",
				roles: ["All users"], links: ["Commercial Assessment", "Risk Review", "Gate Review", "Pilot Measurement", "Corrective Action", "Pilot Review", "Scale Decision"] },
			{ title: "Keep the five core concepts separate", keywords: "concept evidence case opportunity pilot erpnext transaction difference",
				body: "Evidence describes a fact. A Development Case manages the underlying condition. A Commercial Opportunity describes a possible response. A Pilot tests that response under controlled limits. ERPNext then remains authoritative for Leads, Customers, Items, Quotations, Sales Orders, Deliveries, Invoices, stock, and accounting. A CFG Commercial Opportunity is not the same record as an ERPNext sales Opportunity.",
				roles: ["CFG Commercial User", "CFG Commercial Manager"], links: ["Evidence Record", "Commercial Development Case", "Commercial Opportunity", "Pilot", "Opportunity"] },
			{ title: "Use the Workspace and Connections", keywords: "workspace quick action cards charts connections navigation duplicate traceability",
				body: "Start from the CFG Shinka Commercial Workspace. Quick Actions create common records; Understand captures market reality; Develop manages cases and responses; Govern controls decisions; Pilot manages experiments. Number Cards and charts direct attention but never replace record review. Use each document's Connections area to follow the evidence-to-decision chain instead of searching manually or duplicating information.",
				steps: ["Open the CFG Shinka Commercial Workspace.", "Choose the business area matching the current task.", "Use a Quick Action only when the correct record type is already known.", "Open Connections on the parent record before creating a related record.", "Review the underlying records behind every dashboard indicator."],
				roles: ["All users"], links: ["Customer Enquiry", "Evidence Record", "Commercial Development Case", "Pilot"] },
			{ title: "Fifteen practical operating rules", keywords: "rules assumptions duplicate negative findings authority escalation",
				body: "Understand reality before proposing a solution; never treat assumptions as evidence; do not create an opportunity merely because someone has an idea; check for an existing case; keep Evidence, Case, Opportunity and Pilot separate; do not pass a gate only to keep work moving; define success and stop conditions before launch; record negative findings; use corrective actions without rewriting history; navigate through Connections; keep ERPNext authoritative for transactions; retain inconvenient evidence; escalate unclear authority; and report real situations the platform cannot represent.",
				roles: ["All users"], links: ["Evidence Record", "Gate Review", "Pilot", "Corrective Action"] },
			{ title: "Worked example: recurring distributor stock-outs", keywords: "example northern territory stock out replenishment distributor end to end",
				body: "Several distributors report recurring stock-outs. Capture enquiries and channel observations, consolidate repeat evidence, open one case for the availability gap, define a possible replenishment response, pass G0–G2, prepare a six-week five-distributor pilot with fill-rate and availability criteria, obtain G3, measure weekly, review the result at G4, and record whether to scale, extend, redesign, hold, or stop.",
				steps: ["Capture distributor, territory, product, date, availability issue, and source.", "Link repeated facts into Evidence Records.", "Open one Development Case for the underlying availability condition.", "Create the proposed replenishment Opportunity.", "Complete G0, G1, commercial/risk review, and G2.", "Define scope, baseline, success criteria, stop conditions, and measurement rhythm.", "Obtain G3, execute, measure, and correct transparently.", "Complete Pilot Review, G4, and Scale Decision."],
				roles: ["CFG Commercial User", "CFG Commercial Manager", "CFG Pilot Manager"], links: ["Channel Observation", "Commercial Development Case", "Commercial Opportunity", "Pilot", "Scale Decision"] },
		],
	},
	{
		id: "commercial-core", title: "Commercial Core", icon: "organization", status: "Available",
		summary: "Develop traceable business cases and qualified commercial opportunities.",
		topics: [
			{ title: "Develop a Commercial Development Case", keywords: "development case problem gap root cause hypothesis",
				body: "A case is the investigation workspace between evidence and an opportunity. State the observed condition, desired condition, gap, affected parties, evidence, assumptions, ownership, and next action.",
				steps: ["Open Commercial Development Case.", "Link the relevant Evidence Records.", "Define the condition and gap without jumping to a solution.", "Assign an owner and review date.", "Create or link an opportunity when the response is sufficiently defined."],
				roles: ["CFG Commercial User", "CFG Commercial Manager"], links: ["Commercial Development Case", "Evidence Record"] },
			{ title: "Qualify a Commercial Opportunity", keywords: "opportunity qualification value customer scope economics owner",
				body: "An opportunity is not merely an idea or sales lead. Record the customer or beneficiary, value proposition, evidence, commercial logic, constraints, risks, authority needs, and intended route to validation.",
				roles: ["CFG Commercial Manager"], links: ["Commercial Opportunity", "Commercial Assessment"] },
			{ title: "Avoid duplicate Development Cases", keywords: "duplicate existing case connections ownership collaboration investigation",
				body: "Create a case when several observations point to one underlying condition, more evidence is required, multiple teams must collaborate, or several responses may need evaluation. Search existing cases and inspect Connections first. One condition can support several competing opportunities; it should not be fragmented into duplicate cases merely because different teams noticed it.",
				steps: ["Search by customer, territory, product, channel, and condition.", "Open likely matches and inspect their evidence and Connections.", "Update or join the existing case when the underlying condition is the same.", "Create a new case only when its condition, ownership, or decision boundary is materially different."],
				roles: ["CFG Commercial User", "CFG Commercial Manager"], links: ["Commercial Development Case"] },
			{ title: "Connect CFG development to ERPNext transactions", keywords: "erpnext opportunity quotation sales order delivery invoice conversion authoritative",
				body: "CFG records govern development and learning; ERPNext records execute ordinary sales and financial transactions. Convert or link to an ERPNext Opportunity only when the prospect reaches the appropriate sales stage. Never use CFG records as substitutes for quotations, sales orders, deliveries, invoices, stock movements, or accounting entries.",
				roles: ["CFG Commercial Manager"], links: ["Commercial Opportunity", "Opportunity", "Quotation", "Sales Order", "Delivery Note", "Sales Invoice"] },
		],
	},
	{
		id: "market-intelligence", title: "Market Intelligence", icon: "search", status: "Available",
		summary: "Capture market signals and convert observations into verifiable evidence.",
		topics: [
			{ title: "Capture a market signal", keywords: "customer enquiry field competitor demand channel observation source",
				body: "Choose the record that matches the source: Customer Enquiry, Field Observation, Market Price Survey, Competitor Observation, Demand Signal, or Channel Observation. Record the date, location or market context, source, observable fact, and attachment where available. Keep interpretation separate from evidence.",
				steps: ["Select the matching observation type.", "Record who, where, and when.", "Write the observable fact in neutral language.", "Attach or reference the source.", "Link it to an Evidence Record when it supports a decision."],
				roles: ["CFG Market Intelligence User", "CFG Market Intelligence Manager"], links: ["Customer Enquiry", "Field Observation", "Market Price Survey", "Competitor Observation", "Demand Signal", "Channel Observation"] },
			{ title: "Build an Evidence Record", keywords: "evidence verification reliability source confidence traceability",
				body: "Evidence must be traceable to a source and strong enough for its intended decision. Identify whether it is direct or indirect, record confidence and verification state, and link it to the case rather than copying it.",
				roles: ["CFG Market Intelligence Manager", "CFG Commercial Manager"], links: ["Evidence Record"] },
			{ title: "Use Customer Enquiry correctly", keywords: "customer enquiry interest need request complaint product availability",
				body: "Use Customer Enquiry when a customer or prospect expresses interest, a need, request, question, complaint, availability concern, or market requirement. Record the customer's own signal faithfully. One enquiry is an input for investigation—not proof that broad market demand exists.",
				steps: ["Identify the customer or prospect and enquiry channel.", "Record the date, requested product or service, territory, and factual wording.", "Attach source material where permitted.", "Link recurring or verified enquiries to Evidence Records.", "Escalate patterns into a Demand Signal or Development Case only when supported."],
				roles: ["CFG Market Intelligence User"], links: ["Customer Enquiry", "Evidence Record", "Demand Signal"] },
			{ title: "Record a Field Observation", keywords: "field observation direct outlet shelf behaviour obstacle map place territory",
				body: "Use Field Observation for something CFG personnel directly see: unavailable products, buying behaviour, shelf changes, dealer practices, customer workarounds, or operational obstacles. Record the observed condition separately from your interpretation. Reuse a governed CFG Place where available so location and territory validation remain consistent.",
				steps: ["Select the observation date, observer, type, and relevant company.", "Choose the governed CFG Place or capture the permitted location.", "Describe only what was observed.", "Record interpretation or implication in its designated field.", "Attach evidence and link the observation to the relevant evidence or case."],
				roles: ["CFG Market Intelligence User", "CFG Market Intelligence Manager"], links: ["Field Observation", "CFG Place", "CFG Territory Geography"] },
			{ title: "Record a Market Price Survey", keywords: "market price merchandise survey sku competitor promotion normalized unit outlet",
				body: "Use one Market Price Survey for one outlet visit and one row per own, OEM, competitor or other product. Select a governed CFG Place where available, record the pack basis, regular and promotional price, availability, shelf facings and permitted image, then review the calculated effective price, unit price and factual reference difference. Link material findings to Evidence; the survey never creates a Case automatically.",
				roles: ["CFG Market Intelligence User", "CFG Market Intelligence Manager"], links: ["Market Price Survey", "CFG Place", "Evidence Record"] },
			{ title: "Record factual Competitor Intelligence", keywords: "competitor product pricing promotion distribution service intent fact",
				body: "Use Competitor Observation for a new product, price movement, promotion, distribution presence, service model, or channel change. Record the observable fact, source, market, and date. Keep speculation about competitor intent clearly separated and never present assumption as verified fact.",
				roles: ["CFG Market Intelligence User", "CFG Commercial Manager"], links: ["Competitor Observation", "Evidence Record"] },
			{ title: "Recognize a Demand Signal", keywords: "demand signal repeated enquiries volume pattern stockout emerging segment regional shift",
				body: "Use Demand Signal when repeated enquiries, recurring requests, volume patterns, stock-out complaints, emerging segments, or regional changes indicate demand may exist or be shifting. State the pattern, period, segment, geography, and supporting records. A signal justifies investigation; it does not automatically justify investment.",
				roles: ["CFG Market Intelligence User", "CFG Commercial Manager"], links: ["Demand Signal", "Customer Enquiry", "Evidence Record"] },
			{ title: "Capture a Channel Observation", keywords: "channel distributor dealer retailer route market availability displacement resilience",
				body: "Use Channel Observation for distributor, dealer, retailer, alternative-outlet, route-to-market, availability, capability, displacement, or resilience conditions. Identify the affected channel, territory, product or segment, the observed fact, and its source. Link material access failures to Market Vacuum analysis rather than declaring a vacuum from one observation.",
				roles: ["CFG Market Intelligence User", "CFG Commercial Manager"], links: ["Channel Observation", "Market Vacuum", "Channel Resilience Assessment"] },
			{ title: "Verify evidence quality", keywords: "evidence quality source date location who verified confidence inconvenient conclusion",
				body: "A useful Evidence Record answers what happened, where, when, who observed or reported it, how it was verified, which records support it, and which business condition it may inform. Preserve contradictory and negative evidence. Evidence must not be edited merely because it weakens a preferred proposal.",
				steps: ["Link the originating enquiries and observations.", "State the evidence claim narrowly.", "Record source reliability and verification status.", "Identify limitations, contradictions, and confidence.", "Link the evidence to the Development Case it supports."],
				roles: ["CFG Market Intelligence Manager", "CFG Governance User"], links: ["Evidence Record", "Commercial Development Case"] },
		],
	},
	{
		id: "commercial-governance", title: "Commercial Governance", icon: "approval", status: "Available",
		summary: "Apply evidence-based G0–G4 controls, risk review, and decision traceability.",
		topics: [
			{ title: "Use the G0–G4 stage gates", keywords: "gate review g0 g1 g2 g3 g4 approve reject hold decision",
				body: "G0 accepts a lead for development; G1 validates the market condition; G2 confirms business feasibility; G3 authorizes pilot readiness; G4 reviews pilot evidence. A valid gate outcome can request information, return, hold, reject, or stop—the purpose is decision quality, not automatic progression.",
				steps: ["Confirm the gate matches the current lifecycle stage.", "Review linked evidence, assessment, risks, and open conditions.", "Record the decision and rationale.", "Assign conditions, owners, and due dates where required.", "Do not advance while mandatory conditions remain unresolved."],
				roles: ["CFG Governance User", "CFG Governance Manager", "CFG Commercial Approver"], links: ["Gate Review", "Decision Record", "Approval Condition"] },
			{ title: "Complete cross-functional review", keywords: "risk finance operations qa commercial assessment authority limits",
				body: "Use Commercial Assessment and Risk Review to expose assumptions, authority limits, financial impact, operational capacity, quality concerns, legal or reputational exposure, and mitigation ownership before commitment.",
				roles: ["CFG Finance Reviewer", "CFG Operations Reviewer", "CFG QA Reviewer"], links: ["Commercial Assessment", "Risk Review"] },
			{ title: "G0 — Lead Accepted", keywords: "g0 lead accepted screening missing information investigation",
				body: "G0 asks whether the opportunity is relevant enough for formal investigation. Do not demand final proof at this stage. Confirm a recognizable condition, responsible owner, initial relevance, and enough information to screen it. Accept for screening or return for missing information; do not imply approval to invest or launch.",
				roles: ["CFG Governance User", "CFG Commercial Manager"], links: ["Gate Review", "Commercial Opportunity"] },
			{ title: "G1 — Field / Market Validated", keywords: "g1 field market validated credible evidence qualify further validation reject hold",
				body: "G1 asks whether credible evidence shows the condition is real and commercially relevant. Review source quality, recurrence, affected parties, location, timing, and contradictory findings. Qualify only when evidence is sufficient; otherwise request further validation, hold, or reject with a recorded reason.",
				roles: ["CFG Governance Manager", "CFG Market Intelligence Manager"], links: ["Gate Review", "Evidence Record"] },
			{ title: "G2 — Business Feasible", keywords: "g2 business feasible commercial financial operations quality supply risk",
				body: "G2 asks whether a plausible, sufficiently controlled response is worth preparing for a pilot. Review commercial value, financial exposure, operational capacity, supply, quality, customer and channel effects, risks, authority, and open conditions. Passing G2 permits controlled preparation—not immediate scale.",
				roles: ["CFG Commercial Approver", "CFG Finance Reviewer", "CFG Operations Reviewer", "CFG QA Reviewer"], links: ["Gate Review", "Commercial Assessment", "Risk Review"] },
			{ title: "G3 — Pilot Ready", keywords: "g3 pilot ready launch objective hypothesis scope dates criteria stop measurement approval",
				body: "G3 asks whether the experiment is defined well enough to launch. The Pilot should have a clear objective and hypothesis, bounded scope, accountable owner, dates, baseline, measurable success criteria, stop conditions, measurement method, resources, and resolved mandatory approval conditions.",
				steps: ["Review the approved Commercial Opportunity and Pilot scope.", "Confirm success criteria were defined before results are known.", "Confirm stop conditions and escalation owners.", "Check measurement timing, data sources, resources, and authority limits.", "Approve, approve conditionally, return, hold, or reject with rationale."],
				roles: ["CFG Commercial Approver", "CFG Pilot Manager", "CFG Governance Manager"], links: ["Gate Review", "Pilot", "Pilot Success Criterion", "Pilot Stop Condition"] },
			{ title: "G4 — Pilot Reviewed", keywords: "g4 pilot reviewed evidence recommendation scale extend redesign hold stop",
				body: "G4 asks what the pilot proved and what should happen next. Review actual measurements, criteria achievement, stop events, corrective actions, commercial and operational results, risk, customer/channel effects, limitations, and lessons. The outcome may be scale, extend, redesign, hold, or stop; a negative result can still be valuable.",
				roles: ["CFG Commercial Approver", "CFG Pilot Reviewer", "CFG Governance Manager"], links: ["Gate Review", "Pilot Review", "Scale Decision"] },
			{ title: "Write a useful Commercial Assessment", keywords: "commercial assessment proposition customer value economics assumptions feasibility",
				body: "Use Commercial Assessment to document the proposition, target customer or beneficiary, expected value, commercial model, costs and benefits, dependencies, constraints, assumptions, alternatives, and recommendation. It must help reviewers challenge the response—not become a form completed only to satisfy a gate.",
				roles: ["CFG Commercial Manager", "CFG Finance Reviewer"], links: ["Commercial Assessment", "Commercial Opportunity"] },
			{ title: "Review and manage material risk", keywords: "risk review financial operational quality customer channel supply implementation reputation mitigation owner",
				body: "Identify financial, operational, supply, quality, customer, channel, implementation, legal/compliance, and reputational risks. Record likelihood, impact, existing controls, proposed mitigation, owner, due date, residual exposure, and review conclusion. The goal is conscious control—not pretending risk can be eliminated.",
				roles: ["CFG Governance User", "CFG Finance Reviewer", "CFG Operations Reviewer", "CFG QA Reviewer"], links: ["Risk Review", "Approval Condition"] },
			{ title: "Control conditional approvals", keywords: "approval condition finance confirmation customer agreement stock quality boundary due closure",
				body: "Create an Approval Condition when work may proceed only after a specific requirement is satisfied—for example finance confirmation, customer agreement, stock availability, quality approval, restricted pilot boundary, or closure of corrective action. Give every condition an owner, due date, evidence requirement, and closure state.",
				steps: ["Describe one testable requirement per condition.", "Assign an accountable owner and due date.", "Link it to the relevant Gate Review and decision.", "Attach completion evidence.", "Do not mark it closed until the requirement is actually satisfied."],
				roles: ["CFG Governance User", "CFG Commercial Approver"], links: ["Approval Condition", "Decision Record", "Gate Review"] },
		],
	},
	{
		id: "market-vacuum", title: "Market Vacuum", icon: "map", status: "Pilot",
		summary: "Detect and qualify gaps where customers lose practical access to supply.",
		topics: [
			{ title: "Assess a Market Vacuum", keywords: "vacuum detect verify map quantify qualify availability supply gap",
				body: "A market vacuum is a verified gap between customer need and practical access to supply. Follow detect, verify, map, quantify, and qualify. Distinguish evidence of lost access from an untested sales assumption.",
				steps: ["Capture the signal and affected location or segment.", "Verify the loss or weakness of access using multiple sources where practical.", "Map affected customers, channels, and alternatives.", "Estimate magnitude, duration, and urgency.", "Qualify whether CFG can respond responsibly through an approved pilot."],
				roles: ["CFG Market Intelligence User", "CFG Commercial Manager"], links: ["Market Vacuum", "CFG Territory Geography", "CFG Place"] },
			{ title: "Classify and prioritize the access gap", keywords: "market vacuum type geographic channel product timing information service displacement priority",
				body: "Classify whether the gap is geographic, channel, product/SKU, timing, information, service, or created by channel displacement. Prioritize verified customer-access loss, strategic importance, urgency, recoverability, duration, commercial magnitude, and CFG's ability to respond without unacceptable channel conflict or operational risk.",
				roles: ["CFG Commercial Manager", "CFG Market Intelligence Manager"], links: ["Market Vacuum", "Channel Observation"] },
			{ title: "Use the Detect → Verify → Map → Quantify → Qualify loop", keywords: "detect verify map quantify qualify response loop",
				body: "Detect signals from enquiries, field work, channels, sales patterns, or supply changes. Verify that access loss is real. Map affected customers, places, territory and alternatives. Quantify likely magnitude and duration with transparent assumptions. Qualify the response against feasibility, risk, channel implications, and evidence before creating a governed Opportunity or Pilot.",
				roles: ["CFG Market Intelligence User", "CFG Commercial Manager"], links: ["Customer Enquiry", "Field Observation", "Market Vacuum", "Commercial Opportunity"] },
			{ title: "Use GEO-1 maps correctly", keywords: "geo1 territory geography cfg place point inside outside boundary review map route live movement",
				body: "GEO-1 supports governed Territory Geography polygons, reusable CFG Place points, and inside/outside boundary review. An outside point is retained and flagged for review rather than silently rejected. Route drawing, territory-crossing detection, completed-trip recording, and live GPS monitoring are not part of GEO-1 and must remain marked as future GEO-2/GEO-3/GEO-4 capability.",
				roles: ["CFG Platform Administrator", "CFG Market Intelligence User"], links: ["CFG Territory Geography", "CFG Place", "Field Observation"] },
		],
	},
	{
		id: "pilot-management", title: "Pilot Management", icon: "experiment", status: "Available",
		summary: "Run bounded experiments with success criteria, stop conditions, and learning.",
		topics: [
			{ title: "Prepare and launch a controlled pilot", keywords: "pilot success criterion stop condition launch baseline measurement",
				body: "A pilot must have a defined hypothesis, scope, owner, duration, baseline, success criteria, stop conditions, measurement plan, resource limits, and G3 approval before launch.",
				steps: ["Create the Pilot and link the approved opportunity.", "Define measurable success criteria and their baselines.", "Define explicit stop conditions before work begins.", "Confirm owners, resources, review rhythm, and evidence collection.", "Obtain G3 approval, then record the actual launch."],
				roles: ["CFG Pilot User", "CFG Pilot Manager"], links: ["Pilot", "Pilot Success Criterion", "Pilot Stop Condition"] },
			{ title: "Measure, review, and decide", keywords: "measurement corrective action review scale extend redesign hold stop",
				body: "Record measurements against the agreed baseline and criteria. Treat deviations with Corrective Action, complete Pilot Review, pass G4, and record one explicit Scale Decision: scale, extend, redesign, hold, or stop.",
				roles: ["CFG Pilot Manager", "CFG Pilot Reviewer"], links: ["Pilot Measurement", "Corrective Action", "Pilot Review", "Scale Decision"] },
			{ title: "Define measurable success criteria", keywords: "criterion metric target unit method mandatory baseline success",
				body: "Define what success means before launch. Each criterion should state the outcome, metric, target, unit, baseline, measurement method, frequency, evidence source, and whether it is mandatory. Do not redefine a target after seeing results merely to make the pilot appear successful.",
				steps: ["Name the result to be demonstrated.", "Choose a metric directly connected to that result.", "Record baseline, numeric or categorical target, and unit.", "Define who measures, how, from which source, and how often.", "Mark mandatory criteria and obtain agreement before G3."],
				roles: ["CFG Pilot Manager", "CFG Commercial Manager"], links: ["Pilot Success Criterion", "Pilot"] },
			{ title: "Define and act on stop conditions", keywords: "stop condition monitor correct pause stop escalate harm quality financial compliance supply",
				body: "Define foreseeable conditions requiring Monitor, Correct, Pause Pilot, Stop Pilot, or Escalate. Examples include customer harm, unacceptable quality, repeated supply failure, exposure beyond the approved limit, compliance concerns, or inability to produce valid measurements. Sunk effort is never a reason to ignore a triggered condition.",
				roles: ["CFG Pilot Manager", "CFG QA Reviewer", "CFG Commercial Approver"], links: ["Pilot Stop Condition", "Corrective Action"] },
			{ title: "Record Pilot Measurements during execution", keywords: "pilot measurement date measured value target status observation evidence",
				body: "Record measurements while the pilot runs rather than reconstructing them from memory. Capture measurement date, metric, measured value, unit, target, result status, observation, measured-by user, and supporting Evidence Record. Preserve missed targets and anomalies.",
				roles: ["CFG Pilot User", "CFG Pilot Manager"], links: ["Pilot Measurement", "Evidence Record"] },
			{ title: "Manage a Corrective Action transparently", keywords: "corrective action issue finding owner due completion evidence root cause",
				body: "Use Corrective Action when execution reveals an issue requiring a controlled response. Record the finding, immediate containment where needed, required action, owner, due date, status, completion date, and completion evidence. A corrective action shows the intervention tested; it must not conceal the original poor result.",
				roles: ["CFG Pilot User", "CFG Pilot Manager"], links: ["Corrective Action", "Pilot Measurement"] },
			{ title: "Complete an evidence-based Pilot Review", keywords: "pilot review completed stopped criteria commercial operational risk customer learning recommendation",
				body: "Review a completed or stopped Pilot. Summarize results, criteria achieved and missed, stop conditions, corrective actions, commercial outcome, operational outcome, risk outcome, customer/channel response, limitations, and key learning. Recommend scale, extend, redesign, hold, or stop without suppressing negative findings.",
				roles: ["CFG Pilot Reviewer", "CFG Commercial Manager"], links: ["Pilot Review", "Pilot", "Pilot Measurement", "Corrective Action"] },
			{ title: "Record the final Scale Decision", keywords: "scale decision scale extend redesign hold stop rationale management traceability",
				body: "After Pilot Review and G4, record one explicit management decision: Scale, Extend, Redesign, Hold, or Stop. Explain the rationale, conditions, owner, timing, scope, and next review. Keep it linked to the Pilot, Review, Opportunity, and Development Case so the original evidence remains traceable.",
				roles: ["CFG Commercial Approver", "CFG Management Viewer"], links: ["Scale Decision", "Pilot Review", "Commercial Opportunity", "Commercial Development Case"] },
		],
	},
	{
		id: "customer-access", title: "Customer Access", icon: "customer", status: "Pilot",
		summary: "Protect access through mapped outlets, redirection, and channel resilience.",
		topics: [
			{ title: "Respond to disrupted customer access", keywords: "access point customer redirection channel resilience outlet coverage disruption",
				body: "When a normal channel weakens, verify the affected need, identify practical alternative access points, communicate accurately, record redirection, and measure whether access was actually restored. Avoid creating unnecessary channel conflict.",
				steps: ["Confirm the affected customer need and geography.", "Review current Access Points and their capacity.", "Record a Customer Redirection to the most suitable valid outlet.", "Assess channel resilience and conflict risk.", "Measure fulfillment and feed the result into learning."],
				roles: ["CFG Commercial User", "CFG Commercial Manager"], links: ["Access Point", "Customer Redirection", "Channel Resilience Assessment"] },
			{ title: "Maintain a reliable Access Point", keywords: "access point outlet distributor retailer location capacity hours products customer",
				body: "An Access Point represents a practical place or channel through which customers can obtain supply. Maintain its governed place, territory, channel or outlet identity, status, product relevance, operating limitations, capacity or availability information, and responsible owner. An active record must reflect real access—not merely an address in a database.",
				roles: ["CFG Commercial User", "CFG Commercial Manager"], links: ["Access Point", "CFG Place"] },
			{ title: "Record Customer Redirection and confirm recovery", keywords: "customer redirection alternative outlet referral fulfilment recovery",
				body: "Use Customer Redirection when an affected customer is directed to a practical alternative source. Record the triggering need, originating and destination access points where applicable, reason, date, responsible user, customer communication, and outcome. Follow up to confirm whether the customer actually obtained supply.",
				steps: ["Confirm the customer's need and affected territory.", "Check destination status, suitability, capacity, and product availability.", "Explain the alternative accurately without making unverified promises.", "Record the redirection and related Market Vacuum or enquiry.", "Confirm fulfillment, failure, or further redirection and preserve the outcome as evidence."],
				roles: ["CFG Commercial User", "CFG Market Intelligence User"], links: ["Customer Redirection", "Customer Enquiry", "Evidence Record"] },
			{ title: "Assess Channel Resilience", keywords: "channel resilience dependency concentration alternative outlet recovery shock risk",
				body: "Assess whether customer access can continue when a distributor, outlet, route, supply source, or normal channel is disrupted. Consider concentration, alternative coverage, switching time, capacity, geographic reach, product compatibility, customer communication, commercial conflict, and recovery evidence. Do not assume that listing an alternative means it can absorb demand.",
				roles: ["CFG Commercial Manager", "CFG Operations Reviewer"], links: ["Channel Resilience Assessment", "Access Point", "Market Vacuum"] },
			{ title: "Manage OEM and house-brand coexistence", keywords: "oem house brand coexistence conflict channel displacement customer access",
				body: "Evaluate OEM commitments, house-brand activity, territory ownership, pricing, customer relationships, confidentiality, and channel displacement before responding to an access gap. Classify potential conflict explicitly and govern the response; customer-access improvement must not silently create contractual, reputational, or channel harm.",
				roles: ["CFG Commercial Manager", "CFG Governance Manager"], links: ["Risk Review", "Commercial Assessment", "Channel Resilience Assessment"] },
		],
	},
	{
		id: "knowledge-learning", title: "Knowledge & Learning", icon: "education", status: "Coming Soon",
		summary: "Turn operational evidence and decisions into reusable organizational knowledge.",
		topics: [
			{ title: "Learning and standardization", keywords: "learning knowledge standardize lessons revision corporate memory",
				body: "Dedicated Knowledge & Learning functions are planned. Until released, preserve learning in linked Pilot Reviews, Scale Decisions, Decision Records, and controlled documentation. Record what changed, why it changed, what evidence supports it, and where the standard should be updated.",
				roles: ["All users"], links: ["Pilot Review", "Scale Decision", "Decision Record"] },
			{ title: "Classify user feedback before requesting development", keywords: "feedback training configuration permission data quality process ux software missing functionality",
				body: "When the system feels difficult or incomplete, record what the user attempted, expected behavior, actual behavior, business impact, frequency, workaround, and evidence. Classify the issue first as Training, Configuration, Permission, Data Quality, Process Design, User Experience, Software Design, or Missing Functionality. Not every problem requires new code.",
				roles: ["All users", "CFG Platform Administrator"], links: ["Issue"] },
			{ title: "Run the weekly feasibility review", keywords: "weekly feasibility review real work workaround confusing missing permission connections workspace",
				body: "During controlled rollout, review real work attempted, what succeeded, what confused users, workarounds, unnecessary or missing information, decisions the platform could not represent, permission suitability, Connections, Workspace priorities, issue classification, and justified development needs. The purpose is operational learning, not merely collecting complaints.",
				steps: ["Bring representative users and real records.", "Review exceptions and workarounds before feature requests.", "Separate training/configuration corrections from design gaps.", "Prioritize recurring issues by business impact and risk.", "Assign an action, owner, and target review or release."],
				roles: ["CFG Commercial Manager", "CFG Platform Administrator", "CFG Management Viewer"], links: ["Issue", "Decision Record"] },
			{ title: "Standardize learning after a decision", keywords: "standardize knowledge continuity lesson owner procedure training master data",
				body: "When evidence proves a better method, identify what must change in policy, standard work, training, master data, reports, permissions, or software. Record the decision, owner, effective date, affected users, communication method, and verification. Keep unsuccessful experiments as corporate memory so future teams do not repeat them unknowingly.",
				roles: ["CFG Commercial Manager", "CFG Management Viewer"], links: ["Decision Record", "Scale Decision"] },
			{ title: "Documentation impact check", keywords: "documentation impact workflow terminology role permission field gate pilot workspace status revision",
				body: "Every development batch must check whether it changes workflow, record meaning, terminology, roles, permissions, required fields, gate decisions, pilot process, Workspace navigation, dashboards, operating instructions, or planned-versus-implemented status. If any answer is yes, update this interactive manual in the same release.",
				roles: ["CFG Platform Administrator"], links: [] },
		],
	},
	{
		id: "administration", title: "Administration", icon: "setting-gear", status: "In Progress",
		summary: "Maintain shared geography, permissions, controlled records, and release readiness.",
		topics: [
			{ title: "Platform administration essentials", keywords: "administrator permissions roles master geography release migration fixture",
				body: "Maintain shared masters centrally, grant the least access needed for each role, and validate permissions with representative users. Treat fixtures and migrations as application-owned configuration; never customize ERPNext core to implement CFG behavior.",
				steps: ["Maintain reusable places and territory geography.", "Review role assignments and separation of duties.", "Test migrations and Workspace fixtures before promotion.", "Record release and manual revisions together.", "Confirm unfinished functions remain visibly marked."],
				roles: ["System Manager", "CFG Platform Administrator"], links: ["CFG Place", "CFG Territory Geography", "User", "Role"] },
			{ title: "Role responsibility reference", keywords: "roles commercial manager intelligence governance approver finance operations qa pilot viewer administrator",
				body: "Commercial Users capture and maintain facts; Commercial Managers prioritize and challenge assumptions; Market Intelligence roles capture and verify signals; Governance roles coordinate traceability; Approvers decide within authority; Finance, Operations, and QA review their specialist exposure; Pilot roles prepare, execute, measure, and independently review; Management Viewers monitor portfolio and learning; Platform Administrators maintain controlled configuration. Permissions must follow least privilege and separation of duties.",
				roles: ["System Manager", "CFG Platform Administrator"], links: ["User", "Role"] },
			{ title: "Maintain governed territory geography", keywords: "territory geography polygon active boundary source effective confidence validation",
				body: "Maintain one governed active Polygon or MultiPolygon boundary for a Territory, with source, version, effective dates, confidence, and validation record. Review rather than discard points outside the boundary. Reusable CFG Places should carry the authoritative territory and active boundary used by connected observations.",
				roles: ["CFG Platform Administrator"], links: ["CFG Territory Geography", "CFG Place"] },
			{ title: "Controlled rollout and user readiness", keywords: "deployment rollout uat real scenarios representative users training",
				body: "Introduce the platform with a representative group rather than every user at once: commercial users and manager, market intelligence, operations, finance, governance/management, and pilot roles. Use real business situations alongside test records. Confirm role access, terminology, record selection, mobile usability, traceability, and escalation routes before wider rollout.",
				roles: ["CFG Platform Administrator", "CFG Commercial Manager"], links: ["User", "Role"] },
			{ title: "Release and manual control", keywords: "release version revision source controlled snapshot migration build cache test",
				body: "Treat application code and fixtures as the deployed source, this page as the living operational manual, and approved PDF/DOCX copies as dated snapshots. For every release, record the application version, commit, manual revision, date, change summary, validation evidence, and approval state. Build assets, migrate the site, clear cache, and complete role-based smoke testing before acceptance.",
				roles: ["CFG Platform Administrator", "System Manager"], links: [] },
		],
	},
];

class CFGShinkaManual {
	constructor(wrapper) {
		this.page = frappe.ui.make_app_page({ parent: wrapper, title: __("CFG Shinka Commercial User Manual"), single_column: true });
		this.active_section = "getting-started";
		this.query = "";
		this.render_shell();
		this.bind_events();
		this.render_content();
	}

	render_shell() {
		this.page.main.html(`<div class="cfg-manual">
			<section class="cfg-manual-hero"><div><div class="cfg-eyebrow">${__("CFG Shinka Merchandise")}</div><h1>${__("Commercial User Manual")}</h1><p>${__("Evidence-led guidance from market signal to governed decision, pilot, and learning.")}</p></div><div class="cfg-revision"><strong>${MANUAL_REVISION.revision}</strong><span>v${MANUAL_REVISION.version}</span><small>${MANUAL_REVISION.date}</small></div></section>
			<div class="cfg-search-wrap"><span class="cfg-search-icon">⌕</span><input class="form-control cfg-manual-search" type="search" placeholder="${__("Search topics, steps, roles, or records…")}" aria-label="${__("Search the user manual")}"><button class="btn btn-default btn-sm cfg-clear-search hidden">${__("Clear")}</button></div>
			<div class="cfg-manual-layout"><nav class="cfg-manual-nav" aria-label="${__("Manual categories")}"></nav><main class="cfg-manual-content" aria-live="polite"></main></div></div>`);
		this.$root = this.page.main.find(".cfg-manual");
		this.$nav = this.$root.find(".cfg-manual-nav");
		this.$content = this.$root.find(".cfg-manual-content");
		this.$search = this.$root.find(".cfg-manual-search");
	}

	bind_events() {
		let search_timer;
		this.$search.on("input", (event) => { clearTimeout(search_timer); search_timer = setTimeout(() => { this.query = event.target.value.trim().toLowerCase(); this.$root.find(".cfg-clear-search").toggleClass("hidden", !this.query); this.render_content(); }, 120); });
		this.$root.on("click", ".cfg-clear-search", () => { this.query = ""; this.$search.val("").trigger("focus"); this.$root.find(".cfg-clear-search").addClass("hidden"); this.render_content(); });
		this.$root.on("click", "[data-section]", (event) => { this.active_section = event.currentTarget.dataset.section; this.query = ""; this.$search.val(""); this.$root.find(".cfg-clear-search").addClass("hidden"); this.render_content(); this.$content.get(0).scrollIntoView({ behavior: "smooth", block: "start" }); });
		this.$root.on("click", "[data-doctype]", (event) => frappe.set_route("List", event.currentTarget.dataset.doctype));
	}

	status_class(status) { return `cfg-status-${status.toLowerCase().replace(/\s+/g, "-")}`; }

	render_nav() {
		this.$nav.html(`<div class="cfg-nav-heading">${__("Browse manual")}</div>${MANUAL_SECTIONS.map((section) => `<button class="cfg-nav-item ${section.id === this.active_section && !this.query ? "active" : ""}" data-section="${section.id}"><span>${frappe.utils.icon(section.icon, "sm")}</span><span>${__(section.title)}</span><small class="${this.status_class(section.status)}">${__(section.status)}</small></button>`).join("")}<div class="cfg-principle"><strong>${__("Operating principle")}</strong><span>${__("Evidence before commitment. Learning before scale.")}</span></div>`);
	}

	search_results() {
		const words = this.query.split(/\s+/).filter(Boolean);
		return MANUAL_SECTIONS.flatMap((section) => section.topics.map((topic) => ({ section, topic }))).filter(({ section, topic }) => {
			const haystack = [section.title, section.summary, topic.title, topic.keywords, topic.body, ...(topic.steps || []), ...(topic.roles || []), ...(topic.links || [])].join(" ").toLowerCase();
			return words.every((word) => haystack.includes(word));
		});
	}

	topic_html(topic, open) {
		const steps = topic.steps ? `<ol>${topic.steps.map((step) => `<li>${__(step)}</li>`).join("")}</ol>` : "";
		const roles = (topic.roles || []).map((role) => `<span class="cfg-role-note">${frappe.utils.icon("user", "xs")} ${__(role)}</span>`).join("");
		const links = (topic.links || []).map((doctype) => `<button class="btn btn-default btn-xs" data-doctype="${doctype}">${__(doctype)} ↗</button>`).join("");
		return `<details class="cfg-topic" ${open ? "open" : ""}><summary><span>${__(topic.title)}</span><span class="cfg-chevron">⌄</span></summary><div class="cfg-topic-body"><p>${__(topic.body)}</p>${steps}${roles ? `<div class="cfg-topic-row"><strong>${__("Role notes")}</strong><div>${roles}</div></div>` : ""}${links ? `<div class="cfg-topic-row"><strong>${__("Related records")}</strong><div class="cfg-related-links">${links}</div></div>` : ""}<div class="cfg-media-placeholder"><span>${frappe.utils.icon("image", "md")}</span><div><strong>${__("Screenshot / media placeholder")}</strong><small>${__("Add approved visual guidance in a future revision.")}</small></div></div></div></details>`;
	}

	render_section(section) {
		return `<section class="cfg-section-header"><div class="cfg-section-icon">${frappe.utils.icon(section.icon, "lg")}</div><div><div class="cfg-title-line"><h2>${__(section.title)}</h2><span class="cfg-status ${this.status_class(section.status)}">${__(section.status)}</span></div><p>${__(section.summary)}</p></div></section><div class="cfg-topics">${section.topics.map((topic, index) => this.topic_html(topic, index === 0)).join("")}</div>${section.id === "getting-started" ? this.dashboard_html() : ""}`;
	}

	dashboard_html() {
		return `<section class="cfg-category-grid">${MANUAL_SECTIONS.filter((section) => section.id !== "getting-started").map((section) => `<button class="cfg-category-card" data-section="${section.id}"><span class="cfg-card-icon">${frappe.utils.icon(section.icon, "md")}</span><strong>${__(section.title)}</strong><small>${__(section.summary)}</small><span class="cfg-status ${this.status_class(section.status)}">${__(section.status)}</span></button>`).join("")}</section><section class="cfg-change-note"><div><strong>${__("Revision and change notes")}</strong><p>${__("Rev.02 expands the interactive manual into operational learning content: record selection, end-to-end worked example, individual record procedures, G0–G4 controls, pilot execution, GEO-1 boundaries, customer access, feedback, role responsibilities, rollout, and release control. Rev.01 introduced the interactive Desk framework.")}</p></div><span>${MANUAL_REVISION.revision}<br><small>${MANUAL_REVISION.date}</small></span></section>`;
	}

	render_content() {
		this.render_nav();
		if (this.query) {
			const results = this.search_results();
			this.$content.html(`<section class="cfg-results-heading"><h2>${__("Search results")}</h2><span>${results.length} ${results.length === 1 ? __("topic") : __("topics")}</span></section>${results.length ? results.map(({ section, topic }) => `<div class="cfg-result-category">${__(section.title)}</div>${this.topic_html(topic, true)}`).join("") : `<div class="cfg-empty"><strong>${__("No matching topic")}</strong><p>${__("Try a record name, role, action, or workflow stage.")}</p></div>`}`);
			return;
		}
		const section = MANUAL_SECTIONS.find((item) => item.id === this.active_section) || MANUAL_SECTIONS[0];
		this.$content.html(this.render_section(section));
	}
}
