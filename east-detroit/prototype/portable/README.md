# My East Detroit — vendor demonstration

A resident-facing city-county service portal for a **Public Mechanics** classroom vendor presentation. Students represent East Detroit departments, special districts, regional bodies and other public agencies. They inspect plausible agency services and decide which arrangements should be accepted, limited or rejected.

## Start the walkthrough

- **Resident portal:** https://east-detroit-operations.vercel.app/
- **Guided walkthrough for students:** https://east-detroit-operations.vercel.app/?demo=1
- **Direct stop:** append a step such as \`?demo=1&step=school\` or \`?demo=1&step=authority\`

Anyone can explore the portal without signing in. The **Explore demo** control in the header opens the optional seven-stop vendor walkthrough. The walkthrough offers previous/next, a stop selector, prompts about record authority, and a copyable link. Closing it returns to the normal resident interface. Students may still navigate the service table independently.

## Resident-facing examples

The portal opens with **Maya Rivera**, resident account **ED-2030-00482**, and sample records.

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

Vercel \`east-detroit-operations\` deploys GitHub \`quarterback/field-school\` main branch from this folder. A passing TypeScript/Vite build verifies compilation, not the full browser experience or accessibility conformance.
