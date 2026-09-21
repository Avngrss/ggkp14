# Инструкция по просмотру демо

## Как открыть демо

### Рекомендуемый способ (локальный сервер)

1. Дважды щёлкните **`preview-local.cmd`** в корне проекта
2. Откроется навигатор: http://localhost:8765/pages/preview.html
3. Выберите нужный шаблон
4. Остановка сервера: **`Ctrl+C`** в окне терминала

Подробности: **`docs/27-local-static-preview.md`**

### Альтернатива (без сервера)

1. Откройте проводник Windows
2. Перейдите в `c:\Users\Avngr\Desktop\ggkp14\src\pages\`
3. Дважды щёлкните **`index.html`**

> При открытии файла напрямую (`file://`) стили обычно загружаются, но локальный сервер надёжнее для проверки путей и ссылок между страницами.

Актуальный состав навигатора, включая страницы этапов 6C и 6D, описан в `docs/27-local-static-preview.md`.

**Внутренние страницы:**

- Stage 5A: `src/pages/content-page.html`
- Stage 5B: `src/pages/contacts.html`
- Stage 5C: `src/pages/table-page.html`
- Stage 5E: `src/pages/departments-index.html`
- Stage 5F: `src/pages/department.html`
- Stage 5F.1: `src/pages/department-aop.html`
- Stage 5G: `src/pages/news-archive.html`
- Stage 5H: `src/pages/news-single.html`
- Stage 5H.1: `src/pages/news-single-video.html`, `src/pages/news-single-no-media.html`
- Stage 5I: `src/pages/search-results.html`

---

## Stage 6A — full static-site regression audit

Перед планированием WordPress проверьте полный статический baseline:

