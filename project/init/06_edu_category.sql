ALTER TABLE edu.content
  ADD COLUMN IF NOT EXISTS category varchar(50);

UPDATE edu.content
   SET category = COALESCE(category,
                           CASE WHEN type='branch' THEN 'Стандартная ветка' ELSE 'Классическая миссия' END)
 WHERE category IS NULL;
