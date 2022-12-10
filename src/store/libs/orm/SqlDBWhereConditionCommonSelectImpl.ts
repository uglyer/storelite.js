import {
  SqlDB,
  SqlDBWhereConditionSelectList,
  SqlDBWhereConditionSelectOne,
} from '@/declaration/SqlDB';
import { SqlDBWhereConditionBasicSelectImpl } from '@/store/libs/orm/SqlDBWhereConditionBasicSelectImpl';
import { EntityMetadata } from '@/store/libs/ioc/EntityMetadata';

/**
 * 数据筛选
 * @author uglyer
 * @date 2022/11/20 21:32
 */
export class SqlDBWhereConditionCommonSelectImpl<T>
  extends SqlDBWhereConditionBasicSelectImpl<
    T,
    SqlDBWhereConditionCommonSelectImpl<T>
  >
  implements SqlDBWhereConditionSelectList<T>, SqlDBWhereConditionSelectOne<T>
{
  /**
   * 缓存offset数量
   * @protected
   */
  protected cacheLimitOffset = 0;

  constructor(
    protected db: SqlDB,
    protected entity: T,
    protected tableName: string,
    protected type: 'one' | 'list',
    protected fields: Array<keyof T> | null,
  ) {
    super();
  }

  /**
   * 获取实例对象
   * @protected
   */
  protected getInstance(): SqlDBWhereConditionCommonSelectImpl<T> {
    return this;
  }

  /**
   * 限制记录数
   * @param count 需要多少条数据
   */
  limit(count: number): SqlDBWhereConditionCommonSelectImpl<T>;
  /**
   * 限制记录数
   * @param count 需要多少条数据
   * @param offset 过滤多少条数据
   */
  limit(count: number, offset: number): SqlDBWhereConditionCommonSelectImpl<T>;
  limit(v1: number, v2?: number): SqlDBWhereConditionCommonSelectImpl<T> {
    if (this.type != 'one') {
      return super.limit(v1, v2 as any);
    }
    super.limit(1, v2 as any);
    if (typeof v2 == 'number') {
      this.cacheLimitOffset = v2;
    }
    return this.getInstance();
  }

  /**
   * 执行查询语句
   */
  do(): T[];
  /**
   * 执行查询语句
   */
  do(): T | null;
  /**
   * 执行查询语句
   */
  do(): T[] | T | null {
    const sql = this.toSql();
    const result = this.db.exec(sql);
    if (this.type == 'one') {
      if (result.length == 0 || result[0].values.length == 0) {
        return null;
      }
      return EntityMetadata.toEntity(this.entity, result[0]);
    } else if (this.type == 'list') {
      if (result.length == 0 || result[0].values.length == 0) {
        return [];
      }
      return EntityMetadata.toEntities(this.entity, result[0]);
    } else {
      console.error('the type is not support yet', this.type);
    }
    return null as any;
  }

  protected toSql(): string {
    if (this.type == 'one') {
      if (this.cacheLimitOffset > 0) {
        super.limit(1, this.cacheLimitOffset);
      } else {
        super.limit(1);
      }
    }
    const conditionSql = super.toSql();
    const fields = this.fields
      ? this.fields.map((it) => `\`${it.toString()}\``).join(',')
      : '*';
    let sql = `SELECT ${fields}
               FROM ${this.tableName}`;
    if (conditionSql != null) {
      sql += ` ${conditionSql}`;
    }
    return sql;
  }
}
