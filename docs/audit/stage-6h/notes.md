# Stage 6H Audit Notes

Date: 2026-09-23

Final static baseline regression of the current working tree as one product. No new production page was created. No commit or push.

## Inventory

| Item | Count | Result |
| --- | --- | --- |
| Production HTML in `src/pages/` | 30 | Matches preview and publication lists |
| Development-only HTML | 1 | `preview.html` |
| Search visual states | 2 | Same file: default results and `?state=empty` |
| Extra production HTML | 0 | None |
| Missing production HTML | 0 | None |
| Preview production cards | 30 unique files | Plus one empty-state card and the preview card |
| `pages.yml` rewrite list | 29 siblings + root `index.html` | 30 published pages |
| `simulate-pages-dist.py` | 29 siblings + root `index.html` | Same |

No contradiction with the Stage 6G.2 expected counts.

## Method

- Code inspection of every production HTML file, CSS, JS, preview, mappings, and current docs.
- Local HTTP checks against `http://127.0.0.1:8768/pages/` (clean server on `src/`).
- Playwright MCP browser checks at 390×844, 768×1024, and 1440×1000, plus the 1439/1440 navigation boundary.
- Simulated Pages artifact through `tools/simulate-pages-dist.py`, then removed `dist/`.
- Live-site Playwright remains blocked by `ERR_CERT_COMMON_NAME_INVALID`. Source-site classification used repository links, not a live click-through.

## Page matrix

Overflow is page-level `scrollWidth - clientWidth`. All listed pages returned HTTP 200 and exactly one `h1` at every required viewport.

