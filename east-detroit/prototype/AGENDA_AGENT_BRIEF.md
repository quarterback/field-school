# Brief for agenda agent — East Detroit Public Mechanics simulation
**Date of meeting:** Tuesday 17 November 2026
**Format:** Two-hour Zoom seminar, one shared room from beginning to end
**Task:** Produce a practical run-of-show for the instructor. Do not develop the app or assign student roles.

You are developing a facilitator agenda for a University of Michigan Public Mechanics class. The instructor created the fictional **City and County of East Detroit, Colorado** and its public institutions to study how government services are authorized, funded, organized, contracted, operated and changed. Students have already claimed many department and agency roles. The instructor will act as **both the mayor/county executive** and **the software vendor** showing a proposed live web tool.

The objective of this session is to have participants establish **what information an agency controls, what it would share and under what conditions, what questions or objections it has, and how those answers change a proposed shared digital government service**. This is a live commissioning and discovery meeting. The instructor wants students' institutional judgment to shape what gets built. Make it engaging and productive without treating procedural realism or formal parliamentary roleplay as the goal.

## City and project facts — do not reinvent

- East Detroit is a **consolidated city-county** located east of Denver International Airport. The scenario is set in **2030**, after rapid development in a Phoenix-like growth corridor.
- Population **382,417**, **20 named neighborhoods**, **115.4 square miles**, existing postal references **80137 / 80102 / 80018 / 80019**.
- The city's responsibilities include both city services and county-level duties, including administration of state-supervised human services. Colorado rules provide the primary setting; Michigan local-government and Detroit/Great Lakes Water Authority precedents provide governance comparisons.
- The class's overarching assignment is to specify a **city-county version of Estonia's digital government**, particularly the idea of a secure, authorized exchange layer resembling X-tee. Agencies retain their records and decisions. There is no already-authorized universal identity, ED-Wallet, blanket data-sharing agreement or deployed AI decision system.
- The current authoritative roster is in the master dossier §8: **15 municipal departments (D-01 to D-15)**, **eight required outside/independent agencies (A-01 to A-08)**, **one optional outside agency (A-09)** and **three community groups (R-01 to R-03)**. Students have chosen various roles; the instructor speaks for unclaimed roles. The older role-cards file was superseded.
- Municipal departments must participate in the planning process but can challenge the mayor and vendor on what is practical or authorized. Independent organizations, including the school district, library district, water authority, Regional Housing Authority, RTD, court and hospital authority, may agree, state conditions or decline. A refusal is valuable information; it is not failure of the exercise.
- The **City Housing Division** and the separately governed **East Detroit Regional Housing Authority** coexist and serve overlapping populations. Real comparative research on Detroit's Housing Commission and Portland's Home Forward is in the repo. Their institutional arrangement is fixed by the instructor.
- Additional research material includes **New York's November 2026 Click to Renew** state professional-license service and its Colorado **county retail-food license renewal** analogue; and the 2026 **Aurora/Denver data-center zoning and oversight disputes**. They illustrate relevant agency responsibilities but are **not separate required assignments**.
- The instructor is arranging a first working **web prototype** deployable through GitHub to Vercel or Cloudflare. It has a distinct chromatic editorial presentation and uses Helsinki Design System components. The proposed demonstration focuses on a disputed Inboden address / recreation eligibility, a municipal housing referral to an independent housing authority, and an existing restaurant's license renewal. The UI should expose which agency holds information, who can approve sharing, and the effect of a refusal or exception. The actual application may be incomplete on the day.

## Source links to use, not summarize as guesswork

- Master scenario and roster: https://github.com/quarterback/field-school/blob/main/east-detroit/v3/master_project_dossier_v3.md
- Existing teaching task: https://github.com/quarterback/field-school/blob/main/east-detroit/v3/before_the_municipal_service_build_v3.md
- Departments and records: https://github.com/quarterback/field-school/blob/main/east-detroit/student-edition/src/03-city-department-reference.md
- Independent agencies: https://github.com/quarterback/field-school/blob/main/east-detroit/student-edition/src/04-independent-agency-reference.md
- Housing case: https://github.com/quarterback/field-school/blob/main/east-detroit/v3/housing_authority_case_home_forward_vs_detroit.md
- Student reading index: https://github.com/quarterback/field-school/tree/main/east-detroit/student-edition
- Decision record: https://github.com/quarterback/field-school/blob/main/east-detroit/v3/municipal_service_signup_and_decision_record_v3.md
- Web prototype specification: https://github.com/quarterback/field-school/blob/main/east-detroit/prototype/DESIGN_SPEC.md

