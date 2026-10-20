# Stage 6K.2 — Full header parity and remaining pages

Date: 2026-09-24

Audit only. No page, navigation entry, stylesheet, or script was added or edited. WordPress and multilingual work stayed paused. No commit or push.

## 1. Audit scope

Compare the live GGKP14 header with the current local static header, and list every source-header destination that still has no local file.

Surfaces: top bar, clinic identity, primary menu, every desktop dropdown that opened, search, appointment, language, low-vision control, sticky header, mobile navigation, and the footer where it repeats those destinations.

Local production set: 34 HTML files in `src/pages/`, plus development-only `preview.html`.

## 2. Playwright MCP inspection

Local preview was started with `tools/preview-local.ps1 -Port 8765` and opened at `http://127.0.0.1:8765/pages/index.html`.

`https://ggkp14.by/` opened once in Playwright at 1440×1000. These states were captured before the session lost the site:

- desktop header;
- Information dropdown;
- About flyout;
- Administrative-procedures flyout;
- Contacts dropdown.

A later attempt to open the search control timed out: the visible control is the header search icon, and the click targeted `button.cmsmasters_theme_icon_search`, which sits inside the closed form and is not visible. A following navigation failed with `net::ERR_CERT_COMMON_NAME_INVALID`. The page became `chrome-error://chromewebdata/` with the title “Privacy error” and the text “Your connection is not private… NET::ERR_CERT_COMMON_NAME_INVALID”. A retry failed the same way. `docs/audit/stage-6k2/live-cert-error.png` records that page.

The unavailable remainder was read with the established UTF-8 fetch (`User-Agent: GGKP14-audit`, unverified TLS context): homepage `#navigation` (36 labels), `#top_line_nav`, the search form, and the 15 paths that have no local file. That fetch is text evidence. It is not a screenshot.

The Information crop stops at «Профилактика киберпреступлений». The About crop stops at «Наши партнеры». The two Information items below the crop, and the sanatorium link below the About crop, are menu-markup evidence, not pixels.

The live mobile menu, the live search panel, the live low-vision widget, and live sticky behavior were not opened after the certificate failure.

Local Playwright covered the homepage header, both local dropdowns, the search panel, language and low-vision controls, sticky scroll, the drawer at 390×844, and Escape close at 768×1024 on `for-patients.html`.

Evidence: `docs/audit/stage-6k2/`.

## 3. Real desktop header

Viewport 1440×1000.

### Top bar

Visible, left to right:

| Position | Label | Canonical path |
| --- | --- | --- |
| 1 | Режим работы | `/o-nas/rezhim-raboty/` |
| 2 | Горячая линия | `/contacts/goryachaya-liniya/` |
| 3 | Структурные подразделения | `/o-nas/strukturnye-podrazdeleniya/` |
| 4 | Территориальные участки | `/o-nas/territorialnye-uchastki/` |
| 5 | Вакансии | `/o-nas/vakansii/` |
| 6 | Контакты | `/contacts/` |
| 7 | Профсоюз | `/o-nas/profsojuz/` |
| 8 | Обратиться напрямую к Главному врачу | `/home-store/script-src-https-forms-yandex-ru-_static-embed-js-script-iframe-src-https-forms-yandex-ru-cloud-68554460505690ed7d519936-iframe-1-frameborder-0-name-ya-form-68554460505690ed7d519936-width-650-iframe/` |

The same list is in `ul#top_line_nav`. Four further anchors in that list have `href="#"` and no visible text in the desktop screenshot. They are not RU, BY, or EN labels.

The top bar does not show the clinic email or the words «Версия для слабовидящих».

### Identity

A colored clinic emblem, the wrapped name «ГУЗ „Гомельская городская клиническая поликлиника №14“», and no separate address line in the header row.

### Primary menu

Seven items, this order. Parents that have children are flyout triggers and are also links.

| Position | Label | Path |
| --- | --- | --- |
| 1 | Главная | `/` |
| 2 | Прямые линии | `/o-nas/grafik-pryamyh-telefonnyh-linij/` |
| 3 | Платные услуги | `/platnye-uslugi-2/` |
| 4 | Информация | `/informaciya/` |
| 5 | Контакты | `/contacts/` |
| 6 | Абитуриент 2026 | `/abiturient-2023/` |
| 7 | Для пациентов | `/dlya-pacientov/` |

The open dropdown paints a blue bar under its parent. The seven labels sit on one row. There is no header button «Запись к врачу». That label appears as a hero button on the homepage, beside the open Contacts panel.

### Search

A magnifying-glass icon at the right of the primary row. The form markup, not a screenshot of the open panel, is:

- wrapper `cmsmasters_header_search_form`;
- close control `cmsmasters_header_search_form_close`;
- `method="get"` `action="https://ggkp14.by/"`;
- submit `button.cmsmasters_theme_icon_search`;
- `input type="search" name="s" placeholder="Enter Keywords"`.

### Other header controls

`bvi-open` is present in the homepage HTML. It was not visible as a labeled control in the desktop header screenshot, and the widget was not opened.

Sticky behavior was not measured.

### Footer

`footer#footer` is the copyright line. It does not repeat the header destinations.

## 4. Local desktop header

Viewport 1440×1000, `src/pages/index.html`.

### Top bar

