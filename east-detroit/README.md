# East Detroit, Colorado (fictional)

Classroom planning scenario based on the real agricultural and aviation landscape around the Colorado Air and Space Port, east of Denver International Airport. **This is a fictional city and county, not an actual Colorado jurisdiction.**

## Files

- [Interactive planning map](east_detroit_interactive_map.html): Leaflet map with selectable satellite and street imagery, fictional boundary, and proposed land-use districts. Open the HTML in a browser with internet access. GitHub itself displays the HTML as code.
- [Concept map (PNG)](east_detroit_concept_map.png): printable schematic, regenerated from the GeoJSON by `render_assets.py`.
- [Complete map ZIP](east_detroit_map_package.zip): map, PNG, KML, GeoJSON and this README.
- [GeoJSON](east_detroit_scenario.geojson): fictional municipal boundary and districts for Felt, QGIS and other GIS tools.
- [Google My Maps KML](east_detroit_google_mymaps.kml): import file for Google My Maps or Google Earth.

The ZIP and PNG are generated from the text source files with the [East Detroit asset workflow](../.github/workflows/east-detroit-assets.yml). This avoids file links that expire in chat. Re-run the workflow after editing map data.

## Geographic premise

- **Place:** Watkins / Colorado Air and Space Port area in eastern Adams County, Colorado.
- **Study boundaries:** E. 72nd Avenue (north), Interstate 70 (south), Hudson Road (west), Harback Road (east), using the approximately 48-square-mile CASP planning area as the *reference*.
- **Existing primary ZIP:** 80137 (Watkins). 80019 (western regional reference) and 80102 (eastern regional reference) are nearby existing codes, not new East Detroit ZIP assignments.
- **Scenario:** In an alternate administrative history, territory including portions of existing municipalities is reassigned into the fictional consolidated city and county. Fictional zoning supports mixed-use housing, employment, a civic center, conservation and aviation buffers.

## Geographic accuracy and limitations

The city-county polygon in the GeoJSON is **an approximate classroom illustration** rather than a surveyed jurisdictional boundary. The mapped districts, capacities, access roads, and civic places are invented. The concept PNG is a schematic, **not a Google Maps screenshot, satellite image, verified parcel map, or zoning regulation**. This exercise does not make actual zoning, county or USPS changes.

The satellite layer in the interactive map is supplied online by Esri; the streets layer uses OpenStreetMap. Those third-party map tiles are not stored in this repository.

## Real-world sources

- [Adams County Colorado Air and Space Port Subarea Plan](https://adamscountyco.gov/wp-content/uploads/2025/08/space-port-subarea-plan.pdf)
- [Adams County GIS](https://data-adcogov.opendata.arcgis.com/)
- [Colorado Air and Space Port](https://adamscountyco.gov/our-county/casp/about-casp/)
- [Google My Maps imports](https://support.google.com/mymaps/answer/3024836?hl=en)

Prepared 2026-11-10 for a fictional class project.
