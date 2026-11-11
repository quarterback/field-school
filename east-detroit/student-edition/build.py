#!/usr/bin/env python3
"""Build the East Detroit student edition: Markdown -> Word (.docx) -> PDF.

Requires pandoc (3.x), LibreOffice (soffice) and python-docx.
Usage: python3 build.py
Outputs go to dist/. The Markdown in src/ is the editorial master; the
repository's v3/ documents remain the source of truth for the scenario.
"""
from pathlib import Path
import subprocess, shutil, sys, tempfile
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm

HERE = Path(__file__).resolve().parent
SRC, DIST = HERE / "src", HERE / "dist"
REF = HERE / "build" / "reference.docx"

BODY_FONT, HEAD_FONT = "Calibri", "Calibri"
INK = RGBColor(0x1D, 0x2B, 0x30)
ACCENT = RGBColor(0x0B, 0x4F, 0x6C)


def field(run, instr):
    """Insert a Word field (e.g. PAGE) into a run."""
    for tag, text in (("begin", None), ("instr", instr), ("separate", None), ("end", None)):
        if tag == "instr":
            el = OxmlElement("w:instrText")
            el.set(qn("xml:space"), "preserve")
            el.text = f" {text} "
        else:
            el = OxmlElement("w:fldChar")
            el.set(qn("w:fldCharType"), tag)
        run._r.append(el)
        if tag == "separate":
            t = OxmlElement("w:t")
            t.text = "1"
            run._r.append(t)


def make_reference():
    REF.parent.mkdir(exist_ok=True)
    subprocess.run(["pandoc", "-o", str(REF), "--print-default-data-file", "reference.docx"],
                   check=True)
    doc = Document(REF)
    by_name = {x.name: x for x in doc.styles}

    class _Styles:  # exact-name lookup; python-docx remaps "Heading N" otherwise
        def __getitem__(self, name):
            return by_name[name]
    st = _Styles()

    def style(name, size, bold=False, color=INK, font=BODY_FONT, before=0, after=6, italic=False):
        s = st[name]
        s.font.name, s.font.size, s.font.bold, s.font.italic = font, Pt(size), bold, italic
        s.font.color.rgb = color
        rpr = s.element.get_or_add_rPr()
        rfonts = rpr.find(qn("w:rFonts"))
        if rfonts is None:
            rfonts = OxmlElement("w:rFonts")
            rpr.append(rfonts)
        for a in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
            rfonts.set(qn(a), font)
        for a in ("w:asciiTheme", "w:hAnsiTheme", "w:cstheme", "w:eastAsiaTheme"):
            if rfonts.get(qn(a)) is not None:
                del rfonts.attrib[qn(a)]
        if not hasattr(s, "paragraph_format"):  # character style, e.g. Hyperlink
            return s
        pf = s.paragraph_format
        pf.space_before, pf.space_after = Pt(before), Pt(after)
        return s

    for n in ("Normal", "Body Text", "First Paragraph", "Compact"):
        style(n, 11, before=0, after=6)
        st[n].paragraph_format.line_spacing = 1.15
    st["Compact"].paragraph_format.space_after = Pt(3)
    style("Title", 26, True, ACCENT, HEAD_FONT, 0, 4)
    style("Subtitle", 14, False, INK, HEAD_FONT, 0, 6)
    style("Author", 11, False, INK, before=0, after=0)
    style("Date", 11, False, INK, before=0, after=18)
    for n in ("Author", "Date", "Title", "Subtitle"):
        st[n].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    style("Heading 1", 16, True, ACCENT, HEAD_FONT, 18, 6)
    style("Heading 2", 13, True, INK, HEAD_FONT, 12, 4)
    style("Heading 3", 11.5, True, INK, HEAD_FONT, 10, 3)
    for n in ("Heading 1", "Heading 2", "Heading 3"):
        st[n].paragraph_format.keep_with_next = True
    style("Table Caption", 10, True, INK, before=10, after=4)
    st["Table Caption"].paragraph_format.keep_with_next = True
    style("Image Caption", 10, False, INK, before=4, after=12, italic=True)
    style("Hyperlink", 11, False, ACCENT)
    st["Hyperlink"].font.size = None  # inherit size from surrounding text
    st["Hyperlink"].font.underline = True

    # Table style: visible borders and a shaded, repeating header row.
    tbl = st["Table"].element
    tblpr = tbl.find(qn("w:tblPr"))
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        b = OxmlElement(f"w:{edge}")
        b.set(qn("w:val"), "single"); b.set(qn("w:sz"), "4"); b.set(qn("w:color"), "9AA8AD")
        borders.append(b)
    old = tblpr.find(qn("w:tblBorders"))
    if old is not None:
        tblpr.remove(old)
    tblpr.append(borders)
    mar = OxmlElement("w:tblCellMar")
    for edge, w in (("top", 40), ("bottom", 40), ("left", 90), ("right", 90)):
        m = OxmlElement(f"w:{edge}"); m.set(qn("w:w"), str(w)); m.set(qn("w:type"), "dxa"); mar.append(m)
    tblpr.append(mar)
    for cond in tbl.findall(qn("w:tblStylePr")):
        if cond.get(qn("w:type")) == "firstRow":
            tcpr = cond.find(qn("w:tcPr"))
            if tcpr is None:
                tcpr = OxmlElement("w:tcPr"); cond.append(tcpr)
            shd = OxmlElement("w:shd")
            shd.set(qn("w:val"), "clear"); shd.set(qn("w:fill"), "E3ECEF")
            tcpr.append(shd)
            rpr = cond.find(qn("w:rPr"))
            if rpr is None:
                rpr = OxmlElement("w:rPr"); cond.append(rpr)
            rpr.append(OxmlElement("w:b"))

    sec = doc.sections[0]
    sec.page_width, sec.page_height = Cm(21.59), Cm(27.94)  # US Letter
    for side in ("left_margin", "right_margin"):
        setattr(sec, side, Cm(2.3))
    sec.top_margin, sec.bottom_margin = Cm(2.2), Cm(2.2)
    p = sec.footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("East Detroit student readings  |  Page ")
    r.font.size = Pt(9)
    r2 = p.add_run(); r2.font.size = Pt(9); field(r2, "PAGE")
    r3 = p.add_run(" of "); r3.font.size = Pt(9)
    r4 = p.add_run(); r4.font.size = Pt(9); field(r4, "NUMPAGES")
    doc.save(REF)


