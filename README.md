# Alabuga
Платформа для обучения сотрудников и кандидатов в игровой форме

# 1) собрать и запустить всё
docker compose up -d --build

все выключить docker compose down
# 2) посмотреть статус
docker compose ps

Что открывать в браузере

Фронт: http://localhost:8080

API (Swagger): http://localhost:8000/docs

Через Nginx проксируется /api/*, значит можно просто дернуть JSON прямо из браузера:

http://localhost:8080/api/store

http://localhost:8080/api/missions

http://localhost:8080/api/profile/22222222-2222-2222-2222-222222222222
 (тестовый пользователь из сидов)