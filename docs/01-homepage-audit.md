# Аудит главной страницы — ggkp14.by

## Метаданные аудита

| Параметр | Значение |
|----------|----------|
| **Дата аудита** | 20 июля 2026 |
| **Аудируемый URL** | https://ggkp14.by/ |
| **Заголовок страницы** | Главная - ГУЗ «Гомельская городская клиническая поликлиника №14» |
| **CMS** | WordPress |
| **Метод аудита** | Playwright MCP (browser_navigate, browser_snapshot, browser_resize, browser_take_screenshot, browser_click) |

## Размеры viewport

| Устройство | Размер | Статус |
|------------|--------|--------|
| Desktop | 1440×1000 | Проверен |
| Tablet | 768×1000 | Проверен |
| Mobile | 390×1000 | Проверен |

---

## Порядок секций на главной странице

1. **Topbar (верхняя служебная панель)** — desktop only
2. **Header (шапка)** — логотип, навигация, поиск, версия для слабовидящих
3. **Hero / Welcome slider** — приветствие, название учреждения, слайды с CTA
4. **Quick service links (мобильный список)** — mobile/tablet
5. **Contact info blocks** — телефоны регистратуры, консультаций, АОП, email, адрес
6. **Info cards row** — горячая линия, вакансии, время работы
7. **Promotional banner** — постер (вакцинация/здоровье)
8. **Structural departments** — «НАШИ СТРУКТУРНЫЕ ПОДРАЗДЕЛЕНИЯ»
9. **Latest news carousel** — «Последние новости»
10. **Useful links carousel** — «Полезные ссылки» (баннеры партнёров)
11. **News grid (extended)** — расширенная лента новостей с «Read More»
12. **Sidebar widgets** — Telegram, поиск, время работы, полезные ссылки, QR, Яндекс.Метрика
13. **Footer** — копирайт

---

## Инвентарь видимого контента

### Topbar (desktop, 1440px)

Горизонтальное меню ссылок:
- Режим работы → `/o-nas/rezhim-raboty/`
- Горячая линия → `/contacts/goryachaya-liniya/`
- Структурные подразделения → `/o-nas/strukturnye-podrazdeleniya/`
- Территориальные участки → `/o-nas/territorialnye-uchastki/`
- Вакансии → `/o-nas/vakansii/`
- Контакты → `/contacts/`
- Профсоюз → `/o-nas/profsojuz/`
- Обратиться напрямую к Главному врачу → (форма Yandex)
- Флаг языка (RU)
- Ссылка «Версия сайта для слабовидящих»

### Header / Main navigation

**Логотип:** изображение с alt «ГУЗ «Гомельская городская клиническая поликлиника №14»», ссылка на главную.

**Главное меню:**
| Пункт | URL |
|-------|-----|
| Главная | `/` |
| Прямые линии | `/o-nas/grafik-pryamyh-telefonnyh-linij/` |
| Платные услуги | `/platnye-uslugi-2/` |
| Информация | `/informaciya/` (с подменю) |
| Контакты | `/contacts/` (с подменю) |
| Абитуриент 2026 | `/abiturient-2023/` |

**Дополнительно в header:**
- Кнопка поиска (иконка лупы, `javascript:void(0)`)
- На mobile/tablet: иконка меню (гамбургер) и иконка topbar

### Hero / Welcome area

- Заголовок H4: «Мы приветствуем Вас на сайте»
- Заголовок H5: «Государственное учреждение здравоохранения «Гомельская городская клиническая поликлиника №14»»
- Слайдер с множеством слайдов (carousel), каждый содержит CTA-ссылку

**Слайды hero (основные CTA):**
| Текст | URL |
|-------|-----|
| Экстренная психологическая помощь | `/sdelai-5-shagov-chtoby-spasti-zhizn/` |
| Запись к врачу | `/zapis-k-vrachu/` |
| Электронные обращения | `/contacts/elektronnye-obrashheniya/` |
| Заказ выписки | `/zakaz-vypiski-iz-medicinskih-dokumentov/` |
| Диспансеризация | `/poryadok-provedeniya-dispanserizacii-vzroslogo-i-detskogo-naseleniya/` |
| Медицинский туризм | `/medicinskij-turizm-2/` |
| вопрос администрации | `/lichnye-obrashheniya-grazhdan/` |
| Сексологическая помощь | `/seksologicheskaya-pomoshh/` |
| ЖМИ! Подпишись на нас ! | `https://t.me/ggkp14` |
| Telegram чат-бот МЗ РБ | `https://t.me/mzbel_bot` |
| Подпишись на НАШ КАНАЛ! | `https://t.me/ggkp14bot` |
| Платные услуги (баннер) | `/platnye-uslugi-2/` |
| Ответственность родителей | `/otvetstvennost-roditelej-zalog-bezopasnosti-detej/` |

