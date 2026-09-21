# Stage 6B — Static Page Coverage and Gap Analysis

Дата: 2026-09-21

Evidence: repository inspection (`src/pages/`, shared CSS/JS, docs 07/37–40/39), automated href inventory across production HTML, and source-site fetches via HTTP (`http://ggkp14.by/...`) where Playwright MCP could not load the site (TLS certificate error). No production HTML, CSS, or JavaScript was modified in this stage.

---

## 1. Audit Scope

Compare live GGKP14 public structure with the approved static baseline (12 production templates + dev `preview.html`). Classify coverage, navigation gaps, missing templates vs missing content instances, UI states, and deferrals before WordPress work.

**In scope:** page types, nav destinations, template reuse, static demo limitations documented in Stages 5A–6A.1.

**Out of scope:** implementation, link changes, WordPress specs, new npm/Playwright installs, full sitemap crawl of every historical news URL.

---

## 2. Repository Pages Reviewed

| File | Role | Source mapping (where documented) |
|------|------|-----------------------------------|
| `index.html` | Homepage | Live homepage structure |
| `content-page.html` | Generic internal prose | `https://ggkp14.by/zapis-k-vrachu/` (Stage 5A) |
| `contacts.html` | Contacts hub + map | Live `/contacts/` (Stage 5B) |
| `table-page.html` | Multi-table schedules | `/o-nas/grafik-pryamyh-telefonnyh-linij/` (Stage 5C) |
| `departments-index.html` | 18 department cards | `/o-nas/strukturnye-podrazdeleniya/` (Stage 5E) |
| `department.html` | Polyclinic department detail | `/.../zhenskaya-konsultaciya/` (Stage 5F) |
| `department-aop.html` | AOP / rural variant | `/.../urickaya-aop/` (Stage 5F.1) |
| `news-archive.html` | News archive + pagination UI | `/category/novosti/` (Stage 5G) |
| `news-single.html` | Single with featured image | Representative post (Stage 5H) |
| `news-single-video.html` | Single with video embed slot | Variant (Stage 5H.1) |
| `news-single-no-media.html` | Text-only single | Variant (Stage 5H.1) |
| `search-results.html` | Search results demo | Live `?s=dispanserizaciya` (Stage 5I) |
| `paid-services.html` | Paid services landing | `/platnye-uslugi-2/` (Stage 6C.1) |
| `information.html` | Information landing hub | `/informaciya/` (Stage 6C.2) |
| `about.html` | About landing hub | `/o-nas/` (Stage 6C.3) |
| `applicant-2023.html` | Applicant information | `/abiturient-2023/` (Stage 6C.4) |
| `adult-dispensary-examinations.html` | Adult dispensary examinations | `/informaciya/poryadok-provedeniya-dispansernyh-osmotrov-vzroslogo-naseleniya/` (Stage 6D.1) |
| `preview.html` | Dev navigator only | Excluded from Pages deploy |

**Shared assets:** `src/css/` (tokens, base, layout, components, `homepage.css`, `internal-pages.css`, responsive), `src/js/main.js`, `menu.js`, `accessibility.js`.

**Docs reviewed:** `docs/07-demo-preview-instructions.md`, `docs/37-stage-6a-static-site-regression-audit.md`, `docs/38-static-site-known-limitations.md`, `docs/39-wordpress-readiness-gaps.md`, `docs/40-stage-6a1-encoding-fix.md`, Stage 5 implementation notes (5A–5I).

---

## 3. Source Website Areas Reviewed

