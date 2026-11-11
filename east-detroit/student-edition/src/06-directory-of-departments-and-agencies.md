---
title: "Directory of Departments and Agencies"
subtitle: "Find your area of responsibility in East Detroit's digital government spec"
author: "Public Mechanics"
date: "Student edition, November 2026"
lang: en-US
---

# How to use this directory

The class is writing a specification for a city-county version of Estonia's digital government. Every part of that spec belongs to someone. This directory lists the 27 departments, agencies and resident groups that will own it, and what each one is responsible for.

1. Use **Find your area** below to see which entries match the topics you care about.
2. Read those entries and pick one.
3. Claim it on the **Sign-up Sheet**. One person per entry.

There are more entries than students. **The instructor speaks for every entry nobody claims**, so every department and agency is represented, whoever plays it.

**Three kinds of entry:**

- **City-county departments (D-01 to D-15).** Part of East Detroit's government. They must take part in the spec. They can still object, set conditions and say what they cannot do.
- **Outside agencies (A-01 to A-09).** Independent bodies with their own boards, budgets and records. They may join the system, join on conditions, or refuse. A-01 to A-08 always have an owner (a student or the instructor); A-09 is optional.
- **Resident groups (R-01 to R-03).** Organized residents. They do not run services, but they test whether the system works for the people it is meant to serve.

