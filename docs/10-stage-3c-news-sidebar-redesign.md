# Stage 3C — News & Sidebar Redesign

## What the user disliked

After Stage 3B, the user still found the homepage unsatisfactory:

- Too much empty space in the lower content area
- News section felt too long (6 large cards with repeated placeholders)
- Vertical sidebar next to news created awkward blank areas and **internal scroll**
- Large news image placeholders made the page feel unfinished
- Small CSS spacing tweaks were not enough — a **structural layout change** was needed

## Why the old layout created empty space

The Stage 3B layout used a **two-column page-layout**: 6 large news cards (2×3 grid) beside a tall sticky sidebar with 5 widgets.

Problems:

1. **Height mismatch** — 6 cards with 16:9 image placeholders made the main column very tall; sidebar widgets did not fill the same visual weight, leaving dead zones.
2. **Sticky sidebar with `overflow-y: auto`** — when widget stack exceeded viewport height, the sidebar scrolled independently, which felt broken on a public site.
3. **Repeated large placeholders** — six identical large SVG blocks read as unfinished, not as a real news portal.
4. **Duplicate utility content** — sidebar duplicated hours/links already present elsewhere on the page.

## What was changed

### Latest news — new structure

Replaced the 6-card grid + sidebar with:

| Element | Description |
|---------|-------------|
| Section intro | Eyebrow «Новости», title, descriptive subtitle |
| Featured card | 1 post with 16:9 image, date, category, title, excerpt, «Подробнее →» |
| Compact list | 4 items with **96×72** thumbnails, date, title, «Подробнее →» |
| Footer CTA | Button «Все новости» → `/category/novosti/` |

**Total homepage news:** 1 featured + 4 compact = **5 items** (was 6 large cards + sidebar).

### Useful information — card grid

Sidebar widgets converted to a horizontal **info-card-widget** grid:

- Время работы
- Полезные ссылки (4 main links + «Все полезные ссылки →»)
- Telegram-канал
- QR-код (compact 88px)
- Поиск по сайту

Responsive grid: 1 col mobile → 2 tablet → 3 desktop → 5 wide desktop.

### Internal scroll removed

From `layout.css`:

- Removed `position: sticky` on `.page-layout__sidebar`
- Removed `max-height: calc(100vh - …)`
- Removed `overflow-y: auto` on sidebar

Only normal page scroll remains. Mobile drawer still uses internal scroll (expected).

### New assets

- `src/assets/images/placeholders/news-thumb-placeholder.svg` — compact 96×72 thumbnail

## Why fewer large news cards on homepage

A public clinic homepage should **tease** recent news, not replicate the archive. Benefits:

- Shorter, denser news block without empty columns
- One hero-style featured post draws attention
- Compact list items scan quickly
- «Все новости» drives users to the full archive (future WordPress `archive.php` / category page)
- Smaller thumbnails reduce visual noise from placeholders

## WordPress mapping

### Homepage news query

```php
// Featured: latest post (offset 0, posts_per_page 1)
// Compact list: next 4 posts (offset 1, posts_per_page 4)
// Archive link: get_category_link() or /category/novosti/
```

| Demo class | WP source |
|------------|-----------|
| `.news-featured__figure` | `the_post_thumbnail('large')` on featured post |
| `.news-compact__thumb` | `the_post_thumbnail('thumbnail')` on each compact post |
| `.latest-news__footer .btn` | Link to news category / archive |

### Useful information cards

| Card | WP source |
|------|-----------|
| Hours | ACF options or hardcoded in template part |
| Quick links | ACF repeater or `wp_nav_menu()` |
| Telegram | ACF URL field |
| QR | Theme option / ACF `sidebar_qr_image` |
| Search | `get_search_form()` |

## Files updated

- `src/pages/index.html` — news + useful info sections restructured
- `src/css/layout.css` — removed sidebar sticky/scroll; added section intro/eyebrow
- `src/css/homepage.css` — latest-news, news-featured, news-compact, useful-info grids
- `src/assets/images/placeholders/news-thumb-placeholder.svg` — new
- `docs/04-wordpress-mapping.md` — homepage news limits
- `docs/07-demo-preview-instructions.md` — Stage 3C checklist

## Known limitations

- Featured excerpt text is static demo copy, not from CMS
- Partner links section still below useful info (11 external links)
- Search remains demo alert
- No WordPress PHP yet

## What to review next

1. Is the news block short enough and balanced?
2. Featured vs compact proportion on desktop and mobile
3. Useful information 5-card row at 1200px+ — too wide or OK?
4. Whether partner links section should be shortened
5. Approve before WordPress theme conversion
