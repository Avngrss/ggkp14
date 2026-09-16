# Stage 5C — Table Page Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create one reusable static template `src/pages/table-page.html` for table-heavy internal pages, using real schedule data from https://ggkp14.by/o-nas/grafik-pryamyh-telefonnyh-linij/ as the visible example, with styles verified against territorial and structural contact table patterns.

---

## 2. Source pages inspected

| Page | URL | Tables | Columns | Notes |
|------|-----|--------|---------|-------|
| График прямых линий | `/o-nas/grafik-pryamyh-telefonnyh-linij/` | 3 | 5 / 5 / 3 | Multiple schedule sections; rowspan in table 2; no `<thead>` on source |
| Территориальные участки | `/o-nas/territorialnye-uchastki/` | 1 | 3 | Large table; colspan/rowspan; long address cells |
| Режим работы структурных подразделений | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` | 1 | 3 | Department / hours / phones; multiple phones per cell |

Inspection: Playwright MCP (`ignoreHTTPSErrors`), viewports 1440 / 768 / 390.

**Source defects not reproduced:** missing `<th>` / `<thead>`, empty trailing rows, ALL CAPS-only structure without semantic headers.

---

## 3. Selected visible content example

**Primary content:** График прямых телефонных линий (`/o-nas/grafik-pryamyh-telefonnyh-linij/`)

- H1: «График прямых телефонных линий»
- Breadcrumb: Главная » О нас » График прямых телефонных линий
- Three real schedule tables (September 2026) for:
  1. ГГКП №14 (5 columns, 5 data rows)
  2. Гомельская центральная ГКП (5 columns, rowspan on chief physician row)
  3. Главное управление по здравоохранению (3 columns, 4 data rows)

No introductory prose on source — none added.

---

## 4. Why one shared table template is sufficient

All three inspected pages share:

- Internal page shell (breadcrumb, H1, content area)
- One or more HTML `<table>` elements with column headers
- Long text cells (names, addresses, schedules, phones)
- Optional `rowspan` / `colspan` (supported by native table markup)
- Mobile need for horizontal scroll on wide tables, not card conversion

Reusable components (`.table-section`, `.table-scroll`, `.data-table`) cover 3–5 column schedules, 3-column contact/hours tables, and large territorial tables without separate templates.

---

## 5. Existing components reused

- Skip link, topbar, sticky header, nav, search panel, mobile drawer
- Lang switcher RU / BY / EN
- Breadcrumb, `.page-header`, footer, container system
- Design tokens, focus styles, link styles
- JS: `menu.js`, `accessibility.js`, `main.js` (extended with table scroll init)

---

## 6. Table components added

| Component | Class / attribute | Purpose |
|-----------|-------------------|---------|
| Table content wrapper | `.table-content` | Full content width for tables |
| Table section | `.table-section`, `.table-section__title` | Section heading + one table block |
| Scroll hint | `.table-scroll-hint`, `[data-table-scroll-hint]` | Mobile hint when wrapper overflows |
| Scroll wrapper | `.table-scroll`, `[data-table-scroll]` | Horizontal overflow container; `tabindex="0"` |
| Data table | `.data-table` | Semantic table styling |
| Table note | `.table-note` | Ready for post-table notes (unused on this page) |

---

## 7. Semantic corrections made

| Source issue | Redesign fix |
|--------------|--------------|
| Header row in `<td>` | `<thead>` + `<th scope="col">` |
| No captions | `<caption class="visually-hidden">` + visible H2 |
| Plain text phones | `tel:` links with visible formatted numbers |
| Empty trailing rows | Omitted |
| ALL CAPS H2 on source | Sentence case in redesign for readability; data unchanged |

Table 2 `rowspan="2"` preserved for Галушкина Ирина Сергеевна (09.09 / 23.09.2026).

---

## 8. Responsive table strategy

**Desktop (1440 / 1280):** Tables fit within container; no horizontal page overflow; header row with accent-soft background and primary border.

**Tablet (768):** Tables still fit at tested width; wrapper scroll not required.

**Mobile (390 / 360):**

- Page `scrollWidth` ≤ `clientWidth` (verified)
- Table wrapper `scrollWidth` > `clientWidth` when table `min-width` exceeds viewport
- Hint shown via JS when overflow detected: «Прокрутите таблицу вправo…»
- Wrapper keyboard-focusable (`tabindex="0"`) with `:focus-visible` ring
- No row-to-card conversion, no hidden columns, no vertical internal scroll

**JS:** `initTableScroll()` in `main.js` toggles hint visibility on load/resize — not sorting/filtering controls.

---

## 9. Multilingual readiness

- `lang="ru"` on `<html>`
- Breadcrumb, H1, H2, and `<th>` use `word-break: break-word`
- Cell content uses `overflow-wrap: anywhere`
- No fixed-width columns tied to Russian labels
- Horizontal scroll remains usable for longer translated headers

---

## 10. Accessibility considerations

- One `<h1>`, logical H2 per table section
- `<main id="main">`, accessible breadcrumb
- Native `<table>`, `<thead>`, `<tbody>`, `<th scope="col">`
- Visually hidden `<caption>` per table
- Scroll region `role="region"` + descriptive `aria-label`
- Scroll hint visible when scrolling required
- `tel:` links with understandable visible text
- `:focus-visible` on scroll wrapper and links
- `prefers-reduced-motion` respected for scroll behavior

Not claiming full WCAG audit compliance.

---

## 11. Regression results

| Page | Viewports | Result |
|------|-----------|--------|
| Homepage | 1440 | Pass — no layout change |
| Content page | 1440 | Pass — prose unchanged |
| Contacts | 1440, 390 | Pass — layout/map/phones unchanged |

Table CSS scoped to `.table-*` / `.data-table` — no impact on `.prose` or `.contacts-*`.

---

## 12. Files created or changed

| File | Action |
|------|--------|
| `src/pages/table-page.html` | **Created** |
| `src/css/internal-pages.css` | **Updated** (Stage 5C table block) |
| `src/js/main.js` | **Updated** (`initTableScroll`) |
| `docs/26-stage-5c-table-page-implementation.md` | **Created** |
| `docs/07-demo-preview-instructions.md` | Updated (Stage 5C section) |
| `docs/audit/stage-5c/*.png` | Screenshots (12 files) |

**Not modified:** `index.html`, `content-page.html`, `contacts.html`, `homepage.css`, GitHub workflow.

---

## 13. Assumptions

- Direct lines page is the canonical demo instance; territorial and structural pages will reuse the same template markup pattern in WordPress
- Phone `tel:` hrefs normalized to E.164 (`+375…`); visible text matches source formatting including minor source typos (e.g. `8-(232) 55-27-39`)
- September 2026 schedule month taken from live source at inspection time
- Local demo link: `table-page.html`; nav item «Прямые линии» marked active

---

## 14. Known limitations

- Only direct-lines content implemented — territorial and structural pages not duplicated as separate HTML files
- Lang switcher placeholders only
- Schedule data is time-sensitive (September 2026 snapshot)
- Scroll hint requires JS to detect overflow (hidden when table fits)
- GitHub Pages path: `/pages/table-page.html`

---

## 15. Recommended next template

**Stage 5E: `departments-index.html`** — source `/o-nas/strukturnye-podrazdeleniya/` (18-card department grid).

Per `docs/23-stage-4-static-implementation-sequence.md`.

---

## Screenshots

| File | Viewport / state |
|------|------------------|
| `table-page-desktop-1440.png` | 1440 |
| `table-page-desktop-1280.png` | 1280 |
| `table-page-tablet-768.png` | 768 |
| `table-page-mobile-390.png` | 390 |
| `table-page-mobile-360.png` | 360 |
| `table-page-mobile-scrolled-right-390.png` | 390, table scrolled |
| `table-page-sticky-header.png` | 1440 scrolled |
| `table-page-search-open.png` | 390 search open |
| `homepage-regression-desktop-1440.png` | Homepage 1440 |
| `content-page-regression-desktop-1440.png` | Content page 1440 |
| `contacts-regression-desktop-1440.png` | Contacts 1440 |
| `contacts-regression-mobile-390.png` | Contacts 390 |

## Overflow metrics (Playwright)

| Viewport | Page overflow | Wrapper scrollable |
|----------|---------------|---------------------|
| 1440 | No | No |
| 390 | No | Yes (512 > 341) |
| 360 | No | Yes (448 > 311) |
