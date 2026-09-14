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
	revision: "Rev.01",
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
				roles: ["CFG Commercial User", "CFG Market Intelligence User"], links: ["Field Observation", "Competitor Observation", "Demand Signal", "Channel Observation"] },
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
		],
	},
	{
		id: "market-intelligence", title: "Market Intelligence", icon: "search", status: "Available",
		summary: "Capture market signals and convert observations into verifiable evidence.",
		topics: [
			{ title: "Capture a market signal", keywords: "customer enquiry field competitor demand channel observation source",
				body: "Choose the record that matches the source: Customer Enquiry, Field Observation, Competitor Observation, Demand Signal, or Channel Observation. Record the date, location or market context, source, observable fact, and attachment where available. Keep interpretation separate from evidence.",
				steps: ["Select the matching observation type.", "Record who, where, and when.", "Write the observable fact in neutral language.", "Attach or reference the source.", "Link it to an Evidence Record when it supports a decision."],
				roles: ["CFG Market Intelligence User", "CFG Market Intelligence Manager"], links: ["Customer Enquiry", "Field Observation", "Competitor Observation", "Demand Signal", "Channel Observation"] },
			{ title: "Build an Evidence Record", keywords: "evidence verification reliability source confidence traceability",
				body: "Evidence must be traceable to a source and strong enough for its intended decision. Identify whether it is direct or indirect, record confidence and verification state, and link it to the case rather than copying it.",
				roles: ["CFG Market Intelligence Manager", "CFG Commercial Manager"], links: ["Evidence Record"] },
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
		],
	},
	{
		id: "knowledge-learning", title: "Knowledge & Learning", icon: "education", status: "Coming Soon",
		summary: "Turn operational evidence and decisions into reusable organizational knowledge.",
		topics: [
			{ title: "Learning and standardization", keywords: "learning knowledge standardize lessons revision corporate memory",
				body: "Dedicated Knowledge & Learning functions are planned. Until released, preserve learning in linked Pilot Reviews, Scale Decisions, Decision Records, and controlled documentation. Record what changed, why it changed, what evidence supports it, and where the standard should be updated.",
				roles: ["All users"], links: ["Pilot Review", "Scale Decision", "Decision Record"] },
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
		return `<section class="cfg-category-grid">${MANUAL_SECTIONS.filter((section) => section.id !== "getting-started").map((section) => `<button class="cfg-category-card" data-section="${section.id}"><span class="cfg-card-icon">${frappe.utils.icon(section.icon, "md")}</span><strong>${__(section.title)}</strong><small>${__(section.summary)}</small><span class="cfg-status ${this.status_class(section.status)}">${__(section.status)}</span></button>`).join("")}</section><section class="cfg-change-note"><div><strong>${__("Revision and change notes")}</strong><p>${__("First interactive Desk version. Replaces the Markdown redirect; introduces search, category navigation, expandable procedures, status labels, role notes, and record links.")}</p></div><span>${MANUAL_REVISION.revision}<br><small>${MANUAL_REVISION.date}</small></span></section>`;
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
