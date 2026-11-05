# broadmooraccounting.ca

Static website for Broadmoor Accounting & Financials (Sherwood Park, AB — serving Edmonton and area), deployed to GitHub Pages by `.github/workflows/static.yml`.

## Structure

| Path | Purpose |
|---|---|
| `*.html` | One file per page. Edit page content directly in these files. |
| `partials/header.html`, `partials/footer.html` | Shared header/nav and footer. **Edit here, not in the pages.** |
| `tools/pages.json` | Per-page `<title>`, meta description, breadcrumb and schema settings. Every new page needs an entry. |
| `tools/build.py` | Inlines the partials, writes head meta tags + JSON-LD schema (incl. FAQ schema from each page's FAQ), and regenerates `sitemap.xml`. |
| `assets/img`, `assets/css`, `assets/js` | Images (WebP), shared CSS, and shared JS (`site.js` = nav, mega menu, mobile drawer, forms, FAQ; `calculators.js` = calculators). |
| `assets/css/glass.css` | Design layer: floating glass header, mega menu, mobile drawer and the sitewide glass/rounded styling. Loaded **last** on every page (injected by the build) so it overrides per-page inline CSS. |
| `tools/drafts/` | Content removed from the live site pending client verification (not deployed). |

## Editing workflow

1. Edit a page, a partial, or `tools/pages.json`.
2. Run `python3 tools/build.py` (Python 3.8+, no dependencies) to refresh pages and the sitemap.
3. Commit and push to `main` (built pages are committed; the deploy workflow publishes the repo as-is).

Content between `<!-- BUILD:... -->` and `<!-- /BUILD:... -->` markers (`head`, `schema`, `theme`, `header`, `footer`) is generated — changes made there by hand are overwritten.

## Adding a page

Copy an existing page, give it the `BUILD:head`, `BUILD:schema`, `BUILD:header` and `BUILD:footer` markers (the `BUILD:theme` marker is added automatically before `</head>`), add it to `tools/pages.json`, run the build, and link to it from the header partial (mega menu **and** mobile drawer) and the footer partial.

## Contact forms

Any `<form data-web3form>` is submitted by `assets/js/site.js` to Web3Forms. Every field needs a `name`. Keep the consent checkbox (`name="consent"`) — it is referenced by the Privacy Policy.

## CSS layout

Load order on each page: `style.css` → shared group file(s) → `assets/css/pages/<page>.css` (page-only rules) → `assets/css/glass.css` (design layer, injected by the build).

| File | Used by |
|---|---|
| `assets/css/components.css` | Service pages, contact, calculators |
| `assets/css/services.css` | The five original service pages |
| `assets/css/service-page.css` + `legal.css` | Legal pages and 404 |
| `assets/css/landing.css` | Edmonton page and the dedicated service landing pages |

The build adds a content-hash `?v=` to every local CSS/JS link, so browsers pick up changes immediately.

## Yearly content updates

Before each tax season, update the year-specific dates and rates on `personal-tax-return.html` (key dates table and rate note) and `corporate-tax-return.html` (2026 rates). Re-check the Super Visa requirements on `super-visa-insurance.html` against IRCC's page.
