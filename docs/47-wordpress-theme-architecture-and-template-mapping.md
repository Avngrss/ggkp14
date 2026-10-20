# Stage 7A — WordPress theme architecture and template mapping

Date: 2026-09-24

This document specifies how the approved GGKP14 static frontend becomes a WordPress theme. It is a design record only. No WordPress code, theme directory, plugin, database, or content migration is created here.

**Approved visual baseline:** the committed static site (30 production HTML pages, one development-only `preview.html`, two search states of one file). Do not redesign that baseline.

**How to read this document**

- A **theme** is the set of files that draw the clinic site.
- A **Page** is a stable document such as Contacts or Working hours.
- A **Post** is a dated news item.
- A **template** is the PHP file that wraps a kind of content.
- **Gutenberg** is the WordPress block editor used for article text, lists, images, and simple tables.
- A **template part** is a reusable fragment such as the breadcrumb or a news card.
- A **pattern** is a ready-made block group an editor can insert without rebuilding layout.
- **Theme-controlled** means the developer owns the wrapper. The editor does not move it.
- **Editor-controlled** means the editor changes the words, links, and media inside an allowed area.

Earlier notes in `docs/04-wordpress-mapping.md` and `docs/05-wordpress-for-non-experts.md` are historical. Where they conflict with this document — especially ACF as a required dependency, a homepage sidebar, or carousel scripts — this Stage 7A specification wins. Evidence: Stage 3E removed the news sidebar; Stage 6H approved the current shell; the user instruction for this stage forbids choosing a custom-field plugin now.

Evidence used: `src/pages/` (31 HTML files), `src/css/` (7 files), `src/js/` (3 files), `src/assets/`, `.github/workflows/pages.yml`, `tools/simulate-pages-dist.py`, and `docs/41` through `docs/46`, plus `docs/30`, `docs/31`, `docs/34`, `docs/35`, `docs/39`, and `docs/43`.

---

## 1. Static baseline inventory

Production inventory confirmed from the repository:

| Item | Count |
| --- | --- |
| Production HTML | 30 |
| Development-only HTML | `preview.html` |
| Search visual states | 2 states of `search-results.html` |
| Distinct future PHP page templates required by text differences | 0 |

### 1.1 Layout families

Group static files by the future WordPress template they share. Do not create one PHP file per HTML file.

| Layout family | Future template | Static references |
| --- | --- | --- |
| Homepage | `front-page.php` | `index.html` |
| Ordinary Page | `page.php` | Most articles, landings, contacts, administration, hours, appeals, vacancies, and service notes |
| Landing card hub | `page.php` plus a locked card pattern | `about.html`, `information.html`, `contacts.html` (child list), `departments-index.html` is not this family |
| Structured table Page | `page.php` plus a table pattern or theme-rendered table | `table-page.html`, `email-addresses.html`, `territorial-districts.html` |
| Department archive | `archive-department.php` | `departments-index.html` |
| Department single | `single-department.php` | `department.html`, `department-aop.html` |
| News archive | `archive.php` / category view | `news-archive.html` |
| News single | `single.php` | `news-single.html`, `news-single-video.html`, `news-single-no-media.html` |
| Search | `search.php` | `search-results.html` (both states) |
| Missing URL | `404.php` | No static file |
| Development navigator | None | `preview.html` |

### 1.2 Page-by-page mapping

