-- init/05_edu_permissions.sql
-- Добавляем признак прав пользователя в EDU-контуре
-- 0 = USER, 1 = ADMIN

ALTER TABLE edu.users
  ADD COLUMN IF NOT EXISTS permission int NOT NULL DEFAULT 0;

-- Для удобства проверки сделаем пользователя id=1 админом
UPDATE edu.users SET permission = 1 WHERE id = 1;
