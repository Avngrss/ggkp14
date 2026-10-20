# Stage 6J — Header and dropdown coverage reaudit

Date: 2026-09-24

Audit only. No page was created, and no production HTML, CSS, or JavaScript was changed. WordPress and multilingual work stayed paused.

Stage 6K.1 later implemented four of the missing paths. The sections below stay the 6J record. The current result is in §21.

Stage 6K.2 (`docs/51-full-header-parity-and-remaining-pages.md`) rechecked the live header in the browser and by UTF-8 fetch on 24 September 2026. Three 6J statements are superseded: `/nashi-partnery/` returned HTTP 200, h1 «Наши партнеры», and no table; `/o-nas/profsojuz/` returned HTTP 200 with one table, so it is not a prose-only article; `/o-nas/grafik-priema-grazhdan-administraciej/` returned HTTP 200 with four tables. `/administrativnye-procedury/` again returned HTTP 403 before a body could be read.

## 1. Audit scope

The question is whether every important internal page in the live GGKP14 header is represented by a local static page. The earlier Scenario 2 boundary covered the approved local menu. This pass rebuilds the live menu from the current homepage and compares it with `src/pages/`.

## 2. Inspection method

- Local preview: `python -m http.server` on `src/`, the same server the repository preview script uses. `http://127.0.0.1:8772/pages/index.html` returned HTTP 200. The server was stopped afterward.
- Local menus were read from `src/pages/index.html` (topbar, desktop nav, dropdowns, drawer, footer). Department templates add one extra drawer link. That was checked in the HTML, not assumed from an old note.
- Live site: HTTPS fetch of `https://ggkp14.by/` on 24 September 2026, UTF-8, HTTP 200. Playwright was not used. The certificate problem from earlier stages was avoided by reading the markup directly.
- Primary menu: `ul#navigation`. Top bar: `ul#top_line_nav`. Footer: `footer#footer` contains only the copyright line.
- Mobile: the responsive control is `a.responsive_nav` with `href="javascript:void(0)"`. It does not contain a second list of links. The same `#navigation` and `#top_line_nav` are the mobile menus. The open drawer was not clicked.
- A few similar URLs were fetched again so a shared title was not treated as the same page. One later batch returned HTTP 403 before every remaining body could be sampled.

## 3. Current local production inventory

30 production HTML files are in `src/pages/`, plus development-only `preview.html`.

`about.html`, `administration.html`, `adult-dispensary-examinations.html`, `applicant-2023.html`, `contacts.html`, `content-page.html`, `department.html`, `department-aop.html`, `departments-index.html`, `dispensarization.html`, `electronic-appeals.html`, `email-addresses.html`, `five-steps.html`, `hot-line.html`, `index.html`, `information.html`, `medical-extract-order.html`, `medical-tourism.html`, `news-archive.html`, `news-single.html`, `news-single-no-media.html`, `news-single-video.html`, `paid-services.html`, `personal-appeals.html`, `search-results.html`, `sexological-help.html`, `table-page.html`, `territorial-districts.html`, `vacancies.html`, `working-hours.html`.

## 4. Source desktop header inventory

Seven top-level items in `ul#navigation`:

| Label | Path |
| --- | --- |
| Главная | `/` |
| Прямые линии | `/o-nas/grafik-pryamyh-telefonnyh-linij/` |
| Платные услуги | `/platnye-uslugi-2/` |
| Информация | `/informaciya/` |
| Контакты | `/contacts/` |
| Абитуриент 2026 | `/abiturient-2023/` |
| Для пациентов | `/dlya-pacientov/` |

## 5. Source dropdown inventory

36 linked items are in the primary menu, including the 7 parents. Nested items sit under Информация, under О нас, under Административные процедуры, and under Контакты. One child leaves the site.

Under Информация, first level:

