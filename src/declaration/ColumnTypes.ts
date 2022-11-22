/**
 * 字段类型, 仅保留 sqlite 支持类型
 * @link https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
 * @author uglyer
 * @date 2022/11/22 22:14
 */

/**
 * Column types used for @PrimaryGeneratedColumn() decorator.
 */
export type PrimaryGeneratedColumnType =
  | 'int' // mysql, mssql, oracle, sqlite, sap
  | 'int2' // postgres, sqlite, cockroachdb
  | 'int8' // postgres, sqlite, cockroachdb
  | 'integer' // postgres, oracle, sqlite, mysql, cockroachdb, sap
  | 'tinyint' // mysql, mssql, sqlite, sap
  | 'smallint' // mysql, postgres, mssql, oracle, sqlite, cockroachdb, sap
  | 'mediumint' // mysql, sqlite
  | 'bigint' // mysql, postgres, mssql, sqlite, cockroachdb, sap
  | 'decimal' // mysql, postgres, mssql, sqlite, sap
  | 'numeric'; // postgres, mssql, sqlite, spanner

/**
 * Column types where precision and scale properties are used.
 */
export type WithPrecisionColumnType =
  | 'float' // mysql, mssql, oracle, sqlite
  | 'double' // mysql, sqlite
  | 'dec' // oracle, mssql, mysql
  | 'decimal' // mysql, postgres, mssql, sqlite
  | 'numeric' // postgres, mssql, sqlite, mysql
  | 'real' // mysql, postgres, mssql, oracle, sqlite, cockroachdb, sap
  | 'double precision' // postgres, oracle, sqlite, mysql, cockroachdb
  | 'datetime'; // mssql, mysql, sqlite

/**
 * Column types where column length is used.
 */
export type WithLengthColumnType =
  | 'varying character' // sqlite
  | 'character' // mysql, postgres, sqlite, cockroachdb
  | 'native character' // sqlite
  | 'varchar' // mysql, postgres, mssql, sqlite, cockroachdb
  | 'nchar' // mssql, oracle, sqlite, mysql, sap
  | 'nvarchar2'; // oracle, sqlite

/**
 * All other regular column types.
 */
export type SimpleColumnType =
  // numeric types
  | 'int2' // postgres, sqlite, cockroachdb
  | 'integer' // postgres, oracle, sqlite, cockroachdb
  | 'int8' // postgres, sqlite, cockroachdb
  | 'unsigned big int' // sqlite
  | 'float' // mysql, mssql, oracle, sqlite, sap

  // boolean types
  | 'boolean' // postgres, sqlite, mysql, cockroachdb

  // text/binary types
  | 'blob' // mysql, oracle, sqlite, cockroachdb, sap
  | 'text' // mysql, postgres, mssql, sqlite, cockroachdb, sap
  | 'clob' // oracle, sqlite, sap
  | 'date'; // mysql, postgres, mssql, oracle, sqlite, spanner

/**
 * Any column type column can be.
 */
export type ColumnType =
  | WithPrecisionColumnType
  | WithLengthColumnType
  | SimpleColumnType
  | BooleanConstructor
  | DateConstructor
  | NumberConstructor
  | StringConstructor;
