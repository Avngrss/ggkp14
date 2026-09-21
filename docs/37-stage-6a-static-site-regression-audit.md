# Stage 6A — Full Static-Site Regression Audit

Дата: 2026-09-21

---

## 1. Audit scope

Complete regression of the approved static frontend before WordPress conversion: 12 production HTML templates, shared shell, navigation, responsive overflow, accessibility baseline, assets, CSS/JS scope, local preview, and simulated GitHub Pages artifact.

Out of scope: WordPress/PHP, new templates, redesign, npm/Playwright install, broad refactoring.

---

## 2. Pages tested

| # | File | Role |
|---|------|------|
| 1 | `index.html` | Homepage |
| 2 | `content-page.html` | Generic prose page |
| 3 | `contacts.html` | Contacts + map |
| 4 | `table-page.html` | Direct-lines tables |
| 5 | `departments-index.html` | 18 department cards |
| 6 | `department.html` | Women’s consultation |
| 7 | `department-aop.html` | Uritskaya AOP |
| 8 | `news-archive.html` | 10 cards + pagination |
| 9 | `news-single.html` | Featured image variant |
| 10 | `news-single-video.html` | Video embed variant |
| 11 | `news-single-no-media.html` | Text-only variant |
| 12 | `search-results.html` | Static search demo |

Navigator (dev only): `preview.html` — 12 links, excluded from deploy.

---

## 3. Viewport matrix

**Viewports:** 1440×1000, 1280×1000, 1024×1000, 768×1000, 390×844, 360×800.

**Tool:** Playwright MCP on `http://localhost:8765/pages/` (local `python -m http.server` from `src/`).

**Checks per page × viewport (72 total):**

- HTTP load (domcontentloaded)
- `document.documentElement.scrollWidth` ≤ `clientWidth` (+1px tolerance)
- Exactly one `h1`
- `#main` present
- `lang="ru"`

**Result:** 72/72 passed after High fix (see §15).

Table page: page-level overflow none at 360px; horizontal scroll confirmed inside `[data-table-scroll]` only (screenshot `table-mobile-390-scrolled.png`).

---

## 4. Shared shell consistency

Compared skip link, topbar, logo, sticky header, main nav, search toggle/panel, mobile drawer, lang switcher, footer, script tags across templates.

**Finding:** Shell markup is intentionally duplicated per page (copy-paste pattern). Structure and class names align across production pages. Minor label drift only in page-specific breadcrumbs/main content.

**CSS/JS:** All production pages load `tokens.css`, `base.css`, `layout.css`, `components.css`, `responsive.css`, plus `homepage.css` (index only) or `internal-pages.css` (internal only). No cross-leak of homepage vs internal stylesheet on wrong page type.

---

## 5. Navigation results

### Local preview (`/pages/`)

| Flow | Result |
|------|--------|
| Home → Прямые линии | `table-page.html` |
| Home → Contacts (nav) | `contacts.html` |
| Home → All departments | `departments-index.html` |
| Dept index → Women’s consultation | `department.html` |
| Archive → 3 local singles | `news-single*.html` |
| Header search submit | `search-results.html` |

### GitHub Pages (production)

Verified on `https://avngrss.github.io/ggkp14/`:

- Home → `pages/table-page.html`
- Contacts, departments, archive singles, search submit — OK
- No accidental `https://avngrss.github.io/o-nas/...` without `/ggkp14/`

**Mapping attributes:** `data-source-path`, `data-dept-path`, `data-article-path`, `data-result-path` retained.

**External links:** Intentional `https://ggkp14.by/...` for routes without static templates.

---

## 6. Visual consistency results

- Primary palette via `tokens.css` / components; no stray legacy teal hex found in CSS grep.
- Typography, containers, cards, buttons, focus-visible states consistent with Stages 3I–5I.
- No broad token normalization performed; no visible system break reported.

---

## 7. Page-specific results

| Area | Status |
|------|--------|
| Homepage hero, quick actions, departments, news, services, footer | OK |
| Content page prose, single H1, breadcrumb | OK |
| Contacts phones, `tel:`, map iframe with title | OK (Stage 5D map layout retained) |
| Table semantics, captions, scroll hint, wrapper scroll | OK |
| Departments index 18 cards, 2 local + 16 external | OK |
| Department variants breadcrumbs, return links | OK |
| Archive 10 items, 3 local links, static pagination | OK |
| News variants (image / video / no-media) | OK |
| Search results 3 items, text-first, no fake pagination | OK |