| Area | URL (fetched) | Notes |
|------|---------------|--------|
| Homepage | `http://ggkp14.by/` | Hero, phones, 18 departments, news teasers, quick actions |
| Departments index | `/o-nas/strukturnye-podrazdeleniya/` | 18 cards (matches static index) |
| Sample departments | `/.../zhenskaya-konsultaciya/`, `/.../hirurgicheskoe-otdelenie/`, `/.../urickaya-aop/` | Same prose block pattern; AOP adds address/hours |
| News archive | `/category/novosti/` | List + pagination (WordPress) |
| Search (hits) | `/?s=dispanserizaciya` | Single result on live site |
| Search (empty) | `/?s=zzzznonexistentquery12345` | English no-results message |
| About hub | `/o-nas/` | Link hub to phone schedule |
| Administration | `/o-nas/administraciya/` | Staff blocks with phones/email |
| Working hours | `/o-nas/rezhim-raboty/` | Multi-section hours + emergency guidance |
| Territorial districts | `/o-nas/territorialnye-uchastki/` | Very long district roster (headings + addresses) |
| Phone schedule | `/o-nas/grafik-pryamyh-telefonnyh-linij/` | Multiple tables (matches static `table-page.html`) |
| Vacancies | `/o-nas/vakansii/` | Short prose + HR phone |
| Information hub | `/informaciya/` | Main column: four teaser cards (three `/informaciya/…` articles + news category). Landing now local: `information.html` (Stage 6C.2). |
| Paid services | `/platnye-uslugi-2/` | Prose + four PDF downloads (E-POS notice). Landing now local: `paid-services.html` (Stage 6C.1). |
| Contacts hub | `/contacts/` | Phones, address (static `contacts.html` adds map + sub-links) |
| Electronic appeals | `/contacts/elektronnye-obrashheniya/` | Legal prose + external `обращения.бел` |
| Admin phone table | `/contacts/kontaktnye-telefony-administracii/` | Simple 3-row table |
| Booking | `/zapis-k-vrachu/` | Long prose + online booking instructions |

**Playwright MCP:** navigation to `https://ggkp14.by/` and `http://ggkp14.by/` failed with `net::ERR_CERT_COMMON_NAME_INVALID`. Interactive nav expansion, mobile menu on live site, and embedded widgets were **not** inspected in-browser.

---

## 4. Complete Page Coverage Matrix

Classification key: **C** covered by existing static page · **I** covered by template, missing instance · **P** partially covered · **N** genuinely new template (distinct layout) · **E** external / stay external · **O** obsolete / product decision · **D** defer to WordPress (low static QA value).

### 4.1 Production templates (cross-check)

| Source title (representative) | Source URL | Class | Local equivalent | Evidence |
|------------------------------|------------|-------|------------------|----------|
| Главная | `/` | **C** | `index.html` | Full homepage template; local nav uses `.html` siblings |
| Запись к врачу | `/zapis-k-vrachu/` | **C** | `content-page.html` | Stage 5A source URL; `data-source-path` on CTA |
| Контакты | `/contacts/` | **C** | `contacts.html` | Stage 5B; map iframe + phone blocks |
| График прямых телефонных линий | `/o-nas/grafik-pryamyh-telefonnyh-linij/` | **C** | `table-page.html` | Multi-table layout audited Stage 5C/6A |
| Структурные подразделения (index) | `/o-nas/strukturnye-podrazdeleniya/` | **C** | `departments-index.html` | 18 cards with `data-dept-path` |
| Женская консультация | `/.../zhenskaya-konsultaciya/` | **C** | `department.html` | Local card + `data-source-path` |
| Урицкая АОП | `/.../urickaya-aop/` | **C** | `department-aop.html` | AOP variant validated 5F.1 |
| Рубрика: Новости (archive) | `/category/novosti/` | **C** | `news-archive.html` | 10 cards; pagination UI non-functional (38) |
| News single (image / video / text) | various posts | **C** | `news-single*.html` (3 files) | Three structural variants, not three URLs |
| Search results (sample query) | `/?s=dispanserizaciya` | **P** | `search-results.html` | Static shows 3 results; live showed 1 at fetch time — demo query set in 5I |
| Search no-results | `/?s=…` (zero hits) | **I** | — (pattern in docs only) | Live shows “0 search results…”; no visible static page (35, 38) |

### 4.2 Main & secondary navigation destinations (not yet local)