All East Detroit departments, agencies and groups are **SCENARIO**. Where an entry draws on a real model (for example, Denver's county court), it says so. Every design choice for the spec is **OPEN**.

# What "a city-county Estonia" means here

Estonia's government agencies exchange data through a shared layer called **X-tee** (formerly X-Road in English). As Estonia's Information System Authority describes it:

- Each member organization keeps its own records. It describes the data it is willing to share, and other members use that data **under an agreement**.
- The owner controls its data throughout. The exchange layer only carries the messages securely.
- Exchanges are authenticated, authorized at several levels, encrypted, signed and logged.
- To use a service, an organization becomes a member, installs a security server, and makes an agreement with the organization providing the data.

So for every entry in this directory, the spec has to answer the same core questions:

- **What records does this body hold** that others need?
- **What does it need** from others to do its job?
- **Will it join**, and on what terms?
- **Who corrects a wrong record**, and where does a resident appeal?

An entry's "Questions for the spec" are where to start. They are **OPEN**: you decide the answers, or you negotiate them.

# Find your area

| If you care about… | Look at |
|---|---|
| Housing, rent, eviction, homelessness | D-05, A-06, A-07, D-04, R-01 |
| Addresses, maps, parcels, records that don't match | D-07, D-08, D-06, R-02 |
| Benefits, food and cash assistance, appeals | D-04, A-05, D-15 |
| Schools, children and families | A-01, D-07, D-04 |
| Health care, hospitals, ambulances | A-08, A-09, D-12, D-11 |
| Emergencies, 911, police, fire | D-10, D-11, D-07, A-08 |
| Transit, roads, getting around | A-04, D-14, R-03 |
| Water, sewer, growth, land use | A-03, D-06, D-14, R-02 |
| Courts, legal process, protection orders | A-07, D-15, D-05 |
| Libraries, internet access, help for people without phones | A-02, D-13, R-03 |
| Money, budgets, taxes, buying technology | D-08, D-02, D-03 |
| Running the exchange system itself, privacy, security | D-09, D-15, D-03 |
| Politics, priorities, final approval | D-01, D-02, D-03 |
| Fairness, language access, disability access | D-15, R-03, R-01 |

: Table 1. Topics and the entries that own them

| Test household (Reading 1) | Entries most involved |
|---|---|
| H01: renters in Colfax East; hourly schedule changes weekly | D-04, D-05, D-09, A-05, R-01 |
| H02: retired homeowner in Old Watkins; rural address doesn't match GIS | D-07, D-08, D-15, R-02 |
| H03: three-generation household in Box Elder; prefers Spanish | D-15, D-04, A-02, R-03 |
| H04: shift worker in Portside; shuttle ends before the last shift | A-04, D-14, R-03 |
| H05: single parent in West Commons; two children, two schools | A-01, D-07, D-04 |
| H06: business owner in South Yards; address and parcel don't match | D-06, D-07, D-08 |

: Table 2. Test households and the entries they involve

# City-county departments

These must take part. Each entry's owner speaks for the department in class.

## D-01 Mayor / County Executive's Office

**Runs:** the political agenda, direction of the administration, and interpretation of the charter. Appoints the boards of the Health and Hospital Authority (A-08) and the judges of the County Court (A-07) from merit lists.

**Records:** executive orders, appointments, policy directives.

**Can do alone:** coordinate departments within adopted rules.

**Cannot do alone:** make an outside agency join; spend money the council has not approved.

**Pressures:** wants a visible achievement without losing public trust. Worried about concentrating power, a failed public launch and financial exposure.

**Questions for the spec:** Who approves the system and who can stop it? Who answers publicly when it fails?

**Work with:** D-02, D-03, D-09, every outside agency.

**Read:** Reading 2 (who holds authority); Reading 4 (governance decisions).

## D-02 City-County Council and Budget Committee

**Runs:** appropriations, ordinances, public hearings and oversight.

**Records:** ordinances, budgets, hearing records.

**Can do alone:** pass ordinances and budgets, after lawful process.

**Pressures:** wants real neighborhood representation. Worried about financial surprises, uneven services between neighborhoods, and unchecked executive power.

**Questions for the spec:** Who pays the recurring costs, and who benefits? What should the law require the system to do, and what should it forbid?

**Work with:** D-01, D-03, D-08, D-15.

**Read:** Reading 1 (neighborhood figures); Reading 2; Reading 4 (money and incentives).

## D-03 City Manager / Administration

**Runs:** day-to-day administration, staffing and performance tracking across departments.

**Can do alone:** assign staff and coordinate departments, within its authority.

**Pressures:** wants clear ownership of delivery and workable staffing. Worried about many systems with no one operating them.

**Questions for the spec:** Who runs the exchange layer day to day? Who operates it after launch, and who takes over if a vendor fails?

**Work with:** D-01, D-08, D-09, all departments.

**Read:** Reading 4 (ownership and operations).

## D-04 Human Services

**Runs:** county administration of state-supervised benefits, such as food and cash assistance; local intake.

**Records:** case files and applications, held under state and federal rules.

**Can do alone:** design local intake and casework processes.

**Cannot do alone:** change state or federal eligibility rules, or open the state's records to others.

**Pressures:** wants dependable service and decisions it can defend. Worried that the class will confuse county administration with power to rewrite benefits.

**Questions for the spec:** Which facts could the county verify through the exchange instead of asking the resident again? Who decides eligibility and appeals when records conflict?

**Work with:** A-05, D-05, D-07, D-15, R-01.

**Read:** Reading 1 (conditions 1, 2, 6; households H01, H03, H05); Reading 2 (county-administered benefits).

## D-05 Housing Division (EDHD)

**Runs:** city-funded rent and homelessness-prevention assistance; housing policy; financing for housing development and preservation; local tenant and homeowner services.

**Records:** local assistance cases, housing finance agreements.

**Can do alone:** run municipal programs that have legal authority and council funding.

**Cannot do alone:** commit the Regional Housing Authority's vouchers, properties, staff or records.

**Pressures:** wants to prevent displacement and coordinate help without repeating paperwork. Worried about gaps between local help and federal programs, unfunded promises, and confusing referrals.

**Questions for the spec:** Which overlaps with the Housing Authority are coordination problems, and which need separate authority? What would it ask the County Court for when a household faces eviction?

**Work with:** A-06, A-07, D-04, D-07, R-01.

**Neighborhoods:** Colfax East and South Yards (high renter cost burden), Box Elder, Central Station.

**Read:** Reading 3 (all); Reading 1 (condition 1; household H01).

## D-06 Planning, Building and Land Use

**Runs:** plans, zoning, permits and building review.

**Records:** permits, plans, zoning decisions.

**Can do alone:** propose plans and zoning for adoption; issue permits under adopted rules.

**Pressures:** wants predictable permit rules, real water capacity and protected airport approaches. Worried about density approved on restricted land.

**Questions for the spec:** Can a permit proceed while an address or parcel record is being corrected? What does it need from the Water and Sewer Authority before approving new housing?

**Work with:** D-07, D-08, A-03, D-14, R-02.

**Neighborhoods:** Manila and High Prairie (rapid growth), Harback (annexation disputes), Box Elder (floodplain), South Yards.

**Read:** Reading 1 (real geography; conditions 3, 5, 9; household H06).

## D-07 Address Office and GIS

**Runs:** the official address and parcel map; corrections to addresses and service boundaries.

**Records:** the city-county's address and parcel registry. In an Estonia-style system, this is likely one of the most-used registries.

**Can do alone:** maintain and correct municipal address records.

**Cannot do alone:** change postal, school, utility or court addresses held by others.

**Pressures:** wants one accountable process for correcting addresses. Worried about errors from fast subdivision, and about postal, tax, 911 and school addresses that don't match.

**Questions for the spec:** Which body is the authoritative source for an address? What happens while a record is disputed? Who is told when an address is corrected?

**Work with:** D-06, D-08, D-10, A-01, A-03, R-02.

**Neighborhoods:** Old Watkins (rural addresses), Inboden (new subdivisions), South Yards.

**Read:** Reading 1 (condition 2; households H02, H05, H06).

## D-08 Finance, Tax, Assessor and Procurement

**Runs:** revenue, property assessment and tax rolls, purchasing.

**Records:** tax rolls, property assessments, contracts.

**Can do alone:** compare costs and set purchasing procedures for approval.

**Pressures:** wants consistent revenue assumptions and transparent costs. Worried about unfunded operating costs and fees invented as if they were law.

**Questions for the spec:** What does the city build, buy or rent, and what does it own? How could it leave a vendor? What does the system cost each year to run?

**Work with:** D-02, D-03, D-07, D-09.

**Read:** Reading 2 (other institutional models); Reading 4 (money and incentives).

## D-09 Digital Service and Records

**Runs:** the city-county's technology and digital services; records management.

**Records:** system logs, technical documentation, records schedules.

**Can do alone:** propose system designs and run implementation tests.

**Pressures:** wants services that can be maintained, with accountable use of information and accessible support. Worried about records being joined automatically, vendor lock-in, and assuming every resident has a phone.

**Questions for the spec:** Who operates the exchange layer: this department, a new authority, or a contractor? What does a member need to join? What gets logged, and who can see the logs?

**Work with:** D-03, D-08, D-15, every outside agency.

**Read:** Reading 2 (other institutional models, especially X-tee and Athumi); Reading 4 (information).

## D-10 Police, 911 and Emergency Management

**Runs:** police, 911 dispatch, and emergency planning and response.

**Records:** 911 call records, incident reports, emergency plans.

**Can do alone:** set dispatch and emergency requirements.

**Pressures:** wants accurate emergency locations and dispatch that keeps working. Worried about private medical data and gate codes flowing without authority, and about poor coverage in remote areas.

**Questions for the spec:** What must still work when the exchange is down or a partner refuses? What may dispatch see, and for how long?

**Work with:** D-07, D-11, A-08, A-09.

**Neighborhoods:** Harback and the north and east (long distances).

**Read:** Reading 1 (condition 7).

## D-11 Fire Department

**Runs:** fire suppression, rescue and medical first response across the city-county.

**Records:** incident and inspection records; patient care records from first response.

**Can do alone:** set fire and first-response operations and inspection requirements.

**Pressures:** wants accurate addresses and building information on the way to a call. Worried about long response distances in low-density areas.

**Questions for the spec:** Who runs ambulance transport: the Fire Department or the Health and Hospital Authority? That is **OPEN**. How does a patient record pass from first response to the hospital?

**Work with:** D-10, D-07, D-06, A-08.

**Neighborhoods:** Harback, Northfield and High Prairie (low density); South Yards (industrial sites).

**Read:** Reading 1 (condition 7).

## D-12 Public Health

**Runs:** population health programs and public health surveillance.

**Records:** disease reports and public health program records.

**Can do alone:** run municipal population-health programs.

**Pressures:** wants better access to care and privacy-protected tracking of real public health threats. Worried about hospital independence, clinical confidentiality and residents' unmet transportation needs.

**Questions for the spec:** What may hospitals report to Public Health, for what purpose, and how is it protected?

**Work with:** A-08, A-09, D-04, D-10.

**Read:** Reading 1 (condition 7).

## D-13 Parks, Recreation and Cultural Affairs

**Runs:** parks, recreation programs, and the city's role with cultural venues (The Hangar, Aerotropolis Park, EDPAC).

**Records:** program registrations, facility bookings.

**Can do alone:** propose programs and operating needs for the budget.

**Pressures:** wants access in both wealthier and poorer neighborhoods, in person as well as online. Worried that facilities cluster downtown, and that staff will be turned into an unpaid help desk.

**Questions for the spec:** Is recreation access a good first service, given the disputed-address example in the class decision record? What should a resident need to prove to register?

**Work with:** A-02, D-07, D-14.

**Read:** Reading 1 (civic and cultural anchors).

## D-14 Transportation and Public Works

**Runs:** city streets, local mobility programs, snow and storm response, drainage.

**Records:** street and asset inventories, work orders.

**Can do alone:** operate city streets and locally authorized mobility programs.

**Cannot do alone:** run RTD routes or change RTD fares.

**Pressures:** wants safe roads, practical bus links, and access for shift workers and big events. Worried about treating the scenario's rail hub as if RTD had agreed to anything.

**Questions for the spec:** What can the city offer residents if RTD shares only public timetables?

**Work with:** A-04, D-06, D-13, R-03.

**Neighborhoods:** Portside and the north and east (infrequent service); Box Elder (drainage crossings).

**Read:** Reading 1 (conditions 4, 9; household H04); Reading 4 (regional transit example).

## D-15 Clerk, Civil Rights and Appeals

**Runs:** public records, language and disability accommodation, complaints, and appeal routes.

**Records:** public records requests, complaints, appeals.

**Can do alone:** propose process standards and recordkeeping rules.

**Pressures:** wants lawful process and accessible services. Worried about automated decisions with no appeal, and decisions made without recorded authority.

**Questions for the spec:** Where does a resident go when the system says no? Can residents see who looked at their records? Who fixes a wrong record that came from another agency?

**Work with:** D-04, D-09, A-07, R-01, R-03.

**Read:** Reading 2 (what the city-county can and cannot require); Reading 4 (information).

# Outside agencies

A refusal by an outside agency changes the design; it does not remove the agency from the spec.

## A-01 East Detroit Unified School District

*Always has an owner.*

**What it is:** the public school district serving East Detroit, governed by its own elected board.

**Runs:** schools, enrollment, attendance boundaries, school transportation.

**Records:** student records, enrollment, transportation routes.

**Pressures:** wants enough capacity, accurate enrollment, school transportation and student privacy. Worried about the city overriding the elected board, unfunded cooperation, and exposure of student data.

**Could offer:** a limited enrollment referral, an address-check agreement, coordination funding, or nothing.

**Likely refusal:** no access to student files and no automatic placement.

**Questions for the spec:** Fixed referral information, a shared address check, or a separate district process?

**Work with:** D-07, D-04, D-14.

**Neighborhoods:** West Commons (school crowding), Prairie Crossing (high school enrollment), Inboden (school access), Quail Run (childcare shortages).

**Read:** Reading 1 (condition 8; household H05); Reading 4 (school example).

## A-02 East Detroit Public Library District

*Always has an owner.*

**What it is:** an independent library district with its own board and its own property tax levy. Colorado allows library districts to be governed separately from the city or county. Reading 2 describes a real example, the Boulder Public Library District.

**Runs:** branch libraries, public computers and internet access, in-person help, programs.

**Records:** library accounts and borrowing records.

**Pressures:** wants to help residents who have no phone, no home internet or little confidence online. Worried about staff becoming an unpaid help desk for city systems, and about library records being shared.

**Could offer:** in-person help with city services, public computers, staff training, or none of these if unfunded.

**Questions for the spec:** Is the library a place to get help using the system, or a member of the system? Who pays for the help desk?

**Work with:** D-13, D-15, D-09, R-03.

**Read:** Reading 1 (condition 10; household H03); Reading 2 (Boulder Public Library District).

## A-03 East Detroit Water and Sewer Authority

*Always has an owner.*

**What it is:** the public authority that supplies water and treats wastewater in East Detroit, with its own board, rates and debt. Detroit's split between a regional water authority and the city's own department (Reading 2) is a comparison.

**Runs:** water supply and sewer service, connections, billing.

**Records:** customer accounts, service addresses, capacity commitments.

**Pressures:** wants reliable water, capital contributions and enforceable capacity plans. Worried about housing approved without secured supply, and about debt and water rights.

**Could offer:** phased capacity commitments, shared account and address data, or no new connections until infrastructure is funded.

**Questions for the spec:** Is a water account proof of residence? (Reading 1 says an account alone is not.) Should the authority's service addresses be checked against the city's registry?

**Work with:** D-06, D-07, D-08, D-14.

**Neighborhoods:** Harback (wells, septic conversion), Box Elder (flood-prone), Manila and High Prairie (growth).

**Read:** Reading 1 (conditions 2, 3); Reading 2 (water and shared infrastructure).

## A-04 Regional Transportation District (RTD)

*Always has an owner. REAL REFERENCE: RTD is the real Denver-area transit authority.*

**Runs:** regional buses and rail, fares, schedules.

**Records:** fare accounts, ridership, schedules.

**Pressures:** wants reliable operations and fair service contracts. Worried about unapproved fare discounts, mobility credits and system integrations.

**Could offer:** public schedules, a formal service agreement, a tested pilot, or a refusal.

**Likely refusal:** will not connect fare records to a city account.

**Questions for the spec:** What useful service is left without an RTD connection?

**Work with:** D-14, D-13, R-03.

**Neighborhoods:** Portside (shift work), Central Station (transfer hub), north and east (infrequent service).

**Read:** Reading 1 (condition 4; household H04); Reading 4 (regional transit example).

## A-05 State of Colorado Human Services and State IT

*Always has an owner. REAL REFERENCE: Colorado's state-supervised, county-administered benefits system.*

**Runs:** state oversight of benefit programs and the state systems that hold benefit records.

**Records:** statewide eligibility and case records.

**Pressures:** wants compliance, careful data stewardship and accurate benefits. Worried about altered eligibility rules, local duplication and unsanctioned access to state systems.

**Could offer:** a test environment, an approved interface, a waiver only if authorized, or no integration.

**Likely refusal:** no direct access to program data.

**Questions for the spec:** Which state data could East Detroit ask for through the exchange, and under what agreement? How are appeals protected?

**Work with:** D-04, D-09, D-15.

**Read:** Reading 2 (county-administered benefits; rules for the simulation).

## A-06 East Detroit Regional Housing Authority (EDRHA)

*Always has an owner.*

**What it is:** an independent public housing authority with its own commission, serving East Detroit and participating communities beyond it.

**Runs:** federal housing assistance (including vouchers), its own properties, its own appeals.

**Records:** voucher and tenancy records; federal income verification under HUD rules.

**Pressures:** wants stable occupancy, timely help for residents and sound finances. Worried about city promises that exceed federal voucher capacity, unfunded referrals, sharing restricted information, and shifting costs to its tenants.

**Could offer:** a negotiated intake or referral arrangement, limited status checks where permitted, partnership funding, or none of these.

**Likely refusal:** transferring federal records, blanket reuse of its data, or a workflow the city dictates.

**Questions for the spec:** Name one real handoff with the Housing Division, and who funds, authorizes, delivers and reviews it.

**Work with:** D-05, A-07, D-04, R-01.

**Read:** Reading 3 (all).

## A-07 East Detroit County Court

*Always has an owner.*

**What it is:** the city-county's own trial court for smaller matters. It is modeled on Denver's county court, which Denver funds and whose judges the mayor appoints from merit lists, and which sits outside Colorado's state court system. In Colorado only Denver has this arrangement, so East Detroit's version is a **fictional enabling rule** in its founding amendment. Larger cases (felonies, family and probate) stay with an ordinary state district court.

**Runs:** evictions, small claims, civil cases up to \$25,000, misdemeanors, traffic, protection orders, and violations of city ordinances.

**Records:** case filings, case status, judgments, protection orders.

**Pressures:** the city pays for it, but its judges decide independently, and it controls its own case records. Wants a manageable docket and fair process. Worried about the city reaching into judicial decisions or records.

**Could offer:** case status to the parties or their advocates, notice to the Housing Division when an eviction is filed, or no connection.

**Questions for the spec:** Should an eviction filing trigger an offer of help? Who may see protection orders, and when? Remember from Reading 3 that an automated referral cannot stop a court case.

**Work with:** D-05, A-06, D-15, D-10, R-01.

**Read:** Reading 2 (the county court); Reading 3 (federal limits on "one-click housing").

## A-08 East Detroit Health and Hospital Authority

*Always has an owner.*

**What it is:** the city-county's public safety-net hospital, run as an independent public authority with a board appointed by the mayor. It is modeled on Denver Health, which became a separate public authority under Colorado law in 1997.

**Runs:** the public hospital and clinics; care for uninsured and low-income patients; a paramedic service (whether it or the Fire Department runs ambulance transport is **OPEN**).

**Records:** patient records, held under medical privacy law.

**Pressures:** wants patients connected to coverage and follow-up care. Worried about clinical data-sharing, liability, and paying for care the system routes to it.

**Could offer:** referrals, insurance and benefits screening help, emergency protocols, or no integration.

**Likely refusal:** patient records stay in hospital systems.

**Questions for the spec:** When may the city ask for clinical information, and what may it never see? How do 911, first response and the hospital hand off a patient?

**Work with:** D-10, D-11, D-12, D-04, A-09.

**Read:** Reading 1 (condition 7); Reading 2 (the hospital authority).

## A-09 East Detroit Health System

*Optional. Taken only if a student claims it.*

**What it is:** the independent health system already in the scenario: a Level I regional trauma center, aerospace flight medicine and a teaching hospital.

**Runs:** trauma care, specialty care, teaching.

**Records:** patient records, held under medical privacy law.

**Pressures:** wants emergency access and reliable referrals. Worried about clinical data-sharing and liability from automatic emergency access.

**Likely refusal:** patient records stay in hospital systems.

**Questions for the spec:** Does a second hospital system join the same exchange on the same terms as the public authority?

**Work with:** A-08, D-10, D-11, D-12.

**Read:** Reading 1 (civic and cultural anchors; condition 7).

# Resident groups

Resident groups do not run services. They test the spec and can be given a formal role in governing it if the city-county grants one.

## R-01 Renter and Tenant Advocacy Council

**Wants:** access to housing help, fair rent and clear appeals.

**Worried about:** tools that require tax records, being left out of planning, and automatic denials.

**Brings:** cases from lived experience. Can take part in governance if formally granted a role.

**Ask the spec:** Who is missing when a service is designed for a digitally confident homeowner?

**Work with:** D-05, A-06, A-07, D-15.

**Read:** Reading 3; Reading 1 (household H01).

## R-02 Old Watkins and Agricultural Landholders Alliance

**Wants:** valid rural addresses, drainage protection, and keeping local businesses and farm history.

**Worried about:** displacement and a downtown-centered expansion.

**Brings:** knowledge of local roads and parcels.

**Ask the spec:** Who bears the costs of converting land, and who can appeal the maps?

**Work with:** D-07, D-06, D-14, A-03.

**Read:** Reading 1 (conditions 2, 9; household H02).

## R-03 Workers and Disability Access Coalition

**Wants:** services that work for shift workers, residents with disabilities, people without a phone, and speakers of languages other than English.

**Worried about:** online-only launches and unrealistic office hours.

**Brings:** test cases and evaluation.

**Ask the spec:** What must work without a smartphone or a same-day appointment?

**Work with:** D-15, A-02, A-04, D-14.

**Read:** Reading 1 (condition 10; households H03, H04).

# Source

Estonian Information System Authority, [Data exchange layer X-tee](https://www.ria.ee/en/state-information-system/data-exchange-platforms/data-exchange-layer-x-tee). https://www.ria.ee/en/state-information-system/data-exchange-platforms/data-exchange-layer-x-tee

Sources for the county court, hospital authority and library district models are listed in Reading 2.
