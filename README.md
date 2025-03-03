# Пиццерия Test-site

Проект веб-приложения для пиццерии, состоящий из React-фронтенда и Node.js бэкенда с базой данных PostgreSQL.

## Предварительные требования

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

## Установка и запуск

1. Создайте директорию для проекта и перейдите в неё:

```bash
mkdir Test-site
cd Test-site
```

2. Клонируйте репозитории:

```bash
git clone <url-репозитория-frontend> test-react-app
git clone <url-репозитория-backend> Test-server
```

3. Запустите контейнеры:

```bash
docker-compose up -d
```

4. Инициализируйте базу данных:

```bash
docker-compose exec backend node sync.js
```

## Доступ к приложению

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- База данных PostgreSQL: localhost:5433
  - Database: testdb
  - Username: postgres
  - Password: postgres

## Полезные команды

```bash
# Остановить все контейнеры
docker-compose down

# Пересобрать и перезапустить контейнеры
docker-compose up -d --build

# Посмотреть логи всех контейнеров
docker-compose logs

# Посмотреть логи конкретного сервиса
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Проверить статус контейнеров
docker-compose ps
```

## Решение проблем

1. **Порты заняты**

   - Измените порты в `docker-compose.yml`
   - По умолчанию используются порты: 3000 (frontend), 5000 (backend), 5433 (database)

2. **База данных не создается**

   - Проверьте логи: `docker-compose logs db`
   - Перезапустите синхронизацию: `docker-compose exec backend node sync.js`

3. **Контейнеры не запускаются**
   - Проверьте логи: `docker-compose logs`
   - Убедитесь, что все порты свободны
   - Перезапустите Docker Desktop

## Структура проекта

```
Test-site/
├── test-react-app/     # Frontend на React
├── Test-server/        # Backend на Node.js
└── docker-compose.yml  # Конфигурация Docker
```

## Разработка

- Frontend разработан с использованием React и Vite
- Backend использует Express.js и Sequelize
- База данных - PostgreSQL

## Примечание

Скрипт `sync.js` пересоздает базу данных с начальными данными. Используйте его только при первом запуске или когда нужно сбросить базу данных к исходному состоянию.
