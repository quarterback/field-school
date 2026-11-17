# After action record: public homepage redesign

**Date:** November 17, 2026
**Scope:** `east-detroit/prototype/portable` public welcome page (`PublicWelcome` in `src/PublicEntry.tsx`), its styles, three image assets and the render scripts in `east-detroit/prototype/render-scenes`.

## What was asked

Give the My East Detroit landing page more influence from real public sector homepages, using counterfactual photos of the city and a vision of the idea where needed. The design was approved on a canvas and then launched.

## What changed

- The welcome page now opens on a full width image of Civic Square with the headline, a service search and sign in in an overlapping white panel (pattern from hel.fi and boston.gov).
- Popular services: eight services that exist in the portal, each with the office that handles it. Search filters this list. Each link goes to the sample sign in.
- "Some updates need no new form" now shows the birth example as a four step sequence on aqua, taken from PROACTIVE_SERVICES.md, plus the food license renewal example.
- Independent agencies section beside the Central Station image, with the existing copy about each agency keeping its own records.
- 311 help panel on the Box Elder Creek greenway image.
- Header shows in-page links (Services, Public agencies, Get help) and a ruby Sign in button on the welcome page only. Portal and sign in screens are unchanged.
- Removed the unused CSS for the old welcome layout.

## Decisions and deviations from the canvas design

- **Images are rendered, not photographed.** The build environment could not reach photo libraries or image generators, so the scenes were rendered with Python. They read as planning department concept renderings.
- **Español link left out.** There is no Spanish content to link to yet, and CONTENT_STANDARDS.md bars features that do not exist.
- **In-person help sentence left out.** The canvas had a placeholder for a service counter location and hours. The scenario does not name one, so nothing ships in its place.
- **Shared footer kept.** The canvas showed a dark footer; the live page keeps the portal's existing footer so signed-in pages match.

## Checks run

- `npm run build` passes (TypeScript and Vite).
- Headless Chrome screenshots at 1440px and 390px widths: hero panel overlaps the image, lists stack on a phone, nav links hide below 760px.
- Not run: screen reader pass, 200 to 400 percent zoom, keyboard walkthrough of the search.

## Open items

- Replace the rendered scenes with photographs if the class wants a photographic look.
- Decide whether 311 is part of the East Detroit service model before the class presents.