| Position | Label | Local target | Source path |
| --- | --- | --- | --- |
| 1 | Режим работы | `working-hours.html` | `/o-nas/rezhim-raboty/` |
| 2 | Горячая линия | `hot-line.html` | `/contacts/goryachaya-liniya/` |
| 3 | Структурные подразделения | `departments-index.html` | `/o-nas/strukturnye-podrazdeleniya/` |
| 4 | Территориальные участки | `territorial-districts.html` | `/o-nas/territorialnye-uchastki/` |
| 5 | Вакансии | `vacancies.html` | `/o-nas/vakansii/` |
| 6 | Контакты | `contacts.html` | `/contacts/` |

Then RU (`aria-current="true"`, `href="#"`), BY (`href="#"`), EN (`href="#"`), `mailto:ggkp14@ggkp14.by`, and the button «Версия для слабовидящих» (`data-a11y-toggle`).

Absent from this bar: Профсоюз, and the chief-doctor form.

### Identity

A blue “14” monogram, the clinic name ellipsized to «поликлиника...», and the address «г. Гомель, ул. Косарева, 11».

### Primary menu

Same seven labels and the same seven paths, in the same order. «Главная» is underlined on the homepage. «Информация» and «Контакты» are the only dropdown triggers. At 1440 the row uses a 4px gap and 14px type so the seventh item stays on one line. Measured earlier in 6K.1A, the row does not wrap.

«Запись к врачу» is a header button to `content-page.html` (`/zapis-k-vrachu/`). It is not a menu item.

### Dropdowns that exist locally

Information, in order: Общая информация (`information.html`, `/informaciya/`), О нас, Администрация, Режим работы.

Contacts, in order: Контактная информация (`contacts.html`, `/contacts/`), Контактные телефоны администрации, Контактные телефоны сотрудников, Режим работы и контактные телефоны структурных подразделений (wraps), Горячая линия, Электронные обращения, Адреса e-mail.

There is no About flyout and no procedures flyout.

### Sticky

After scrolling 900px, `.site-header` stayed `position: sticky` at top 0 and gained `is-scrolled`.

### Footer

Local footer links include Главная, О нас, Контакты, Платные услуги, Новости, plus patient and service links already used elsewhere (Запись к врачу, Электронные обращения, Режим работы, Вакансии). This is a local navigation column. The live footer has no such list.

## 5. Dropdown comparison

Positions are 1-based inside that panel. “Displayed locally” means the local header, top bar, or drawer currently links to that path. A top-bar-only link is not the same as the source flyout, and is called out.

### Information, first level

| Pos. | Label | Path | Local file | Displayed in local header or drawer | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | О нас | `/o-nas/` | `about.html` | Yes, Information dropdown and drawer | Local item is a link, not a flyout |
| 2 | Новости | `/category/novosti/` | `news-archive.html` | No | Footer and the homepage “Все новости” link only |
| 3 | Режим работы | `/o-nas/rezhim-raboty/` | `working-hours.html` | Yes | Information dropdown, top bar, drawer group «Служебное» |
| 4 | Вакансии | `/o-nas/vakansii/` | `vacancies.html` | Top bar and drawer, not the Information dropdown | |
| 5 | График приема граждан администрацией | `/o-nas/grafik-priema-grazhdan-administraciej/` | None | No | Not `table-page.html` |
| 6 | Административные процедуры | `/administrativnye-procedury/` | None | No | Flyout parent. Body returned HTTP 403 |
| 7 | Диспансеризация | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | `dispensarization.html` | No | Exact page. Not `adult-dispensary-examinations.html` |
| 8 | Порядок проведения профилактических осмотров | `/informaciya/poryadok-provedeniya-profilakticheskih/` | None | No | |
| 9 | Помощь в лечении зависимости | `/pomoshh-pri-alkogolizme/` | None | No | |
| 10 | Порядок признания граждан недееспособными | `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` | None | No | |
| 11 | Общественные организации | `/o-nas/obshhestvennye-organizacii/` | None | No | |
| 12 | Профилактика киберпреступлений | `/kiberprestupnost/` | None | No | Last row visible in the screenshot |
| 13 | Противодействие экстремизму | `/protivodejstvie-ekstremizmu/` | None | No | Below the screenshot crop; present in `#navigation` |
| 14 | Меры поддержки по реализации Указа 631 | `/informaciya/mery-po-realizacii-ukaza-631/` | None | No | Below the screenshot crop; present in `#navigation` |

### About flyout

Opened from «О нас». Six rows were visible. The seventh is markup.

| Pos. | Label | Path | Local file | Displayed locally | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Территориальные участки | `/o-nas/territorialnye-uchastki/` | `territorial-districts.html` | Top bar only | Hidden below 1440, and absent from the drawer |
| 2 | Администрация | `/o-nas/administraciya/` | `administration.html` | Yes, Information dropdown and drawer | Not the phone directory |
| 3 | Структурные подразделения | `/o-nas/strukturnye-podrazdeleniya/` | `departments-index.html` | Top bar on every page | Drawer link only on `department.html`, `department-aop.html`, and `departments-index.html` |
| 4 | Работа по противодействию коррупции | `/o-nas/rabota-po-protivodejstviju-korrupcii/` | None | No | |
| 5 | Профсоюз | `/o-nas/profsojuz/` | None | No | Also top bar on the live site |
| 6 | Наши партнеры | `/nashi-partnery/` | None | No | Last About row in the screenshot |
| 7 | Санаторий «Серябряные ключи» | `https://sansk.by/` | None | No | External. Below the screenshot crop; present in `#navigation` |

