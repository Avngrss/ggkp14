# Stage 5I — Search Results Implementation

Дата: 2026-09-16

---

## 1. Stage objective

Create one reusable static template `src/pages/search-results.html` as a visual and structural prototype for future WordPress `search.php`. Server-side search only — no client-side filtering, JSON index, or PHP in this stage.

---

## 2. Successful query inspected

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/?s=диспансеризация |
| Document title | You searched for диспансеризация — ГУЗ «Гомельская городская клиническая поликлиника №14» |
| Source H1 (English defect) | 3 search results for: диспансеризация |
| Static H1 (Russian) | Результаты поиска для: «диспансеризация» |
| Result count | 3 |
| Pagination | None |
| Sidebar | None on source |

Inspection: Playwright MCP with `ignoreHTTPSErrors: true` at 1440, 1280, 1024, 768, 390, 360.

### Results (order preserved)

| # | Title | URL | Type | Excerpt | Date | Image |
|---|-------|-----|------|---------|------|-------|
| 1 | Диспансеризация | `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` | Page | No | No | No |
| 2 | В Гомеле на одну заботливую поликлинику стало больше | `/helping-children-deal-with-trauma/` | Post | No | No | Source has thumbnail (not shown in static — text-first) |
| 3 | Главная | `/` | Page | No | No | No |

No «Подробнее» / read-more on source for this query. No categories.

---

## 3. Additional query inspected

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/?s=контакты |
| Source H1 | 8 search results for: контакты |
| Result count | 8 |
| Pagination | None |

Heterogeneous mix: contacts page, news posts, department page (Залипский ФАП), info pages. Several results include excerpt paragraphs; some titles only. Documents that future `search.php` must support optional excerpt and mixed post types — not reproduced on static demo page.

---

## 4. No-results query inspected

| Field | Value |
|-------|-------|
| URL | https://ggkp14.by/?s=zzqxp_nonexistent_query_2026 |
| Source H1 | 0 search results for: zzqxp_nonexistent_query_2026 |
| Message (English on source) | Sorry, but nothing matched your search terms. Please try again with some different keywords. |
| Articles | 0 |
| Pagination | None |

Static redesign uses Russian equivalent in documented pattern (not visible on demo page).

---

## 5. Source result structure

Simple vertical list of `<article>` blocks:

- Post/page title as linked heading
- Optional featured image (inconsistent — often absent)
- Optional excerpt paragraph (query-dependent)
- No sidebar, filters, or sorting
- Mixed English UI strings on source (corrected to Russian in static template)

---

## 6. Result content types found

| Query | Types observed |
|-------|----------------|
| диспансеризация | Information page, news post, homepage |
| контакты | Contacts page, news posts, department page, info pages |
| no-results | N/A |

---

## 7. Existing components reused

- Full internal page shell (topbar, sticky header, desktop nav, mobile drawer, footer)
- Breadcrumb, `.page-header`, `.container`, design tokens
- `.badge` base from `components.css`
- `.pagination` system (documented for future use; not rendered on demo)
- JS unchanged: `menu.js`, `accessibility.js`, `main.js` (header search panel toggle only)

News archive card grid **not** reused — search uses compact text-first list.

---

## 8. Search-result components added

| Class | Purpose |
|-------|---------|
| `.search-results__header` | Page header variant with query |
| `.search-results__query` | Quoted query emphasis in H1 |
| `.search-results__count` | Supporting result count |
| `.search-results` | Results section landmark |
| `.search-results__list` | Semantic result collection |
| `.search-result` | Individual result article |
| `.search-result__meta` | Optional metadata row |
| `.badge--type` | Content-type label |
| `.search-result__title` | Result heading + link |
| `.search-result__excerpt` | Optional excerpt (future WP) |
| `.search-results__empty` | No-results block (CSS only; not on visible page) |
| `.search-results__empty-message` | No-results text |
| `.search-results__refine` | Refinement form slot |
| `.search-results__back` | Return navigation |

---

## 9. Image or text-first strategy

**Text-first.** Source results for «диспансеризация» have no excerpts and mostly no images. One result has a source thumbnail but static template omits optional thumbnails to avoid empty wrappers and inconsistent layout. Future WordPress may output `<img>` only when `has_post_thumbnail()`.

---

## 10. Pagination decision

