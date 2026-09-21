# Stage 6D.4: Menu coverage and dropdown usability

## 1. Audit Scope

Every destination in the current production header, desktop dropdowns, mobile drawer, topbar, and footer, compared with the source site’s primary and top menus. The desktop dropdown close was reproduced locally, then fixed in CSS. No new content pages were created, and no menu destination was retargeted.

## 2. Source Navigation Inspection Method

Playwright cannot open `https://ggkp14.by` (`ERR_CERT_COMMON_NAME_INVALID`). The source menus were read from an HTTP fetch of the homepage, which followed to HTTPS and returned 200 UTF-8 HTML. Local behavior was checked in the browser against `http://127.0.0.1:8765/pages/index.html`.

## 3. Desktop Navigation Inventory

Shown from 1440px. The same 14 `href`s are on every production page.

| Label | Source path | Static target | Status |
| --- | --- | --- | --- |
| Главная | `/` | `index.html` | Local |
| Прямые линии | `/o-nas/grafik-pryamyh-telefonnyh-linij/` | `table-page.html` | Local |
| Платные услуги | `/platnye-uslugi-2/` | `paid-services.html` | Local |
| Информация | `/informaciya/` | `information.html` | Local landing |
| Общая информация | `/informaciya/` | `information.html` | Same landing, static label |
| О нас | `/o-nas/` | `about.html` | Local landing |
| Администрация | `/o-nas/administraciya/` | source URL | External until a local page exists |
| Режим работы | `/o-nas/rezhim-raboty/` | source URL | External |
| Контакты | `/contacts/` | `contacts.html` | Local landing |
| Контактная информация | `/contacts/` | `contacts.html` | Same landing |
| Горячая линия | `/contacts/goryachaya-liniya/` | source URL | External |
| Электронные обращения | `/contacts/elektronnye-obrashheniya/` | source URL | External |
| Адреса e-mail | `/adresa-elektronnoj-pochty/` | source URL | External. Source label is «Адреса электронной почты» |
| Абитуриент 2026 | `/abiturient-2023/` | `applicant-2023.html` | Local |

Header actions, not inside the dropdowns: search submits to `search-results.html`; «Запись к врачу» goes to `content-page.html` (`/zapis-k-vrachu/`).

## 4. Mobile Drawer Inventory

The drawer is the navigation below 1440px. On most pages it has 13 links. `department.html`, `department-aop.html`, and `departments-index.html` add «Структурные подразделения» → `departments-index.html` under «Служебное».

Groups: Информация (Общая информация, О нас, Администрация), Контакты (Контактная информация, Горячая линия, Электронные обращения), then Абитуриент 2026, then Служебное (Режим работы, Вакансии, email `mailto:ggkp14@ggkp14.by`, and the low-vision button). The drawer also has the booking button, search, and RU/BY/EN.

## 5. Topbar And Footer Additions

Topbar, visible only at 1440px and identical on every production page:

| Label | Target |
| --- | --- |
| Режим работы | source `/o-nas/rezhim-raboty/` |
| Горячая линия | source `/contacts/goryachaya-liniya/` |
| Структурные подразделения | `departments-index.html` |
| Территориальные участки | source `/o-nas/territorialnye-uchastki/` |
| Вакансии | source `/o-nas/vakansii/` |
| Контакты | `contacts.html` |

RU is the current language. BY and EN are `href="#"`.

Footer navigation: Главная, О нас, Контакты, Платные услуги, Новости (`news-archive.html`). Footer «Пациентам»: Запись к врачу (local), Электронные обращения, Режим работы, Вакансии (those three still on the source site).

## 6. Localized Destinations

Local header, drawer, topbar, or footer targets: `index.html`, `table-page.html`, `paid-services.html`, `information.html`, `about.html`, `contacts.html`, `applicant-2023.html`, `content-page.html`, `departments-index.html`, `news-archive.html`, `search-results.html`.

