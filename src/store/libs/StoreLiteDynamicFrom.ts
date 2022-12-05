import { SqlDB, SqlDBExtends } from '@/declaration/SqlDB';
import { EntityMetadata } from '@/store/libs/ioc/EntityMetadata';
import { EntityColumnTypes } from '@/declaration/EntityColumnTypes';

/**
 * 动态表单
 * 单表维护数据, 自动创建视图用于查询
 * @author uglyer
 * @date 2022/11/9 22:59
 */
export class StoreLiteDynamicFrom<
  D = {},
  L = { [key: string]: { id: string } },
> {
  /**
   * 字典表名
   */
  static DICTIONARY_TABLE_NAME = 'dictionary';

  constructor(
    protected db: SqlDBExtends,
    protected entities: { dictionary: D; list: L },
  ) {
    this.initDB();
  }

  /**
   * 初始化数据库
   * 执行建表
   * @protected
   */
  protected initDB() {
    const createTableSql = `
      create table if not exists store_lite_data
      (
        id
        integer
        not
        null
        primary
        key,
        table_name
        char,
        content
        json
      )`;
    this.db.exec(createTableSql);
    const createIndexSql = `
      create index store_lite_data_id_table_name_content_index on store_lite_data (id, table_name, content);
    `;
    this.db.exec(createIndexSql);
  }

  /**
   * 字典视图名称
   * @param key
   * @protected
   */
  protected dictionaryViewName(key: string): string {
    return `DICTIONARY_${key.toUpperCase()}_VIEW`;
  }

  /**
   * 创建视图
   * @param tableName
   * @param columns
   * @protected
   */
  protected createView(tableName: string, columns: EntityColumnTypes[]) {
    const columnSql = columns
      .map(
        (it) => `json_extract(content, '$.${it.fieldName}') as ${it.fieldName}`,
      )
      .join(',');
    const sql = `CREATE VIEW ${tableName} AS
SELECT store_lite_data.id as _id, ${columnSql}
FROM store_lite_data where table_name = '${tableName}';`;
    this.db.exec(sql);
  }

  /**
   * 初始化视图
   * @protected
   */
  protected initView() {
    const { dictionary, list } = this.entities;
    const dictionaryKeys = Object.keys(dictionary);
    for (let i = 0; i < dictionaryKeys.length; i++) {
      const key = dictionaryKeys[i];
      // @ts-ignore
      const obj = dictionary[key];
      const column = EntityMetadata.getColumns(obj);
      if (column == null) {
        throw Error(`get entity metadata error:${obj.toString()}`);
      }
      if (column.length == 0) {
        throw Error(`get entity metadata size is zero:${obj.toString()}`);
      }
      const tableName = this.dictionaryViewName(key);
      this.createView(tableName, column);
    }
  }
}
