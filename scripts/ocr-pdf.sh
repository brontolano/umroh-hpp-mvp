#!/usr/bin/env bash
#
# scripts/ocr-pdf.sh
#
# Al Khaif Group PDF OCR pipeline (render PDF -> vision OCR -> JSON).
#
# Usage:
#   bash scripts/ocr-pdf.sh <pdf-path> [out-dir]
#
# Steps:
#   1. python3 scripts/render_pdf.py <pdf> <out-dir>        # render pages -> PNG
#   2. vision OCR each PNG (moli CDP / OCI CLI / local)      # queue in your OCR app
#   3. collect the text + boxes -> data/live/hotels.json
#
# Vision provider (edit the `VIZ_*` block to match your setup):
#   - moli CDP (Headless Moli CDP server)            -- used by parser.drift
#   - OCI Vision CLI (oci vision detect-document)    -- cloud instance
#   - local vision-api / python HTTP OCR
#
set -euo pipefail

PDF_PATH="${1:?Usage: ocr-pdf.sh <pdf-path> [out-dir]}"
OUT_DIR="${2:-data/raw/$(basename "${PDF_PATH}" .pdf)-ocr}"
VENV="${PDF_VENV:-${PDF_VENV:-/tmp/pdf_venv/bin/python}}"

# ---------------------------------------------------------------------------
# Vision API  (edit depending on your setup)
# ---------------------------------------------------------------------------
VIZ_URL="${VIZ_URL:-}"
VIZ_AUTH="${VIZ_AUTH:-}"                  # e.g. file with OCI CLI profile or Bearer token
VIZ_PROVIDER="moli"                       # moli | oci | local

VISION_OCR() {
  # $1 = page-png path ; echo the extracted text to stdout
  case "${VIZ_PROVIDER}" in
    moli)
      # Moli CDP: have Moli navigate to the page and capture its text/boxes.
      # Requires a running Moli CDP server (port 9222). This is a hook you must
      # fill in with your actual CDP/thumbnail OCR call.
      echo "[vision:moli] call your moli CDP OCR here for $1" >&2
      ;;
    oci)
      # OCI Vision: oci vision detect-document
      #   oci vision detect-document --compartment-id $OCI_COMPARTMENT \
      #       --file "$1" --display-name ocr --output text
      echo "[vision:oci] call oci vision detect-document here for $1" >&2
      ;;
    local)
      # local python HTTP OCR (e.g. fastapi + tesseract / easyocr / vision-remote)
      echo "[vision:local] call your local vision API here for $1" >&2
      ;;
    *)
      echo "[err] unknown VIZ_PROVIDER=$VIZ_PROVIDER" >&2
      exit 1
      ;;
  esac
}

# ---------------------------------------------------------------------------
main() {
  [[ -f "$PDF_PATH" ]] || { echo "[err] PDF not found: $PDF_PATH" >&2; exit 1; }
  mkdir -p "$OUT_DIR"

  # 1. render PDF -> PNG (uses pymupdf via render_pdf.py)
  echo "[1/3] Rendering PDF -> PNG ..."
  python3 scripts/render_pdf.py "$PDF_PATH" "$OUT_DIR" 300

  # 2. vision OCR each page
  echo "[2/3] Vision OCR ..."
  local jsonl="$OUT_DIR/ocr-$(basename "$PDF_PATH" .pdf).jsonl"
  : > "$jsonl"
  shopt -s nullglob
  for png in "$OUT_DIR"/page_*.png; do
    [[ -f "$png" ]] || continue
    text="$(VISION_OCR "$png")"
    echo "{\"page\": \"$png\", \"text\": \"$text\"}" >> "$jsonl"
  done
  echo "  -> OCR JSONL: $jsonl"

  # 3. (optional) hand the JSONL to parse-pdf.py for structured output
  echo "[3/3] Ready. Feed $jsonl into scripts/parse-pdf.py for the structured JSON."
}

main "$@"