| File | Title / h1 | Type | Breadcrumb | Nav context | 390 | 768 | 1440 | Overflow | Local links | Media | A11y | Layout | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `index.html` | Главная / clinic name | Homepage | None | Current: Главная | Pass | Pass | Pass | 0 | OK | Local placeholders | Skip, one h1 | OK | No Issue |
| `content-page.html` | Запись к врачу | Article | Главная / Запись к врачу | Booking CTA | Pass | Pass | Pass | 0 | OK | None required | OK | Prose 768px | A |
| `contacts.html` | Контакты | Contacts hub | Главная / Контакты | Contacts parent | Pass | Pass | Pass | 0 | 3 children remain source | Map slot | OK | OK | Documented Limitation |
| `table-page.html` | График прямых телефонных линий | Table | Главная / О нас / … | Прямые линии | Table scrolls in wrapper | Same | Fits | 0 | OK | None | OK | OK | No Issue |
| `search-results.html` | Результаты поиска | Search results | Главная / Поиск | Search forms | Pass | Pass | Pass | 0 | OK | None | OK | OK | No Issue |
| `search-results.html?state=empty` | Same file, empty state | Search empty | Same | Demo URL only | Pass | Pass | Pass | 0 | OK | None | Labelled retry field | OK | No Issue |
| `paid-services.html` | Платные услуги | Article + files | Главная / Платные услуги | Main nav current | Pass | Pass | Pass | 0 | PDFs external | None | OK | Prose 768px | Documented Limitation |
| `information.html` | Информация | Landing cards | Главная / Информация | Information parent | Pass | Pass | Pass | 0 | 2 children source | None | Current page | Short landing | A |
| `about.html` | О нас | Landing cards | Главная / О нас | About parent | Pass | Pass | Pass | 0 | 3 children source | None | Current page | Short landing | A |
| `applicant-2023.html` | ИНФОРМАЦИЯ ДЛЯ АБИТУРИЕНТОВ | Long article | Главная / … | Applicant current | Pass | Pass | Pass | 0 | Colleges external | None | OK | Long prose | A |
| `departments-index.html` | Структурные подразделения | Card index | Главная / О нас / … | Topbar | Pass | Pass | Pass | 0 | 16 cards source | None | OK | OK | Documented Limitation |
| `department.html` | Женская консультация | Department | 4-step | Representative | Pass | Pass | Pass | 0 | OK | Placeholder | OK | Prose 52rem | No Issue |
| `department-aop.html` | Урицкая АОП | Department variant | 4-step | Representative | Pass | Pass | Pass | 0 | OK | Placeholder | OK | OK | No Issue |
| `news-archive.html` | Рубрика: Новости | Archive | Главная / Новости | Footer | Pass | Pass | Pass | 0 | 7 cards source | Placeholders | Pagination visual | OK | Deferred To WordPress |
| `news-single.html` | Игра детей с огнём… | News + image | Главная / Новости / … | Representative | Pass | Pass | Pass | 0 | OK | Local/placeholder | OK | OK | No Issue |
| `news-single-video.html` | Областная профилактическая акция… | News + video slot | Same pattern | Representative | Pass | Pass | Pass | 0 | OK | Placeholder slot | OK | OK | Documented Limitation |
| `news-single-no-media.html` | Профилактика ВИЧ-инфекции. | News text | Same pattern | Representative | Pass | Pass | Pass | 0 | OK | None | OK | OK | Minor title period |
| `adult-dispensary-examinations.html` | Порядок проведения диспансерных осмотров… | Short article | Главная / Информация / … | Information child | Pass | Pass | Pass | 0 | Distinct from dispensarization | None | OK | Short prose | A |
| `working-hours.html` | Режим работы | Schedule groups | Главная / О нас / … | Shell current | Pass | Pass | Pass | 0 | Distinct from contacts hours path | None | OK | OK | No Issue |
| `hot-line.html` | Горячая линия | Contact groups | Главная / Контакты / … | Shell current | Pass | Pass | Pass | 0 | OK | None | OK | OK | No Issue |
| `administration.html` | Администрация | Staff article | Главная / О нас / … | Shell current | Pass | Pass | Pass | 0 | OK | 4 local portraits | OK | OK | Minor title dash |
| `vacancies.html` | Вакансии | Short article | Главная / О нас / … | Shell current | Pass | Pass | Pass | 0 | OK | None | OK | Short prose | A |
| `electronic-appeals.html` | ОБ ОБРАЩЕНИЯХ… | Legal article | Главная / Контакты / … | Shell current | Pass | Pass | Pass | 0 | Related schedules source | None | OK | OK | Documented Limitation |
| `email-addresses.html` | Адреса электронной почты | Directory table | Главная / … | Contacts dropdown | Fits | Fits | Fits | 0 | mailto only | None | Current page | Full table width | No Issue |
| `territorial-districts.html` | Территориальные участки | Roster table | Главная / О нас / … | Topbar current | Scrolls in wrapper | Fits | Fits | 0 | OK | None | OK | OK | No Issue |
| `medical-tourism.html` | Медицинский туризм | Service article | Source breadcrumb | Homepage action | Pass | Pass | Pass | 0 | OK | Local article image | OK | Prose + media | A / F note |
| `five-steps.html` | Сделай 5 шагов… | External-link article | Source breadcrumb | Homepage action | Pass | Pass | Pass | 0 | mentalhealth.by external | None | OK | Naturally short | A |
| `medical-extract-order.html` | Заказ выписки… | Procedure article | Source breadcrumb | Homepage action | Pass | Pass | Pass | 0 | No form | None | OK | OK | No Issue |
| `dispensarization.html` | Диспансеризация | Long FAQ article | Главная / Информация / … | Homepage + Information | Pass | Pass | Pass | 0 | Distinct from adult examinations | 2 local images | OK | Long article | A |
| `personal-appeals.html` | Личные обращения граждан | Procedure article | Source breadcrumb | Homepage action | Pass | Pass | Pass | 0 | Distinct from electronic appeals | None | OK | OK | No Issue |
| `sexological-help.html` | Сексологическая помощь | Public notice | Source breadcrumb | Homepage action | Pass | Pass | Pass | 0 | Helplines local tel | None | Neutral wording | OK | No Issue |
| `preview.html` | Локальное превью GGKP14 | Dev only | None | Not in shell | Pass | Pass | Pass | 0 | 32/32 HTTP 200 | None | Dev page | Excluded from dist | No Issue |

