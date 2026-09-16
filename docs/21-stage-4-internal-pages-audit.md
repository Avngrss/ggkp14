# Stage 4 — Internal Pages Audit

## 1. Audit scope

Live inspection of **https://ggkp14.by/** internal page structures to determine which distinct static HTML templates are required before WordPress conversion.

**In scope:** navigation hierarchy, representative internal URLs, page layout patterns, tables/forms/downloads, multilingual behavior on source site, accessibility observations, responsive structure at 1440 / 768 / 390.

**Out of scope:** visual redesign, HTML/CSS implementation, WordPress PHP, full-site crawl of every WordPress URL.

**Method:** Cursor Playwright MCP with `ignoreHTTPSErrors: true` (source HTTPS certificate is invalid in strict clients).

**Project context read (not modified):** `docs/00-project-overview.md`, `docs/01-homepage-audit.md`, `docs/02-homepage-redesign-plan.md`, `docs/04-wordpress-mapping.md`, `docs/07-demo-preview-instructions.md`, `docs/20-stage-3i-designer-feedback-fixes.md`, `src/pages/index.html`.

---

## 2. Audit date

**2026-09-16**

---

## 3. Source website

| Item | Value |
|------|-------|
| URL | https://ggkp14.by/ |
| CMS | WordPress (CMS Masters Medical theme) |
| Default language | Russian (`html lang="ru-RU"`) |
| Multilingual plugin | GTranslate (flag icons RU / BY / EN in header) |
| HTTPS note | Certificate common-name mismatch — audit used Playwright `ignoreHTTPSErrors` |
| HTTP note | http://ggkp14.by/ returns **403** maintenance page («Сайт на техническом обслуживании») |

---

## 4. Navigation hierarchy

### 4.1 Topbar (desktop)

| Label | URL | Parent | Type | Works |
|-------|-----|--------|------|-------|
| Режим работы | `/o-nas/rezhim-raboty/` | — | Internal | Yes (200) |
| Горячая линия | `/contacts/goryachaya-liniya/` | — | Internal | Yes |
| Структурные подразделения | `/o-nas/strukturnye-podrazdeleniya/` | — | Internal | Yes |
| Территориальные участки | `/o-nas/teritorialnye-uchastki/` | — | Internal | Yes |
| Вакансии | `/o-nas/vakansii/` | — | Internal | Yes |
| Контакты | `/contacts/` | — | Internal | Yes — duplicates main nav «Контакты» |
| Профсоюз | `/o-nas/profsojuz/` | — | Internal | Yes |
| Обратиться напрямую к Главному врачу | `/home-store/script-src-https-forms-yandex-ru-…/` | — | Internal (form embed) | Yes |
| Language flags (GTranslate) | JS / plugin | — | Plugin UI | Visible — RU, BY, EN flag images |
| Версия сайта для слабовидящих | `#` | — | In-page toggle | Placeholder JS link |

### 4.2 Primary navigation

| Label | URL | Dropdown children (observed) | Type | Works |
|-------|-----|------------------------------|------|-------|
| Главная | `/` | — | Internal | Yes |
| Прямые линии | `/o-nas/grafik-pryamyh-telefonnyh-linij/` | — | Internal | Yes |
| Платные услуги | `/platnye-uslugi-2/` | — | Internal | Yes |
| Информация | `/informaciya/` | See §4.3 | Internal | Yes — hub body mostly empty |
| Контакты | `/contacts/` | See §4.4 | Internal | Yes |
| Абитуриент 2026 | `/abiturient-2023/` | — | Internal | Yes — label/year mismatch |
| Для пациентов | `/dlya-pacientov/` | — | Internal | Yes |

### 4.3 «Информация» dropdown (parent: `/informaciya/`)

