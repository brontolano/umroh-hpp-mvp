#!/usr/bin/env python3
"""Post-process Al Khaif PDF catalog services: split the single 'Handling'
category into the 11 service categories declared by scripts/parse-pdf.py.

Source: data/catalog/al-khaif.json   (raw OCR of the partner PDF)
Output: data/catalog/al-khaif.json (updated service.category) and
        data/catalog/al-khaif-markedup.json (regenerated, same category).

Mapping rules (ordered): keyword matched against `name` decides the category.
Anything that does not match keeps category 'Handling' (general handling,
Waqof, check-in, etc.).
"""
import json

SRC = (
    "/opt/data/home/workspace/umhaj/umrohbybilal/umroh-hpp-mvp/data/catalog/"
    "al-khaif.json"
)
OUT = SRC  # overwrite the canonical raw file
MARKEDUP = (
    "/opt/data/home/workspace/umhaj/umrohbybilal/umroh-hpp-mvp/data/catalog/"
    "al-khaif-markedup.json"
)

RULES = [
    ("Badal", "Jasa Badal Umroh"),
    ("Dorong Thowaf", "Jasa Dorongan Thowaf Wada'"),
    ("Dorongan", "Jasa Dorongan Umroh"),
    ("Muthawwif", "Jasa Muthawwif/ah"),
    ("Laundry", "Jasa Laundry"),
    ("Buffett", "Catering & Buffet"),
    ("Catering", "Catering & Buffet"),
    ("Snack", "Snack & Mineral untuk City Tour"),
    ("Kepulangan", "Handling Kepulangan Saja"),
    ("Waqof", "Other LA Packages"),
    ("Money Changer", "Other LA Packages"),
    ("Infaq", "Other LA Packages"),
    ("Perlengkapan", "Perlengkapan Umroh"),
    ("Check In Hotel", "Handling"),
    ("Check In", "Handling"),
]

CAT_FALLBACK = "Handling"
CAT_ALREADY = "Handling"


def categorize(name: str) -> str:
    for keyword, cat in RULES:
        if keyword in name:
            return cat
    return CAT_FALLBACK


def main():
    raw = json.load(open(SRC, encoding="utf-8"))
    services = raw["services"]
    changed = 0
    for r in services:
        cat = categorize(r.get("name", ""))
        if r.get("category") != cat:
            r["category"] = cat
            changed += 1

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(raw, f, indent=2, ensure_ascii=False)

    # Regenerate marked-up copy so its `services` match the raw categories.
    markup = json.load(open(MARKEDUP, encoding="utf-8"))
    for src, dst in zip(raw["services"], markup["services"]):
        dst["category"] = src["category"]
    with open(MARKEDUP, "w", encoding="utf-8") as f:
        json.dump(markup, f, indent=2, ensure_ascii=False)

    print(f"changed from 'Handling' to a real category: {changed}")
    from collections import Counter
    print("category distribution:", dict(Counter(r["category"] for r in raw["services"])))


if __name__ == "__main__":
    main()
