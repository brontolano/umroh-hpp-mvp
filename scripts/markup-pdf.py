#!/usr/bin/env python3
"""Markup the Al Khaif Group partner PDF catalog data with a +15 SAR markup.

Source:  data/catalog/al-khaif.json   (raw OCR of the partner PDF)
Output:  data/catalog/al-khaif-markedup.json

Rules:
  - Markup is +15 SAR ONLY. It is kept in SAR and is NOT converted to rupiah.
  - The marked-up SAR price is: priceSAR + 15
  - IDR is NOT stored here; it is computed on the fly by the app via a currency
    toggle (1 SAR = Rp 4750).

No rupiah (IDR) values are stored in this file -- only SAR. USD and IDR rows
(visa USD, services IDR) are left as-is because the +15 SAR markup does not
apply in those currencies.
"""
import json

SRC = "/opt/data/home/workspace/umhaj/umrohbybilal/umroh-hpp-mvp/data/catalog/al-khaif.json"
OUT = "/opt/data/home/workspace/umhaj/umrohbybilal/umroh-hpp-mvp/data/catalog/al-khaif-markedup.json"

MARKUP_SAR = 15
FX_SAR_TO_IDR = 4750

raw = json.load(open(SRC, encoding="utf-8"))

# Mirror the new rate into the existing field and add a settings block.
raw["sar_to_idr"] = FX_SAR_TO_IDR
raw.pop("priceIDR", None)  # no pre-computed IDR anywhere in this file
raw["_settings"] = {
    "markupSAR": MARKUP_SAR,
    "fxPerSAR": FX_SAR_TO_IDR,
    "currency": "SAR",
    "note": "Markup +15 SAR per SAR price. USD/IDR rows unchanged.",
    "computedFrom": "data/catalog/al-khaif.json",
}


def is_sar(row):
    if row.get("currency") == "SAR":
        return True
    return "priceSAR" in row


def mark_sar_row(row):
    base_key = "priceSAR" if "priceSAR" in row else "price"
    base = row[base_key]
    if base is None:
        row["markedUpPriceSAR"] = None
        row["markup"] = "USD/IDR -- +15 SAR not applicable"
        return
    row["markedUpPriceSAR"] = int(round(base + MARKUP_SAR))
    row["markup"] = f"+{MARKUP_SAR} SAR"
    row["fx"] = FX_SAR_TO_IDR
    row.pop("priceIDR", None)  # markup kept in SAR only; no rupiah stored


for key in ("hotels", "transport"):
    for r in raw[key]:
        if is_sar(r):
            mark_sar_row(r)

for key in ("visa", "services"):
    for r in raw[key]:
        if is_sar(r):
            mark_sar_row(r)
        else:
            r["markedUpPriceSAR"] = None
            r["markup"] = "USD/IDR -- not marked up"
            r["fx"] = FX_SAR_TO_IDR
            r.pop("priceIDR", None)  # native USD/IDR rows keep their own price

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(raw, f, indent=2, ensure_ascii=False)

marked = sum(1 for key in ("hotels", "transport", "visa", "services")
             for r in raw[key] if r.get("markedUpPriceSAR") is not None)
not_marked = sum(1 for key in ("hotels", "transport", "visa", "services")
                 for r in raw[key] if r.get("markedUpPriceSAR") is None)
print(f"output: {OUT}")
print(f"marked-up prices (SAR): {marked}")
print(f"not marked-up (USD/IDR): {not_marked}")
print(f"markup: +{MARKUP_SAR} SAR   fx: 1 SAR = Rp {FX_SAR_TO_IDR:,}")
