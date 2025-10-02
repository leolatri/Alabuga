DO $$
DECLARE
    u               RECORD;
    br_count        int;
    mi_count        int;
    branch_type     text;
    mission_cat     text;
    mission_type    text;       br_id           int;
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
        IF (SELECT COUNT(*) FROM edu.artifacts) < 12 THEN
        INSERT INTO edu.artifacts (img, name, rarity)
        SELECT
            '/img/artifacts/a' || gs::text || '.png',
            'Артефакт #' || gs::text,
            CASE WHEN (gs % 4)=0 THEN 1 ELSE 0 END
        FROM generate_series(1,12) AS gs;
    END IF;

        FOR u IN SELECT id, full_name FROM edu.users LOOP
        br_count := 3 + (CASE WHEN random() < 0.5 THEN 0 ELSE 1 END);  
        FOR i IN 1..br_count LOOP
            branch_type := branch_types[1 + (floor(random()*array_length(branch_types,1)))::int];

            INSERT INTO edu.content (type, name, status, experience, description, duration, progress, "order", mana, parent_id, category)
            VALUES ('branch',
                    branch_type || ' — ветка ' || i || ' (' || u.full_name || ')',
                    0,
                    0,
                    'Автосгенерированная ветка для пользователя ' || u.full_name || '. Тип: ' || branch_type,
                    NULL, NULL,
                    i,                      0,
                    NULL,
                    branch_type)
            RETURNING id INTO br_id;

                        mi_count := 4 + (CASE WHEN random() < 0.5 THEN 0 ELSE 1 END);  
            FOR j IN 1..mi_count LOOP
                mission_cat := mission_categories[1 + (floor(random()*array_length(mission_categories,1)))::int];

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
                        40 + (random()*80)::int,                          'Автосгенерированная миссия. Категория: ' || mission_cat,
                        5 + (random()*20)::int,                           0,
                        j,                                                 5 + (random()*20)::int,                           br_id,
                        mission_cat)
                RETURNING id INTO j;

                                INSERT INTO edu.content_rewards (content_id, mana, experience)
                VALUES (j,
                        5 + (random()*20)::int,
                        40 + (random()*80)::int)
                ON CONFLICT (content_id) DO NOTHING;

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