| Static file | Purpose | Content type | Layout family | WP template | Content source | Dynamic replacement | Media | Conditional regions | Editor regions | Theme regions | Migration |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `index.html` | Homepage | Composed landing | Homepage | `front-page.php` | Front page + menus + queries + clinic settings | News and department queries | Hero, promo, department and news slots | Hide empty news or department grids | Allowed homepage fields only | Shell, section order, spacing | Use as template reference; migrate field values |
| `content-page.html` | Appointment article | Page | Ordinary Page | `page.php` | Page `/zapis-k-vrachu/` | Native permalink | None required | Notice optional | Gutenberg body | Shell, breadcrumb, title | Migrate as content |
| `contacts.html` | Contacts hub | Page | Landing hub | `page.php` | Page `/contacts/` | Child-page cards if used | Map embed | Hide map if empty | Body, phones, map | Shell | Migrate as content |
| `table-page.html` | Direct-phone schedule | Page + tables | Structured table | `page.php` | Page `/o-nas/grafik-pryamyh-telefonnyh-linij/` | Theme table wrapper | None | Hide empty tables | Controlled table content | Scroll wrapper, captions | Migrate as content; not a free Table block |
| `search-results.html` | Search demo | Search view | Search | `search.php` | `?s=` query | Server search + pagination | None | Results vs no-results | None | Shell, result card | Use as template reference; do not migrate as a Page |
| `paid-services.html` | Paid services | Page + files | Ordinary Page | `page.php` | Page `/platnye-uslugi-2/` | File links | None local; PDFs stay files | Hide file list if empty | Notice, file titles/URLs | Shell, document-link style | Migrate as content; keep PDFs as Media Library files or external until copied |
| `information.html` | Information hub | Page | Landing hub | `page.php` | Page `/informaciya/` | Child cards | None | Hide missing children | Card labels and targets | Card layout | Migrate as content |
| `about.html` | About hub | Page | Landing hub | `page.php` | Page `/o-nas/` | Child cards | None | Hide missing children | Card labels and targets | Card layout | Migrate as content |
| `applicant-2023.html` | Applicant article | Page | Ordinary Page | `page.php` | Page `/abiturient-2023/` | Native permalink | None | None | Gutenberg body | Shell | Migrate as content; keep published slug until a later redirect decision |
| `departments-index.html` | 18 department cards | Department archive | Department archive | `archive-department.php` | Department query | Loop + order + badges | Featured image or placeholder | Hide image wrapper if missing; show AOP/FAP badge only when set | Department records | Card grid, title, back context | Use as template reference |
| `department.html` | Women’s consultation | Department record | Department single | `single-department.php` | One Department | Permalink, optional blocks | Optional image | Contacts, address, lists | Title, body, structured fields | Shell, optional wrappers | Migrate as content; file is also the template reference |
| `department-aop.html` | Uritskaya AOP | Department record | Department single | `single-department.php` | One Department | Same template, more optional fields | Optional image | Address, extra phones, staff, zones | Same as above | Same | Migrate as content; not a second template |
| `news-archive.html` | News list | Post archive | News archive | `archive.php` | Posts in category Новости | `the_posts_pagination()` | Featured image or placeholder | Hide image slot if none | Posts | Card layout, pagination chrome | Use as template reference |
| `news-single.html` | News with image | Post | News single | `single.php` | One Post | Featured image condition | Featured image | Featured figure | Title, body, image | Shell, meta | Use as template reference; migrate if that post is in scope |
| `news-single-video.html` | News with video | Post | News single | `single.php` | One Post | Embed block in body | Embed / file | No featured figure unless present | Body embed | Shell | Use as template reference |
| `news-single-no-media.html` | Text-only news | Post | News single | `single.php` | One Post | No empty figure | None | Do not output featured wrapper | Body | Shell | Use as template reference |
| `adult-dispensary-examinations.html` | Short article | Page | Ordinary Page | `page.php` | Page under Information | Native permalink | None | Info rows optional | Gutenberg + info pattern | Shell | Migrate as content |
| `working-hours.html` | Schedule groups | Page | Ordinary Page | `page.php` | Page `/o-nas/rezhim-raboty/` | Optional shared hours source | None | Group list | Schedule groups | Shell, info-line styles | Migrate as content; prefer one clinic-hours source for the repeated weekday line |
| `hot-line.html` | Three hot lines | Page | Ordinary Page | `page.php` | Page `/contacts/goryachaya-liniya/` | Native permalink | None | One group per line | Three groups | Shell | Migrate as content |
| `administration.html` | Leadership contacts | Page | Ordinary Page | `page.php` | Page `/o-nas/administraciya/` | Staff-card pattern | Four portraits | Hide portrait if missing | People groups | Card layout | Migrate as content |
| `vacancies.html` | Vacancy list | Page | Ordinary Page | `page.php` | Page `/o-nas/vakansii/` | Native permalink | None | Empty list message | Job titles, HR phone | Shell | Migrate as content |
| `electronic-appeals.html` | Appeals law + portal | Page | Ordinary Page | `page.php` | Page `/contacts/elektronnye-obrashheniya/` | External portal stays a link | None | None | Legal prose, postal rows | Shell | Migrate as content; no local form |
| `email-addresses.html` | Email directory | Page + table | Structured table | `page.php` | Page `/adresa-elektronnoj-pochty/` | Theme-rendered or locked table | None | Hide empty rows | Directory rows | Scroll wrapper | Migrate as structured content |
| `territorial-districts.html` | District roster | Page + rowspan table | Structured table | `page.php` | Page `/o-nas/territorialnye-uchastki/` | Theme-rendered table | None | Rowspan groups | Structured rows | Scroll wrapper, hint | Migrate as structured content; not a standard Table block |
| `medical-tourism.html` | Service article | Page or Post | Ordinary Page or `single.php` | See §28 | Source is a post URL `/medicinskij-turizm-2/` used as a homepage action | Native permalink | Featured photograph | Image optional | Body, cash-desk phone | Shell | Migrate as content; recommend a Page so the quick action stays stable |
| `five-steps.html` | Short external-link article | Page | Ordinary Page | `page.php` | Page `/sdelai-5-shagov-chtoby-spasti-zhizn/` | Native permalink | None | None | One external link + short prose | Shell | Migrate as content; do not invent the five steps |
| `medical-extract-order.html` | Extract instructions | Page | Ordinary Page | `page.php` | Page `/zakaz-vypiski-iz-medicinskih-dokumentov/` | No local submit | None | Notice | Published fields as prose | Shell | Migrate as content; no form storage |
| `dispensarization.html` | Dispensarization article | Page | Ordinary Page | `page.php` | Page `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` plus legacy alias | Redirect from homepage alias | Two article images | Images optional | Body, posters | Shell | Migrate as content; keep one article, two incoming URLs |
| `personal-appeals.html` | Written appeals note | Page | Ordinary Page | `page.php` | Page `/lichnye-obrashheniya-grazhdan/` | No local submit | None | Notice | Published conditions | Shell | Migrate as content; not the electronic-appeals page |
| `sexological-help.html` | Public notice | Page | Ordinary Page | `page.php` | Page `/seksologicheskaya-pomoshh/` | Native permalink | None | Helpline rows | Lists and phones | Shell | Migrate as content |
| `preview.html` | Local navigator | Development | None | None | None | Removed | None | None | None | None | Development-only; do not migrate |

Deferred source records (not local HTML, still in scope for WordPress content): 16 further Department records, 8 recommended landing children from `docs/44` §B, about 25 other ordinary pages, and the clinic news corpus. Theme samples, chat-bot pages, and project demo URLs stay excluded.

---

## 2. Theme template hierarchy

WordPress chooses a PHP file by content type. The theme should ship the **minimum justified set** below. `index.php` is required as a last fallback. `single-post.php` is not justified: Posts use `single.php`. No sidebar template: Stage 3E removed the homepage news sidebar and `docs/46` keeps that composition.

### 2.1 Required files

| File | Responsibility | Content source | Static reference | Reusable parts | Conditional logic | Editor boundary | Fallback | Accessibility |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `style.css` | Theme name, version, text domain. Not the main CSS payload | Theme metadata | None | None | None | Developers only | None | None |
| `functions.php` | Enqueue CSS/JS, menus, thumbnails, Department CPT, meta, search form, title-tag | Theme | All pages | Helpers | Feature flags only if needed | Developers only | Fail closed | Enqueue focus-visible styles already in CSS |
| `theme.json` | Colors, fonts, content width, allowed alignments | Tokens in `src/css/tokens.css` | All pages | Shared with editor | Limit wide/full | Developers; editors use presets | CSS variables remain source of visual truth | Focus color token |
| `header.php` | Skip link, topbar, logo, primary nav, search panel, drawer, language placeholder | Menus + site identity + search form | Every production page | `parts/topbar.php`, `parts/navigation.php`, `parts/search-form.php`, `parts/mobile-drawer.php` | Sticky class, search open, current item | Menus and logo only | Site title if logo missing | Skip link, landmarks, `aria-expanded` |
| `footer.php` | Footer nav, patients list, contacts, official resources, copyright | Menus + clinic settings | Every production page | `parts/official-resources.php` | Hide empty resource strip | Footer menus and settings | Copyright from site name | Footer landmark |
| `index.php` | Last-resort loop | Any unmatched query | None | Card part | Empty query | None | Simple list | One `h1` |
| `front-page.php` | Homepage section order | Front-page settings + queries | `index.html` | Homepage parts | Hide empty news/departments | Homepage fields only | Hide optional slots | One `h1` in hero |
| `page.php` | Ordinary Pages | `the_title()`, `the_content()` | Ordinary and landing pages | Breadcrumb, notices, info-lines | Hide empty featured image | Gutenberg in the article | No featured figure if none | One `h1` from title |
| `archive-department.php` | Department index | Department query | `departments-index.html` | Department card | Badge, image fallback | Records, not grid CSS | Empty-archive message | One `h1` |
| `single-department.php` | One department | Department + meta + Gutenberg | `department.html`, `department-aop.html` | Contacts panel, info-lines | Output optional blocks only when filled | Fields + body | Back link to archive | One `h1`, labeled contacts |
| `archive.php` | News list when Posts are queried | Posts | `news-archive.html` | News card, pagination | Image fallback | Posts | Empty-archive message | One `h1` |
| `category.php` | Optional alias of `archive.php` if Новости is a category | Same | Same | Same | Same | Same | Same | Same |
| `single.php` | One news Post | Post | Three news-single files | Featured media, body, pagination | Featured image, embeds | Post editor | No empty figure | One `h1`, `time` |
| `search.php` | Results and no-results | `?s=` | `search-results.html` | Result card, refine form | Have posts or not | None | No-results + refine | Query escaped, labelled form |
| `404.php` | Missing URL | None | None | Recovery links | None | None | Home, search, contacts | One `h1` |