def mark_header_rows(path):
    """Repeat table header rows across pages and mark them as headers for screen readers."""
    doc = Document(path)
    for t in doc.tables:
        trpr = t.rows[0]._tr.get_or_add_trPr()
        if trpr.find(qn("w:tblHeader")) is None:
            h = OxmlElement("w:tblHeader"); h.set(qn("w:val"), "true"); trpr.append(h)
        for row in t.rows:  # keep rows from splitting across pages
            rp = row._tr.get_or_add_trPr()
            if rp.find(qn("w:cantSplit")) is None:
                rp.append(OxmlElement("w:cantSplit"))
    doc.core_properties.language = "en-US"
    doc.save(path)


def main():
    for tool in ("pandoc", "soffice"):
        if not shutil.which(tool):
            sys.exit(f"missing required tool: {tool}")
    make_reference()
    DIST.mkdir(exist_ok=True)
    for md in sorted(SRC.glob("*.md")):
        out = DIST / (md.stem + ".docx")
        subprocess.run(["pandoc", str(md), "-f", "markdown", "-t", "docx",
                        "--reference-doc", str(REF), "--resource-path", str(HERE),
                        "-o", str(out)], check=True)
        mark_header_rows(out)
        with tempfile.TemporaryDirectory() as profile:
            subprocess.run(["soffice", f"-env:UserInstallation=file://{profile}", "--headless",
                            "--convert-to", "pdf:writer_pdf_Export:{\"UseTaggedPDF\":{\"type\":\"boolean\",\"value\":\"true\"},\"ExportBookmarks\":{\"type\":\"boolean\",\"value\":\"true\"}}",
                            "--outdir", str(DIST), str(out)],
                           check=True, stdout=subprocess.DEVNULL)
        print("built", out.name, "and", out.with_suffix(".pdf").name)


if __name__ == "__main__":
    main()