### Contact info blocks

**Регистратура:**
- +375 (44) 541-74-37 (A1)
- +375 (232) 32-91-36
- +375 (232) 29-58-62
- +375 (232) 31-56-25

**Женская консультация:**
- +375 (44) 766-55-47 (A1)
- +375 (232) 31-09-37

**Урицкая АОП:**
- +375 (44) 732-66-83 (A1)

**Тереничская АОП:**
- +375 (44) 702-94-29 (A1)

**Email:** ggkp14@ggkp14.by (mailto: cgpf1@mail.gomel.by)

**Телефон приемной:** +375 (232) 32-90-65

**Адрес:** г. Гомель, ул. Косарева, 11, 246012

### Info cards

- **Важные телефоны:** горячая линия +375 (232) 33-26-51 (10:00–18:00, перерыв 13:00–13:30)
- **Нам требуются:** ссылка «Подробнее» → `/o-nas/vakansii/`
- **Время работы:** Пн–Пт 7:00–20:00, Сб 8:00–14:00, Вс — выходной

### Structural departments (18 единиц)

| Подразделение | URL |
|---------------|-----|
| Женская консультация | `/o-nas/strukturnye-podrazdeleniya/zhenskaya-konsultaciya/` |
| Хирургическое отделение | `/o-nas/strukturnye-podrazdeleniya/hirurgicheskoe-otdelenie/` |
| Ультразвуковая диагностика | `/o-nas/strukturnye-podrazdeleniya/ultrazvukovaya-diagnostika/` |
| Функциональная диагностика | `/o-nas/strukturnye-podrazdeleniya/funkcionalnaya-diagnostika/` |
| Отделения общей практики | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-obshhej-praktiki/` |
| Отделения дневного пребывания | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-dnevnogo-prebyvaniya/` |
| Отделения профилактики | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-profilaktiki/` |
| Отделения медицинской реабилитации | `/o-nas/strukturnye-podrazdeleniya/otdeleniya-medicinskoj-reabilitacii/` |
| Клинико-диагностическая лаборатория | `/o-nas/strukturnye-podrazdeleniya/kliniko-diagnosticheskaya-laboratoriya/` |
| Рентгеновское отделение | `/o-nas/strukturnye-podrazdeleniya/rentgenovskoe-otdeleniya/` |
| Урицкая АОП | `/o-nas/strukturnye-podrazdeleniya/urickaya-aop/` |
| Тереничская АОП | `/o-nas/strukturnye-podrazdeleniya/terenichskaya-aop/` |
| Руднемаримоновская АОП | `/o-nas/strukturnye-podrazdeleniya/rudnya-marimonovskaya-aop/` |
| Телешовский ФАП | `/o-nas/strukturnye-podrazdeleniya/teleshovskij-ffp/` |
| Руднетелешовский ФАП | `/o-nas/strukturnye-podrazdeleniya/rudnya-telefovskij-fap/` |
| Старобелицкий ФАП | `/o-nas/strukturnye-podrazdeleniya/staro-beleckij-fap/` |
| Залипский ФАП | `/o-nas/strukturnye-podrazdeleniya/zalipskij-fap/` |
| Ново-Мильчанский ФАП | `/o-nas/strukturnye-podrazdeleniya/novo-milchanskij-fap/` |

### Latest news (12+ записей в карусели)

Примеры (первые записи):
1. «В Гомеле завершилось специальное профилактическое мероприятие «Зеленый щит»» — 14.07.2026
2. «Эпидситуация по ВИЧ-инфекции в Гомельской области…» — 05.06.2026
3. «В Беларуси стартует акция МЧС «Безопасные каникулы»» — 14.05.2026
4. «Гомельщина на страже борьбы с табакокурением» — 11.05.2026
5. … (ещё 8+ записей)

Каждая карточка: изображение, дата, счётчик комментариев, заголовок-ссылка.

Расширенная лента ниже дублирует новости с кнопкой «Read More» и категорией «Новости».

### Useful links (карусель баннеров)

| Ресурс | URL |
|--------|-----|
| Минздрав РБ (QR) | `https://qr.me-qr.com/a6azetsZ` |
| Президент РБ | `https://president.gov.by/ru` |
| Гомельский облисполком | `http://gomel-region.by/ru` |
| Минздрав РБ | `http://minzdrav.gov.by/` |
| ГомельУЗО | `https://gomeluzo.by/` |
| Федерация профсоюзов | `https://fpb.1prof.by/` |
| 24health.by | `https://24health.by/` |
| pravo.by | `https://pravo.by/` |
| Портал рейтинговой оценки | `http://xn----7sbgfh2alwzdhpc0c.xn--90ais/` |
| pomogut.by | `https://pomogut.by/` |
| STOP наркотик Telegram | `https://t.me/stop_drug_by` |

