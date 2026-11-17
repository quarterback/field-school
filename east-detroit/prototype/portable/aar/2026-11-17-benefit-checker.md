# After action record: public benefit checker

**Date:** November 17, 2026
**Scope:** `east-detroit/prototype/portable`: new `src/BenefitChecker.tsx`, homepage section and header link, `BENEFIT_RULES.md`.

## What was asked

Students said the main page should let people see what they're eligible for based on demographic facts, without logging in, and let them try counterfactuals.

## What changed

- New homepage section, **See what your household may get**, placed right after the hero. The hero links to it, and the header's first link is "What you may get."
- Inputs: household size, monthly income (number field and slider), who lives in the household, renting or owning, riding RTD, running a food business. No names, addresses or dates of birth.
- Results in two groups: "Happens without an application" and "You apply, and the agency decides." Income-tested items show the monthly limit for that household size.
- **What would change:** eight one-answer changes (income $1,000 lower, $500 lower, $500 higher, a new baby, someone turns 65, a child starts school, starting to ride RTD, renting instead of owning) with what each adds or removes.
- Nothing is stored: plain component state, no localStorage, no network.
- Rules use 2026 HHS poverty guidelines and current Colorado, HCPF, RTD and county rules, with sources in `BENEFIT_RULES.md`.

## Decisions

- Results say "may fit" and name the deciding agency, because the checker skips deductions, assets and immigration status.
- The checker does not ask immigration status. Recorded as a question for the class.
- Header links reduced to four on the homepage (What you may get, Services, East Detroit Card, Get help). "Public agencies" was dropped from the header; the section is still on the page.

## Checks run

- `npm run build`: pass.
- `npm run check:a11y`: all screens pass at 1280px and 320px, including a new run of the checker with a senior homeowner at $0 income.
- Default household (3 people, $3,800 a month, about 167% of the poverty level) checked by hand against the rules: CHP+ for children, SNAP, WIC, LiVE, free school meals, free youth RTD, rent help, library card. The "had a baby" line moves children from CHP+ to Health First Colorado because the household grows to 4.

## Audit status

| Item | Result | Evidence |
| --- | --- | --- |
| Automated WCAG 2.2 AA | PASS | `npm run check:a11y` |
| Thresholds match sources | PASS | `BENEFIT_RULES.md` table against `evaluate` |
| Keyboard use of the slider and checkboxes | UNVERIFIED | Native inputs; not tested by hand |
| Screen reader announcement of the result count | UNVERIFIED | `aria-live="polite"` on the summary line; not tested |
| Cognitive load fixes for the signed-in portal | NOT STARTED | Proposed in chat; not part of this run |
