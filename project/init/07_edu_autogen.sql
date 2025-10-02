DO $$
DECLARE
    u               RECORD;
    br_count        int;
    mi_count        int;
    branch_type     text;
    mission_cat     text;
    mission_type    text;   -- совместимость с CHECK(type) в БД
    br_id           int;
    i               int;
    j               int;

    branch_types text[] := ARRAY[
        'Блогерская',
        'Документация',
        'Онбординг',
        'Процессы'
    ];

    mission_categories text[] := ARRAY[
        'Квесты — онлайн',
        'Квесты — офлайн',
        'Рекрутинг',
        'Лекторий',
        'Симулятор'
    ];
BEGIN
    -- 0) Создадим артефакты, если их мало
    IF (SELECT COUNT(*) FROM edu.artifacts) < 12 THEN
        INSERT INTO edu.artifacts (img, name, rarity)
        SELECT
            '/img/artifacts/a' || gs::text || '.png',
            'Артефакт #' || gs::text,
            CASE WHEN (gs % 4)=0 THEN 1 ELSE 0 END
        FROM generate_series(1,12) AS gs;
    END IF;

    -- 1) Для каждого пользователя создаём 3-4 ветки
    FOR u IN SELECT id, full_name FROM edu.users LOOP
        br_count := 3 + (CASE WHEN random() < 0.5 THEN 0 ELSE 1 END);  -- 3 или 4

        FOR i IN 1..br_count LOOP
            branch_type := branch_types[1 + (floor(random()*array_length(branch_types,1)))::int];

            INSERT INTO edu.content (type, name, status, experience, description, duration, progress, "order", mana, parent_id, category)
            VALUES ('branch',
                    branch_type || ' — ветка ' || i || ' (' || u.full_name || ')',
                    0,
                    0,
                    'Автосгенерированная ветка для пользователя ' || u.full_name || '. Тип: ' || branch_type,
                    NULL, NULL,
                    i,  -- порядок веток у пользователя
                    0,
                    NULL,
                    branch_type)
            RETURNING id INTO br_id;

            -- 2) На каждую ветку 4-5 миссий
            mi_count := 4 + (CASE WHEN random() < 0.5 THEN 0 ELSE 1 END);  -- 4 или 5

            FOR j IN 1..mi_count LOOP
                mission_cat := mission_categories[1 + (floor(random()*array_length(mission_categories,1)))::int];

                -- Соотнесём "категорию" с техническим type (чтобы не нарушать CHECK в колонке type)
                -- lesson -> Лекторий, quiz -> Симулятор, practice -> Рекрутинг/Квесты, project -> Квесты
                mission_type :=
                    CASE
                        WHEN mission_cat = 'Лекторий' THEN 'lesson'
                        WHEN mission_cat = 'Симулятор' THEN 'quiz'
                        WHEN mission_cat = 'Рекрутинг' THEN 'practice'
                        WHEN mission_cat LIKE 'Квесты%' THEN (CASE WHEN random()<0.5 THEN 'practice' ELSE 'project' END)
                        ELSE 'practice'
                    END;

                INSERT INTO edu.content (type, name, status, experience, description, duration, progress, "order", mana, parent_id, category)
                VALUES (mission_type,
                        mission_cat || ' — миссия ' || j,
                        0,
                        40 + (random()*80)::int,  -- 40..120 XP
                        'Автосгенерированная миссия. Категория: ' || mission_cat,
                        5 + (random()*20)::int,   -- 5..25 минут
                        0,
                        j,                         -- порядок миссий в ветке
                        5 + (random()*20)::int,   -- 5..25 маны
                        br_id,
                        mission_cat)
                RETURNING id INTO j;

                -- Награды по миссии
                INSERT INTO edu.content_rewards (content_id, mana, experience)
                VALUES (j,
                        5 + (random()*20)::int,
                        40 + (random()*80)::int)
                ON CONFLICT (content_id) DO NOTHING;

                -- Привяжем артефакт к каждой второй миссии
                IF (j % 2) = 0 THEN
                    INSERT INTO edu.content_reward_artifacts (content_id, artifact_id)
                    SELECT j, a.id
                    FROM edu.artifacts a
                    ORDER BY random()
                    LIMIT 1
                    ON CONFLICT DO NOTHING;
                END IF;
            END LOOP;
        END LOOP;
    END LOOP;
END$$;