### Sidebar widgets

1. **Telegram banner** → `https://t.me/GomelOblMedicina`
2. **Поиск по сайту** — searchbox + кнопка
3. **Время работы** — список (ежедневно 7:00–20:00, суббота 8:00–14:00, воскресенье выходной)
4. **Полезные ссылки** (текстовый список):
   - О нас → `/o-nas/`
   - Телефон «горячей» линии → `/contacts/goryachaya-liniya/`
   - Территориальные участки → `/o-nas/territorialnye-uchastki/`
   - Администрация → `/o-nas/administraciya/`
   - Адреса электронной почты → `/adresa-elektronnoj-pochty/`
5. **QR-код** → `https://qr.me-qr.com/a6azetsZ`
6. **Пустые виджеты** (5 complementary blocks без контента)
7. **Яндекс.Метрика** — информер

### Footer

- © ГУЗ «Гомельская городская клиническая поликлиника № 14»

---

## Инвентарь компонентов

| Компонент | Описание | Расположение |
|-----------|----------|--------------|
| Topbar nav | Горизонтальное меню служебных ссылок | Desktop header top |
| Main nav | Основная навигация с dropdown | Header |
| Logo | Изображение учреждения | Header left |
| Search toggle | Иконка лупы | Header right |
| Accessibility link | «Версия для слабовидящих» | Topbar |
| Language switcher | Флаг RU | Topbar |
| Hero slider | Carousel с CTA-слайдами | Main content top |
| Quick links list | Список быстрых услуг | Mobile main |
| Contact cards | 3 колонки с телефонами/email/адресом | Main |
| Info cards | 3 карточки (горячая линия, вакансии, время) | Main |
| Promo banner | Изображение-постер | Main |
| Department grid | 18 карточек article с figure+heading | Main |
| News carousel | Горизонтальная карусель article | Main |
| Useful links carousel | Карусель баннеров-партнёров | Main |
| News grid | Расширенная лента с Read More | Main + sidebar layout |
| Sidebar search | Searchbox + button | Sidebar |
| Sidebar hours | Список времени работы | Sidebar |
| Sidebar links | Текстовый список ссылок | Sidebar |
| Carousel controls | Prev/Next arrows | News, Useful links |
| Mobile menu | Overlay nav с close (×) | Mobile header |
| Footer copyright | Текст копирайта | Footer |

---

## Инвентарь изображений и ассетов

- Логотип учреждения (header)
- Hero slider images (фоновые изображения слайдов, включая osvod-2.jpg — ошибка загрузки 400)
- Department card images (18 thumbnail)
- News thumbnails (featured images постов)
- Useful links banners (11 partner logos)
- Promo poster (vaccine scheduling)
- QR code image
- Telegram channel banner
- Yandex Metrika informer badge
- Font Awesome / icon font glyphs (используются символы , ,  и др.)
- reCAPTCHA iframe (footer/hidden)

---

## Формы и поиск

