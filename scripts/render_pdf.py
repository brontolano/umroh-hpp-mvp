#!/usr/bin/env python3
"""Render every page of a PDF to PNG (preprocess for the vision OCR step).

This is the reference renderer called by `scripts/ocr-pdf.sh` (and by
scripts/parse-pdf.py for the Al Khaif catalog).

Usage:
  python3 scripts/render_pdf.py <pdf-path> <out-dir> [dpi]

Defaults:
  DPI: 300
  out-dir: ./data/raw/<pdf-base>-pages

Example:
  python3 scripts/render_pdf.py KATALOG_AL_KHAIF.pdf data/raw/katalog-pages 300
"""
import os
import sys

import fitz  # PyMuPDF


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2

    pdf_path = os.path.abspath(sys.argv[1])
    out_dir = os.path.abspath(sys.argv[2])
    dpi = 300
    if len(sys.argv) > 3:
        try:
            dpi = int(sys.argv[3])
        except ValueError:
            print(f"[warn] bad DPI {sys.argv[3]!r}, using 300", file=sys.stderr)

    if not os.path.isfile(pdf_path):
        print(f"[err] PDF not found: {pdf_path}", file=sys.stderr)
        return 1

    os.makedirs(out_dir, exist_ok=True)

    doc = fitz.open(pdf_path)
    if doc.is_closed:
        print(f"[err] cannot open PDF: {pdf_path}", file=sys.stderr)
        return 1

    print(f"[*] PDF: {pdf_path}  ({doc.page_count} pages)  DPI={dpi}")
    for i, page in enumerate(doc):
        # Render to a PNG. matrix=(x/y scale) where scale = dpi / 72.
        pix = page.get_pixmap(matrix=fitz.Matrix(dpi / 72.0, dpi / 72.0), alpha=False)
        png_path = os.path.join(out_dir, f"page_{i + 1:04d}.png")
        pix.save(png_path)
        print(f"  -> {png_path}  ({pix.width}x{pix.height})")

    doc.close()
    print(f"[*] {doc.page_count} page(s) rendered to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
