-- Немного данных для проверки
INSERT INTO edu.users (full_name, mana, experience) VALUES
  ('Иван Иванов', 30, 150),
  ('Мария Петрова', 20, 120),
  ('Алексей Смирнов', 10, 80)
ON CONFLICT DO NOTHING;

INSERT INTO edu.artifacts (img, name, rarity) VALUES
  ('/img/a1.png','Первый шаг',0),
  ('/img/a2.png','Редкий перк',1)
ON CONFLICT DO NOTHING;

-- Ветка + 2 миссии
WITH b AS (
  INSERT INTO edu.content (type,name,status,experience,description,duration,progress,"order",mana,parent_id)
  VALUES ('branch','Основы',0,0,'Базовая ветка',NULL,NULL,1,0,NULL)
  RETURNING id
)
INSERT INTO edu.content (type,name,status,experience,description,duration,progress,"order",mana,parent_id)
SELECT 'lesson','Введение',0,50,'Первая миссия',10,0,1,5,id FROM b
UNION ALL
SELECT 'quiz','Тест по введению',0,70,'Викторина',7,0,2,10,id FROM b;

-- Награды
INSERT INTO edu.content_rewards (content_id, mana, experience)
SELECT id, mana, experience FROM edu.content WHERE type <> 'branch'
ON CONFLICT (content_id) DO NOTHING;

INSERT INTO edu.content_reward_artifacts (content_id, artifact_id)
SELECT c.id, a.id FROM edu.content c
JOIN edu.artifacts a ON a.name='Первый шаг'
WHERE c.name='Введение'
ON CONFLICT DO NOTHING;

-- Прогресс первому пользователю
INSERT INTO edu.user_progress (user_id, content_id, status, progress)
SELECT 1, id, 0, 0 FROM edu.content WHERE type <> 'branch'
ON CONFLICT DO NOTHING;

-- Пара артефактов у первого пользователя
INSERT INTO edu.user_artifacts (user_id, artifact_id)
VALUES (1,1),(1,2)
ON CONFLICT DO NOTHING;