### Administrative procedures flyout

All three rows were visible.

| Pos. | Label | Path | Local file | Displayed locally | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Порядок получения выписки из медицинских документов | `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/` | None | No | Not `medical-extract-order.html` (`/zakaz-vypiski-iz-medicinskih-dokumentov/`) |
| 2 | Паллиативная медицинская помощь | `/palliativnaya-medicinskaya-pomoshhi/` | None | No | |
| 3 | Идеология | `/informaciya/ideologiya/` | None | No | |

### Contacts

All five rows were visible, in this order. There is no «Электронные обращения» row.

| Pos. | Label | Path | Local file | Displayed locally | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Контактные телефоны администрации | `/contacts/kontaktnye-telefony-administracii/` | `administration-phones.html` | Yes | |
| 2 | Контактные телефоны сотрудников | `/contacts/kontaktnye-telefony-sotrudnikov/` | `staff-phones.html` | Yes | |
| 3 | Режим работы и контактные телефоны структурных подразделений | `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/` | `department-hours-phones.html` | Yes | |
| 4 | Адреса электронной почты | `/adresa-elektronnoj-pochty/` | `email-addresses.html` | Desktop dropdown only | Local label is «Адреса e-mail». Absent from the drawer |
| 5 | Горячая линия | `/contacts/goryachaya-liniya/` | `hot-line.html` | Yes | Local dropdown places it before electronic appeals and email |

### Local rows that are not source dropdown rows

| Label | Path | Where |
| --- | --- | --- |
| Общая информация | `/informaciya/` | Same destination as the Information parent |
| Контактная информация | `/contacts/` | Same destination as the Contacts parent |
| Электронные обращения | `/contacts/elektronnye-obrashheniya/` | Local Contacts dropdown and drawer. The live page exists. It is not in the live header |

`about.html` still links three missing pages to the live site from the page body, not from the header: the reception schedule, anti-corruption, and the union. `information.html` does the same for preventive examinations and incapacity. Those are temporary body links. They are not header items.

## 6. Search comparison

| Check | Live | Local | Class |
| --- | --- | --- | --- |
| Trigger | Header magnifying-glass icon | Button `#header-search-toggle`, label «Открыть поиск по сайту» | Approved redesign difference |
| Placement | Right end of the primary row | Between the menu and «Запись к врачу» | Approved redesign difference |
| Open panel | Not opened visually. Markup has a form and a cancel icon | Opened. Label «Поиск по сайту», then the field | Static prototype limitation for the unseen live panel |
| Placeholder | `Enter Keywords` | `Введите запрос` | Approved redesign difference |
| Field name | `s` | `s` | Match |
| Submit | Icon button inside the field | «Найти» at desktop; icon submit below 1440 | Approved redesign difference |
| Action | GET `https://ggkp14.by/` | `search-results.html` | WordPress-deferred functionality. The local page is a static sample |
| Close | Cancel icon in markup. Not clicked | Escape was sent after the panel was open. The closed state was not read back | Unresolved for live close behavior |
| Keyboard | Not tested after the certificate error | Not tabbed through in this pass | Unresolved |
| Mobile | Not opened | The drawer list has no search field. The header icon remains in the header markup | Static prototype limitation |

No functional source control is missing as a local control. The live search index is the part that waits for WordPress.

## 7. Language and accessibility controls

| Control | Live | Local |
| --- | --- | --- |
| RU / BY / EN text | Not visible in the desktop header screenshot | Top bar and drawer. RU is `aria-current="true"`. BY and EN are `href="#"` |
| Unlabeled `#` anchors | Four, inside `#top_line_nav` | None |
| Active language | Not visually marked as a word | RU has `is-active` and `aria-current` |
| Behavior | The four hashes do not leave the page. Real `/by/` and `/en/` routing was not observed | Hashes do not leave the page |
| Desktop location | Inside the top bar, after the chief-doctor link, as empty anchors | Right side of the top bar |
| Mobile location | Not opened. The top bar is a separate responsive toggle in the live markup | Inside the drawer, after the link list |
| Low vision | `bvi-open` exists in the HTML. Not opened, and not labeled in the header screenshot | Button «Версия для слабовидящих» in the top bar and in the drawer |
| Keyboard and focus | Not retested on the live site | The local button is a real `<button>`. Focus styling was not re-shot in this pass |
| Email | Not in the live header | `mailto:ggkp14@ggkp14.by` in the top bar and the drawer |

Multilingual routing stays deferred. The local header did not omit a visible RU/BY/EN word that the live header shows. It adds those words as placeholders. The live low-vision plugin was not compared feature by feature. The local header does have a visible low-vision button, which the live top bar does not spell out.

Class: language routing is WordPress-deferred functionality. The text labels and the local low-vision button are an approved redesign difference. Copying the BVI plugin into the static site is not required.

## 8. Mobile header comparison

### Live

The responsive control is `a.responsive_nav` (`href="javascript:void(0)"`). It toggles the same `#navigation`. A separate control toggles `#top_line_nav`. There is no second link list.

This session did not expand that menu. The certificate error blocked the 390 and 768 passes. Destinations below are DOM evidence from the menus that were opened on desktop, not a mobile click-through.