| Source title | Source URL | Nav origin | Purpose | Class | Local equivalent | Recommended action |
|--------------|------------|------------|---------|-------|------------------|-------------------|
| Платные услуги | `/platnye-uslugi-2/` | Main nav | E-POS notice + four price-list PDF downloads | **C** (Stage 6C.1) | `paid-services.html` | Landing implemented from `content-page.html` + `.prose-document-link`. PDFs remain on `ggkp14.by/wp-content/uploads/…` (not local child pages). |
| Информация (hub) | `/informaciya/` | Main nav dropdown | Index of four destinations | **C** (Stage 6C.2) | `information.html` using `dept-index` cards | Landing implemented. Three article children stay on the source site. «Новости / Объявления» points at existing `news-archive.html`. |
| О нас (hub) | `/o-nas/` | Main nav dropdown | Eight section cards | **C** (Stage 6C.3) | `about.html` using `dept-index` cards | Landing implemented. Local children: departments index, phone-line schedule. Six children stay on the source site. |
| Администрация | `/o-nas/administraciya/` | Main nav dropdown | Leadership contacts | **I** | `content-page.html` (+ optional card blocks) | **Content instance**; staff blocks resemble homepage `contact-card` but CSS is homepage-scoped — reuse prose or extend internal CSS in implementation stage |
| Режим работы | `/o-nas/rezhim-raboty/` | Topbar, nav, footer | Hours + emergency text | **I** | `content-page.html` | **Content instance** (long structured sections) |
| Территориальные участки | `/o-nas/territorialnye-uchastki/` | Topbar | District–doctor–address roster | **P** | — | **Product/layout decision:** distinct long roster; may need dedicated territorial layout **or** long-form `content-page` + scroll QA — not the same as `table-page.html` (schedule tables) |
| Вакансии | `/o-nas/vakansii/` | Topbar, footer | HR contact | **I** | `content-page.html` | **Content instance** |
| Абитуриент | `/abiturient-2023/` | Main nav | Long-form applicant guidance for 2026, plus three external college/university sites | **C** (Stage 6C.4) | `applicant-2023.html` using the content-page prose pattern | Landing implemented. Slug remains `abiturient-2023`. No child pages or files on the landing. |
| Горячая линия | `/contacts/goryachaya-liniya/` | Topbar, contacts dropdown | Hotline info | **I** | `content-page.html` or partial in `contacts.html` | **Instance** or expand contacts hub |
| Электронные обращения | `/contacts/elektronnye-obrashheniya/` | Nav, footer, hero CTAs | Legal + link to national portal | **I** | `content-page.html` | **Instance**; keep `https://обращения.бел` **external** |
| Адреса электронной почты | `/adresa-elektronnoj-pochty/` | Contacts dropdown | Email directory | **I** | `content-page.html` or `table-page.html` | **Instance** (table if source is tabular) |
| Контактные телефоны администрации | `/contacts/kontaktnye-telefony-administracii/` | Contacts page body | Admin phone table | **I** | `table-page.html` | **Table template instance** (small table) |
| Контактные телефоны сотрудников | `/contacts/kontaktnye-telefony-sotrudnikov/` | Contacts page | Staff phone list | **I** | `table-page.html` | **Table instance** (confirm structure on implementation) |
| Режим работы и телефоны подразделений | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` | Contacts page | Combined reference | **I** | `table-page.html` / `content-page.html` | **Instance** after source layout check |
| Dispanserization article | `/poryadok-provedeniya-dispanserizacii-…/` | Homepage quick action, footer | Public info | **I** | `content-page.html` | **Instance** |
| Other homepage quick actions | `/zakaz-vypiski-…/`, `/medicinskij-turizm-2/`, `/lichnye-obrashheniya-grazhdan/`, `/seksologicheskaya-pomoshh/`, etc. | Homepage grid | Service information | **I** or **E** | `content-page.html` | **Instances** for in-site policy pages; **E** for third-party-only flows |
| Information subpages | `/informaciya/...` | Information hub | Medical policy prose | **I** | `content-page.html` | **Instances** per article |

### 4.3 Structural departments (16 without local detail)

All listed on `departments-index.html` with `href="https://ggkp14.by/..."` except **Женская консультация** → `department.html` and **Урицкая АОП** → `department-aop.html`.

| Class | Count | Template | Recommended action |
|-------|-------|----------|-------------------|
| **I** | 16 | `department.html` (polyclinic) or `department-aop.html` (AOP/FAP) | Add **content instances** only; copy structure from existing detail pages with source prose — **no new template** (hirurgicheskoe and urickaya source pages share same block types as samples fetched) |

### 4.4 News posts

| Class | Coverage |
|-------|----------|
| **C** | Archive layout + 3 local singles demonstrating media variants |
| **I** | 7 of 10 archive cards still link to live ggkp14.by posts |
| **D** | Full news corpus, dynamic pagination, category filters — WordPress loops (39) |

### 4.5 External / stay external

| Destination | Reason |
|-------------|--------|
| `https://www.tutmed.by/...` | Online booking system (content-page references) |
| `https://t.me/ggkp14` | Telegram |
| `https://обращения.бел` (via appeals page) | National government portal |
| `http://minzdrav.gov.by/`, `http://gomel-region.by/`, `https://president.gov.by/`, `https://pravo.by/`, `https://fpb.1prof.by/`, `https://24health.by/`, `https://pomogut.by/`, `https://gomeluzo.by/` | Partner / government resources (footer homepage) |
| Individual news URLs not modeled locally | Acceptable as **E** until instances added or **D** at WP migration |

