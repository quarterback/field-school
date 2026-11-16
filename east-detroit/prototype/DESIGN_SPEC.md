# East Detroit — Municipal Shared Services Prototype
## Product, interaction and visual design specification

**Version:** 0.1 — 16 November 2026
**Build destination:** east-detroit/prototype/ in https://github.com/quarterback/field-school
**Target:** working demonstration for the 17 November 2026 Public Mechanics Zoom session
**Owner of public decisions:** participating agency/commission, not the vendor
**Status:** vendor design proposal. No information exchange, service rule or technical architecture is approved by this document.

## 1. Product to build

Build a working, responsive municipal operations workbench. It demonstrates what happens when one East Detroit agency requests records held by another, who is allowed to answer, what conditions apply, and how a resident/staff workflow changes as a result. The city is exploring an Estonia X-tee-inspired model of authorized exchange among agency-held records.

The instructor demonstrates the software as **the vendor** and questions students as **mayor/county executive**. Students represent existing departments and independently governed agencies. They need to identify what their agency actually controls, which information could be shared, what questions remain, and what it would take to participate.

The application must look and behave like a real product, not a marketing page or static wireframe. Its main value is the **inspectable workflow** and the ability to change agency responses live.

### Source of truth

Read these current files before making mock agency names, facts or rules:

- [Master project dossier](../v3/master_project_dossier_v3.md), especially §8 — current 27-entry roster and assignment.
- [City-county departments](../student-edition/src/03-city-department-reference.md).
- [Independent agencies](../student-edition/src/04-independent-agency-reference.md).
- [Neighborhoods](../student-edition/src/06-neighborhoods-and-community-organizations.md) and [machine-readable city profile](../v3/neighborhoods_2030.json).
- [Governance packet](../v3/municipal_digital_governance_packet_v3.md).
- [Decision register](../v3/municipal_service_signup_and_decision_record_v3.md).
- [Home Forward / Detroit housing case](../v3/housing_authority_case_home_forward_vs_detroit.md).

Established city setting: **2030**, **382,417 residents**, **20 neighborhoods**, **115.4 square miles**; Watkins **80137** as primary postal reference, alongside **80102**, **80018**, **80019**. Preserve existing fictional institutions. Current roster is **D-01 to D-15** (municipal), **A-01 to A-08** (regular independent participants), **A-09** (optional independent), and **R-01 to R-03** (community groups). The old role-cards file is superseded. Do not invent additional agencies or rewrite these distinctions.

The city's **Housing Division** is municipal. The **Regional Housing Authority** is independently governed and serves neighboring communities. Schools, library district, court, regional water authority, hospital authority, RTD and the state have their own responsibilities. The city-county cannot authorize their records unilaterally.

### What is explicitly not being built

No actual public-agency connection, personal data, real credentials, payments, benefits awards, court action, AI resident proxy, universal city identity wallet, live X-tee/X-Road network, procurement module or backend authentication. No claim that the app has government security certification. All cases and data are synthetic and clearly identified as **SIMULATED**. No agency approval is assumed simply because a button was pressed in the demonstration.

## 2. Navigation and information architecture

Five screens/views, with consistent top navigation:

1. **Overview** — city/commission title, case selection, current proposed exchanges and their outcomes. Counts must derive from actual local session data, not arbitrary metrics. This is a working front door, not a dashboard of fictional performance.
2. **Cases** — central working experience. Case details, resident/staff task, workflow, proposed exchanges, agency responses, recovery behavior and an event trace.
3. **Agencies** — searchable roster by name and category; show mandate, typical records, participation status, what the agency can decide, and links to its cases. Be explicit if an item is not established by the scenario.
4. **Exchange requests** — request register with sender, recipient, exact fields, purpose, authorizing actor, response and conditions. This is where simulation decisions are entered.
5. **Decision record** — a chronological record of responses/conditions, resulting service behavior, questions, next steps and who entered them. Export to Markdown and JSON.

An **About** page or drawer should document source links, the difference between fictional setting and real references, and all simulation limits.

At projected desktop widths, keep the case's factual context and proposed exchange visible alongside the response controls; at mobile widths, stack them in a logical reading order. Navigation may collapse but all functions must remain accessible without hover.

## 3. Three interactive, deterministic cases

Build exactly these three cases for version one. They should load without external APIs and be resettable to their initial state.

