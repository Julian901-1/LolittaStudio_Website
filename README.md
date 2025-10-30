# LolittaStudio - Художественное оформление окон и витрин

Сайт для студии художественной росписи окон и витрин в Москве.

## Структура проекта

```
LolittasSiet/
├── index.html          # Главная страница
├── form.js            # Скрипт формы-опросника
├── images/            # Изображения работ
├── form/              # Изображения для формы
├── server/            # Backend сервер
│   ├── server.js      # Express сервер
│   ├── admin.html     # Админ-панель
│   ├── package.json   # Зависимости
│   └── db.json        # База данных (создается автоматически)
└── README.md          # Документация
```

## Локальная разработка

### Frontend

Просто откройте `index.html` в браузере. Для полной функциональности (отправка форм) запустите backend.

### Backend

1. Установите зависимости:
```bash
cd server
npm install
```

2. Запустите сервер:
```bash
npm start
```

Сервер запустится на `http://localhost:3000`

- Главный сайт: http://localhost:3000
- Админ-панель: http://localhost:3000/admin

### Доступ к админ-панели

- **Логин**: admin
- **Пароль**: Lysykh12

## Деплой

### Frontend (GitHub Pages)

1. Создайте репозиторий на GitHub
2. Загрузите все файлы кроме папки `server/`
3. В настройках репозитория включите GitHub Pages (Source: main branch, root folder)
4. Обновите URL API в `form.js` на URL вашего backend на Render

### Backend (Render.com)

1. Создайте новый Web Service на Render.com
2. Подключите репозиторий или загрузите папку `server/`
3. Настройки:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. После деплоя скопируйте URL и обновите его в frontend (`form.js`)

## Настройка API

В файле `form.js` измените URL API:

```javascript
const API_URL = 'https://your-render-app.onrender.com';

// Замените строку:
const response = await fetch('/api/submissions', {
// На:
const response = await fetch(`${API_URL}/api/submissions`, {
```

## Технологии

- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express, LowDB
- **Деплой**: GitHub Pages (frontend) + Render (backend)

## Особенности

- Одностраничный сайт с плавной прокруткой
- Интерактивная форма-опросник
- Адаптивный дизайн (mobile-first)
- Админ-панель для управления заявками
- Аутентификация администратора
- База данных заявок

## Контакты

- **Телефон**: +7 993 894 1292
- **Email**: lolitta.marulina@gmail.com
- **Telegram**: https://t.me/LolittaStudio
- **WhatsApp**: https://wa.me/79938941292