| Label | URL |
|-------|-----|
| О нас | `/o-nas/` |
| Администрация | `/o-nas/administraciya/` |
| Работа по противодействию коррупции | `/o-nas/rabota-po-protivodejstviju-korrupcii/` |
| Наши партнеры | `/nashi-partnery/` |
| Санаторий «Серебряные ключи» | `https://sansk.by/` (external) |
| Новости | `/category/novosti/` |
| График приема граждан администрацией | `/o-nas/grafik-priema-grazhdan-administraciej/` |
| Административные процедуры | `/administrativnye-procedury/` |
| Порядок получения выписки из медицинских документов | `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/` |
| Паллиативная медицинская помощь | `/palliativnaya-medicinskaya-pomoshhi/` |
| Идеология | `/informaciya/ideologiya/` |
| Диспансеризация | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` |
| Порядок проведения профилактических осмотров | `/informaciya/poryadok-provedeniya-profilakticheskih/` |
| Помощь в лечении зависимости | `/pomoshh-pri-alkogolizme/` |
| Порядок признания граждан недееспособными | `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` |
| Общественные организации | `/o-nas/obshhestvennye-organizacii/` |
| Профилактика киберпреступлений | `/kiberprestupnost/` |
| Противодействие экстремизму | `/protivodejstvie-ekstremizmu/` |
| Меры поддержки по реализации Указа 631 | `/informaciya/mery-po-realizacii-ukaza-631/` |

### 4.4 «Контакты» dropdown (parent: `/contacts/`)

| Label | URL |
|-------|-----|
| Контактная информация | `/contacts/` (same as parent) |
| Горячая линия | `/contacts/goryachaya-liniya/` |
| Электронные обращения | `/contacts/elektronnye-obrashheniya/` |
| Контактные телефоны администрации | `/contacts/kontaktnye-telefony-administracii/` |
| Контактные телефоны сотрудников | `/contacts/kontaktnye-telefony-sotrudnikov/` |
| Режим работы и контактные телефоны структурных подразделений | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` |
| Адреса электронной почты | `/adresa-elektronnoj-pochty/` |

### 4.5 Homepage quick actions / hero (representative)

| Label | URL | Type |
|-------|-----|------|
| Запись к врачу | `/zapis-k-vrachu/` | Internal |
| Работа с обращениями граждан | `/contacts/elektronnye-obrashheniya/` | Internal |
| Заказ выписки | `/zakaz-vypiski-iz-medicinskih-dokumentov/` | Internal |
| Диспансеризация | `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Internal — **duplicate path** of informaciya child |
| Личный кабинет | `https://www.tutmed.by/…` | External |
| Telegram | `https://t.me/ggkp14` | External |

### 4.6 Structural departments (homepage grid → 18 child pages)

All under `/o-nas/strukturnye-podrazdeleniya/{slug}/` — e.g. `/zhenskaya-konsultaciya/`, `/hirurgicheskoe-otdelenie/`, `/urickaya-aop/`, FAP slugs, etc. Index: `/o-nas/strukturnye-podrazdeleniya/`.

### 4.7 News

| Label | URL |
|-------|-----|
| Category archive | `/category/novosti/` |
| Single posts | `/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/` (example) |

### 4.8 Footer

Minimal footer on inspected pages — copyright strip; no rich footer nav observed (unlike approved static demo footer).

---

## 5. Internal URL inventory (representative)

