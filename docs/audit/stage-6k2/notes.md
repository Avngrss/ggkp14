# Stage 6K.2 evidence

Date: 2026-09-24. Audit only. Screenshots are browser captures. Fetched HTML was not used as a picture.

## Live site

Playwright opened `https://ggkp14.by/` at 1440×1000 and these states were saved:

- `live-desktop-header-1440.png` — top bar, logo, seven primary items, search icon. A Contacts panel was already partly open in an earlier crop.
- `live-information-dropdown-1440.png` — Information flyout. The crop ends at «Профилактика киберпреступлений». The next two items are in the menu markup, not in this crop.
- `live-about-dropdown-1440.png` — About flyout through «Наши партнеры». «Санаторий „Серябряные ключи“» is the next menu item and is below this crop.
- `live-procedures-dropdown-1440.png` — three procedure children.
- `live-contacts-dropdown-1440.png` — five Contacts children, in source order.
- `live-cert-error.png` — later navigation failed with `net::ERR_CERT_COMMON_NAME_INVALID` (“Your connection is not private”).

No live search panel, language row, low-vision widget, sticky measurement, or mobile menu was captured after that error.

## Local preview

`http://127.0.0.1:8765/pages/index.html`, started with `tools/preview-local.ps1 -Port 8765`.

- `local-desktop-header-1440.png`
- `local-information-dropdown-1440.png`
- `local-contacts-dropdown-1440.png`
- `local-search-1440.png` — panel open, placeholder «Введите запрос», submit «Найти»
- `local-lang-a11y-1440.png`
- `local-sticky-1440.png` — header `position: sticky`, class `is-scrolled`, top 0 after scroll
- `local-mobile-drawer-390.png` — drawer open. Escape closed it at 768×1024 on `for-patients.html`.

The preview server was stopped after the audit.