| Label | Path |
| --- | --- |
| О нас | `/o-nas/` |
| Новости | `/category/novosti/` |
| Режим работы | `/o-nas/rezhim-raboty/` |
| Вакансии | `/o-nas/vakansii/` |
| График приема граждан администрацией | `/o-nas/grafik-priema-grazhdan-administraciej/` |
| Административные процедуры | `/administrativnye-procedury/` |
| Диспансеризация | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` |
| Порядок проведения профилактических осмотров | `/informaciya/poryadok-provedeniya-profilakticheskih/` |
| Помощь в лечении зависимости | `/pomoshh-pri-alkogolizme/` |
| Порядок признания граждан недееспособными | `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` |
| Общественные организации | `/o-nas/obshhestvennye-organizacii/` |
| Профилактика киберпреступлений | `/kiberprestupnost/` |
| Противодействие экстремизму | `/protivodejstvie-ekstremizmu/` |
| Меры поддержки по реализации Указа 631 | `/informaciya/mery-po-realizacii-ukaza-631/` |

Under О нас:

| Label | Path |
| --- | --- |
| Территориальные участки | `/o-nas/territorialnye-uchastki/` |
| Администрация | `/o-nas/administraciya/` |
| Структурные подразделения | `/o-nas/strukturnye-podrazdeleniya/` |
| Работа по противодействию коррупции | `/o-nas/rabota-po-protivodejstviju-korrupcii/` |
| Профсоюз | `/o-nas/profsojuz/` |
| Наши партнеры | `/nashi-partnery/` |
| Санаторий «Серябряные ключи» | `https://sansk.by/` |

Under Административные процедуры:

| Label | Path |
| --- | --- |
| Порядок получения выписки из медицинских документов | `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/` |
| Паллиативная медицинская помощь | `/palliativnaya-medicinskaya-pomoshhi/` |
| Идеология | `/informaciya/ideologiya/` |

Under Контакты:

| Label | Path |
| --- | --- |
| Контактные телефоны администрации | `/contacts/kontaktnye-telefony-administracii/` |
| Контактные телефоны сотрудников | `/contacts/kontaktnye-telefony-sotrudnikov/` |
| Режим работы и контактные телефоны структурных подразделений | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` |
| Адреса электронной почты | `/adresa-elektronnoj-pochty/` |
| Горячая линия | `/contacts/goryachaya-liniya/` |

Электронные обращения is not in this menu. It appears on the homepage slider and in a homepage list labeled «Работа с обращениями граждан».

## 6. Source mobile navigation inventory

There is no second mobile link list in the homepage HTML. A button with `href="javascript:void(0)"` toggles the same primary menu, and another button toggles the same top bar. Until a click-through is done, source mobile destinations are the desktop header plus the top bar.

## 7. Local header and dropdown inventory

Desktop `nav.main-nav` in `src/pages/index.html`:

| Label | Local file | Source path |
| --- | --- | --- |
| Главная | `index.html` | `/` |
| Прямые линии | `table-page.html` | `/o-nas/grafik-pryamyh-telefonnyh-linij/` |
| Платные услуги | `paid-services.html` | `/platnye-uslugi-2/` |
| Информация | `information.html` | `/informaciya/` |
| Общая информация | `information.html` | `/informaciya/` |
| О нас | `about.html` | `/o-nas/` |
| Администрация | `administration.html` | `/o-nas/administraciya/` |
| Режим работы | `working-hours.html` | `/o-nas/rezhim-raboty/` |
| Контакты | `contacts.html` | `/contacts/` |
| Контактная информация | `contacts.html` | `/contacts/` |
| Горячая линия | `hot-line.html` | `/contacts/goryachaya-liniya/` |
| Электронные обращения | `electronic-appeals.html` | `/contacts/elektronnye-obrashheniya/` |
| Адреса e-mail | `email-addresses.html` | `/adresa-elektronnoj-pochty/` |
| Абитуриент 2026 | `applicant-2023.html` | `/abiturient-2023/` |

«Запись к врачу» in the header points to `content-page.html` (`/zapis-k-vrachu/`). It is a button, not a dropdown item.

## 8. Local mobile drawer inventory

The drawer repeats the desktop links except:

- Адреса e-mail is not in the drawer.
- Режим работы is under the Служебное group, not under Информация.
- Вакансии is in the drawer. It is not in the desktop dropdown.
- The clinic email is a `mailto:` link.
- `department.html`, `department-aop.html`, and `departments-index.html` add «Структурные подразделения». Other pages do not.

Top bar, desktop only: Режим работы, Горячая линия, Структурные подразделения, Территориальные участки, Вакансии, Контакты.

Footer, which the live site does not have as a link list: Главная, О нас, Контакты, Платные услуги, Новости, Запись к врачу, Электронные обращения, Режим работы, Вакансии.

RU is the current language. BY and EN are `href="#"` on every production page.

## 9. Count reconciliation

Counts use canonical paths. The same path in the top bar and a dropdown is one destination. `https://sansk.by/`, `mailto:`, `tel:`, `#` language links, and `javascript:void(0)` are not internal pages. The dispensarization redirect is not a second page.