`category.php` may be a thin wrapper around `archive.php`. Do not add `home.php` unless Reading settings use a Posts page instead of a category archive. Prefer the source pattern `/category/novosti/`.

### 2.2 Specialized page templates

Do **not** add `page-contacts.php`, `page-administration.php`, or one template per article. Those pages differ in Gutenberg content and patterns, not in PHP structure.

A specialized Page template is justified later only if a table cannot be kept safe inside `page.php`. Until that is proven in implementation, `page.php` plus a locked table pattern or a theme table renderer is enough.

### 2.3 Template parts and patterns

| Part or pattern | Use |
| --- | --- |
| `parts/topbar.php` | Desktop-only utility links |
| `parts/navigation.php` | Primary desktop menu with CSS dropdowns |
| `parts/mobile-drawer.php` | Drawer below 1440px |
| `parts/search-form.php` | `get_search_form()` markup used in header and drawer |
| `parts/breadcrumbs.php` | Theme breadcrumbs |
| `parts/info-line.php` | Icon + label + value |
| `parts/notice.php` | `.prose-notice` |
| `parts/document-link.php` | File download row |
| `parts/table-scroll.php` | Overflow wrapper + hint |
| `parts/card-department.php` | Index and homepage cards |
| `parts/card-news-featured.php` | Homepage featured Post |
| `parts/card-news-compact.php` | Homepage compact Posts |
| `parts/card-news-archive.php` | Archive card |
| `parts/card-landing.php` | About / Information / Contacts children |
| `parts/card-staff.php` | Administration portraits |
| `parts/pagination.php` | `the_posts_pagination()` chrome |
| `parts/hero.php` | Homepage hero |
| `parts/quick-actions.php` | Homepage action grid |
| Pattern: info-facts group | Several info-lines |
| Pattern: landing cards | Hub pages |
| Pattern: staff group | Administration |
| Pattern: article notice | Paid services, booking |
| Pattern: simple table | Two-column directories that Gutenberg can own |

Block patterns copy the approved spacing. They are not a second visual system.

---

## 3. Homepage architecture

Map `src/pages/index.html`. The homepage is **not** a free-form Gutenberg canvas. `front-page.php` prints sections in the approved order. Editors change values, not the skeleton.

Reading settings: use a static front page. Do not restore a sidebar beside news (`docs/04` Stage 3E / `docs/46`).

| Section | Control | Editable how | Populated | Menu? | Content source | Media | Order | Empty state | Count | Safeguard |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hero welcome, title, subtitle | Theme wrapper | Homepage fields or Site Identity + a short subtitle field | Manual | No | Front-page settings | No | Fixed | Title falls back to clinic name | 1 title | Locked layout |
| Hero actions | Theme | Links to existing Pages | Manual | No | Pages: booking, appeals | No | Fixed two buttons | Hide a button if target unpublished | 2 | No extra hero buttons |
| Hero promo links | Theme | Three Page links | Manual | Optional small set | Pages: tourism, five-steps, plus the third current promo | No | Fixed | Hide unused slots | ≤3 | Not a repeater of unlimited items |
| Hero visual | Theme slot | Media Library image | Manual | No | Front-page image | Library | Fixed | Theme placeholder SVG | 1 | Decorative pattern stays theme CSS |
| Hero hot line + hours | Theme | Global clinic settings | Manual / shared | No | Global hours and hot-line Page | Icons are theme SVG | Fixed | Keep labels; hide a value if empty | 1 of each | Do not let Gutenberg rebuild the aside |
| Quick actions | Theme grid | Managed link collection (theme setting or a dedicated menu location `quick_actions`) | Manual | Yes, if a menu location is used | Existing Pages | Theme icons, not editor SVG upload | Fixed 8 cells matching the static grid | Hide unused cells; do not leave empty tiles | 8 recommended, matching `index.html` | Editors pick Pages; they do not upload new icons |
| Contacts / important phones | Theme | Global phones + links | Manual | No | Global settings + Pages | No | Fixed | Hide a card if empty | 3 info cards | Shared with footer where the same number appears |
| Promo banner | Theme | Image, sentence, Page link | Manual | No | Front-page fields | Library | Fixed | Hide whole banner if no text and no link | 1 | Placeholder if image missing |
| Structural departments | Theme grid | Query | Dynamic | No | Department CPT, `menu_order` | Featured image or placeholder | `menu_order` | Hide section if zero published | All published departments (static homepage prints the full set, not a teaser of four) | Editors do not drag cards on the homepage |
| Latest news | Theme | Query | Dynamic | No | Latest Posts | Featured image or placeholder | Date | Hide section if zero posts | 1 featured + 4 compact | No manual homepage news picker required |
| Services / useful information | Theme | Hours card from global settings; useful links from a menu or setting | Mixed | Optional | Settings + menu | QR from Library | Fixed | Hide QR if missing | Small fixed set | Not a widget sidebar |
| Official resources | Theme strip | Managed logos and URLs | Manual | No | Clinic settings | Library logos | Editor order | Hide strip if empty | Match current strip; keep it short | Logos use `object-fit: contain` |
| Footer | Theme | Menus + settings | Mixed | Yes | Footer menus | No | Menu order | Hide empty columns | Approved footer lists | See §10 |

Appointment action in the hero and header CTA both point at the booking Page. One Page, two theme links.

---

## 4. Standard Pages

Most clinic documents use **`page.php` + Gutenberg**. Text length is not a reason for a new PHP template. Short pages such as `five-steps.html` stay short.

| Content | Implementation |
| --- | --- |
| Prose, headings, lists | Core blocks. One `h1` is the Page title, not a Heading block |
| Notices | Notice pattern / `.prose-notice` |
| Important-information rows | Info-line pattern (phone, pin, clock, notice, document) |
| Phones | Visible text + `tel:` in the same row |
| Emails | Visible text + `mailto:` |
| Locations and rooms | Info-line with pin |
| Schedules | Info-line with clock, or a simple table if comparing columns |
| Documents | File block or document-link pattern |
| Images and galleries | Core Image / Gallery; figure wrappers; no empty figure |
| Tables | See §8 |
| External links | Core links; `target` and `rel` only when leaving the site |
| Long-form / short / no media | Same template |

Landing hubs (`about.html`, `information.html`, `contacts.html`) stay `page.php`. Editors insert the landing-card pattern. Child Pages supply titles and permalinks. Do not hard-code the eight About cards in PHP.

Administration uses `page.php` plus the staff-card pattern. Four people are content, not a CPT.

Working hours and the hot line use `page.php` plus info-line groups. The weekday line that also appears on the homepage should be stored once in clinic settings and displayed in both places.

---

## 5. Department content model

