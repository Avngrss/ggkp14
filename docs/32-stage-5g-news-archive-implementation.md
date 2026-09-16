# Stage 5G — News Archive Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create one reusable static template `src/pages/news-archive.html` for the news archive, using real content from https://ggkp14.by/category/novosti/, with approved internal page shell and archive-specific listing layout.

---

## 2. Source archive inspected

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/category/novosti/ |
| Title | Новости Archives — ГУЗ «Гомельская городская клиническая поликлиника №14» |
| H1 | Рубрика: Новости |
| Breadcrumb | Главная » Новости (audit pattern) |
| Items per page | 10 |
| Pagination | 21 pages |
| Sidebar | Widgets on source (excluded per redesign) |

Inspection: Playwright MCP with `ignoreHTTPSErrors: true` at 1440, 768, 390.

---

## 3. Pagination pages inspected

| Page | URL | Items | Current page |
|------|-----|-------|--------------|
| 1 | `/category/novosti/` | 10 | 1 |
| 2 | `/category/novosti/page/2/` | 10 | 2 |

Static demo implements page 1 with pagination controls: 1 (current), 2, …, 21, «Следующая».

---

## 4. Actual archive content structure

Per article on source page 1:

- Featured image (square ~500×500 on source)
- Publication date (DD.MM.YYYY)
- Category label («Новости»)
- H2 post title (link)
- Excerpt paragraph (when present on source)
- «Подробнее» / read-more link

No sidebar in static template. No archive filters or search.

---

## 5. News fields available

| Field | Available | Notes |
|-------|-----------|-------|
| Title | Yes | All 10 items |
| Date | Yes | DD.MM.YYYY format |
| Category | Yes | «Новости» for all page-1 items |
| Excerpt | Partial | 8 with text; 2 without (not invented) |
| Image | Source has images | Local placeholder used (no hotlink) |
| URL | Yes | Full ggkp14.by paths preserved in `data-article-path` |

---

## 6. Existing components reused

- Full internal page shell
- Breadcrumb, `.page-header`, footer
- `.badge`, `.badge--category` from components.css
- `.image-slot` + `news-thumb-placeholder.svg` (homepage news strategy)
- Design tokens, focus styles, container system
- JS: `menu.js`, `accessibility.js`, `main.js`

Homepage `.news-featured` / `.news-compact` not reused — archive uses denser repeatable grid, not 1+4 layout.

---

## 7. Archive-specific components added

| Component | Class | Purpose |
|-----------|-------|---------|
| Archive section | `.news-archive` | Wraps list + pagination |
| List grid | `.news-archive__list` | Responsive 1→2 column grid |
| List item | `.news-archive__item` | Grid cell |
| Card | `.news-archive__card` | Article card |
| Media | `.news-archive__media` | 16:10 image slot |
| Body | `.news-archive__body` | Meta, title, excerpt, link |
| Meta | `.news-archive__meta` | Date + category |
| Title | `.news-archive__title` | H3 with link |
| Excerpt | `.news-archive__excerpt` | Optional paragraph |
| More link | `.news-archive__more` | «Подробнее» |
| Pagination nav | `.news-archive__pagination`, `.pagination` | Static page controls |

---

## 8. Image and fallback strategy

- All cards use `../assets/images/placeholders/news-thumb-placeholder.svg`
- No hotlinked source images
- `alt` set to article title (WordPress-ready meaningful context)
- `object-fit: cover` on 16:10 media slot
- `data-wp-field="post_thumbnail"` on figure for future CMS mapping

---

## 9. Pagination implementation

- `<nav aria-label="Навигация по страницам новостей">`
- Semantic `<ul class="pagination">`
- Current page: `<span aria-current="page">1</span>`
- Links use `#` for static demo (pages 2, 21, next)
- Russian label «Следующая» for next control
- No JavaScript pagination

WordPress will generate dynamic pagination via `paginate_links()`.

---