| Page title | URL | Nav source | Status | Breadcrumb (if any) | Main content type | Sidebar widgets | Forms | Tables | Downloads | Images | Pagination | Template pattern |
|------------|-----|------------|--------|----------------------|---------------------|-----------------|-------|--------|-----------|--------|------------|------------------|
| Информация | `/informaciya/` | Main nav | 200 | Главная » Информация | Empty section hub | Search, hours, links | 2 (search widgets) | 0 | 0 | 0 | No | Content hub variant |
| Контакты | `/contacts/` | Main nav | 200 | — | Contact hub + H2 sections | Widgets below | 2 | 0 | 0 | 0 | No | Contacts hub variant |
| Платные услуги | `/platnye-uslugi-2/` | Main nav | 200 | Главная » Платные услуги | Rich text + PDF links | Widgets below | 2 | 0 | 4 PDF | 0 | No | Content + downloads |
| График прямых линий | `/o-nas/grafik-pryamyh-telefonnyh-linij/` | Main nav | 200 | Главная » О нас » … | Multiple schedule tables | Widgets below | 2 | 3 | 0 | 0 | No | Table page |
| Структурные подразделения | `/o-nas/strukturnye-podrazdeleniya/` | Topbar | 200 | Главная » О нас » … | 18-card image grid | Widgets below | 2 | 0 | 0 | 28 | No | Departments index |
| Женская консультация | `…/zhenskaya-konsultaciya/` | Dept grid | 200 | … » Женская консультация | Dept description + images | Widgets below | 2 | 0 | 0 | 10 | No | Department single |
| Новости (archive) | `/category/novosti/` | Nav dropdown | 200 | Главная » Новости | Post list (10/page) | Widgets below | 2 | 0 | 0 | 22 | Yes (21 pages) | News archive |
| Single news | `/igra-detej-s-ognjom-…/` | News list | 200 | — | Article body | Widgets below | 3 (incl. comments) | 0 | 0 | 17 | No | News single |
| Территориальные участки | `/o-nas/territorialnye-uchastki/` | Topbar | 200 | Главная » О нас » … | Large assignment table | Widgets below | 2 | 1 | 0 | 10 | No | Table page |
| Наши партнеры | `/nashi-partnery/` | Nav dropdown | 200 | Главная » Наши партнеры | Minimal/empty body | Widgets below | 2 | 0 | 0 | 0 | No | Content variant |
| Электронные обращения | `/contacts/elektronnye-obrashheniya/` | Nav / quick action | 200 | Главная » Контакты » … | Legal text + schedule headings | Widgets below | 2 | 0 | 0 | 0 | No | Content page |
| Режим работы (structural phones) | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` | Contacts dropdown | 200 | … | Wide contact table | Widgets below | 2 | 1 | 0 | 0 | No | Table page |
| Режим работы | `/o-nas/rezhim-raboty/` | Topbar | 200 | Главная » О нас » … | Multiple tables | Widgets below | 2 | 3 | 0 | 0 | No | Table page |
| Запись к врачу | `/zapis-k-vrachu/` | Hero / quick action | 200 | Главная » Запись к врачу | Instructional content | Widgets below | 2 | 0 | 0 | 0 | No | Content page |
| Диспансеризация | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Nav dropdown | 200 | — | Informational article | Widgets below | 2 | 0 | 0 | 0 | No | Content page |
| Для пациентов | `/dlya-pacientov/` | Main nav | 200 | — | Legal text + download CTA | Widgets below | 2 | 0 | 1+ | 0 | No | Content + download |
| Обратиться к Главному врачу | `/home-store/script-src-https-forms-yandex-ru-…/` | Topbar | 200 | — | Yandex Form embed + reCAPTCHA iframe | Widgets below | 2+ | 0 | 0 | 0 | No | Embed form variant |
| Search results | `/?s=диспансеризация` | Search widget | 200 | — | 3 result entries | Widgets below | 2 | 0 | 0 | 0 | No | Search results |

**Sidebar widgets (all inspected internal pages):** «Поиск по сайту», «Время работы», «Полезные ссылки» — stacked **below** main content on source site (not a right column on desktop at 1440).

---

## 6. Broken, redirected, placeholder, and duplicate links

| Issue | URL / item | Notes |
|-------|-----------|-------|
| Broken (HTTP) | http://ggkp14.by/ | 403 maintenance page |
| Certificate | https://ggkp14.by/ | ERR_CERT_COMMON_NAME_INVALID without ignoreHTTPSErrors |
| Placeholder | «Версия для слабовидящих» `#` | JS toggle, not a page |
| Duplicate destination | Диспансеризация | `/informaciya/poryadok-provedeniya-dispanserizacii-…/` and `/poryadok-provedeniya-dispanserizacii-…/` |
| Duplicate label | Контакты | Topbar + main nav |
| Duplicate label | Горячая линия | Topbar + contacts dropdown |
| Label mismatch | Абитуриент 2026 | URL slug still `/abiturient-2023/` |
| Odd slug | Yandex form page | Long `/home-store/script-src-https-forms-yandex-ru-…/` URL |
| Empty hub | `/informaciya/`, `/o-nas/` | H1 + breadcrumb; almost no body content |
| Minimal page | `/nashi-partnery/` | H1 only; partner content likely missing or loaded elsewhere |
| External only confirmed | sansk.by, tutmed.by, t.me, pomogut.by | Not audited beyond link type |

