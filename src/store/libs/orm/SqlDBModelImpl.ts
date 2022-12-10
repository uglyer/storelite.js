import {
  SqlDBExtends,
  SqlDBModel,
  SqlDBWhereConditionSelectList,
  SqlDBWhereConditionSelectOne,
} from '@/declaration/SqlDB';
import { SqlDBWhereConditionCommonSelectImpl } from '@/store/libs/orm/SqlDBWhereConditionCommonSelectImpl';

/**
 * SqlDBModel 模型实体 ORM 实现类
 * @author uglyer
 * @date 2022/11/13 0:01
 */
export class SqlDBModelImpl<T> implements SqlDBModel<T> {
  /**
   * SqlDBModel 模型实体 ORM 实现类
   * @param db 数据库对象
   * @param entity 使用装饰器的实例对象
   * @param tableName 模型对应的表名
   */
  constructor(
    protected db: SqlDBExtends,
    public readonly entity: T,
    public readonly tableName: string,
  ) {}

  /**
   * 通过指定键值查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param k
   * @param v
   */
  findOneBy<K extends keyof T, V extends T[K]>(k: K, v: V): T | null;
  /**
   * 通过指定键值查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param model
   */
  findOneBy(model: Partial<T>): T | null;
  findOneBy<K extends keyof T, V extends T[K]>(
    v1: K | Partial<T>,
    v2?: V,
  ): T | null {
    if (typeof v1 == 'object') {
      return this.selectOne().andEq(v1).do();
    }
    return this.selectOne()
      .andEq(v1, v2 as any)
      .do();
  }

  /**
   * 查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param id
   */
  findOneById(id: string | number): T | null {
    return this.selectOne()
      .andEq('id' as any, id as any)
      .do();
  }

  /**
   * 根据条件筛选数据(列表,所有字段)
   */
  select(): SqlDBWhereConditionSelectList<T>;
  /**
   * 根据条件筛选数据(列表,指定字段)
   */
  select(fields: Array<keyof T>): SqlDBWhereConditionSelectList<T>;
  /**
   * 根据条件筛选数据(列表,指定字段)
   */
  select(fields?: Array<keyof T>): SqlDBWhereConditionSelectList<T> {
    return new SqlDBWhereConditionCommonSelectImpl(
      this.db,
      this.entity,
      this.tableName,
      'list',
      fields ?? null,
    );
  }

  /**
   * 根据条件筛选一条记录(所有字段)
   */
  selectOne(): SqlDBWhereConditionSelectOne<T>;
  /**
   * 根据条件筛选一条记录(指定字段)
   */
  selectOne(fields: Array<keyof T>): SqlDBWhereConditionSelectOne<T>;

  /**
   * 根据条件筛选一条记录(指定字段)
   */
  selectOne(fields?: Array<keyof T>): SqlDBWhereConditionSelectOne<T> {
    return new SqlDBWhereConditionCommonSelectImpl(
      this.db,
      this.entity,
      this.tableName,
      'one',
      fields ?? null,
    );
  }
}
