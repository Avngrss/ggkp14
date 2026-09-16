# Stage 5E — Departments Index Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create one static template `src/pages/departments-index.html` for the structural departments index, using real department names and URLs from https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/, reusing the approved internal page shell. Individual department pages are out of scope.

---

## 2. Source page inspected

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/ |
| Title | Структурные подразделения — ГУЗ «Гомельская городская клиническая поликлиника №14» |
| H1 | Структурные подразделения |
| Breadcrumb | Главная » О нас » Структурные подразделения |
| Layout | 18-card image grid (CMS Masters portfolio) |
| Card data | Department name in link `title` attribute only; no descriptions, addresses, or phones on index |
| Links | Each card links to a department detail URL; source uses `target="_blank"` on overlay links |
| Images | Department photos on source; not hotlinked in static demo |

Inspection: Playwright MCP at 1440, 1280, 1024, 768, 390, 360.

---

## 3. Department count found

**18** structural departments in source order.

---

## 4. Departments included

| # | Name | Path |
|---|------|------|
| 1 | Женская консультация | `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/` |
| 2 | Хирургическое отделение | `/o-nas/strukturnye-podrazdeleniya/hirurgicheskoe-otdelenie/` |
| 3 | Ультразвуковая диагностика | `/o-nas/strukturnye-podrazdeleniya/ultrazvukovaya-diagnostika/` |
| 4 | Функциональная диагностика | `/o-nas/strukturnye-podrazdeleniya/funkcionalnaya-diagnostika/` |
| 5 | Отделения общей практики | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-obshhej-praktiki/` |
| 6 | Отделения дневного пребывания | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-dnevnogo-prebyvaniya/` |
| 7 | Отделения профилактики | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-profilaktiki/` |
| 8 | Отделения медицинской реабилитации | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-medicinskoj-reabilitacii/` |
| 9 | Клинико-диагностическая лаборатория | `/o-nas/strukturnye-podrazdeleniya/kliniko-diagnosticheskaya-laboratoriya/` |
| 10 | Рентгеновское отделение | `/o-nas/strukturnye-podrazdeleniya/rentgenovskoe-otdeleniya/` |
| 11 | Урицкая АОП | `/o-nas/strukturnye-podrazdeleniya/urickaya-aop/` |
| 12 | Тереничская АОП | `/o-nas/strukturnye-podrazdeleniya/terenichskaya-aop/` |
| 13 | Руднемаримоновская АОП | `/o-nas/strukturnye-podrazdeleniya/rudnya-marimonovskaya-aop/` |
| 14 | Телешовский ФАП | `/o-nas/strukturnye-podrazdeleniya/teleshovskij-ffp/` |
| 15 | Руднетелешовский ФАП | `/o-nas/strukturnye-podrazdeleniya/rudnya-telefovskij-fap/` |
| 16 | Старобелицкий ФАП | `/o-nas/strukturnye-podrazdeleniya/staro-beleckij-fap/` |
| 17 | Залипский ФАП | `/o-nas/strukturnye-podrazdeleniya/zalipskij-fap/` |
| 18 | Ново-Мильчанский ФАП | `/o-nas/strukturnye-podrazdeleniya/novo-milchanskij-fap/` |

---

## 5. Differences between source index and homepage list

| Aspect | Source index | Homepage section |
|--------|--------------|------------------|
| Count | 18 | 18 |
| Order | Same | Same |
| Names | Same (from link `title`) | Same (from card titles / img alt) |
| URLs | Same paths | Same paths (relative on homepage) |
| Presentation | Large photo cards, overlay link, opens new tab | Large `.dept-card` with image placeholder |
| Extra metadata | None on index | None beyond image alt text |
| Link behaviour | `target="_blank"` | Same-tab relative links |

No departments added or removed relative to source or homepage.

---

## 6. Actual card data available

From the source index page only:

- Department name (exact)
- Destination URL (exact)
- Department photo (present on source; not used in static index to avoid hotlinking and oversized placeholders)

Not available on index (not invented):

- Short descriptions
- Addresses
- Telephone numbers
- Department type badges

**Design decision:** compact link-cards with decorative building icon and chevron indicator, not image-heavy homepage cards.

---

## 7. Existing components reused

- Skip link
- Topbar (with «Структурные подразделения» active)
- Sticky header, desktop nav, header search panel
- Mobile drawer (with departments link active under «О нас»)
- Lang switcher RU / BY / EN
- Breadcrumb pattern
- `.page-header` with single H1
- Footer
- `.card` / `.card--interactive` base from `components.css`
- Container and spacing tokens
- JS: `menu.js`, `accessibility.js`, `main.js`

**Not reused:** homepage `.dept-card` grid — structurally tied to fixed-aspect image area unsuitable for name-only index cards without inventing content or large empty image zones.

---

## 8. Department-specific components added

