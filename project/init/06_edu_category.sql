-- Добавляем человекочитаемый "тип/категорию" для отображения на фронте
ALTER TABLE edu.content
  ADD COLUMN IF NOT EXISTS category varchar(50);

-- Для старых данных проставим дефолты
UPDATE edu.content
   SET category = COALESCE(category,
                           CASE WHEN type='branch' THEN 'Стандартная ветка' ELSE 'Классическая миссия' END)
 WHERE category IS NULL;
