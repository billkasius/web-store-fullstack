# Products API

CRUD-система для управления товарами с поиском и фильтрацией.

## Технологии

- **Node.js** + **Express.js** — сервер и маршрутизация
- **SQLite** (better-sqlite3) — база данных
- **nodemon** — автоперезапуск при разработке

## Установка и запуск

### 1. Клонировать репозиторий
```bash
git clone <ссылка на репозиторий>
cd products-api
```

### 2. Установить зависимости
```bash
npm install
```

### 3. Запустить сервер
```bash
# Режим разработки (с автоперезапуском)
npm run dev

# Обычный запуск
npm start
```

Сервер запустится на `http://localhost:3000`

---

## Структура проекта
```
products-api/
├── src/
│   ├── db/
│   │   └── database.js        # Подключение к SQLite, создание таблиц
│   ├── models/
│   │   └── product.model.js   # Класс Product
│   ├── repositories/
│   │   └── product.repository.js  # Запросы к базе данных
│   ├── services/
│   │   └── product.service.js     # Бизнес-логика
│   ├── controllers/
│   │   └── product.controller.js  # Обработка запросов
│   ├── routes/
│   │   └── product.routes.js      # Маршруты
│   └── middleware/
│       └── auth.middleware.js     # Проверка авторизации
└── app.js                         # Точка входа
```

---

## Авторизация

Защищённые маршруты (POST, PUT, DELETE) требуют заголовки:

| Заголовок | Значение |
|-----------|----------|
| `x-username` | `admin` |
| `x-password` | `admin123` |

---

## Эндпоинты

### Товары

#### Получить все товары
```
GET /api/products
```
Ответ:
```json
[
  {
    "id": 1,
    "name": "Телефон",
    "description": "Смартфон Samsung",
    "price": 299,
    "category": "электроника",
    "stock": 10,
    "created_at": "2024-01-01 12:00:00"
  }
]
```

---

#### Поиск и фильтрация
```
GET /api/products?search=телефон&category=электроника&minPrice=100&maxPrice=500
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `search` | string | Поиск по названию и описанию |
| `category` | string | Фильтр по категории |
| `minPrice` | number | Минимальная цена |
| `maxPrice` | number | Максимальная цена |

---

#### Получить товар по ID
```
GET /api/products/:id
```
Ответ:
```json
{
  "id": 1,
  "name": "Телефон",
  "description": "Смартфон Samsung",
  "price": 299,
  "category": "электроника",
  "stock": 10,
  "created_at": "2024-01-01 12:00:00"
}
```

---

#### Создать товар 🔒
```
POST /api/products
```
Тело запроса:
```json
{
  "name": "Телефон",
  "description": "Смартфон Samsung",
  "price": 299,
  "category": "электроника",
  "stock": 10
}
```

| Поле | Тип | Обязательное |
|------|-----|-------------|
| `name` | string | ✅ |
| `price` | number | ✅ |
| `description` | string | ❌ |
| `category` | string | ❌ |
| `stock` | number | ❌ |

---

#### Обновить товар 🔒
```
PUT /api/products/:id
```
Тело запроса — те же поля что и при создании.

---

#### Удалить товар 🔒
```
DELETE /api/products/:id
```
Ответ:
```json
{
  "message": "Товар удалён"
}
```

---

🔒 — требует заголовки авторизации администратора