| Component | Class | Purpose |
|-----------|-------|---------|
| Index section | `.dept-index` | Wraps department collection |
| Grid list | `.dept-index__grid` | Responsive `<ul>` grid |
| List item | `.dept-index__item` | Grid cell |
| Link card | `.dept-index__card` | Full-card link with icon + name |
| Icon | `.dept-index__icon` | Decorative building marker (`aria-hidden`) |
| Name | `.dept-index__name` | Visible, wrappable department title |

Semantic structure: `<section aria-labelledby="dept-index-title">` + visually hidden H2 + `<ul>` of links.

---

## 9. Link strategy for static demo

- Each card `href` points to the live source URL (`https://ggkp14.by/...`).
- `data-dept-path` stores the WordPress path for future static mapping.
- Same-tab navigation (project convention for internal references).
- Link accessible name = visible department name (no nested interactives).
- No fake local `department.html` routes (template not yet implemented).

---

## 10. Future detail-page mapping

| Static template (future) | WordPress path | Example |
|--------------------------|----------------|---------|
| `department.html` | `/o-nas/strukturnye-podrazdeleniya/{slug}/` | `department.html?dept=zhenskaya-konsultaciya` or `department-zhenskaya-konsultaciya.html` |

Migration: replace `href` with local paths; keep `data-dept-path` for CMS sync.

---

## 11. CSS changes

**File:** `src/css/internal-pages.css` (Stage 5E block)

- `.dept-index*` responsive grid: 1 → 2 (768px) → 3 (1024px) → 4 (1280px) columns
- Compact horizontal link-card layout with accent top border
- Icon in `--color-accent-soft` pill
- CSS chevron via `::after` (decorative, on link)
- Hover: primary border + title color; focus-visible outline
- No fixed card height; names wrap with `word-break` / `hyphens`
- Reduced-motion: disables card lift transform

**Not modified:** `homepage.css`, `components.css` (except inherited `.card` rules).

---

## 12. JavaScript usage

Existing scripts only — no department-specific JS.

- `menu.js` — drawer, nav dropdowns
- `accessibility.js` — a11y mode toggle
- `main.js` — search panel, sticky header (table scroll init unused on this page)

---

## 13. Multilingual readiness

- `lang="ru"` on document
- Department names not translated (proper nouns / official names)
- Card titles use flexible height and wrapping
- Grid uses `minmax(0, 1fr)` to prevent overflow with longer labels
- Breadcrumb and H1 use existing wrap rules
- Icon and chevron positions stable with multi-line titles

---

## 14. Accessibility considerations

- Skip link → `#main`
- One H1: «Структурные подразделения»
- Hidden H2 labels the department list section
- Breadcrumb with `aria-current="page"`
- 18 list items, each a single `<a>` with clear name
- Decorative SVG icons: `aria-hidden="true"`
- Hover and `:focus-visible` states on cards
- Touch targets meet compact card padding (≥44px effective height on mobile)
- No nested interactive elements inside card links

Not claiming full WCAG audit.

---

## 15. Responsive behavior

Verified via Playwright MCP — **no page-level horizontal overflow** at any tested width.

| Viewport | Grid columns | Notes |
|----------|--------------|-------|
| 1440 | 4 | Balanced rows (18 items) |
| 1280 | 4 | Same |
| 1024 | 3 | |
| 768 | 2 | |
| 390 | 1 | Full-width stacked cards |
| 360 | 1 | No clipping or overflow |

Sticky header, search panel, and mobile drawer verified.

---

## 16. Regression results

| Page | 1440 | 390 | Result |
|------|------|-----|--------|
| `index.html` | ✓ | ✓ | Header, hero, departments section, news, services unchanged; no dept-index styles |
| `content-page.html` | ✓ | ✓ | Prose and breadcrumb unchanged; no style leak |
| `contacts.html` | ✓ | ✓ | Map layout and contact groups intact |
| `table-page.html` | ✓ | ✓ | Table columns, dates, scroll wrapper intact |

Screenshots: `docs/audit/stage-5e/`

---

## 17. Files created or changed

| File | Action |
|------|--------|
| `src/pages/departments-index.html` | Created |
| `src/css/internal-pages.css` | Added `.dept-index*` styles |
| `src/pages/preview.html` | Added Stage 5E entry |
| `docs/29-stage-5e-departments-index-implementation.md` | Created |
| `docs/07-demo-preview-instructions.md` | Stage 5E review section |
| `docs/audit/stage-5e/*.png` | 14 audit screenshots |

---

## 18. Assumptions

- Homepage department list matches the authoritative index (verified: same 18 names, order, paths).
- Source link `title` attributes provide correct visible names where overlay links have no text.
- Live source URLs are acceptable for static demo navigation until `department.html` exists.

---

## 19. Known limitations

- Department links leave the static demo site (live ggkp14.by).
- No department photos on index (source has images; not copied to avoid hotlinking and inconsistent assets).
- No filtering, sorting, or search on index (not on source).
- `department.html` not implemented.

---

## 20. Recommended next template

**Stage 5F: `department.html`** — single department page using content from e.g. `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/` as the first reference implementation.
