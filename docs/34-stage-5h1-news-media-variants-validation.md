# Stage 5H.1 — News Media Variants Validation

Дата: 2026-09-16

---

## 1. Stage objective

Validate that the existing `news-single.html` template family supports real WordPress news content variants (video/embed and no featured media) using one future `single.php` / `single-post.php` — not separate template architectures.

---

## 2. Articles inspected

Inspected via Playwright MCP (`ignoreHTTPSErrors: true`) on archive pages 1–2 and individual articles (20+ URLs).

| Article | URL | Inspected for |
|---------|-----|---------------|
| Игра детей с огнём… | `/igra-detej-s-ognjom-…/` | Base variant (Stage 5H) |
| Областная профилактическая акция «На страже цифровых границ» | `/oblastnaya-profilakticheskaya-akciya-…/` | Video variant |
| Профилактика ВИЧ-инфекции. | `/profilaktika-vich-infekcii/` | No-media variant |
| Противодействие киберпреступности — материалы | `/protivodejstvie-kiberprestupnosti-materialy/` | Video + audio (not used — video variant chosen from card 2) |
| Единый день безопасности | `/edinyj-den-bezopasnosti/` | Featured + body images |
| 19536-2 (ВИЧ эпидситуация) | `/19536-2/` | Text-only page 2 |
| + 13 additional page-2 articles | various | Media pattern scan |

---

## 3. Media patterns found

| Pattern | Source example | Static validation |
|---------|----------------|-------------------|
| Featured image + text body | Игра детей с огнём… | `news-single.html` (Stage 5H) |
| Native WordPress video in body (Video.js/kgvid) | Областная профилактическая акция… (2 videos) | `news-single-video.html` |
| No featured image, text-only body | Профилактика ВИЧ-инфекции. | `news-single-no-media.html` |
| Archive list without thumbnail | Областная…, Противодействие… | Archive still uses placeholder thumb |
| Multiple body images | Академия безопасности…, Социальная реклама… | Covered by existing `.prose figure` |
| Audio in body | Противодействие киберпреступности… | CSS `.prose-audio` added; not separate page |

---

## 4. Media patterns not found

| Pattern | Result |
|---------|--------|
| YouTube / Vimeo iframe embeds | Not found in inspected articles |
| WordPress gallery block | Not found |
| PDF document links in news body | Not found in inspected sample |
| Native `<video controls>` with public static URL safe for demo | Source uses plugin player; static uses embed slots |
| Social sharing toolbar | Not present |
| Related posts / prev-next | Not present on source singles |

---

## 5. Existing variant already covered by `news-single.html`

**Variant A: Featured image + text** — representative fire-safety article with local featured placeholder and `.prose` body.

---

## 6. Additional static instances created

| File | Source article | Archive card link |
|------|----------------|-------------------|
| `news-single-video.html` | Областная профилактическая акция «На страже цифровых границ» | Card 2 |
| `news-single-no-media.html` | Профилактика ВИЧ-инфекции. | Card 5 |

Total additional instances: **2** (maximum allowed).

---

## 7. Why they are content variants rather than templates

Both pages reuse identical shell, breadcrumb, `.news-single` header/metadata, `.news-single__back-link`, footer, and JS. Differences are optional blocks inside one article:

- Video variant: `.prose-media` + `.prose-embed` slots inside `.prose`
- No-media variant: modifier `.news-single--no-media` omits featured figure

No separate page themes, no variant-specific stylesheets.

---

## 8. Featured image conditional behavior

Future `single.php`:

```php
if ( has_post_thumbnail() ) {
  the_post_thumbnail();
}
```

Static mapping:

- `news-single.html` — always shows `.news-single__featured`
- `news-single-video.html` — uses `.news-single--no-featured`; video in body only (matches source: no post thumbnail block)
- `news-single-no-media.html` — uses `.news-single--no-media`; no featured wrapper

---

## 9. No-featured-image behavior

Source «Профилактика ВИЧ-инфекции.»: `hasPostThumbBlock: false`, `entryImgCount: 0`, `textOnly: true`.

Static page:

- No `.news-single__featured` element
- No empty placeholder gap
- Header flows directly into `.news-single__body`
- Archive card may still show list thumbnail placeholder (WordPress archive fallback)

---

## 10. Video/embed behavior

Source «Областная профилактическая акция…»: 2 native uploaded videos (Video.js), titles «№45 Мвд Звонок Тv», «№32 Мвд Предупреждает Тv», no iframe, no featured image.

Static page:

- Two `.prose-embed` slots (16:9) with real video titles as labels/figcaption
- No hotlinked playable media (copyright / static demo rule)
- No autoplay, no custom controls, no JS
- Future: WordPress `core/video` block inside `the_content()`

---

