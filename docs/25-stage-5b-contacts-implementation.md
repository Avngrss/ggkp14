# Stage 5B — Contacts Page Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create the static contacts page template `src/pages/contacts.html` based on the real source page https://ggkp14.by/contacts/, reusing the approved shared shell and internal-page foundation from Stage 5A.

---

## 2. Source contact page

| Item | Value |
|------|-------|
| URL | https://ggkp14.by/contacts/ |
| Title | Контакты |
| Breadcrumb | Главная » Контакты |
| Inspection | Playwright MCP (`ignoreHTTPSErrors`), viewports 1440 / 1280 / 768 / 390 |

---

## 3. Source structure inspected

**Main page content:**

- H2 «Контактная информация:» (implemented as «Контактная информация» without trailing colon for cleaner typography)
- Phone groups with labels and optional hours notes:
  - «Горячая» линия: +375 (232) 33-26-51 (10:00–18:00 будни)
  - Приёмная: +375 (232) 32-90-65
  - Регистратура: +375 (232) 32-91-36 (8:00–20:00), 29-58-62, 31-56-25
  - Мобильный: +375 (44) 541-74-37 (A1)
  - Регистратура женской консультации: +375 (44) 766-55-47 (A1), +375 (232) 31-09-37 (8:00–20:00)
- Institution name and address at bottom of content area
- Yandex map iframe: `https://yandex.by/map-widget/v1/-/CCUJJHTydD`
- Address on map: г. Гомель, ул. Косарева, 11

**Contact subpage links (nav / hub, not implemented as separate pages):**

- Горячая линия
- Электронные обращения
- Контактные телефоны администрации
- Контактные телефоны сотрудников
- Режим работы и контактные телефоны структурных подразделений
- Адреса электронной почты

**Not present on main contacts page:**

- Contact form
- Email addresses in main body (only via subpage)
- Staff profiles / administration names
- Working hours as a standalone block (hours appear only as phone notes)
- Tables or downloadable files

---

## 4. Existing components reused

- Skip link → `#main`
- Topbar with lang switcher RU / BY / EN
- Sticky `.site-header` with desktop nav, search, CTA, burger
- `.header-search-panel` and mobile search icon button
- `.mobile-drawer` with lang switcher and CTA
- `.site-footer`
- `.internal-page`, `.container`, `.internal-page__container`
- `.breadcrumb`, `.breadcrumb__list`
- `.page-header`, `.page-header__title` (single H1)
- Button, link, and focus styles from `components.css` / `base.css`
- JS: `menu.js`, `accessibility.js`, `main.js`

---

## 5. Contact-specific components implemented

| Component | Class / element | Purpose |
|-----------|-----------------|---------|
| Two-column layout | `.contacts-layout` | Main contact info + map column on desktop; single column ≤1023px |
| Main column | `.contacts-main` | Phone groups, address, subpage links |
| Section block | `.contacts-section` | Grouped contact information with H2 |
| Phone group | `.contacts-group`, `.contacts-group__label` | Labelled telephone blocks |
| Phone list | `.contacts-phone-list`, `.contacts-phone-list__note` | `tel:` links with optional hours note |
| Address | `.contacts-address`, `.contacts-address__org`, `.contacts-address__lines` | Semantic `<address>` |
| Subpage nav | `.contacts-subpages`, `.contacts-subpages__list` | Links to contact child pages |
| Map aside | `.contacts-map`, `.contacts-map__embed` | Yandex iframe with visible address text |

No separate `contacts.css` — rules appended to `internal-pages.css` under `.contacts-*` selectors.

---

## 6. Contact information included

- All telephone numbers listed on source main contacts page (with `tel:` links)
- Working hours notes where shown on source (hotline, registry, women’s consultation)
- Full institution name and postal address (г. Гомель, ул. Косарева, 11; 246012)
- Yandex map embed (same widget URL as source)
- Six contact subpage navigation links from source menu structure

---

## 7. Contact information intentionally excluded

- Email addresses (source main page has none; available only on `/adresa-elektronnoj-pochty/`)
- Contact form (not on source)
- Administration / staff names and direct lines (subpages only)
- Full structural department hours table (subpage only)
- Invented supplementary notices or fake profiles
- Duplicate working-hours sidebar (source has none on main page)

Topbar/footer `mailto:ggkp14@ggkp14.by` retained from approved shared shell — not duplicated in main contact body.

---

## 8. CSS changes

**File:** `src/css/internal-pages.css` — Stage 5B block (~lines 272–433)

- Grid layout for desktop (content + map)
- Phone list typography and note styling
- Address and subpage link wrapping (`word-break`, `overflow-wrap`)
- Map embed containment (`max-width: 100%`, border, radius)
- Responsive: single column at ≤1023px; reduced map height at 767px / 360px

