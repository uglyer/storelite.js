import {
  SqlDBExtends,
  SqlDBModel,
  SqlDBWhereConditionSelectList,
  SqlDBWhereConditionSelectOne,
} from '@/declaration/SqlDB';

/**
 * SqlDBModel 模型实体 ORM 实现类
 * @author uglyer
 * @date 2022/11/13 0:01
 */
export class SqlDBModelImpl<T> implements SqlDBModel<T> {
  /**
   * SqlDBModel 模型实体 ORM 实现类
   * @param db 数据库对象
   * @param tableName 模型对应的表名
   */
  constructor(protected db: SqlDBExtends, public tableName: string) {}

  /**
   * 查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param sql
   */
  findOne(sql: string): T | null {
    return undefined;
  }

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
  findOneBy(...args: any[]): T | null {
    return undefined;
  }

  /**
   * 查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param id
   */
  findOneById(id: string | number): T | null {
    return undefined;
  }

  /**
   * 根据条件筛选数据(列表)
   */
  select(): SqlDBWhereConditionSelectList<T> {
    return undefined;
  }

  /**
   * 根据条件筛选一条记录
   */
  selectOne(): SqlDBWhereConditionSelectOne<T> {
    return undefined;
  }
}
