import { SqlDBBasicSelect } from '@/declaration/SqlDB';
import { SqlDBWhereConditionBasicImpl } from '@/store/libs/orm/SqlDBWhereConditionBasicImpl';

/**
 * 筛选语句基类
 * @author uglyer
 * @date 2022/11/17 22:20
 */
export abstract class SqlDBWhereConditionBasicSelectImpl<T, C>
  extends SqlDBWhereConditionBasicImpl<T, C>
  implements SqlDBBasicSelect<T, C>
{
  protected sqlOrderBy: string | null = null;
  protected sqlGroupBy: string | null = null;
  protected sqlLimit: string | null = null;

  /**
   * 排序
   * @param k
   * @param order
   */
  orderBy<K extends keyof T>(k: K | K[], order: 'ASC' | 'DESC'): C {
    if (Array.isArray(k)) {
      this.sqlOrderBy = `ORDER BY ${k
        .map((it) => `\`${it.toString()}\``)
        .join(',')} DESC`;
    } else {
      this.sqlOrderBy = `ORDER BY \`${k.toString()}\` DESC`;
    }
    return this.getInstance();
  }

  /**
   * 限制记录数
   * @param count 需要多少条数据
   */
  limit(count: number): C;
  /**
   * 限制记录数
   * @param count 需要多少条数据
   * @param offset 过滤多少条数据
   */
  limit(count: number, offset: number): C;
  limit(v1: number, v2?: number): C {
    if (typeof v2 == 'number') {
      this.sqlLimit = `LIMIT ${v1} OFFSET ${v2}`;
    } else {
      this.sqlLimit = `LIMIT ${v1}`;
    }
    return this.getInstance();
  }

  /**
   * 分组
   * @param k
   */
  groupBy<K extends keyof T>(k: K | K[]): C {
    if (Array.isArray(k)) {
      this.sqlGroupBy = `GROUP BY ${k
        .map((it) => `\`${it.toString()}\``)
        .join(',')}`;
    } else {
      this.sqlGroupBy = `GROUP BY \`${k.toString()}\``;
    }
    return this.getInstance();
  }

  /**
   * 转为 sql 语句
   * @protected
   */
  protected toSql(): string | null {
    let sql = super.toSql() ?? '';
    if (sql.length > 0) {
      sql = `WHERE ${sql}`;
    }
    if (this.sqlGroupBy !== null) {
      sql += ` ${this.sqlGroupBy}`;
    }
    if (this.sqlOrderBy !== null) {
      sql += ` ${this.sqlOrderBy}`;
    }
    if (this.sqlLimit !== null) {
      sql += ` ${this.sqlLimit}`;
    }
    if (sql == '') {
      return null;
    }
    return sql;
  }
}
