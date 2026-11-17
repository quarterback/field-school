# The East Detroit Card: design and privacy

The East Detroit Card is a **vendor-proposed** city-county photo ID that also works as a key: at the library, recreation centers, RTD fare readers, school front offices and age-based rates. The class decides whether East Detroit should adopt it, which places should accept it and what each place may learn. Resident pages show the card as a working program so students can judge the experience. Classroom framing stays in the walkthrough and in this file.

## What students can see

| Where | What it shows |
| --- | --- |
| Public homepage, "One card for the library, recreation centers and RTD" | The card and a link to the card page |
| Public card page ("About the East Detroit Card") | Where it works, the one answer each place gets, privacy promises, how to get a card |
| My card (signed in) | The plastic card and phone wallet version, card status, report lost card, and a setting for each place: Automatic, Ask me each time, or Off |
| Card activity | Every tap and record lookup: who asked, when, what they learned, why, and whether it was shared |
| Try the card at a reader (walkthrough) | Tap the card at five places and see the reader screen and the resident's phone side by side |

Walkthrough stops 3 to 5 cover the card: `?demo=1&step=card`, `?demo=1&step=reader`, `?demo=1&step=cardlog`.

## Example residents

- **Maya:** library, recreation, RTD and water automatic. School front office and age checks ask each time. Her log shows a school pickup she approved on her phone.
- **Avery:** library and RTD automatic. Age checks off, and the log shows a youth rate check that was refused.
- **Helen:** library, recreation, senior rate and water automatic. Her pool visit shows the pass check and the age check as two separate answers.
- **Samira:** library set to ask each time. The log shows the Library District's early literacy card offer for Lucia waiting for her answer.

## Privacy rules built into the design

1. **The card holds a number, not records.** Each agency looks up only its own records. No single file about the resident exists.
2. **One answer per place.** A reader gets a yes or no answer such as "resident pass active" or "meets the age for the rate." It never gets the resident's address, birth date or other services. This follows selective disclosure in mobile driver's licenses (ISO/IEC 18013-5), which can prove a holder is over an age threshold without revealing the birth date.
3. **The resident sets each place.** Automatic, Ask me each time, or Off. Ask me each time sends a request to the phone first, as Singapore's Myinfo asks for consent on every transaction.
4. **Every check is visible.** Card activity lists each tap and lookup with who, when, what and why, following Estonia's Data Tracker, which shows residents who accessed their data in state registers and for what purpose.
5. **No copies of enrollment documents.** Staff check proof of identity and residence and hand it back. New York City stopped keeping IDNYC application documents after a 2016 to 2017 court fight over whether they could be used against cardholders.
6. **Immigration status is never asked.** Chicago's CityKey is available regardless of age, housing status, criminal record, immigration status or gender identity.
7. **Parents decide for children.** A guardian chooses whether a child's card connects to the school district, as Tacoma lets families opt out of sharing FERPA-protected data with the library.

## Real-world precedents

| Precedent | What it shows | Source |
| --- | --- | --- |
| University of Michigan Mcard | One card for photo ID, library borrowing, building access, meals, and free TheRide buses because U-M pays riders' fares | [U-M Finance: Mcard overview](https://finance.umich.edu/treasury/mcard/overview), [LTP: MRide](https://ltp.umich.edu/transportation-alternatives/mride) |
| Chicago CityKey | A municipal ID that is also a library card, Ventra transit card and prescription discount card | [Chicago City Clerk: About the CityKey](https://www.chicityclerk.com/node/6546) |
| Chicago 81 Club | Student IDs work as library cards automatically, with no application | [EveryLibrary on the 81 Club](https://action.everylibrary.org/chicago_s_81_club_how_automatic_library_access_is_transforming_student_learning) |
| Tacoma Pathway Program | Student ID as library card, with a FERPA opt out | [Tacoma Public Library](https://www.tacomalibrary.org/news/the-pathway-program-tps-student-id-is-a-library-card) |
| Direct certification | Children in SNAP households get free school meals without an application | [USDA Food and Nutrition Service](https://www.fns.usda.gov/research/nslp/direct-certification-state-progress-implementation-report-congress) |
| Singapore Myinfo | Consent asked for every transaction that requests personal data | [Singpass factsheet](https://isomer-user-content.by.gov.sg/85/16f1b7a4-1da4-4c51-aabe-5334d635ba45/Annex%20D%20-%20Singpass%20Factsheet%20(30%20June%202026).pdf) |
| Estonia Data Tracker | Residents see who accessed their data, when and why | [RIA: Data tracker](https://ria.ee/en/state-information-system/people-centred-data-exchange/data-tracker) |
| Mobile driver's license | Age over a threshold proven without the birth date | [Start with Identity: ISO/IEC 18013-5](https://startwithidentity.com/standards/iso-18013-5-mdl/) |
| IDNYC documents | City stopped retaining applicants' documents | [DNAinfo, April 2017](https://www.dnainfo.com/new-york/20170407/st-george/idnyc-document-destroy-lawsuit) |

## Questions for the class

- Which places should accept the card on day one, and which should stay off by default?
- Which checks may be automatic, and which must always ask the resident?
- Who may see Card activity besides the resident? What happens when police or a court ask for it?
- Should RTD keep trip history tied to a city-issued card at all?
- Should a lost card stop everything at once, or each connection separately?
- What happens for residents without a smartphone when a place is set to "Ask me each time"?

## Limits of the demo

Everything is synthetic and stored in the browser. No reader, agency, wallet or phone is contacted. "Ask about this" on Card activity only shows a message. The card visual is drawn in CSS and the place images are rendered concept scenes.
