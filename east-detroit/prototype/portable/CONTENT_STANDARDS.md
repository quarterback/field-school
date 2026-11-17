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