**Not displayed.** Source query returns 3 results with no pagination. Secondary query «контакты» (8 results) also has no pagination. Document that `the_posts_pagination()` renders conditionally when `$wp_query->max_num_pages > 1`, reusing shared `.pagination` from news archive.

---

## 11. No-results handling

Documented reusable pattern (not shown on static demo):

```html
<div class="search-results__empty">
  <p class="search-results__empty-message">
    По запросу «{query}» ничего не найдено. Попробуйте изменить формулировку.
  </p>
  <div class="search-results__refine">
    <!-- WordPress: get_search_form() -->
  </div>
  <p class="search-results__back">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Вернуться на главную</a>
  </p>
</div>
```

No empty `<ul>`, no pagination when zero results.

---

## 12. Header search integration

- Desktop header search panel opens via existing `main.js` toggle
- Mobile drawer search remains accessible
- Input on `search-results.html` uses `name="s"` for WordPress compatibility
- Form `action="#"` — static non-functional; future maps to `/?s=query` via `get_search_form()`
- No client-side search execution added

---

## 13. JavaScript confirmation

No changes to:

- `src/js/main.js`
- `src/js/menu.js`
- `src/js/accessibility.js`

No search filtering, query parsing, pagination JS, autocomplete, or AJAX.

---

## 14. Future WordPress mapping

| Static | WordPress |
|--------|-----------|
| `search-results.html` | `search.php` |
| Query in H1 | `get_search_query()` |
| Result count | `$wp_query->found_posts` |
| Search form in header | `get_search_form()` |
| `.search-results__list` | `while ( have_posts() ) : the_post();` |
| Title link | `the_title()` + `the_permalink()` |
| Excerpt | `the_excerpt()` when available |
| `.badge--type` | `get_post_type()` / custom labels |
| Date | `get_the_date()` + `<time>` when applicable |
| Pagination | `the_posts_pagination()` |
| `.search-results__empty` | `else` branch when `! have_posts()` |

---

## 15. Multilingual readiness

- H1 and quoted query use `word-break: break-word`
- Result count, type badges, titles, excerpts use flexible wrapping
- No fixed heights on result cards or header
- `lang="ru"` retained; labels can expand for BY/EN without layout break

---

## 16. Accessibility considerations

- Skip link, `#main` landmark
- Exactly one H1 with query in visible text
- Breadcrumb with `aria-current="page"`
- Result list: `<section>` + `<ul>` + `<article>` + `<h3>`
- Descriptive title links (no nested interactives)
- Focus-visible on links
- No empty media wrappers
- No-results pattern documented with clear message and return link
- Pagination omitted when not needed (avoids misleading controls)

---

## 17. Responsive behavior

Verified at 1440, 1280, 1024, 768, 390, 360 via Playwright MCP on local server (port 8769):

- Header, sticky behavior, search panel, mobile drawer intact
- H1 and query wrap on narrow viewports
- Result cards readable; no horizontal page overflow at 360px
- Footer stacks correctly

---

## 18. Regression results

Screenshots in `docs/audit/stage-5i/`:

- Homepage desktop + mobile — unchanged
- News archive desktop + mobile — unchanged
- News single desktop — unchanged
- Contacts, table, departments index, department variant — unchanged
- No search CSS leak observed on regression pages

---

## 19. Files created or changed

| File | Action |
|------|--------|
| `src/pages/search-results.html` | Created |
| `src/css/internal-pages.css` | Added search-results block |
| `src/pages/preview.html` | Added preview entry |
| `docs/35-stage-5i-search-results-implementation.md` | Created |
| `docs/07-demo-preview-instructions.md` | Stage 5I section |
| `docs/audit/stage-5i/*.png` | Screenshots |

**Unchanged:** JS files, homepage, other templates, GitHub Pages workflow.

---

## 20. Assumptions

- Content-type labels («Страница», «Новость») derived from URL/post-type inspection, not shown on English source UI
- «Найдено: 3» is Russian equivalent of source count in English H1
- Live ggkp14.by URLs preserved for static demo links until WordPress conversion

---

## 21. Known limitations

- Static page does not execute search; GitHub Pages cannot run `?s=` queries
- Only successful query state is visible; no-results is CSS/HTML pattern in docs only
- `name="s"` added on `search-results.html` only; other pages retain prior markup until WP migration
- Source mixed English UI not reproduced

---

## 22. Recommended next stage

Full static-site audit and WordPress content stress-test planning (do not start in this stage).
