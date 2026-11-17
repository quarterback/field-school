# Interface and content rules — My East Detroit

These rules apply to the resident portal and vendor walkthrough. They supplement the established East Detroit visual language and the No Slop UI and Red Pen Editor rules. They do not authorize changes to city policy, interagency agreements, eligibility criteria, or the underlying classroom scenario.

## Public entry and sign-in

- The root page is a public-facing product introduction. Explain what the service does and why residents would use it, using concrete tasks rather than slogans or invented performance claims.
- Visitors see a sign-in stage before any resident dashboard. The sample sign-in screen makes clear that it provides an account preview and does not authenticate identity, collect passwords, or send verification codes.
- **Sign out** returns to the public entry and ends the local preview session. Records remain in local browser storage so the next example can be compared.
- Explicit instructor walkthrough URLs with a `step` parameter may open directly to that demonstration. Ordinary visitors should not land inside somebody else's account.
- Preserve the city masthead, palette, recognizable navigation, and typography across public and authenticated-looking views. Use generous spacing, plain text, and targeted calls to action instead of decorative dashboards, gradients, floating cards or fake metrics.

## Screen model

- **Normal resident view:** The app behaves like a municipal service. The resident sees their name, services they can use, record statuses and actions. Never label someone by age or fictional demographic category on the resident page.
- **Opt-in vendor walkthrough:** The same portal reveals a resident selector and a guided sequence for classroom evaluation. Switch among Maya (age 39), Avery (22), and Helen (72) to see differences in records and practical tasks. The walkthrough never pretends to be a second government account or a department approval process.
- **Independent agency context:** Schools, library, utilities, RTD, courts, hospital and regional housing authority retain their own governing authority. Show realistic example records for willing participants, and honest service boundaries where sensitive access has not been proposed. No automatic cross-agency file access.
- **Record separation:** A newly selected resident must never see another person's licence, student information, library history or bills. Browser state for one example resident must not alter another's records.

## Plain language is required

Every resident-facing string must follow the principles from PlainLanguage.gov, now maintained by Digital.gov:

- [Principles of plain language](https://digital.gov/guides/plain-language/principles)
- [Writing for understanding](https://digital.gov/guides/plain-language/writing)
- [Design for understanding](https://digital.gov/guides/plain-language/design)
- [Test for understanding](https://digital.gov/guides/plain-language/test)

Write for a resident trying to complete a task, not for a vendor, administrator, or classroom audience.

1. Lead with the task or the decision. A resident should know what they can do or what happened from the first sentence.
2. Name the actor. Say "Public Health will review your inspection" rather than "A review is required." Use **you** and **your** for resident instructions.
3. Use familiar words and present-tense verbs. Prefer "pay", "ask", "check", "sent", and "renew" to "settle", "inquire", "verify", "process", or "facilitate" when the shorter word is accurate.
4. Keep sentences short. Put one main idea in each sentence. Break up long text instead of joining conditions with commas or semicolons.
5. Name the next step when action is required. Labels and errors must tell residents what to enter, select, check, or contact.
6. Explain abbreviations that residents may not recognize. Keep official program and agency names where accuracy requires them.
7. Explain record sharing only where it affects what a resident can see or do. Name the office that keeps the record and avoid governance jargon.
8. Do not include architecture, "vendor", "prototype", "proposed exchange", or policy-analysis language on ordinary resident service screens. Reserve classroom context for the optional walkthrough and project documentation.
9. Do not promise automatic eligibility, approval, enrollment, or access unless the displayed example actually includes that action. Say what has happened and what the agency still needs to decide.
10. Keep the public homepage, sign-in page, service directory, forms, notices, empty states, status labels, and account pages under the same rules. Do not limit the review to the hero text.

Use the project's **prosekeep**, **plain-as-day**, and **red-pen-editor** editorial checks when available, then read every screen in its actual task context. Automated checks cannot confirm that the agency, record, or outcome is accurate.

**Content acceptance test:** For every page, a resident must be able to answer: *What is this? What can I do? What happened? What do I need to do next?* A resident should not have to infer an agency's internal process from the copy.

## Content system

### Titles and controls

- Name the service or record: "Student enrollment", "Housing assistance", "Water and sewer".
- Use sentence case for labels and headings except names, acronyms, and official titles.
- Buttons name the action and object: "Request enrollment verification", "Renew item", "Submit billing inquiry".
- Avoid generic buttons such as "Explore", "Get started", "Manage it", and redundant directional links when the actual action is known.
- Use "Received", "In review", "Renewal due", or "Requested" only when the corresponding event or record exists.
- Never claim a notice was mailed, eligibility was decided, a payment cleared, or an external agency received information when the local demo only saved browser state.

### Numbers and IDs

- Do not show an account identifier unless a real account-support or verification task requires it. Keep internal keys in the data model, not the resident interface. Age is not an identity credential.
- Show a licence, case, card, request, or bill reference on its own detail screen only when it helps identify the relevant record.
- Do not produce random-looking identifiers in headings, badges, fake transaction logs, or every table column.
- Preserve case IDs and record numbers when the user needs to follow up or distinguish between records. Do not remove them mechanically for brevity.

### Guidance and errors

- Say which department owns a record and which action the resident can take.
- Keep instructions adjacent to the relevant action. Do not repeat the classroom setup or backend architecture throughout the interface.
- Put a visible label above every input. A placeholder does not replace the label.
- For failed actions, identify the problem and the correction. For success, name exactly what changed.
- Use a plain empty state when a resident has no record. An empty state must never display someone else's example record.

## Visual and interaction rules

- Preserve the established city identity, red top bar, masthead, horizontal navigation, Archivo typography and East Detroit palette.
- Tables are for comparable service records. Use native table headers, concise columns, accessible empty states and descriptive row actions.
- Group screens with proximity, consistent spacing, alignment and type hierarchy. Do not underline section headings, place rules between every row, or surround routine content with decorative borders. Reserve borders for editable inputs, keyboard focus, and controls whose states need clear edges.
- For long service tables, use a distinct header and subtle alternating row backgrounds rather than row-by-row dividing lines. Retain semantic table structure and readable hit targets.
- Use ordinary labeled HTML/HDS inputs for forms, visible focus and text states rather than color alone.
- Make important content available without hover, animation, or a hidden tooltip.
- At small widths, support keyboard scrolling or a readable stacked layout; verify at 320px and 200–400% zoom. Do not shrink essential text to fit.
- No gradients, decorative KPI boxes, animated hover transforms, AI assistant, or glowing glass panels.

## AntiSlopUI interface review

Use [AntiSlopUI](https://github.com/Vanszs/AntiSlopUI) as a **UI review and implementation aid**, alongside [No Slop UI](https://github.com/LeoStehlik/no-slop-ui) and the rules above. Read its [SKILL.md](https://github.com/Vanszs/AntiSlopUI/blob/main/SKILL.md), then use the relevant entries in its [visual patterns](https://github.com/Vanszs/AntiSlopUI/blob/main/references/slop-uiux-patterns.md) and [React/TSX patterns](https://github.com/Vanszs/AntiSlopUI/blob/main/references/slop-code-patterns.md). Do not copy its generic SaaS styling defaults into this government interface.

**Order of authority:** the established East Detroit identity, the project's real services and data boundaries, and public-service accessibility/content requirements take precedence over the skill's suggested color palettes, font pairings, and decorative layout rules. Preserve Archivo, the city red, existing navigation, and the municipal visual system. Explicitly record any skill-default exception that keeps the existing brand.

For every public, sign-in and resident screen:
- Check for repeated three-column feature cards, gratuitous cards within cards, unnecessary decoration, identical section layouts, fake proof, and generic actions. Replace them with the right structure for the actual records or resident tasks.
- Keep headings, directions and actions specific. PlainLanguage.gov governs resident copy. Do not introduce sales pitches, invented usage metrics, stock testimonials or unrelated visual flourishes.
- Verify that links and buttons work; form labels, validation and status feedback are clear; keyboard focus is visible; colors have enough contrast; and status is never shown by color alone.
- Check semantic landmarks and headings, Escape/focus for any overlays, errors and empty states, small-screen layout, zoom and reduced-motion behavior. Avoid unnecessary custom controls where native HTML works.
- **Do not mark a test passed because the app builds.** Record `PASS`, `FAIL`, `N-A` or `UNVERIFIED`, with the file or browser observation supporting each claim. Distinguish source inspection from live browser verification.
- Use AntiSlopUI's severity terms for findings where relevant; address real P0 accessibility/security failures before release. If an issue has not been measured, report it as unverified rather than claiming compliance.
- Do not apply the framework's demand for asymmetry or a full-bleed visual break to every form, record table or government workflow. Those patterns are optional, and content comes first.

A UI review covers both the normal resident experience and the optional classroom walkthrough. Do not conflate the walkthrough's sample accounts with real resident authentication.

## Review standards and sources

- Salesforce Lightning Design System 2 accessibility: https://www.lightningdesignsystem.com/2e1ef8501/p/641741
- Salesforce Lightning Data Tables: https://www.lightningdesignsystem.com/2e1ef8501/v/61216/p/86f13a-data-table/b/39205c
- Microsoft Fluent 2 content design: https://fluent2.microsoft.design/content-design/
- Microsoft Fluent accessibility and focus/zoom: https://fluent2.microsoft.design/accessibility
- U.S. Web Design System design principles: https://designsystem.digital.gov/design-principles/
- USWDS tables: https://designsystem.digital.gov/components/table/
- NHS inclusion and age writing: https://service-manual.nhs.uk/content/inclusive-content/age
- No Slop UI: https://github.com/LeoStehlik/no-slop-ui
- Red Pen Editor: https://github.com/quarterback/red-pen-editor

## Acceptance checks

1. Open the public app with the default example resident; verify the name, personal services and source-agency names.
2. Open \`?demo=1\`; select each resident and confirm name, status and available records change without exposing internal account IDs.
3. Make a reservation, renew an item or submit a local request for one resident; switch accounts and confirm the record was not copied.
4. Refresh and confirm each resident's local activity persists. Reset sample residents and confirm all fixtures return to the initial state.
5. Open \`?demo=1&resident=helen\` in a fresh browser and confirm Helen's account loads.
6. Test keyboard tab order, focus, error states, 320px layout and screen reader names. A successful TypeScript/Vite build alone is not an accessibility audit.