---

## 5. Missing Static Templates

**Confirmed genuinely distinct layouts not yet in repo:** **none mandatory** before baseline completion, based on evidence reviewed.

| Candidate | Verdict | Rationale |
|-----------|---------|-----------|
| Territorial districts page | **Open decision (P)** | Information architecture differs from `table-page.html` (schedule) and `department.html`; may be implemented as long-form `content-page.html` with typography/scroll QA, or a dedicated roster template if side-by-side review shows layout cannot match approved system without new section patterns |
| Information hub | Reuse **departments-index** or **content-page** | Source shows short teaser list |
| Administration staff page | **content-page** | Repeated heading/contact blocks |
| Paid services | **content-page** | Prose + download links |
| Search no-results | **Not a template** | Variant body on `search-results.html` |

Do **not** add a new template per department or per news story.

---

## 6. Missing Content Instances

Prioritized groups (public nav first). The Stage 6D.4 menu audit in `docs/42-menu-coverage-and-dropdown-usability.md` replaces the order in §10.

1. **Main nav landings from Stage 6B are now local** (`platnye-uslugi-2/`, `/informaciya/`, `/o-nas/`, `/abiturient-2023/`). Remaining work is child instances, not these four landings.
2. **Still external in the static header or topbar:** режим работы, горячая линия, администрация, электронные обращения, адреса e-mail, вакансии, территориальные участки.
3. **Source primary item absent from the static header:** `/dlya-pacientov/`.
4. **Contacts cluster:** admin phones, staff phones, department hours and phones, plus the appeals and email pages above.
5. **Information children named in the source menu** but not yet local, including dispensarization, preventive examinations, and incapacity. The adult dispensary examinations article is already local and is a different URL.
6. **About children** still external, including corruption, union, partners, and the chief-doctor form from the source top bar.
7. **Departments:** 16 detail pages (group: polyclinic vs AOP template)
8. **News:** the archive is local but is not in the header menu; remaining archive cards are optional.
9. **Search:** no-results variant on existing `search-results.html`

---

## 7. Missing UI And Content States

| State | Static coverage | Priority | Separate page vs variant |
|-------|-----------------|----------|----------------------------|
| Featured image news | **C** | — | `news-single.html` |
| Video embed news | **C** (placeholder slot) | Low | `news-single-video.html` |
| No featured media | **C** | — | `news-single-no-media.html` |
| Long-form prose | **C** | — | `content-page.html` / department bodies |
| Wide + narrow tables | **C** | — | `table-page.html` + horizontal scroll wrapper (6A) |
| Embedded map | **C** | — | `contacts.html` iframe |
| Empty optional sections | Partial | Low | Stress-test during instance work |
| Long titles / nav labels | Partial | Medium | Regression pass when adding RU copy |
| Search with results | **C** | — | Fixed demo query |
| Search no results | **Missing** | Medium | **Controlled variant** on `search-results.html` (documented 5I, not visible) |
| Archive pagination active / page 2 | **Missing behavior** | Low | Visual only; **D** functional pagination to WP |
| Missing images / placeholders | **C** | — | Placeholder SVGs |
| Form validation UI (booking) | **Not on static** | **D** | Live booking is tutmed external |
| Language BY / EN | **Placeholder `#`** | **D** | WP i18n (38, 39) |
| Live search `?s=` param | **Missing behavior** | **D** | WP `search.php` |

---

## 8. Navigation Gaps

### 8.1 Valid local links (production)

Unique sibling `.html` targets now also include `paid-services.html`, `information.html`, `about.html`, `applicant-2023.html`, `search-results.html`, and `adult-dispensary-examinations.html`, in addition to the earlier templates (`index.html`, `content-page.html`, `contacts.html`, `table-page.html`, `departments-index.html`, `department.html`, `department-aop.html`, `news-archive.html`, `news-single.html`, `news-single-video.html`, `news-single-no-media.html`). The full header, drawer, topbar, and footer inventory is in `docs/42-menu-coverage-and-dropdown-usability.md`.

Forms: `action="search-results.html"` with `name="s"` on search inputs (Stage 6A).

GitHub Pages root: `dist/index.html` rewrites internal links to `pages/*.html` — **unchanged in this audit**.