---

## 7. Representative pages inspected

1. Generic informational — `/informaciya/`, `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/`, `/zapis-k-vrachu/`, `/dlya-pacientov/`
2. Contacts hub — `/contacts/`
3. Paid services — `/platnye-uslugi-2/`
4. Direct lines — `/o-nas/grafik-pryamyh-telefonnyh-linij/`
5. Departments index — `/o-nas/strukturnye-podrazdeleniya/`
6. Single department — `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/`
7. News archive — `/category/novosti/`
8. Single news — `/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/`
9. Territorial areas — `/o-nas/territorialnye-uchastki/`
10. Partners — `/nashi-partnery/`
11. Electronic appeals — `/contacts/elektronnye-obrashheniya/`
12. Table-heavy contacts — `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/`, `/o-nas/rezhim-raboty/`
13. Search results — `/?s=диспансеризация`
14. Yandex embed form — `/home-store/script-src-https-forms-yandex-ru-…/`

**Not found as distinct page type:** standalone «Полезные ссылки» internal page (only homepage carousel + sidebar widget). No separate «official resources» page beyond `/nashi-partnery/` (minimal).

---

## 8. Actual page structure by type

### Shared internal shell (all types)

Display order on source site:

1. Topbar (desktop) with GTranslate flags + service links
2. Main header with logo + primary nav + search icon + mobile menu trigger
3. Breadcrumb (most inner pages)
4. Page title **H1**
5. Main content column (full width — `content_wrap fullwidth`)
6. Sidebar **widgets block below content** (not right rail): search form, hours, useful links
7. Minimal footer / back-to-top

### A. Generic content page

**Example:** `/zapis-k-vrachu/`, `/informaciya/poryadok-provedeniya-dispanserizacii-…/`

- H1 title
- Breadcrumb
- WordPress page body: headings, paragraphs, lists, occasional images
- Optional PDF download links (variant)
- Widgets below

### B. Section hub (content variant)

**Example:** `/informaciya/`, `/o-nas/`

- Same shell; body essentially empty — navigation-only landing

### C. Contacts hub

**Example:** `/contacts/`

- H1 «Контакты»
- H2 «Контактная информация:»
- Structured text blocks (address, phones, email)
- Links to child contact pages

### D. Table-heavy page

**Example:** `/o-nas/grafik-pryamyh-telefonnyh-linij/`, `/o-nas/territorialnye-uchastki/`

- H1 + breadcrumb
- One or more HTML `<table>` elements (schedules, territorial assignments)
- Multiple H2/H3/H4 section headings above/between tables
- Mobile risk: wide tables overflow horizontally

### E. Departments index

**Example:** `/o-nas/strukturnye-podrazdeleniya/`

- H1
- Grid of 18 `article.cmsmasters_project_grid` cards with thumbnail + H3 title link
- Full-width grid layout

### F. Department single

**Example:** `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/`

- H1 department name
- Breadcrumb through index
- Rich text, H3/H4 structure lists, multiple images
- Phone numbers and hours inline

### G. News archive

**Example:** `/category/novosti/`

