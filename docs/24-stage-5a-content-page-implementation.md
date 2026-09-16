# Stage 5A — Content Page Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create the first internal static template `src/pages/content-page.html` with shared internal-page shell and real content structure from https://ggkp14.by/zapis-k-vrachu/, using the approved homepage header/footer and visual system.

---

## 2. Source reference page

| Item | Value |
|------|-------|
| URL | https://ggkp14.by/zapis-k-vrachu/ |
| Title | Запись к врачу |
| Breadcrumb | Главная » Запись к врачу |
| Inspection | Playwright MCP (ignoreHTTPSErrors), viewports 1440 / 768 / 390 |

**Content structure reproduced:**

- Institution heading (H2 on source, after page H1)
- Greeting and introduction
- «Как воспользоваться данной услугой?»
- Registration instructions (2 methods, list)
- Link to tutmed.by online registration
- Rules for repeat appointments
- Common errors list (anchor links)
- Closing notice about registry contact

**Not copied from source:**

- Large blue banner hero (replaced with compact internal page header)
- Broken decorative image placeholder
- Sidebar widgets below content (Stage 4: not required for this representative page)
- Source heading defects (news-style H2-only pages)

---

## 3. Existing components reused

- Topbar with lang switcher RU/BY/EN
- Sticky `.site-header` with nav, search, CTA, burger
- `.header-search-panel` and mobile search icon button
- `.mobile-drawer` with lang switcher and CTA
- `.site-footer`
- Skip link → `#main`
- Button classes (`.btn`, `.btn--primary`)
- Container system (`.container`)
- JS: `menu.js`, `accessibility.js`, `main.js`

---

## 4. New internal-page components

| Component | Class / element | Purpose |
|-----------|-----------------|---------|
| Internal page wrapper | `.internal-page` | Subtle background, vertical padding |
| Breadcrumb | `.breadcrumb`, `.breadcrumb__list` | Accessible `<nav>` + `<ol>` |
| Page header | `.page-header`, `.page-header__title` | Single H1, compact spacing |
| Prose body | `.prose` | Readable content column (max ~48rem) |
| Notice block | `.prose-notice` | Callout for registry reminder |
| Document link style | `.prose-document-link` | Ready for PDF pages (unused on this page) |

---

## 5. Content structure implemented

```
main#main
  └── .internal-page
        └── .container.internal-page__container
              ├── nav.breadcrumb (ol)
              ├── header.page-header (h1)
              └── article.prose
                    ├── h2 (institution name)
                    ├── p, em greeting
                    ├── h2, h3, ul (registration)
                    ├── external link (tutmed)
                    ├── mailto link
                    ├── h2, ul (appointment rules)
                    ├── h3, ul (common errors)
                    └── section.prose-notice
```

---

## 6. CSS file created

**`src/css/internal-pages.css`** — connected only to `content-page.html`.

Contains: internal page background, breadcrumb, page header, prose typography, lists, notices, document link helper, responsive rules for mobile/360.

**Not connected to** `index.html`.

---

## 7. JavaScript reused

No new JavaScript files. Existing scripts handle sticky header, search panel, mobile drawer, a11y toggle.

---

## 8. Multilingual readiness

- `lang="ru"` on `<html>`
- Lang switcher in topbar and drawer (placeholder `#` links)
- Breadcrumb and H1 use `word-break` / `hyphens` / `clamp()` — no fixed widths on Russian copy
- Header CTA supports wrap (from Stage 3I)
- Content not translated — structure ready for future WP/GTranslate integration

**Limitations:** Demo breadcrumb labels hardcoded in Russian; lang switcher non-functional.

---

## 9. Accessibility foundation

- Skip link present
- One `<h1>` (page title)
- Logical H2/H3 sequence in prose
- Breadcrumb: `aria-label="Хлебные крошки"`, `aria-current="page"` on current item, decorative `»` hidden with `aria-hidden`
- Search/menu: existing `aria-expanded` / `aria-controls`
- Focus-visible inherited from base/components CSS
- `tel:` and `mailto:` descriptive links
- External link: `rel="noopener noreferrer"`
- Reduced motion: inherited

---

## 10. Responsive behavior

Verified via Playwright at 1440, 1280, 768, 390, 360 — **no horizontal overflow**.

- Breadcrumb wraps on narrow viewports
- Page title scales with `clamp()`
- Prose max-width prevents full-viewport line length
- Long URLs wrap with `overflow-wrap: anywhere`
- Header/drawer/search behave as on homepage

---

## 11. Homepage regression result

Compared `index.html` at 1440 and 390 after Stage 5A:

- Header layout unchanged
- Hero and homepage sections unchanged
- No new CSS loaded on homepage (`internal-pages.css` not linked)
- No horizontal overflow introduced
- Primary blue palette unchanged

Screenshots: `docs/audit/stage-5a/homepage-regression-*.png`

---

## 12. Files created or changed

| File | Action |
|------|--------|
| `src/pages/content-page.html` | **Created** |
| `src/css/internal-pages.css` | **Created** |
| `docs/24-stage-5a-content-page-implementation.md` | **Created** |
| `docs/07-demo-preview-instructions.md` | Updated (Stage 5A section) |
| `docs/audit/stage-5a/*.png` | Screenshots (9 files) |

**Not modified:** `index.html`, homepage CSS, GitHub workflow, WordPress files.

---

## 13. Assumptions

- Local demo links use `index.html` / `content-page.html` for navigation between static pages
- tutmed.by URL taken from homepage quick actions (same patient registration system referenced on source)
- Error FAQ anchors on source were empty `#` — implemented as in-page `#error-*` targets
- Source uppercase «УВАЖАЕМЫЕ ПАЦИЕНТЫ!» normalized to sentence case in redesign for readability

---

## 14. Known limitations

- No WordPress breadcrumb plugin integration yet
- Lang switcher placeholders only
- Error anchor sections have no expanded FAQ body on source — targets are empty placeholders
- GitHub Pages build may need path rewrite for `content-page.html` (future workflow update, out of scope)

---

## 15. Recommended next template

**Stage 5C: `contacts.html`** (or continue sequence with **5D `table-page.html`** if tables prioritized).

Per `docs/23-stage-4-static-implementation-sequence.md`, shared shell (5A) is complete; next structural variant is contacts hub or table-heavy page.

---

## Screenshots

| File | Viewport / state |
|------|------------------|
| `content-page-desktop-1440.png` | 1440 |
| `content-page-desktop-1280.png` | 1280 |
| `content-page-tablet-768.png` | 768 |
| `content-page-mobile-390.png` | 390 |
| `content-page-mobile-360.png` | 360 |
| `content-page-sticky-header.png` | 1440 scrolled |
| `content-page-search-open.png` | 390 search open |
| `homepage-regression-desktop-1440.png` | Homepage 1440 |
| `homepage-regression-mobile-390.png` | Homepage 390 |
