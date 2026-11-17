# My East Detroit — Resident services demo

Resident-facing account and services portal for the City and County of East Detroit, Colorado (2030), used in the Public Mechanics course.

## What to show

Open the site to a preloaded **sample resident, Maya Rivera**. Review services in a single account, then inspect individual records and transactions:

- Parks and recreation pass (active)
- Food establishment licence (renewal due, with a working simulated renewal submission)
- Municipal housing assistance application (under review)
- Local service request (in progress, with a working submission form)
- Independent library district and water authority (not linked; simulated connection request)

Use **Account and privacy → Create another demo account** to register a different simulated resident ID. That account begins without any inherited service records. **Restore sample resident** returns to the preloaded example.

## Government boundaries

The city login is an account reference, not proof of identity or residency. No real sign-in, ID verification, payment, agency integration or email verification occurs. Independent organisations retain their records; a simulated connection request does not grant access. Updating a city login does not update service records automatically.

All data and activity are stored **only in this browser** using localStorage and can be downloaded from Account and privacy. Do not enter actual personal information.

## Technology

Vite, React 19, TypeScript, **Helsinki Design System React `hds-react`** for buttons and text inputs. Other controls are semantic HTML. The palette uses the established East Detroit ruby, amber, pearl aqua, maya blue and off-white colors with accessible ink for body text. Typography uses Archivo.

```bash
npm install
npm run dev
npm run build
```

Deploy the repository directory `east-detroit/prototype/portable` using `npm run build` with output `dist`. Vercel is linked to `quarterback/field-school` and this directory.

## Reference and review

- [Toronto City Login](https://www.toronto.ca/account/) and [account help](https://www.toronto.ca/account/city-of-toronto-login-help/): city login and services keep distinct records.
- [Toronto My Business Licence & Permit Account](https://www.toronto.ca/services-payments/permits-licences-bylaws/my-business-licence-account/): licence statuses, account linking and renewals.
- [East Detroit project dossier](../../v3/master_project_dossier_v3.md): established agencies and scenario.
- [No Slop UI](https://github.com/LeoStehlik/no-slop-ui): functional screen first, restrained controls and no invented metrics.
- [Red Pen Editor](https://github.com/quarterback/red-pen-editor): cut redundant explanatory language, preserve agency authority and exceptions.

Accessibility includes labelled forms, keyboard navigation, text status labels, high-contrast text and responsive tables. A comprehensive WCAG 2.2 AA evaluation and assistive-technology testing are still needed.
