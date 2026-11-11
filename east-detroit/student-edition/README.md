# East Detroit student edition

Four student readings produced from the V3 working documents. GitHub remains the source of truth for the scenario. Students get the PDFs (and Word copies if needed) through Google Drive or the course site. They should never need to open this repository.

| # | Reading | Word (editable master) | PDF (reading copy) |
|---|---|---|---|
| 1 | Welcome to East Detroit | [docx](dist/01-welcome-to-east-detroit.docx) | [pdf](dist/01-welcome-to-east-detroit.pdf) |
| 2 | How East Detroit Is Governed | [docx](dist/02-how-east-detroit-is-governed.docx) | [pdf](dist/02-how-east-detroit-is-governed.pdf) |
| 3 | Housing: Two Models of Public Authority | [docx](dist/03-housing-two-models-of-public-authority.docx) | [pdf](dist/03-housing-two-models-of-public-authority.pdf) |
| 4 | The Municipal Project Brief | [docx](dist/04-municipal-project-brief.docx) | [pdf](dist/04-municipal-project-brief.pdf) |

## Review before distributing

- [EDITORIAL_CHANGE_LOG.md](EDITORIAL_CHANGE_LOG.md): every substantive deletion, merge, move and correction, plus the items needing your decision.
- [CITATION_CHECK.md](CITATION_CHECK.md): link and figure verification, plus five pages to click-check by hand.
- [checks/literal_guard_report.md](checks/literal_guard_report.md) and [checks/inspect_report.md](checks/inspect_report.md): Red Pen check output.

## Files

- `src/*.md`: editorial masters for the readings (pandoc Markdown). Edit these, not the .docx files, so changes are tracked.
- `figures/`: Figure 1, rendered by `render_map.py` from `../v3/east_detroit_2030_draft.geojson`.
- `build.py`: builds the Word template (heading styles, table style, page-number footer), converts Markdown to .docx with pandoc, then exports tagged PDFs with LibreOffice.
- `checks/`: Red Pen-based checks.
- `dist/`: built documents.

## Rebuild

Requires pandoc 3, LibreOffice, Python with `python-docx` and `Pillow`, and Node 20+.

```bash
cd east-detroit/student-edition
```

```bash
python3 render_map.py && python3 build.py
```

```bash
npm install && npm run check
```

## When the scenario changes

1. Change the V3 document in `../v3/` first. It stays the source of truth.
2. Make the matching change in `src/`, and add an entry to the change log.
3. Rebuild, run the checks, and re-upload the PDFs.

Do not fix facts only in the student edition. If an editor finds an error here, correct it in `../v3/` as well, as was done for the links in change-log items C1–C5.
