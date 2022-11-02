-- https://www.sqlite.org/json1.html#jmini
-- https://tirkarthi.github.io/programming/2022/02/26/sqlite-json-improvements.html

DROP TABLE IF EXISTS user;
create table user
(
  id        integer primary key,
  name      text,
  interests json
);
insert into user
values (null, "John", '{
  "likes": [
    "skating",
    "reading",
    "swimming"
  ],
  "dislikes": [
    "cooking"
  ]
}');
insert into user
values (null, "Kate", '{
  "likes": [
    "reading",
    "swimming"
  ],
  "dislikes": [
    "skating"
  ]
}');
insert into user
values (null, "Jim", '{
  "likes": [
    "reading",
    "swimming"
  ],
  "dislikes": [
    "cooking"
  ]
}');
insert into user
values (null, "Jim", '{
  "test": 1
}');


select id, name, interests
from user;

-- test节点匹配
select id, name, interests
from user
where interests - > '$.test' ->>'$' = 1;

select id, name, interests
from user
where interests - > '$.likes' ->>'$[1]' = 'swimming';

-- 数组第一个匹配
select id, name, interests
from user
where interests - > '$.likes' ->>'$[0]' = 'skating';

-- 数组成员匹配
select *
from user, json_each(interests - > '$.likes')
where json_each.value = "swimming";

select id, name, interests
from user;

-- 增量更新第一个节点下的 json
update user
set interests = json_set(interests, "$.dislikes", json_array("test"))
where id in (select user.id from user, json_each(interests - > '$.likes') where json_each.value = "swimming");

-- 给 dislikes 成员追加一个 new 字符串成员 {"likes": ["reading", "swimming"], "dislikes": ["cooking"]}
update user
set interests = json_set(interests, "$.dislikes", json_set(json_extract(interests, '$.dislikes'), '$[#]', 'new'))
where id in (select user.id from user, json_each(interests - > '$.likes') where json_each.value = "swimming");

-- 筛选 json 顶层所有的键
select key from user,json_each(interests) group by key

-- 给 json 字段创建视图
CREATE VIEW USER_VIEW AS
SELECT user.id as id, json_extract(interests, '$.test')     as test,
       json_extract(interests, '$.likes')    as likes,
       json_extract(interests, '$.dislikes') as dislikes
FROM user where name = 'Jim';

-- 对视图中的嵌套 json 操作
select USER_VIEW.id,json_each.key from USER_VIEW,json_each(likes) where likes is not null and json_each.value = 'swimming'


