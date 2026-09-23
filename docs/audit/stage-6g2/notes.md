# Stage 6G.2 Audit Notes

Date: 2026-09-23

## Scope

Implemented and verified the no-results state on the existing `search-results.html` template.
No second search page was created.

## Demo-state convention

- Results state: `search-results.html` (optionally with `?s=...`)
- Empty state: `search-results.html?state=empty&s=...`

`s` is display-only in the static prototype. The page does not perform filtering, indexing, or any real search.

## Source inspection and limitation

- Live-site browser inspection through Playwright remains blocked by certificate error:
  `ERR_CERT_COMMON_NAME_INVALID`.
- Source behavior was inspected with UTF-8 HTTP fetches:
  - `/?s=dispanserizaciya` returned a search page with one hit.
  - `/?s=zzzznonexistentquery12345` returned a search page with zero hits.

## Local verification

Local checks were run against `http://127.0.0.1:8766/pages/...` to avoid a conflicting older server on `8765`.

### Results state checks

- Title and h1 render correctly.
- Representative cards are present (3 cards remain unchanged).
- The dispensarization result still opens `dispensarization.html`.
- Overflow check at `390`, `768`, `1440`: page-level overflow `0`.

### Empty state checks

- `state=empty` shows only the empty block and hides result count/list.
- Empty message is visible and concise.
- Recovery links are local and functional (`index.html`, `contacts.html`, `departments-index.html`).
- Without `s`, the optional query line is hidden and the page remains usable.
- Submit from the empty-state form returns to normal results demo (`search-results.html?s=...`, no `state` param).
- Overflow check at `390`, `768`, `1440`: page-level overflow `0`.

### Query-display safety checks

Checked `?state=empty&s=...` with:

- Cyrillic text
- spaces
- quotes
- angle brackets
- ampersands
- long string

Observed behavior:

- Query is inserted through text rendering (no `innerHTML` injection).
- Angle brackets and ampersands are escaped in DOM HTML output.
- No markup execution or extra scripts were introduced.

### Search form checks

- Production search forms continue using `action="search-results.html"` and `name="s"`.
- No production form adds or preserves `state=empty`.

### Regression checks

- Header search opens/closes correctly; Escape closes.
- Desktop dropdown remains keyboard-usable (`Tab` reaches dropdown items).
- Mobile drawer opens/closes correctly; Escape closes.
- Sticky header class toggles on scroll.

### Local HTTP checks

- Preview local links checked: no local 404 among internal preview targets.
- Search preview entries:
  - `search-results.html` -> HTTP 200
  - `search-results.html?state=empty&s=пример%20запроса` -> HTTP 200

## Screenshot evidence

- `results-1440.png` - representative results state
- `empty-1440.png` - empty state desktop
- `empty-390.png` - empty state mobile
- `empty-escaped-1440.png` - escaped-query rendering proof
