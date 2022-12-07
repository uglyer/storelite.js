/**
 * background: '#f6f7f9'
 */

import React from 'react';
// @ts-ignore
import initSqlJs from 'sql.js/dist/sql-wasm.js';
// @ts-ignore
import wasmUrl from 'sql.js/dist/sql-wasm.wasm';
// @ts-ignore
import json from './test.json';
import { Column } from '../../../src/decorator/Column';
import StoreLite from '../../../src/StoreLite';
import { StoreLiteDynamicForm } from '../../../src/store/libs/StoreLiteDynamicForm';

console.log(wasmUrl);

async function init() {
  const SQL = await initSqlJs({
    locateFile: (file: string) => {
      console.log(file);
      return wasmUrl;
    },
  });
  // Create a database
  const db = new SQL.Database();
  // NOTE: You can also use new SQL.Database(data) where
  // data is an Uint8Array representing an SQLite database file

  // Execute a single SQL string that contains multiple statements
  let sqlstr =
    "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";
  db.exec(sqlstr); // Run the query without returning anything
  const res = db.exec('SELECT * FROM hello');
  console.log(res);

  const tableSql = `
    create table store_data
    (
      id         integer not null primary key,
      table_name char,
      content    json
    )`;
  db.exec(tableSql);
  db.create_function(
    'js_store_data_change',
    (type: number, tableName: string, id: number) => {
      // console.log("onStoreDataChange",data);
    },
  );
  db.exec(`
  CREATE TRIGGER "main"."store_data_change_trigger"
  AFTER INSERT
  ON "store_data"
  WHEN new.table_name = 'panoramas'
  BEGIN
    -- Type the SQL Here.
    select js_store_data_change(1,'panoramas',new.id) as "";
  END;
  `);
  const insertSql = json.panoramaList
    .map((it: any) => {
      return `insert into store_data
              values (null, "panoramas", '${JSON.stringify(it)}');`;
    })
    .join(';');
  console.time('insert');
  const count = 100;
  for (let i = 0; i < count; i++) {
    db.exec(insertSql);
  }
  console.timeEnd('insert');

  console.time('query');
  const storeData = db.exec(`select *
                             from store_data`);
  console.timeEnd('query');
  console.log(storeData);
  console.time('query');
  console.log(
    db.exec(`select key
             from store_data, json_each(content)
             group by key`),
  );
  console.timeEnd('query');
  // ['disabled', 'height', 'id', 'position', 'rotation', 'url', 'visiblePanoramas']
  const createView = `
CREATE VIEW panorama_view AS
SELECT store_data.id as uuid, json_extract(content, '$.disabled')     as disabled,
       json_extract(content, '$.height')    as likes,
       json_extract(content, '$.id') as id,
       json_extract(content, '$.position') as position,
       json_extract(content, '$.rotation') as rotation,
       json_extract(content, '$.url') as url,
       json_extract(content, '$.visiblePanoramas') as visiblePanoramas
FROM store_data where table_name = 'panoramas';
  `;
  db.exec(createView);
  console.time('query in view');
  const viewResult = db.exec(`select *
                              from panorama_view `);
  console.timeEnd('query in view');
  console.log(viewResult);
  console.time('find in table');
  db.exec(`select count(*)
           from store_data
           where content like '%93c3cd8e9f78ea1c3be8832c3079812c84602baa5ffd69840a785473946c1321%'`);
  console.timeEnd('find in table');
  console.time('find in view');
  db.exec(`select count(*)
           from panorama_view
           where url like '%93c3cd8e9f78ea1c3be8832c3079812c84602baa5ffd69840a785473946c1321%'`);
  console.timeEnd('find in view');
  // @ts-ignore
  window['db'] = db;
  // 8.9k 数据
  // 搜索 100
  // json view like 数据 60.516357421875 ms
  // 全表搜索
  // json view url like 558.619873046875 ms
  // store_table content like 363.0849609375 ms
}

init();

class TestModel {
  @Column('text')
  id: string = '';
  @Column('varchar')
  str: string | null = null;
  @Column('boolean')
  bool: boolean = false;
  @Column('integer')
  int: number = 0;
  @Column('float')
  float: number = 0;
  @Column('double')
  double: number = 0;
  @Column('json')
  test: { x: string } = { x: 'x' };
}

async function test() {
  const db = await StoreLite.getDB();
  const from = new StoreLiteDynamicForm<{ model: TestModel }, {}>(db, {
    dictionary: { model: new TestModel() },
    list: {},
  });
  from.setDictionary('model', {
    id: 'x',
    str: 'str',
    bool: true,
    int: 1,
    float: 1.1,
    double: Math.PI,
    test: { x: 'json-data' },
  });
  from.setDictionary('model', {
    id: 'update',
    str: 'str',
    bool: true,
    int: 1,
    float: 1.1,
    double: Math.PI,
    test: { x: 'json-data' },
  });
  console.log('getDictionary model', from.getDictionary('model'));
}

test();

export default () => null;
