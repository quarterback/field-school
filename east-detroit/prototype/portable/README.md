# East Detroit — Portable static deployment

This is the portable Vite/React 19 build of the East Detroit municipal operations workbench.

**Development:** `npm install && npm run dev`

**Production build:** `npm run build` → `dist/`.

**Vercel:** Select the `portable` root directory, build `npm run build`, output `dist`. The `vercel.json` provides SPA route fallback.

**Cloudflare Pages:** Select `portable` as root, `npm run build`, output `dist`. `public/_redirects` provides fallback.

**Current visual system:** chromatic editorial colors and accessibility-oriented semantic native controls. Helsinki Design System's actual hds-react package is not installed in this standalone export; use HDS components before claiming full HDS implementation. All cases and agency decisions are simulated. Positions persist locally only.

Research and scenario: https://github.com/quarterback/field-school/tree/main/east-detroit/v3