| Count | Paths |
| --- | --- |
| 35 | Unique internal paths in the live primary menu, listed in §4 and §5, excluding `https://sansk.by/` |
| 36 | Those 35 plus the top-bar-only chief-doctor page under `/home-store/…` |
| 12 | Unique internal paths in the local desktop header and dropdowns (§7), not counting the booking button |
| 16 | Live primary paths that already have an exact local file: `/`, phone lines, paid services, `/informaciya/`, `/o-nas/`, districts, administration, departments, news, hours, vacancies, dispensarization, contacts, email, hot line, applicant |
| 19 | Live primary paths with no local file. Listed in §11 |
| 24 | Live primary paths absent from the local desktop header and dropdowns. 19 have no file. Five exist elsewhere: news in the footer, districts and departments and vacancies in the top bar, dispensarization on the homepage and Information landing |
| 1 | Local header path absent from the live header: `/contacts/elektronnye-obrashheniya/` |
| 1 | External menu destination: `https://sansk.by/` |
| 2 | Local duplicate labels for one path: «Информация» and «Общая информация»; «Контакты» and «Контактная информация» |
| 0 | Live header aliases that are a second file. The short dispensarization path redirects to the Information article. It is not a menu item. The menu uses the canonical Information path |

## 10. Exact coverage matrix

| Live path | In live header | Local file | Exact | Still on ggkp14.by from that menu | Class |
| --- | --- | --- | --- | --- | --- |
| `/` | Yes | `index.html` | Yes | No | Covered |
| `/o-nas/grafik-pryamyh-telefonnyh-linij/` | Yes | `table-page.html` | Yes | No | Covered |
| `/platnye-uslugi-2/` | Yes | `paid-services.html` | Yes | No | Covered |
| `/informaciya/` | Yes | `information.html` | Yes | No | Covered |
| `/o-nas/` | Yes | `about.html` | Yes | No | Covered |
| `/o-nas/territorialnye-uchastki/` | Yes | `territorial-districts.html` | Yes | No | Covered, but only in the local top bar |
| `/o-nas/administraciya/` | Yes | `administration.html` | Yes | No | Covered |
| `/o-nas/strukturnye-podrazdeleniya/` | Yes | `departments-index.html` | Yes | No | Covered in the top bar, and in the drawer only on department pages |
| `/category/novosti/` | Yes | `news-archive.html` | Yes | No | Covered in the local footer, not the local header |
| `/o-nas/rezhim-raboty/` | Yes | `working-hours.html` | Yes | No | Covered |
| `/o-nas/vakansii/` | Yes | `vacancies.html` | Yes | No | Covered in the top bar, drawer, and footer, not the desktop dropdown |
| Dispensarization Information path | Yes | `dispensarization.html` | Yes | No | Covered outside the local header |
| `/contacts/` | Yes | `contacts.html` | Yes | No | Covered |
| `/adresa-elektronnoj-pochty/` | Yes | `email-addresses.html` | Yes | No | Covered on desktop only |
| `/contacts/goryachaya-liniya/` | Yes | `hot-line.html` | Yes | No | Covered |
| `/abiturient-2023/` | Yes | `applicant-2023.html` | Yes | No | Covered |
| `/dlya-pacientov/` | Yes, top level | None | No | Yes | Missing |
| Corruption, union, partners, public organizations | Yes | None | No | Yes | Missing |
| Citizen reception schedule | Yes | None | No | Yes | Missing |
| Administrative procedures and its three children | Yes | None | No | Yes | Missing |
| Preventive exams, addiction help, incapacity, cybercrime, extremism, decree 631 | Yes | None | No | Yes | Missing |
| Three contact phone and hours pages | Yes | None | No | Yes | Missing |
| `https://sansk.by/` | Yes | None | External | External | Keep external |
| Chief-doctor `/home-store/…` page | Top bar only | None | No | Yes | Form embed, not a normal article |
| `/contacts/elektronnye-obrashheniya/` | No | `electronic-appeals.html` | Local header only | No | Local addition. The live page is real, but it is not in the live header |