### ED-101 — Inboden address and recreation eligibility

A resident applies for a city recreation pass at a recently subdivided Inboden address. The Address Office's map cannot conclusively place it within the service boundary. Parks decides pass eligibility; Address/GIS corrects the source address.

- Initial request: Parks -> Address/GIS for the proposed municipality/parcel boundary determination, not the entire property record.
- Agency response options: verification available; address disputed/needs correction; restricted or inconclusive response.
- Proposed operating choices: keep the same case pending staff review, request more evidence, or issue limited provisional access. No option is portrayed as preapproved.
- Demonstrate: changing the source response affects the resident status, staff queue and event trace. Preserve the same case number after a correction.

### ED-204 — Housing assistance across two institutions

A renter requests help. The municipal City Housing Division has a local assistance program. The independently governed Regional Housing Authority holds its own housing assistance records and is federally accountable for some programs.

- Initial request: City Housing Division -> Regional Housing Authority for a narrowly described status/participation fact, not unrestricted income or voucher records.
- Agency response options: conditional agreement, refusal, or approved-for-simulation limited exchange.
- Demonstrate: refusal still permits municipal assistance intake and a resident-directed referral; conditional agreement exposes only authorized fields, with a clear reason. Do not issue a fictional federal voucher or guarantee a unit.
- Preserve the difference between city program eligibility, federal program rules, housing inventory and availability.

### ED-307 — Food establishment license renewal

An existing East Detroit restaurant applies to renew a county/local retail food license. Public Health controls the licensing/inspection decision under the adopted scenario; Finance handles payment information. Colorado statute, Adams County practice and Denver's city-county online renewal are precedents. New York's Click to Renew is a **state occupational-license** reference, not a claim that East Detroit has those state powers.

- Initial request: Public Health -> Finance for fee/payment status, with current license and inspection history kept with their relevant offices.
- Agency response options: fee verified, fee outstanding, mismatch/needs review.
- Demonstrate: verified payment may remove a repeated request for a receipt, but open safety violations or changed ownership still call for staff review under the applicable rules.
- Show what was reused, what still must be checked, and where the applicant can get help.

The 2026 Aurora/Denver **data-center case is reference context for Planning**. Do not build it as a fourth interactive case or invent an East Detroit data-center application unless separately commissioned.

## 4. Data model and local simulation

Use a typed fixture module and a local browser session store. Prefer a clean, serializable shape:

- Agency: id, name, category, mandate, recordTypes, sourceReferenceLinks, participationScope.
- Case: id, fictionalPersonOrBusinessToken, neighborhoodId, serviceType, summary, steps, requests, currentServiceStatus.
- Request: id, caseId, sourceAgencyId, receivingAgencyId, purpose, fields, classification, authorityNeeded, initialStatus, response, conditions, correctionRoute.
- DecisionEvent: id, requestId, actedForAgencyId, enteredBy, response, explanation, timestamp, resultingWorkflowStatus.
- Session: schemaVersion, seedVersion, decisions, activeCase and any edited scenario controls.

Statuses: **Proposed / Agreed for simulation / Conditional / Declined / Requires review**. Do not use vague success/error colors alone. Label every state in words.

Controls must make it possible to:
1. Select the agency whose response is being represented.
2. Set a response with a note or condition.
3. Immediately see a changed workflow and a human-readable event in the trace.
4. Revise a response without destroying earlier session history.
5. Reset all fixtures and export the current session.

LocalStorage is adequate for a first version, with a visible note that browser changes are **local and not synchronized**. Provide JSON and Markdown export; do not claim that the simulation has saved shared minutes or authorized agreements.

The trace should reveal source, recipient, purpose, fields requested, fields shared (if any), refusal/condition, and who can correct a disputed fact. Include a **Not shared** field in any exchange that has restricted scope.

## 5. Visual direction: Helsinki Design System + chromatic editorial

Use **Helsinki Design System (HDS)** for React form controls and interaction patterns, accessible component behavior and baseline spacing. Build a distinct **East Detroit editorial skin**, borrowing the strong hierarchy, exposed rules, heavy type, compact metadata and bold composition of vloora.com, ronbronson.com and masthead.ronbronson.com. This is an East Detroit public operations interface, not a Vloora-branded site.