Static references: `departments-index.html`, `department.html`, `department-aop.html`. Future need: **18 records**, one index, one detail template, optional blocks, local permalinks, translation later (`docs/30`, `docs/31`, `docs/44`).

### 5.1 Options

| Model | Strength | Weakness |
| --- | --- | --- |
| A. Custom post type `department` | Own archive, own query, menu order, not mixed with About children, clean homepage grid | Editors learn a second list in admin |
| B. Native Pages under one parent | Familiar Pages screen | Archive is awkward; 16 siblings mix with other About children; type badges need page meta anyway |
| C. Posts + a department category | Reuses Posts | News and departments collide in search labels, dates, and feeds |

### 5.2 Recommendation

Use **option A: custom post type `department`**.

Reasons from this repository:

- The index is a generated card grid of 18 items, not a hand-maintained Page tree (`docs/39`, `docs/41` §4.3).
- Women’s consultation and Uritskaya AOP already share one layout; AOP only adds optional fields (`docs/31`).
- Homepage and the index must list the same records without copying HTML.
- A Page parent would also contain About children that are not departments.

No custom-field plugin is selected in this stage.

### 5.3 Field split

**WordPress core**

- Title
- Slug
- Featured image
- Publish state
- `menu_order` for card order
- Gutenberg body for intro, service lists, staff lists, health schools, village lists

**Gutenberg**

- Long prose
- Lists
- Optional extra images
- Optional table if a future department needs one

**Theme-managed post meta** (register in the theme; admin UI can be a simple metabox)

- Kind: clinic department, AOP, or FAP (drives the card badge)
- Address (optional)
- Phones: label + number, zero or more
- Hours text (optional)
- Map URL or embed (optional; unused on the two static samples)
- Online-booking URL (optional; present on women’s consultation)

**Later plugin evaluation**

- A friendlier repeater UI for phones if the native metabox is too clumsy
- Multilingual linking (Stage 7B)

### 5.4 Template behavior

`single-department.php` always prints title, breadcrumb, and back link. It prints the contacts panel only when at least one of address, phone, or hours exists. It prints Gutenberg sections as authored. Missing optional media does not leave an empty `.image-slot`.

`archive-department.php` prints all published departments in `menu_order`. Badge text appears only for AOP and FAP. Image uses the featured image or the existing department placeholder.

Permalink shape: `/o-nas/strukturnye-podrazdeleniya/{slug}/` to match source paths. Exact rewrite rules are an implementation task; do not keep `.html`.

---

## 6. News architecture

Static references: `news-archive.html` plus three single files that are **media states**, not three templates (`docs/34`, `docs/41`).

Use native **Posts**. Primary public category: Новости, source path `/category/novosti/`.

| Topic | Decision |
| --- | --- |
| Archive | `archive.php` or `category.php` for Новости |
| Pagination | `the_posts_pagination()`; replace `href="#"` page controls |
| Featured image | `has_post_thumbnail()`; output `.news-single__featured` only then |
| No featured media | No figure wrapper (`news-single-no-media.html`) |
| Video / embed / audio / gallery / files | Gutenberg body blocks, not extra PHP templates |
| Date | `the_date()` / `the_time()` |
| Category badge | Show Новости; hide empty badge |
| Author | Do not show by default; the static singles do not present an author byline |
| Archive excerpt | Manual excerpt, else trimmed content |
| Archive image fallback | `news-thumb-placeholder.svg` |
| Search | Include Posts |
| Languages | Filter later in Stage 7B |

Homepage: latest published Post as featured, next four as compact (`docs/04` Stage 3E, still visible in `index.html`).

English theme-sample posts in the source sitemap are **excluded** from migration (`docs/44` §E).

---

## 7. Search architecture

Replace the static prototype with native search.

| Topic | Decision |
| --- | --- |
| Template | `search.php` |
| Query | `?s=` only. Remove `state=empty` from production |
| Results | Standard Loop when `have_posts()` |
| No-results | Server branch: heading, short help, escaped query, labelled refine form, links to Home, Contacts, News |
| Query display | `get_search_query()` escaped; never `innerHTML` |
| Result title | `the_title()` |
| Excerpt | Optional; static demo shows titles only — keep titles first, add a short excerpt if it helps scanning |
| Type labels | Keep the static badges Страница / Новость / Подразделение when useful |
| Pagination | `the_posts_pagination()` |
| Included types | Pages, Posts, Departments |
| Excluded | Attachments unless a later need appears; theme samples |
| Language | Search in the current language only, Stage 7B |
| Recovery | Home, Contacts, News archive |
| Accessibility | Landmark, one `h1`, labelled fields, no demo note on production |

Header and drawer forms use `get_search_form()` with `action` = home URL. Remove `initSearchResultsDemo()` and the alert branch in `initSearchForm()` (`src/js/main.js`).

Do not add AJAX search, autocomplete, or a client index.

---

## 8. Tables and structured directories

Approved static tables:

| Table | Static file | Structure | Editor approach |
| --- | --- | --- | --- |
| Direct telephone lines | `table-page.html` | Several captioned tables | Theme-rendered from structured rows or a locked table pattern. Not an unconstrained Table block |
| Email directory | `email-addresses.html` | 17 rows, two columns, `mailto:` | Structured rows rendered by the theme, or a locked two-column pattern. Safer than a free Table block because one cell holds two roles |
| Territorial districts | `territorial-districts.html` | One table, rowspan groups, long cells | **Structured records** rendered by the theme. The standard Table block cannot keep rowspan, group labels, or the approved scroll wrapper reliably |
| In-article tables | Future Pages | Simple grids | Gutenberg Table block, forced into `.table-scroll` via a block style |
| Department / news tables | Rare | Simple | Gutenberg Table block with the same wrapper |

Theme renderer requirements, taken from the static CSS:

- Outer `[data-table-scroll]` wrapper
- Caption stays visible
- No column hiding
- Scroll hint only when `scrollWidth > clientWidth`
- `rowspan` / `colspan` only in theme markup
- Long cells wrap; phone-like tokens may stay nowrap where the static CSS already does

Beginner-safe rule: editors change **row data** (name, email, district, doctor, address). They do not draw merged cells in Gutenberg.

---

## 9. Contacts and important information

Reuse the Stage 6D.2 info-line model (`docs/43`).

| Fact | Markup | Icon | Editor input |
| --- | --- | --- | --- |
| Phone | Visible number + `tel:` | Phone | Label + number |
| Email | Visible address + `mailto:` | None (no mail glyph in the approved family) | Label + address |
| Location / room | Text | Pin | Label + text |
| Hours | Text | Clock | Label + text |
| Notice | `.prose-notice` | Notice | Short sentence |
| Document | Document-link | Document mask | Title + file |
| Role | Visible heading or label | None | Text |

Icons are decorative (`aria-hidden`). The row must read correctly if the icon is removed.

### 9.1 Repeated global data

These values appear on the homepage, header, footer, and several Pages. Store them **once**.