If a parent is followed as a link, its flyout is not a separate mobile list. On desktop, About and procedures did open as flyouts. That interaction was not repeated at 390.

### Local

At 390×844 the drawer opened. Horizontal overflow was 0. Visible top of the drawer: Главная, Прямые линии, Платные услуги, group «Информация» (Общая информация, О нас, Администрация), group «Контакты» (Контактная информация, three directories, Горячая линия, and further rows below the fold).

The full drawer link list from the DOM:

Главная, Прямые линии, Платные услуги, Общая информация, О нас, Администрация, Контактная информация, Контактные телефоны администрации, Контактные телефоны сотрудников, Режим работы и контактные телефоны структурных подразделений, Горячая линия, Электронные обращения, Абитуриент 2026, Для пациентов, Режим работы, Вакансии, ggkp14@ggkp14.by, Версия для слабовидящих.

RU, BY, and EN sit under that list. There is no search field in the drawer. Email addresses, territorial districts, and structural departments are not in the standard drawer.

At 768×1024 the drawer opened on `for-patients.html`. Escape closed it (`is-open` removed).

CSS, confirmed in `components.css` and `responsive.css`:

- the top bar is `display: none` until 1440px;
- the appointment button is hidden from 768px through 1439px;
- the menu button is hidden from 1440px up.

### Differences

| Kind | Items |
| --- | --- |
| Source-only, not opened visually on mobile | The full live flyouts, Профсоюз, the chief-doctor form, `https://sansk.by/`, and every missing page in §10 |
| Local-only | Электронные обращения, «Общая информация», «Контактная информация», the mailto, text RU/BY/EN, the spelled-out low-vision button |
| Missing on the local drawer while the desktop header has them | Адреса e-mail. Территориальные участки. Структурные подразделения, except on the three department templates |
| Flattened | About is one link. Procedures are absent. Information’s long child list is four links |
| Unavailable below 1440 | The whole top bar, including districts and departments on ordinary pages. The appointment button from 768px through 1439px |

Desktop and mobile local destinations match each other except for those drawer omissions and the department-template extra link.

## 9. Cross-page local consistency

All 34 production pages contain the current shell destinations: `for-patients.html` twice (desktop and drawer), `administration-phones.html` twice (three times on `contacts.html` because the contacts subpage list also links it), one search toggle, and two low-vision controls. `preview.html` has the same header links and is not a production page.

No production page still has the pre-6K.1 header that lacked Patients or the three directories.

Attribute differences, not different visible menus:

- `index.html` is the only page that sets `data-source-path="/"` on the logo and both «Главная» links, and `data-source-path="/zapis-k-vrachu/"` on both appointment links. Other pages keep the same `href`s without those attributes.
- On a page that is the current item, that item’s `data-source-path` is sometimes omitted (`contacts.html` does this for Контакты and Контактная информация).
- `department.html`, `department-aop.html`, and `departments-index.html` add one drawer link, «Структурные подразделения», and omit `data-source-path` on several shared links that `index.html` still has. The visible hrefs for the shared menu stay the same.

These were not edited in this audit.

## 10. Exact remaining page inventory

Fifteen internal header paths have no local file. None of them is linked from the local header. Three of them are linked from the About or Information page body to the live site. That is not a header entry.

Short dispensarization URL `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` redirects to the long Information path and is already `dispensarization.html`. It is an alias, not a sixteenth page.

Body inspection for the fourteen HTTP 200 pages is the title, the h1, and the table count. The prose was not transcribed. The procedures hub returned HTTP 403, so its body was not read.

### Missing page and missing menu entry

