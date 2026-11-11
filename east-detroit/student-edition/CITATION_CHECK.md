# Citation check: East Detroit student edition

Checked 11 November 2026. All 49 distinct URLs in the five V3 source documents were requested with a browser user agent. Where a page loaded, its text was searched for the specific figures and dates the readings attribute to it.

**Result:** 7 links were broken and have been replaced, both here and in the V3 sources. Every figure checked against a reachable source matched. Four city of Detroit pages and the Census QuickFacts page block automated access from this environment and **need a manual click-check** before distribution (see the last section).

## Broken links: corrected

| Source | Old URL | Problem | Replacement | Verified |
|---|---|---|---|---|
| H1 Home Forward FAQ | `https://www.apps.homeforward.org/faq-about-us/` | TLS certificate does not cover the `www.apps.` host; browsers show a security warning | https://www.homeforward.org/faq-about-us/ | Page states "public corporation", "not part of the City", names Gresham |
| H2 Home Forward board | `https://www.apps.homeforward.org/board-of-commissioners/` | Same | https://www.homeforward.org/board-of-commissioners/ | Nine members; four Portland, Gresham, county, participant; budget and executive director powers |
| H4 Moving to Work | `https://www.webapp.homeforward.org/moving-to-work/` | Same (`www.webapp.`) | https://www.homeforward.org/moving-to-work/ | April 1999 entry |
| H11 Leadership transition | `https://www.webapp.homeforward.org/home-forward-announces-leadership-transition/` | Same | https://www.homeforward.org/home-forward-announces-leadership-transition/ | Mathews, May 1, Buonocore |
| H14 Home Forward reporting | `https://www.main.homeforward.org/reporting/` | Same (`www.main.`) | https://www.homeforward.org/reporting/ | Page loads |
| GLWA (governance packet) | `https://www.glwater.org/about-us/` | HTTP 404 | https://www.glwater.org/what-we-do/ | 40-year lease of DWSD treatment plants; GLWA operates regional infrastructure; DWSD keeps local system ownership and customers |
| LinkNYC (governance packet) | `https://www.nyc.gov/site/doitt/initiatives/linknyc.page` | HTTP 404 | https://www.link.nyc/ | Program site loads; its content is rendered by script and could not be read here. **Instructor: confirm, or replace with a current NYC Office of Technology and Innovation page.** |

## Claims checked against source text

| Ref | Claim in Reading 3 | Found in source |
|---|---|---|
| D4 | HUD took control of DHC on July 7, 2005 | Yes |
| D5 | Transition plan, January 25, 2012 | Yes |
| D6 | Returned March 13, 2015; five-member mayoral board with resident member | Yes |
| D7 | April 2023: 221 of 1,960 recertifications completed; landlords stopped accepting vouchers; delayed payments | Yes (article dated June 14, 2023) |
| D8 | 1,747 delinquent recertifications; about 1,500 fewer vouchers than capacity; outside contractor | Yes (April 23, 2024). The article also gives "out of around 5,000" and "capacity of more than 6,400 vouchers"; not added. |
| D9 | Occupancy about 78% | Yes (May 15, 2023). The 78% figure is the **interviewer's**, put to the DHC director; wording adjusted to say so. |
| D10 | Vacancy near 23–24% in September 2024; rent collection; deteriorating buildings | Yes (November 12, 2024): "nearly 23%" as of September. D11 gives 24% for the same month, so the 23–24% range is kept. |
| D11 | Backlog mostly cleared; vacancy 24% to 14%; all 15 complexes passed HUD inspections; residents' problems persisted | Yes (August 13, 2025) |
| H5 | \$38M 2027 gap; 2026 shortfall from \$13.8M to nearly \$38M; possible \$28M HUD payment; 12,356 households | Yes |
| H6 | 956 of 6,847 units, about 14%; headline 955 | Yes |
| H7 | 185-day average; 172 days for directly managed buildings | Yes; article date February 18, 2026 (URL path says 02/17) |
| H8 | Debt and vacancy revenue | Yes; February 25, 2026 |
| H9 | One manager averaging 292 days | Yes; March 25, 2026 |
| H10 | More than \$100,000 in CEO travel, 2023–2025 | Yes |
| H12 | Ethics Commission voted to investigate | Yes |
| F1–F3 | EIV description; 24 CFR 5.233; 24 CFR 982.516 | Yes |
| Census Reporter | Watkins CDP: 847 residents; median income \$158,173 | Yes |
| CASP plan | 48 square miles; 21,079 / 9,738 / 375 acres; Hudson and Harback roads; wastewater | Yes |
| MCL 45.515 | Charter county functions | Yes |
| Comparison sites | SIPA, UTOPIA, KOMBIT, X-tee, Athumi, Broomfield, CDHS, DRCOG, Detroit Community Technology Project, Adams County airport agreements, Colorado Constitution, Michigan government | Pages load and name the subject. Their detailed operating claims were not re-verified; Reading 2 tells students to check current rules. |

## Needs a manual check (blocked from this environment)

These pages returned HTTP 403 to every automated route, including the Internet Archive. The links are probably fine in a normal browser, but the claims were **not** verified here.

| Ref | URL | Claim to confirm |
|---|---|---|
| D1 | https://detroitmi.gov/departments/housing-and-revitalization-department/about-hrd | HRD duties; partnership with the independent DHC |
| D2 | https://detroitmi.gov/departments/housing-and-revitalization-department | Programs and services |
| D3 | https://detroitmi.gov/departments/housing-and-revitalization-department/strategic-plans-reports-and-data/2025-2030-city-detroit-affordable-housing-strategy | Preserve 10,000 units; build 3,000 |
| DWSD | https://detroitmi.gov/departments/water-and-sewerage-department | Local system and customers |
| Census | https://www.census.gov/quickfacts/fact/table/adamscountycolorado/PST045225 | \$94,571; \$1,781; 9.8%; 68.6%; 43.7%; 554,668 (July 2025) |

Outlier Media (D7–D11) rate-limited direct requests; those articles were read through a separate fetch tool and are verified above.

## Added 11 November 2026: court, hospital authority and Estonia sources

| Source | Claim | Found in source |
|---|---|---|
| Colorado Legislative Council, *Overview of the Colorado Judicial Branch* (2025) | County courts hear civil cases up to \$25,000; Denver County Court is the only county court not funded by the state | Yes |
| Ballotpedia, Colorado County Courts | Denver County Court is not part of the state system; judges appointed by Denver's mayor | Yes |
| C.R.S. § 25-29-103 | Denver Health and Hospital Authority is a body corporate and political subdivision, not a state or local government agency; eleven-member board appointed by the mayor, confirmed by council | Yes |
| Denver Health, 20th anniversary history | Separated from the City of Denver effective January 1, 1997 | Yes |
| Estonian Information System Authority, X-tee | Members describe shared data, others use it under agreement; owner controls the data; authentication, multi-level authorization, logging, encryption and signing; joining requires membership, a security server and an agreement | Yes |