| Value | Where it repeats now | Future source |
| --- | --- | --- |
| Clinic display name | Titles, hero, footer | Site title |
| Address / postal address | Appeals, contacts | Clinic settings |
| Registry / main phones | Homepage, contacts, booking notice | Clinic settings |
| Clinic email `ggkp14@ggkp14.by` | Drawer mailto, contacts | Clinic settings |
| General hours «Пн–Пт 7:00–20:00» | Homepage hero, info card, useful-info | Clinic settings |
| Hot-line number | Hero, hot-line Page | Clinic settings plus the Page body for the other two organizations |
| Social / Telegram | Homepage useful-info | Clinic settings |
| Official resource logos | Homepage strip | Clinic settings |

Do not implement an options page in this stage. Native options: Site Identity, a small theme-settings screen, or a later plugin-assisted options UI. Decision stage: theme skeleton / shared shell.

Validation belongs to implementation: phone and email format, `esc_url` on external links, no raw iframe paste except a dedicated map field.

Translation: global settings need per-language values where the words change; telephone numbers usually stay shared (Stage 7B).

---

## 10. Navigation architecture

Preserve the approved shell from `docs/42`. Desktop and mobile are **intentionally different**. Do not “fix” that by adding districts or email to the drawer unless a later product decision says so.

| Structure | WP mechanism | Notes |
| --- | --- | --- |
| Topbar | Menu location `topbar` | Visible from 1440px only (CSS) |
| Primary desktop nav | Menu location `primary` | CSS dropdowns; no JS open/close |
| Mobile drawer | Menu location `mobile` **or** the same `primary` tree with theme grouping | Drawer markup stays theme-controlled. Email and districts stay out of this tree |
| Header booking CTA | Theme link to the booking Page | Not a menu item |
| Header / drawer search | `get_search_form()` | Same form |
| Language switcher | Theme placeholder until Stage 7B | Keep RU current; BY/EN not live |
| Low-vision toggle | Theme control, existing JS | Not a menu URL |
| Footer site links | Menu location `footer` | Главная, О нас, Контакты, Платные услуги, Новости |
| Footer patients | Menu location `footer_patients` | Booking, appeals, hours, vacancies |
| Quick actions | Dedicated location or theme settings | Homepage only |
| Official resources | Settings, not a nav menu | Logos |
| External links | Normal menu custom links | `rel="noopener"` when `target=_blank` |
| Active states | `current-menu-item` mapped to existing `.is-active` / `aria-current="page"` | Theme walker or CSS |
| Keyboard / sticky | Keep verified CSS and JS | Dropdown gap bridge stays CSS |

Register those locations in `functions.php`. Use `wp_nav_menu()` and `home_url()` / `get_permalink()`. Do not emit sibling `.html` paths, `/pages/`, or GitHub Pages rewrites.

Block Navigation is **not** used for the header. It would let an editor break the approved dropdown and drawer.

Open product decision carried from `docs/44` §F: whether «Для пациентов» becomes a primary item. The theme must allow a new top-level item without a PHP change. It must not add that item by default.

---

## 11. Breadcrumb architecture

Do not hard-code `index.html` paths.

| Context | Trail |
| --- | --- |
| Front page | No breadcrumb (matches `index.html`) |
| Ordinary Page | Home » each ancestor » current title |
| About / Information / Contacts children | Home » parent hub » current |
| Department archive | Home » About » Структурные подразделения |
| Department single | Home » About » Структурные подразделения » title |
| News archive | Home » Новости |
| News single | Home » Новости » title |
| Search | Home » Поиск |
| 404 | Home » Страница не найдена |

Implementation: a small theme walker over Page ancestors, Department archive link, and the news category. That is enough for the approved tree.

A breadcrumb plugin is **not** chosen now. Re-evaluate only if multilingual crumbs or SEO schema become too large for the theme (Stage 7B / SEO stage).

Markup: `nav aria-label="Хлебные крошки"`, ordered list, `aria-current="page"` on the last item, decorative `»` separators `aria-hidden`. Current item is text, not a link.

Translated hierarchy is a Stage 7B requirement.

---

## 12. Media architecture

### 12.1 Classification of current files

| Asset | Role | WordPress fate |
| --- | --- | --- |
| `favicon.svg` | Theme / site icon | Theme asset + Site Icon |
| `icon-*.svg` (5) | Theme content icons | Theme assets, CSS masks |
| `medical-pattern.svg`, `hero-bg.svg` | Decorative theme art | Theme assets, not Library |
| `placeholders/*.svg` | Development fallbacks | Theme fallbacks; do not migrate as clinic photos |
| `administration/*.jpg|png` | Content portraits | Media Library; empty alt stays empty because the name is the heading (`docs/43`) |
| `dispensarization/*.png` | Article posters with text | Media Library; language-specific; Stage 7B may need BY/EN variants |
| `medical-tourism/medical-tourism.webp` | Article photograph | Media Library; keep source alt |
| Google Inter | Remote font | Enqueue; prefer self-hosting later for privacy, not a redesign |

### 12.2 Slots

| Slot | Source | Missing behavior |
| --- | --- | --- |
| Hero visual | Front-page image | Theme placeholder |
| Promo banner | Front-page image | Placeholder or hide image |
| Department card / single | Featured image | Department placeholder; no empty figure |
| News featured / compact / archive / single | Featured image | News placeholders; no empty figure on singles without a thumbnail |
| Administration portraits | Image in staff pattern | Hide figure; keep name |
| Official logos / QR | Settings | Hide that logo or QR |
| Gallery / video / audio / files | Gutenberg | Core blocks |
| Map | Embed or trusted map field on Contacts | Hide map region if empty |

Use WordPress responsive `srcset`. Theme registers sizes matching the static slots (featured large, compact thumb, card, portrait). Lazy-load below-the-fold images. Alternative text is editor-owned except decorative theme SVGs.

Do not copy new source media in this stage.

---

## 13. Icons and theme assets

Keep the local SVG family. Do not add Font Awesome or another kit (`docs/43`).

- Files live in the theme `assets/icons/` directory.
- Color is `currentColor` via CSS mask, token `--color-primary`.
- Allowed semantic names: `phone`, `pin`, `clock`, `notice`, `document`.
- Header stroke icons (search, chevron, mail, menu) stay inline or theme SVG, decorative.
- Editors pick an icon name on an info-line pattern. They do not upload arbitrary icons into rows.
- Favicon: `site_icon` if set, else theme `favicon.svg`. Do not invent a `.ico` only to silence a browser fallback (`docs/46`).
- Fonts: Inter 400/500/600/700. Version assets with `filemtime` or the theme version.
- No icon font, no CDN icon runtime.

---

## 14. CSS architecture

Preserve the approved sheets. Do not redesign.

| File | Role in the theme |
| --- | --- |
| `tokens.css` | Custom properties; also inform `theme.json` |
| `base.css` | Reset, typography, focus |
| `layout.css` | Container, sections |
| `components.css` | Header, cards, buttons, dropdown bridge |
| `homepage.css` | Homepage only; enqueue on front page |
| `internal-pages.css` | Prose 48rem, breadcrumbs, tables, department, news, search |
| `responsive.css` | 390 / 768 / 1024 / 1439 / 1440 behavior |