| Label | Path | Parent | Desktop position | Mobile | Verified title / h1 | Type | Local status | Proposed file | Template | Body read | Blocked | Priority | Before WordPress |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Работа по противодействию коррупции | `/o-nas/rabota-po-protivodejstviju-korrupcii/` | О нас | About 4 | Same menu in markup | h1 matches the label | Article, 0 tables | No file. Body card on `about.html` points at the live URL | `anti-corruption.html` | `content-page.html` | Title and table count only | No | High | Yes. Public anti-corruption page in the About flyout |
| Профсоюз | `/o-nas/profsojuz/` | О нас, and the live top bar | About 5 and top bar 7 | Same menus in markup | h1 «Профсоюз» | One table | No file. Body card on `about.html` points at the live URL | `trade-union.html` | Table pattern. Not prose-only | Title and table count only | No | High | Yes. It is both a flyout item and a top-bar item |
| Наши партнеры | `/nashi-partnery/` | О нас | About 6 | Same menu in markup | h1 «Наши партнеры» | Article, 0 tables. HTTP 200 in this audit | No file | `partners.html` | `content-page.html` | Title and table count only | No | High | Yes. The earlier 403 does not still apply |
| Общественные организации | `/o-nas/obshhestvennye-organizacii/` | Информация | Information 11 | Same menu in markup | h1 matches | Article, 0 tables | No file | `public-organizations.html` | `content-page.html` | Title and table count only | No | Medium | Yes, with the other Information articles |
| График приема граждан администрацией | `/o-nas/grafik-priema-grazhdan-administraciej/` | Информация | Information 5 | Same menu in markup | h1 matches | Four tables | No file. Body card on `about.html` points at the live URL | `administration-reception.html` | Repeated tables on the article/table patterns. Not `table-page.html` | Title and table count only | No | High | Yes. Easy to confuse with the direct-line page |
| Административные процедуры | `/administrativnye-procedury/` | Информация | Information 6 | Same menu in markup | No title. HTTP 403 | Unknown | No file | `administrative-procedures.html` | Do not choose until the body loads | No | Yes | High, but blocked | Do not invent the hub. Build it when the body can be read. The three children below can be built without it |
| Порядок получения выписки из медицинских документов | `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/` | Административные процедуры | Procedures 1 | Same menu in markup | h1 matches | Article, 0 tables | No file | `medical-extract-procedure.html` | `content-page.html` | Title and table count only | No | High | Yes. Not the existing order form |
| Паллиативная медицинская помощь | `/palliativnaya-medicinskaya-pomoshhi/` | Административные процедуры | Procedures 2 | Same menu in markup | h1 matches | Article, 0 tables | No file | `palliative-care.html` | `content-page.html` | Title and table count only | No | Medium | Yes |
| Идеология | `/informaciya/ideologiya/` | Административные процедуры | Procedures 3 | Same menu in markup | h1 «Идеология» | Article, 0 tables | No file | `ideology.html` | `content-page.html` | Title and table count only | No | Medium | Yes |
| Порядок проведения профилактических осмотров | `/informaciya/poryadok-provedeniya-profilakticheskih/` | Информация | Information 8 | Same menu in markup | h1 matches | Article, 0 tables | No file. Body card on `information.html` points at the live URL | `preventive-examinations.html` | `content-page.html` | Title and table count only | No | Medium | Yes |
| Помощь в лечении зависимости | `/pomoshh-pri-alkogolizme/` | Информация | Information 9 | Same menu in markup | h1 matches | Article, 0 tables | No file | `addiction-help.html` | `content-page.html` | Title and table count only | No | Medium | Yes |
| Порядок признания граждан недееспособными | `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` | Информация | Information 10 | Same menu in markup | h1 matches | Article, 0 tables | No file. Body card on `information.html` points at the live URL | `incapacity.html` | `content-page.html` | Title and table count only | No | Medium | Yes |
| Профилактика киберпреступлений | `/kiberprestupnost/` | Информация | Information 12 | Same menu in markup | h1 matches | Article, 0 tables | No file | `cybercrime.html` | `content-page.html` | Title and table count only | No | Medium | Yes |
| Противодействие экстремизму | `/protivodejstvie-ekstremizmu/` | Информация | Information 13 | Same menu in markup | h1 matches | Article, 0 tables | No file | `extremism.html` | `content-page.html` | Title and table count only | No | Medium | Yes |
| Меры поддержки по реализации Указа 631 | `/informaciya/mery-po-realizacii-ukaza-631/` | Информация | Information 14 | Same menu in markup | h1 matches | Article, 0 tables | No file | `decree-631.html` | `content-page.html` | Title and table count only | No | Medium | Yes |

### Existing local page but missing menu entry

Covered in §11. These are not missing files.

### Missing page but existing temporary source link

No local header item points at `https://ggkp14.by/` for these fifteen paths. The header omits them.

Body cards, not header items, still point at the live site for reception, anti-corruption, the union, preventive examinations, and incapacity.

### Intentional external destination

`https://sansk.by/` — Санаторий «Серябряные ключи», About position 7. Keep it external. No local file.

### Duplicate alias or redirect

`/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` redirects to `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/`. One local file: `dispensarization.html`. The menu uses the long path.

These pairs stay separate and are not aliases:

- `administration.html` and `administration-phones.html`;
- `table-page.html` (direct lines) and the reception schedule;
- `working-hours.html` and `department-hours-phones.html`;
- `medical-extract-order.html` and the menu extract procedure;
- `dispensarization.html` and `adult-dispensary-examinations.html`;
- `personal-appeals.html` and `electronic-appeals.html`;
- `contacts.html` and each phone directory.

### Deferred record

The chief-doctor destination is a Yandex form embedded at the long `/home-store/script-src-https-forms-yandex-ru-...` path. It is a top-bar item, not one of the fifteen articles. A static copy of that form should wait. It is not an ordinary page in this inventory.

Department records that are not in the header, and news posts beyond the archive, stay deferred. They are not header gaps.

## 11. Existing pages missing from navigation

The file exists. The source row is not represented in the matching local slot.

| File | Path | Source slot | Where it is linked now |
| --- | --- | --- | --- |
| `news-archive.html` | `/category/novosti/` | Information position 2 | Footer, and the homepage news control. Not the header or drawer |
| `dispensarization.html` | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Information position 7 | Homepage body only. Not the header, drawer, top bar, or footer |
| `territorial-districts.html` | `/o-nas/territorialnye-uchastki/` | About position 1 | Top bar only. The top bar is hidden below 1440, and the drawer does not include it |
| `departments-index.html` | `/o-nas/strukturnye-podrazdeleniya/` | About position 3 | Top bar on every page. Drawer only on the three department templates |
| `vacancies.html` | `/o-nas/vakansii/` | Information position 4 | Top bar and drawer. Not the Information dropdown |
| `email-addresses.html` | `/adresa-elektronnoj-pochty/` | Contacts position 4 | Desktop Contacts dropdown, labeled «Адреса e-mail». Not the drawer |

`working-hours.html` is in the Information dropdown, the top bar, and the drawer. It is not missing.

