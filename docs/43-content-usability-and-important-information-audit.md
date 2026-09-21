# Stage 6D.2 addendum: restrained iconography

This note records the icon audit and the small set of icons added to existing important-information blocks. No separate page redesign was started. Medical and admissions sentences were not rewritten; the dispensary cabinet sentence was only split so the cabinet and the hours can be scanned as two labeled rows.

## 1. Iconography Rationale

The text-heavy pages are still articles. Icons are scanning cues for facts a visitor looks up: where to go, when, whom to call, which file to download, and which condition must not be missed.

An icon is used only when the same kind of fact already recurs and already has visible text. It does not replace that text, and it is not added to ordinary paragraphs, headings, cards, or lists.

## 2. Existing Icon Assets Reviewed

| Location | What it is | Decision |
| --- | --- | --- |
| Header search, menu, chevron, top-bar mail | Inline SVG, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, decorative `aria-hidden` | Kept. This is the outline family to match. |
| Homepage hero phone and clock | Same stroke family, inside 44px tinted tiles | Kept on the homepage. Not copied into articles. |
| Department index house icon | Same inline stroke family | Kept on department cards. Not reused as a content-row icon. |
| `.prose-document-link::before` | CSS mask of a document outline, colored with `--color-primary` | Kept and pointed at a local SVG file so the document glyph lives with the other content icons. |
| `src/assets/icons/favicon.svg`, `medical-pattern.svg` | Brand mark and background pattern | Not used as content icons. |

There was no sprite, icon component, icon font, or shared content-icon stylesheet before this addendum.

## 3. Icon Categories Implemented

Five glyphs, all used on a page.

| Icon | Why it is used |
| --- | --- |
| Phone | Callable numbers that a visitor has to pick out of a contact block or a short article: the dispensary heads’ line, the women’s consultation booking line, and the two Uritskaya outpatient lines (registry and head). |
| Location | A place that is not obvious from the surrounding prose: cabinet 121, and the Uritskaya street address. |
| Clock | A schedule or a reception window: cabinet hours 7:30–19:00, women’s consultation reception hours, and the Uritskaya working hours. |
| Notice | A condition that changes what the visitor must do: the E-POS payment rule, and the content-page notice to call the registry when online slots are gone. |
| Document | Downloadable price lists. The glyph was already on `.prose-document-link`; it now uses the same local file family. The link text remains the document title. |

## 4. Icon Categories Considered But Rejected

| Category | Why it was not added |
| --- | --- |
| Calendar / date | Applicant dates sit inside long paragraphs. A date icon on each date would decorate the article. |
| External link | College, university, and «онлайн-записи» links already show their names. An extra glyph on every outbound link does not make the destination clearer. |
| Warning as a second glyph | The E-POS rule is one essential condition. One notice icon covers it. A second warning style would split the family for a single block. |
| Person or department | The role is already the visible label beside the number («Регистратура», «Заведующая Урицкой АОП»). A person icon next to the phone icon would mark the same row twice. |
| Checklist | Department inventories are not step-by-step procedures. |
| Email | The top bar already has a mail icon. Article pages do not have a repeating email fact that needs a new glyph. |
| Contacts directory and the direct-line table | Those pages are already labeled groups or a table. An icon on every number would repeat one glyph down the page. |
| Homepage hero tiles | Already present, and larger than the article treatment. They were not extended. |

## 5. Technical SVG Approach

Content icons are local SVG files in `src/assets/icons/`:

- `icon-phone.svg`
- `icon-pin.svg`
- `icon-clock.svg`
- `icon-notice.svg`
- `icon-document.svg`

Each file uses `viewBox="0 0 24 24"`, a hollow outline, stroke width 2, and rounded caps and joins. Pages do not repeat the SVG markup. A row carries an empty span, and CSS masks that span with the file:

- size `1.125rem` (18px at the default root size)
- color `currentColor`, set to `var(--color-primary)` (`#1A6EA8`)
- the file’s stroke is only the mask shape, not the color on the page

The pattern is the existing document-link mask, extended to the other four glyphs. No icon font, npm package, CDN, sprite runtime, or JavaScript renderer was added.

Rows use `.info-line` (icon, text) and, where several facts belong together, `.info-facts`. A row stays readable if the icon span is removed. `.prose-notice--cue` is the same icon treatment on an existing notice. `.prose-document-link` is unchanged apart from the mask file.

## 6. Accessibility Treatment

Decorative icons are empty spans with `aria-hidden="true"`. They are not links, buttons, or SVG elements in the tab order. Measured `tabIndex` on those spans is below 0, so they add no focus stop.

The document glyph is a `::before` mask, so it is not in the accessibility tree. The link’s accessible name is the document title.

Every icon sits with visible text:

- short label plus value («Кабинет», «Время», «Адрес», «Режим работы», «Регистратура», «Важно»)
- or the original full sentence («Контактный телефон…», «Запись на прием производится по телефону…»)

Hiding the icons leaves the labels, sentences, telephone links, and file names in place. Icon color is the existing primary token on white and on `--color-bg-subtle`. Focus rings and link underlines are unchanged.

## 7. Pages Using Each Icon Pattern

| Pattern | Pages |
| --- | --- |
| Phone | `adult-dispensary-examinations.html`, `department.html`, `department-aop.html` |
| Location | `adult-dispensary-examinations.html` (cabinet 121), `department-aop.html` |
| Clock | `adult-dispensary-examinations.html`, `department.html`, `department-aop.html` |
| Notice | `paid-services.html` (E-POS), `content-page.html` (registry notice) |
| Document | `paid-services.html` (four price-list files) |

Footer telephones, the contacts directory, the direct-line table, the applicant article, and the homepage hero were left unchanged.

## 8. Responsive Verification

Checked in the local preview (`http://127.0.0.1:8765`) at 1440×1000, 768×1024, and 390×844.

| Check | Result |
| --- | --- |
| Horizontal overflow | 0 on the dispensary article, paid services, Uritskaya outpatient clinic, and women’s consultation |
| Icon size and color | 18×18px, `rgb(26, 110, 168)`, which is `--color-primary` |
| First-line alignment | Icon top sits about 3px below the text box top (`0.2em`), in line with the first line rather than the block |
| Narrow columns | Label and value share one wrapping text column. The icon is a fixed 18px and does not shrink the type |
| Long labels and addresses | «Заведующая Урицкой АОП» and «улица Коммунистическая 4» wrap under the label. The icon stays on the first line |
| Phone numbers | `tel:` links inside a row use `white-space: nowrap`, so the number stays intact and still fits (about 160px wide) |
| Zoom | At 150% zoom on the 390px dispensary and Uritskaya pages, `scrollWidth` did not exceed `clientWidth` |
| Keyboard | Icon spans are not focusable |

Screenshots: `docs/audit/stage-6d2/`.

The rows remain understandable with the icons removed: the dispensary group is still «Кабинет / Время» plus the original phone sentence, and the department blocks still start with «Режим работы», «Адрес», «Регистратура», and «Время приёма».

## 9. Gutenberg Reuse Considerations

The static classes map to a later block without a PHP implementation in this stage:

- one row: optional icon name (`phone`, `pin`, `clock`, `notice`, `document`, or none), a visible label, and rich text or a link
- a group: an ordered list of those rows
- a notice: the existing notice plus an optional notice icon
- a file link: the existing document link class

The icon is not required. A row with only the label and the value is still understandable. Long Cyrillic text wraps in the text column, including on a narrow screen. The same class names can be printed by a dynamic block later; the SVG files stay in the theme and are referenced from CSS, not from a remote icon kit.
