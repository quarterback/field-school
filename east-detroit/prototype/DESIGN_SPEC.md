# My East Detroit — resident portal

**Status:** Resident-facing classroom demonstration, replacing the prior case-based agency dashboard.
**Source:** `east-detroit/prototype/portable/`
**Production target:** `east-detroit-operations.vercel.app`

## Product

Build a sample city-county resident account like Toronto's City of Toronto Login and municipal business-licensing services. A person creates a local simulated account ID and uses one application to open participating public services. Agency records remain distinct. A single city login does not grant unrestricted access to municipal or independent agency information.

A preloaded sample account must make the tool usable immediately in a two-hour Zoom session. Display working example records for a recreation pass, business licence renewal, local housing assistance and a municipal service request. Show library and regional water as **not linked** independent services.

Students representing departments react to the services, record ownership, eligibility requirements, privacy and liability. They do not configure APIs, approve access grants, or decide integrations within this interface.

## Screens

1. **My East Detroit:** sample resident, account ID, table of attached services, responsible offices and actionable status.
2. **City services:** browse services; disclose independent agencies.
3. **Business licence:** inspect an example food licence and submit a simulated renewal for agency review.
4. **My requests:** inspect and submit a simulated street or public-space request.
5. **Account and privacy:** resident contact profile, service connections, local activity, data export and restore sample.
6. **Registration:** create a simulated account ID without any real verification or identity claim.
7. **Service detail:** recreation pass, local housing application and separate library/water connection requests.

## Design

Use actual **hds-react** components for inputs and buttons, clear HTML forms and tables, and familiar municipal service patterns. The user's palette is #FDFFFF, #B10F2E, #FFCF00, #ACD7CA and #68C2F3 with #171717 foreground. Headings use Archivo in an authoritative editorial register. Use bold colors principally in city identity and important service notices. No dashboard hero, fake statistics, decorative card grids, gradient backgrounds or grandiose explanatory copy.

Apply No Slop UI's review checklist and Red Pen's fact-preserving cuts. Preserve roles and responsibilities from the East Detroit dossier. Maintain explicit status labels and a high-contrast keyboard focus indicator.

## Critical limits

- Everything is a simulation. No real identifiers, credentials, emails, payments or agency systems.
- The city account is not government identification or proof of residency.
- A city's assistance record does not disclose the separate housing authority's files.
- A library or utility connection request is not actual authorization or a data transfer.
- A licence renewal submitted by a user is still subject to Public Health review.
- Local browser storage is not a shared service or audit trail.

## Verification

Build must pass `tsc --noEmit && vite build`. Test register and restore, renewal, new service request, independent connection requests and local reload. Check 320px reflow, 200% zoom, keyboard order, screen reader text and focus. Do not claim a full WCAG audit without one.

## Sources

- https://www.toronto.ca/account/
- https://www.toronto.ca/account/city-of-toronto-login-help/
- https://www.toronto.ca/services-payments/permits-licences-bylaws/my-business-licence-account/
- https://github.com/quarterback/field-school/tree/main/east-detroit/v3
