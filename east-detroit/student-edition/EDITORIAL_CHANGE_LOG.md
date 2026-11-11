# Editorial change log: East Detroit student edition

**Edition:** November 2026. **Sources:** `east-detroit/v3/` as of commit `ef8f11f`. **Method (first and second passes):** editorial judgment by the editing agent following Red Pen Editor 0.2.1's SKILL.md and rubric; Red Pen `inspect` for repetition; Red Pen `protectedLiterals` in a cross-document literal guard. Edits were applied by script, not through Red Pen's `apply` guard. The plain language checklist was applied from memory. Section 9 records the third pass, which used Red Pen `brief` and `apply` and the archived checklist.

This log covers substantive changes: deletions, moves, merges, corrections and anything added. It does not list routine line edits (shorter sentences, active voice, familiar words) unless they could change meaning. Nothing in the student edition is a new interpretation of East Detroit. Where the source says something, the edition says the same thing or less.

## 1. How the sources map to the four readings

| Reading | Built from |
|---|---|
| 1. Welcome to East Detroit | Dossier §1, §3, §4, cultural anchors, housing institutions (summary); atlas §1–6; README "what is real and fictional"; new map (Figure 1) |
| 2. How East Detroit Is Governed | Governance packet §1–4, housing summary, §8, reference list; dossier §6 |
| 3. Housing: Two Models of Public Authority | Housing case, complete |
| 4. The Municipal Project Brief | Before-the-build handout (complete); dossier §2, §5, §7; governance packet §5–7, §9–10; assumption audit §2 and §5 |

**Left in the repository as working material, not distributed:** master dossier (as a document), assumption audit (as a document), map agent handoff, atlas §7 "Data limits and map deliverables" and §8 "Data contract", `neighborhoods_2030.json`, the GeoJSON files, stakeholder role cards and the sign-up and decision record (sign-up materials follow separately).

## 2. Corrections (also applied to the V3 sources)

| # | Where | Change | Evidence |
|---|---|---|---|
| C1 | Housing case H1, H2, H4, H11, H14 | Replaced `www.apps.`, `www.webapp.` and `www.main.homeforward.org` links with `www.homeforward.org`. The old hosts fail TLS certificate checks. | CITATION_CHECK.md |
| C2 | Governance packet, GLWA | `glwater.org/about-us/` (404) → `glwater.org/what-we-do/` | CITATION_CHECK.md |
| C3 | Governance packet, LinkNYC | `nyc.gov/.../linknyc.page` (404) → `link.nyc`. **Flagged for instructor review**; the new page's content could not be read here. | CITATION_CHECK.md |
| C4 | Housing case, D9 | "A 2023 Outlier interview described public housing occupancy around 78%" → "the interviewer put public housing occupancy at about 78%." The figure is the interviewer's, not the agency's. | D9 text |
| C5 | Housing case, D7–D11 | Added publication dates (June 14, 2023; April 23, 2024; May 15, 2023; November 12, 2024; August 13, 2025). The source list's own note says dates are given "where stated"; these were missing. | Article bylines |

No figure in any source was found to be wrong.

## 3. Deletions and merges

### Reading 1

| Removed or merged | Reason | Where the meaning survives |
|---|---|---|
| Atlas §3: the sentence "Staff must test whether assistance, transport, and public information reach residents who have different work schedules, housing arrangements and access to documents," repeated verbatim 20 times | Red Pen `inspect` flagged 20 identical sentences | Stated once, before the neighborhood list |
| Atlas §3: "The fictional population is X, with Y% renter households and a $Z median household income" for each neighborhood | Each figure already appears in Table 3 | Table 3 |
| Dossier: "The old package centered the entire city on the 48-square-mile spaceport planning rectangle and described only seven land-use blocks" | Version history; students need the current premise | The 48-square-mile CASP area remains as real geography |
| Dossier: "The original name 'Colorado Isotopes' and the names 'Colorado Altitude' / 'The Hangar at Aerotropolis Center' are retired" | Students never saw the retired names in this edition | Current names only. The audit keeps the history. |
| Dossier and atlas: duplicate Adams County and Watkins reference figures, given in both documents | Duplicate | One "REAL REFERENCE: how the scale was set" paragraph |
| Dossier and atlas: duplicate citywide figures (population, households, income, rent) in a bullet list, Table 2 and the atlas table | Triplicate | Table 1 (city at a glance) and Table 2 (profile). Population and households were also cut from Table 2 after an `inspect` flag; Table 2 now points to Table 1. |
| Dossier: references to file names (`neighborhood_atlas_2030.md`, `neighborhoods_2030.json`) | Students do not use the repository | Replaced with "Reading 1", "Reading 2" etc. or "the class decision record" |
| Atlas §7–8 (map deliverables, data contract) | Instructions for the map agent, not students | Repository |
| Dossier: "Expansion creates space for a credible city model without pretending the spaceport runway can be surrounded by residential towers" | Line-edited | "The larger area leaves room for a credible city without placing housing around the spaceport runway." |

