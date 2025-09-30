#!/usr/bin/env bash
set -euo pipefail

SERVICE="${1:-db}"
INIT_DIR="${2:-./init}"

if command -v docker &>/dev/null && docker compose version &>/dev/null; then
  COMPOSE="docker compose"
elif command -v docker-compose &>/dev/null; then
  COMPOSE="docker-compose"
else
  echo "Не найден docker compose"; exit 1
fi

$COMPOSE ps "${SERVICE}" >/dev/null
CID="$($COMPOSE ps -q "${SERVICE}")"
if [[ -z "$CID" ]]; then
  echo "Сервис '${SERVICE}' не запущен. Запусти:  $COMPOSE up -d ${SERVICE}"
  exit 1
fi

if [[ ! -d "$INIT_DIR" ]]; then
  echo "Папка не найдена: $INIT_DIR"; exit 1
fi

shopt -s nullglob
mapfile -d '' FILES < <(find "$INIT_DIR" -maxdepth 1 -type f -name "*.sql" -print0 | sort -z)

if (( ${#FILES[@]} == 0 )); then
  echo "В $INIT_DIR нет .sql файлов — нечего применять."
  exit 0
fi

echo "Будут применены файлы:"
for f in "${FILES[@]}"; do echo "  - $(basename "$f")"; done
echo

for SRC in "${FILES[@]}"; do
  BASE="$(basename "$SRC")"
  DST="/tmp/$BASE"
  echo "→ Копирую и выполняю: $SRC"
  docker cp "$SRC" "$CID:$DST"
  $COMPOSE exec -T "$SERVICE" bash -lc \
    "psql -h localhost -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -v ON_ERROR_STOP=1 -X -f \"$DST\""
done

echo "Готово: все SQL применены успешно."
