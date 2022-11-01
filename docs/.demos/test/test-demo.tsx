/**
 * background: '#f6f7f9'
 */

import React from 'react';
// @ts-ignore
import initSqlJs from 'sql.js/dist/sql-wasm.js';
// @ts-ignore
import wasmUrl from 'sql.js/dist/sql-wasm.wasm';

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
}

init();

export default () => null;
