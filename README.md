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
