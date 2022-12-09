/**
 * SqlDB
 * @author uglyer
 * @date 2022/11/8 22:50
 */
export interface SqlDB extends Object {
  /**
   * 执行语句
   * @param sql
   */
  exec(sql: string): SqlDBExecResults;

  /**
   * 创建函数
   * @param funcName
   * @param handler
   */
  create_function<T>(funcName: string, handler: T): void;
}

/**
 * SqlDB 扩展接口
 * @author uglyer
 * @date 2022/11/11 23:19
 */
export interface SqlDBExtends extends SqlDB {
  /**
   * 是否为 StoreLite 扩展对象
   */
  isStoreLite(): boolean;

  /**
   * 查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param sql
   */
  findOne<T>(sql: string): T | null;

  /**
   * 获取模型操作对象
   * @param entity
   */
  getModel<T>(entity: T): SqlDBModel<T>;
}

/**
 * SqlDBModel
 * @author uglyer
 * @date 2022/11/11 23:32
 */
export interface SqlDBModel<T> {
  /**
   * 模型对应的表名
   */
  tableName: string;

  /**
   * 查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param id
   */
  findOneById(id: string | number): T | null;

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

  /**
   * 根据条件筛选数据(列表,所有字段)
   */
  select(): SqlDBWhereConditionSelectList<T>;

  /**
   * 根据条件筛选数据(列表,指定字段)
   */
  select(fields: Array<keyof T>): SqlDBWhereConditionSelectList<T>;

  /**
   * 根据条件筛选一条记录(所有字段)
   */
  selectOne(): SqlDBWhereConditionSelectOne<T>;

  /**
   * 根据条件筛选一条记录(指定字段)
   */
  selectOne(fields: Array<keyof T>): SqlDBWhereConditionSelectOne<T>;
}

/**
 * SqlDB Where 条件 DSL
 * @author uglyer
 * @date 2022/11/12 22:22
 */