| Элемент | Тип | Поведение |
|---------|-----|-----------|
| Поиск по сайту (sidebar) | `<searchbox>` + button | Стандартный WordPress search |
| Поиск (header) | Toggle icon | Открывает overlay/modal (javascript:void) |
| Форма главного врача | Yandex Forms iframe | Внешняя форма |
| reCAPTCHA | iframe | Защита форм |

---

## Динамическое поведение

- **Hero slider:** автопрокрутка слайдов с CTA
- **News carousel:** горизонтальная прокрутка с prev/next
- **Useful links carousel:** горизонтальная прокрутка с prev/next
- **Mobile menu:** гамбургер → overlay navigation с close (×); подменю «Информация» и «Контакты» с chevron
- **Search toggle:** header icon открывает поиск
- **Topbar toggle (mobile):** отдельная иконка для служебных ссылок
- **Console error:** failed to load `osvod-2.jpg` background (HTTP 400) — битый ассет в hero

---

## Наблюдения по responsive

### Desktop (1440×1000)
- Topbar виден полностью
- Main nav горизонтально
- Sidebar справа от контента (two-column layout)
- Hero slider полноразмерный
- Department grid: многоколоночная сетка
- News carousel: несколько карточек в ряд

### Tablet (768×1000)
- Topbar скрыт (только иконка toggle)
- Main nav скрыт (гамбургер)
- Hero slider сохраняется
- Sidebar перемещается (виден в snapshot как complementary blocks)
- Department grid: меньше колонок
- Контактные блоки: вероятно 2 колонки

### Mobile (390×1000)
- Topbar: только иконка toggle ()
- Header: логотип + menu icon + search icon
- Hero: иконки услуг свёрнуты (только glyph symbols)
- Quick links list: вертикальный список (Запись к врачу, Электронные обращения, Заказ выписки, Личный кабинет, Диспансеризация)
- Mobile menu overlay: полная навигация с dropdown-подменю
- Contact blocks: одна колонка
- Carousels: одна карточка за раз
- Sidebar widgets: внизу страницы (stack)

---

## Наблюдения по accessibility

**Проблемы текущего сайта:**
- Заголовки hero используют H4/H5 вместо H1 — нет явного H1
- «Полезные ссылки» используют H1 — семантически неверно для секции
- Searchbox placeholder «Search...» на английском при русскоязычном сайте
- «Read More» на английском в новостной ленте
- Иконки без текстовых labels (только glyph symbols)
- Ссылка «вопрос администрации» — строчная буква
- Email отображается как ggkp14@ggkp14.by, но mailto ведёт на другой адрес
- Битое фоновое изображение в hero (400 error)
- reCAPTCHA iframe без явного контекста
- Focus states не проверялись визуально, но icon-only buttons вероятно имеют слабую доступность
- «Версия для слабовидящих» — ссылка на `#` (не функциональна без JS)

**Положительные стороны:**
- Alt-тексты на изображениях подразделений и новостей
- Semantic `<banner>`, `<navigation>`, `<contentinfo>`, `<complementary>`, `<article>`
- Телефоны оформлены как heading для визуального акцента

---

## Что необходимо сохранить

- Полный порядок секций (topbar → header → hero → contacts → info → departments → news → links → sidebar → footer)
- Все URL и тексты ссылок
- 18 структурных подразделений
- Контактные данные (телефоны, email, адрес, режим работы)
- Быстрые сервисные ссылки (запись, обращения, выписка, диспансеризация)
- Карусели новостей и полезных ссылок
- Sidebar widgets (поиск, время работы, полезные ссылки)
- Мобильное меню с подменю
- Telegram-интеграции
- Версия для слабовидящих (функциональность)

## Что следует переработать

- Визуальный стиль hero-слайдера (перегружен, много разнородных CTA)
- Типографика и иерархия заголовков
- Карточки подразделений (единообразный modern card design)
- News cards (единый стиль, русскоязычные labels)
- Contact blocks (лучшая группировка, иконки, click-to-call)
- Sidebar (компактнее, современные widgets)
- Topbar (чище, меньше визуального шума)
- Mobile quick links (иконки + текст, grid layout)
- Carousel controls (accessible buttons with aria-labels)
- Color scheme (современная healthcare palette)
- Spacing и whitespace
- Битый ассет osvod-2.jpg — заменить или убрать
