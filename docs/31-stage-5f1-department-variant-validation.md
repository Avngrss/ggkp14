# Stage 5F.1 — Department Template Variant Validation

Дата: 2026-09-16

---

## 1. Stage objective

Validate the existing department detail template (`department.html`) against a second structurally different real department by creating one additional static content instance: `department-aop.html` (Uritskaya AOP).

---

## 2. Source page inspected

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/urickaya-aop/ |
| Title | Урицкая АОП — ГУЗ «Гомельская городская клиническая поликлиника №14» |
| H1 | Урицкая АОП |
| Breadcrumb | Главная » О нас » Структурные подразделения » Урицкая АОП |
| Address | аг. Урицкое, улица Коммунистическая 4 |
| Phones | Регистратура +375 (232) 93-13-60; Заведующая +375 (232) 93-12-89 |
| Hours | пн–пт 8:00–20:00; сб 8:00–14:00; вс выходной |
| Tables | 0 |
| Map | None |
| Images in body | None meaningful |

Inspection: Playwright MCP with `ignoreHTTPSErrors: true` at 1440, 768, 390.

---

## 3. Differences from women’s consultation

| Aspect | Women’s consultation | Uritskaya AOP |
|--------|---------------------|---------------|
| Address | None | Yes (village address) |
| Phones | 1 (appointment) | 2 (registry + head) |
| Hours format | Split weekday sessions | Single daily range + weekend |
| Staff | None (roles only via structure) | Staff composition list (role counts) |
| Health schools | No | Yes (2 schools with schedules) |
| Service zones | No | Yes (6 villages) |
| FAP references | No | Yes (2 FAP in service area) |
| Equipment / supplies | Yes | No |
| Online booking | Yes | No on source |
| Intro focus | Clinical specialty | AOP + included FAP |

---

## 4. Existing blocks reused

- Shared internal shell (topbar, header, nav, search, drawer, footer)
- Breadcrumb with four levels + `aria-current="page"`
- `.department-detail__back-link` → `departments-index.html`
- `.page-header` with single H1
- `.department-detail.prose` article wrapper + `data-dept-path`
- `.department-detail__lead` introductory paragraph
- `.department-detail__contacts` contact/hours panel
- `.department-detail__section` + `.department-detail__section-title` for thematic lists
- Semantic `<ul>` lists throughout

---

## 5. New optional blocks required

| Block | Implementation | New CSS |
|-------|----------------|---------|
| Address in contact panel | `<address class="department-detail__address">` | Yes — inline normal-style address |
| Multiple labeled phones | `<ul class="department-detail__phone-list">` | Yes — unstyled phone list in panel |

No new section types, cards, or AOP-specific styling. Staff composition, health schools, and service zones use existing `.department-detail__section` + prose lists.

---

## 6. CSS changes

**File:** `internal-pages.css` — two small reusable selectors added:

- `.department-detail__address` — selectable inline address, `font-style: normal`
- `.department-detail__phone-list` — unstyled list for multiple labeled phones in contact panel

Compatible with both `department.html` and `department-aop.html`. No separate stylesheet.

---

## 7. Static pages created

| File | Role |
|------|------|
| `src/pages/department-aop.html` | Uritskaya AOP content instance |
| `src/pages/departments-index.html` | Uritskaya card → `department-aop.html` |
| `src/pages/preview.html` | One new preview entry |

`department.html` unchanged.

---

## 8. Why this is a content variant, not a new template

Both pages share identical HTML shell, CSS class system, and section patterns. Only the number and type of optional sections differ based on source content. No separate template file, no AOP-specific layout, no new component architecture.

---

## 9. Proposed future WordPress fields

| Field | Type | Conditional |
|-------|------|-------------|
| `department_intro` | Rich text | Always |
| `department_address` | Text | Optional |
| `department_hours` | Rich text / repeater | Optional |
| `department_phones` | Repeater (label + number) | Optional |
| `department_sections` | Flexible content repeater | Optional |
| Section: staff_list | List items | When staff data exists |
| Section: health_schools | List items | When schools exist |
| Section: service_zones | List items | When zones exist |
| Section: structure / equipment | List items | When applicable |
| `online_booking_url` | URL | Optional |

---

## 10. Conditional block behavior

One PHP template renders blocks only when field data exists:

- Contact panel appears if any of: address, hours, phones, online booking URL
- Section blocks render from flexible content — no empty placeholders
- Phone list vs single inline phone — same contact panel, different inner markup based on count

---

## 11. Responsive result

Both pages verified at 1440, 1280, 768, 390, 360 — no page-level horizontal overflow. Address and phone labels wrap on mobile. Same visual structure and spacing family.

---

## 12. Accessibility result

- One H1 per page
- Logical H2 section order
- Semantic `<address>` for location
- `tel:` links with visible formatted numbers
- Staff list uses role counts (not invented personal names)
- Section `aria-labelledby` preserved
- Focus styles inherited from shared CSS

---

## 13. Regression result

| Page | Result |
|------|--------|
| `department.html` | Unchanged |
| `departments-index.html` | 18 cards; 2 local links (women + AOP) |
| `index.html` | Pass |
| `content-page.html` | Pass |
| `contacts.html` | Pass |
| `table-page.html` | Pass |

---

## 14. Known limitations

- Only two of 18 departments have local static instances
- SSL cert issue on direct Playwright navigate (workaround: `ignoreHTTPSErrors`)
- Staff list shows role counts, not named individuals (matches source)
- No map or table variants demonstrated yet

---

## 15. Confirmation: one `single-department.php` sufficient?

**Yes.** The two inspected variants (women’s consultation — clinical department with equipment lists; Uritskaya AOP — outpatient clinic with address, multiple phones, staff composition, health schools, service zones) are fully representable with one shared WordPress template using conditional optional blocks. No separate AOP/FAP/diagnostics templates required.