## 12. Count reconciliation

Each path is counted once inside a count. The same path is not added again because it also appears in the top bar, the drawer, or the footer.

### Real desktop top-level menu items: 7

`/`, `/o-nas/grafik-pryamyh-telefonnyh-linij/`, `/platnye-uslugi-2/`, `/informaciya/`, `/contacts/`, `/abiturient-2023/`, `/dlya-pacientov/`.

### Local desktop top-level menu items: 7

The same seven paths, in the same order.

### Real dropdown entries: 29

Information 14 + About 7 + procedures 3 + Contacts 5. The seven parents are the top-level count, not this count. The full path list is the four tables in §5. Unique paths in this 29: 28 internal pages and `https://sansk.by/`.

### Local dropdown entries: 11

Information: `/informaciya/`, `/o-nas/`, `/o-nas/administraciya/`, `/o-nas/rezhim-raboty/`.

Contacts: `/contacts/`, `/contacts/kontaktnye-telefony-administracii/`, `/contacts/kontaktnye-telefony-sotrudnikov/`, `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/`, `/contacts/goryachaya-liniya/`, `/contacts/elektronnye-obrashheniya/`, `/adresa-elektronnoj-pochty/`.

### Real mobile entries

No separate list. The responsive menu uses the 36 primary links (7 parents + 29 children) and the top bar (8 labeled links + 4 unlabeled `#` anchors). Unique destinations beyond the primary menu: the chief-doctor form URL, and the four `#` anchors. The other top-bar paths are already in the 36.

This count is markup. The menu was not opened at 390 or 768 in this session.

### Local mobile entries: 18 drawer controls, plus 3 language links

The 17 links and the low-vision button listed in §8, then RU, BY, EN. Unique page paths in that drawer, excluding `mailto:` and the hashes: `/`, `/o-nas/grafik-pryamyh-telefonnyh-linij/`, `/platnye-uslugi-2/`, `/informaciya/`, `/o-nas/`, `/o-nas/administraciya/`, `/contacts/`, the three phone directories, `/contacts/goryachaya-liniya/`, `/contacts/elektronnye-obrashheniya/`, `/abiturient-2023/`, `/dlya-pacientov/`, `/o-nas/rezhim-raboty/`, `/o-nas/vakansii/`. That is 16 paths. Email, districts, and departments are not among them on the standard shell.

### Exact local page matches: 20

These source primary-menu paths already have a local file:

`/`, `/o-nas/grafik-pryamyh-telefonnyh-linij/`, `/platnye-uslugi-2/`, `/informaciya/`, `/o-nas/`, `/o-nas/territorialnye-uchastki/`, `/o-nas/administraciya/`, `/o-nas/strukturnye-podrazdeleniya/`, `/category/novosti/`, `/o-nas/rezhim-raboty/`, `/o-nas/vakansii/`, `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/`, `/contacts/`, `/contacts/kontaktnye-telefony-administracii/`, `/contacts/kontaktnye-telefony-sotrudnikov/`, `/contacts/rezhim-raboty-i-kontaktnye-telefony-strukturnyh-podrazdelenij/`, `/adresa-elektronnoj-pochty/`, `/contacts/goryachaya-liniya/`, `/abiturient-2023/`, `/dlya-pacientov/`.

35 unique internal primary paths, minus these 20, leaves the 15 missing pages.

### Existing local pages missing from navigation: 6

The six files in §11. They are part of the 20 matches. They are not a second set of missing files.

### Missing pages: 15

The fifteen paths in §10.

### Missing navigation entries: 18 source rows with no local chrome link

The 15 missing pages, plus `/category/novosti/` and the dispensarization path (files exist, header does not link them), plus `https://sansk.by/`.

Not in this 18: districts, departments, and vacancies, because the top bar or drawer already links them. Email is in the desktop dropdown, so it is not in this 18. Its drawer gap is the separate row in §11.

The chief-doctor URL is a nineteenth source destination with no local link. It is a top-bar form, not one of the 36 primary links, so it is kept beside this count rather than inside it.

### Intentional external destinations: 1

`https://sansk.by/`.

### Aliases and redirects: 1

The short dispensarization path. It does not add a file.

## 13. Difference classification

