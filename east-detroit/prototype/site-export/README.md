# East Detroit Operations — deployable web application

The full East Detroit operational simulation has been built in a standalone application repository and deployed using a Cloudflare Worker. This GitHub copy contains the **portable Vite/React 19 source archive** for deployment through Vercel or Cloudflare Pages.

- [Download the complete portable site (ZIP)](./east-detroit-operations-portable.zip)
- [Working research dossier](../../v3/master_project_dossier_v3.md)
- [Design specification](../DESIGN_SPEC.md)

## Import and deploy

Unzip the archive into a new GitHub repository; do not upload the ZIP as the only source file. The archive contains `src/`, `package.json`, `index.html`, `vite.config.ts`, Cloudflare `_redirects`, and `vercel.json`. On Vercel or Cloudflare Pages select build command `npm run build` and output directory `dist`; the repository root is the unzipped folder.

The current live hosting service reports deployment success at https://east-detroit-operations.higgsfield.app/ . However, direct unauthenticated requests from this environment received 401, so public access has not been independently confirmed.

The sample data is synthetic. Session changes are local to each browser. HDS interaction principles and WCAG-aware colors are used, but the current implementation does not import `hds-react` and has not undergone a full accessibility audit.
