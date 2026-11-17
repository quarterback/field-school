# My East Detroit — vendor demonstration

A resident-facing city-county service portal for a **Public Mechanics** classroom vendor presentation. Students represent East Detroit departments, special districts, regional bodies and other public agencies. They inspect plausible agency services and decide which arrangements should be accepted, limited or rejected.

## Public entry and sign-in

The root URL opens a public **My East Detroit** homepage instead of someone else's account. It follows the pattern of city homepages such as hel.fi and boston.gov: a full width image of the city with the headline, a service search and sign in in an overlapping panel, a list of popular services with the office that handles each one, the birth and license renewal examples, the independent agencies that show records in the portal, and a 311 help panel.

The three images are rendered concept scenes of East Detroit in 2030 (Civic Square, Central Station and the Box Elder Creek greenway), in `public/assets/`. They are drawn, not photographed, because the city is fictional. The scripts that render them are in [`../render-scenes`](../render-scenes). The homepage search filters the popular services list; every service link leads to the sample sign in.

Select **Sign in to My East Detroit** to reach a dedicated entry screen. Enter the email for one of the four included example residents, or select one of the sample accounts to fill the email and continue. A visible note explains that the prototype does not authenticate anyone or require a real password. No real account credentials are collected.

After continuing, the resident sees their own service records and the current in-account navigation. **Sign out** returns to the public product page. The app does not use the sign-in screen as real authentication or cross-browser access control.

The optional class walkthrough still works after entering an example account through `?demo=1`. Explicit deep links with `?demo=1&step=birth&resident=samira` skip the public entry for the instructor's direct presentations; ordinary visitors start with the welcome screen.

## Proactive services: birth and automatic renewal

The portal now demonstrates two services initiated by verified agency events rather than a resident filling out another form.

- **Newborn:** Samira Ortiz's daughter Lucia has a birth record and household relationship. An authorized vital-records event triggers a state newborn coverage check, a county family-services notice, and separate WIC and library offers. The vendor walkthrough can replay the birth event. Independent agencies retain their own records and decisions.
- **Food establishment renewal:** Maya Rivera's Cypress Cafe license can renew automatically when Public Health's inspection/ownership checks, Finance's fee record, and the license holder's authorization agree. Flag an inspection issue during the vendor walkthrough to stop automation and show manual review.

[Proactive workflow design, researched rules and institutional boundaries](PROACTIVE_SERVICES.md).

## Example residents

The vendor walkthrough includes four selectable residents. Each has a distinct service history. Internal account keys keep their local records separate:

| Resident | Age in 2030 | Context | What to demonstrate |
| --- | ---: | --- | --- |
| Maya Rivera | 39 | Parent and business owner | Business license renewal, child enrollment record, local housing case, transit, utility and library records |
| Avery Chen | 22 | Renter and transit rider | MyRide account, library loans and public works request; empty states for services they do not use |
| Helen Carter | 72 | Homeowner and recreation member | Recreation pass, water bill, library loans and a public works issue |
| Samira Ortiz | 29 | New parent | Birth-triggered household update, newborn coverage, WIC and library offers |

**Age appears only in the optional vendor walkthrough.** The ordinary resident interface shows each person's own records without categorizing them by age. Staff, students and other viewers can compare service access without creating a real account.

