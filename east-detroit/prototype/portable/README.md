# My East Detroit — City and County resident services

A working vendor demonstration of how residents could access city-county services from a single account. Used in Public Mechanics: students represent departments and independently governed agencies and evaluate the proposed experience, record control, privacy, rules, and liability.

## Present the portal

The opening screen loads the example resident **Maya Rivera**, account **ED-2030-00482**. Each row opens an agency service with an inspectable record and working actions.

| Service | Record owner | What the resident can do |
| --- | --- | --- |
| Recreation and facilities | Parks, Recreation and Cultural Affairs | View a pass; choose a facility/date/time; confirm a reservation |
| Business licenses and permits | Public Health, Finance | Inspect food license and renewal status; submit a renewal |
| Housing assistance | City Housing Division | Inspect application, documents and verification; add a message |
| Service requests | Transportation and Public Works | View and submit a local service request |
| Library card and loans | Independent Public Library District | See a patron card and checked-out item; renew a loan |
| Water and sewer | Independent Water and Sewer Authority | Review bills and service address; submit a billing inquiry |

The **City Housing Division** and **Regional Housing Authority** are separate. Library and water providers also have their own boards and records. The vendor demonstration does not approve interagency data exchanges, real identity verification, payment processing, or record disclosures.

## Classroom use

Open a service belonging to the student department under discussion. Show the record and its source, perform a resident action, and ask what that department would need to authorize, verify, correct, or handle differently. The simulation discussion takes place outside the software.

Actions update browser-local sample records and the account activity list. No government systems are connected. **Account and privacy** can create another sample account or restore Maya Rivera. Earlier v1 browser data remains under a separate storage key.

## Stack and deployment

Vite, React 19, TypeScript, Helsinki Design System React (hds-react) controls alongside semantic native forms. Existing East Detroit identity: Archivo, ruby #B10F2E, amber #FFCF00, aqua #ACD7CA, blue #68C2F3, off-white #FDFFFF and ink #171717. No hero, AI assistant, government workflow editor, fake KPIs, or classroom narration.

Run npm install && npm run build from east-detroit/prototype/portable. The Vercel project east-detroit-operations builds that folder on pushes to main.

A full WCAG audit, browser testing, and assistive-technology validation remain distinct from compilation.

## Reference materials

- City-county profile and government records: ../student-edition/src
- City departments, independent agencies, housing precedents and neighborhoods: ../student-edition/src
- UI guardrails: No Slop UI and Red Pen Editor
