# Stage 6L evidence notes

Date: 2026-10-20

Local preview was started with `tools/preview-local.ps1 -Port 8765`. All 49 production pages returned HTTP 200.

## Checks

- Four viewports (390, 768, 1439, 1440): one `h1`, a title, no page-level horizontal overflow, and no replacement characters.
- Shared navigation DOM is identical on all 49 pages: 7 top-level items, 31 dropdown links, 34 drawer links, no duplicate drawer hrefs.
- Information, About (12 flyout items), and Administrative Procedures (3 children) open by pointer. Tab order enters the dropdown; Shift+Tab moves backward. Sticky class applies after a real scroll.
- Mobile drawer at 390 and 768 scrolls to the last item, closes from the close button, and closes on Escape.
- Table pages keep horizontal scrolling inside `.table-scroll`.
- Remote cybercrime and addiction images that returned HTTP 200 also decoded in the browser, except `Prilozhenie_buklet_storona-2-scaled.png`.

## Safe fixes rechecked

- `index.html`: «Главная» in the desktop menu and drawer now has `aria-current="page"`. The drawer link also has `is-active`.
- `contacts.html`: the current Contacts parent, «Контактная информация» dropdown item, and drawer item now have `is-active` and `aria-current="page"`.

## Screenshots

- `local-information-procedures-flyout-1440.png`
- `local-information-keyboard-1440.png`
- `local-sticky-header-1440.png`
- `local-administrative-procedures-390.png`
- `local-mobile-drawer-390.png`
- `local-cybercrime-1440.png`
- `local-search-results-1440.png`
- `local-search-empty-1440.png`