Use the resident selector at the top of the walkthrough or open a direct link such as \`?demo=1&resident=avery\` or \`?demo=1&resident=helen\`. Actions are retained separately for each resident in the local browser; they are not synced across students' computers. \`Reset examples\` restores all three.

See [interface and content standards](CONTENT_STANDARDS.md) for Salesforce Lightning, Microsoft Fluent, USWDS and editorial rules.

## Start the walkthrough

- **Resident portal:** https://east-detroit-operations.vercel.app/
- **Guided walkthrough for students:** https://east-detroit-operations.vercel.app/?demo=1
- **Direct stop:** append a step such as \`?demo=1&step=school\` or \`?demo=1&step=authority\`

Visitors begin at the public welcome page and choose a sample account on the sign-in screen. In the resident portal, **Explore demo** opens the optional nine-stop vendor walkthrough with previous/next, a stop selector, and a copyable link. Closing it returns to the resident interface. Students can still navigate services independently.

## Resident-facing examples

The first sample account is **Maya Rivera** and contains the service records shown below.

### City and county departments

| Department | Resident experience |
| --- | --- |
| Parks, Recreation and Cultural Affairs | View pass, reserve a facility, inspect reservation |
| Public Health / Finance | Review food establishment license and submit renewal |
| City Housing Division | View locally administered housing application, evidence and message history |
| Transportation and Public Works | Submit and track a public works service request |

### Independently governed and outside agencies

| Agency | Vendor-proposed experience | Institutional boundary |
| --- | --- | --- |
| A-01 Unified School District | Parent/guardian views student enrollment and requests a verification letter | School assignment and student data belong to the school district, subject to FERPA and Colorado rules |
| A-02 Public Library District | View card and loans; renew a checked-out item | Patron records remain with the library district and have confidentiality protections |
| A-03 Water and Sewer Authority | View bills and submit a billing inquiry | Special district controls its own customer records, billing and rates |
| A-04 Regional Transportation District (RTD) | View MyRide card, fare products and illustrative trip planning | RTD independently controls fares, rider information and transit service |
| A-05 State Human Services and State IT | Service description; no direct access to state benefit files | State owns statewide program rules and system access |
| A-06 Regional Housing Authority | View separately administered inquiry and request update | Its own commission, federal contracts and vouchers remain distinct from the City Housing Division |
| A-07 County Court | Service scope; no personal court files | Judicial records and decisions remain under judicial authority |
| A-08 Health and Hospital Authority | Service scope; no clinical records | Hospital governance and healthcare privacy apply independently |

These are **illustrations of what a vendor might propose**, not agency participation commitments or authorizations to exchange records. The class decides which examples would be appropriate.

## Data and behavior

All records are synthetic. Browser-local state is stored in localStorage; demo clicks do not submit records to real agencies, process payments, authenticate residents or create interagency access. Sample actions update only the local state and recent activity. **Account and privacy** provides reset (Restore account) and JSON export. The app never needs API keys.

The same city login can present records from different organizations, but an organization remains responsible for its own records. The portal must not suggest that data sharing transfers policy, clinical, educational, judicial or program decision rights.

## Design and editorial constraints

Maintain the existing East Detroit identity: ruby #B10F2E, amber #FFCF00, aqua #ACD7CA, blue #68C2F3 and off-white #FDFFFF; Archivo; government software tables, labeled forms, accessible status and clear focus. Use Helsinki Design System React and the No Slop UI and Red Pen Editor rules. The guided tour is opt-in; normal resident pages do not carry classroom narration, dramatic hero copy, decorative metrics or chat assistants.

## Reference patterns

- [Digital Iceland: My Pages](https://island.is/en/o/digital-iceland/my-pages/what-an-organization-needs-to-do): agencies retain their records, publish web services, and decide with Digital Iceland how data is shown.
- [Digital Iceland: About My Pages](https://island.is/en/o/digital-iceland/my-pages/about-my-pages): one interface for service information held by multiple organizations.
- [Suomi.fi e-Authorizations](https://www.suomi.fi/e-Authorizations): mandate/authority checks for acting on behalf of another person.
- [Estonian Data Tracker](https://www.ria.ee/en/state-information-system/people-centred-data-exchange/data-tracker): source agencies can provide records of use of personal data.
- East Detroit student docs: city-county profile, government-and-records, municipal departments and independent-agency references.

Do not implement Suomi.fi-style mandates or Data Tracker merely because they are listed as precedents.

## Build and deployment

Root folder \`east-detroit/prototype/portable\`:

\`\`\`
npm install
npm run build
\`\`\`

Accessibility: the portal targets WCAG 2.2 AA. After building, run `npm run check:a11y` to scan every screen with axe-core and the reflow, text spacing, target size and focus checks in [ACCESSIBILITY.md](ACCESSIBILITY.md). GitHub runs the same check on every push to this folder.

Vercel \`east-detroit-operations\` deploys GitHub \`quarterback/field-school\` main branch from this folder. A passing TypeScript/Vite build verifies compilation, not the full browser experience or accessibility conformance.