export interface SqlDBBasicWhereCondition<T> {
  /**
   * 条件 全匹配
   * @param k
   * @param v
   */
  eq<K extends keyof T, V extends T[K]>(
    k: K,
    v: V | null,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 全匹配
   */
  eq(model: Partial<T>): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 为空
   * @param k
   */
  isNull<K extends keyof T>(k: K): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 不匹配
   * @param k
   * @param v
   */
  notEq<K extends keyof T, V extends T[K]>(
    k: K,
    v: V | null,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 不匹配
   */
  notEq(model: Partial<T>): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 不为空
   * @param k
   */
  notNull<K extends keyof T>(k: K): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 大于
   * @param k
   * @param v
   */
  moreThan<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 大于或等于
   * @param k
   * @param v
   */
  moreThanOrEq<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 小于
   * @param k
   * @param v
   */
  lessThan<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 小于或等于
   * @param k
   * @param v
   */
  lessThanOrEq<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 小于或等于
   * @param k
   * @param start
   * @param end
   */
  betweenAnd<K extends keyof T, V extends T[K]>(
    k: K,
    start: V,
    end: V,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 模糊匹配(需要自行传递匹配符)
   * @param k
   * @param v
   */
  like<K extends keyof T, V extends T[K]>(
    k: K,
    v: V,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  in<K extends keyof T, V extends T[K]>(
    k: K,
    list: V[],
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  notIn<K extends keyof T, V extends T[K]>(
    k: K,
    list: V[],
  ): SqlDBBasicWhereCondition<T>;
}

/**
 * SqlDB Where 条件 DSL
 * @author uglyer
 * @date 2022/11/12 21:51
 */
export interface SqlDBBasicWhereConditionType<T, C> {
  /**
   * and 条件
   * @param handler default is and
   */
  and(
    handler: (condition: SqlDBBasicWhereCondition<T>) => 'OR' | 'AND' | void,
  ): C;

  /**
   * or 条件
   * @param handler default is or
   */
  or(
    handler: (condition: SqlDBBasicWhereCondition<T>) => 'OR' | 'AND' | void,
  ): C;

  /**
   * 条件 全匹配
   * @param k
   * @param v
   */
  andEq<K extends keyof T, V extends T[K]>(k: K, v: V | null): C;

  /**
   * 条件 全匹配
   */
  andEq(model: Partial<T>): C;

  /**
   * 条件 为空
   * @param k
   */
  andIsNull<K extends keyof T>(k: K): C;

  /**
   * 条件 不匹配
   * @param k
   * @param v
   */
  andNotEq<K extends keyof T, V extends T[K]>(k: K, v: V | null): C;

  /**
   * 条件 不匹配
   */
  andNotEq(model: Partial<T>): C;

  /**
   * 条件 不为空
   * @param k
   */
  andNotNull<K extends keyof T>(k: K): C;

  /**
   * 条件 大于
   * @param k
   * @param v
   */
  andMoreThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 大于或等于
   * @param k
   * @param v
   */
  andMoreThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 小于
   * @param k
   * @param v
   */
  andLessThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 小于或等于
   * @param k
   * @param v
   */
  andLessThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 小于或等于
   * @param k
   * @param start
   * @param end
   */
  andBetweenAnd<K extends keyof T, V extends T[K]>(k: K, start: V, end: V): C;

  /**
   * 条件 模糊匹配(需要自行传递匹配符)
   * @param k
   * @param v
   */
  andLike<K extends keyof T, V extends T[K]>(k: K, v: V): C;

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  andIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C;

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  andNotIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C;

  /**
   * 条件 全匹配
   * @param k
   * @param v
   */
  orEq<K extends keyof T, V extends T[K]>(k: K, v: V | null): C;

  /**
   * 条件 全匹配
   */
  orEq(model: Partial<T>): C;

  /**
   * 条件 为空
   * @param k
   */
  orIsNull<K extends keyof T>(k: K): C;

  /**
   * 条件 不匹配
   * @param k
   * @param v
   */
  orNotEq<K extends keyof T, V extends T[K]>(k: K, v: V | null): C;

  /**
   * 条件 不匹配
   */
  orNotEq(model: Partial<T>): C;

  /**
   * 条件 不为空
   * @param k
   */
  orNotNull<K extends keyof T>(k: K): C;

  /**
   * 条件 大于
   * @param k
   * @param v
   */
  orMoreThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 大于或等于
   * @param k
   * @param v
   */
  orMoreThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 小于
   * @param k
   * @param v
   */
  orLessThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 小于或等于
   * @param k
   * @param v
   */
  orLessThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C;

  /**
   * 条件 小于或等于
   * @param k
   * @param start
   * @param end
   */
  orBetweenAnd<K extends keyof T, V extends T[K]>(k: K, start: V, end: V): C;

  /**
   * 条件 模糊匹配(需要自行传递匹配符)
   * @param k
   * @param v
   */
  orLike<K extends keyof T, V extends T[K]>(k: K, v: V): C;

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  orIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C;

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  orNotIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C;
}

/**
 * SqlDB 排序字句
 * @author uglyer
 * @date 2022/11/12 22:22
 */
export interface SqlDBOrder<T, C> {
  /**
   * 排序
   * @param k
   * @param order
   */
  orderBy<K extends keyof T>(k: K | K[], order: 'ASC' | 'DESC'): C;
}

/**
 * SqlDB 分组字句
 * @author uglyer
 * @date 2022/11/12 22:22
 */
export interface SqlDBGroup<T, C> {
  /**
   * 分组
   * @param k
   */
  groupBy<K extends keyof T>(k: K | K[]): C;
}

/**
 * SqlDB 记录数限制
 * @author uglyer
 * @date 2022/11/12 22:22
 */
export interface SqlDBLimit<C> {
  /**
   * 限制记录数
   * @param count 需要多少条数据
   * @param offset 过滤多少条数据
   */
  limit(count: number, offset: number): C;

  /**
   * 限制记录数
   * @param count 需要多少条数据
   */
  limit(count: number): C;
}

/**
 * SqlDB 查询语句基类
 * @author uglyer
 * @date 2022/11/16 20:05
 */
export interface SqlDBBasicSelect<T, C>
  extends SqlDBBasicWhereConditionType<T, C>,
    SqlDBOrder<T, C>,
    SqlDBLimit<C>,
    SqlDBGroup<T, C> {}

/**
 * SqlDB Where 条件 DSL
 * @author uglyer
 * @date 2022/11/12 21:51
 */
export interface SqlDBWhereConditionSelectList<T>
  extends SqlDBBasicSelect<T, SqlDBWhereConditionSelectList<T>> {
  /**
   * 执行查询语句
   */
  do(): T[];
}

/**
 * SqlDB Where 条件 DSL
 * @author uglyer
 * @date 2022/11/12 21:51
 */
export interface SqlDBWhereConditionSelectOne<T>
  extends SqlDBBasicSelect<T, SqlDBWhereConditionSelectOne<T>> {
  /**
   * 执行查询语句
   */
  do(): T | null;
}

/**
 * SqlDB 执行结果集合
 * @author uglyer
 * @date 2022/11/8 22:51
 */
export interface SqlDBExecResults extends Array<SqlDBExecResult> {
  /**
   * 最后一个语句执行结果下标
   */
  lastIndex: number;
  /**
   * 最后一个语句执行结果
   */
  lastItem: SqlDBExecResult | null;
}

/**
 * SqlDB 执行结果
 * @author uglyer
 * @date 2022/11/8 22:49
 */
export interface SqlDBExecResult {
  /**
   * 字段名
   */
  columns: Array<string>;
  /**
   * 记录值
   */
  values: Array<Array<any>>;
}

/**
 * 基础类型
 */
export type BaseType = string | number | boolean | null;

/**
 * sql 指令
 */
export type SqlDBInstruction =
  | 'eq'
  | 'neq'
  | 'in'
  | 'not-in'
  | 'like'
  | 'between-and'
  | 'less-than-or-eq'
  | 'less-than'
  | 'more-than-or-eq'
  | 'more-than';