1. Откройте `preview.html` и пройдите все 12 production-шаблонов.
2. На GitHub Pages: [https://avngrss.github.io/ggkp14/](https://avngrss.github.io/ggkp14/) — «Прямые линии», контакты, подразделения, архив новостей, три локальные новости, отправка поиска.
3. Убедитесь, что нет переходов на `avngrss.github.io/o-nas/...` без `/ggkp14/`.
4. Поиск ведёт на `search-results.html` (демо, без серверного запроса).
5. Таблицы прокручиваются только внутри wrapper; карта контактов с `title` у iframe.

Подробности: `docs/37-stage-6a-static-site-regression-audit.md`, ограничения: `docs/38-static-site-known-limitations.md`.

---

## Stage 6A.1 — Cyrillic encoding repair

После коммита `681e324` на части шаблонов (подразделения и новости) русский текст в **исходниках** был записан в неверной кодировке. В рабочей копии текст восстановлен из Git `382c3aa` с повторным применением локальных ссылок (UTF-8).

Проверка:

1. Локально: `preview-local.cmd` → архив новостей, индекс подразделений, три варианта новости — кириллица в заголовках, хлебных крошках и карточках.
2. Убедитесь, что в исходниках нет символов `` `r`n `` в атрибутах поиска (исправлено в 6A).
3. После push на GitHub Pages обновите кэш браузера и повторите те же URL на [https://avngrss.github.io/ggkp14/](https://avngrss.github.io/ggkp14/).

Подробности: `docs/40-stage-6a1-encoding-fix.md`, скриншоты: `docs/audit/stage-6a1/`.

---

## Stage 5I — search results template

После обновления Stage 5I проверьте:

### Заголовок и запрос

1. Откройте `search-results.html`
2. Один H1: «Результаты поиска для: «диспансеризация»»
3. Поддерживающий текст «Найдено: 3» — только если подтверждено источником
4. Длинный запрос переносится, без обрезки и без hero-блока

### Список результатов

1. Три реальных результата с live-URL источника (страница, новость, главная)
2. Без выдуманных excerpt, дат и изображений для этого запроса
3. Тип контента: «Страница» / «Новость» — только где улучшает ясность
4. Без «Подробнее», если источник не показывает read-more для этих результатов
5. Текстовый компактный список, без пустых image-wrapper

### Пагинация и no-results

1. Пагинация не отображается — у запроса «диспансеризация» 3 результата без пагинации на источнике
2. No-results паттерн документирован в `docs/35-stage-5i`, на видимой странице не показан

### Поиск в шапке

1. Desktop search panel открывается
2. Mobile drawer search доступен
3. Поле использует `name="s"` (WordPress-ready)
4. Форма не выполняет client-side search — только визуальный прототип

### Мобильная вёрстка

1. H1 и quoted query переносятся на 360px
2. Карточки результатов читаемы
3. Нет горизонтального overflow страницы

### Regressions

- Homepage, news archive, news single variants без изменений
- Contacts, table, departments index без CSS leak
- JavaScript файлы без search-логики

Скриншоты: `docs/audit/stage-5i/`

Подробности: `docs/35-stage-5i-search-results-implementation.md`

---

## Stage 5H.1 — news media variants validation

Сравните три контентных варианта одного шаблона новости:

### `news-single.html` (featured image + text)

1. Featured image slot присутствует
2. Текстовое тело с `.prose`

### `news-single-video.html` (встроенное видео)

1. Нет featured image — видео внутри `the_content()`
2. Два слота WordPress video block (16:9), без autoplay и без custom JS
3. Карточка №2 в архиве ведёт локально

### `news-single-no-media.html` (без featured image)

1. Нет пустого media wrapper — заголовок переходит сразу в текст
2. Только текст и метаданные
3. Карточка «Профилактика ВИЧ-инфекции» в архиве ведёт локально

### Regressions

- `news-single.html` базовый вариант без изменений layout
- Archive grid, pagination, остальные 7 карточек — live URLs
- Homepage, contacts, table, departments без CSS leak

Скриншоты: `docs/audit/stage-5h1/`

Подробности: `docs/34-stage-5h1-news-media-variants-validation.md`

---

## Stage 5H — news single template

После обновления Stage 5H проверьте:

### Страница новости

1. Откройте `news-single.html`
2. H1 «Игра детей с огнём: дюжина пожаров в Гомельской области» — один на странице
3. Breadcrumb: «Главная » Новости » [заголовок]»
4. Метаданные: дата `10.09.2026`, категория «Новости»
5. Featured image slot с локальным placeholder, без hotlink
6. Вступительный абзац из источника; основной текст — демонстрационная копия с пометкой
7. Ссылка «Все новости» ведёт на `news-archive.html`

### Типографика и навигация

1. `.prose` для тела статьи — читаемая ширина, H2, списки, blockquote
2. Заголовки и длинные URL переносятся на mobile
3. Новый article-specific JavaScript не добавлен

### Связь с архивом

1. В `news-archive.html` только первая карточка ведёт на `news-single.html`
2. Остальные 9 карточек по-прежнему ссылаются на live `ggkp14.by`

### Regressions

- Homepage news без изменений
- Archive layout и pagination без изменений
- Contacts map, table, departments без single-news CSS leak

Скриншоты: `docs/audit/stage-5h/`

Подробности: `docs/33-stage-5h-news-single-implementation.md`

---

## Stage 5G — news archive template

После обновления Stage 5G проверьте:

### Содержимое архива

1. Откройте `news-archive.html`
2. **10** карточек новостей — как на первой странице источника
3. H1 «Рубрика: Новости»; breadcrumb «Главная » Новости»
4. Даты, категории и заголовки совпадают с https://ggkp14.by/category/novosti/
5. Excerpt только там, где он есть на источнике (2 карточки без excerpt)
6. Ссылки «Подробнее» ведут на live `ggkp14.by`

### Изображения и плотность

1. Локальный placeholder `news-thumb-placeholder.svg` — без hotlink
2. Соотношение media 16:10, `object-fit: cover`
3. Карточки компактные, без фиксированной высоты
4. Сетка 2 колонки desktop / 1 колонка mobile

### Пагинация

1. `<nav aria-label="Навигация по страницам новостей">`
2. Текущая страница `1` с `aria-current="page"`
3. Ссылки 2, …, 21, «Следующая» (demo `#`)
4. Пагинация переносится на mobile

### Regressions

- Homepage news section без изменений
- Contacts map, table columns, departments index (18 cards) без изменений
- Department pages без archive CSS leak

Скриншоты: `docs/audit/stage-5g/`

Подробности: `docs/32-stage-5g-news-archive-implementation.md`

---

## Stage 5F.1 — compare department content variants

Сравните два контентных варианта одного шаблона:

### `department.html` (женская консультация)

1. Контактная панель: один телефон записи + онлайн-запись
2. Секции: структура, оборудование, расходные материалы, услуги
3. Нет адреса подразделения

### `department-aop.html` (Урицкая АОП)

1. Контактная панель: адрес, два телефона (регистратура и заведующая), режим работы
2. Секции: штат (роли), дополнительные услуги, ФАП, кабинеты, школы здоровья, зоны обслуживания
3. Нет онлайн-записи (нет на источнике)

### Общее для обоих

1. Одинаковый shell, breadcrumb, back link, `.department-detail` CSS
2. Один H1, return link на `departments-index.html`
3. На индексе локально: «Женская консультация» → `department.html`, «Урицкая АОП» → `department-aop.html`

Подробности: `docs/31-stage-5f1-department-variant-validation.md`

---

## Stage 5F — department detail template

После обновления Stage 5F проверьте:

### Открытие и содержимое

1. Откройте `department.html` (или «Женская консультация» с индекса подразделений)
2. Breadcrumb: «Главная » О нас » Структурные подразделения » Женская консультация»
3. Один **H1** «Женская консультация»
4. Ссылка «Все структурные подразделения» ведёт на `departments-index.html`
5. Текст, телефон, часы, структура, оборудование и услуги совпадают с https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/

### Контакты и запись

1. Телефон записи: `+375 (232) 31-09-37` — кликабельный `tel:` link
2. Ссылка «онлайн-записи» ведёт на tutmed.by (как на content-page)
3. Время приёма отображено полностью (пн–пт 08:00–14:00 и 14:00–20:00; сб 08:00–14:00)
4. Нет выдуманного адреса или карты

### Индекс подразделений

1. На `departments-index.html` карточка «Женская консультация» ведёт на `department.html`
2. Остальные 17 карточек по-прежнему ведут на live `ggkp14.by`
3. Все 18 подразделений на месте

### Responsive и accessibility

1. Breadcrumb и H1 переносятся на 390 / 360
2. Списки структуры и оборудования читаемы на mobile
3. Sticky header и search panel работают
4. Нет horizontal overflow страницы

### Regressions

- `index.html` 1440 / 390 — без изменений
- `content-page.html` 1440 — prose без department-detail стилей
- `contacts.html` 1440 — карта и группы телефонов без изменений
- `table-page.html` 1440 / 390 — колонки и scroll wrapper без изменений
- `departments-index.html` 390 — сетка без изменений

Скриншоты: `docs/audit/stage-5f/`

Подробности: `docs/30-stage-5f-department-detail-implementation.md`

---

## Stage 5E — departments index template

После обновления Stage 5E проверьте:

### Открытие и содержимое

1. Откройте `departments-index.html` (или «Структурные подразделения» в topbar / drawer)
2. На странице **18** карточек-ссылок — столько же, сколько на https://ggkp14.by/o-nas/strukturnye-podrazdeleniya/
3. Названия подразделений совпадают с источником (например: «Женская консультация», «Урицкая АОП», «Ново-Мильчанский ФАП»)
4. Порядок карточек совпадает с источником
5. Ссылки ведут на реальные URL `ggkp14.by` (страницы подразделений на live-сайте)

### Breadcrumb и заголовок

1. «Главная » О нас » Структурные подразделения»
2. Один **H1** «Структурные подразделения»
3. Breadcrumb переносится на узких экранах

### Сетка и плотность карточек

1. Desktop (1440 / 1280): 4 колонки, ровные ряды
2. Tablet (1024): 3 колонки; (768): 2 колонки
3. Mobile (390 / 360): 1 колонка, карточки на всю ширину
4. Карточки компактные (имя + иконка), без пустых image-placeholder
5. Длинные названия не обрезаются (`Отделения медицинской реабилитации`, «Клинико-диагностическая лаборатория»)

### Hover, focus и интерактивность

1. Hover: рамка и цвет названия меняются
2. `:focus-visible` — видимый outline при Tab
3. Вся карточка кликабельна; нет вложенных ссылок
4. Sticky header при прокрутке
5. Поиск в header открывается и закрывается

### Regressions

- `index.html` 1440 — секция «Структурные подразделения» на главной **без изменений**
- `index.html` 390 — homepage department cards без изменений
- `content-page.html` 1440 — prose без dept-index стилей
- `contacts.html` 1440 — карта ~46%, subpages под grid
- `table-page.html` 1440 / 390 — колонки, даты, scroll wrapper без изменений

Скриншоты: `docs/audit/stage-5e/`

Подробности: `docs/29-stage-5e-departments-index-implementation.md`

---

## Stage 5D — table alignment and contacts map fix

После обновления Stage 5D проверьте:

### Table page — columns, dates, times

1. Откройте `table-page.html` at 1440px
2. Колонки **Дата**, **Номер телефона**, **Время** — значения в одну строку, без разрыва после каждой цифры
3. **Ф.И.О.** и **Должность** — переносятся естественно
4. Заголовки колонок выровнены с телом таблицы
5. `rowspan` (Галушкина, 09.09 / 23.09) отображается корректно

### Table page — mobile scroll

1. At **390px** / **360px** — страница **без** horizontal overflow
2. Таблица прокручивается внутри `.table-scroll`
3. Подсказка «Прокрутите таблицу вправо…» видна при overflow

### Contacts — map composition

1. At **1440px** — карта ~46% ширины, заметно крупнее прежних 400px
2. Iframe заполняет `.contacts-map__embed` (aspect-ratio 4:3)
3. «Дополнительные разделы контактов» — **под** двумя колонками, на всю ширину
4. Нет большой пустой области справа от subpages
5. Адрес над картой сохранён; iframe `title` на месте

### Contacts — mobile stacking

1. At **768px** / **390px** — одна колонка, карта на полную ширину
2. Нет horizontal overflow

### Regressions

- `index.html` 1440 — без изменений
- `content-page.html` 1440 — prose без table/contact стилей

Скриншоты: `docs/audit/stage-5d/`

Подробности: `docs/28-stage-5d-table-contacts-visual-fixes.md`

---

## Stage 5C — table page template

После обновления Stage 5C проверьте:

### Открытие

1. Откройте `src/pages/table-page.html` (или «Прямые линии» в header)
2. `internal-pages.css` подключён; `homepage.css` **не** подключён

### Breadcrumb и заголовок

1. «Главная » О нас » График прямых телефонных линий»
2. Один **H1** «График прямых телефонных линий»
3. Три секции H2 с реальными графиками (ГГКП №14, центральная ГКП, главное управление)

### Table headings и captions

1. Заголовки колонок в `<thead>` с `<th scope="col">`
2. У каждой таблицы есть visually-hidden `<caption>`
3. Данные совпадают с https://ggkp14.by/o-nas/grafik-pryamyh-telefonnyh-linij/

### Telephone links

1. Номера в колонке «Номер телефона» — кликабельные `tel:` links
2. Видимый текст сохраняет формат source

### Desktop (1440 / 1280)

1. Таблицы читаемы на полную ширину контента
2. Заголовок строки выделен (accent-soft фон, primary border)
3. **Нет** horizontal overflow всей страницы
4. Sticky header при прокрутке

### Mobile horizontal scrolling (390 / 360)

1. **Страница** не имеет horizontal overflow (`scrollWidth` ≤ `clientWidth`)
2. **Таблица** прокручивается внутри `.table-scroll` wrapper
3. Подсказка «Прокрутите таблицу вправо…» видна только когда таблица шире wrapper
4. Wrapper focusable (`Tab` → focus ring)
5. Нет card-layout вместо таблицы; колонки не скрыты

### Header / drawer / search

1. «Прямые линии» active в nav
2. Search panel, burger drawer, lang switcher работают

### Homepage regression

`index.html` at 1440 — hero, news, services без изменений

### Content-page regression

`content-page.html` at 1440 — prose layout без table-стилей

### Contacts regression

`contacts.html` at 1440 и 390 — phone groups, map, layout без изменений

### GitHub Pages preview path

`/pages/table-page.html`

### Скриншоты

См. `docs/audit/stage-5c/`

Подробности: `docs/26-stage-5c-table-page-implementation.md`

---

## Stage 5B — contacts page template

После обновления Stage 5B проверьте:

### Открытие

1. Откройте `src/pages/contacts.html` (или перейдите по «Контакты» в header / footer)
2. Убедитесь, что стили загрузились (`internal-pages.css` подключён, **не** `homepage.css`)

### Breadcrumb

1. «Главная » Контакты» — ссылка на `index.html`
2. Текущая страница без ссылки, `aria-current="page"`
3. На **390px** / **360px** — перенос без horizontal overflow

### Internal page header

1. Один **H1** «Контакты»
2. Компактный заголовок — **не** hero landing block
3. Длинный заголовок не обрезается

### Contact data accuracy

Сверьте с https://ggkp14.by/contacts/ :

1. «Горячая» линия: +375 (232) 33-26-51 (10:00–18:00)
2. Приёмная: +375 (232) 32-90-65
3. Регистратура: 32-91-36 (8:00–20:00), 29-58-62, 31-56-25
4. Мобильный: +375 (44) 541-74-37 (A1)
5. Женская консультация: +375 (44) 766-55-47 (A1), 31-09-37 (8:00–20:00)
6. Адрес: г. Гомель, ул. Косарева, 11; 246012

### Telephone links

1. Каждый номер в основном блоке — кликабельный `tel:` link
2. Видимый текст совпадает с отформатированным номером
3. Примечания о режиме работы — обычный текст, не ссылка

### Email links

1. На **основной** странице контактов email-блока **нет** (как на source)
2. Email только в approved shell: topbar и footer (`mailto:ggkp14@ggkp14.by`)
3. Ссылка «Адреса электронной почты» ведёт на будущую WP-страницу

### Address

1. Полное название учреждения в блоке «Адрес»
2. Адрес copyable как текст (`<address>`)
3. Дублируется над картой

### Working hours

1. Часы указаны **только** как примечания к телефонам (не отдельный блок)
2. Нет дублирования часов из footer или homepage

### Contact grouping

1. Группы телефонов с понятными H3-заголовками
2. Блок «Дополнительные разделы контактов» — ссылки на subpages
3. Карта справа на desktop, под контентом на tablet/mobile
4. Нет contact form, fake staff cards, excessive card grid

### Mobile stacking

1. **768px** / **390px** / **360px** — одна колонка
2. Телефоны и email-подобные ссылки переносятся без overflow
3. Карта не выходит за край viewport
4. Нет internal scrolling panels

### Header / drawer / search

1. Sticky header при прокрутке
2. Search icon → панель поиска (Escape закрывает)
3. Burger → mobile drawer
4. Lang switcher RU/BY/EN на месте
5. Пункт «Контакты» активен в nav

### Homepage regression

Откройте `index.html` и убедитесь:

1. Hero и секции **не изменились**
2. Header/search/drawer работают как раньше
3. Нет нового overflow

### Content-page regression

Откройте `content-page.html` и убедитесь:

1. Breadcrumb и prose layout **не изменились**
2. Contact-стили не применяются к generic template
3. Нет horizontal overflow на 390px

### GitHub Pages preview path

После деплоя: `/pages/contacts.html` (workflow копирует `src/` в `dist/` без изменений)

### Скриншоты

См. `docs/audit/stage-5b/`

Подробности: `docs/25-stage-5b-contacts-implementation.md`

---

## Stage 5A — content page template

После обновления Stage 5A проверьте:

### Открытие

1. Откройте `src/pages/content-page.html` (или перейдите с главной по ссылке «Запись к врачу» в footer)
2. Убедитесь, что стили загрузились (`internal-pages.css` подключён)

### Breadcrumb

1. «Главная » Запись к врачу» — ссылка на `index.html`
2. Текущая страница без ссылки, `aria-current="page"`
3. На **390px** / **360px** — перенос без horizontal overflow

### Internal page header

1. Один **H1** «Запись к врачу»
2. Компактный заголовок — **не** hero landing block
3. Длинный заголовок не обрезается

### Prose content

1. Читаемая ширина текста (не на всю ширину viewport)
2. Списки, ссылки, `tel:`, `mailto:` работают визуально
3. Блок-notice внизу («обратитесь в регистратуру»)
4. Нет homepage-секций (hero, news, departments)

### Header / drawer / search

1. Sticky header при прокрутке
2. Search icon → панель поиска (Escape закрывает)
3. Burger → mobile drawer
4. Lang switcher RU/BY/EN на месте

### Homepage regression

Откройте `index.html` и убедитесь:

1. Hero и секции **не изменились**
2. Header/search/drawer работают как раньше
3. Нет нового overflow

### Скриншоты

См. `docs/audit/stage-5a/`

Подробности: `docs/24-stage-5a-content-page-implementation.md`

---

## Stage 3I — designer feedback fixes

После обновления Stage 3I проверьте:

### Header full width

1. На **1440px** и **1280px** фон topbar и main header тянется **на всю ширину окна**
2. Sticky header после прокрутки — тень/граница на full width, контент внутри выровнен по container
3. Панель поиска под header — full width, без обрезки по краям
4. Нет horizontal overflow

### Hero

1. **Одна** primary кнопка «Запись к врачу» в блоке actions (не дубль под «Время работы»)
2. Info cards: только «Горячая линия» и «Время работы»
3. Hero компактнее — меньше лишних отступов, H1 не обрезан

### Primary color

1. Основной цвет — **медицинский синий** (`#1A6EA8`), не teal-green
2. Topbar, кнопки, focus ring, nav active — согласованы с новой палитрой

### Section paddings

1. Крупные секции (news, services, departments, resources) — одинаковый вертикальный ритм
2. Compact секции — меньший, но тоже единый padding
3. Mobile/tablet — предсказуемое уменьшение отступов

### Language switcher

1. Desktop (1440+): **RU / BY / EN** в topbar справа
2. Mobile drawer: тот же switcher
3. Активный RU с `aria-current="true"`, ссылки с `hreflang`

### Adaptive search

1. Ниже 1440px: в форме поиска **иконка лупы**, не accent-кнопка «Найти»
2. Icon button с `aria-label="Выполнить поиск"`, neutral styling
3. В header search panel **нет** дублирующего CTA «Запись к врачу» под полем
4. Desktop 1440+: может оставаться текст «Найти»

### Accessibility basics

1. Skip link «Перейти к содержимому» → `#main`
2. `<html lang="ru">`, один `<h1>`
3. Search/menu toggles: `aria-expanded`, `aria-controls`
4. Escape закрывает search и drawer
5. Видимый `:focus-visible` на интерактивных элементах

### Тест ширин

| Ширина | Что проверить |
|--------|----------------|
| **1440** | Full-width header, desktop nav, lang switcher, blue primary |
| **1280** | Full-width header, burger, icon search |
| **1024** | Tablet landscape, paddings |
| **768** | Hero stack, drawer, section rhythm |
| **390** | Mobile search icon, no overflow |
| **360** | Narrow mobile, compact blocks |

### Sticky header

- Прокрутите вниз — header sticky, `.is-scrolled` shadow full width
- Контент не прыгает

### Скриншоты аудита

См. `docs/audit/`:

- `demo-stage3i-header-1440.png`
- `demo-stage3i-hero-1440.png`
- `demo-stage3i-news-services-1440.png`
- `demo-stage3i-desktop-1280.png`
- `demo-stage3i-tablet-768.png`
- `demo-stage3i-mobile-390.png`
- `demo-stage3i-mobile-search-open.png`
- `demo-stage3i-sticky-scrolled.png`

Подробности: `docs/20-stage-3i-designer-feedback-fixes.md`

---

## Stage 3H — sticky header & responsive QA

После обновления Stage 3H проверьте:

### Sticky header при прокрутке

1. Откройте `src/pages/index.html` на ширине **1440px**
2. Прокрутите вниз — **topbar уходит**, main header **остаётся сверху**
3. После ~8px прокрутки появляется тень (`.is-scrolled`)
4. Контент **не прыгает** при прокрутке (нет сжатия header)
5. Hero H1 не обрезается sticky header

### Тест ширин

| Ширина | Что проверить |
|--------|----------------|
| **1440** | Desktop nav, search + CTA, sticky, topbar |
| **1280** | Burger, search icon, без desktop nav |
| **1024** | Tablet landscape, 2-col departments/resources |
| **768** | Burger, hero stack, 2-col grids |
| **390** | Mobile header, drawer, touch targets |
| **360** | Narrow mobile, compact news, no overflow |

DevTools: `Ctrl+Shift+M` → задайте ширину → обновите страницу.

### Desktop не сломан

Сравните с Stage 3G:

- Header 1440: brand \| nav \| actions — без overlap
- 1 featured + 4 compact news
- 3 service cards, без search card
- 8 official resources
- Нет internal scroll в секциях

### Burger и search

- Burger открывает drawer **поверх** sticky header (z-index 300)
- Search icon в actions — панель под header
- Escape закрывает search; фокус возвращается на кнопку
- Search при прокрутке **не сбрасывает** позицию страницы

### Скриншоты перед деплоем

См. `docs/audit/`:

- `demo-stage3h-desktop-1440-top.png`
- `demo-stage3h-desktop-1440-scrolled-sticky.png`
- `demo-stage3h-desktop-1280.png`
- `demo-stage3h-tablet-1024.png`
- `demo-stage3h-tablet-768.png`
- `demo-stage3h-mobile-390.png`
- `demo-stage3h-mobile-360.png`
- `demo-stage3h-search-open.png`
- `demo-stage3h-mobile-menu-open.png`

---

## Stage 3G — что проверить после investigated fix

После обновления Stage 3G проверьте:

### Header 1440
- Три зоны: бренд слева | nav по центру | search + CTA справа
- Название учреждения не наезжает на nav
- Topbar виден, одна строка

### Header 1280
- Burger вместо desktop nav (nav скрыт до 1440px)
- Search icon доступен в actions
- CTA скрыт (есть в drawer)

### Search placement
- Иконка только в `.site-header__actions`, не между пунктами nav
- Панель открывается **под header** (полоска на всю ширину)
- Видимый label «Поиск по сайту», input, кнопка «Найти»
- Escape закрывает; фокус возвращается на кнопку поиска

### Hero crop
- H1 полностью виден при загрузке на 1440px
- Контент не скрыт под sticky header

### News readability
- 1 featured + 4 compact (без изменений структуры)
- Featured: умеренная высота изображения, не skeleton-блок
- Compact: читаемые заголовки (~18px), thumbnails 132×96
- «Все новости» в header секции

### Services / resources readability
- Ровно 3 карточки сервисов (без search card)
- Telegram + QR в одной карточке
- До 8 официальных ресурсов + ссылка «Все официальные ресурсы»

### Скриншоты аудита

См. `docs/audit/demo-stage3g-*.png`

---

## Stage 3F — что проверить после scale/header fix

После обновления Stage 3F обратите внимание на:

### Header 1440 / 1280
- Трёхколоночная сетка: логотип | навигация | действия
- Навигация 16px, без кнопки поиска между пунктами
- Поиск — иконка 44×44 в actions справа
- CTA «Запись к врачу» 164×48px
- Ниже 1280px — burger, без desktop nav

### Topbar
- Высота ~36px, шрифт 14px, без переноса
- Скрыт ниже 1200px

### Поиск
- Dropdown ~420px под actions
- Escape закрывает, фокус в input

### Hero
- Меньше пустого пространства
- H1 не обрезан, visual slot 260px

### Новости
- Заголовок секции ~36px
- Featured title 22px, compact title 17px
- Thumbnails 124×88, не мелкий текст

### Сервисы и информация
- 3 карточки, padding 28px, title 20px, body 16px
- QR ~96px в combined card

### Официальные ресурсы
- Не более 8 карточек + ссылка «Все официальные ресурсы»
- 4 колонки desktop, читаемый текст 15px

### Sticky header
- Тень при прокрутке, поиск работает в sticky state

---

## Stage 3E — что проверить после controlled layout fix

После обновления Stage 3E обратите внимание на:

### Поиск в header
- Кнопка **«Поиск»** (иконка на mobile) рядом с «Запись к врачу»
- Панель под header: label «Поиск по сайту», placeholder «Введите запрос», кнопка «Найти»
- Escape и клик вне панели закрывают поиск
- Карточки поиска в нижней секции **нет**

### Новости
- Заголовок: «Все новости» справа в header секции, не внизу
- Ровно **1 featured** + **4 compact** новости
- Desktop: 45% / 55% колонки
- Нет sidebar, нет внутренней прокрутки

### Сервисы и информация
- Ровно **3 карточки**: время работы, полезные ссылки, Telegram и QR-код
- Нет карточки поиска

### Официальные ресурсы
- Компактная сетка партнёрских ссылок (не дублирует карточку «Полезные ссылки»)

### Sticky header и mobile
- Header sticky при прокрутке
- Mobile menu и drawer search работают
- Нет horizontal overflow на 390px

---

## Stage 3C — что проверить после переработки новостей

После обновления Stage 3C обратите внимание на:

### Новости — новая структура

- Длинная сетка из 6 больших карточек **убрана**
- Слева одна **featured**-карточка с крупным изображением и текстом
- Справа **4 компактных** новости с маленькими thumbnails (96×72)
- Внизу кнопка **«Все новости»**
- Секция короче и плотнее, без пустых колонок

### Боковой sidebar у новостей

- Вертикальный sidebar **рядом с новостями удалён**
- Нет внутренней прокрутки внутри sidebar/блока новостей — только прокрутка страницы

### Полезная информация

- Бывшие sidebar-виджеты стали **карточками в сетке**: время работы, ссылки, Telegram, QR, поиск
- На desktop — до 5 карточек в ряд (широкий экран)
- На tablet — 2 колонки; на mobile — 1 колонка
- QR-код компактный (88px)

### Общая плотность

- Нижняя часть страницы не выглядит «недостроенной»
- Меньше повторяющихся крупных placeholder-изображений

### Sticky header

- Header по-прежнему sticky при прокрутке
- Mobile menu работает

---

## Stage 3B — что проверить после улучшения плотности и image slots

После обновления Stage 3B обратите внимание на:

### Sticky header

- Прокрутите страницу вниз — header остаётся видимым
- После ~120px прокрутки header становится компактнее (`.is-compact`)
- При прокрутке появляется более заметная тень (`.is-scrolled`)
- Topbar уходит при прокрутке, sticky остаётся только main header
- На mobile burger menu и drawer работают как раньше

### Плотность layout

- Большая пустая область в секции новостей **исчезла**
- Новости и sidebar в **одной секции** (две колонки на desktop)
- Нет дублирующей «расширенной ленты» новостей внизу
- Секции не выглядят «недостроенными» — контент заполняет колонки

### Image slots (WordPress placeholders)

- **Hero** — справа виден блок с SVG-изображением клиники (не пустая область)
- **Новости** — у каждой карточки есть thumbnail-placeholder
- **Подразделения** — у карточек есть image area
- **Promo banner** — слева изображение, справа текст
- **Полезные ссылки** — маленькие logo-placeholders над текстом
- **Sidebar QR** — SVG QR-placeholder вместо пустого «QR» блока

### Sidebar spacing

- Виджеты компактнее, без лишних вертикальных дыр
- Sidebar выравнивается с сеткой новостей по высоте

### Mobile layout

- Hero image slot переносится под текст
- Sidebar стекируется под новостями
- Нет horizontal overflow

---

## Stage 3A — что проверить после коррекции дизайна

После обновления Stage 3A обратите внимание на:

### Header и навигация

- **Topbar (desktop 1440px)** — все ссылки в одну строку, без переноса; слева служебные ссылки, справа email и «Версия для слабовидящих»
- **Header alignment** — логотип слева, меню по центру, кнопка «Запись к врачу» справа на одной линии
- **Nav items** — равномерные отступы, активный пункт с нижней полоской
- **Dropdown** — наведите на «Информация» и «Контакты» — выпадающее меню-карточка
- **Tablet/mobile** — topbar скрыт, burger menu с группировкой ссылок

### Hero

- **Background** — видны teal/blue градиент и медицинский pattern (не плоский белый фон)
- **Content panel** — текст читаем на полупрозрачной панели
- **Info cards** — справа 3 карточки: горячая линия, время работы, запись к врачу
- **CTA buttons** — «Запись к врачу» и «Электронные обращения» заметны

### Общее

- Сайт ощущается как **государственное медучреждение**, не startup landing
- Есть **глубина** (тени, градиенты), но без перегруза
- Направление ближе к **оригинальному сайту** по визуальности, но современнее

---

## Что проверить визуально

### Общее впечатление

- Современный, чистый медицинский стиль
- Teal/blue цветовая палитра
- Читаемая типографика
- Достаточно «воздуха» между секциями

### Секции (сверху вниз)

1. **Topbar** — тёмная полоска со ссылками (видна только на desktop)
2. **Header** — логотип, меню, кнопка «Запись к врачу»
3. **Hero** — фоновый gradient/pattern + 3 info-карточки справа
4. **Быстрые услуги** — 8 карточек с иконками
5. **Контакты** — телефоны регистратуры, консультаций, адрес
6. **Info cards** — горячая линия, вакансии, время работы
7. **Promo banner** — информация о диспансеризации
8. **Подразделения** — 18 карточек
9. **Новости** — 6 карточек с датами
10. **Полезные ссылки** — grid партнёрских ссылок
11. **Sidebar** — поиск, время работы, ссылки, Telegram, QR
12. **Footer** — контакты, навигация, копирайт

### Интерактивность

- Нажмите **гамбургер-меню** (на tablet/mobile) — должно открыться боковое меню
- Нажмите **×** или **Escape** — меню закрывается
- Нажмите **«Версия для слабовидящих»** в topbar — включается контрастный режим
- Прокрутите страницу — header получает тень
- Попробуйте **поиск** в sidebar — появится demo-alert

---

## Проверка на разных экранах (DevTools)

### Как открыть DevTools

- **Chrome/Edge:** `F12` или `Ctrl+Shift+I`
- Перейдите на вкладку **Device Toolbar** (иконка телефона/планшета) или `Ctrl+Shift+M`

### Desktop — 1440×1000

1. Установите ширину **1440px**
2. Проверьте:
   - Topbar в одну строку без переноса
   - Header: logo | nav | CTA выровнены; sticky при прокрутке
   - Dropdown на «Информация» и «Контакты»
   - Hero: текст слева, image slot + info cards справа
   - 4 колонки подразделений с image placeholders
   - 2 колонки новостей + sidebar справа в одной секции
   - Нет большой пустой области в main content

### Tablet — 768×1000

1. Установите ширину **768px**
2. Проверьте:
   - Topbar скрыт
   - Гамбургер-меню вместо desktop nav
   - 2 колонки подразделений и новостей
   - Sidebar под основным контентом
   - Hero image slot над или под info cards

### Desktop — 1280×1000

1. Установите ширину **1280px**
2. Проверьте те же пункты что для 1440 — layout не ломается

### Mobile — 390×1000

1. Установите ширину **390px**
2. Проверьте:
   - Компактный header
   - Гамбургер-меню работает
   - 2 колонки quick actions
   - 1 колонка для cards
   - Нет горизонтальной прокрутки
   - Кнопки достаточно большие для нажатия пальцем

---

## Какую обратную связь дать после просмотра

Пожалуйста, сообщите агенту:

1. **Общее впечатление** — нравится ли направление дизайна?
2. **Цвета** — подходят ли teal/blue для медучреждения?
3. **Hero секция** — достаточно ли заметны CTA (запись, обращения)?
4. **Quick actions** — понятны ли карточки быстрых услуг?
5. **Контакты** — удобно ли расположены телефоны?
6. **Подразделения** — устраивает ли grid карточек?
7. **Новости** — достаточно ли информации в карточках?
8. **Mobile** — удобно ли пользоваться на телефоне?
9. **Что изменить** — конкретные пожелания по секциям
10. **Что сохранить** — что точно не трогать

Пример сообщения:

> «Нравится общий стиль. Hero хороший, но quick actions сделать крупнее. Footer добавить карту. Цвет primary чуть светлее.»

---

## Что будет на следующем этапе

**Stage 3** (после вашего review):

1. Внесение правок по вашей обратной связи
2. Доработка UI kit при необходимости
3. Начало конвертации в WordPress-тему (`wordpress-theme/`)
4. Создание PHP template-parts по mapping из `docs/04-wordpress-mapping.md`
5. Подготовка ACF-полей для редактируемых блоков

---

## Возможные проблемы

| Проблема             | Решение                                                      |
| -------------------- | ------------------------------------------------------------ |
| Стили не загрузились | Открывайте `index.html` из `src/pages/`, не перемещайте файл |
| Шрифт выглядит иначе | Нужен интернет для Google Fonts Inter                        |
| Меню не открывается  | Обновите страницу, проверьте консоль (F12)                   |
| Ссылки не работают   | Это нормально — demo, ссылки ведут на будущие WP-страницы    |
