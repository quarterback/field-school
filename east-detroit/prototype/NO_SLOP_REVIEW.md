# No Slop UI and editorial review — resident portal

**Product fit:** The first screen contains the resident's real task surface: services, agencies, status and next actions. No hero, KPI dashboard or invented charts.

**Navigation:** Standard city header and horizontal sections. Labels describe resident tasks. No ceremonial roleplay or developer integration console.

**Records:** Agency names, account references, service statuses and exception cases are preserved. Explicitly separates city government from the Regional Housing Authority, Library District and Water and Sewer Authority.

**Appearance:** Solid off-white reading surfaces, ruby city identity, restrained amber and aqua highlights, no gradients, no glass, no spring/transform motion. Uses Archivo, user-approved chromatic colors, and HDS React for core controls.

**Editorial:** Removed generic system explanation from the primary screen. Copy names who controls the information and what happens next. All data is marked simulated, and ID/registration/agency-sharing limits remain explicit.

**Accessibility acceptance still to check:** Automated axe, VoiceOver/NVDA, 320px reflow, 200% zoom, keyboard test, manual contrast around rendered HDS controls. A source-level review does not establish full WCAG compliance.

## Design-only review: 16 November 2026

- Preserved the red top bar, masthead, navigation, typeface, color tokens, tables, Resident Account ID panel, and all existing service flows.
- Removed a duplicate request CTA beside Recent activity; the existing request service remains available and operational in the My services table.
- Improved keyboard access to horizontally scrollable tables using focusable, labeled scroll regions and a visible focus outline.
- Corrected a mobile selector that hid the only text in the top bar when the screen was narrow.
- Removed CSS for discarded notice and badge elements. No agency, simulation, service, or data-model changes.
- Full browser and assistive technology testing remains outstanding.
