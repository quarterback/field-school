---
title: "Directory of Departments and Agencies"
subtitle: "Find your area of responsibility in East Detroit's digital government spec"
author: "Public Mechanics"
date: "Student edition, November 2026"
lang: en-US
---

# The 27 entries

Claim one entry on the Sign-up Sheet. The instructor plays every unclaimed entry.

- **D-01 to D-15**: city-county departments. Must take part; can object and set conditions.
- **A-01 to A-09**: outside agencies with their own boards, budgets and records. Can join, join on conditions, or refuse. A-09 is optional.
- **R-01 to R-03**: resident groups. Run no services; test whether the system works for residents.

# The Estonia model

Estonia's agencies share data through X-tee (formerly X-Road in English). According to Estonia's Information System Authority:

- Each member keeps its records, describes what it will share, and lets others use it under an agreement.
- The owner controls its data throughout; the exchange layer only carries messages.
- Every exchange is authenticated, authorized at several levels, encrypted, signed and logged.
- To use another member's data: join, install a security server, and sign an agreement with that member.

Every entry answers four spec questions:

1. What records does it hold that others need?
2. What does it need from others?
3. Will it join, and on what terms?
4. Who corrects a wrong record, and where does a resident appeal?

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
| Running the exchange itself, privacy, security | D-09, D-15, D-03 |
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

## D-01 Mayor / County Executive's Office

**Runs and holds:** agenda, executive orders, appointments, including County Court judges (A-07) and the Health and Hospital Authority board (A-08).

**Limits:** directs departments within adopted rules. Can't force outside agencies to join or spend money the council hasn't approved.

**Pressure:** its name is on the launch. It appoints the court's judges and the hospital's board, so any request to either can look like an order.

**Questions for the spec:** Who approves the system? Who can shut it down? Who answers publicly when it fails?

**Works with:** D-02, D-03, D-09 and every outside agency. **Start with:** Reading 2; Reading 4 (governance decisions).

## D-02 City-County Council and Budget Committee

**Runs and holds:** ordinances, budgets, hearings and their records.

**Limits:** passes laws and budgets after public process.

**Pressure:** no money approved. Members represent neighborhoods from High Prairie (median household income \$151,200) to Colfax East (\$58,900).

**Questions for the spec:** Who pays the yearly running cost, and who benefits? What should the ordinance require and forbid?

**Works with:** D-01, D-03, D-08, D-15. **Start with:** Reading 1 (Table 3); Reading 4 (money and incentives).

## D-03 City Manager / Administration

**Runs and holds:** day-to-day administration, staffing, cross-department performance tracking.

**Limits:** assigns staff, coordinates departments. Can't create unfunded positions.

**Pressure:** a system nobody is assigned to operate lands here.

**Questions for the spec:** Who runs the exchange day to day? Who takes over if a vendor fails?

**Works with:** D-01, D-08, D-09 and all departments. **Start with:** Reading 4 (ownership and operations).

## D-04 Human Services

**Runs and holds:** county administration of state-supervised benefits (food, cash assistance); case files under state and federal rules.

**Limits:** designs local intake and casework. Can't change state or federal eligibility rules or open state records.

**Pressure:** "simplify benefits" must still follow state rules and protect appeal rights.

**Questions for the spec:** Which facts could the county check through the exchange instead of re-asking? Who decides when records disagree?

**Works with:** A-05, D-05, D-07, D-15, R-01. **Start with:** Reading 1 (conditions 1, 2 and 6; households H01, H03, H05); Reading 2 (county-administered benefits).

## D-05 Housing Division (EDHD)

**Runs and holds:** city-funded rent and homelessness-prevention help, housing policy, development and preservation finance, tenant and homeowner services; local assistance cases, housing finance agreements.

**Limits:** runs city programs with legal authority and council funding. Can't commit the Regional Housing Authority's vouchers, properties, staff or records.

**Pressure:** residents ask it for help the Housing Authority controls. Its rent help is a limited city grant; it can't promise a federal voucher.

**Questions for the spec:** Which Housing Authority overlaps need coordination, and which need separate authority? What does it want from the County Court at eviction?

**Works with:** A-06, A-07, D-04, D-07, R-01. **Neighborhoods:** Colfax East and South Yards (the highest rent burdens), Box Elder, Central Station. **Start with:** Reading 3; Reading 1 (condition 1; household H01).

## D-06 Planning, Building and Land Use

**Runs and holds:** plans, zoning, permits and building review; their records.

**Limits:** proposes plans and zoning; issues permits under adopted rules.

**Pressure:** growth outruns water capacity; some land developers want sits under airport approaches.

**Questions for the spec:** Can a permit proceed during an address or parcel correction? What must the Water and Sewer Authority confirm before new housing is approved?

