# Stage 6H.1 — Final pre-commit review

Date: 2026-09-23

## 1. Review Scope

Disposition of the Stage 6H minor findings, then a working-tree review before an explicitly approved commit. No pages were created, no composition was changed, and nothing was staged, committed, pushed, or deployed.

`docs/45-final-static-baseline-audit.md` did not exist at the start of this stage. It was added as the formal Stage 6H record. Detailed 6H evidence remains in `docs/audit/stage-6h/notes.md`.

## 2. Title Separator Decision

The approved baseline metadata pattern is:

`{page title} — ГУЗ «Гомельская городская клиническая поликлиника №14»`

The em dash is the site-name separator. It is not article punctuation.

Eleven later pages used a hyphen in `<title>` only:

`administration.html`, `vacancies.html`, `electronic-appeals.html`, `email-addresses.html`, `territorial-districts.html`, `medical-tourism.html`, `five-steps.html`, `medical-extract-order.html`, `dispensarization.html`, `personal-appeals.html`, `sexological-help.html`.

Those title separators were normalized to an em dash. Visible `h1` text, breadcrumbs, and source wording were not changed. `preview.html` has no site-name suffix and was left as-is.

After the change, all 30 production titles use the em dash.

## 3. No-Media News Heading Decision

`src/pages/news-single-no-media.html` keeps the trailing period in the visible `h1`.

Evidence: Stage 5H.1 recorded the source title as «Профилактика ВИЧ-инфекции.» for `/profilaktika-vich-infekcii/`. The archive card, breadcrumb, image alt, and `h1` all include the period. The document `<title>` omits the period before the site-name em dash, which is metadata punctuation, not a rewrite of the article title.

No product change.

## 4. Favicon Decision

Every production page, including the sibling homepage, references `../assets/icons/favicon.svg`. The only local favicon asset is that SVG. There is no `.ico` file.

The local server returns 404 for `/favicon.ico` because browsers still ask the host root after seeing an SVG icon. That request is a harmless fallback, not a broken page path. Converting SVG to ICO would invent a branding asset.

No favicon markup or asset was added.

## 5. Line Ending Decision

These files still contain CRLF and decode as UTF-8:

`src/css/tokens.css`, `src/css/base.css`, `src/css/layout.css`, `src/css/homepage.css`, `src/css/responsive.css`, `src/js/menu.js`, `src/js/accessibility.js`.

No replacement characters, no literal carriage-return text, and no tooling break were found. They were not rewritten. Optional LF normalization remains deferred.

## 6. Approved Composition Decision

The 48rem prose column inside the 1320px desktop container is the approved readable measure. Unused right space is not a layout defect. Short pages match short source content. No sidebar, wider column, filler block, or minimum-height change is required before WordPress.

Composition was not changed.

## 7. Final Production Inventory

| Item | Count |
| --- | --- |
| Production HTML | 30 |
| Development-only HTML | `preview.html` |
| Extra production HTML | 0 |
| Missing production HTML | 0 |
| Unique preview production entries | 30 |
| Search empty state | Same file, `?state=empty` |
| Publication sibling mappings | 29 + root `index.html` |

No inventory contradiction.

## 8. Final Local Link And Asset Result

- All 30 production pages and `preview.html` return HTTP 200.
- Both search-state preview URLs return HTTP 200.
- Checked CSS, JS, SVG icons, and sampled content images return HTTP 200.
- Explicit `favicon.svg` returns HTTP 200.
- `/favicon.ico` returns 404 (see §4).
- No missing relative page target and no root-relative WordPress route.
- No Scenario 2 internal destination points at `ggkp14.by`.

External sites were not crawled.

## 9. Final Visual Smoke Result

Rechecked at 390, 768, and 1440: homepage, `content-page.html`, `five-steps.html`, `table-page.html`, `administration.html`, `department.html`, `news-single.html`, search results, empty search, and preview.

Page-level overflow was 0. Titles use the em dash. Visible `h1` text was unchanged. Header search, dropdown keyboard access, and the mobile drawer did not regress.

No new screenshot was captured because the only product change is document-title punctuation.

## 10. Publication Simulation Result

`tools/simulate-pages-dist.py` produced:

- 30 pages under `dist/pages/`
- no `preview.html`
- `.nojekyll` present
- root homepage uses `./css/` and `./assets/icons/favicon.svg`
- sibling targets rewritten under `pages/`
- one `search-results.html`

`dist/` was removed after the check.

## 11. Working-Tree Classification

| Class | Contents |
| --- | --- |
| Approved production implementation | Modified existing pages, shared CSS/JS, Pages workflow, publication simulator, and the 13 Stage 6E–6G pages |
| Approved local asset | Administration portraits, dispensarization figures, medical-tourism photograph |
| Approved documentation | Updated Stage 6 docs and `docs/44`, `docs/45`, `docs/46` |
| Approved audit evidence | `docs/audit/stage-6e1` through `stage-6h` |
| Development utility | `preview.html`, `preview-local.cmd`, `tools/preview-local.ps1` |
| Temporary or unrelated | None remaining after deleting `tools/_6h1_check.py` and `dist/` |

No `node_modules/`, Playwright install, cache, secret, or leftover source-response folder is in the tree.

## 12. Remaining Documented Limitations

- 16 department records and extra news stay on the source site.
- Two Information children, three About children, and three Contacts children stay on the source site.
- Paid-service PDFs stay on `ggkp14.by`.
- Live search, pagination, BY/EN, and forms wait for WordPress.
- `/favicon.ico` fallback 404.
- Drawer still omits email and districts, matching the approved shell.
- Older shared CSS/JS may still use CRLF.

## 13. Files Ready For Commit

The complete current working tree of production pages, local content assets, documentation, audit evidence, preview utilities, and publication mappings. `preview.html` is ready to commit as a development file; the workflow continues to exclude it from the public artifact.

## 14. Files Excluded From Commit

- Generated `dist/` (gitignored, removed)
- Temporary `tools/_6h1_check.py` (removed)
- Browser `/favicon.ico` 404 (not a file)

## 15. Pre-Commit Decision

READY FOR APPROVED COMMIT

No blocker remains. Accepted title-separator fixes are verified. Dismissed findings are documented. Inventory, local links, smoke checks, and publication simulation succeeded. No temporary artifact remains. The cumulative diff is approved static-scope work only.

Do not commit or push until explicitly requested.