**Not modified:** `homepage.css`, `content-page.html`, `index.html`.

Contact selectors are scoped to `.contacts-*` — no leak into `.prose` content page.

---

## 9. JavaScript usage

No new JavaScript. Existing scripts handle sticky header, search panel, mobile drawer, accessibility toggle.

---

## 10. Multilingual readiness

- `lang="ru"` on `<html>`
- Lang switcher in topbar and drawer (placeholder `#` links)
- Contact headings, labels, and address use `word-break: break-word`
- Phone rows and email-style long strings use `overflow-wrap: anywhere` on subpage links
- No fixed-width columns dependent on Russian label length
- Grid collapses to single column before text truncation occurs

Content not translated — structure ready for future WP / GTranslate integration.

---

## 11. Accessibility considerations

- Skip link present
- One `<h1>` («Контакты»)
- Logical heading order: H1 → H2 sections → H3 phone group labels
- Breadcrumb: `aria-label="Хлебные крошки"`, `aria-current="page"` on current item
- All main-body phones use descriptive visible text + `tel:` href
- Address in semantic `<address>` with copyable text
- Map iframe has descriptive `title` attribute
- Visible address duplicated outside iframe
- Sections use `aria-labelledby` where appropriate
- Focus-visible inherited from shared CSS
- No information conveyed by color alone

Not claiming full WCAG audit compliance.

---

## 12. Responsive behavior

Verified via Playwright MCP at 1440, 1280, 768, 390, 360 — **no horizontal overflow** on contacts, homepage, or content page.

- Desktop: two-column layout (phones/address/links | map)
- ≤1023px: stacked single column; map below main content
- Breadcrumb wraps on narrow viewports
- H1 scales via existing `.page-header__title` clamp
- Map iframe height reduced on mobile; no viewport overflow
- Sticky header, search panel, and mobile drawer functional

---

## 13. Homepage regression result

Compared `index.html` at 1440 after Stage 5B:

- Header layout unchanged
- Hero and homepage sections unchanged
- `internal-pages.css` not linked on homepage
- No horizontal overflow

Screenshot: `docs/audit/stage-5b/homepage-regression-desktop-1440.png`

---

## 14. Content-page regression result

Compared `content-page.html` at 1440 and 390:

- Breadcrumb and page header unchanged
- Prose layout unchanged
- No contact-specific styles applied (no `.contacts-*` in markup)
- No horizontal overflow

Screenshots: `docs/audit/stage-5b/content-page-regression-desktop-1440.png`, `content-page-regression-mobile-390.png`

---

## 15. Files created or changed

| File | Action |
|------|--------|
| `src/pages/contacts.html` | **Created** |
| `src/css/internal-pages.css` | **Updated** (Stage 5B contacts block) |
| `docs/25-stage-5b-contacts-implementation.md` | **Created** |
| `docs/07-demo-preview-instructions.md` | Updated (Stage 5B section) |
| `docs/audit/stage-5b/*.png` | Screenshots (11 files) |

**Not modified:** `index.html`, `content-page.html`, `homepage.css`, GitHub Pages workflow, WordPress files, historical audit docs.

---

## 16. Assumptions

- Local demo navigation uses `index.html`, `content-page.html`, `contacts.html` where appropriate
- Contact subpage links point to future WP paths (`/contacts/...`) as on source
- Yandex map embed requires network access in browser; static address remains if embed blocked
- Source H2 trailing colon omitted in redesign for typographic consistency

---

## 17. Known limitations

- Lang switcher placeholders only (non-functional)
- Contact subpages not implemented — links lead to future WP routes
- Map depends on third-party Yandex widget (may be blocked offline or by CSP on some hosts)
- GitHub Pages serves page at `/pages/contacts.html` (no root copy — by design)
- No email block on main page matches source (emails on dedicated subpage only)

---

## 18. Recommended next template

**Stage 5D: `table-page.html`** — source https://ggkp14.by/o-nas/grafik-pryamyh-telefonnyh-linij/

Per `docs/23-stage-4-static-implementation-sequence.md`, after contacts hub the next structural variant is the table-heavy internal page with responsive table wrapper.

---

## Screenshots

| File | Viewport / state |
|------|------------------|
| `contacts-desktop-1440.png` | 1440 |
| `contacts-desktop-1280.png` | 1280 |
| `contacts-tablet-768.png` | 768 |
| `contacts-mobile-390.png` | 390 |
| `contacts-mobile-360.png` | 360 |
| `contacts-sticky-header.png` | 1440 scrolled |
| `contacts-search-open.png` | 390 search open |
| `contacts-map-mobile-390.png` | 390 map scrolled into view |
| `homepage-regression-desktop-1440.png` | Homepage 1440 |
| `content-page-regression-desktop-1440.png` | Content page 1440 |
| `content-page-regression-mobile-390.png` | Content page 390 |
