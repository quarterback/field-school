# Accessibility: WCAG 2.2 AA

My East Detroit must meet the [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) at level AA on every screen: the public homepage, sign in, the resident portal and the walkthrough. This matches the bar for state and local government web content under the ADA Title II rule ([28 CFR 35.200](https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200)), which names WCAG 2.1 AA; 2.2 AA includes everything in 2.1 AA.

A change is not done until the automated check passes and the manual checks below still hold.

## Automated check

```
npm install
npm run build
npm run check:a11y
```

`scripts/a11y-check.mjs` serves the built site, opens each screen in headless Chrome at 1280px and 320px wide, and fails if any screen has a problem. It covers:

| Screen | How it gets there |
| --- | --- |
| Public homepage, and a search with no match | `/` |
| Sign in, and the sign in error | Header **Sign in** |
| Portal home, All services, Licenses and permits, My requests, Account and privacy | Sign in with the first sample account |
| Walkthrough stops: home, birth, school, transit, authority, library, license | `/?demo=1&step=…` |

On each screen it runs:

- **axe-core** with the WCAG 2.0, 2.1 and 2.2 A and AA rules: contrast, names and labels, headings, landmarks, lists, tables, ARIA use, language, image text alternatives.
- **Reflow (1.4.10):** nothing scrolls sideways at 320px, apart from data tables inside their own scroll box.
- **Text spacing (1.4.12):** no text is clipped when line, letter, word and paragraph spacing are increased to the WCAG test values.
- **Target size (2.5.8):** buttons, links and fields are at least 24 by 24 pixels, except links inside a sentence.
- **Focus visible (2.4.7) and focus not obscured (2.4.11):** tabbing through the page, every stop shows a focus ring and is on screen.

Set `CHROME_PATH` if Chrome is not at `/usr/bin/google-chrome`. The GitHub workflow `east-detroit-a11y` runs the same check on every push and pull request that changes this folder.

To check a new screen, add it to `SCREENS` in the script.

## Built in rules

Follow these when you change the interface. Each one fixed a real failure or protects one the check found.

- **Accessible names match visible text (2.5.3).** Do not put an `aria-label` on a control that has visible text. If extra words are needed for a screen reader, add them with a `visually-hidden` span after the visible text.
- **Tables scroll inside their own box.** Every `<table>` sits in `.table-scroll`, which is `position: relative` so hidden header text cannot push the page sideways.
- **Every input has a visible label** above it. A placeholder is not a label.
- **Each screen has its own page title (2.4.2).** `App.tsx` sets `document.title` from the screen's `h1`.
- **Focus moves to the new screen's `h1`** after navigation, so keyboard and screen reader users start at the top of the new content (2.4.3). Homepage search moves focus to the results.
- **Status messages** use `role="status"` or `aria-live="polite"` so screen readers announce them without moving focus (4.1.3).
- **Motion respects `prefers-reduced-motion`.** Smooth scrolling and transitions turn off.
- **Images:** photos and renders that show a place get a short `alt` naming the place. Decorative marks such as the ED seal use `aria-hidden="true"`.
- **Color:** body text 4.5:1 against its background, large text and focus rings 3:1. Status is never shown by color alone; each status badge carries its word.
- **Focus ring:** keep the global `:focus-visible` outline (3px ruby, 3px offset). Do not remove it on any control.

## Manual checks

Automated tools find roughly a third of WCAG problems. Run these by hand before a class presentation or a large change, and record the result in the run's after action record.

| Check | WCAG | Last result |
| --- | --- | --- |
| Complete sign in, a library renewal and a billing question with the keyboard only | 2.1.1, 2.4.3 | UNVERIFIED |
| Same tasks with VoiceOver (Safari) or NVDA (Firefox): headings, form labels, errors and status messages are read | 1.3.1, 3.3.1, 4.1.3 | UNVERIFIED |
| Browser zoom to 200% and 400% at 1280px: no lost content or functions | 1.4.4, 1.4.10 | PASS (320px automated run stands in for 400%) |
| Sign in error says what went wrong and how to fix it | 3.3.1, 3.3.3 | PASS (code: `PublicSignIn` error text) |
| Walkthrough confirm dialogs (reset examples, restore account) can be answered with the keyboard | 2.1.1 | PASS (native `window.confirm`) |
| Windows high contrast / forced colors: buttons and focus rings stay visible | 1.4.11 | UNVERIFIED |
| Content on hover or focus can be dismissed and stays while hovered | 1.4.13 | N-A (no tooltips or hover content) |
| No time limits | 2.2.1 | N-A (no session timeout in the demo) |

Mark a check PASS only after running it. Untested items stay UNVERIFIED.
