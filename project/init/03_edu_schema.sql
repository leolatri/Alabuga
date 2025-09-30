-- Схема под фронт (int id, простые таблицы)
CREATE SCHEMA IF NOT EXISTS edu;

-- Пользователи
CREATE TABLE IF NOT EXISTS edu.users (
  id          int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name   varchar(255) NOT NULL,
  mana        int NOT NULL DEFAULT 0,
  experience  int NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Артефакты
-- rarity: 0=COMMON, 1=RARE
CREATE TABLE IF NOT EXISTS edu.artifacts (
  id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  img     varchar(255) NOT NULL,      -- можно URL/путь
  name    varchar(255) NOT NULL,
  rarity  int NOT NULL CHECK (rarity IN (0,1))
);

-- Артефакты пользователей
CREATE TABLE IF NOT EXISTS edu.user_artifacts (
  user_id     int NOT NULL REFERENCES edu.users(id) ON DELETE CASCADE,
  artifact_id int NOT NULL REFERENCES edu.artifacts(id) ON DELETE CASCADE,
  acquired_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, artifact_id)
);

-- Контент (ветки и миссии)
-- status: 0=IN_PROGRESS, 1=COMPLETED
-- type: 'branch'|'lesson'|'practice'|'quiz'|'project'
CREATE TABLE IF NOT EXISTS edu.content (
  id          int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type        varchar(50) NOT NULL CHECK (type IN ('branch','lesson','practice','quiz','project')),
  name        varchar(255) NOT NULL,
  status      int NOT NULL DEFAULT 0 CHECK (status IN (0,1)),
  experience  int NOT NULL DEFAULT 0,
  description text,
  duration    int,                    -- минуты
  progress    int,                    -- проценты 0..100
  "order"     int NOT NULL,
  mana        int NOT NULL DEFAULT 0,
  parent_id   int REFERENCES edu.content(id) ON DELETE CASCADE, -- миссия принадлежит ветке
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS content_parent_idx ON edu.content(parent_id);
CREATE INDEX IF NOT EXISTS content_type_idx   ON edu.content(type);

-- Требования к контенту (миссия зависит от других миссий)
CREATE TABLE IF NOT EXISTS edu.content_requirements (
  content_id           int NOT NULL REFERENCES edu.content(id) ON DELETE CASCADE,
  required_content_id  int NOT NULL REFERENCES edu.content(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, required_content_id)
);

-- Награды за контент: манна/опыт отдельно...
CREATE TABLE IF NOT EXISTS edu.content_rewards (
  content_id  int PRIMARY KEY REFERENCES edu.content(id) ON DELETE CASCADE,
  mana        int NOT NULL DEFAULT 0,
  experience  int NOT NULL DEFAULT 0
);

-- ...и набор артефактов (многие-ко-многим)
CREATE TABLE IF NOT EXISTS edu.content_reward_artifacts (
  content_id  int NOT NULL REFERENCES edu.content(id)   ON DELETE CASCADE,
  artifact_id int NOT NULL REFERENCES edu.artifacts(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, artifact_id)
);

-- Прогресс пользователя по контенту
CREATE TABLE IF NOT EXISTS edu.user_progress (
  user_id     int NOT NULL REFERENCES edu.users(id)    ON DELETE CASCADE,
  content_id  int NOT NULL REFERENCES edu.content(id)  ON DELETE CASCADE,
  status      int NOT NULL DEFAULT 0 CHECK (status IN (0,1)),
  progress    int NOT NULL DEFAULT 0,
  started_at  timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  PRIMARY KEY (user_id, content_id)
);

-- Вьюха лидерборда (ранг по опыту)
CREATE OR REPLACE VIEW edu.v_leaderboard AS
SELECT
  u.id,
  u.full_name,
  u.experience,
  DENSE_RANK() OVER (ORDER BY u.experience DESC, u.id ASC) AS place
FROM edu.users u;