| Difference | Class | Why |
| --- | --- | --- |
| Fifteen paths in §10 have no file and no header link | Missing Required Page, and therefore Missing Required Navigation Entry | They are real public menu destinations. Fourteen returned a title. The procedures hub is the same kind of gap, with the body still blocked |
| News and dispensarization files exist but are outside the header | Missing Required Navigation Entry | The source Information menu shows both. The pages are already local |
| Districts, departments, and vacancies are not in the local flyout | Missing Required Navigation Entry for the flyout slot | The pages exist. Districts and departments disappear below 1440 on ordinary pages because the top bar hides and the drawer omits them |
| Email label «Адреса e-mail», and its absence from the drawer | Missing Required Navigation Entry on mobile; approved wording on desktop | The path is the source path. The shorter label is already the local name |
| «Общая информация» and «Контактная информация» | Duplicate Or Alias | Same paths as the parent items |
| Electronic appeals in the local header | Approved Redesign Difference | Local addition. Not in the live header. Do not remove it in order to match the live menu |
| Header «Запись к врачу» | Approved Redesign Difference | The live header row has no such button. The homepage hero does |
| Monogram, ellipsized name, address line, tighter 1440 spacing | Approved Redesign Difference | Identity and fit. The seven labels and their order already match |
| Local footer link list | Approved Redesign Difference | The live footer is copyright only. The footer is not a substitute for the missing Information rows |
| RU / BY / EN text and `href="#"` | Approved Redesign Difference for the labels; WordPress-Deferred Functionality for routing | The live header does not show those words. Real language URLs are out of this static stage |
| Local low-vision button versus the unseen BVI widget | Approved Redesign Difference | A visible control exists locally. Plugin behavior waits |
| Search placeholder, submit label, and static results page | Approved Redesign Difference for the Russian UI; WordPress-Deferred Functionality for the index | `Enter Keywords` should not be copied |
| About and procedures flyouts flattened or absent | Static Prototype Limitation until the child pages exist | The local menu has no nested flyout component for those branches |
| Appointment hidden from 768px through 1439px; top bar hidden below 1440 | Static Prototype Limitation | Recorded from CSS and the drawer. Not changed here |
| `https://sansk.by/` | Intentional External Link | Another site |
| Chief-doctor Yandex form | WordPress-Deferred Functionality | An embed, not an article to freeze as HTML |
| Procedures hub body | Product Decision Required | The menu row is required. The body is HTTP 403, so a static page cannot be written from evidence yet |
| `data-source-path` omitted on non-home logo, «Главная», and appointment links, and on some current-page links | Static Prototype Limitation | Visible labels and hrefs still match. Not a stale pre-6K.1 menu |

## 14. Recommended static boundary

Build this before WordPress. Do not start it in this stage.

Pages still to create: the fourteen HTTP 200 paths in §10. Leave `/administrativnye-procedury/` until a fetch returns the body.

Existing pages to add to navigation, after the files are already there:

- `dispensarization.html` in the Information dropdown and the drawer;
- `news-archive.html` in the Information dropdown and the drawer;
- `territorial-districts.html` and `departments-index.html` in the drawer, not only the top bar;
- `vacancies.html` in the Information dropdown as well as the top bar and drawer;
- `email-addresses.html` in the drawer.

Header controls to restore: none as copies of the live chrome. Do not add the English placeholder «Enter Keywords», the four empty hashes, or the BVI plugin.

Keep omitted, on purpose: a cloned live footer, removal of electronic appeals, removal of the header appointment button, and a local sanatorium page.

Wait for WordPress: search indexing, `/by/` and `/en/` routing, the chief-doctor form, department records outside the header, and the rest of the news corpus.

## 15. Revised implementation batches

1. Add the six existing files in §11 to the slots in §14. No new pages.
2. Create the high-confusion pages from a fresh body read: reception schedule, menu extract procedure, union (table), anti-corruption, partners.
3. Create the remaining HTTP 200 articles: public organizations, preventive examinations, addiction help, incapacity, palliative care, ideology, cybercrime, extremism, decree 631.
4. Fetch `/administrativnye-procedury/` again. Create it only from a successful body. Until then, do not add a guessed hub to the menu.
5. Point the About and Information body cards that still use `https://ggkp14.by/` at the new local files when those files exist.
6. Then WordPress. External sanatorium link and the chief-doctor form stay out of that page batch.

Add a header link only after its file exists. That rule already held for Patients and the three directories.

## 16. Risks and open decisions

- The live mobile menu, search panel, sticky header, and low-vision widget were not seen after `net::ERR_CERT_COMMON_NAME_INVALID`. Mobile destinations are the desktop menus’ markup.
- The Information screenshot omits extremism and decree 631. The About screenshot omits the sanatorium. Both are in the fetched menu, in that order.
- Procedures remains HTTP 403. Its children were visible and returned HTTP 200.
- Partners is no longer a 403. The 6J note that partners could not be read is out of date. `docs/50` points here for that correction. The union page has one table, and the reception page has four. Those are not prose-only pages.
- Whether the local header appointment button should also appear in the drawer is a product choice. The live header row does not have it.
- Whether to nest an About flyout, or to keep a flat Information list once the missing links are added, is a product choice. The destinations matter more than copying the live flyout widget.
- Full article bodies were not copied into this audit. Implementation still has to read each page before writing it.

## 17. Stage 6K.3 implementation

Date: 2026-09-24. Five About-batch pages were created after a full body read. WordPress and multilingual work stayed paused.

| File | Path | Body |
| --- | --- | --- |
| `anti-corruption.html` | `/o-nas/rabota-po-protivodejstviju-korrupcii/` | Article, two documents, commission notes, public phone lines |
| `trade-union.html` | `/o-nas/profsojuz/` | Prose, one 12-row table, stand images, three external union links |
| `partners.html` | `/nashi-partnery/` | Title and breadcrumb only. The source entry is empty |
| `public-organizations.html` | `/o-nas/obshhestvennye-organizacii/` | Five organization blocks, source order |
| `administration-reception.html` | `/o-nas/grafik-priema-grazhdan-administraciej/` | Four separate tables. No rowspan in the source |

The desktop About flyout, inside Информация, lists territorial districts, then the stage’s required local destinations, then `https://sansk.by/` after «Наши партнеры». «Прямые линии» stays a top-level item and is repeated in the desktop flyout. The drawer lists each of those destinations once and does not repeat «Прямые линии».

Production count: 39 HTML pages in `src/pages/`, plus development-only `preview.html`.