Enqueue in that order, versioned, from `functions.php`. `homepage.css` may load only on the front page. Editor styles: enqueue a subset plus `theme.json` so the canvas uses the same tokens, 48rem prose measure, and notice/info-line styles.

`theme.json` should declare:

- Palette from the existing tokens
- Font sizes from the type scale
- Content width ≈ 48rem for article blocks
- Wide/full allowed only where the approved layout uses them (homepage bands, not ordinary prose)

Do not let Gutenberg “wide” break the 1320px container or the 48rem article measure (`docs/46` composition decision).

Table, focus, and breakpoint behavior stay in CSS, not in a new utility framework.

---

## 15. JavaScript architecture

| Current function | Classification |
| --- | --- |
| Sticky header + `--header-height` | Retain in the theme |
| Header search toggle | Retain |
| Mobile drawer (`menu.js`) | Retain |
| Low-vision toggle (`accessibility.js`) | Retain |
| Dropdown open/close | Already CSS; do not add JS |
| Table scroll hint | Retain |
| `initSearchForm` alert / preventDefault | **Remove.** Native GET search |
| `initSearchResultsDemo` / `state=empty` | **Remove.** Server `search.php` |
| Sibling `.html` / `data-source-path` | **Remove** from production. Permalinks replace them |
| GitHub Pages path rewrite | **Remove.** Hosting concern only for the static demo |
| Pagination, AJAX search, filters, infinite scroll, custom players | **Do not add** |

After conversion, re-test keyboard dropdowns, drawer focus trap, skip link, and table hints against the Stage 6D.4 / 6H evidence.

---

## 16. Gutenberg editing boundaries

| Family | Editors may change | Editors may not change | Allowed core blocks | Discouraged | Locking |
| --- | --- | --- | --- | --- | --- |
| Homepage | Defined fields, images, menu assignments | Section order, shell, icon set | None on the front-page canvas | Putting the homepage in the site editor as a free template | PHP template lock |
| Ordinary Page | Body, notices, info-lines, images, files, simple tables | Header, footer, breadcrumb chrome, `h1` | Paragraph, heading 2–3, list, quote, image, gallery, file, embed, table (simple), group, approved patterns | Navigation, columns-as-layout, HTML soup, reusable full-page shells | Article only |
| Landing hub | Card titles and target Pages | Card grid CSS | Pattern + paragraphs if needed | Free image galleries as the whole page | Pattern lock |
| Administration | People fields and portraits | Card chrome | Staff pattern | Extra decorative covers | Pattern |
| Table directories | Row values | Table chrome, rowspan | None, or locked pattern | Standard Table block on districts | Theme render |
| Department | Title, meta, Gutenberg body | Archive grid, permalink structure | Same as ordinary + lists | Cover blocks that force empty media | Template |
| News | Title, body, featured image, category | Archive chrome | Same + embed | Forced featured image on text-only posts | Template |
| Search / 404 | None | Everything | None | — | Theme |

Empty optional sections are omitted, not printed as blank cards.

Wide/full: off for ordinary articles. Homepage bands are theme sections, not block alignments.

---

## 17. Theme-controlled versus editor-controlled matrix

| Item | Classification | Reason |
| --- | --- | --- |
| Header / topbar / drawer chrome | Theme-controlled | Shared shell; a11y and sticky behavior |
| Navigation items | WordPress-managed menus | Editors add links without PHP |
| Hero layout | Theme-controlled | Approved composition |
| Hero text and image | Global / homepage setting | Small, structured |
| Quick actions | WordPress-managed collection | Links to Pages; fixed count |
| Homepage news / departments | Dynamically queried | Avoid stale hand-built cards |
| Breadcrumbs | Theme-controlled | Derived from hierarchy |
| Page / Post body | Editor-controlled | Real clinic text |
| Important-information rows | Editor-controlled via pattern | Same visual language |
| Complex tables | Structured field + theme render | Rowspan and scroll wrapper |
| Simple in-article tables | Editor-controlled | Gutenberg Table + style |
| Department fields | Structured field + Gutenberg | Optional blocks |
| News metadata / date | WordPress-managed | Native Post |
| Featured media | Editor-controlled; theme condition | Missing media must not gap |
| Footer chrome | Theme-controlled | Approved columns |
| Footer links | WordPress-managed menus | Same as header |
| Search / pagination | Dynamically queried | Native Loop |
| Language switcher | Deferred decision | Stage 7B |
| Global phones, hours, email, address | Global setting | Stop copy-paste drift |

---

## 18. Dynamic behavior replacement matrix

| Current static behavior | Future WordPress | Native feature | Theme logic | Plugin? | Action |
| --- | --- | --- | --- | --- | --- |
| `search-results.html` fixed cards | `search.php` Loop | Search | Card markup, type badge | No | Replace |
| `?state=empty` | `have_posts()` false | Search | No-results branch | No | Remove |
| Archive `href="#"` pages | `the_posts_pagination()` | Pagination | Chrome styles | No | Replace |
| Sibling `.html` links | Permalinks | Pages / Posts / CPT | `get_permalink()` | No | Remove HTML names |
| `data-source-path` | Redirect map from source URLs | Optional later redirect tool | Map document | Evaluate later | Keep as migration data, not markup |
| Temporary `ggkp14.by` department and news links | Local records | Queries | Cards | No | Replace as records are migrated |
| Department cards | Department query | CPT | Card part, badge | No | Replace hand HTML |
| Latest-news cards | `WP_Query` | Posts | Featured + compact | No | Replace |
| Featured / missing media | `has_post_thumbnail()` | Thumbnails | Conditional figure | No | Replace |
| Booking / extract / appeals “forms” | External system or later form stage | — | Keep instructional Pages | Evaluate later | Do not store medical data now |
| Language `#` | Stage 7B | — | Placeholder | Evaluate in 7B | Keep stub |
| `preview.html` | None | — | — | No | Exclude from theme output |
| GitHub Pages workflow | PHP hosting deploy | — | — | No | Do not port rewrites |

---

## 19. URL and permalink architecture

Do not keep `/pages/`, `.html`, or `/ggkp14/` prototype prefixes.

