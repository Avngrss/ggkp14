# Stage 5H — News Single Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create one reusable static template `src/pages/news-single.html` as a prototype for the future WordPress single-post template, using the Stage 5G representative article from https://ggkp14.by/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/

---

## 2. Source article inspected

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/ |
| Document title | Игра детей с огнём: дюжина пожаров в Гомельской области — ГУЗ «Гомельская городская клиническая поликлиника №14» |
| Article title (source H2) | Игра детей с огнём: дюжина пожаров в Гомельской области |
| H1 on source | 0 (accessibility defect — static redesign uses one H1) |
| Date | 10 сентября, 2026 |
| Category | Новости (from archive context) |
| Author | Not visible |
| Featured image | Present (~1024×768 on source) |
| Image caption | Not present |
| Body structure | Paragraphs with inline section labels as plain `<p>` (not semantic headings on source) |
| Lists / blockquotes / links in body | None observed in main content |
| Tags | None |
| Prev/next navigation | None |
| Related content | None |
| Comments | Present on source — excluded |
| Sidebar | Present on source — excluded |
| Social sharing | None |

Inspection: Playwright MCP with `ignoreHTTPSErrors: true` at 1440, 768, 390.

---

## 3. Source structure found

Observed content blocks on source:

1. Article title (H2 on source)
2. Publication date
3. Featured image in entry content
4. Intro paragraph
5. Section «Цифры статистики» (plain paragraph label on source)
6. Statistics paragraphs
7. Section «Почему дети играют с огнем?»
8. Explanatory paragraphs with incident examples
9. Section «Проект «Сохрани жизнь ребенку»»
10. Program description paragraphs

Source uses paragraph text for section labels instead of heading elements — static redesign converts observed section labels to semantic H2.

---

## 4. Required article blocks

| Block | Implemented |
|-------|-------------|
| Breadcrumb | Yes — Главная » Новости » title |
| Article title (H1) | Yes |
| Publication metadata | Yes — `<time datetime="2026-09-10">` |
| Category | Yes — badge «Новости» |
| Featured image | Yes — local placeholder |
| Article body | Yes — `.prose` with demo content |
| Return link | Yes — «Все новости» → `news-archive.html` |

---

## 5. Optional blocks found

| Block | Source | Static template |
|-------|--------|-------------------|
| Author | Not visible | Not included |
| Image caption | Not present | Not included |
| Tags | Not present | Not included |
| Prev/next | Not present | Not included |
| Related posts | Not present | Not included |
| Comments | Present | Excluded per redesign |
| Sidebar | Present | Excluded per redesign |
| Social share | Not present | Not included |

Template includes blockquote and list in demo body to validate `.prose` support — not claimed as source content.

---

## 6. Article content handling

| Content | Handling |
|---------|----------|
| Title | Real source title |
| Date | Real — 10.09.2026 (`datetime="2026-09-10"`) |
| Category | Real — «Новости» |
| Lead paragraph | Real source excerpt (also on archive card) |
| Section headings | Real labels from source converted to H2 |
| Body paragraphs | Neutral demonstration copy marked `[Демонстрационный текст]` |
| Blockquote / list | Demo-only for typography validation |
| Notice block | Visible «Демонстрационный контент» disclaimer |

Full source article body not reproduced verbatim — copyright and content rule applied.

---

## 7. Copyright and demo-content handling

The static template validates structure and typography, not full republication. Only title, date, category, and introductory excerpt use source text. Main body uses clearly marked neutral demonstration copy. A `.prose-notice` block at the end states that body text is not source content.

---

## 8. Existing components reused

- Full internal page shell (topbar, header, nav, search, drawer, footer)
- Breadcrumb pattern
- `.badge--category`
- `.prose` typography system
- `.prose-notice`
- `.image-slot` + `news-placeholder.svg`
- Design tokens, focus-visible, container
- JS: `menu.js`, `accessibility.js`, `main.js` — unchanged

---

## 9. Single-news components added

| Component | Class | Purpose |
|-----------|-------|---------|
| Back link wrap | `.news-single__back` | Return navigation container |
| Back link | `.news-single__back-link` | «Все новости» |
| Article wrapper | `.news-single` | Semantic article + WP path |
| Header | `.news-single__header` | Meta + H1 |
| Meta row | `.news-single__meta` | Date + category |
| Title | `.news-single__title` | H1 styling |
| Featured media | `.news-single__featured` | 16:9 image slot |
| Body | `.news-single__body.prose` | Article content |
| Lead | `.news-single__lead` | Intro paragraph emphasis |