## 11. Multiple image/gallery behavior

Not given a separate static page. Existing `.prose figure`, `.prose-gallery` grid CSS supports future image blocks and gallery blocks within one template.

---

## 12. Document/download behavior

Not found in inspected news sample — no document sections added.

---

## 13. Existing CSS reused

- `.news-single*`, `.prose`, `.prose-notice`, `.badge--category`
- `.news-single__back-link`, breadcrumb, tokens, focus-visible
- `.contacts-map__embed` pattern informed `.prose-embed` responsive ratio approach

---

## 14. New reusable CSS added

Added to `internal-pages.css` (Stage 5H.1 block):

- `.news-single--no-media`, `.news-single--no-featured` spacing
- `.prose-media`, `.prose-embed`, `.prose-embed__slot`, `.prose-embed__label`, `.prose-embed__note`
- `.prose-gallery`, `.prose-audio` (future-ready, unused in static HTML yet)

No new stylesheet file.

---

## 15. JavaScript confirmation

| File | Status |
|------|--------|
| `main.js` | Unchanged |
| `menu.js` | Unchanged |
| `accessibility.js` | Unchanged |

No media player, lightbox, lazy-load, or gallery JS added.

---

## 16. Archive link changes

| Archive card | Links updated to |
|--------------|------------------|
| Игра детей с огнём… (rep) | `news-single.html` (unchanged from 5H) |
| Областная профилактическая акция… | `news-single-video.html` |
| Профилактика ВИЧ-инфекции. | `news-single-no-media.html` |
| Other 7 cards | Live `ggkp14.by` URLs |

Homepage news links unchanged.

---

## 17. Future WordPress mapping

| Static | WordPress |
|--------|-----------|
| `news-single*.html` | One `single.php` / `single-post.php` |
| `.news-single__featured` | `the_post_thumbnail()` when `has_post_thumbnail()` |
| `.news-single--no-media` | Skip thumbnail block when no featured image |
| `.prose-embed` | `core/video` or oEmbed inside `the_content()` |
| `.prose-media figcaption` | Attachment caption / block caption |
| `data-wp-block="core/video"` | Gutenberg block marker |

---

## 18. Gutenberg and the_content() mapping

All body variations (paragraphs, headings, video blocks, image blocks, gallery, audio, file blocks) render inside `the_content()`. Template shell (header, breadcrumb, optional featured image, return link) remains outside the loop content.

---

## 19. Accessibility considerations

- One H1 per variant page
- Video slots use `aria-label` on embed container
- Figcaptions for video slot titles
- No empty media wrapper on no-media page
- No autoplay video
- Focus-visible on return link and interactive shell elements

---

## 20. Multilingual readiness

- Long titles and metadata wrap
- Embed labels and captions wrap
- No fixed heights on media slots
- No-media spacing stable without featured block

---

## 21. Responsive behavior

Verified at 1440, 1280, 1024, 768, 390, 360 px — no page-level horizontal overflow on all three variants.

- `.prose-embed` maintains 16:9 aspect ratio
- Gallery grid collapses to single column on narrow viewports (CSS ready)
- No-media header-to-body transition without gap

---

## 22. Regression results

| Page | Result |
|------|--------|
| `news-single.html` | Pass — unchanged structure |
| `news-archive.html` | Pass — 10 cards, 3 local links, pagination intact |
| `index.html` | Pass — homepage news unchanged |
| `contacts.html`, `table-page.html` | Pass |
| `departments-index.html`, department variants | Pass — no media CSS leak |

---

## 23. Files created or changed

| File | Action |
|------|--------|
| `src/pages/news-single-video.html` | Created |
| `src/pages/news-single-no-media.html` | Created |
| `src/css/internal-pages.css` | Media variant CSS |
| `src/pages/news-archive.html` | 2 archive card links |
| `src/pages/preview.html` | 2 preview entries |
| `docs/34-stage-5h1-news-media-variants-validation.md` | Created |
| `docs/07-demo-preview-instructions.md` | Stage 5H.1 section |
| `docs/audit/stage-5h1/*.png` | Audit screenshots |

---

## 24. Known limitations

- Video slots are non-playable placeholders (no hotlinked source MP4)
- Only 2 of many possible media mixes validated as separate static instances
- Cybercrime article (video + audio) not used — structurally similar video pattern covered by card 2
- Gallery and PDF patterns not found in inspected sample

---

## 25. Template validation conclusion

**One future `single.php` or `single-post.php` is sufficient.**

Conditional featured image output and variable `the_content()` blocks (text, video, images, gallery, audio) can all be handled within a single template and shared CSS family validated across three static content instances.

---

## 26. Recommended next template

**Stage 5I: `search-results.html`** — search results listing for `/?s=` query pattern from Stage 4 audit.
