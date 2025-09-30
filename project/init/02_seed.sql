INSERT INTO ranks (id, name, description, required_experience, "order")
VALUES
 ('00000000-0000-0000-0000-000000000001','Новичок','Начальный ранг',0,1),
 ('00000000-0000-0000-0000-000000000002','Опытный','Средний ранг',100,2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, first_name, second_name, middle_name, role_model_id,
                   created_by, updated_by, rank_id, exp, mana)
VALUES ('11111111-1111-1111-1111-111111111111','HR','System',NULL,1,
        '11111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        '00000000-0000-0000-0000-000000000001',0,0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, first_name, second_name, middle_name, role_model_id,
                   created_by, updated_by, rank_id, exp, mana)
VALUES ('22222222-2222-2222-2222-222222222222','Иван','Иванов','Иванович',0,
        '11111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        '00000000-0000-0000-0000-000000000001',150,30)
ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, name)
VALUES ('33333333-3333-3333-3333-333333333333','Общие')
ON CONFLICT (id) DO NOTHING;

INSERT INTO store_items (id, name, description, price, quantity)
VALUES
 ('44444444-4444-4444-4444-444444444444','Футболка','Мерч проекта',1500,5),
 ('55555555-5555-5555-5555-555555555555','Стикерпак','Набор наклеек',300,50)
ON CONFLICT (id) DO NOTHING;