### Reading 2

| Removed or merged | Reason | Where the meaning survives |
|---|---|---|
| Packet opening: "It replaces the previous 20-page packet's presumption of a completed procurement, voter-approved service platform, cloud vendor, and selected first release" | Version history | "No procurement, service platform, cloud vendor, governance board or first service has been chosen" |
| Packet §4: "These examples originally appeared in the 20-page class packet" | Version history | — |
| Packet housing section: summary of Detroit and Home Forward evidence (HUD intervention, MTW, 185-day delays, budget crisis, ethics investigation) | Duplicates Reading 3 in full | Reading 3 |
| Packet §1: "An agent-generated screen or flow is evidence that an arrangement can be simulated, not evidence that its rules or funding have been adopted" | Belongs with the class build | Moved to Reading 4, "What happens in class" |
| Packet §5–7, §9–10 | About doing the project, not about governance structure | Moved to Reading 4 |

**Added for reading order:** a short "Water and shared infrastructure" section. Every sentence in it restates material already in the atlas (§4 condition 3), the dossier (CASP water gaps) or the packet (authority table and the GLWA arrangement). It brings those points together because the reading plan asked for water authorities.

**Clarified from a verified source:** the GLWA description now says GLWA leases and operates Detroit's regional water and sewer facilities, while the Detroit Water and Sewerage Department keeps the city's local system and customers. The source said only that the arrangement "separates infrastructure ownership, regional system operation, and local customer relationships." The added detail comes from GLWA's *What we do* page.

### Reading 3

The case is kept whole: every section, table row, figure, date, citation and qualifier. Changes:

| Change | Reason |
|---|---|
| Title "Housing in East Detroit: Two governments, overlapping work" → "Housing: Two Models of Public Authority" | The old title contradicted the case's own point ("not between two competing governments"). New title per the publication plan. |
| Added "How to read this case": documented facts, reported findings, allegations and open investigations, questions for the class | The plan requires these distinctions to stay identifiable. Every row of the crisis table already carried them; the guide names them. |
| Detroit takeover chronology turned from one paragraph into a dated list | Plain language: the paragraph held four dates and a board rule |
| Bracketed references made into links to the source list (Word bookmarks, PDF links) | Clickable citations |
| "Federal constraints relevant to the older 'one-click housing' idea" → "Federal limits on 'one-click housing'", introduced as "An earlier proposal for East Detroit imagined one-click housing approvals" | Students have not seen the earlier proposal |
| §5 "Not assigned here: … Those are outside this research section" → "Not decided by this case: …" | Same list; plain wording |
| Table headings in §4 phrased as "City Housing Division could…" | Matches the source's conditional meaning ("could do") |

No evidence was cut. The H13 (OPB) and D12 and H14 (agency documents) sources remain in the reading list. As in the original, they are not cited for a specific claim.

### Reading 4

| Removed or merged | Reason | Where the meaning survives |
|---|---|---|
| Dossier §5 "three stages" and handout "Do three pieces of work" | Same A/B/C structure described twice | One section, "The three stages": each stage's purpose plus "Your work in this stage" |
| Dossier §7 (six questions) and packet §9 (five prompts) | Overlapping questions | One list of seven. Every distinct question is kept: own problem, household affected, powers here vs elsewhere, deal before launch, success and failure views (merged into items 1, 2, 3, 5 and 6). |
| Dossier "Do not pre-adopt these V2 inventions" and audit §2 list | Same list in two places, framed as version history | "Ideas from earlier drafts, open for debate". All items kept, including the audit-only items (school seats, income checks, library digital onboarding, 100% voucher uptake, uniform student assignment, "zero burden"). |
| References to `municipal_service_signup_and_decision_record_v3.md` | Students do not use the repository | "the class sign-up and decision record, which is distributed separately" |
| Handout: "rather than accepting the former ED-Core/ED-Wallet design" | Kept, with context | "You do not have to accept the ED-Core and ED-Wallet design from earlier drafts" |
| Audit §5 "Open" list | Used as the basis for "Open for the class" | Same items. The dossier's open items for the anchors and housing were added. |

## 4. Literal guard