## 10. Static article-link strategy

- All article links point to live `https://ggkp14.by/...` URLs
- Each card has `data-article-path` for future local routing
- First article marked `data-stage5h-representative="true"` for Stage 5H
- Homepage news links unchanged in this stage
- No broken local `news-single.html` routes

---

## 11. Representative article selected for Stage 5H

**«Игра детей с огнём: дюжина пожаров в Гомельской области»**

- URL: `/igra-detej-s-ognjom-djuzhina-pozharov-v-gomelskoj-oblasti/`
- Matches Stage 4 audit single-news example
- Has title, date, category, excerpt, and representative image on source

---

## 12. Future WordPress archive mapping

| Static | WordPress |
|--------|-----------|
| `news-archive.html` | `category.php` or `archive.php` for category «novosti» |
| `.news-archive__list` | `while (have_posts())` loop |
| Card fields | `the_title()`, `the_date()`, `the_excerpt()`, `the_post_thumbnail()`, `the_permalink()` |
| Pagination | `paginate_links()` or core pagination |
| Placeholder | Fallback when no featured image |

---

## 13. CSS changes

**File:** `internal-pages.css` (Stage 5G block)

- Archive grid (1 col mobile, 2 col ≥768px)
- Compact card with 16:10 media ratio
- Meta, title, excerpt, «Подробнее» styling
- Pagination controls with `aria-current` styling
- No changes to `homepage.css`

---

## 14. JavaScript usage

Existing scripts only — no archive-specific JS, no infinite scroll, no load-more.

---

## 15. Multilingual readiness

- `lang="ru"` retained
- Titles, excerpts, pagination labels wrap naturally
- No fixed card heights
- Category badge and date flex-wrap on narrow viewports

---

## 16. Accessibility considerations

- Skip link, one H1, hidden H2 for list section
- Article titles as H3 inside `<article>`
- `<time datetime="">` for all dates
- Pagination with `aria-current="page"`
- Separate title and «Подробнее» links (not nested)
- Focus-visible on interactive elements
- Image alt from article title

Not claiming full WCAG audit.

---

## 17. Responsive behavior

Verified via Playwright MCP — no page-level horizontal overflow.

| Viewport | Grid | Notes |
|----------|------|-------|
| 1440 / 1280 | 2 columns | Balanced rows (10 items) |
| 1024 / 768 | 2 columns | |
| 390 / 360 | 1 column | Pagination wraps |

---

## 18. Regression results

| Page | Result |
|------|--------|
| `index.html` 1440 / 390 | Pass — homepage news unchanged |
| `content-page.html` | Pass |
| `contacts.html` | Pass — map intact |
| `table-page.html` | Pass |
| `departments-index.html` | Pass — 18 cards, 2 local dept links |
| `department.html` / `department-aop.html` | Pass — no archive style leak |

---

## 19. Files created or changed

| File | Action |
|------|--------|
| `src/pages/news-archive.html` | Created |
| `src/css/internal-pages.css` | Archive + pagination styles |
| `src/pages/preview.html` | Stage 5G entry |
| `docs/32-stage-5g-news-archive-implementation.md` | Created |
| `docs/07-demo-preview-instructions.md` | Stage 5G section |
| `docs/audit/stage-5g/*.png` | Audit screenshots |

---

## 20. Assumptions

- Page 1 content from live source is authoritative for static demo
- Truncated excerpts match source opening paragraphs (not invented)
- Sidebar widgets on source are excluded per redesign convention
- Pagination `#` links acceptable for static demo until WordPress

---

## 21. Known limitations

- Only page 1 of 21 implemented as static HTML
- All images are placeholders (no source image copies)
- Article links leave static demo site
- `news-single.html` not yet implemented
- Source page title uses English «Archives» — static title uses Russian «Новости»

---

## 22. Recommended next template

**Stage 5H: `news-single.html`** — single article page using representative fire-safety news article from source.