`adult-dispensary-examinations.html` is linked from the Information landing, not from the header.

## 7. Remaining Source-Site Destinations

Still used from the static shell: администрация, режим работы, горячая линия, электронные обращения, адреса e-mail, вакансии, территориальные участки.

Present in the source menus and absent from the static header:

- Top level: `/dlya-pacientov/` («Для пациентов»).
- Top bar: `/o-nas/profsojuz/`, and the chief-doctor form page under `/home-store/…`.
- Under Информация on the source, beyond the four static items: новости, территориальные участки, структурные подразделения, противодействие коррупции, профсоюз, наши партнеры (and «Санаторий «Серябряные ключи»» at `https://sansk.by/`), график приема граждан администрацией, административные процедуры and its children (выписка, паллиативная помощь, идеология), диспансеризация, профилактические осмотры, помощь в лечении зависимости, порядок признания граждан недееспособными, общественные организации, профилактика киберпреступлений, противодействие экстремизму, меры по Указу 631.
- Under Контакты on the source: контактные телефоны администрации, контактные телефоны сотрудников, режим работы и телефоны структурных подразделений.

## 8. Genuine External Destinations

Keep external: `https://sansk.by/`, `mailto:`, Telegram and other partner portals in the page body, and the booking flow that leaves the site. Language BY/EN stay as `#` placeholders. The chief-doctor item is a Yandex form embed and should stay deferred.

## 9. Desktop And Mobile Differences

No label that exists in both places points at a different URL. Differences are presence and grouping:

- «Адреса e-mail» is in the desktop Contacts dropdown only.
- «Территориальные участки» is in the topbar only. The topbar is hidden below 1440px, so that item is not in the drawer.
- «Структурные подразделения» is in the topbar on every page, and in the drawer only on the three department templates.
- «Вакансии» is in the topbar, the drawer, and the footer, not in a desktop dropdown.
- «Режим работы» is under Информация on desktop and under Служебное in the drawer.
- «Новости» is in the footer and on the source Information menu, not in the static header.
- «Общая информация» and «Контактная информация» are static labels for the same landings as the parent items. The source menu does not use those child labels.

These were not rewritten. The department-drawer link is an extra local entry where the topbar is hidden, not a wrong target.

## 10. Previously Missed Pages

`docs/41` treated the four main landings as the remaining nav work. The source menu also exposes «Для пациентов» as its own top-level item, the chief-doctor topbar item, and the longer Information and Contacts child lists in §7. «Новости» already has a local page but is not in the header. None of these were added to the menu in this stage.

## 11. Dropdown Reproduction

At 1440×1000, before the fix, the Information item was hovered and the pointer was moved down 1px at a time.

- The trigger box ended at about y=97.
- The open panel started at about y=101.5.
- The gap was 4px.
- Computed `top` was `43px`, which is `calc(100% + 4px)` on a 39px item.
- At y=98 the hit target was `.site-header__inner`, not the panel.
- `pointer-events` became `none` immediately.
- Opacity fell across the 150ms transition, then `visibility` became `hidden`.
- The pointer never entered the panel.

`:focus-within` was already on the parent. On Tab onto «Информация», `:focus-within` matched, but computed `visibility` stayed `hidden` and opacity `0` until the 150ms transition advanced. The next Tab therefore skipped the children and landed on «Контакты». After a 400ms wait the panel was visible and the next Tab reached «Общая информация».

## 12. Dropdown Root Cause

Two measured causes:

1. The panel is positioned 4px below the item. That strip is not part of the item or of the panel. Hover ends there, and `pointer-events: none` on the closed panel means the strip cannot be re-entered.
2. `visibility` is in the same 150ms transition as opacity. While the panel is opening from the keyboard, it stays `visibility: hidden` long enough that the next Tab skips the items.

`z-index: 50` was not the cause. The sticky class does not move the panel. There was no missing `:focus-within` selector.

## 13. Implemented Fix

CSS only, in `src/css/components.css`.