Red Pen's `apply` command refuses an edit that removes the last occurrence of a number, date or URL. This edition reorganizes five documents into four, so the same rule was applied across the whole set with `checks/literal_guard.mjs`, which calls Red Pen's own `protectedLiterals` function. Current result (`checks/literal_guard_report.md`):

- **Source literals missing from the edition:** 10. Nine are abbreviated dates written out in full ("Oct. 26, 2026" → "October 26, 2026"). One is "25.0", written as "25 square miles".
- **Literals added by the edition:** 10. The publication dates in C5 and the written-out dates; "911" (the source said "E911"); "45.515" (the Michigan statute number, now shown in its link label).

The guard proves that literals survive. It does not prove meaning survives; that was checked by reading each reading against its sources.

## 5. Plain language checklist

Applied from the federal plain language checklist:

- **Audience and order.** Each reading opens with what it is and how to read it. Reading 1 comes before decisions; Reading 4 comes last.
- **Headings.** Real Word heading levels (Heading 1–3); question and statement headings in place of labels where useful ("Who holds authority", "What the city-county can and cannot require").
- **Lists and tables.** Long inline sequences became lists: the chronology in Reading 3, partner agreement terms, candidate services and earlier-draft ideas in Reading 4. Tables have captions and repeating header rows.
- **Active voice and familiar words.** For example, "procure" → "buy"; "provisional GeoIDs" → "provisional GIS records"; "E911" → "911"; "RTD" defined as the Regional Transportation District on first use.
- **Defined labels.** REAL REFERENCE, SCENARIO and OPEN are defined at the top of every reading.

Terms kept as they are because students will meet them in the sources: Moving to Work, Enterprise Income Verification, recertification, public housing authority, consolidated city-county.

## 6. For the instructor to review

1. The LinkNYC link (C3).
2. The four detroitmi.gov pages and Census QuickFacts, which could not be machine-checked (CITATION_CHECK.md).
3. Figure 1 is a new rendering of the V3 draft GeoJSON (boundary plus 20 label points, no basemap). The old concept PNG is marked superseded in the audit and was not used.
4. Whether the stakeholder role cards should go into the sign-up packet. They were left out of these four readings.

## 7. Instructor decisions, 11 November 2026

These are new scenario facts set by the instructor, not editorial changes. They are recorded in the master dossier, §8, and applied to the readings.

| Decision | Where applied |
|---|---|
| The assignment is to write a spec for a city-county version of Estonia's digital government | Reading 4 opening, stages, sign-up; dossier §8; V3 README |
| Each student owns one roster entry; the instructor speaks for unclaimed entries | Reading 4 "Choose what you will own"; Sign-up Sheet; Directory |
| Libraries become the independent East Detroit Public Library District | Readings 1, 2; Directory A-02; governance packet table |
| Fire Department becomes a separate city-county department | Readings 1, 2; Directory D-11 |
| East Detroit County Court, on the Denver County Court model (fictional enabling rule) | Reading 2; Directory A-07; governance packet table |
| East Detroit Health and Hospital Authority, on the Denver Health model, separate from the Health System | Readings 1, 2; Directory A-08, A-09; governance packet table |
| Roster: 15 departments, 8 always-represented outside agencies, 1 optional, 3 resident groups | Sign-up Sheet; Directory; Reading 4 Table 1; dossier §8 |
| Removed from the roster: neighboring governments, airport and FAA, employers and developers, metropolitan districts | Dossier §8. They remain in the real geography (Readings 1, 2). |
| Local outside agencies are fictional and sized for East Detroit; real bodies are models of institution type only | Directory; dossier §8 |

**Role cards superseded.** The Directory reuses the role cards' "wants / worries / can offer / likely refusal / must ask" content for entries that already existed. New for each entry: the records it holds and questions for the Estonia-style spec. These are framed as **OPEN** questions, not decisions. The sign-up record's section A now points to the Sign-up Sheet.

## 8. Second pass for AI-writing patterns, 11 November 2026

An independent review of all six documents found the set heavy with machine-writing habits. Fixed:

- **Bold:** about 460 bold spans outside source lists were cut to about 260. What remains is list run-ins, neighborhood and condition names, and the directory's field labels, which are kept for scanning.
- **Openers and labels:** five "how to read" openers became one ("Real, invented and undecided" in Reading 1). The labels are now defined once instead of five times. One reading roadmap (Reading 4) instead of two.
- **Refrain:** "may agree, set conditions or refuse" (about 20 uses) is now stated once in Reading 2 and once in the Directory. Slogans such as "A refusal changes the design; it does not remove…", "The underlying goal still stands", "The useful question is", "This history shows" and "real consequences to work through" were rewritten or cut.
- **Directory:** each entry went from nine fields to five. The 23 generic "Wants… Worried about…" lines became one specific pressure per entry, drawn only from scenario facts already in the readings (no new events were invented). The eight "*Always has an owner*" lines and the "…or nothing" endings on "Could offer" were removed. Resident groups were rewritten around their test households.
- **Reading 1:** the twenty neighborhood blurbs became short sentences instead of noun lists, using only the atlas descriptions. The repeated map disclaimer is kept in the figure caption only.
- **Reading 3:** figures are no longer bolded, and lesson-of-the-story sentences were cut. No evidence, figure, date or citation changed.
- **Consistency:** the "what to bring" list now lives only in Reading 4; the Sign-up Sheet points to it.

Cuts with content: Reading 1 dropped "not stereotypes or eligibility findings" from the household cases, and "Not every household benefits from aerospace investment." Reading 3 dropped "A housing benefit authorized on paper is different from a household actually receiving and using it" and the "Not decided by this case" list, which named student roles, sign-up and similar items that the Sign-up Sheet and Reading 4 now cover.

The literal guard still reports only the ten date and number formatting differences listed in section 4.

## 9. Third pass: Red Pen apply and plain language checklist, 11 November 2026

Every edit in this pass went through Red Pen Editor 0.2.1: `brief` for each document, then exact-span edits submitted to `red-pen-editor apply`, whose guard accepts or rejects each one. Every round's brief, proposed edits and apply output (with accepted and rejected edits and reasons) are in `checks/redpen/`. The checklist used is the archived federal plain language checklist (GSA, `plainlanguage.gov` repository; the live site now redirects to digital.gov).

| Document | Rounds | Accepted | Rejected | Facts released (allowLoss) | Words before | Words after | Cut |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1. Welcome to East Detroit | 4 | 124 | 0 | 0 | 2,692 | 2,347 | 13% |
| 2. How East Detroit Is Governed | 3 | 78 | 1 | 0 | 2,215 | 1,849 | 17% |
| 3. Housing | 6 | 121 | 0 | 0 | 3,705 | 3,279 | 11% |
| 4. Municipal Project Brief | 4 | 54 | 0 | 0 | 2,152 | 1,731 | 20% |
| 5. Sign-up Sheet | 1 | 3 | 0 | 0 | 361 | 341 | 6% |
| 6. Directory | 4 | 157 | 0 | 0 | 3,691 | 3,275 | 11% |
| **Total** | | **537** | **1** | **0** | **14,816** | **12,822** | **13%** |

Word counts include tables and source lists, which were not cut. Prose outside tables and sources fell further (for example, about 25% in Reading 2 and 17% in Reading 1's body). The one rejection was an overlapping edit to a table cell in Reading 2. Targets of 30 to 45% were set; editors stopped where further cuts would have removed facts, required list items or evidence qualifiers.

Main structural changes: Reading 4 now puts the assignment, the roster and "What to bring" first. Directory fields are fragments. Reading 3's section 5 open items became a list. Short sentences, "you", active voice and base verbs throughout.

**Checklist results** (met / partly / not met), from the editors' reports:

| Item | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Written for the average reader | met | met | met | met | met | met |
| Organized for the reader | partly | partly | partly | met | met | met |
| Useful headings | met | met | met | met | met | met |
| Uses "you" | partly | partly | partly | met | met | partly |
| Active voice | met | met | met | met | met | met |
| Short sections and sentences | mostly | met | partly | partly | met | met |
| Simple present | met | met | met | met | met | met |
| Base verbs | met | met | met | met | met | met |
| Omits excess words | met | met | met | mostly | met | partly |
| Concrete, familiar words | met | met | met | partly | met | met |
| "Must", not "shall" | met | met | met | met | met | met |
| Words placed carefully | met | met | met | met | met | met |
| Lists and tables | met | met | met | met | met | met |
| Two or three levels at most | met | met | met | met | met | met |

"Partly" items are mostly in descriptive readings (1, 2, 3), where "you" fits poorly, and in evidence lists in Reading 3, where 23 of 106 sentences stay over 20 words. Reading 4 keeps the terms MOU, GIS and "land-value mechanisms".

**Guard results after the pass:** the cross-document literal guard reports the same ten formatting differences as before (section 4). Reading 3's YAML header and Sources are byte-identical to the previous version, and its qualifiers ("reported", "management said", "not a finding of misconduct", "not proof") appear as often as before.
