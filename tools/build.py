#!/usr/bin/env python3
"""Broadmoor site build.

Inlines the shared header/footer (partials/*.html) into every page between
BUILD markers and regenerates sitemap.xml. Pages stay plain static HTML, so the
nav and footer are visible to search engines without JavaScript.

Usage (from the repo root):  python3 tools/build.py
Run it after editing anything in partials/. GitHub Actions also runs it on deploy.
"""
import datetime
import html as htmllib
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://broadmooraccounting.ca"
NOINDEX = {"404.html"}
# sitemap priority by page (anything unlisted gets 0.5)
PRIORITY = {
    "index.html": "1.0",
    "accounting-services.html": "0.9",
    "edmonton-accountant.html": "0.9",
    "insurance-services.html": "0.8",
    "mortgage-services.html": "0.8",
    "investment-services.html": "0.8",
    "other-services.html": "0.7",
    "financial-calculators.html": "0.6",
    "contact-us.html": "0.7",
    "privacy-policy.html": "0.2",
    "terms-of-use.html": "0.2",
    "disclaimer.html": "0.2",
}


def partial(name: str) -> str:
    return (ROOT / "partials" / f"{name}.html").read_text(encoding="utf-8").strip()


BUSINESS_ID = SITE + "/#business"
BUSINESS = {
    "@type": "AccountingService",
    "@id": BUSINESS_ID,
    "name": "Broadmoor Accounting & Financials",
    "url": SITE + "/",
    "logo": SITE + "/assets/img/broadmoor-logo.png",
    "image": SITE + "/assets/img/og-image.jpg",
    "telephone": "+1-888-286-7860",
    "email": "info@broadmooraccounting.ca",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "12 Blackfoot Road, Unit 6",
        "addressLocality": "Sherwood Park",
        "addressRegion": "AB",
        "postalCode": "T8A 4P4",
        "addressCountry": "CA",
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=12+Blackfoot+Road+Unit+6+Sherwood+Park+AB+T8A+4P4",
    "openingHoursSpecification": [
        {"@type": "OpeningHoursSpecification",
         "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
         "opens": "08:30", "closes": "18:00"},
        {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday",
         "opens": "10:00", "closes": "15:00"},
    ],
    "areaServed": [
        {"@type": "City", "name": "Edmonton"},
        {"@type": "City", "name": "Sherwood Park"},
        {"@type": "AdministrativeArea", "name": "Strathcona County"},
        {"@type": "City", "name": "St. Albert"},
        {"@type": "City", "name": "Fort Saskatchewan"},
        {"@type": "City", "name": "Spruce Grove"},
        {"@type": "City", "name": "Leduc"},
        {"@type": "City", "name": "Beaumont"},
        {"@type": "AdministrativeArea", "name": "Alberta"},
    ],
    "knowsLanguage": ["en"],
    "sameAs": ["https://www.facebook.com/p/Broadmoor-Accounting-Financials-100079229520867/"],
}


def page_url(name: str) -> str:
    return SITE + "/" if name == "index.html" else f"{SITE}/{name}"


def head_block(name: str, meta: dict) -> str:
    e = lambda t: htmllib.escape(t, quote=True)
    url = page_url(name)
    robots = "noindex, follow" if meta.get("noindex") else "index, follow, max-image-preview:large"
    lines = [
        f'<title>{e(meta["title"])}</title>',
        f'<meta name="description" content="{e(meta["description"])}">',
        f'<meta name="robots" content="{robots}">',
    ]
    if not meta.get("noindex"):
        lines.append(f'<link rel="canonical" href="{url}">')
    lines += [
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="Broadmoor Accounting &amp; Financials">',
        '<meta property="og:locale" content="en_CA">',
        f'<meta property="og:title" content="{e(meta["title"])}">',
        f'<meta property="og:description" content="{e(meta["description"])}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{SITE}/assets/img/og-image.jpg">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="geo.region" content="CA-AB">',
        '<meta name="geo.placename" content="Sherwood Park, Alberta">',
        '<meta name="theme-color" content="#0f1e3d">',
        '<link rel="icon" type="image/png" sizes="64x64" href="assets/img/favicon.png">',
        '<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">',
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    ]
    return "\n".join("  " + l for l in lines)


