# Public checker: rules and sources

The homepage section **See what your household may get** lets anyone describe a household without signing in and see what it may be eligible for. Each "What would change" line changes one answer, keeps the rest, and shows what the household gains or loses. Nothing is saved or sent. The rules live in `src/BenefitChecker.tsx` (`evaluate`).

Income limits use the 2026 HHS poverty guidelines for the 48 contiguous states: $15,960 for one person plus $5,680 for each additional person. The checker compares monthly gross income times 12 against a percentage of that guideline. Real eligibility also depends on deductions, assets, immigration status and other facts the checker does not ask for, so results say "may fit" and name the agency that decides.

| Program | Rule in the checker | Group | Source |
| --- | --- | --- | --- |
| Health First Colorado, adults 19 to 64 | Income at or below 138% FPL | Apply | [HCPF coverage fact sheet](https://hcpf.colorado.gov/sites/hcpf/files/HCPF%20MA%20Coverage%20Fact%20Sheet%20March%202025%20.pdf) |
| Health First Colorado, children | At or below 142% FPL | Apply | [HCPF: programs for pregnant people and children](https://hcpf.colorado.gov/programs-pregnant) |
| CHP+, children | 143% to 260% FPL | Apply | [HCPF CHP+ overview](https://hcpf.colorado.gov/sites/hcpf/files/Child%20Health%20Plan%20Plus%20Overview%20-%2012-2024.pdf) |
| Health First Colorado, pregnancy | At or below 195% FPL | Apply | [HCPF: programs for pregnant people](https://hcpf.colorado.gov/programs-pregnant) |
| CHP+ prenatal | Up to 260% FPL | Apply | [HCPF CHP+ overview](https://hcpf.colorado.gov/sites/hcpf/files/Child%20Health%20Plan%20Plus%20Overview%20-%2012-2024.pdf) |
| Newborn coverage | Parent pregnant and Health First Colorado eligible | Automatic | Scenario rule; see [PROACTIVE_SERVICES.md](PROACTIVE_SERVICES.md) |
| SNAP | Gross income at or below 200% FPL (Colorado broad-based categorical eligibility) | Apply | [Colorado rule 10 CCR 2506-1 §4.206](https://regulations.justia.com/states/colorado/2500/2506/rule-10-ccr-2506-1/section-10-ccr-2506-1-4-206), [Adams County SNAP](https://adamscountyco.gov/our-county/human-services/economic-mobility/community-support-services/snap/) |
| WIC | Pregnant, new baby or child under 5, and at or below 185% FPL or eligible for Health First Colorado or SNAP | Apply | [Colorado WIC eligibility](https://www.coloradowic.gov/eligibility) |
| Free school meals | Any school-age child | Automatic | [CDE: Healthy School Meals for All](https://ed.cde.state.co.us/nutrition/nutrition-programs/healthy-school-meals-for-all-program) |
| Colorado Universal Preschool | Child in the year before kindergarten, any income | Apply | Colorado Department of Early Childhood |
| RTD Zero Fare for Youth | Rides RTD and has someone 19 or under | Automatic | [RTD discount fares](https://www.rtd-denver.com/fares-passes/discount-fares) |
| RTD senior discount | Rides RTD and someone is 65 or older; ID is enough | Automatic | [RTD discount fares](https://www.rtd-denver.com/fares-passes/discount-fares) |
| RTD disability discount | Rides RTD and someone has a disability | Apply | [RTD discount fares](https://rtd-denver.com/discount-fares) |
| RTD LiVE | Rides RTD, adult 20 to 64, at or below 250% FPL | Apply | [RTD LiVE](https://www.rtd-denver.com/fares-passes/pass-programs/live), [RTD to the Transportation Legislation Review Committee, Aug. 2023](https://leg.colorado.gov/sites/default/files/images/tlrc_rtd_presentation_-_8.21.23_-_final__0.pdf) |
| Senior property tax exemption | 65 or older, owns, and has owned and lived in the home 10 years | Apply | [Larimer County instructions](https://www.larimer.org/sites/default/files/senior-shortform-instructions.pdf) |
| City rent help | Renter; the City Housing Division decides | Apply | Scenario service |
| Library card | Every resident | Automatic | Scenario service with the East Detroit Card |
| Food license renewal | Runs a food business | Automatic | Scenario rule; see PROACTIVE_SERVICES.md |

Poverty guideline source: [HHS 2026 poverty guidelines, Federal Register, January 15, 2026](https://www.federalregister.gov/documents/2026/01/15/2026-00755/annual-update-of-the-hhs-poverty-guidelines).

Comparable public tools: [GOV.UK: Check benefits and financial support you can get](https://www.gov.uk/check-benefits-financial-support), [USAGov benefit finder](https://www.usa.gov/benefit-finder).

## Updating

When HHS publishes new guidelines, change `FPL_BASE` and `FPL_STEP` in `src/BenefitChecker.tsx`. When a program changes its percentage, change the number in `evaluate` and the row above.

## Questions for the class

- Should a city site show state and RTD programs it does not run? Who answers when the estimate is wrong?
- The checker never asks for immigration status, which several programs require. Is that the right choice for a city tool?
- Which "What would change" lines show a cliff, where a small raise loses a benefit? What should the city do with that information?
