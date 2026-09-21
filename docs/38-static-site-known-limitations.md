# Static Site — Known Limitations

Дата: 2026-09-21

Это текущие ограничения статического демо GGKP14. Не являются блокерами для архитектурного планирования WordPress при условии документированного baseline.

---

## Search and pagination

- Поиск не выполняет серверный запрос: форма ведёт на статическую `search-results.html` с фиксированным примером запроса «диспансеризация».
- Параметр `?s=` в URL не меняет содержимое результатов.
- Пагинация архива новостей визуальная; переключение страниц не реализовано.

## Content and routes

- Часть ссылок ведёт на live `https://ggkp14.by/...` (нет локального шаблона): большинство карточек подразделений, 7 из 10 карточек архива, быстрые ссылки главной без static-аналога.
- WordPress permalink-маршруты на GitHub Pages не существуют; используются файлы под `/ggkp14/pages/`.
- Контент репрезентативный, не полная миграция источника.

## Language and media

- Переключатель RU / BY / EN — placeholder (`href="#"`); реальная локализация не подключена.
- Видео-слоты в `news-single-video.html` — статические placeholder-блоки 16:9, без autoplay и без custom player JS.

## Development vs production

- `preview.html` только для локальной разработки; исключён из GitHub Pages artifact.
- Локальный preview: `http://localhost:8765/pages/...` (корень сервера — `src/`).
- Production homepage: `https://avngrss.github.io/ggkp14/` (корневой `index.html` с префиксом `pages/` для внутренних ссылок).

## Accessibility and compliance

- Проведён baseline accessibility audit (Stage 6A); полное соответствие WCAG не заявляется.

## Audit follow-ups (non-blocking)

- Языковые ссылки требуют WordPress multilingual plugin или ручной конфигурации.
- Внешние Google Fonts требуют сети при первой загрузке.
