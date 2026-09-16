# GitHub Pages Internal Link Fix

Дата: 2026-09-16

---

## 1. Confirmed 404 URL

`https://avngrss.github.io/o-nas/grafik-pryamyh-telefonnyh-linij/`

Triggered from the deployed homepage navigation item «Прямые линии», which used `href="/o-nas/grafik-pryamyh-telefonnyh-linij/"`.

---

## 2. Root cause

1. Root-relative paths (`href="/..."`) resolve from the GitHub Pages domain root (`avngrss.github.io`), not from the project base (`/ggkp14/`).
2. The static deployment serves HTML under `/ggkp14/pages/`, not WordPress permalink routes.
3. WordPress routing does not exist on GitHub Pages.

---

## 3. Static deployment path model

| Location | URL |
|----------|-----|
| Root homepage | `https://avngrss.github.io/ggkp14/` → `dist/index.html` |
| Internal templates | `https://avngrss.github.io/ggkp14/pages/*.html` → `dist/pages/*.html` |
| Assets | `https://avngrss.github.io/ggkp14/css/`, `/js/`, `/assets/` |

Build (`.github/workflows/pages.yml`):

- copies `src/*` → `dist/`
- promotes `src/pages/index.html` → `dist/index.html` with asset path rewrites
- rewrites local template links in root `dist/index.html` to `pages/<file>.html`
- excludes `dist/pages/preview.html`

---

## 4. Future WordPress permalink model

Unchanged. Original routes remain in `data-source-path`, `data-dept-path`, `data-article-path`, etc. WordPress will restore permalink URLs in `href` during theme conversion.

---

## 5. Link inventory inspected

All HTML under `src/pages/` except `preview.html`:

- `index.html`, `content-page.html`, `contacts.html`, `table-page.html`
- `departments-index.html`, `department.html`, `department-aop.html`
- `news-archive.html`, `news-single.html`, `news-single-video.html`, `news-single-no-media.html`
- `search-results.html`

Patterns found:

- Root-relative WordPress paths in shared shell (topbar, main nav, mobile drawer, footer)
- Root-relative homepage content links (departments grid, news, quick actions)
- Some pages already used sibling-relative breadcrumbs/local links

---

## 6. Local mappings applied

| WordPress / source path | Static `href` | Mapping attribute |
|-------------------------|---------------|-------------------|
| `/` | `index.html` | `data-source-path="/"` |
| `/zapis-k-vrachu/` | `content-page.html` | `data-source-path` |
| `/contacts/` | `contacts.html` | `data-source-path` |
| `/o-nas/grafik-pryamyh-telefonnyh-linij/` | `table-page.html` | `data-source-path` |
| `/o-nas/strukturnye-podrazdeleniya/` | `departments-index.html` | `data-source-path` |
| `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/` | `department.html` | `data-source-path` |
| `/o-nas/strukturnye-podrazdeleniya/urickaya-aop/` | `department-aop.html` | `data-source-path` |
| `/category/novosti/` | `news-archive.html` | `data-source-path` |
| Header/mobile search form | `search-results.html` | (static demo action) |

Existing local links retained: news archive → single variants, breadcrumbs, department index → local department examples.

---

## 7. External links intentionally preserved

All remaining former root-relative paths without a local static representative now use full live URLs:

`https://ggkp14.by/...`

Examples: `/platnye-uslugi-2/`, `/informaciya/`, `/o-nas/rezhim-raboty/`, homepage news cards without local templates, department cards without local templates.

---

## 8. Mapping data attributes preserved

- `data-dept-path` on department index cards — unchanged
- `data-article-path` on news items — unchanged
- `data-result-path` on search results — unchanged
- Added `data-source-path` on links converted from WordPress routes to static files

---

## 9. Header search static behavior

- Form `action="search-results.html"` on all pages
- Input `name="s"` retained/added for WordPress compatibility
- `main.js`: submit handler allows native navigation when `action` points to a local HTML file (no query execution, no client-side search)
- Future WordPress: form action → site home; `?s=query` processed server-side by `search.php`

---

## 10. Files changed

| File | Change |
|------|--------|
| `src/pages/*.html` (12 files, excl. preview) | Relative static links; external URLs for non-local routes |
| `.github/workflows/pages.yml` | Prefix `pages/` for local links in root `dist/index.html` |
| `src/js/main.js` | Allow form navigation to static search-results |
| `docs/36-github-pages-internal-link-fix.md` | This document |
| `docs/27-local-static-preview.md` | Link model note |

---

## 11. Artifact validation

Simulated workflow locally:

- `dist/index.html` present with `href="pages/table-page.html"` for «Прямые линии»
- `dist/pages/table-page.html` and all other templates present
- `dist/pages/preview.html` excluded
- Temporary `dist/` removed after validation

---

## 12. Local navigation validation

Playwright MCP on `http://localhost:8769/pages/`:

| From | Action | Result |
|------|--------|--------|
| Homepage | «Прямые линии» | `table-page.html` ✓ |
| Homepage | Contacts nav | `contacts.html` ✓ |
| Homepage | «Все подразделения» | `departments-index.html` ✓ |
| Departments index | Women’s consultation | `department.html` ✓ |
| News archive | Standard news | `news-single.html` ✓ |

---

## 13. Remaining limitations

- Live GitHub Pages URLs not verified until commit, push, and workflow completion
- Root homepage and `/pages/index.html` are both present; root homepage uses `pages/` prefixes via build step
- Search form navigates to static demo page without executing query
- Routes without local templates still leave the static demo for external live site

---

## 14. Required post-push checks

After push to `master`:

1. Confirm GitHub Actions «Deploy GitHub Pages» succeeds
2. Open `https://avngrss.github.io/ggkp14/` → «Прямые линии» → `.../pages/table-page.html`
3. Verify contacts, departments index, news archive, search submit
4. Confirm no link resolves to `https://avngrss.github.io/o-nas/...` (missing `/ggkp14/`)
