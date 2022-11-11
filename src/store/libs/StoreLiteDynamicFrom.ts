import { SqlDB } from '@/declaration/SqlDB';

/**
 * StoreLiteDynamicFrom
 * @author uglyer
 * @date 2022/11/9 22:59
 */
export class StoreLiteDynamicFrom {
  constructor(protected db: SqlDB) {}

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
}