Read the linked documents before finalizing. Preserve named institutional roles and boundaries.

## Firm meeting constraints

1. **ONE Zoom meeting room for the whole two hours. Absolutely no breakout rooms.** Participants speak in a continuous plenary with the mayor and vendor.
2. No faux Model UN votes, procedure-heavy roleplay, invented legislative debate or ceremonial introductions. The instructor used "Model UN" only as a loose picture of students speaking from an assigned institutional position.
3. It must work if students arrive **cold**, having read none of the materials. Use a five-to-ten-minute briefing that gives enough city facts, role distinctions and examples to participate immediately. Existing assignments stand; late/unassigned students can pick unclaimed roles quickly.
4. Students must be able to challenge the vendor's assumptions and the mayor's requests, and identify information they control, need, would refuse to provide, or do not know they are authorized to share.
5. A mayoral question to a department is a demand for an informed position, **not** proof that the mayor can approve another agency's disclosure. Municipal and independent responsibilities differ.
6. The meeting should lead to **specific, recorded outcomes**: exchange request, source, recipient, fields, purpose, authorizing actor, conditions/refusal, effect on workflow, unresolved question, owner/next step.
7. Avoid asking every participant to give the same long presentation. Keep most of the time for focused conversation around a working example, with short targeted turns from relevant departments.
8. The instructor will be screen sharing a prototype, switching roles between "vendor demonstrating proposed behavior" and "mayor asking agencies to define boundaries." Make that switch easy to understand, preferably through explicit on-screen or spoken cue.
9. Leave room for live corrections, surprising objections and students changing an earlier statement. Do not force every question into a predetermined answer.
10. No new student assignment, policy adoption, software platform, data exchange or procurement decision is implied by the agenda itself.
11. Include a contingency plan if the web app fails to deploy, freezes, or only two cases work. The room must still be able to discuss a static screenshot, case walkthrough or a simple decision table.
12. The instructor has **two hours**. A five-minute break in the same Zoom room is fine, but no required breakouts.

## Deliverables I need from you

A. **Minute-by-minute two-hour agenda**, with purpose, who speaks, what is displayed, and what artifact/output comes from each segment. A good agenda should give the prototype time early, then let agencies question the assumptions, rather than spend an hour on background lectures. Do not allocate elaborate presentation slots to all 27 roster entries.

B. **One-screen cold-start briefing**: the few essential city facts and role rules for people who read nothing beforehand. This can be read aloud in two minutes.

C. **Short mayor/vendor facilitation script**: the opening charge, how the instructor switches roles, how to stop the demonstration when a cross-agency assumption appears, how to ask for concrete field-level responses, and how to prevent vague discussion.

D. **A lightweight, fillable live decision table** for screen share: case/request, agency keeping the record, requesting agency, facts/fields, answer, conditions/concerns, workflow consequence, action owner. Provide a sample row explicitly identified as illustrative, not adopted policy.

E. **Participation method in one room**: ways to bring in quiet, unprepared or unassigned students without rapid-fire rote reports. Include simple Zoom chat conventions, hand-raising and targeted follow-ups; do not depend on polls, rooms or complicated external collaboration.

F. **Two fallback plans**: first if the prototype works but the discussion stalls; second if the app is unavailable. Ensure the session still produces a usable record.

G. **End-of-meeting output**: what the instructor should have ready for the next coding pass and which unresolved choices should be visibly left open.

## Editorial requirements

Use the U.S. Federal Plain Language Guidelines and the user's Red Pen Editor approach. Write in direct, plain language, using concrete agency and record examples. Avoid "stakeholder alignment," generic facilitation clichés, and excessive prep instructions. Do not add scope or claim decisions have been made. The result should be usable from a single screen during Zoom.
