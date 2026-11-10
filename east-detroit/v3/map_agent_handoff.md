# East Detroit 2030: map agent handoff and geographic acceptance test
**Version 3 | Prepared for a second agent to build map layers**

## Objective

Build an interactive and exportable, *clearly fictional* municipal atlas for the City and County of East Detroit, Colorado. Use real road, aviation, jurisdiction and terrain references, but never present invented 2030 neighborhoods as current real-world facts. The original narrow spaceport diagram is archival. The authoritative data **for the teaching scenario** is in this folder; surveyed legal geography remains unresolved.

## Inputs

- `east_detroit_2030_draft.geojson`: one **provisional** city-county polygon, 20 proposed neighborhood **point labels**. Coordinates in WGS84 lon/lat. **Do not interpret points as final district boundaries.**
- `neighborhoods_2030.json`: 20 IDs ED01 through ED20, exact fictional population and household distribution, income, renter share, cost pressure and reason for neighborhood distinction.
- `neighborhood_atlas_2030.md`: interpretation, resident cases and background.
- `master_project_dossier_v3.md`: standing facts, cultural anchor names and source/fiction distinction.
- Historical `../east_detroit_scenario.geojson`: former seven functional zoning blocks, **superseded**; never merge without review.

## Geographic outline to investigate

The new draft study envelope uses an irregular polygon with a geodesic area of approximately **115.4 square miles**, compared with the real CASP study area of approximately 48 square miles. It starts near the Watkins/I-70 corridor, includes the CASP region, and expands principally **north of E. 72nd Avenue and east of the old Harback Road edge**, reaching an indicative north edge near latitude 39.897 and an east edge near longitude -104.390. The polygon is an **illustrative extent**. It may cross actual municipal, school, taxing, aviation, utility, or parcel boundaries. The agent must identify these overlaps, not conceal them.

East Detroit is a fictional consolidated city and county. The planning extent must not absorb Denver International Airport by accident. Preserve the real KCFO airfield as a distinct aviation safety and employment anchor; avoid placing housing inside protected runway and approach areas.

## Required map layers and fields

1. **Reference:** topographic/satellite basemap with tile-provider attribution, actual Denver International Airport, Colorado Air and Space Port, rail, I-70, highway links, streams, public roads, geographic labels, official county/city lines, and available airport constraint layers. Source date and rights included.
2. **Fictional East Detroit jurisdiction:** editable scenario boundary with status `provisional`, total area estimate, visible outline, and notes on crossings of actual municipal limits.
3. **Twenty fictional neighborhoods:** proposed polygons to be constructed using recognizable streets, watercourses and development patterns. Stable IDs and names must match `neighborhoods_2030.json`. Connect every polygon to exactly one demographic record; preserve 382,417 total residents and 155,800 households. Boundaries require human review.
4. **Five planning regions:** South/Historic, Central/Downtown, West/Residential, East/Growth, North/Expansion. These are reporting areas, not zoning restrictions.
5. **Land-use and protection overlays:** actual KCFO runway/protection surfaces when available, drainage/floodways, open space, industry/logistics, existing settlement, and fictional developed-area/urban zones. Distinguish verified vs fictional styling.
6. **Facilities:** place The Hangar at Space Center (17,500 seats), Denver Fawns (WNBA), Colorado Apex (PWHL), Aerotropolis Park (16,210 seats), Denver Pilots (AAA), EDPAC (2,200 seats), and East Detroit Health System (Level I regional trauma). These are **fictional 2030 facilities**; sites are **proposed**, not surveyed. A location near the central *fictional* RTD hub must be shown as invented.
7. **Scenario conditions:** neighborhoods with high renter burden, long travel, unresolved water connections, address mismatches, school capacity pressure, aviation noise and drainage issues. Show them as planning-assumption overlays, not measured Census polygons.
8. **Participation boundaries:** optional layer for independent school districts, regional transit, water providers, airport and neighboring government jurisdiction. Flag unknowns for student decision; do not assert they belong to the city-county.

## Labels and display rules

- Each popup prominently distinguishes **SCENARIO** from **REAL REFERENCE** and **OPEN FOR CLASS DECISION**.
- Do not use fake Google branding, screenshots that appear to be actual Google Maps, or false source attribution.
- Do not invent USPS codes or call the modeled neighborhood polygon a census tract.
- Do not put spaceport launches on a real operational flight calendar. They are part of the fictional 2030 setting.
- The map must work on mobile and support keyboard navigation, readable contrast, scale and legend, and a text-based neighborhood directory.
- Use tile providers in accordance with licensing and attribution requirements; preserve the ability to export GeoJSON, KML and a static, clearly marked fictional concept PNG.

## Required files

- `east_detroit_2030_review.geojson` with one jurisdiction polygon, twenty separate neighborhood polygons and a protection/facility layer with feature IDs.
- A mobile-friendly `index.html` or static site with layer toggles, search by neighborhood, popup descriptions, and an accessible non-map listing.
- `neighborhood_checks.json`: population/household totals, polygon overlap and gap report, features outside city extent, facilities placed in exclusion zones, and outstanding geographic questions.
- A PNG with map key, date, source/fiction legend, prominent note “Fictional East Detroit 2030 planning scenario.”
- A `MAP_SOURCES.md` listing real base datasets, access dates, licenses, current municipal boundary discrepancies and other caveats.

## Acceptance criteria

1. All twenty IDs occur exactly once in a usable neighborhood layer; no negative populations; totals match exactly.
2. Candidate neighborhoods are reasonably contiguous, stay within the city scenario envelope except for documented boundary questions, and do not occupy prohibited flight zones. Their proposed area may be adjusted with a clear change log.
3. No residential neighborhood claims to be a current real settlement if its name is invented.
4. All cultural/sports anchor names and seats match the version 3 master dossier.
5. Current municipal/utility/school overlays are credited and treated as outside constraints, not silently overwritten.
6. Link to the map works from GitHub Pages or another durable web host. Raw HTML in GitHub is not a live map.
7. The `neighborhood_checks.json` records uncertainties to bring to the class, not invented precise boundaries.

## Official geographic references to obtain

- Adams County CASP Subarea Plan and Figure 1-2: https://adamscountyco.gov/wp-content/uploads/2025/08/space-port-subarea-plan.pdf
- DRCOG Municipal Boundaries (2026): https://data.colorado.gov/Government/DRCOG-Municipal-Boundaries/xufp-56dv
- Adams County open data: https://data-adcogov.opendata.arcgis.com/
- US Census TIGER/Line roads, blocks and boundaries: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
- FAA aeronautical and airport GIS data: https://adip.faa.gov/
- FEMA National Flood Hazard Layer: https://www.fema.gov/flood-maps/national-flood-hazard-layer

**Do not mark the expanded polygon “verified” until source overlays have been checked.**
