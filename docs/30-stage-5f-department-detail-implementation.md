# Stage 5F — Department Detail Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create one reusable static template `src/pages/department.html` for individual structural departments, using the women's consultation page as the primary reference, reusing the approved internal page shell.

---

## 2. Primary source page

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/ |
| Title | Женская консультация — ГУЗ «Гомельская городская клиническая поликлиника №14» |
| H1 | Женская консультация |
| Breadcrumb | Главная » О нас » Структурные подразделения » Женская консультация |
| Tables | 0 |
| Map | None |
| Address | None on department page |
| Phone | +375 (232) 31-09-37 (appointment) |
| Images in body | None meaningful in main content |

Inspection: Playwright MCP with `ignoreHTTPSErrors: true` (site SSL cert mismatch on direct navigate); WebFetch cross-check.

---

## 3. Additional departments inspected

| Department | URL | Purpose |
|------------|-----|---------|
| Ультразвуковая диагностика | `/ultrazvukovaya-diagnostika/` | Diagnostic department — long service lists, preparation instructions, hours, location note |
| Урицкая АОП | `/urickaya-aop/` | Outpatient clinic — address, multiple phones, staff list, service zones |

Both share: H1 + breadcrumb through index, rich prose sections, optional contact block, bullet lists. Neither required tables on inspected pages.

---

## 4. Shared department blocks found

- Breadcrumb: Главная » О нас » Структурные подразделения » {department name}
- H1 department title
- Introductory paragraph(s) about the department role
- Optional contact / appointment information (phone, hours)
- Thematic sections with H2/H3 headings
- Bullet lists (structure, equipment, services, staff)
- Closing informational paragraphs

---

## 5. Optional blocks found

| Block | Primary page | UZI page | Uritskaya AOP |
|-------|--------------|----------|---------------|
| Department image | No (body) | No | No |
| Address | No | No | Yes |
| Phone list | Yes (1) | No | Yes (2) |
| Working hours | Yes | Yes | Yes |
| Staff list | No | No | Yes (roles count) |
| Service / exam lists | Yes | Yes (extensive) | Yes |
| Schedule table | No | No | No |
| Map | No | No | No |
| Documents | No | No | No |

Template supports prose sections + optional contact panel; table system ready but unused on primary demo.

---

## 6. Visible content used in the demo

All content from women's consultation source only:

- Institutional intro
- Service description paragraph
- Appointment phone + online booking reference
- Reception hours (weekday split + Saturday)
- Structure list (13 items)
- Equipment list (4 items) + instruments paragraph
- Disposable supplies list (4 items)
- Districts / prenatal classes paragraph
- Cancer screening participation paragraph

---

## 7. Existing components reused

- Full internal page shell (topbar, header, nav, search, drawer, footer)
- Breadcrumb, `.page-header`, `.prose` typography
- Contact link patterns (`tel:`, external tutmed link from content-page)
- Lang switcher, skip link, focus styles
- JS: `menu.js`, `accessibility.js`, `main.js`

---

## 8. Department-specific components added

| Component | Class | Purpose |
|-----------|-------|---------|
| Back navigation | `.department-detail__back`, `.department-detail__back-link` | Link to `departments-index.html` |
| Detail article | `.department-detail.prose` | Main content wrapper + WP path attribute |
| Lead paragraph | `.department-detail__lead` | Intro emphasis |
| Contact panel | `.department-detail__contacts` | Grouped appointment phone + hours |
| Content section | `.department-detail__section` | Thematic blocks |
| Section title | `.department-detail__section-title` | H2 styling within detail |

---

## 9. Contact and schedule handling

- Phone `+375 (232) 31-09-37` → `tel:+375232310937`
- Online booking → existing tutmed URL from `content-page.html` (source references online booking without URL)
- Hours reproduced verbatim from source H4 text
- No address added (not on source department page)
- No A1 mobile from contacts page added (not on department page)

