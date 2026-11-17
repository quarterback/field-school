# After action record: editorial pass on resident-facing copy

**Date:** November 17, 2026
**Scope:** All resident-facing text in `east-detroit/prototype/portable`, with focus on today's additions (homepage checker, public card page, My card, Card activity, card reader), plus `BENEFIT_RULES.md`, `CARD_PRIVACY.md` and today's after action records. Also fixes a CI accessibility failure.

## What was asked

Make sure the content follows the editorial guides set earlier: CONTENT_STANDARDS.md (PlainLanguage.gov), prosekeep, plain-as-day (plain-language-default) and red-pen-editor.

## How it was checked

1. Rendered 16 screens in headless Chrome and saved the text residents see in each.
2. `prosekeep check --profile public-service` on the screen text and the new docs: 0 mechanical findings.
3. `plain-language-default check` on each screen: only "long sentence" flags caused by table and form labels read without punctuation. No real sentences flagged.
4. `red-pen-editor inspect`: repeated labels by design (agency names, "Ask me each time") plus three real repetitions, fixed below. `review` and `edit` need a local Ollama model, which this environment does not have, so the substantive cut pass was done by hand with its method.
5. Manual review against CONTENT_STANDARDS.md: name the actor, familiar words, explain abbreviations, no promises the demo does not keep, no contrastive "X, not Y" frames.

## What changed

| Problem | Where | Fix |
| --- | --- | --- |
| Percentages of the poverty level in every result | Checker results | Replaced with what the program does; the dollar income limit for the household stays |
| PEAK, WIC and SNAP not explained | Checker | One line explains Colorado PEAK; WIC and SNAP names now say what they are |
| "Their reply will appear in your messages" | Card activity | No messages page exists; now "Your question about this entry is recorded for [agency]" |
| "Your card holds a number, not your records" and two similar frames | Public card page, My card | Rewritten as plain statements |
| Passive voice with no actor ("Immigration status is never asked") | Public card page, My card | "Staff never ask about immigration status" |
| Hero line repeated the checker heading right below it | Homepage | Removed |
| "Each place checks one thing" repeated the section heading | Public card page | Removed |
| Privacy line said the same thing twice | Checker | Shortened |
| Arrow glyphs on links and buttons (→, ←, ↗, ›) | Portal pages | Removed; route lists use "to" |

## CI failure fixed

The GitHub run of `check:a11y` failed once: at 320px, after the homepage search scrolled the page, "Skip to main content" received focus off screen (2.4.11). The skip link is now `position: fixed`, so it always shows at the top of the window. Local and CI runs pass.

## Audit status

| Item | Result | Evidence |
| --- | --- | --- |
| prosekeep mechanical checks | PASS | 0 findings, public-service profile |
| plain-language-default heuristics | PASS with notes | Only label-run flags, reviewed |
| red-pen-editor model review | UNVERIFIED | Needs local Ollama; done by hand instead |
| Plain language test from CONTENT_STANDARDS.md on each new screen | PASS | Manual review; each screen answers what it is, what you can do, what happened and what to do next |
| Real readers understand the checker results | UNVERIFIED | Needs testing with residents or students |