---

## 10. Featured image strategy

- Placeholder: `../assets/images/placeholders/news-placeholder.svg` (16:9, matches homepage featured news asset)
- No external hotlink
- `data-wp-field="post_thumbnail"` on figure
- `object-fit: cover`, controlled aspect ratio, not excessively tall
- `alt` from article title

---

## 11. Archive link update

In `news-archive.html`, the card with `data-stage5h-representative="true"`:

- Title link → `news-single.html`
- «Подробнее» link → `news-single.html`
- `data-article-path` preserved: `/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/`

Other 9 archive cards unchanged (live `ggkp14.by` URLs). Homepage news links unchanged.

---

## 12. JavaScript confirmation

No article-specific JavaScript added or modified.

| File | Status |
|------|--------|
| `main.js` | Unchanged |
| `menu.js` | Unchanged |
| `accessibility.js` | Unchanged |

Existing JS handles header, search, drawer, accessibility only.

---

## 13. Future WordPress mapping

| Static | WordPress |
|--------|-----------|
| `news-single.html` | `single.php` or `single-post.php` |
| `.news-single__title` | `the_title()` |
| `.news-single__meta time` | `get_the_date()` |
| `.badge--category` | Category output / `the_category()` |
| `.news-single__featured` | `the_post_thumbnail()` |
| `.news-single__body` | `the_content()` |
| `.news-single__back-link` | Category archive URL / `get_category_link()` |
| `data-article-path` | Permalink slug |
| Demo notice | Removed in production |

---

## 14. Multilingual readiness

- `lang="ru"` retained
- H1, metadata, body headings wrap naturally
- No fixed article height
- Return link and breadcrumb stable on narrow viewports
- Long URLs in prose wrap via existing styles

---

## 15. Accessibility considerations

- Skip link, `main` landmark, semantic `<article>`
- Exactly one H1 (corrects source H2-only title)
- Logical H2 sequence in body
- Accessible breadcrumb with `aria-current="page"`
- `<time datetime="">` for publication date
- Descriptive return link «Все новости»
- Image `alt` from article context
- Focus-visible on links
- Demo notice with `aria-label`

Not claiming full WCAG audit.

---

## 16. Responsive behavior

Verified via Playwright MCP — no page-level horizontal overflow.

| Viewport | Notes |
|----------|-------|
| 1440 / 1280 | Readable prose width, featured image scales |
| 1024 / 768 | Metadata wraps, title scales with clamp |
| 390 / 360 | Single column, no clipping, no overflow |

---

## 17. Regression results

| Page | Result |
|------|--------|
| `index.html` 1440 / 390 | Pass — homepage news unchanged |
| `news-archive.html` 1440 / 390 | Pass — 10 cards, pagination, one local link |
| `content-page.html` | Pass |
| `contacts.html` | Pass — map intact |
| `table-page.html` | Pass |
| `departments-index.html` | Pass — 18 cards, 2 local dept links |
| `department.html` / `department-aop.html` | Pass — no single-news style leak |

---

## 18. Files created or changed

| File | Action |
|------|--------|
| `src/pages/news-single.html` | Created |
| `src/css/internal-pages.css` | Single-news styles (Stage 5H block) |
| `src/pages/news-archive.html` | Representative card links → local |
| `src/pages/preview.html` | Stage 5H entry |
| `docs/33-stage-5h-news-single-implementation.md` | Created |
| `docs/07-demo-preview-instructions.md` | Stage 5H section |
| `docs/audit/stage-5h/*.png` | Audit screenshots |

---

## 19. Assumptions

- Stage 5G representative article remains the canonical single-news demo
- Archive category «Новости» applies to this article
- Source section labels converted to H2 improve structure without changing meaning
- Demo body copy sufficient for typography validation until CMS migration

---

## 20. Known limitations

- Full source article body not reproduced (copyright rule)
- Featured image is placeholder only
- Only one archive card links locally
- Comments, sidebar, tags, prev/next excluded though some exist or could exist on source
- Source date displayed as «10 сентября, 2026» — static uses DD.MM.YYYY format consistent with archive

---

## 21. Recommended next template

**Stage 5I: `search-results.html`** — search results listing for `/?s=` query pattern from Stage 4 audit.
