# Локальное превью статических страниц

Дата: 2026-09-16

Этот документ описывает, как быстро открыть все готовые статические шаблоны на локальном компьютере **без изменения исходных файлов** и **без отдельной копии проекта**.

Локальное превью и GitHub Pages используют **одни и те же** файлы из `src/`.

---

## Быстрый старт

1. Откройте папку проекта `ggkp14`.
2. Дважды щёлкните по файлу **`preview-local.cmd`** в корне проекта.
3. Дождитесь открытия браузера со страницей навигатора.
4. Выберите нужный шаблон и нажмите «Открыть страницу».
5. Чтобы остановить сервер, вернитесь в окно терминала и нажмите **`Ctrl+C`**.

---

## Ручной запуск

Если удобнее запускать из PowerShell или терминала Cursor:

```powershell
cd c:\Users\Avngr\Desktop\ggkp14
powershell -ExecutionPolicy Bypass -File .\tools\preview-local.ps1
```

Или напрямую через Python (если `python` или `py` доступны в PATH):

```powershell
cd c:\Users\Avngr\Desktop\ggkp14
python -m http.server 8765 --directory src
```

После запуска откройте в браузере:

| Страница | URL |
|----------|-----|
| Навигатор превью | http://localhost:8765/pages/preview.html |
| Главная | http://localhost:8765/pages/index.html |
| Контентная | http://localhost:8765/pages/content-page.html |
| Контакты | http://localhost:8765/pages/contacts.html |
| Таблицы | http://localhost:8765/pages/table-page.html |

Другой порт (например 8766):

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\preview-local.ps1 -Port 8766
```

---

## Что делает скрипт

Файл **`tools/preview-local.ps1`**:

- определяет корень проекта относительно папки `tools/`;
- поднимает HTTP-сервер с корнем **`src/`**;
- по умолчанию использует порт **8765**;
- ищет Python через команды `python` или `py`;
- открывает навигатор `preview.html` в браузере по умолчанию;
- **не изменяет** HTML, CSS, JS и другие исходники.

Файл **`preview-local.cmd`** — двойной щелчок для Windows; вызывает PowerShell-скрипт с `-ExecutionPolicy Bypass` только для этого процесса.

---

## Страница навигатора `preview.html`

Файл: `src/pages/preview.html`

- простая dev-страница со списком готовых шаблонов;
- **не** использует header/footer сайта;
- **не** подключена к production-навигации;
- не публикуется на GitHub Pages (исключается при сборке деплоя).

---

## Пути и совместимость

Проверено для всех готовых страниц:

| Ресурс | Путь в `src/pages/*.html` | Локально (`src/` = корень сервера) | GitHub Pages (`dist/`) |
|--------|---------------------------|-------------------------------------|-------------------------|
| CSS | `../css/...` | `/css/...` | `/css/...` |
| JS | `../js/...` | `/js/...` | `/js/...` |
| Assets | `../assets/...` | `/assets/...` | `/assets/...` |
| Favicon | `../assets/icons/favicon.svg` | работает | работает |

Главная на GitHub Pages дополнительно копируется в корень `dist/index.html` с путями `./css/`, `./js/`, `./assets/` — это поведение workflow **не изменено**.

Ссылки между demo-страницами (`index.html`, `content-page.html`, `contacts.html`, `table-page.html`) работают и локально, и на Pages в каталоге `/pages/`.

**Изменения путей в HTML не потребовались** — текущая структура уже совместима с обоими режимами.

---

## GitHub Pages

Workflow `.github/workflows/pages.yml`:

- копирует `src/*` в `dist/`;
- публикует главную как `dist/index.html`;
- **удаляет** `dist/pages/preview.html` перед деплоем;
- оставляет все рабочие страницы, CSS, JS и assets без изменений.

Ожидаемые публичные URL после деплоя:

- `/` — главная
- `/pages/content-page.html`
- `/pages/contacts.html`
- `/pages/table-page.html`

`/pages/preview.html` на production **недоступен**.

---

## Если Python не найден

Скрипт выведет сообщение об ошибке и завершится.

1. Установите Python 3 с [python.org](https://www.python.org/downloads/).
2. При установке отметьте «Add Python to PATH».
3. Перезапустите терминал и снова запустите `preview-local.cmd`.

Скрипт **не устанавливает** Python, npm и другие зависимости автоматически.

---

## Ссылки между статическими страницами

Шаблоны в `src/pages/` используют **относительные sibling-ссылки** (`contacts.html`, `table-page.html`, …), а не WordPress-пути от корня домена (`/contacts/`, `/o-nas/...`).

На GitHub Pages корневая главная (`dist/index.html`) получает префикс `pages/` при сборке workflow — переключать пути вручную перед push не нужно.

Будущая WordPress-конверсия восстановит permalink-маршруты в `href`; исходные пути сохранены в `data-source-path`, `data-dept-path`, `data-article-path`.

---

## Что не нужно делать

- не переписывать пути в HTML вручную перед локальной проверкой;
- не создавать отдельную папку-копию для тестов;
- не готовить отдельный `dist/` в репозитории (он в `.gitignore`);
- не устанавливать npm или Playwright для просмотра страниц.

---

## Связанные файлы

| Файл | Назначение |
|------|------------|
| `preview-local.cmd` | Запуск двойным щелчком (Windows) |
| `tools/preview-local.ps1` | PowerShell-сервер превью |
| `src/pages/preview.html` | Dev-навигатор по шаблонам |
| `.github/workflows/pages.yml` | Деплой без `preview.html` |