The other 14 production files are real pages, but they are not live header destinations. They include booking, the six homepage actions, three news states, two department examples, search, and adult dispensary examinations.

## 11. Previously missed pages

`docs/42` already listed this longer source menu and left it out of the approved local header on purpose. This pass confirms that menu is still current. It was not a stale note.

What is still easy to miss is the difference between similar titles. Those pages are not covered by a nearby local file. See §12.

The 19 primary paths with no local file:

1. `/dlya-pacientov/`
2. `/o-nas/rabota-po-protivodejstviju-korrupcii/`
3. `/o-nas/profsojuz/`
4. `/nashi-partnery/`
5. `/o-nas/obshhestvennye-organizacii/`
6. `/o-nas/grafik-priema-grazhdan-administraciej/`
7. `/administrativnye-procedury/`
8. `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/`
9. `/palliativnaya-medicinskaya-pomoshhi/`
10. `/informaciya/ideologiya/`
11. `/informaciya/poryadok-provedeniya-profilakticheskih/`
12. `/pomoshh-pri-alkogolizme/`
13. `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/`
14. `/kiberprestupnost/`
15. `/protivodejstvie-ekstremizmu/`
16. `/informaciya/mery-po-realizacii-ukaza-631/`
17. `/contacts/kontaktnye-telefony-administracii/`
18. `/contacts/kontaktnye-telefony-sotrudnikov/`
19. `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/`

`docs/42` did record these. Later stages built other pages and did not build these. They are deferred by that scope decision, not absent from the old inventory.

## 12. Similar-title and alias review

Fetched on 24 September 2026:

| Path | Result | Local file |
| --- | --- | --- |
| `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Title «Диспансеризация». This is the menu item | `dispensarization.html` |
| `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Redirects to the path above. Not a second article | Same file. Not a menu item |
| `/informaciya/poryadok-provedeniya-dispansernyh-osmotrov-vzroslogo-naseleniya/` | Title «Порядок проведения диспансерных осмотров взрослого населения». Different article | `adult-dispensary-examinations.html`. Not in the live header |
| `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/` | Stays on that URL. Title «Порядок получения выписки из медицинских документов» | No file. This is the menu item |
| `/zakaz-vypiski-iz-medicinskih-dokumentov/` | Stays on that URL. Title «Заказ выписки из медицинских документов» | `medical-extract-order.html`. Homepage action, not this menu item |
| `/o-nas/administraciya/` | Staff page | `administration.html` |
| `/contacts/kontaktnye-telefony-administracii/` | Different URL. The fetched page contains one table | No file |
| `/o-nas/grafik-pryamyh-telefonnyh-linij/` | Direct lines | `table-page.html` |
| `/contacts/kontaktnye-telefony-sotrudnikov/` | Different URL. One table | No file |
| `/o-nas/rezhim-raboty/` | Clinic hours | `working-hours.html` |
| `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` | Different URL. One table | No file |
| `/contacts/` | Landing | `contacts.html` |
| `/contacts/elektronnye-obrashheniya/` | Appeals page, not in the live header | `electronic-appeals.html` |
| `/lichnye-obrashheniya-grazhdan/` | Not in the live header | `personal-appeals.html` |

## 13. Desktop and mobile differences

Live site: one primary menu and one top bar. Mobile is a toggle, not a different set of URLs in the HTML. The toggle was not opened in a browser.

Local site, already approved and still true:

- Email and territorial districts are not in the drawer.
- Vacancies are in the drawer and top bar, not in a desktop dropdown.
- Working hours sits under Информация on desktop and under Служебное in the drawer.
- Departments are in the top bar on every page and in the drawer only on the three department templates.
- The live top bar includes Профсоюз and the chief-doctor form. The local top bar does not.
- The live footer has no link list. The local footer does.

