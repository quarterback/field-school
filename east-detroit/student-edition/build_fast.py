#!/usr/bin/env python3
"""Build student Word/PDF readings from Markdown without system package installation."""
from pathlib import Path
import subprocess
import tempfile

import pypandoc
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from weasyprint import HTML, CSS

HERE = Path(__file__).resolve().parent
SRC = HERE / "src"
DIST = HERE / "dist"

PRINT_CSS = """
@page {
  size: Letter;
  margin: 0.85in 0.86in 0.84in;
  @bottom-center {
    content: "Public Mechanics · East Detroit   |   " counter(page);
    color: #55646b;
    font-size: 8.5pt;
  }
}
html { font-family: "DejaVu Sans", sans-serif; }
body { font-size: 9.6pt; line-height: 1.43; color: #1c2d33; }
#title-block-header { margin-bottom: 1.0em; border-bottom: 2px solid #175168; }
header h1.title { font-size: 22pt; line-height: 1.15; color: #175168; margin: 0 0 0.15em; }
header .subtitle { font-size: 12pt; margin: 0 0 0.3em; }
header .author, header .date { color: #4e626b; font-size: 9pt; margin: 0.1em 0; }
h1 { font-size: 15.5pt; color: #175168; margin: 1.2em 0 0.4em; }
h2 { font-size: 12pt; color: #203c48; margin: 1em 0 0.3em; }
h3 { font-size: 10.5pt; margin: 0.8em 0 0.2em; }
h1,h2,h3 { break-after: avoid; }
p { margin: 0 0 0.68em; orphans: 3; widows: 3; }
ul,ol { padding-left: 1.55em; margin: 0.25em 0 0.7em; }
li { margin-bottom: 0.17em; }
table { width: 100%; border-collapse: collapse; font-size: 8.2pt; margin: 0.7em 0 1em; }
thead { display: table-header-group; }
th { background: #e7eef0; text-align: left; font-weight: bold; }
td,th { border: 0.6pt solid #a9b7bd; padding: 4pt 5pt; vertical-align: top; overflow-wrap: anywhere; }
tr { break-inside: avoid; }
caption { color: #4f626b; margin: 0.25em 0; font-size: 8.5pt; }
figure { margin: 0.7em 0 1em; }
figcaption { font-size: 8.3pt; color: #52646a; }
img { max-width: 100%; height: auto; }
a { color: #115b78; overflow-wrap: anywhere; }
code { font-family: "DejaVu Sans Mono", monospace; font-size: 0.92em; }
blockquote { margin: 0.8em 0 0.8em 1em; border-left: 2pt solid #9eb6c0; padding-left: 0.75em; }
"""

def add_page_field(paragraph):
    run = paragraph.add_run()
    for kind, txt in (("begin", None), ("instr", " PAGE "), ("separate", None), ("end", None)):
        if kind == "instr":
            el = OxmlElement("w:instrText")
            el.set(qn("xml:space"), "preserve")
            el.text = txt
        else:
            el = OxmlElement("w:fldChar")
            el.set(qn("w:fldCharType"), kind)
        run._r.append(el)

def style_docx(path):
    doc = Document(path)
    sec = doc.sections[0]
    sec.page_width = Inches(8.5)
    sec.page_height = Inches(11)
    sec.top_margin = Inches(0.85)
    sec.bottom_margin = Inches(0.84)
    sec.left_margin = Inches(0.86)
    sec.right_margin = Inches(0.86)
    for key, pt, bold, rgb in [
        ("Normal", 10.5, False, RGBColor(28,45,51)),
        ("Title", 22, True, RGBColor(23,81,104)),
        ("Subtitle", 12, False, RGBColor(78,98,107)),
        ("Heading 1", 15, True, RGBColor(23,81,104)),
        ("Heading 2", 12, True, RGBColor(32,60,72)),
        ("Heading 3", 10.5, True, RGBColor(32,60,72)),
    ]:
        if key not in doc.styles:
            continue
        st = doc.styles[key]
        st.font.name = "Aptos"
        st.font.size = Pt(pt)
        st.font.bold = bold
        st.font.color.rgb = rgb
        if key.startswith("Heading"):
            st.paragraph_format.keep_with_next = True
    for table in doc.tables:
        table.style = "Table Grid"
        if len(table.rows):
            trpr = table.rows[0]._tr.get_or_add_trPr()
            head = OxmlElement("w:tblHeader")
            head.set(qn("w:val"), "true")
            trpr.append(head)
    foot = sec.footer.paragraphs[0]
    foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    first = foot.add_run("Public Mechanics · East Detroit  |  ")
    first.font.size = Pt(8)
    add_page_field(foot)
    doc.core_properties.language = "en-US"
    doc.save(path)

def main():
    DIST.mkdir(exist_ok=True)
    pandoc = pypandoc.get_pandoc_path()
    for md in sorted(SRC.glob("*.md")):
        docx = DIST / f"{md.stem}.docx"
        pdf = DIST / f"{md.stem}.pdf"
        opts = ["--resource-path", str(HERE)]
        subprocess.run([pandoc, str(md), "-f", "markdown", "-t", "docx", *opts, "-o", str(docx)], check=True)
        style_docx(docx)
        with tempfile.TemporaryDirectory() as tmp:
            htmlpath = Path(tmp) / "reading.html"
            subprocess.run([pandoc, str(md), "-f", "markdown", "-t", "html5", "--standalone", *opts, "-o", str(htmlpath)], check=True)
            HTML(filename=str(htmlpath), base_url=str(HERE)).write_pdf(str(pdf), stylesheets=[CSS(string=PRINT_CSS)])
        assert pdf.read_bytes()[:4] == b"%PDF"
        assert docx.stat().st_size > 5000 and pdf.stat().st_size > 5000
        print(f"built {docx.name} ({docx.stat().st_size} bytes), {pdf.name} ({pdf.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
