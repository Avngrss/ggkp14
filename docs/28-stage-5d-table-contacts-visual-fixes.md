# Stage 5D — Table Alignment and Contacts Map Layout Fix

Дата: 2026-09-16

---

## 1. Stage objective

Targeted correction of two verified visual problems before the next template:

1. Unstable table column alignment on `table-page.html` (dates/times breaking awkwardly).
2. Inefficient contacts map layout on `contacts.html` (small map, empty space beside long content).

---

## 2. Problems reported

**Tables:** Dates and times shifted or wrapped unpredictably; column widths inconsistent between header and body rows; `overflow-wrap: anywhere` caused numeric fragments to break.

**Contacts:** Map capped at 400px width with fixed 360px iframe height; subpage navigation in the left column made the grid row much taller than the map column, leaving a large empty area to the right of lower content.

---

## 3. Actual table causes found

| Cause | Location |
|-------|----------|
| `overflow-wrap: anywhere` on all `tbody td` | `internal-pages.css` |
| `table-layout: auto` with only global `min-width` | `.data-table` |
| No column-type sizing (`<colgroup>` / modifiers) | `table-page.html` |
| Phone `nowrap` on links but parent cells still allowed anywhere-wrap | conflicting rules |

At 390px, date column collapsed to ~75px and time to ~54px, splitting values across multiple lines.

---

## 4. Table corrections made

**HTML (`table-page.html`):**

- Added `data-table--cols-5` / `data-table--cols-3` modifiers.
- Added `<colgroup>` with `.data-table__col--date|name|role|phone|time` on all three tables.

**CSS (`internal-pages.css`):**

- `table-layout: fixed` with separate min-widths per table type (44rem / 36rem).
- Percentage + min-width column hints via `<colgroup>`.
- Removed global `overflow-wrap: anywhere` from body cells.
- Column-type rules via `:nth-child()`:
  - date, phone, time: `white-space: nowrap`, `font-variant-numeric: tabular-nums`
  - name, role: natural `break-word` wrapping

---

## 5. Date and time corrections

- Date values (including `16.09.2026 30.09.2026`) stay on one line at desktop (`white-space: nowrap`).
- Time ranges (`15:00-16:00`, `1500— 1600`) use tabular numerals and nowrap.
- On mobile, horizontal scroll inside `.table-scroll` when table exceeds viewport — page itself does not overflow.

**Verified at 1440px:** date cell width 127px, height 76px, `white-space: nowrap`.

---

## 6. Responsive table result

| Viewport | Page overflow | Wrapper scrollable |
|----------|---------------|-------------------|
| 1440 | No | No |
| 768 | No | Yes (734 > 703) |
| 390 | No | Yes (653 > 341) |
| 360 | No | Yes (589 > 311) |

Scroll hint logic unchanged in `main.js`. Semantic markup, captions, `rowspan`, and all columns preserved.

---

## 7. Actual contacts map cause found

| Cause | Detail |
|-------|--------|
| Narrow map column | `minmax(280px, 400px)` capped map at 400px |
| Short iframe | Fixed `height="360"` in HTML |
| Grid height mismatch | Subpages nav inside `.contacts-main` (~1281px) vs map column (~440px) |
| `align-items: start` | Map did not fill vertical space; empty area appeared right of subpages |

---

## 8. Contacts layout corrections made

**HTML (`contacts.html`):**

- Moved `.contacts-subpages` nav out of `.contacts-main` to grid row below both columns (`grid-column: 1 / -1`).
- Removed fixed `height="360"` from iframe (sizing via CSS).

**CSS (`internal-pages.css`):**

- Grid: `minmax(0, 1fr) minmax(340px, 46%)` — map ~46% width on desktop.
- Map embed: `aspect-ratio: 4 / 3`, `min-height: 22rem`, iframe `height: 100%`.
- Map sticky on desktop: `position: sticky; top: calc(var(--header-height) + space)`.
- Subpages: full-width row with top border separator.
- Tablet/mobile: single column, static map, subpages border removed.

---

## 9. Map sizing result

| Viewport | Map width | Map height (embed) |
|----------|-----------|-------------------|
| 1440 | ~585px | ~439px |
| 1280 | ~560px | ~420px |
| 768 | full width ~705px | ~529px |
| 390 | full width ~343px | ~257px |

Before (1440): map 400×360px with ~840px empty visual gap beside subpages. After: map ~585×439px beside compact primary content; subpages span full width below.

---

## 10. Accessibility review

**Tables:** Native semantics unchanged; captions and `scope="col"` preserved; scroll region focusable; `tel:` links readable; tabular nums improve scanability (not color-only).

**Contacts:** Iframe descriptive `title` retained; address text outside map; heading order unchanged; telephone links unchanged.

---

## 11. Multilingual readiness

Column widths use percentages/min-widths, not Russian label length. Date/time nowrap independent of header translation. Map column uses fractional grid — longer BY/EN headings wrap without breaking layout.

---

## 12. Regression results

| Page | Viewports | Result |
|------|-----------|--------|
| Homepage | 1440 | Pass |
| Content page | 1440 | Pass |
| Contacts | 1440, 390 | Pass — data unchanged |
| Table page | all tested | Pass — data unchanged |

---

## 13. Files changed

| File | Change |
|------|--------|
| `src/css/internal-pages.css` | Table column types; contacts grid/map/subpages |
| `src/pages/table-page.html` | `colgroup`, table modifiers |
| `src/pages/contacts.html` | Subpages repositioned; iframe height attribute removed |
| `docs/28-stage-5d-table-contacts-visual-fixes.md` | Created |
| `docs/07-demo-preview-instructions.md` | Stage 5D section |
| `docs/audit/stage-5d/*.png` | 16 screenshots |

**Not modified:** `index.html`, `content-page.html`, `homepage.css`, `main.js`, GitHub workflow.

---

## 14. Known limitations

- Very long double-date strings may require horizontal scroll on narrow mobile (by design).
- Map height follows aspect ratio — extremely short viewports may still feel compact.
- Sticky map disabled below 1024px.

---

## 15. Next template recommendation

**Stage 5E: `departments-index.html`** — `/o-nas/strukturnye-podrazdeleniya/`

---

## Screenshots

See `docs/audit/stage-5d/` (16 files).
