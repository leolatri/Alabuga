ALTER TABLE edu.users
  ADD COLUMN IF NOT EXISTS permission int NOT NULL DEFAULT 0;

UPDATE edu.users SET permission = 1 WHERE id = 1;
