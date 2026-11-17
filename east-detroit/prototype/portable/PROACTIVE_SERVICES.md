# Event-triggered services — East Detroit vendor demonstration

The city-county is evaluating whether a verified fact already held by a participating public agency can trigger another public service without making the resident repeat it. These are **vendor-proposed** workflows, not enacted agency rules or actual data agreements. A resident-facing prototype can demonstrate the outcome; government participants must decide the legal and operational terms.

## Two workflows

### A. A child is born

In the sample profile, **Samira Ortiz** is the parent of **Lucia Ortiz**, born November 12, 2030. A simulated registered birth triggers a sequence:

1. **County Clerk / State Vital Records** records the child's name, date of birth and parent relationship. No medical chart enters the city portal.
2. **County Human Services / State of Colorado** checks an existing parent coverage record. The sample mother had qualifying Health First Colorado coverage when Lucia was born. Under Colorado's eligible-newborn provisions, after the birth is reported and added to the case, coverage may begin without a new application. The State, not the municipality, determines coverage.
3. **County Human Services** displays WIC information. A child under five may be eligible, but WIC retains its own enrollment and nutrition assessment. A resident can ask for contact; the button changes only a browser-local request.
4. **Independent Library District** offers an early-literacy card. Acceptance of an offer is not issuance of an official card; the district must choose to participate and define its own guardian and patron-record rules.

The portal has a **Family and children** service page, including a child record, a list of completed automatic steps, and offers requiring an additional action. Home shows a short “Updates for you” list. Each offer has a “Why am I seeing this?” disclosure naming the records used and source agency.

During the opt-in vendor tour, select Samira then **After a child is born**. The demo can move to a “before registration” state, then replay receipt of the birth event. The resulting updates appear without a second birth form.

### B. A food establishment license renews

In **Maya Rivera**'s sample record, Cypress Cafe's food license is renewed for 2031 after agency-owned records satisfy a proposed automatic renewal rule:

- Public Health: inspection clear; owner/business unchanged.
- Finance: annual fee settled.
- License holder: authorization for an automatic renewal is on file.
- Public Health: the responsible authority allows that transaction and retains the power to stop or review an exception.

The resident sees a renewed license and the source checks, **without submitting another renewal application**. A blocked inspection pauses automation and makes manual review available. Vendor tour step **Public Health and Finance** lets the instructor flag or clear an inspection issue to show both results. This is a *proposed* automation; Colorado retail-food licensure still controls renewal timing, approval, compliance and fees.

## Authority and privacy questions

- How will the city verify a parent or guardian before showing the child's record?
- Which agency is allowed to provide the birth event, and to whom? For what stated purpose?
- What if the parent, address, or infant record is wrong?
- What information can the state share back about coverage, and what must it withhold?
- Should the Library District receive a birth-triggered offer request at all?
- What happens when inspection records, ownership, or payments disagree?
- Can automatic renewal operate under existing state law and city-county operating rules, or would legislation or new authority be needed?

**No single municipal database is implied.** A working arrangement would use specific authorized exchanges; the original records and decision rights remain with the source agencies. The simulated portal stores fixtures and decisions in browser localStorage only. It does not receive real hospital, birth registration, library, WIC, benefit, financial, or inspection data.

## Working reference patterns

- Estonia, [Family benefit e-service](https://www.tehik.ee/en/family-benefit-e-service): registered birth starts data-based family benefit offers that parents review.
- Estonia, [RIA proactive government services](https://ria.ee/en/state-information-system/personal-services/proactive-government-services): government services organized around life events and the records already held.
- Estonia, [Data Tracker](https://www.ria.ee/en/state-information-system/people-centred-data-exchange/data-tracker): participating registers show residents how their data was used.
- Colorado, [Health First Colorado: enrolling a newborn](https://www.healthfirstcolorado.gov/how-do-i-enroll-my-newborn-in-health-first-colorado): newborn addition to eligible parent's case after birth is reported.
- Colorado, [WIC eligibility](https://www.coloradowic.gov/eligibility): children under five may qualify; separate program certification is still required.
- Colorado, [Food Protection Act, C.R.S. §25-4-1606](https://law.justia.com/codes/colorado/title-25/disease-control/article-4/part-16/section-25-4-1606/): requirements and authority for food establishment licenses and renewals.

The reference examples justify the design *possibility*, not an assertion that East Detroit institutions have agreed to it.