Check the current published HDS component documentation and APIs before import. As of this spec, hds-react 6.x requires React 19+. Use real HDS components wherever practical for text fields, buttons, notifications, labels, selection and dialogs. Do not replace functional HDS interactions with inaccessible custom controls just to achieve the visual style. HDS fonts are not redistributed with the package; do not obtain proprietary Helsinki font files without a license.

### Canonical user-provided palette

Use these exact six-digit equivalents of the user's opaque eight-digit HEX colors as the brand foundation:

| Token | Color | Hex | Use |
|---|---|---|---|
| surface | off-white | #FDFFFF | main reading canvas, form surfaces |
| ruby | ruby red | #B10F2E | editorial headings, links on off-white, high-importance sections, primary filled action |
| amber | bright amber | #FFCF00 | announcement bar, prominent statistics, selected panels |
| aqua | pearl aqua | #ACD7CA | section backgrounds, neutral informational cards |
| blue | maya blue | #68C2F3 | selected context panel, secondary large-area fill |
| ink (added for accessible foreground) | deep ink | #171717 | standard text, labels and strokes |
| dark-ruby (added for links on colored light surfaces) | dark ruby | #790A20 | small links on aqua/blue/amber |

CSS variables should live in one tokens stylesheet. Note: the supplied HSL "white" value at 100% lightness describes pure white, not the supplied #FDFFFF. The **HEX values are authoritative**; generate HSL/RGB from HEX when needed. The supplied gradients are optional creative references, not required UI backgrounds.

### WCAG 2.2 AA contrast contract

Measured relative luminance contrast ratios:

| Foreground / background | Contrast | Rule |
|---|---:|---|
| #171717 on #FDFFFF | 17.86:1 | approved |
| #B10F2E on #FDFFFF (or reverse) | 7.03:1 | approved |
| #171717 on #FFCF00 | 12.10:1 | approved |
| #171717 on #ACD7CA | 11.38:1 | approved |
| #171717 on #68C2F3 | 9.05:1 | approved |
| #790A20 on #ACD7CA | 7.10:1 | approved |
| #790A20 on #68C2F3 | 5.65:1 | approved |
| #B10F2E on #FFCF00 | 4.76:1 | passes AA, but prefer ink for small labels |
| #B10F2E on #ACD7CA | 4.48:1 | **fails AA normal text** |
| #B10F2E on #68C2F3 | 3.56:1 | **fails AA normal text** |
| #FDFFFF on #FFCF00 | 1.48:1 | **fails** |
| #FDFFFF on #ACD7CA | 1.57:1 | **fails** |
| #FDFFFF on #68C2F3 | 1.97:1 | **fails** |
| #171717 on #B10F2E | 2.54:1 | **fails** |

Rules:
- Use **ink text** on amber, aqua, blue, and off-white; **off-white text** on ruby. On pale panels, use dark-ruby rather than ruby for small links.
- Standard text and controls must meet **4.5:1**; large display text **3:1**; essential non-text boundaries, icons and state indicators **3:1** against adjacent colors. Treat 4.5:1 as default even for large text when possible.
- Do not put body text, labels, controls or linked text on a multicolor gradient or photograph. Gradients may be used as text-free decorative stripes.
- Never use red/green or color alone to encode approved/declined states; pair a readable status word, icon and/or shape.
- Provide a visible keyboard focus indicator that meets WCAG 2.2 Focus Appearance/Focus Not Obscured needs. On light surfaces use a >=3px ruby outline plus offset; on ruby use off-white outline and dark separation. Check 3:1 at the adjacent edge.
- Inputs need persistent visible labels, specific errors, instructions, and error recovery; do not use placeholders as labels.
- Keyboard functionality, escape/cancel for dialogs, predictable focus return, skip link, descriptive page title, headings in order, semantic landmarks, and accessible table headers are required.
- 44x44 CSS px pointer targets are preferred; meet WCAG 2.2's minimum target-size requirement where exceptions do not apply. Support 200% zoom, 400% zoom/reflow, 320px viewport width, reduced motion, and no horizontal scrolling for core tasks.
- Any live state updates need polite screen-reader announcement; do not steal focus or announce every keystroke. Test with VoiceOver or NVDA, keyboard only, axe-core and browser zoom. No WCAG claim without tests and manual review.

### Type and layout