- H1 «Рубрика: Новости»
- List of posts: thumbnail, H2 title, excerpt, date
- Pagination (21 pages observed)
- 10 posts per page

### H. News single

**Example:** `/igra-detej-s-ognjom-…/`

- **Article title is H2, not H1** (0 H1 on page — accessibility issue on source)
- Body content with images
- «More posts» related block
- Comment form («Leave a Reply»)
- Meta/date in theme markup

### I. Search results

**Example:** `/?s=диспансеризация`

- H1 English: «3 search results for: диспансerization»
- Short list of matching pages/posts
- No pagination for small result sets

### J. Embed form page

**Example:** Yandex form chief-doctor page

- H1 «Обратиться напрямую к Главному врачу»
- Embedded iframe (Yandex Forms + Google reCAPTCHA)
- Same widget block below

---

## 9. Shared components found (vs approved homepage demo)

| Source component | Approved demo equivalent | Reuse for internal pages |
|------------------|-------------------------|---------------------------|
| Topbar | `.topbar` + lang switcher | Reuse |
| Header / sticky | `.site-header` | Reuse |
| Mobile drawer | `.mobile-drawer` | Reuse |
| Header search | `.header-search-panel` | Reuse |
| Language switcher | RU/BY/EN (static) | Reuse — match GTranslate behavior later |
| Breadcrumb | **Not yet in demo** | **New internal component** |
| Page title H1 | Hero H1 only on homepage | **New `.page-header` block** |
| Content area | — | **New `.page-content`** |
| Sidebar widgets | Moved into homepage sections | **Decision needed:** restore compact widget strip on internal pages OR omit per redesign |
| Footer | `.site-footer` (rich) | Reuse — demo footer is richer than live site |
| Buttons / cards | `.btn`, `.info-card`, dept cards | Partial reuse |
| Accessibility base | Stage 3I foundation | Extend to inner templates |

---

## 10. Tables, forms, downloads, and special content

| Content type | Where found | Notes |
|--------------|-------------|-------|
| HTML tables | Direct lines (3), territorial (1), schedule hours (3), structural phones (1) | Often no `<th>` in some tables — a11y risk |
| Search forms | Sidebar widget + header | GET to `/?s=` |
| Comment form | News single | WordPress `#commentform` |
| Yandex iframe | Chief doctor form page | External embed |
| PDF downloads | Paid services (4), For patients | Direct `.pdf` URLs under `/wp-content/uploads/` |
| Pagination | News archive | Numeric 1…21 |
| Department grid | Departments index | Custom post type «project» in theme |
| External links | Partners, hero, sidebar | tutmed.by, t.me, sansk.by, etc. |

---

## 11. Multilingual observations

| Observation | Detail |
|-------------|--------|
| Live content language | Russian only on inspected pages |
| `html lang` | `ru-RU` |
| GTranslate | Flag images for `ru`, `be`, `en` in header (`wp-content/plugins/gtranslate/flags/24/`) |
| `hreflang` alternates | **None** in `<head>` on inspected pages |
| URL structure | No `/be/` or `/en/` path prefix observed — plugin likely client-side translation |
| Search UI | English strings («3 search results for», «Read More») mixed with Russian |
| Static demo readiness | Stage 3I RU/BY/EN switcher aligns with future need; real translations not on source |
| Future template requirement | Flexible nav/button width, breadcrumb wrapping, table header localization, search results heading in RU |

---

## 12. Accessibility observations

| Area | Source site finding | Future static template requirement |
|------|---------------------|-----------------------------------|
| Heading hierarchy | News single uses **H2** for article title, **no H1** | One H1 per page in redesign |
| Section hubs | H1 only, empty content | Ensure skip target still meaningful |
| Tables | Some tables lack `<th>` | Use `<th scope>` in static demos |
| Images | Logo has alt; department cards use images | Maintain descriptive alt on content images |
| Forms | Search inputs present; comment form on news | Labels required (source sidebar search uses H3 as widget title) |
| Language | Mixed EN/RU in search/pagination UI | Consistent RU primary |
| Keyboard | Theme hamburger / search use JS | Preserve focus management from demo |
| Documents | PDF links have descriptive text on paid services | Download link purpose clear |
| iframes | Yandex form embed | `title` attribute on iframe required in redesign |

