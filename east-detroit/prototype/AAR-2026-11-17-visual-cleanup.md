# After action record: resident portal visual cleanup

**Date:** November 17, 2026
**Scope:** `east-detroit/prototype/portable` (live at east-detroit-operations.vercel.app)
**Ask:** The design still lacked the cleanliness the project needs.

## What changed

- Tables use one style: grey header with a heavy top rule, thin rules between rows, no zebra striping and no hover tint.
- The My services and Services from other agencies tables share fixed column widths, so service, office, status and action line up across both.
- Removed the repeated "Run by another agency" line under every row in the other agencies table; the section heading and intro already say it.
- State benefits, the county court and hospital services show "Separate service" and hold no resident record, so they now appear only in All services. A short note under the table links there.
- Removed arrow glyphs from every link and action, and the chevron after My account.
- Updates for you items now read top to bottom (status, title, text, explanation) with the action on the right, inside the same rule system as the tables. "Why am I seeing this?" text sits beside a thin aqua rule instead of a tinted box.
- Recent activity spans the full width and uses the same row rules.
- Header actions (Explore demo, My account, Sign out) are plain text links at one weight. Explore demo turns amber only while the tour is on.
- Status badges have a thin matching border so they hold their shape against white rows.
- Public page and sign in: removed the tinted boxes. The updates note uses an aqua rule; the records note and the resident picker sit under a heavy top rule, and resident choices are rows with a ruby marker for the selected one.
- Section spacing is consistent: 56px between sections and 44px under the page title.

## Fixed along the way

- On phones the page was wider than the screen (460px of content in a 390px screen) because the hidden "Action" column labels escaped their scroll area. `.table-scroll` is now positioned so they stay inside it.
- On phones the service tables hid status and actions behind a sideways scroll. Rows in those tables now stack: service, office, then status with its action.

## Not changed

Content, services, statuses, flows, the data model, the guided tour and the HDS form controls are as they were. The household table still scrolls sideways on phones.

## Checks

- `tsc --noEmit && vite build` passes.
- Screenshots at 1280px and 390px for the public page, sign in, home (Maya and Samira) and All services. No horizontal page overflow at 390px.
- No full accessibility audit was run.
