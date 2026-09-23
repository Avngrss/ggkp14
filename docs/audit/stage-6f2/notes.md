# Stage 6F.2 evidence

Source pages were read with a compressed UTF-8 fetch. Playwright could not open `ggkp14.by` because of `ERR_CERT_COMMON_NAME_INVALID`.

Local checks used `http://127.0.0.1:8765/pages/`. Page-level overflow was 0 at 390×844, 768×1024, and 1440×1000. The districts table scrolled inside its wrapper at 390, and the scroll hint was visible only then. At 768 the leftover overflow was 1px, below the hint threshold, so the hint stayed hidden. At 1440 there was no table overflow. The email table fit without a hint at those widths. Preview links returned 200. Tab from «Контакты» reached «Адреса e-mail» while the dropdown stayed open.

Screenshots: desktop and mobile for each page, plus the Contacts dropdown on the email page.