**Not claimed:** WCAG compliance of source site.

---

## 13. Responsive observations

| Template | 1440 desktop | 768 tablet | 390 mobile |
|----------|--------------|------------|------------|
| Generic content | Full-width content + widgets stacked below | Topbar hidden; burger nav | No horizontal overflow detected on `/informaciya/` |
| Contacts | Same shell | Same | No overflow |
| Table pages | Tables full width — may extend | Tables compress; horizontal scroll likely on direct lines | Overflow risk — screenshot captured |
| Departments index | Multi-column card grid | Grid reduces columns | Single/double column stack |
| Department single | Text + images stack in theme | Readable | Compact |
| News archive | List with thumbnails | Stack | Compact list |
| News single | Article + widgets below | Stack | Long headings wrap |
| Search results | Simple list | Stack | Stack |

**Navigation:** Mobile uses responsive top nav icon + slide menu (CMS Masters theme pattern).

---

## 14. Audit limitations

- HTTPS certificate required Playwright bypass — production users may see browser warnings.
- HTTP entry point shows maintenance — do not use for audit baseline.
- Not every WordPress URL crawled — inventory is navigation-driven and representative.
- GTranslate behavior (BY/EN) not fully exercised — plugin may machine-translate client-side.
- Dynamic/carousel content on homepage not re-audited (Stage 1/3 cover homepage).
- Internal page **visual redesign** intentionally excluded — structure only.
- Some hub pages (`/informaciya/`, `/nashi-partnery/`) appear content-empty — may be CMS content not rendered in audit snapshot.
- Comment form and Yandex iframe not interactively submitted.

---

## 15. Evidence and screenshot index

All screenshots: `docs/audit/stage-4/`

| File | Page | Viewport |
|------|------|----------|
| `generic-content-desktop-1440.png` | `/informaciya/` | 1440 |
| `generic-content-tablet-768.png` | `/informaciya/` | 768 |
| `generic-content-mobile-390.png` | `/informaciya/` | 390 |
| `contacts-desktop-1440.png` | `/contacts/` | 1440 |
| `contacts-mobile-390.png` | `/contacts/` | 390 |
| `paid-services-desktop-1440.png` | `/platnye-uslugi-2/` | 1440 |
| `direct-lines-desktop-1440.png` | Direct lines | 1440 |
| `direct-lines-tablet-768.png` | Direct lines | 768 |
| `table-page-desktop-1440.png` | Structural phones table | 1440 |
| `table-page-mobile-390.png` | Direct lines (table) | 390 |
| `departments-index-desktop-1440.png` | Departments index | 1440 |
| `department-desktop-1440.png` | Single department | 1440 |
| `department-mobile-390.png` | Single department | 390 |
| `news-archive-desktop-1440.png` | News archive | 1440 |
| `news-archive-mobile-390.png` | News archive | 390 |
| `news-single-desktop-1440.png` | Single news | 1440 |
| `news-single-mobile-390.png` | Single news | 390 |
| `territorial-desktop-1440.png` | Territorial areas | 1440 |
| `partners-desktop-1440.png` | Partners | 1440 |
| `form-appeals-desktop-1440.png` | Electronic appeals | 1440 |
| `schedule-hours-desktop-1440.png` | Schedule hours | 1440 |
| `appointment-desktop-1440.png` | Appointment | 1440 |
| `search-results-desktop-1440.png` | Search results | 1440 |
| `table-contacts-desktop-1440.png` | Structural contact phones | 1440 |
| `yandex-form-desktop-1440.png` | Yandex embed form | 1440 |