---

## 10. Image handling

No meaningful department image in main content on source. No image placeholder added. Sidebar/widget images on live site excluded as non-department content.

Future WordPress: featured image slot can be added when CMS provides department photos.

---

## 11. Static link strategy

- `departments-index.html`: only «Женская консультация» card → `department.html`
- `data-dept-path` preserved on index card and detail article
- Other 17 index cards unchanged (live ggkp14.by URLs)
- Detail page back link → local `departments-index.html`

---

## 12. Future WordPress mapping

| Static | WordPress |
|--------|-----------|
| `department.html` + `data-dept-path` | Custom post type «project» / department single template |
| Per-department instances | Replace static file with dynamic routing or duplicate HTML per slug |

---

## 13. CSS changes

**File:** `src/css/internal-pages.css` (Stage 5F block)

- Back link styling
- `.department-detail.prose` max-width 52rem
- Lead paragraph typography
- Contact panel with left accent border
- Section spacing and section titles
- Mobile: phone links wrap naturally

No changes to `homepage.css`, table system, or contacts styles.

---

## 14. JavaScript usage

Existing scripts only — no department-specific JS.

---

## 15. Multilingual readiness

- `lang="ru"` retained
- Titles, lists, and contact labels use flexible wrapping
- No fixed heights on content blocks
- Back link text can expand in BY/EN translations

---

## 16. Accessibility considerations

- Skip link → `#main`
- One H1
- Breadcrumb with `aria-current="page"` on current item
- Descriptive back link text
- Logical H2 section order under H1
- `tel:` link with visible formatted number
- External online booking link with `rel="noopener noreferrer"`
- Semantic lists for structure/equipment/supplies
- Section `aria-labelledby` on contact and content blocks

Not claiming full WCAG audit.

---

## 17. Responsive behavior

Verified via Playwright MCP — no page-level horizontal overflow at tested widths.

| Viewport | Result |
|----------|--------|
| 1440 / 1280 | Prose column readable; contact panel full width of column |
| 1024 / 768 | Natural stacking; header intact |
| 390 / 360 | Breadcrumb wraps; phone links wrap; lists readable |

---

## 18. Regression results

| Page | Result |
|------|--------|
| `index.html` 1440 / 390 | Pass — no department-detail styles |
| `content-page.html` 1440 | Pass |
| `contacts.html` 1440 | Pass — map layout intact |
| `table-page.html` 1440 / 390 | Pass |
| `departments-index.html` 1440 / 390 | Pass — 18 cards; only first link changed |

Screenshots: `docs/audit/stage-5f/`

---

## 19. Files created or changed

| File | Action |
|------|--------|
| `src/pages/department.html` | Created |
| `src/css/internal-pages.css` | Added `.department-detail*` styles |
| `src/pages/departments-index.html` | Women's consultation href → `department.html` |
| `src/pages/preview.html` | Added Stage 5F entry |
| `docs/30-stage-5f-department-detail-implementation.md` | Created |
| `docs/07-demo-preview-instructions.md` | Stage 5F section |
| `docs/audit/stage-5f/*.png` | Audit screenshots |

---

## 20. Assumptions

- Tutmed URL from `content-page.html` is the correct target for source «онлайн-записи» reference.
- Source H3/H4 hierarchy flattened to H1 + H2 + lists for clearer accessibility (content unchanged).
- Sidebar widget «Время работы» on live site is institution-wide, not department-specific — excluded.

---

## 21. Known limitations

- Single static demo page (women's consultation only).
- 17 departments still link to live site from index.
- No department photo.
- No table variant demonstrated (none on primary page).
- SSL certificate issue on direct Playwright navigate without `ignoreHTTPSErrors`.

---

## 22. Recommended next template

**Stage 5G: `news-archive.html`** or extend department template with a second content variant (e.g. Uritskaya AOP with address + multiple phones) when WordPress routing is planned.