def strip_tags(t: str) -> str:
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", htmllib.unescape(t)).strip()


def faq_items(text: str):
    items = []
    for m in re.finditer(
        r'class="faq-question"[^>]*>(.*?)</button>\s*<div class="faq-answer">(.*?)</div>', text, re.S
    ):
        q, a = strip_tags(m.group(1)).rstrip("+ ").strip(), strip_tags(m.group(2))
        if q and a:
            items.append({"@type": "Question", "name": q,
                          "acceptedAnswer": {"@type": "Answer", "text": a}})
    return items


def schema_block(name: str, meta: dict, text: str) -> str:
    url = page_url(name)
    graph = [BUSINESS, {
        "@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/",
        "name": "Broadmoor Accounting & Financials", "inLanguage": "en-CA",
        "publisher": {"@id": BUSINESS_ID},
    }]
    page = {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": meta["title"],
            "description": meta["description"], "inLanguage": "en-CA",
            "isPartOf": {"@id": SITE + "/#website"}, "about": {"@id": BUSINESS_ID}}
    if meta.get("crumb"):
        page["breadcrumb"] = {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": meta["crumb"], "item": url},
        ]}
    graph.append(page)
    if meta.get("service"):
        graph.append({"@type": "Service", "@id": url + "#service", "name": meta["service"]["name"],
                      "serviceType": meta["service"]["type"], "provider": {"@id": BUSINESS_ID},
                      "areaServed": BUSINESS["areaServed"], "url": url})
    faqs = faq_items(text)
    if faqs:
        graph.append({"@type": "FAQPage", "@id": url + "#faq", "mainEntity": faqs})
    data = {"@context": "https://schema.org", "@graph": graph}
    return '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=1) + "\n</script>"


def mark_current(html: str, page: str) -> str:
    """Add aria-current to links pointing at the current page."""
    return re.sub(
        r'<a href="%s"(?![^>]*aria-current)' % re.escape(page),
        '<a href="%s" aria-current="page"' % page,
        html,
    )


def inject(text: str, name: str, html: str) -> str:
    pattern = re.compile(r"(<!-- BUILD:%s -->).*?(<!-- /BUILD:%s -->)" % (name, name), re.S)
    if not pattern.search(text):
        return text
    return pattern.sub(lambda m: m.group(1) + "\n" + html + "\n" + m.group(2), text)


def lastmod(path: pathlib.Path) -> str:
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", path.name],
            cwd=ROOT, capture_output=True, text=True, check=True,
        ).stdout.strip()
        if out:
            return out
    except Exception:
        pass
    return datetime.date.today().isoformat()


def main() -> None:
    header, footer = partial("header"), partial("footer")
    meta_all = json.loads((ROOT / "tools" / "pages.json").read_text(encoding="utf-8"))
    pages = sorted(p for p in ROOT.glob("*.html"))
    for page in pages:
        text = page.read_text(encoding="utf-8")
        meta = meta_all.get(page.name)
        if meta is None:
            raise SystemExit(f"{page.name}: add an entry to tools/pages.json")
        new = inject(text, "head", head_block(page.name, meta))
        new = inject(new, "schema", schema_block(page.name, meta, text))
        new = inject(new, "header", mark_current(header, page.name))
        new = inject(new, "footer", mark_current(footer, page.name))
        if new != text:
            page.write_text(new, encoding="utf-8")
            print(f"built   {page.name}")

    urls = []
    for page in pages:
        if page.name in NOINDEX:
            continue
        if meta_all.get(page.name, {}).get("noindex"):
            continue
        loc = page_url(page.name)
        urls.append(
            f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{lastmod(page)}</lastmod>\n"
            f"    <priority>{PRIORITY.get(page.name, '0.5')}</priority>\n  </url>"
        )
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    )
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    print(f"sitemap {len(urls)} urls")


if __name__ == "__main__":
    main()