| Type | Required shape | Source evidence |
| --- | --- | --- |
| Front page | `/` | Homepage |
| Pages | `/{slug}/` or parent/`{slug}/` | Existing source paths |
| Departments | `/o-nas/strukturnye-podrazdeleniya/{slug}/` | Department URLs |
| Department archive | `/o-nas/strukturnye-podrazdeleniya/` | Index |
| Posts | `/{post-slug}/` unless a later news prefix is chosen | Source posts are root slugs |
| News archive | `/category/novosti/` | `news-archive.html` |
| Search | `/?s=` | Native |
| Applicant | Keep `/abiturient-2023/` until a redirect is approved | Published slug vs 2026 heading |
| Dispensarization | Canonical Information path; 301 from `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Stage 6G.1 |
| Trailing slashes | Match WordPress permalink setting; prefer trailing slash like the source | Source URLs |
| Canonical | One URL per document | Redirect aliases |
| Languages | Prefix model deferred | Stage 7B |
| Legacy map | Every `data-source-path` and remaining source URL | Redirects after cutover |

HTML filenames are not public URLs.

---

## 20. Forms and external systems

| Item | Static representation | Source | WordPress now | Sensitivity | Later |
| --- | --- | --- | --- | --- | --- |
| Appointment | Page + tutmed link | `/zapis-k-vrachu/` | Keep external | Health appointment | Do not rebuild tutmed |
| Medical extract | Field list, no submit | `/zakaz-vypiski-iz-medicinskih-dokumentov/` | Instructional Page | Medical record request | Form plugin only after a privacy stage |
| Personal appeals | Conditions, no submit | `/lichnye-obrashheniya-grazhdan/` | Instructional Page | Personal data | Same |
| Electronic appeals | Link to `https://обращения.бел` | Appeals Page | External | Legal appeals | Stay external |
| Chief-doctor Yandex form | Not in static shell | Source topbar | Stay deferred / external | Personal | Do not embed until approved |
| Online questionnaires | Not local | `/anketa-onlajn/` | Exclude or external | Survey | Later |
| Chat bots | Not local | Source chat-bot URLs | Exclude | Chat | Later |
| Search form | GET `s` | Header | Native search | Low | Theme form |

Do not store medical or identity data in WordPress in the first implementation. Do not choose a form plugin here.

---

## 21. Accessibility architecture

Preserve verified static behavior (`docs/42`, `docs/43`, `docs/45`).

Required in the theme:

- Skip link to `#main`
- Header, nav, main, footer landmarks
- Exactly one `h1`
- Heading order from Gutenberg (start at `h2` in the body)
- CSS dropdown keyboard path and 4px hover bridge
- Drawer: Escape, overlay, focus loop
- Visible focus (`--shadow-focus`)
- Labelled search fields
- Tables inside a scroll region, captions, no off-screen columns
- Decorative icons hidden
- Breadcrumb and pagination names
- Language switcher announced when implemented

Regression after conversion: dropdown, drawer, search states, table hints, skip link with sticky header, editor-added alt text, and empty optional regions.

The low-vision toggle stays a theme class on `body`. It is not a substitute for contrast in the default theme.

---

## 22. Performance and asset requirements

Requirements, not measured claims:

- Enqueue one CSS stack; load `homepage.css` only on the front page if splitting stays easy
- Footer JS; three small files may stay separate or be concatenated later
- No jQuery requirement
- WordPress `srcset` and lazy-load
- Theme SVGs are tiny; keep them files, not an extra runtime
- Cache-bust with theme version
- Front page: one Department query, one Post query (or one Post query split in PHP)
- Search and archives: default posts-per-page, pagination — no infinite scroll
- Multilingual query cost is a Stage 7B concern
- Prefer self-hosted Inter when the theme is implemented, to avoid a render-blocking Google Fonts request. That is an implementation improvement, not a visual change

Do not invent Lighthouse scores here.

---

## 23. Security and data handling boundaries

Architecture rules for later code:

- Escape all output (`esc_html`, `esc_url`, `esc_attr`)
- Sanitize settings and meta on save
- Allow-list embed hosts; do not print raw editor iframes except a dedicated map field
- `rel="noopener noreferrer"` on new-window links
- No theme-side storage of extract requests or appeals
- Uploads go through the Media Library
- Roles: Administrator (theme/settings), Editor (Pages, Posts, Departments, menus), Author only if news workflow needs it
- Multilingual fields follow the same escape rules
- Personal and medical information: treat instructional pages as public text only

This is not a certification. Implementation review is required before launch.

---

## 24. Multilingual readiness handoff (Stage 7B)

Default public language today is Russian. Placeholders exist for BY and EN (`href="#"`).

Stage 7B must resolve:

- Default language and whether RU stays unprefixed
- URL model for BY and EN
- Linked translations for Pages, Posts, Departments, menus, and categories
- Switcher placement in the topbar and drawer
- Missing-translation behavior
- Breadcrumb labels
- Search limited to the current language
- Shared fields (phones) vs translated fields (titles, body, posters)
- Image/document variants (dispensarization posters contain text)
- SEO titles, descriptions, `hreflang`
- Translated slugs
- Editor workflow

Do not choose a multilingual plugin in Stage 7A. Do not create translated Pages now.

The theme should already use a text domain and `__()` for chrome strings (Search, Menu, All news) so 7B can translate UI without rewriting templates.

---

## 25. Plugin decision register

| Capability | Core enough? | Theme enough? | Plugin evaluation? | Selection criteria | Dependency risk | Decision stage |
| --- | --- | --- | --- | --- | --- | --- |
| Multilingual | Not by itself for three public languages | Chrome strings only | Yes | RU/BY/EN, linked records, slugs, beginner editors | High if chosen early | **7B** |
| Structured fields | Meta API works | Simple metaboxes yes | Only if editors cannot use metaboxes | No visual lock-in, exportable data | Medium | After Department implementation starts |
| Forms | Comments are not enough | Do not build a medical form | Yes, after privacy rules | No medical data in WP without approval | High | After privacy/security stage |
| Breadcrumbs | No | Yes for this tree | Only if 7B outgrows the theme | Schema optional | Low | 7B / SEO if needed |
| SEO titles | `title-tag` + manual excerpts | Basic | Optional | Must not fight the theme title pattern | Medium | Near launch |
| Redirects | Manual | Small map possible | Yes if many legacy URLs | Import from `data-source-path` | Low | Content migration |
| Caching | — | — | Host or plugin | Must not break menus/search | Medium | Deployment preparation |
| Security hardening | Updates + roles | Escape/sanitize | Optional host stack | Do not replace careful theme code | Medium | Deployment |
| Backups | — | — | Host or plugin | Full DB + uploads | Low | Deployment |
| Image optimization | `srcset` | Registered sizes | Optional | Must keep alt text | Low | After media migration |

No preferred plugin is named.

---

## 26. Migration inventory

| Item | Classification |
| --- | --- |
| 21 ordinary article, hub, and table Pages (every production file except homepage, search, department index, two department records, news archive, and the three news-state files) | Migrate manually as Pages, or programmatically if a clean source export exists |
| Homepage | Create as the static front page; migrate field values |
| `search-results.html` | Exclude as a Page; `search.php` replaces it |
| `preview.html` | Exclude |
| Women’s consultation, Uritskaya AOP | Create as Department records |
| Remaining 16 departments | Create as structured content from the source site |
| Three news-state files | Create as templates; migrate real posts from the clinic corpus, not English samples |
| Clinic news corpus | Programmatic import if XML is clean; otherwise batch manual. Exclude theme samples |
| Menus | Recreate manually from `docs/42` |
| Administration portraits, tourism photo, dispensarization posters | Media Library |
| Placeholder SVGs | Theme fallbacks, not uploads |
| Paid-service PDFs | Media Library or keep external until copied |
| External portals | Keep external |
| Global clinic details | Create as settings |
| Category Новости | Create as taxonomy |
| Source redirects | Create from the path map |
| Deferred Information / About / Contacts children | Create as Pages when content is approved |
| Search | Configure included types; no content item |
| Language versions | Stage 7B |

