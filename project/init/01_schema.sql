CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

-- RANKS
CREATE TABLE IF NOT EXISTS ranks (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  description         text,
  required_experience int  NOT NULL DEFAULT 0,
  "order"             int  NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS ranks_order_uq ON ranks("order");

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name    text,
  second_name   text,
  middle_name   text,
  role_model_id smallint NOT NULL DEFAULT 0 CHECK (role_model_id IN (0,1)),
  created_at    timestamptz NOT NULL DEFAULT now(),
  created_by    uuid NOT NULL,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  updated_by    uuid NOT NULL,
  rank_id       uuid NOT NULL REFERENCES ranks(id) ON DELETE RESTRICT,
  exp           int  NOT NULL DEFAULT 0,
  mana          int  NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS users_rank_id_idx ON users(rank_id);

DROP TRIGGER IF EXISTS users_set_updated_at ON users;
CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ARTIFACTS
CREATE TABLE IF NOT EXISTS artifacts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  image       bytea NOT NULL,
  description text,
  rarity      text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
DROP TRIGGER IF EXISTS artifacts_set_updated_at ON artifacts;
CREATE TRIGGER artifacts_set_updated_at
BEFORE UPDATE ON artifacts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- USER_ARTIFACTS
CREATE TABLE IF NOT EXISTS user_artifacts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  artifact_id  uuid NOT NULL REFERENCES artifacts(id) ON DELETE CASCADE,
  acquired_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, artifact_id)
);
CREATE INDEX IF NOT EXISTS user_artifacts_user_idx ON user_artifacts(user_id);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL
);

-- MISSIONS
CREATE TABLE IF NOT EXISTS missions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL,
  description      text,
  exp_gain         int  NOT NULL DEFAULT 0,
  mana_gain        int  NOT NULL DEFAULT 0,
  artifact_id      uuid REFERENCES artifacts(id) ON DELETE SET NULL,
  category_id      uuid REFERENCES categories(id) ON DELETE SET NULL,
  required_rank_id uuid REFERENCES ranks(id) ON DELETE SET NULL,
  is_published     boolean NOT NULL DEFAULT false,
  image            bytea,
  created_by       uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS missions_pub_idx ON missions(is_published);
CREATE INDEX IF NOT EXISTS missions_category_idx ON missions(category_id);

DROP TRIGGER IF EXISTS missions_set_updated_at ON missions;
CREATE TRIGGER missions_set_updated_at
BEFORE UPDATE ON missions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- MISSION_ORGANIZERS
CREATE TABLE IF NOT EXISTS mission_organizers (
  mission_id uuid NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  PRIMARY KEY (mission_id, user_id)
);

-- COMPETITIONS
CREATE TABLE IF NOT EXISTS competitions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text
);

-- MISSIONS_COMPETITION
CREATE TABLE IF NOT EXISTS missions_competition (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id       uuid NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  mission_id           uuid NOT NULL REFERENCES missions(id)     ON DELETE CASCADE,
  competition_exp_gain int  NOT NULL DEFAULT 0,
  UNIQUE (mission_id, competition_id)
);
CREATE INDEX IF NOT EXISTS missions_competition_mission_idx ON missions_competition(mission_id);

-- USER_COMPETENCIES
CREATE TABLE IF NOT EXISTS user_competencies (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES users(id)        ON DELETE CASCADE,
  competition_id  uuid NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  exp             int  NOT NULL DEFAULT 0,
  UNIQUE (user_id, competition_id)
);

-- JOURNAL
CREATE TABLE IF NOT EXISTS journal (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  payload     jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS journal_user_idx ON journal(user_id);

-- STORE_ITEMS
CREATE TABLE IF NOT EXISTS store_items (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image        bytea,
  name         text NOT NULL,
  description  text,
  price        int  NOT NULL CHECK (price >= 0),
  is_available boolean NOT NULL DEFAULT true,
  is_deleted   boolean NOT NULL DEFAULT false,
  quantity     int  NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);
DROP TRIGGER IF EXISTS store_items_set_updated_at ON store_items;
CREATE TRIGGER store_items_set_updated_at
BEFORE UPDATE ON store_items
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RANK_REQUIRED_COMPETENCIES
CREATE TABLE IF NOT EXISTS rank_required_competencies (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competency_id  uuid NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  rank_id        uuid NOT NULL REFERENCES ranks(id)        ON DELETE CASCADE,
  required_exp   int  NOT NULL DEFAULT 0,
  UNIQUE (competency_id, rank_id)
);