## 14. Existing template reuse

| Missing page | Reuse | Why |
| --- | --- | --- |
| Three contact phone and hours pages | `table-page.html` | Each fetched page contains one table |
| Corruption | `content-page.html` | Fetched page contains no table |
| Для пациентов | `content-page.html` or the landing-card pattern | Fetched page contains no table. The body layout was not fully read |
| Citizen reception, procedures hub, partners, and the other prose items | `content-page.html` unless a later read shows a card hub | Procedures and partners returned HTTP 403 before a table count. Do not invent a layout for them |
| Sanatorium | None | External site |
| Chief-doctor page | None for a local form | The URL is a Yandex form embed |

Department records and news posts that are not in this header menu stay on the existing department and news templates. They are not part of this 19.

## 15. Confirmed new template needs

None. No fetched missing page showed a structure that the article, table, or landing-card patterns cannot hold. Procedures, partners, and Для пациентов still need a body check before implementation, not a new template in advance.

## 16. Navigation-complete boundary

Every internal destination in the approved local header, dropdowns, drawer, top bar, and footer already has a local file.

Remaining work for this boundary: none.

Still not pages: BY and EN `href="#"`, `mailto:`, telephone links, and partner sites in the page body.

## 17. Source-header-complete boundary

Every internal destination in the live primary menu would have a local page. That adds the 19 paths in §11.

| Suggested file | Template | Where it is reached |
| --- | --- | --- |
| `for-patients.html` | Article or landing cards | Top-level header item missing locally |
| `anti-corruption.html` | Article | Information → О нас |
| `trade-union.html` | Article | Information → О нас, and the live top bar |
| `partners.html` | Article or cards | Information → О нас |
| `public-organizations.html` | Article | Information dropdown |
| `administration-reception.html` | Article or table | Information dropdown. Not the direct-line page |
| `administrative-procedures.html` | Article or cards | Information dropdown |
| `medical-extract-procedure.html` | Article | Child of procedures. Not `medical-extract-order.html` |
| `palliative-care.html` | Article | Child of procedures |
| `ideology.html` | Article | Child of procedures |
| `preventive-examinations.html` | Article | Information dropdown |
| `addiction-help.html` | Article | Information dropdown |
| `incapacity.html` | Article | Information dropdown |
| `cybercrime.html` | Article | Information dropdown |
| `extremism.html` | Article | Information dropdown |
| `decree-631.html` | Article | Information dropdown |
| `administration-phones.html` | Table | Contacts dropdown |
| `staff-phones.html` | Table | Contacts dropdown |
| `department-hours-phones.html` | Table | Contacts dropdown |

Priority: Для пациентов first, then the three Contacts tables, then the reception schedule and the extract procedure page, because those are the easiest to confuse with pages that already exist. The remaining prose pages follow. Do not add them to the local menu until the page exists.

Still safe to leave for WordPress, even under this boundary:

- The 16 department records that are not in the header menu.
- The news corpus beyond the archive and the three sample articles.
- The chief-doctor Yandex form.
- `https://sansk.by/`.
- Homepage-only pages that are already local.

## 18. Recommended static scope

Use the source-header-complete boundary before WordPress if the static header is meant to stand in for the public header. The live dropdowns still open 19 internal pages that have no local file. They are ordinary articles or tables, not a reason to design a new template, and not a reason to resume the multilingual specification.

Keep the navigation-complete boundary only if the project owner again accepts the shorter local menu. That boundary is already met. It hides top-level «Для пациентов» and the live Information and Contacts children.

## 19. Revised implementation order

1. Confirm this boundary.
2. Build Для пациентов.
3. Build the three Contacts table pages on `table-page.html`.
4. Build the citizen-reception page and the menu extract page as their own files.
5. Build the remaining Information and About dropdown articles.
6. Only then return to WordPress. Do not add the 19 URLs to the menu before the files exist.
7. Leave the chief-doctor form, the sanatorium, the rest of the departments, and the news corpus for WordPress or external links.

