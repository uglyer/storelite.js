import { SqlDBWhereConditionBasicImpl } from '@/store/libs/orm/SqlDBWhereConditionBasicImpl';
import { SqlDB, SqlDBWhereConditionDelete } from '@/declaration/SqlDB';

/**
 * SqlDB Where 条件 删除 DSL 实现类
 * @author uglyer
 * @date 2022/12/12 20:28
 */
export class SqlDBWhereConditionDeleteImpl<T>
  extends SqlDBWhereConditionBasicImpl<T, SqlDBWhereConditionDeleteImpl<T>>
  implements SqlDBWhereConditionDelete<T>
{
  constructor(
    protected db: SqlDB,
    protected entity: T,
    protected tableName: string,
  ) {
    super();
  }

  /**
   * 获取C实例
   * @protected
   */
  protected getInstance(): SqlDBWhereConditionDeleteImpl<T> {
    return this;
  }

  /**
   * 执行删除语句
   */
  do(): number {
    let sql = this.toSql();
    if (sql == null) {
      throw Error('删除指令必须添加条件');
    }
    sql = `DELETE FROM ${this.tableName} WHERE ${sql}`;
    this.db.exec(sql);
    return -1;
  }
}
