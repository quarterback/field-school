# After action record: the East Detroit Card

**Date:** November 17, 2026
**Scope:** `east-detroit/prototype/portable`: new `src/CityCard.tsx`, public card page, homepage card section, three portal pages, three walkthrough stops, service page photos, one new rendered scene, `CARD_PRIVACY.md`.

## What was asked

Make the demo show a realistic resident experience: an ID that gets residents into services the way university cards do, with privacy handled, based on real examples. Also carry the homepage improvements into interior pages.

## Decisions

- **Physical card and phone wallet.** The user did not choose, so the card shows both, as most 2030 programs would.
- **Framed as a vendor proposal.** Matches the rest of the demo. Resident pages show a working program; the walkthrough and `CARD_PRIVACY.md` say it is proposed and list questions for the class.
- **Privacy model** combines real precedents: number-only card, one yes or no answer per place (mDL selective disclosure), per-place Automatic / Ask me each time / Off (Singapore Myinfo consent), Card activity log (Estonia Data Tracker), no copies of enrollment documents (IDNYC), immigration status never asked (Chicago CityKey), guardian control over school connection (Tacoma FERPA opt out).
- **Reader simulator is walkthrough only.** A resident would never see it; it exists so the class can see both sides of a tap.
- **Interior pages** got photos of the place for library, transit, recreation and family records. Status timelines for every service were not built in this run.

## Checks run

- `npm run build`: pass.
- `npm run check:a11y`: 26 screens at 1280px and 320px, all pass. New screens: public card page, My card, card reader after a tap, card reader while the phone asks, and walkthrough stops card, reader and cardlog.
- Failures found and fixed during the run: radio inputs under 24px (2.5.8); sideways scroll at 320px from the card's decorative circle and from an unwrapped table (1.4.10); card text clipped under text spacing (1.4.12); filter select under 24px tall (2.5.8).
- Screenshots reviewed at 1280px for the public card page, My card, the reader in both states, Card activity and the library service page.

## Audit status

| Item | Result | Evidence |
| --- | --- | --- |
| Automated WCAG 2.2 AA, 26 screens, 2 widths | PASS | `npm run check:a11y` |
| Card settings save per resident and survive reload | PASS | Code: `card` stored on each profile in localStorage |
| Reader respects Off, Ask me each time and a stopped card | PASS | Code: `CardReaderPage.tap`; screenshots |
| Keyboard only: change a card setting, tap at a reader, approve on the phone | UNVERIFIED | Not run by hand |
| Screen reader announces reader result | UNVERIFIED | `aria-live="polite"` on the reader screen; not tested with VoiceOver or NVDA |
| Plain language review of new copy | UNVERIFIED | Written to CONTENT_STANDARDS.md; prosekeep, plain-as-day and red-pen-editor not available in this environment |

## Open items

- Status timelines on interior service pages.
- "Ask about this" on Card activity only shows a message; there is no messages page to receive the reply.
- Decide with the class whether the card belongs in the final East Detroit service model.
