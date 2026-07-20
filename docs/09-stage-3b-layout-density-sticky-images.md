# Stage 3B — Layout Density, Sticky Header, WordPress Image Slots

## User feedback addressed

The user reviewed the Stage 3A demo and reported:

- Too much empty vertical space across the page
- A large blank area in the news + sidebar section (main column ended early while sidebar widgets continued)
- The middle/lower content area felt unfinished and not dense enough
- Header should stay visible while scrolling (sticky)
- Decorative CSS backgrounds alone are not enough — real image insertion areas are needed for future WordPress content

## What was changed

### Layout density

- Reduced default section padding from `--space-16` (64px) to `--space-12` (48px)
- Added `.section--compact` (32px) for news and useful links sections
- Reduced section header bottom margin from `--space-8` to `--space-6`
- Tightened widget padding and removed duplicate vertical margins (sidebar uses flex gap)
- Removed the duplicate **«Новости — расширенная лента»** block that caused empty main-column space
- Merged **Последние новости** and **sidebar** into one balanced two-column `.page-layout`
- News grid in sidebar layout uses **2 columns** on desktop (not 3) so cards fill the main column height better alongside the sidebar
- Promo banner uses horizontal layout with image + text instead of a tall empty centered block
- Useful links use compact cards with small logo placeholders (72px min-height vs 80px)

### Sticky header

- Header remains `position: sticky; top: 0`
- Topbar scrolls away naturally (not sticky)
- JS adds `.is-scrolled` after 8px scroll → stronger shadow
- JS adds `.is-compact` after 120px scroll → header inner height 64px, smaller logo icon
- `scroll-padding-top` set on `html` for anchor links
- Dynamic `--header-height` updated on resize for accurate sidebar sticky offset

### WordPress-ready image slots

Local SVG placeholders in `src/assets/images/placeholders/`:

| File | Used in |
|------|---------|
| `hero-clinic-placeholder.svg` | Hero visual |
| `news-placeholder.svg` | News card thumbnails |
| `department-placeholder.svg` | Department cards |
| `promo-placeholder.svg` | Promo/dispanserization banner |
| `qr-placeholder.svg` | Sidebar QR widget |
| `partner-placeholder.svg` | Useful links / partner logos |

All slots use semantic `<figure class="image-slot">` + `<img>` and `data-wp-field` attributes for future ACF mapping.

## Image slot locations

1. **Hero** — `.hero__visual` → future ACF `hero_image`
2. **News cards** — `.news-card__figure` → WordPress post thumbnail
3. **Departments** — `.dept-card__image` → department CPT featured image or ACF
4. **Promo banner** — `.promo-banner__visual` → ACF `promo_image`
5. **Useful links** — `.useful-link__logo` → ACF repeater image field
6. **Sidebar QR** — `.widget__qr-figure` → theme option or ACF option field

Fallback: if no image is set in WordPress, theme should output the same placeholder SVG path or a generic fallback.

## Files changed

- `src/pages/index.html` — layout merge, image slots, removed extended news section
- `src/css/layout.css` — section spacing, page-layout sidebar, image-slot base
- `src/css/base.css` — scroll-padding-top
- `src/css/components.css` — sticky header compact state, news/dept/useful-link/widget QR styles
- `src/css/homepage.css` — hero visual, promo layout, news+sidebar, removed content-sidebar
- `src/js/main.js` — sticky header scroll states, dynamic header height
- `docs/04-wordpress-mapping.md` — Image fields section
- `docs/07-demo-preview-instructions.md` — Stage 3B review checklist

## Known limitations

- Placeholder SVGs are abstract healthcare visuals, not real clinic photography
- Partner logos all share one generic placeholder until real logos are uploaded in WP
- Sticky sidebar scrolls internally if widget stack exceeds viewport height
- Search remains demo-only (alert)
- No WordPress PHP theme code yet

## What to review next

1. Visual density — is the page still too airy or now too tight?
2. Hero image slot size and placement on desktop/tablet/mobile
3. News 2-column grid balance vs sidebar height
4. Sticky header compact transition feel
5. Department card image ratio (16:9) — acceptable or prefer smaller badges?
6. Approve direction before WordPress theme conversion (Stage 4)