## Navigation

- Desktop navigation is `block` at 1440 and `none` at 1439. The menu toggle is the reverse. No width shows both or neither.
- Header search opens and closes; Escape closes.
- Keyboard Tab from the Information trigger reaches «Общая информация».
- Sticky header gains `is-scrolled`.
- Mobile drawer opens and closes; Escape closes.
- No approved shell `href` opens a `ggkp14.by` HTML page.
- All eight homepage quick actions open local files.
- No root-relative WordPress route exists in production HTML.

## Local and external links

- Inventory script: 0 missing local page targets, 0 missing local image paths, 0 root-relative routes.
- Preview: 32 internal links HTTP 200, including both search states.
- CSS, JS, icons, and sampled content images HTTP 200.
- Remaining `ggkp14.by` page links are departments, extra news posts, two Information children, three About children, three Contacts children, electronic-appeals related schedules, one representative search result, and four paid-service PDFs.

## Composition

Measured `.prose` width at 1440 is 768px (`48rem`) inside a 1320px container. That unused band is the approved readable measure, not a broken layout.

| Page | Category | Note |
| --- | --- | --- |
| Typical articles | A | Left-aligned 48rem column is appropriate |
| Department / news body | A | Intentional 52rem variant |
| `five-steps.html` | A | Source body is one external link. Footer follows content; do not invent filler |
| `vacancies.html`, adult dispensary article | A | Short source content |
| `information.html`, `about.html` | A | Card landings that fit the first screen |
| Tables | A | Use the full content container |
| `medical-tourism.html` | F optional | Existing article image placement is acceptable; do not add decorative media |
| Future Gutenberg combinations | G | Variable editor width and block stacks |

No composition change was made.

## Spacing

Heading-to-content gap on sampled articles is 32px (`--space-8` after the page-header border). Breadcrumb margin is `--space-4`. No accidental double-margin defect was confirmed. Do not normalize article spacing against homepage section padding.

## UTF-8

All production HTML files are UTF-8 without replacement characters. Recent Stage 6 files use LF. Older shared files still contain CRLF: `tokens.css`, `base.css`, `layout.css`, `homepage.css`, `responsive.css`, `menu.js`, `accessibility.js`, and `docs/38`. Classified as Minor pre-existing line-ending drift, not a UTF-8 defect. Not rewritten in this audit.

## Publication artifact

Simulated `dist/`:

- 30 pages under `dist/pages/`
- root `dist/index.html` uses `./css/` and `pages/…` targets
- `search-results.html` included once
- `preview.html` absent
- `.nojekyll` present

Then `dist/` was removed.

## Documentation corrections during the audit

- `docs/38`: search now documents explicit demo states.
- `docs/41` §4.2: working hours, hot line, and dispensarization marked covered; Information remaining children corrected to two.
- `docs/42` §18 item 7 marked done.
- `docs/44`: Stage 6H recorded; post-push page count and resolved dispensarization alias corrected.

## Evidence

- `homepage-1440.png`
- `five-steps-1440.png`
- `districts-390.png`
- `dispensarization-1440.png`

## Stage 6H.1 dispositions

- Title separator: later pages used a hyphen before the site name. Those eleven `<title>` values now use the established em dash. Visible `h1` text was not changed.
- No-media heading period: source-backed (`docs/34`). No product change.
- Favicon `/favicon.ico` 404: harmless browser fallback. Pages already reference `favicon.svg`. No ICO added.
- CRLF in older shared CSS/JS: UTF-8, no tooling defect. Line-ending rewrite deferred.
- Composition: unchanged. The 48rem prose column remains the approved measure.

The full pre-commit review is `docs/46-final-pre-commit-review.md`.
