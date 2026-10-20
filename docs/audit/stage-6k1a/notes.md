# Stage 6K.1A browser verification

Date: 2026-09-24. Local server: `tools/preview-local.ps1` on port 8765. Playwright MCP was used for both the live site and the local preview. No page content or navigation was changed.

## Live site

`https://ggkp14.by/` loaded. The page title was «Главная - ГУЗ «Гомельская городская клиническая поликлиника №14»». Console errors: none. The earlier certificate failure did not occur in this session.

Desktop header order: Главная, Прямые линии, Платные услуги, Информация, Контакты, Абитуриент 2026, Для пациентов.

The Information dropdown and the Contacts dropdown were opened. Visible Contacts children, in order: Контактные телефоны администрации, Контактные телефоны сотрудников, Режим работы и контактные телефоны структурных подразделений, Адреса электронной почты, Горячая линия.

At 390px the responsive menu showed those same seven top-level items. Activating «Контакты» opened the contacts page, so the live mobile submenu was not expanded on screen. The five Contacts children were present in the menu markup.

## Local preview

All four Stage 6K.1 pages returned HTTP 200. Homepage, the four pages, `about.html`, and `preview.html` were opened in the browser. All 34 production pages contain the new navigation entries. `preview.html` is not a production page.

Desktop «Для пациентов» is the last top-level item, links to `for-patients.html` with `data-source-path="/dlya-pacientov/"`, and does not overlap search or «Запись к врачу». Top-level items stay on one line. Header right edge is inside the 1440px viewport.

Contacts dropdown order: Контактная информация, the three directories, Горячая линия, Электронные обращения, Адреса e-mail. Hovering from the trigger onto the wrapped directory label left the menu open. Each of the three directory links opened its local page.

Keyboard, after the open transition: focus on «Контакты» shows the dropdown; Tab reaches every child and then «Абитуриент 2026»; Shift+Tab from «Адреса e-mail» returns through the children to «Контакты» and then «Информация»; Enter on «Контактные телефоны администрации» opens that page. Focus uses a 2px solid outline.

At 390 and 768 the drawer contains «Для пациентов» and the three directories, with no duplicate labels. «Адреса e-mail» is not in the drawer. The drawer scrolls. Close and Escape both close it. Page overflow stayed 0.

`preview.html` lists each of the four pages once. Each preview link opened the local page.

Publication lists in `pages.yml` and `tools/simulate-pages-dist.py` include each new file once and still remove `preview.html`. These files are uncommitted, so they are not on GitHub Pages.