### 8.2 Temporary links to source website

**64 unique external `https://ggkp14.by/...` (and partner) URLs** appear in production HTML (inventory from all `src/pages/*.html` except `preview.html`). High-traffic clusters:

- Shared shell (every page): main nav items not in local map, topbar except departments/contacts
- `departments-index.html`: 16 department cards
- `news-archive.html`: 7 post cards
- `index.html`: homepage department carousel (except local women's dept if linked), news teasers, quick actions, footer subsection links

### 8.3 Placeholder links

- Language switcher: `href="#"` (92 occurrences across production pages — RU active, BY/EN placeholders)

### 8.4 Broken / unresolved

- None identified in static **file-to-file** links among the 12 production templates.
- Live news slug probes (`/igra-detej-.../`, long SEO slug) returned **404** via fetch — static uses local files instead; not a static demo defect.

### 8.5 Not represented locally (important nav)

Stage 6D.4: the static top-level items Главная, Прямые линии, Платные услуги, Информация, Контакты, and Абитуриент 2026 are local. Dropdown and topbar children that remain on the source site, plus source items missing from this header, are listed in `docs/42`. Desktop and mobile do not use different local targets for the same label. `Адреса e-mail` is desktop-dropdown only. `Структурные подразделения` is in the topbar on every page and in the mobile drawer only on the three department templates.

---

## 9. External And Deferred Destinations

**Remain external in static demo:** national portals, Telegram, tutmed booking, footer partner ministries, and any URL whose primary action is off-site.

**Intentionally deferred to WordPress:** dynamic search, archive pagination, full news corpus, multilingual slugs, form processing, CPT-driven department index, media library, SEO metadata per URL (see `docs/39-wordpress-readiness-gaps.md`).

**Obsolete / product decision:** the public URL is still `/abiturient-2023/` while the visible heading and body refer to 2026. The static page keeps both as published. No separate 2026 slug was found on this landing.

---

## 10. Recommended Implementation Order

Superseded for remaining pages by `docs/42` §18. Short form:

1. Header and topbar pages that are still external: режим работы, горячая линия, администрация, электронные обращения, вакансии, адреса e-mail, территориальные участки.
2. Source top-level page missing from the static header: `/dlya-pacientov/`.
3. Contact phone and hours subpages.
4. Information children named in the source menu, then the other About children.
5. Remaining department instances, optional news cards, search no-results.
6. WordPress: language switcher, live search, pagination, and the chief-doctor form embed.

---

## 11. Risks And Open Decisions

| Risk / decision | Notes |
|-----------------|-------|
| TLS on ggkp14.by blocks Playwright | Full interactive source audit incomplete; HTTP fetch used instead |
| Territorial page layout | New section pattern vs long `content-page` |
| Search results count mismatch | Static demo uses 3 results; live query may differ — preserve “demo” labeling (38) |
| `abiturient-2023` URL | Kept. Source title is «Абитуриент 2026»; body heading is «ИНФОРМАЦИЯ ДЛЯ АБИТУРИЕНТОВ». Static page uses the body heading as `h1` and does not rename the slug. |
| Homepage `contact-card` CSS on internal pages | Administration / contacts expansions may need scoped reuse, not new template |
| Encoding on GitHub Pages | Remote may still serve pre-6A.1 bytes until push |
| Scope creep | Resist one-template-per-article; batch by template type |

---

## 12. Static Baseline Completion Criteria

The static baseline is **complete enough for WordPress planning** when:

1. All **primary and secondary nav** targets either render locally (correct template) or are explicitly documented as **external** or **deferred** with stakeholder sign-off.
2. **No placeholder `#`** remains on user-facing navigation except documented i18n stubs (or BY/EN disabled with visible policy).
3. **Department index** links resolve locally for all 18 departments (two detail templates).
4. **Contacts** hub and linked subpages from `contacts.html` have local equivalents (content or table).
5. **News** archive demonstrates all media variants locally; pagination labeled non-functional.
6. **Search** demonstrates both results and no-results static states.
7. **Stage 6A regression** passes on GitHub Pages artifact after link updates.
8. **docs/38** and this document updated to reflect remaining intentional limitations.

Current status: **templates approved; coverage incomplete**. Primary landings through Stage 6D.1 are local. Many source menu children still point at the live site. The checked menu inventory and dropdown fix are in `docs/42`.

---

## Stage 6C.1 — Paid services landing

Дата: 2026-09-21

**Implemented:** `src/pages/paid-services.html` from the approved content-page shell. Source structure (HTTP fetch of `/platnye-uslugi-2/`): E-POS payment notice, heading «Скачать Прейскурант цен от 11.03.2026 можно ниже:», and four document groups. No additional HTML child pages on that landing.

**Still external (not local pages):**

| Visible group | File |
|---------------|------|
| Прейскурант цен от 01.06.2026 г. для резидентов РБ | `…/uploads/2026/06/PREJSKURANT-s-01.06.2026-Rezidenty.pdf` |
| Прейскурант цен от 01.06.2026 г. для граждан РБ | `…/uploads/2026/06/PREJSKURANT-s-01.06.2026-RB.pdf` |
| Прейскурант цен от 01.04.2026 г. для иностранных граждан | `…/uploads/2026/04/PREJSKURANT-s-01.04.2026-Inostrancy.pdf` |
| Перечень платных медицинских услуг, оказываемых ГГКП14 для граждан РБ | `…/uploads/2026/03/Perechen-platnyh-uslug-dlya-sajta.pdf` |

Source spoilers were represented as headings plus existing `.prose-document-link` (no new accordion script). Decorative E-POS image on the source was not copied (empty `alt`, no local asset).

**Navigation:** every production `href` to `https://ggkp14.by/platnye-uslugi-2/` now points to `paid-services.html` with `data-source-path="/platnye-uslugi-2/"`. GitHub Pages homepage rewrite list includes `paid-services.html`.

**Source inspection limit:** Playwright MCP could not open `ggkp14.by` (`ERR_CERT_COMMON_NAME_INVALID`). Structure and link targets come from the UTF-8 HTML response. Screenshots of the static page: `docs/audit/stage-6c1/`.

---

## Stage 6C.2 — Information landing

Дата: 2026-09-21

**Implemented:** `src/pages/information.html`. Pattern: existing `dept-index` card grid (same as departments index). No new CSS or JavaScript.

**Source main column** (`#middle_content` on `/informaciya/`), four teasers. Title anchors on the source use `href="#"`; the real destination is the «подробнее» link. Static cards use that destination once.

| Card label | Destination | Local |
|------------|-------------|--------|
| Порядок проведения диспансерных осмотров взрослого населения | `/informaciya/poryadok-provedeniya-dispansernyh-osmotrov-vzroslogo-naseleniya/` | `adult-dispensary-examinations.html` (Stage 6D.1) |
| Порядок проведения профилактических осмотров | `/informaciya/poryadok-provedeniya-profilakticheskih/` | External |
| Порядок признания граждан недееспособными | `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` | External |
| Новости / Объявления | `/category/novosti/` | `news-archive.html` (already implemented) |

No introductory prose and no file downloads in the main column. Sidebar widgets (search, hours, «Полезные ссылки») match the shared shell and were not duplicated. Other `/informaciya/…` URLs found in the live site menu sit under «Административные процедуры», not in this landing column, and were not added here.

**Navigation:** only exact `https://ggkp14.by/informaciya/` hrefs were retargeted to `information.html`. Deeper paths stay external, including the search-result URL `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` and homepage `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/`.

**Source inspection limit:** Playwright MCP certificate error on `ggkp14.by`. Structure from UTF-8 HTML. Screenshots: `docs/audit/stage-6c2/`.

**Later standalone pages:** `/informaciya/poryadok-provedeniya-profilakticheskih/` and `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` remain external. Adult dispensary examinations are local as of Stage 6D.1. Menu-only information articles were not part of this landing.

---

## Stage 6C.3 — About landing

Дата: 2026-09-21

**Implemented:** `src/pages/about.html`. Pattern: existing `dept-index` card grid. No new layout.

**Source main column** on `/o-nas/` is eight teasers (title `href="#"` plus «подробнее»). No introductory prose. Sidebar search, hours, and «Полезные ссылки» were not copied into the body.

| Card | Destination | Local |
|------|-------------|--------|
| Администрация | `/o-nas/administraciya/` | External |
| Структурные подразделения | `/o-nas/strukturnye-podrazdeleniya/` | `departments-index.html` |
| Режим работы | `/o-nas/rezhim-raboty/` | External |
| Вакансии | `/o-nas/vakansii/` | External |
| График приема граждан администрацией | `/o-nas/grafik-priema-grazhdan-administraciej/` | External (not the phone-line table page) |
| График прямых телефонных линий | `/o-nas/grafik-pryamyh-telefonnyh-linij/` | `table-page.html` |
| Работа по противодействию коррупции | `/o-nas/rabota-po-protivodejstviju-korrupcii/` | External |
| Профсоюз | `/o-nas/profsojuz/` | External |

**Navigation:** only exact `https://ggkp14.by/o-nas/` hrefs point to `about.html`. Deep `/o-nas/…` links are unchanged. On `about.html`, the dropdown and mobile-drawer «О нас» items use `is-active` and `aria-current="page"`. Two CSS rules were added so those item types can show the existing primary active color; top-level `.main-nav__link.is-active` does not apply to them.

**Source inspection limit:** Playwright MCP certificate error on `ggkp14.by`. Structure from UTF-8 HTML. Screenshots: `docs/audit/stage-6c3/`.

---

## Stage 6C.4 — Applicant landing

Дата: 2026-09-21

**Implemented:** `src/pages/applicant-2023.html`. Pattern: approved content-page prose (`h1`, `h2`, paragraphs, link list). No new CSS or JavaScript. No documents and no child HTML pages in the main column.

**Source:** `<title>` is «Абитуриент 2026». The only in-page `h1` is «ИНФОРМАЦИЯ ДЛЯ АБИТУРИЕНТОВ». The static page uses that heading as `h1` and breadcrumb. The nav label stays «Абитуриент 2026». Source lead sentences were styled as `h3`/`h2` around the three institution links; the static page uses paragraphs and a list so the outline stays one `h1` and two section `h2`s. Wording, dates, phone numbers, and source typos were not corrected.

**External only:**

- `https://ggmc.by/`
- `https://uommk.by/`
- `https://gsmu.by/`

**Not copied:** sidebar search, hours, and «Полезные ссылки».

**Navigation:** only exact `https://ggkp14.by/abiturient-2023/` hrefs point to `applicant-2023.html`. On that page the top-level nav item and the mobile-drawer item are `is-active`.

**Source inspection limit:** Playwright MCP certificate error. Screenshots: `docs/audit/stage-6c4/`.

---

## Stage 6D.1 — Adult dispensary examinations

Дата: 2026-09-21

**Implemented:** `src/pages/adult-dispensary-examinations.html` on the content-page prose pattern. No new CSS or JavaScript. No files in the article.

**Source article** (`/informaciya/poryadok-provedeniya-dispansernyh-osmotrov-vzroslogo-naseleniya/`): title and breadcrumb «Порядок проведения диспансерных осмотров взрослого населения», then four paragraphs (D1/D2 groups, cabinet 121, chronic conditions, heads of general-practice departments phone). Wording kept, including «согласно установленных диагнозов».

**Not the same page:** `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` is a separate article titled «Диспансеризация» (2025 decree and age-group FAQ). `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` redirects to that canonical URL. Homepage and search-result links to those paths were not changed.

**Not copied:** a sidebar image widget (`widget_media_image`) that links to Telegram. It is not part of the article.

**Still external Information children:** preventive examinations and recognition of incapacity.

**Source inspection limit:** Playwright MCP certificate error. Screenshots: `docs/audit/stage-6d1/`.

---

## Appendix A — Production page cross-check (matrix row count)

| # | Static file | In coverage matrix §4.1 |
|---|-------------|-------------------------|
| 1 | `index.html` | Yes |
| 2 | `content-page.html` | Yes |
| 3 | `contacts.html` | Yes |
| 4 | `table-page.html` | Yes |
| 5 | `departments-index.html` | Yes |
| 6 | `department.html` | Yes |
| 7 | `department-aop.html` | Yes |
| 8 | `news-archive.html` | Yes |
| 9 | `news-single.html` | Yes |
| 10 | `news-single-video.html` | Yes |
| 11 | `news-single-no-media.html` | Yes |
| 12 | `search-results.html` | Yes (partial) |
| 13 | `paid-services.html` | Yes (§4.2, Stage 6C.1) |
| 14 | `information.html` | Yes (§4.2, Stage 6C.2) |
| 15 | `about.html` | Yes (§4.2, Stage 6C.3) |
| 16 | `applicant-2023.html` | Yes (§4.2, Stage 6C.4) |
| 17 | `adult-dispensary-examinations.html` | Yes (Stage 6D.1) |

All seventeen production templates appear in the matrix; none omitted.
