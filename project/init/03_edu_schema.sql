CREATE SCHEMA IF NOT EXISTS edu;

CREATE TABLE IF NOT EXISTS edu.users (
  id          int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name   varchar(255) NOT NULL,
  mana        int NOT NULL DEFAULT 0,
  experience  int NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS edu.artifacts (
  id      int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  img     varchar(255) NOT NULL,        name    varchar(255) NOT NULL,
  rarity  int NOT NULL CHECK (rarity IN (0,1))
);

CREATE TABLE IF NOT EXISTS edu.user_artifacts (
  user_id     int NOT NULL REFERENCES edu.users(id) ON DELETE CASCADE,
  artifact_id int NOT NULL REFERENCES edu.artifacts(id) ON DELETE CASCADE,
  acquired_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, artifact_id)
);

CREATE TABLE IF NOT EXISTS edu.content (
  id          int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type        varchar(50) NOT NULL CHECK (type IN ('branch','lesson','practice','quiz','project')),
  name        varchar(255) NOT NULL,
  status      int NOT NULL DEFAULT 0 CHECK (status IN (0,1)),
  experience  int NOT NULL DEFAULT 0,
  description text,
  duration    int,                      progress    int,                      "order"     int NOT NULL,
  mana        int NOT NULL DEFAULT 0,
  parent_id   int REFERENCES edu.content(id) ON DELETE CASCADE,   created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS content_parent_idx ON edu.content(parent_id);
CREATE INDEX IF NOT EXISTS content_type_idx   ON edu.content(type);

CREATE TABLE IF NOT EXISTS edu.content_requirements (
  content_id           int NOT NULL REFERENCES edu.content(id) ON DELETE CASCADE,
  required_content_id  int NOT NULL REFERENCES edu.content(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, required_content_id)
);

CREATE TABLE IF NOT EXISTS edu.content_rewards (
  content_id  int PRIMARY KEY REFERENCES edu.content(id) ON DELETE CASCADE,
  mana        int NOT NULL DEFAULT 0,
  experience  int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS edu.content_reward_artifacts (
  content_id  int NOT NULL REFERENCES edu.content(id)   ON DELETE CASCADE,
  artifact_id int NOT NULL REFERENCES edu.artifacts(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, artifact_id)
);

CREATE TABLE IF NOT EXISTS edu.user_progress (
  user_id     int NOT NULL REFERENCES edu.users(id)    ON DELETE CASCADE,
  content_id  int NOT NULL REFERENCES edu.content(id)  ON DELETE CASCADE,
  status      int NOT NULL DEFAULT 0 CHECK (status IN (0,1)),
  progress    int NOT NULL DEFAULT 0,
  started_at  timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  PRIMARY KEY (user_id, content_id)
);

CREATE OR REPLACE VIEW edu.v_leaderboard AS
SELECT
  u.id,
  u.full_name,
  u.experience,
  DENSE_RANK() OVER (ORDER BY u.experience DESC, u.id ASC) AS place
FROM edu.users u;
