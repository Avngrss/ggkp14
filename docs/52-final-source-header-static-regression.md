# Stage 6L — Final source-header static regression

Date: 2026-10-20

Verification after Stages 6K.1–6K.6. WordPress and multilingual work stayed paused. No page was created. No commit, push, or deploy was made.

## 1. Inventory

49 production HTML files in `src/pages/`, plus development-only `preview.html`.

- Each production file appears once in `preview.html`. `search-results.html` is listed twice only as the two states of one file. The navigator also lists itself and is not published.
- `.github/workflows/pages.yml` and `tools/simulate-pages-dist.py` each list the 48 non-home pages once. Root `index.html` is published by the separate homepage copy.
- `preview.html` is excluded from both publication lists.
- No duplicate or stale filename was found in those lists.

## 2. Page regression

Every production page was opened locally at 390×844, 768×1024, 1439×900, and 1440×1000.

- HTTP 200 on all 49 pages.
- One `h1`, a non-empty title, and a breadcrumb on every internal page.
- Files decode as UTF-8. No U+FFFD and no `????` runs.
- Eight older files still start with a UTF-8 BOM: `department.html`, `department-aop.html`, `departments-index.html`, the three news singles, `news-archive.html`, and `search-results.html`. They render correctly.
- Local CSS, JavaScript, font, icon, and image paths used by the pages exist. No page-level horizontal overflow was measured.

## 3. Header and dropdowns

The live DOM is the same on all 49 pages.

Top level, in order: Главная, Прямые линии, Платные услуги, Информация, Контакты, Абитуриент 2026, Для пациентов.

The Information dropdown includes the About flyout (12 items, including external `https://sansk.by/`), the Administrative Procedures parent and its three children, and the remaining Information articles through Decree 631. The Contacts dropdown includes the three directories, hot line, electronic appeals, and email addresses.

Pointer hover opens the About and Procedures flyouts. The About flyout stays inside a 1000px-tall viewport. Tab from «Информация» lands on «Общая информация». Shift+Tab moves to the previous focusable control. Enter follows the focused link. After a real wheel scroll, `.site-header` gains `is-scrolled`.

`index.html` and `contacts.html` were missing `aria-current="page"` on their own menu links. Those two pages were corrected and rechecked. Other header destinations already marked the current link in the desktop menu and drawer.

## 4. Mobile drawer

At 390 and 768 the drawer contains the same 34 links, with no duplicate href. Long labels wrap. The panel scrolls to the email row. The close button and Escape both close it.

«Адреса e-mail» stays in the desktop Contacts dropdown and is not repeated in the drawer. That placement was already the local header shape and was not changed in this pass.

## 5. Tables

Checked: direct phone lines, administration phones, staff phones, department hours, email addresses, territorial districts, trade union, administration reception, and administrative procedures.

Each uses the scroll wrapper and hint. At 390px, wide tables scroll inside the wrapper and the page itself does not. Email addresses fit without scrolling. The procedures table has no `th` elements because the published source table is body cells only; that structure was kept.

## 6. Media and documents

Local portraits, medical-tourism, and dispensarization images decoded. Trade-union, ideology, addiction-help, and 11 of 12 cybercrime images also decoded from their published URLs. Seven cybercrime videos returned HTTP 200 as `video/mp4`.

`Prilozhenie_buklet_storona-2-scaled.png` is a published PNG URL. Chromium reports `EncodingError` and a full download of that file was reset by the source host. It stays an external source file. A partial copy was not saved.

Remaining `ggkp14.by` links are published documents and media, department records that are not header pages, news posts, and the clinic `mailto:`. No header destination for an internal page that already has a local file still points at the source site.

## 7. Administrative procedures

`administrative-procedures.html` has the title and `h1` «Административные процедуры», the breadcrumb Главная → Административные процедуры, and the source table that includes Decree 200 and the published procedure rows. The menu parent and the three children match the live order. The page is in `preview.html` and both publication lists.

## 8. Local links

No missing local HTML target, no missing local asset, no root-relative WordPress route, no `/ggkp14/ggkp14/` path, and no production link to `preview.html`.

## 9. Preview server

Port 8765 was free. `tools/preview-local.ps1 -Port 8765` started and served the site. The earlier recorded exit code 1 is from stopping a server that had already returned HTTP 200, not from a failure to bind and not from a script defect. The server was stopped after this regression. `dist/` was removed after the publication simulation.

## 10. Publication simulation

`python tools/simulate-pages-dist.py` produced 49 pages under `dist/pages/`, root `index.html` with `./css/` paths and `pages/` links, CSS, JS, assets, and `.nojekyll`. `preview.html` was absent. Docs and audit files were not part of the `src` copy.

## 11. Working tree

Uncommitted paths are under `src/`, `docs/`, `.github/workflows/pages.yml`, and `tools/simulate-pages-dist.py`. No `node_modules`, Playwright install, fetch dump, cache, secret, or generated `dist/` remains in the tree.

## 12. Decision

READY FOR APPROVED COMMIT AND PUSH

The static source-header baseline is complete for internal header pages. The remaining limits are the desktop-only email drawer placement, the UTF-8 BOM on eight older files, the one undecodable remote cybercrime PNG, external department and news links, and the deferred chief-doctor form.
