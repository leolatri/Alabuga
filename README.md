Alabuga

Платформа для обучения сотрудников и кандидатов в игровой форме.

🚀 Быстрый старт
# 1) собрать и запустить всё
docker compose up -d --build

# 2) посмотреть статус контейнеров
docker compose ps

# 3) логи (по желанию)
docker compose logs -f db
docker compose logs -f api
docker compose logs -f web


Остановить всё:

docker compose down


Полный сброс с удалением данных БД (осторожно!):

docker compose down -v

🌐 Что открывать в браузере

Фронт: http://localhost:8080

API (Swagger): http://localhost:8000/docs

Через Nginx в фронте проксируется путь /api/* → в бекенд api:8000, поэтому можно сразу дёргать JSON:

http://localhost:8080/api/store

http://localhost:8080/api/missions

http://localhost:8080/api/profile/22222222-2222-2222-2222-222222222222
 (тестовый пользователь из сидов)

🗄️ Миграции/SQL

Применить все .sql из папки init в уже работающую БД:

chmod +x scripts/apply_sql.sh
./scripts/apply_sql.sh db ./init


Пересобрать только API (если код поменялся):

docker compose up -d --build api

✅ Проверки (EDU-контур)

Во всех запросах ниже нужен заголовок X-User-Id: <int> — это ID пользователя из edu.users. В сидере есть пользователь 1.

# Профиль (PersonDTO)
curl -H "X-User-Id: 1" http://localhost:8000/edu/profile

# Лидерборд (LiderDTO[])
curl -H "X-User-Id: 1" http://localhost:8000/edu/leaderboard

# Мои артефакты (ArtifactDTO[])
curl -H "X-User-Id: 1" http://localhost:8000/edu/artifacts

# Все ветки (BranchDTO[])
curl -H "X-User-Id: 1" http://localhost:8000/edu/branches

# Конкретная ветка (BranchDTO)
curl -H "X-User-Id: 1" http://localhost:8000/edu/branches/1

# Список миссий ветки (ContentDTO[])
curl -H "X-User-Id: 1" http://localhost:8000/edu/branches/1/missionsList

# Миссия по ID (ContentDTO)
curl -H "X-User-Id: 1" http://localhost:8000/edu/mission/2

🧩 Полезно знать

.env
В корне лежит файл .env (пример):

POSTGRES_DB=gameapp
POSTGRES_USER=appuser
POSTGRES_PASSWORD=secret


Фронт → API
Фронт ходит к бекенду по относительному пути /api/... (настройка уже в Docker/Nginx).

Картинки
В «старом» домене (роли/миссии/магазин) изображения приходят как Base64; в EDU — как строки/URL из БД.

DEV режим (если фронт отдельно)
Если запускаешь CRA на http://localhost:3000 вне Docker, включи CORS в app/main.py (есть закомментированный блок) или используй proxy в фронте.

🛠️ Эндпоинты (кратко)
EDU (/edu), заголовок X-User-Id: <int>

GET /edu/profile → профиль (PersonDTO)

PUT /edu/profile → обновить профиль (PersonDTO)

GET /edu/leaderboard → лидерборд (LiderDTO[])

GET /edu/artifacts → артефакты пользователя (ArtifactDTO[])

GET /edu/branches → все ветки (BranchDTO[])

GET /edu/branches/{id} → ветка (BranchDTO)

GET /edu/branches/{id}/missionsList → миссии ветки (ContentDTO[])

GET /edu/mission/{id} → миссия (ContentDTO)

«Старый» домен (без префикса)

GET /profile/{user_uuid} → профиль с артефактами и топом

GET /store → товары магазина

GET /missions → опубликованные миссии

(HR только, заголовок X-User-Id: <UUID HR>)

POST /missions → создать миссию

PUT /missions → редактировать миссию

POST /store (multipart) → создать товар

PUT /store/{id} (multipart) → редактировать товар

🧯 Частые проблемы

Порт занят → поменяй мэппинг портов в docker-compose.yml (например, 8081:80, 8001:8000).

Фронт не видит API → открой http://localhost:8080/api/missions. Если JSON есть — прокси ОК; проверь, что фронт вызывает '/api/...'.

Сиды не применились → база уже инициализирована. Прогоните ./scripts/apply_sql.sh db ./init или выполните полный сброс docker compose down -v (удалит данные).

SQL-ошибки вида sql в начале файла → уберите случайные маркеры тройных кавычек ``` и слово sql из первых строк .sql файлов.