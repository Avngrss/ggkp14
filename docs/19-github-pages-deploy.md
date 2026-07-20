# GitHub Pages — деплой статического демо

## Как устроен деплой

Деплой выполняется через **GitHub Actions**, файл `.github/workflows/pages.yml`.

Исходники **не меняют структуру** и остаются в `src/`:

- локальная демо-страница: `src/pages/index.html`
- стили: `src/css/`
- скрипты: `src/js/`
- ресурсы: `src/assets/`

При каждом push в ветку `main` (или при ручном запуске workflow) CI:

1. Копирует `src/*` в временную папку `dist/`
2. Копирует `src/pages/index.html` в `dist/index.html`
3. Переписывает пути в `dist/index.html`:
   - `../css/` → `./css/`
   - `../js/` → `./js/`
   - `../assets/` → `./assets/`
4. Создаёт `dist/.nojekyll` (отключает Jekyll на GitHub Pages)
5. Публикует содержимое `dist/` на GitHub Pages

Папка **`dist/` не коммитится** — она только в CI и может создаваться локально для проверки.

## Локальная демо vs GitHub Pages

| | Локально | GitHub Pages |
|---|----------|--------------|
| Точка входа | `src/pages/index.html` | `dist/index.html` (генерируется в CI) |
| Пути к CSS/JS/assets | `../css/`, `../js/`, `../assets/` | `./css/`, `./js/`, `./assets/` |

Локально по-прежнему открывайте:

```
src/pages/index.html
```

## Как включить GitHub Pages

1. Загрузите репозиторий на GitHub (если ещё не загружен).
2. Откройте репозиторий на GitHub.
3. **Settings** → **Pages**.
4. В **Build and deployment** → **Source** выберите **GitHub Actions**.
5. Убедитесь, что workflow `Deploy GitHub Pages` успешно выполнился (вкладка **Actions**).

Если основная ветка называется `master`, переименуйте её в `main` или добавьте `main` и пушите туда — workflow настроен на ветку `main`.

## Ожидаемый URL

```
https://USERNAME.github.io/REPOSITORY_NAME/
```

Пример: репозиторий `Avngr/ggkp14` → `https://avngr.github.io/ggkp14/`

Корень сайта — сгенерированный `index.html` с подключёнными `./css/`, `./js/`, `./assets/`.

## Что проверить после деплоя

1. Главная открывается без 404.
2. Стили загружены (не «голый» HTML).
3. Шрифт Inter (Google Fonts) и favicon видны.
4. Изображения placeholders в hero, новостях, подразделениях отображаются.
5. Sticky header, burger-меню и поиск работают.
6. Нет ошибок 404 в Network (F12) для `./css/`, `./js/`, `./assets/`.

## Если CSS / JS / картинки не загружаются

1. Откройте **Actions** → последний run → шаг **Build dist** — убедитесь, что `sed` отработал.
2. В артефакте Pages проверьте, что в `index.html` пути `./css/`, а не `../css/`.
3. Убедитесь, что в корне деплоя есть `.nojekyll`.
4. Проверьте, что в **Settings → Pages** источник — **GitHub Actions**, не «Deploy from branch».
5. Локально симулируйте сборку (см. ниже) и откройте `dist/index.html` через простой HTTP-сервер.

## Локальная симуляция сборки (без npm)

Из корня проекта (PowerShell):

```powershell
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force dist | Out-Null
Copy-Item -Recurse src\* dist\
Copy-Item src\pages\index.html dist\index.html
(Get-Content dist\index.html -Raw) `
  -replace '\.\./css/','./css/' `
  -replace '\.\./js/','./js/' `
  -replace '\.\./assets/','./assets/' |
  Set-Content dist\index.html -NoNewline
New-Item dist\.nojekyll -ItemType File -Force | Out-Null
```

Проверьте наличие `dist/index.html`, `dist/css/`, `dist/js/`, `dist/assets/`.

Папку `dist/` **не коммитьте** — она в `.gitignore`.

## Что не нужно коммитить

- `dist/` — генерируется в CI
- `node_modules/`, `package-lock.json`
- `playwright-report/`, `test-results/`, `.playwright/`
- временные логи и OS-мусор

## Что нужно коммитить

- `src/` — исходное демо
- `docs/` — документация и audit-скриншоты
- `.github/workflows/pages.yml` — workflow деплоя
- `wordpress-theme/` — заготовка под WordPress (без PHP в этом этапе)