Ten internal header paths still have no local file:

1. `/administrativnye-procedury/` (HTTP 403, not created)
2. `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/`
3. `/palliativnaya-medicinskaya-pomoshhi/`
4. `/informaciya/ideologiya/`
5. `/informaciya/poryadok-provedeniya-profilakticheskih/`
6. `/pomoshh-pri-alkogolizme/`
7. `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/`
8. `/kiberprestupnost/`
9. `/protivodejstvie-ekstremizmu/`
10. `/informaciya/mery-po-realizacii-ukaza-631/`

## 18. Stage 6K.4 implementation

Date: 2026-09-24. The first Information article batch is implemented.

### Implemented files

| File | Path | Notes |
| --- | --- | --- |
| `medical-extract-procedure.html` | `/informaciya/poryadok-polucheniya-vypiski-iz-medicin/` | Article text, notices, and schedule note |
| `palliative-care.html` | `/palliativnaya-medicinskaya-pomoshhi/` | Two source document links |
| `ideology.html` | `/informaciya/ideologiya/` | Two directives, emblem image, external info-day link |
| `preventive-examinations.html` | `/informaciya/poryadok-provedeniya-profilakticheskih/` | Three scheduling paragraphs |
| `addiction-help.html` | `/pomoshh-pri-alkogolizme/` | Two source leaflet images |

### Navigation update

The Information dropdown and drawer now include these entries in source order:

1. Порядок получения выписки из медицинских документов
2. Паллиативная медицинская помощь
3. Идеология
4. Порядок проведения профилактических осмотров
5. Помощь в лечении зависимости

`/administrativnye-procedury/` remains unlinked because its body is still blocked by HTTP 403.

`information.html` now points the preventive-examinations card to `preventive-examinations.html`.

Production count: 44 HTML pages in `src/pages/`, plus development-only `preview.html`.

### Remaining internal header paths

1. `/administrativnye-procedury/` (blocked)
2. `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/`
3. `/kiberprestupnost/`
4. `/protivodejstvie-ekstremizmu/`
5. `/informaciya/mery-po-realizacii-ukaza-631/`

## 19. Stage 6K.5 implementation

Date: 2026-09-24. The final four readable Information pages are implemented.

### Implemented files

| File | Path | Notes |
| --- | --- | --- |
| `incapacity.html` | `/informaciya/poryadok-priznaniya-grazhdan-nedeesposobnymi/` | Article text, contact phone, and source document link |
| `cybercrime.html` | `/kiberprestupnost/` | Sectioned media page with source images and video links |
| `extremism.html` | `/protivodejstvie-ekstremizmu/` | Long legal-information article with source ordering preserved |
| `decree-631.html` | `/informaciya/mery-po-realizacii-ukaza-631/` | Structured credit-support article with lists and source link |

### Navigation update

The Information dropdown and drawer now include these entries in verified source order after the Stage 6K.4 set:

1. Порядок признания граждан недееспособными
2. Профилактика киберпреступлений
3. Противодействие экстремизму
4. Меры поддержки по реализации Указа 631

`information.html` now maps the incapacity card to `incapacity.html`. No Administrative Procedures link was added.

Production count: 48 HTML pages in `src/pages/`, plus development-only `preview.html`.

### Administrative Procedures access result

`/administrativnye-procedury/` remains blocked:

- Playwright: `net::ERR_CERT_COMMON_NAME_INVALID`
- Strict UTF-8 fetch fallback: HTTP 403

No page body was available, so no local file or menu entry was created for this path.

### Remaining internal source-header paths without local files

1. `/administrativnye-procedury/`

## 20. Stage 6K.6 implementation

Date: 2026-10-20. `/administrativnye-procedury/` is now resolved.

### Source access and evidence

- Playwright opened `https://ggkp14.by/` (HTTP 200) and confirmed the Information -> Administrative Procedures submenu in the live header.
- Playwright direct access to `https://ggkp14.by/administrativnye-procedury/` returned HTTP 403 (`403 Forbidden`).
- Strict UTF-8 fetch with browser headers also returned HTTP 403 for the same URL.
- Live homepage DOM confirms the parent row and all three child rows in source order.
- WordPress REST discovery (`slug=administrativnye-procedury`) returned a published page (`id=15076`) with canonical link, title, and one table body in `content.rendered`.
- `page-sitemap.xml` includes `https://ggkp14.by/administrativnye-procedury/`.

Decision: source evidence is sufficient to implement the static parent page without inventing content.

### Implementation result

- Created `administrative-procedures.html` mapped to `/administrativnye-procedury/`.
- Preserved canonical title/h1, breadcrumb, and table body from verified source evidence.
- Added/normalized the Administrative Procedures parent entry and child submenu in:
  - desktop Information dropdown;
  - mobile drawer.
- Child procedure pages remain the existing local files:
  - `medical-extract-procedure.html`
  - `palliative-care.html`
  - `ideology.html`

### Mapping and inventory updates

- Updated `src/pages/preview.html`.
- Updated `.github/workflows/pages.yml`.
- Updated `tools/simulate-pages-dist.py`.
- Production count is now 49 HTML pages in `src/pages/`, plus development-only `preview.html`.

### Remaining internal source-header paths without local files

None.

External/deferred items remain unchanged: `https://sansk.by/` and the topbar chief-doctor form URL.