**Works with:** D-07, D-08, A-03, D-14, R-02. **Neighborhoods:** Manila and High Prairie (fast growth), Harback (annexation disputes), Box Elder (floodplain), South Yards. **Start with:** Reading 1 (real geography; conditions 3, 5 and 9; household H06).

## D-07 Address Office and GIS

**Runs and holds:** official address and parcel registry and its correction process. Nearly every entry needs it.

**Limits:** maintains and corrects city records. Can't change postal, school, utility or court addresses held by others.

**Pressure:** fast subdivision: farm addresses, new parcels and apartment complexes often mismatch across the county map, postal service, tax rolls, utilities and schools.

**Questions for the spec:** Whose record counts when two disagree? What happens to a case during an address dispute? Who is told of a correction?

**Works with:** D-06, D-08, D-10, A-01, A-03, R-02. **Neighborhoods:** Old Watkins (rural addresses), Inboden (subdivisions), South Yards. **Start with:** Reading 1 (condition 2; households H02, H05, H06).

## D-08 Finance, Tax, Assessor and Procurement

**Runs and holds:** revenue, property assessment, tax rolls and purchasing; contracts.

**Limits:** compares costs; sets purchasing procedures for approval.

**Pressure:** each new service adds an unfunded yearly running cost. A fee proposed in class isn't law until adopted.

**Questions for the spec:** Build, buy or rent? What does the city own outright? How could it leave a vendor? What is the yearly cost?

**Works with:** D-02, D-03, D-07, D-09. **Start with:** Reading 2 (institutional models); Reading 4 (money and incentives).

## D-09 Digital Service and Records

**Runs and holds:** the city-county's technology, digital services, records management; system logs, technical documentation.

**Limits:** proposes system designs and runs tests.

**Pressure:** obvious operator of whatever the class designs, with no approved staff or money. Not every resident has a phone.

**Questions for the spec:** Who operates the exchange: this department, a new authority, or a contractor? What does joining require? What gets logged, and who reads the logs?

**Works with:** D-03, D-08, D-15 and every outside agency. **Start with:** Reading 2 (X-tee and Athumi in the models table); Reading 4 (information).

## D-10 Police, 911 and Emergency Management

**Runs and holds:** police, 911 dispatch and emergency planning; call records and incident reports.

**Limits:** sets dispatch and emergency requirements.

**Pressure:** dispatch needs exact locations fast; in the north and east the nearest unit can be far. Shouldn't receive medical data or gate codes it has no authority to hold.

**Questions for the spec:** What must work when the exchange is down or a partner refused? What may dispatch see, and for how long?

**Works with:** D-07, D-11, A-08, A-09. **Neighborhoods:** Harback and the north and east. **Start with:** Reading 1 (condition 7).

## D-11 Fire Department

**Runs and holds:** fire suppression, rescue and medical first response across the city-county; incident, inspection and first-response patient records.

**Limits:** sets fire and first-response operations and inspection requirements.

**Pressure:** a wrong address costs minutes; in Harback or High Prairie the drive is already long.

**Questions for the spec:** Who runs ambulance transport: Fire or the Health and Hospital Authority? How does a patient record pass from first responder to hospital?

**Works with:** D-10, D-07, D-06, A-08. **Neighborhoods:** Harback, Northfield and High Prairie (low density); South Yards (industrial sites). **Start with:** Reading 1 (condition 7).

## D-12 Public Health

**Runs and holds:** population health programs and disease surveillance; disease reports.

**Limits:** runs city public health programs. No say over hospital records.

**Pressure:** needs hospitals to report cases; many residents it serves struggle to reach care.

**Questions for the spec:** What may hospitals report to Public Health, for what purpose, with what protection?

**Works with:** A-08, A-09, D-04, D-10. **Start with:** Reading 1 (condition 7).

## D-13 Parks, Recreation and Cultural Affairs

**Runs and holds:** parks, recreation, and city dealings with The Hangar, Aerotropolis Park and EDPAC; registrations, facility bookings.

**Limits:** proposes programs and operating budgets.

**Pressure:** facilities cluster downtown, far from the north and east. Front-desk staff already field questions about every city system.

**Questions for the spec:** Is a recreation pass a sensible first service? What must residents prove to register when addresses mismatch (H02, H06)?

**Works with:** A-02, D-07, D-14. **Start with:** Reading 1 (civic and cultural anchors).

## D-14 Transportation and Public Works

**Runs and holds:** city streets, local mobility programs, snow and storm response, drainage; asset inventories, work orders.

**Limits:** runs city streets and mobility programs. Can't run RTD routes or set RTD fares.

**Pressure:** owns the streets, not the buses. The scenario's rail hub doesn't mean RTD agreed to anything.

**Questions for the spec:** What can the city offer riders if RTD shares only public timetables?