---

## 8. Accessibility findings

- `lang="ru"`, skip link, one H1, `#main`, breadcrumbs on internal pages — OK on all production pages.
- Keyboard (homepage mobile 390): Tab focus visible; Escape closes mobile drawer and header search; `aria-expanded` toggles observed.
- Tables semantic on table page; map iframe has descriptive `title`.
- **Not claimed:** full WCAG compliance.

---

## 9. Multilingual findings

No content translated. Layout uses wrapping (`word-break`, flexible headers/grids) suitable for longer BY/EN labels. Lang switcher is placeholder only — documented in `docs/38-static-site-known-limitations.md`. No synthetic translations saved to HTML.

---

## 10. Asset findings

- Favicon: `../assets/icons/favicon.svg` on all pages.
- Placeholders under `src/assets/images/placeholders/` referenced locally; no broken local image paths detected in audit sample.
- Google Fonts loaded from CDN (network dependency for first paint).
- No blocking missing asset on production pages.

---

## 11. CSS leakage findings

| Check | Result |
|-------|--------|
| `internal-pages.css` on homepage | Not loaded |
| `homepage.css` on internal pages | Not loaded |
| Search/department/news scoped selectors | Scoped to respective templates |

**Cleanup candidates (deferred):** none causing confirmed regression; optional future audit for unused selectors.

---

## 12. JavaScript findings

Files: `main.js`, `menu.js`, `accessibility.js`.

- No project `console.error` / `pageerror` on index, table, contacts (domcontentloaded pass).
- Sticky header, drawer, search panel, table scroll hint (table page only), static search form navigation (local action) — OK.
- No client-side search engine, archive pagination JS, or media player JS.

---

## 13. Local preview results

- `preview-local.cmd` → `tools/preview-local.ps1` → port **8765**, root `src/`.
- `preview.html` lists all 12 production pages with working relative links.
- All production pages return 200 via local server.

---

## 14. GitHub Pages artifact results

Workflow simulated locally (same steps as `.github/workflows/pages.yml`):

- `dist/index.html` with `pages/table-page.html` links
- All production pages under `dist/pages/`
- CSS, JS, assets present
- `.nojekyll` present
- `dist/pages/preview.html` **excluded**
- Temporary `dist/` removed after validation

Production deploy verified separately via live URL navigation (post Stage 6A audit session).

---

## 15. Issues by severity

### Blocker

None after fix.

### High (fixed during 6A)

**Corrupted search `<input>` markup** on 11 pages: literal `` `r`n `` sequences inside attributes from a prior PowerShell patch (invalid HTML, risk to `name="s"` and accessibility).

**Fix:** Restored proper multiline attributes with `name="s"` on header and mobile search inputs. Files: all production pages except `search-results.html` (already correct).

### Medium (deferred)

- Language switcher links point to `#` (placeholder until WP i18n).

### Low (deferred)

- Playwright `networkidle` timeouts when external fonts slow (audit used `domcontentloaded`).
- Duplicate shell HTML maintenance burden (accepted project pattern until WP partials).

---

## 16. Fixes applied

| Fix | Files |
|-----|-------|
| Search input HTML corruption | 11 × `src/pages/*.html` |

No CSS, layout, or content redesign.

---

## 17. Issues intentionally not fixed

- Static search behavior, static pagination, external live links, placeholder lang switcher, video placeholders — see `docs/38-static-site-known-limitations.md`.

---

## 18. Regression result after fixes

- Viewport matrix 72/72 pass (local).
- Navigation local + GitHub Pages pass.
- Search inputs valid HTML with `name="s"` on all production pages.
- Forms use `action="search-results.html"` (root homepage uses `pages/search-results.html` via build).

---

## 19. Static frontend approval status

**Approved with documented non-blocking limitations**

Ready for Stage 6B (Gutenberg content stress-test specification) and WordPress architecture planning — not for theme implementation in this stage.

---

## 20. Remaining blockers before WordPress planning

None technical on static baseline. Product/content decisions remain: multilingual plugin, department CPT strategy, form plugins, migration scope.

---

## Screenshots

`docs/audit/stage-6a/` — 24 files including homepage, internal pages, mobile, sticky header, search open, drawer, keyboard focus, GitHub Pages table navigation.
