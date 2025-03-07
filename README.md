# Test-site

Проект веб-приложения, состоящий из React-фронтенда и Node.js бэкенда с базой данных PostgreSQL.

## Предварительные требования

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

## Установка и запуск

1. git clone:

```bash
git clone https://github.com/mihumiko/Test-site.git
cd Test-site
```

2. Запустите контейнеры:

```bash
docker-compose up -d
```

3. Загрузка базы данных(начальные значения) и первого админа:

```bash
docker-compose exec backend node sync.js
docker-compose exec backend node scripts/NewAdminCreation.js
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

## Разработка

- Frontend разработан с использованием React и Vite
- Backend использует Express.js и Sequelize
- База данных - PostgreSQL