- Display: **Archivo** (or another properly licensed, locally available strong grotesque). Large 42–64px headline at desktop, responsive clamp for mobile.
- UI: **Archivo** or accessible system sans, ~16–18px body, substantial line height; labels 14–16px. Avoid dense 11px metadata in demonstration views.
- Editorial accent: **Source Serif 4** for an occasional long-form subtitle or case summary, not for small buttons.
- Tabular and source IDs: **Azeret Mono** or system monospace. Do not force uppercase letterspaced text for long descriptions.
- Fonts are suggested based on the public masthead colophon. If custom licensed type is available in the codebase, use it only under its actual license. Never copy or distribute font files from unrelated websites.
- Hard dividers, high-contrast section numbering, squared panels, minimal shadows, strong left alignment. Be visually confident without sacrificing spacing and reading order.
- Desktop presentation at 1440x900 should show service context, request and agency response without requiring the presenter to jump through multiple pages. Mobile must remain fully usable.

### Visual composition example (text-only)

Top: RUBY masthead (off-white title) | city-county / simulated / reset / export
Below: AMBER thin metadata band (ink text) | 2030 / case ED-204 / status Conditional
Main: OFF-WHITE case summary | AQUA request + source fields | BLUE agency answer + visible next steps
Bottom: ink-on-off-white decision log with time, agency, condition and workflow effect

Do not treat this example as an exact pixel mockup; prioritize clarity and accessibility.

## 6. Technical implementation and deployment

Default stack: **Vite + React 19 + TypeScript + HDS React**, CSS variables/tokens, deterministic fixture data and localStorage. A static build is sufficient. Place all app code in **east-detroit/prototype/** without overwriting existing class documents, map archives or student-edition publishing workflows.

The application must deploy on both **Cloudflare Pages** and **Vercel** without a server and without secrets. Use a hash-based client router or provide required rewrite configuration for direct navigation. Suggested commands: install with npm, run npm run dev, verify with npm run build, serve compiled static files from dist.

In repository README document:
- local development, reset and deployment;
- build command and output directory for Cloudflare/Vercel;
- fixture and decision schema;
- accessibility/contrast checks;
- what is simulated and what needs real agency authority;
- source-document links.

Avoid dependence on an external paid API, remote database, unpublished fonts or hidden tokens. Keep the build functional offline after loading where feasible; any network-based font must fall back safely.

## 7. Acceptance tests for tomorrow

A coding agent must deliver, demonstrate and check these before declaring work complete:

1. On load, the overview names East Detroit, states the simulation boundary, and has three cases.
2. Case ED-101 shows the original address exception, a change to an agency response, resident notice, and same-number case recovery.
3. Case ED-204 shows the independent Housing Authority declining a request; the city still provides a valid city-only continuation rather than fabricating an agreement.
4. Case ED-307 shows a successful payment-status reuse followed by an unresolved inspection/ownership exception, not automatic approval.
5. Agency register uses the current dossier roster and marks internal, independent and civic roles correctly.
6. The session decision table records both an initial decision and a later revision, retaining the history.
7. Reset and export work; exports contain human-readable agency names and decisions.
8. No real resident data and no claimed live government integrations.
9. Colors obey the contrast contract. Check keyboard navigation, visible focus, input labels, 320px reflow and 200% zoom.
10. npm run build succeeds, the app loads from the built dist, and a public GitHub branch/commit is supplied with Vercel/Cloudflare instructions.

## 8. Execution priority

**Must finish:** working cases ED-101 and ED-204, agency responses, visible consequences, decision register, export/reset, polished main screen, HDS controls, WCAG 2.2 AA checks, deployable static build.

**If time permits:** ED-307, more advanced filtering, richer event trace, import session file, optional presenter mode for hiding editing controls.

**Do not prioritize:** animations, charts for invented metrics, generalized integration platform, persistent backend, speculative AI, government identity, new agency policy or any fourth case.

## 9. Required editorial behavior

Apply the U.S. Federal Plain Language Guidelines and the user's [Red Pen Editor](https://github.com/quarterback/red-pen-editor) editorial rubric to labels, help text, notification messages and documentation. Preserve source figures, agency names, authority boundaries and qualifiers. Prefer a specific next action over generic success language. Do not generate marketing copy, "AI-powered" filler or claims about compliance that have not been tested.
