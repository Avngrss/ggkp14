# Stage 4 — Static Template Classification

Based on live audit of https://ggkp14.by/ (2026-09-16). Homepage remains **`src/pages/index.html`** — not reclassified.

---

## Summary

| Category | Count | Files |
|----------|-------|-------|
| Required distinct templates | **8** | See below |
| Shared layout partials (CSS/HTML blocks) | **1 shell** | Not a standalone page |
| Content variants | **5** | Reuse templates above |
| Rejected separate templates | **4** | Documented in §Rejected |

---

## Required templates

### 1. Internal page shell (shared — not a standalone HTML file)

**Purpose:** Wrap all internal pages with approved header, breadcrumb area, main landmark, optional sidebar widgets, footer.

**Representative source:** Any internal URL.

**Reusable approved components:** topbar, header, sticky behavior, mobile drawer, header search, language switcher, footer, skip link, focus styles.

**New components:** `.breadcrumb`, `.page-header`, `.page-layout`, `.internal-sidebar` (compact widget strip — design decision vs source stacked widgets).

**WordPress mapping:** `header.php`, `footer.php`, new `template-parts/breadcrumb.php`, `template-parts/internal-sidebar.php`.

---

### 2. `src/pages/content-page.html`

| Field | Value |
|-------|-------|
| **Purpose** | Default WordPress page layout: title + rich HTML body |
| **Representative URL** | https://ggkp14.by/zapis-k-vrachu/ |
| **Also used by** | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/`, `/contacts/elektronnye-obrashheniya/`, `/o-nas/administraciya/`, `/informaciya/ideologiya/`, `/dlya-pacientov/`, `/abiturient-2023/`, `/o-nas/vakansii/`, `/palliativnaya-medicinskaya-pomoshhi/`, most «Информация» child pages, empty hubs `/informaciya/`, `/o-nas/` |
| **Required sections** | Breadcrumb, H1, `.page-content` prose (headings, paragraphs, lists, images) |
| **Special components** | None — optional blocks via variants |
| **Responsive risks** | Long H1 wrapping; prose images scaling |
| **Multilingual risks** | Long BY/EN titles; legal text expansion |
| **Accessibility** | One H1; logical H2+; meaningful link text; image alt |
| **WordPress** | `page.php` default |

---

### 3. `src/pages/contacts.html`

| Field | Value |
|-------|-------|
| **Purpose** | Contacts section hub with structured contact blocks + links to subpages |
| **Representative URL** | https://ggkp14.by/contacts/ |
| **Also used by** | `/contacts/goryachaya-liniya/` (if structured similarly — verify at implementation) |
| **Required sections** | Breadcrumb, H1, contact info blocks (address, phones, email), list/grid of child contact links |
| **Reusable components** | `.btn`, info card patterns from homepage |
| **Special components** | `.contact-block`, `.contact-link-list` |
| **Responsive risks** | Phone number groups stacking |
| **Multilingual risks** | Label length in link list |
| **Accessibility** | `tel:` links; heading hierarchy for contact groups |
| **WordPress** | `page.php` + template part OR page template `page-contacts.php` |

**Note:** Many `/contacts/*` children are **table** or **content** variants — only the hub needs this template unless child pages share hub layout.

---

### 4. `src/pages/table-page.html`

| Field | Value |
|-------|-------|
| **Purpose** | Pages dominated by data tables (schedules, territorial lists, phone directories) |
| **Representative URL** | https://ggkp14.by/o-nas/grafik-pryamyh-telefonnyh-linij/ |
| **Also used by** | `/o-nas/territorialnye-uchastki/`, `/o-nas/rezhim-raboty/`, `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/`, `/contacts/kontaktnye-telefony-administracii/`, `/contacts/kontaktnye-telefony-sotrudnikov/`, `/o-nas/grafik-priema-grazhdan-administraciej/` |
| **Required sections** | Breadcrumb, H1, optional intro, `.table-responsive` wrapper(s), one or more `<table>` |
| **Special components** | `.table-responsive`, `.schedule-table`, sticky header option for wide tables |
| **Responsive risks** | **High** — horizontal scroll on mobile; test 390/360 |
| **Multilingual risks** | Column headers length |
| **Accessibility** | `<th scope="col|row">`; caption or aria-label for complex tables |
| **WordPress** | `page.php` + template part `content-table.php` OR custom page template |

---

### 5. `src/pages/departments-index.html`

| Field | Value |
|-------|-------|
| **Purpose** | Grid index of 18 structural departments |
| **Representative URL** | https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/ |
| **Also used by** | Only this index URL |
| **Required sections** | Breadcrumb, H1, `.departments-grid` of linked cards (image + title) |
| **Reusable components** | Homepage `.dept-card` pattern (already in demo) |
| **Special components** | None — reuse homepage department card markup |
| **Responsive risks** | Grid column collapse 4→2→1 |
| **Multilingual risks** | Long department names (BY) |
| **Accessibility** | Card links must include department name; decorative thumbnails `alt=""` if redundant |
| **WordPress** | Page template or archive for `department` CPT |

---

### 6. `src/pages/department.html`

| Field | Value |
|-------|-------|
| **Purpose** | Single structural department detail |
| **Representative URL** | https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/ |
| **Also used by** | All 18 `/o-nas/strukturnye-podrazdeleniya/{slug}/` pages |
| **Required sections** | Breadcrumb (via index), H1, hero/thumbnail optional, prose sections, contact/hours block |
| **Reusable components** | Prose from content-page; optional `.hero__info-card` patterns |
| **Special components** | `.department-meta` (phones, hours) |
| **Responsive risks** | Image gallery stack |
| **Multilingual risks** | Medical terminology length |
| **Accessibility** | One H1; structured lists for «Структура» sections |
| **WordPress** | Single `department` CPT template or child page template |

---

### 7. `src/pages/news-archive.html`

| Field | Value |
|-------|-------|
| **Purpose** | Paginated news category listing |
| **Representative URL** | https://ggkp14.by/category/novosti/ |
| **Also used by** | Category pagination `/category/novosti/page/2/` etc. |
| **Required sections** | Breadcrumb, H1, list of `.news-archive-item` (thumb, title, date, excerpt), pagination |
| **Reusable components** | Homepage `.news-compact` / `.news-featured` DNA |
| **Special components** | `.pagination` |
| **Responsive risks** | Thumbnail + text stack on mobile |
| **Multilingual risks** | Date format locale; «Read more» label |
| **Accessibility** | H1; article list semantics; pagination links |
| **WordPress** | `category.php` or `archive.php` |

---

### 8. `src/pages/news-single.html`

| Field | Value |
|-------|-------|
| **Purpose** | Single news article |
| **Representative URL** | https://ggkp14.by/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/ |
| **Also used by** | All post URLs under root slug |
| **Required sections** | Breadcrumb optional, **H1** article title (fix source H2 issue), date meta, content, optional related posts, optional comments block |
| **Reusable components** | Prose styles |
| **Special components** | `.article-meta`, `.related-posts`, `.comments` (static placeholder) |
| **Responsive risks** | Inline images |
| **Multilingual risks** | Headline length |
| **Accessibility** | **Must use H1** (source uses H2); comment form labels if included |
| **WordPress** | `single.php` |

---

### 9. `src/pages/search-results.html`

| Field | Value |
|-------|-------|
| **Purpose** | Site search results listing |
| **Representative URL** | https://ggkp14.by/?s=диспансerization |
| **Also used by** | Any `/?s={query}` |
| **Required sections** | H1 with query (Russian in redesign), result list, empty state |
| **Reusable components** | News list item pattern |
| **Special components** | `.search-results`, `.search-results__empty` |
| **Responsive risks** | Low |
| **Multilingual risks** | Query + «results for» string |
| **Accessibility** | Announce result count; list semantics |
| **WordPress** | `search.php` |

---

## Content variants (reuse templates — do not create new files)

| Variant | Base template | Example URL | Optional blocks |
|---------|---------------|-------------|-----------------|
| **Section hub** | `content-page.html` | `/informaciya/`, `/o-nas/` | Empty body or auto-generated child link list |
| **Download list** | `content-page.html` | `/platnye-uslugi-2/`, `/dlya-pacientov/` | `.download-list` with PDF links |
| **Embed form** | `content-page.html` | Yandex chief-doctor form URL | `.embed-form` iframe slot + fallback link |
| **Partners / logos** | `content-page.html` | `/nashi-partnery/` | `.partner-grid` (if content restored) |
| **Contacts subpage (prose)** | `content-page.html` | `/adresa-elektronnoj-pochty/` | Standard prose |

---

## Candidate templates rejected as unnecessary

| Proposed template | Reason rejected |
|-------------------|-----------------|
| `services.html` separate from content-page | Paid services uses same shell + PDF list — **download variant** only |
| `form-page.html` separate | Only one Yandex embed found; appeals page is prose — **embed variant** on content-page |
| `useful-links.html` | No dedicated internal page found — homepage + sidebar widget only |
| `official-resources.html` | `/nashi-partnery/` is minimal content-page; homepage strip covers resources in demo |

---

## Template dependency diagram

```
index.html (homepage — frozen)
    │
    └── internal shell (header/footer/breadcrumb)
            ├── content-page.html ── variants: hub, downloads, embed, partners
            ├── contacts.html
            ├── table-page.html
            ├── departments-index.html → department.html
            ├── news-archive.html → news-single.html
            └── search-results.html
```

---

## CSS / JS scope (future stages)

| Template | CSS | JS |
|----------|-----|-----|
| Internal shell | `layout.css`, new `internal.css` | Existing menu/search/a11y |
| content-page | `internal.css`, `base.css` prose | None |
| contacts | `internal.css`, `components.css` | None |
| table-page | `internal.css`, table utilities in `responsive.css` | Optional horizontal scroll hint |
| departments-index | Reuse `homepage.css` dept grid | None |
| department | `internal.css` | None |
| news-archive | `internal.css`, reuse news components | None |
| news-single | `internal.css` | None |
| search-results | `internal.css` | None |

---

## WordPress mapping summary

| Static file | WordPress template |
|-------------|-------------------|
| `index.html` | `front-page.php` |
| Internal shell | `header.php`, `footer.php`, template parts |
| `content-page.html` | `page.php` |
| `contacts.html` | `page-contacts.php` or template part |
| `table-page.html` | `page-table.php` or block pattern |
| `departments-index.html` | Department archive / dedicated page |
| `department.html` | `single-department.php` |
| `news-archive.html` | `category.php` |
| `news-single.html` | `single.php` |
| `search-results.html` | `search.php` |