`medical-tourism.html` is a source **post** used as a homepage action (`docs/44`). Migrate it as a **Page** so the quick action does not disappear from a news archive. Do not also keep a duplicate Post.

---

## 27. Implementation sequence

Start only after this architecture is approved. Do not install WordPress in Stage 7A.

| Stage | Scope | Depends on | Output | Verification | Do not expand into | Done when |
| --- | --- | --- | --- | --- | --- | --- |
| 1. Environment | Local PHP WordPress, empty site | Approval | Running WP | Admin login, pretty permalinks | Content migration, plugins for multilingual/forms | Clean WP runs |
| 2. Theme skeleton | `style.css`, `functions.php`, `index.php`, `theme.json` | 1 | Activatable theme | Theme appears, no fatals | Visual polish | Theme activates |
| 3. Tokens and assets | Port CSS, icons, placeholders, fonts, enqueue | 2 | Visual tokens on a blank page | Colors, Inter, favicon | New components | Assets load versioned |
| 4. Shared shell | `header.php`, `footer.php`, skip link | 3 | Shell on fallback | Skip link, landmarks | Menu content inventing | Shell matches static chrome |
| 5. Navigation and breadcrumbs | Menu locations, walker, drawer JS, crumbs | 4 | Menus work | 1440 vs 1439, keyboard, no `.html` | Adding «Для пациентов» by default | `docs/42` behavior preserved |
| 6. Standard `page.php` | Title, content, patterns | 5 | Ordinary Pages | One `h1`, 48rem prose | New page templates | Booking-like Page matches |
| 7. Homepage | `front-page.php` parts | 5–6, settings | Homepage | Section order, empty slots | Free Gutenberg homepage | Matches `index.html` structure |
| 8. Departments | CPT, meta, archive, single | 6 | 2 sample records first | Optional fields omit wrappers | Building all 16 immediately | One template serves both samples |
| 9. News | `archive.php`, `single.php` | 6 | Category + 3 media states | No empty figure | Extra news PHP | One `single.php` |
| 10. Search and pagination | `search.php`, forms, pagination | 6–9 | Live `?s=` | XSS-safe query, both states | AJAX | Demo JS gone |
| 11. Tables | Wrapper + directories | 6 | Three table Pages | Overflow, rowspan | Table-block-only districts | Matches static tables |
| 12. Media | Sizes, Library, alt | 7–9 | Slots filled | Placeholders | New photography | No empty gaps |
| 13. Forms / externals | Keep links; no medical storage | 6 | Documented externals | tutmed and обращения.бел | Form plugin | No PHI in WP |
| 14. Multilingual | Stage 7B | 1–12 | 7B spec then impl | Switcher, fallbacks | Translating all content early | 7B complete |
| 15. Content migration | Pages, 18 departments, news, menus, redirects | 8–12 | Content in WP | URL map | Theme-sample posts | Inventory cleared |
| 16. Gutenberg stress | Long titles, missing media, simple tables | 15 | Editor guide | Layout holds | Unlocking the shell | Editors cannot break header |
| 17. A11y and responsive QA | 390 / 768 / 1440 | 16 | QA record | No overflow, nav OK | Redesign | Matches static checks |
| 18. Documentation | Editor and deploy guides | 17 | Updated docs | Beginner-readable | New features | Guides match the theme |
| 19. Deploy prep | Host, backups, cache, redirects | 18 | Launch checklist | Staging URL | GitHub Pages PHP | Hosting decided |

---

## 28. Open decisions

Only decisions that still need a choice. Ordinary PHP work is not listed.

| Decision | Why it matters | Options | Evidence | Missing | Stage | Blocks implementation? |
| --- | --- | --- | --- | --- | --- | --- |
| Add «Для пациентов» to the primary menu? | Source has it; approved static header does not | Keep shortened menu; add the item when the Page exists | `docs/42`, `docs/44` §F | Product preference | Menu setup / 7B | No. Theme supports either |
| Department admin UI: metabox vs later fields plugin | Editors must maintain 18 records | Theme metabox first; evaluate a fields plugin only if painful | §5 | Real editor trial | After first Department build | No |
| Districts / phone tables: theme table vs later structured UI | Rowspan will break in a normal Table block | Theme-rendered rows (recommended); later plugin table UI | `docs/41`, Stage 6F.2 | Editor comfort | Tables stage | No. Do not use a free Table block |
| `medical-tourism` as Page vs Post | Source post vs homepage action | Page (recommended); Post only | `docs/44` | None material | Migration | No |
| Breadcrumb plugin | Only if 7B/SEO needs schema the theme cannot print | Theme first | §11 | SEO requirements | 7B / SEO | No |
| Hosting | GitHub Pages cannot run PHP | Any PHP host + staging | `docs/19`, `docs/39` | Provider | Sequence step 1 | **Yes for runtime**, not for this specification |
| Form product for extract / personal appeals | Medical/personal data | Stay instructional; later approved form | §20 | Legal/privacy rules | Privacy stage | No for first theme |
| Multilingual plugin and URL prefix | Three languages | Unresolved | §24 | 7B research | **7B** | No for RU-only theme |

---

## 29. Architecture definition of done

Stage 7A is complete when all of the following are true:

- All 30 production static pages and `preview.html` are mapped
- Content instances share templates; three news files are one `single.php`; two department files are one `single-department.php`
- The minimum PHP set in §2 is defined and redundant templates are rejected
- Pages, Posts, Departments, search, archives, and the homepage are covered
- Gutenberg versus theme boundaries are explicit
- Dynamic replacements and static-demo removals are listed
- Media, icons, CSS, and JS migration rules are listed
- Navigation does not carry GitHub Pages path tricks
- Migration inventory separates templates from content
- Plugin choices are deferred with criteria
- Stage 7B multilingual handoff is written
- Implementation sequence is dependency-ordered
- Open decisions are genuine
- No WordPress or static production file was created or changed in this stage

---

## Terms used with editors

- **Страница (Page)** — постоянный раздел: Контакты, Режим работы.
- **Запись (Post)** — новость с датой.
- **Подразделение (Department)** — карточка из раздела «Структурные подразделения».
- **Меню** — список ссылок в админке «Внешний вид → Меню».
- **Медиатека** — загруженные фото и файлы.
- **Блок** — абзац, список, изображение в редакторе.
- **Шаблон** — то, что нельзя сломать: шапка, подвал, сетка главной.

Editors change words, phones, files, and photos. They do not rebuild the header.