## 20. Risks and open decisions

- The responsive menu was not opened in a browser. A script could still inject links that are not in the fetched HTML. None were found in the markup.
- Procedures, partners, and the full Для пациентов body were not fully read. The procedures request returned HTTP 403.
- Whether «Для пациентов» is added to the local header is a product choice. The page itself is a live top-level item.
- Electronic appeals are in the local header and not in the live header. Removing that local item was not part of this audit.
- Filename suggestions are recommendations only. No files were created.

## 21. Stage 6K.1 implementation

Date: 2026-09-24. WordPress and multilingual work stayed paused. No commit or push.

### Implemented destinations

| Visible label | Canonical path | Browser title | Visible h1 | Breadcrumb | Type | Local file | Template |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Для пациентов | `/dlya-pacientov/` | Для пациентов — site name | Для пациентов | Главная → Для пациентов | Article plus two document links | `for-patients.html` | `content-page` prose, lists, document links |
| Контактные телефоны администрации | `/contacts/kontaktnye-telefony-administracii/` | Контактные телефоны администрации — site name | Контактные телефоны администрации | Главная → Контакты → page | 3-column table, 3 rows | `administration-phones.html` | `table-page` scroll table |
| Контактные телефоны сотрудников | `/contacts/kontaktnye-telefony-sotrudnikov/` | Контактные телефоны сотрудников — site name | Контактные телефоны сотрудников | Главная → Контакты → page | 3-column table, 21 rows, no source header row | `staff-phones.html` | `table-page` scroll table |
| Режим работы и контактные телефоны структурных подразделений | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` | same label — site name | same label | Главная → Контакты → page | 3-column table, 8 rows | `department-hours-phones.html` | `table-page` scroll table |

None of these URLs redirected. They stay separate from `administration.html`, `table-page.html`, `working-hours.html`, and `contacts.html`.

Production count: 34 HTML pages in `src/pages/`, plus development-only `preview.html`. Publication rewrite list: 33 siblings plus root `index.html`.

### Remaining source-header scope

15 internal header paths still have no local file:

1. `/o-nas/rabota-po-protivodejstviju-korrupcii/`
2. `/o-nas/profsojuz/`
3. `/nashi-partnery/`
4. `/o-nas/obshhestvennye-organizacii/`
5. `/o-nas/grafik-priema-grazhdan-administraciej/`
6. `/administrativnye-procedury/`
7. `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/`
8. `/palliativnaya-medicinskaya-pomoshhi/`
9. `/informaciya/ideologiya/`
10. `/informaciya/poryadok-provedeniya-profilakticheskih/`
11. `/pomoshh-pri-alkogolizme/`
12. `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/`
13. `/kiberprestupnost/`
14. `/protivodejstvie-ekstremizmu/`
15. `/informaciya/mery-po-realizacii-ukaza-631/`

`/administrativnye-procedury/` was not implemented. An earlier fetch returned HTTP 403 before its body could be read, and it was outside this batch.

### Navigation

Desktop, after the local page existed:

- «Для пациентов» is the last top-level item, after «Абитуриент 2026», matching the live order.
- The Contacts dropdown keeps «Контактная информация», then the three directories, then «Горячая линия», «Электронные обращения», and «Адреса e-mail». Electronic appeals stay.

Mobile drawer uses the same destinations. The three directories sit in the Contacts group. «Для пациентов» sits after «Абитуриент 2026». Email addresses stay desktop-only, as before. The long department-hours label wraps inside the Contacts dropdown (`max-width: 20rem`); other dropdowns are unchanged.

Exact source paths in production HTML now point at the local files and keep `data-source-path`. Unimplemented children were not added.

### Template reuse and source limits

No new page template. Directory tables reuse the scroll wrapper, hint, and `data-table` markup. A `data-table--directory` rule keeps names and schedules wrapping and phone links on one line.

Patients page: the live body is one article. Two closed spoilers hold RTF downloads. Those files are document links, not a new accordion. The second spoiler’s closed title repeats the law title; the download label is the Council of Ministers resolution, and that download label is what the local page shows. Bold source paragraphs are headings. Semicolon series are lists. Source wording is unchanged, including «реабилитации)» and «обращайтесь в заместителю».

Staff table: the source has no header row. Column names «Ф.И.О.», «Должность», and «Телефон» are visually hidden so the visible table matches the source. Surnames stay on their own line. Non-breaking spaces inside roles were rendered as normal spaces so the text can wrap.

Department table: three rows have an empty phone cell (laboratory, treatment room, pre-doctor office). «(A1)» stays text beside the mobile numbers.

Every `tel:` value is the visible `+375` number with spaces and separators removed. No room, date, or extension was linked.

Evidence: `docs/audit/stage-6k1/`.

## 22. Stage 6K.3 About pages

Date: 2026-09-24. The five About-batch files now exist, and the Information menu contains an About flyout. Production HTML is 39 pages plus `preview.html`. Ten header paths remain, including `/administrativnye-procedury/`, which is still HTTP 403 and was not invented. The current list is in `docs/51-full-header-parity-and-remaining-pages.md` §17. Evidence: `docs/audit/stage-6k3/`.

## 23. Stage 6K.4 Information batch 1

Date: 2026-09-24. Five Information pages now exist:

- `medical-extract-procedure.html` → `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/`
- `palliative-care.html` → `/palliativnaya-medicinskaya-pomoshhi/`
- `ideology.html` → `/informaciya/ideologiya/`
- `preventive-examinations.html` → `/informaciya/poryadok-provedeniya-profilakticheskih/`
- `addiction-help.html` → `/pomoshh-pri-alkogolizme/`

The Information dropdown and drawer now include these five destinations in source order (excluding the blocked procedures parent). `information.html` now points the preventive-examinations card to the local file.

Production count: 44 HTML pages plus development-only `preview.html`.

Five internal header paths still have no local file:

1. `/administrativnye-procedury/` (HTTP 403, still blocked)
2. `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/`
3. `/kiberprestupnost/`
4. `/protivodejstvie-ekstremizmu/`
5. `/informaciya/mery-po-realizacii-ukaza-631/`

Evidence: `docs/audit/stage-6k4/`.

## 24. Stage 6K.5 Information batch 2 (final readable pages)

Date: 2026-09-24. Four remaining readable Information pages now exist:

- `incapacity.html` → `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/`
- `cybercrime.html` → `/kiberprestupnost/`
- `extremism.html` → `/protivodejstvie-ekstremizmu/`
- `decree-631.html` → `/informaciya/mery-po-realizacii-ukaza-631/`

The Information dropdown and drawer now include these four entries in source order after the Stage 6K.4 items. `information.html` now points the incapacity card to the local page.

Production count: 48 HTML pages plus development-only `preview.html`.

Remaining internal source-header path without a local file:

1. `/administrativnye-procedury/` (still blocked)

Latest access result for `/administrativnye-procedury/`: Playwright failed with `ERR_CERT_COMMON_NAME_INVALID`, and strict UTF-8 fetch returned HTTP 403. No body was available, so no local page and no navigation entry were added for that path.

Evidence: `docs/audit/stage-6k5/`.

## 25. Stage 6K.6 Administrative Procedures resolution

Date: 2026-10-20.

This stage supersedes the Stage 6K.5 statement that `/administrativnye-procedury/` remained blocked for implementation.

### Access results

- Playwright live homepage: HTTP 200.
- Playwright direct page `https://ggkp14.by/administrativnye-procedury/`: HTTP 403 (`403 Forbidden`).
- Strict UTF-8 fetch direct page: HTTP 403.
- Live menu DOM confirms Information -> Administrative Procedures parent and three child entries.
- WordPress REST API (`slug=administrativnye-procedury`) returned published page id `15076` with canonical link and table content.
- `page-sitemap.xml` includes the same canonical URL.

### Outcome

- `administrative-procedures.html` is now implemented from verified source evidence.
- Information desktop dropdown and mobile drawer now include the Administrative Procedures parent row plus the three child destinations in source order.
- Preview/publication mappings include `administrative-procedures.html`.

Current production count: 49 HTML pages plus development-only `preview.html`.

Remaining internal source-header paths without local files: none.

Evidence: `docs/audit/stage-6k6/`.