**Works with:** A-04, D-06, D-13, R-03. **Neighborhoods:** Portside and the north and east (infrequent service); Box Elder (drainage crossings). **Start with:** Reading 1 (conditions 4 and 9; household H04); Reading 4 (regional transit example).

## D-15 Clerk, Civil Rights and Appeals

**Runs and holds:** public records, language and disability accommodation, complaints and appeals.

**Limits:** proposes process standards and recordkeeping rules.

**Pressure:** every automated "no" without an appeal route becomes a complaint here.

**Questions for the spec:** Where does a resident go when the system says no? Can residents see who viewed their records? Who fixes a wrong record from another agency?

**Works with:** D-04, D-09, A-07, R-01, R-03. **Start with:** Reading 2 (what the city-county can and cannot require); Reading 4 (information).

# Outside agencies

## A-01 East Detroit Unified School District

**What it is:** East Detroit's public school district, with its own elected board.

**Runs and holds:** schools, enrollment, attendance boundaries and school transportation; student records.

**Pressure:** enrollment shifting fast (West Commons crowded, Prairie Crossing's high school filling). The board takes no direction from the city.

**Could offer:** limited enrollment referral, address-check agreement, or coordination funding. **Likely refusal:** access to student files; automatic school placement.

**Questions for the spec:** Fixed referral information, a shared address check, or a separate district process?

**Works with:** D-07, D-04, D-14. **Neighborhoods:** West Commons, Prairie Crossing, Inboden (school access), Quail Run (childcare shortages). **Start with:** Reading 1 (condition 8; household H05); Reading 4 (school example).

## A-02 East Detroit Public Library District

**What it is:** independent library district with its own board and property tax levy. Colorado allows separately governed library districts; Reading 2's real example: Boulder Public Library District.

**Runs and holds:** branch libraries, public computers and internet, in-person help, programs; library accounts and borrowing records.

**Pressure:** already the help point for people without home internet. More city referrals need paid staff time. Borrowing records stay confidential.

**Could offer:** in-person help with city services, public computers, staff training.

**Questions for the spec:** Help point, member, or both? Who pays for the help desk?

**Works with:** D-13, D-15, D-09, R-03. **Start with:** Reading 1 (condition 10; household H03); Reading 2.

## A-03 East Detroit Water and Sewer Authority

**What it is:** public authority for East Detroit's water and wastewater, with its own board, rates and debt. Compare Detroit's split between a regional water authority and a city department (Reading 2).

**Runs and holds:** water and sewer service, connections and billing; customer accounts, service addresses and capacity commitments.

**Pressure:** can't promise water it hasn't secured. Every housing approval depends on its capacity and who pays for new pipes.

**Could offer:** phased capacity commitments; shared account and service-address data. **Likely refusal:** no new connections until infrastructure is paid for.

**Questions for the spec:** An account alone is not proof of residence (Reading 1). Check water service addresses against the city's registry?

**Works with:** D-06, D-07, D-08, D-14. **Neighborhoods:** Harback (wells, septic conversion), Box Elder (flooding), Manila and High Prairie (growth). **Start with:** Reading 1 (conditions 2 and 3); Reading 2 (Detroit's water arrangement).

## A-04 Regional Transportation District (RTD)

**What it is:** the real Denver-area transit authority; East Detroit is one of many places it serves.

**Runs and holds:** regional buses and rail, fares and schedules; fare accounts and ridership data.

**Pressure:** answers to the whole region. Won't change fares or open rider accounts for one city without a formal agreement.

**Could offer:** public schedules, a formal service agreement, or a tested pilot. **Likely refusal:** linking fare records to a city account.

**Questions for the spec:** What useful service is left without an RTD connection?

**Works with:** D-14, D-13, R-03. **Neighborhoods:** Portside (shift work), Central Station (transfer hub), the north and east. **Start with:** Reading 1 (condition 4; household H04); Reading 4 (regional transit example).

## A-05 State of Colorado Human Services and State IT

**What it is:** the real state agencies behind Colorado's state-supervised, county-administered benefits.

**Runs and holds:** benefit program oversight; statewide systems holding eligibility and case records.

**Pressure:** state and federal law set eligibility. Won't open state systems to a city without an approved agreement.

**Could offer:** test environment, approved interface, or a waiver if legal. **Likely refusal:** direct access to program data.

**Questions for the spec:** Which state data could East Detroit request through the exchange, under what agreement? How are appeal rights kept?

**Works with:** D-04, D-09, D-15. **Start with:** Reading 2 (county-administered benefits; rules for the simulation).

## A-06 East Detroit Regional Housing Authority (EDRHA)

**What it is:** independent public housing authority with its own commission, serving East Detroit and participating communities beyond.

**Runs and holds:** federal housing assistance including vouchers, its properties and appeals; voucher and tenancy records, federal income verification under HUD rules.

**Pressure:** limited vouchers. Each referral without an open voucher or unit lengthens the waiting list.

**Could offer:** negotiated intake or referral, limited status checks where permitted, partnership funding. **Likely refusal:** handing over federal records; running a city-dictated workflow.

**Questions for the spec:** Name one real handoff with the Housing Division: who funds, authorizes, delivers and reviews it?

**Works with:** D-05, A-07, D-04, R-01. **Start with:** Reading 3.

## A-07 East Detroit County Court

**What it is:** the city-county's own trial court for smaller matters. Modeled on Denver's county court: city-funded, judges appointed by the mayor from merit lists, outside Colorado's state court system. Only Denver has this in real Colorado; East Detroit's version is a fictional rule in its founding amendment. Felonies, family and probate cases go to a state district court.

**Runs and holds:** evictions, small claims, civil cases up to \$25,000, misdemeanors, traffic, protection orders and city ordinance violations; filings, case status, judgments and protection orders.

**Pressure:** city-funded, but its judges decide independently and it controls its case records.

**Could offer:** case status to parties or their advocates; notice to the Housing Division when an eviction is filed.

**Questions for the spec:** Should an eviction filing trigger an offer of help? Who may see a protection order, and when? (Reading 3: an automated referral cannot stop a court case.)

**Works with:** D-05, A-06, D-15, D-10, R-01. **Start with:** Reading 2 (a city-county court); Reading 3 (federal limits).

## A-08 East Detroit Health and Hospital Authority

**What it is:** the city-county's public safety-net hospital: an independent public authority, board appointed by the mayor. Modeled on Denver Health, a separate public authority under Colorado law since 1997.

**Runs and holds:** public hospital and clinics, care for uninsured and low-income patients, paramedic service; patient records under medical privacy law.

**Pressure:** treats patients who can't pay; each referral costs it money.

**Could offer:** referrals, insurance and benefits screening help, emergency protocols. **Likely refusal:** patient records leaving hospital systems.

**Questions for the spec:** When may the city ask for clinical information, and what may it never see? How do 911, first responder and hospital hand off a patient? Who runs ambulance transport: this authority or the Fire Department?

**Works with:** D-10, D-11, D-12, D-04, A-09. **Start with:** Reading 1 (condition 7); Reading 2 (a public hospital authority).

## A-09 East Detroit Health System

*Optional: takes part only if a student claims it.*

**What it is:** the scenario's independent health system: Level I regional trauma center, aerospace flight medicine, teaching hospital.

**Runs and holds:** trauma, specialty care and teaching; patient records under medical privacy law.

**Pressure:** runs the region's trauma center; owes the city no participation.

**Likely refusal:** patient records leaving hospital systems.

**Questions for the spec:** Does a second hospital join on the same terms as the public authority?

**Works with:** A-08, D-10, D-11, D-12. **Start with:** Reading 1 (civic and cultural anchors; condition 7).

# Resident groups

## R-01 Renter and Tenant Advocacy Council

Speaks for renters: 53.6% of East Detroit's households; nearly half pay at least 30% of income for housing. Wants help without tax records, and working appeals. Brings real renter cases, including H01. Can hold a formal governance role if the city-county grants one.

**Ask the spec:** Who is left out when a service assumes a homeowner comfortable online?

**Works with:** D-05, A-06, A-07, D-15. **Start with:** Reading 3; Reading 1 (household H01).

## R-02 Old Watkins and Agricultural Landholders Alliance

Speaks for longtime owners, farm families and small businesses in and around Old Watkins. Wants recognized rural addresses, drainage protection, and a say before land conversion. Knows local roads and parcels the county map gets wrong, including H02.

**Ask the spec:** Who pays when farmland is converted, and who can appeal the map?

**Works with:** D-07, D-06, D-14, A-03. **Start with:** Reading 1 (conditions 2 and 9; household H02).

## R-03 Workers and Disability Access Coalition

Speaks for shift workers, people with disabilities, residents without smartphones, and residents who prefer languages other than English. Test cases: the Portside worker whose shuttle stops early (H04), the Spanish-speaking Box Elder household (H03), residents who can't visit during office hours.

**Ask the spec:** What has to work without a smartphone or a same-day appointment?

**Works with:** D-15, A-02, A-04, D-14. **Start with:** Reading 1 (condition 10; households H03 and H04).

# Source

Estonian Information System Authority, [Data exchange layer X-tee](https://www.ria.ee/en/state-information-system/data-exchange-platforms/data-exchange-layer-x-tee). https://www.ria.ee/en/state-information-system/data-exchange-platforms/data-exchange-layer-x-tee

Sources for the county court, hospital authority and library district models are in Reading 2.