- A 4px `::before` on `.main-nav__dropdown`, placed in the offset, with `pointer-events: auto`, so the strip stays a hit target after the trigger is left. Hovering it keeps the parent item hovered.
- Opening sets `visibility` with a `0s` transition, so the panel is tabbable immediately. Closing still delays `visibility: hidden` by 150ms so the fade can finish.

No close delay, no overlay, and no JavaScript.

## 14. Pointer Verification

After the fix, on both dropdowns, at 1440×1000:

- 1px and 2–3px steps from the trigger through the gap into the panel stayed `visibility: visible` (0 losses).
- First item, last item, left edge, and right edge stayed open.
- Diagonal steps from the left and right of the trigger into the panel stayed open.
- One move from the trigger into the panel (no intermediate steps) stayed open.
- Moving to «Платные услуги» closed the Information panel. Moving off the header closed both panels.
- The neighbor’s center still hit «Платные услуги».

## 15. Keyboard Verification

With the updated CSS loaded:

- Tab from «Платные услуги» focuses «Информация» with a 2px solid outline, and the panel is `visibility: visible` on that same check.
- The next tabs are: Общая информация (`information.html`), О нас (`about.html`), Администрация, Режим работы, then the Контакты trigger, then «Контактная информация».
- Shift+Tab from «О нас» returns to «Общая информация».
- Enter on «Общая информация» starts navigation to local `information.html`.
- After the menu is left, further Shift+Tab continues through the top-level items. Focus is not trapped.
- In the mobile drawer, Tab reached «Платные услуги». Escape and the close button both closed the drawer. The drawer’s existing focus loop in `menu.js` was not changed.

## 16. Sticky Header Verification

After scrolling, `.site-header` had `is-scrolled`. Crossing from the Information trigger into the panel still lost 0 steps. The panel did not shift the header layout.

## 17. Responsive Regression Check

| Width | Desktop nav | Menu button | Topbar | Page overflow |
| --- | --- | --- | --- | --- |
| 1440 | block | none | block | 0 |
| 1439 | none | flex | none | 0 |
| 1024 | none | flex | none | 0 |
| 768 | none | flex | none | 0 |
| 390 | none | flex | none | 0 |

Desktop navigation and the drawer are not both shown, and there is no width where neither is available. At 390 the drawer panel opened (about 320px wide), a drawer link could take focus, and close worked. Open dropdown overflow at 1440 was 0.

Screenshots: `docs/audit/stage-6d4/dropdown-open-1440.png`, `dropdown-keyboard-1440.png`, `dropdown-sticky-1440.png`, `mobile-drawer-390.png`.

## 18. Revised Static Page Implementation Order

1. Pages already linked from the static header or topbar and still on the source site: режим работы, горячая линия, администрация, электронные обращения, вакансии, адреса e-mail, территориальные участки.
2. `/dlya-pacientov/`, the source top-level item that the static header does not list yet.
3. Contact children from the source menu: телефоны администрации, телефоны сотрудников, режим и телефоны подразделений.
4. Information children named in the source menu: диспансеризация (not the adult examinations page already built), профилактические осмотры, признание недееспособными, then the other Information children in §7.
5. Remaining About children: коррупция, профсоюз, партнеры, общественные организации, график приема граждан.
6. The other 16 department pages, then optional extra news cards.
7. Search no-results on the existing search template.
8. Leave for WordPress: BY/EN, live search, archive pagination, and the chief-doctor form embed.

Do not build these pages as part of 6D.4.

## 19. Known Limitations

- The static dropdown is a short subset of the source menu. Matching that longer tree was not part of this fix.
- «Адреса e-mail» is still absent from the drawer. «Территориальные участки» disappears with the topbar below 1440px.
- The 4px bridge covers the width of the panel. A very fast diagonal that leaves that width can still miss it; the tested diagonals did not.
- Source inspection was an HTML fetch, not a click-through of the live site.
