# Stage 6G.1 evidence

Playwright could not open `ggkp14.by` (`ERR_CERT_COMMON_NAME_INVALID`). Each source was read with a compressed UTF-8 fetch that returned 200.

`/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` followed one redirect to `/informaciya/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/`. The two response bodies had the same SHA-256.

Images kept from the article, not the sidebar:

- `https://ggkp14.by/wp-content/uploads/2026/02/medical-tourism-2-1024x640-1.webp` (1024×640)
- `https://ggkp14.by/wp-content/uploads/2025/01/Dlya-sajta-Dispanserizaciya-2025.png` (source markup width 560; file is 1414 px wide)
- `https://ggkp14.by/wp-content/uploads/2025/04/2.png` (2000 px wide)

Local checks used `http://127.0.0.1:8765/pages/`. All six pages returned 200. Page overflow was 0 at 390×844, 768×1024, and 1440×1000. No main form was present. The Contacts dropdown still opened from the keyboard. The mobile drawer opened and closed on Escape.

Screenshots: desktop and mobile for each page.
