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
   * @param sql
   */
  findOne(sql: string): T | null;

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
   * 根据条件筛选数据(列表)
   */
  select(): SqlDBWhereConditionSelectList<T>;

  /**
   * 根据条件筛选一条记录
   */
  selectOne(): SqlDBWhereConditionSelectOne<T>;
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
    v: V,
  ): SqlDBBasicWhereCondition<T>;

  /**
   * 条件 全匹配
   */
  eq(model: Partial<T>): SqlDBBasicWhereCondition<T>;

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
}

/**
 * SqlDB Where 条件 DSL
 * @author uglyer
 * @date 2022/11/12 21:51
 */
export interface SqlDBBasicWhereConditionType<T, C> {
  /**
   * and 条件
   * @param handler
   */
  and(handler: (condition: SqlDBBasicWhereCondition<T>) => void): C;

  /**
   * or 条件
   * @param handler
   */
  or(handler: (condition: SqlDBBasicWhereCondition<T>) => void): C;
}

/**
 * SqlDB 记录数限制
 * @author uglyer
 * @date 2022/11/12 22:22
 */
export interface SqlDBLimit<C> {
  /**
   * 限制记录数
   * @param offset 过滤多少条数据
   * @param count 需要多少条数据
   */
  limit(offset: number, count: number): C;
  /**
   * 限制记录数
   * @param count 需要多少条数据
   */
  limit(count: number): C;
}

/**
 * SqlDB Where 条件 DSL
 * @author uglyer
 * @date 2022/11/12 21:51
 */
export interface SqlDBWhereConditionSelectList<T>
  extends SqlDBBasicWhereConditionType<T, SqlDBWhereConditionSelectList<T>> {
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
  extends SqlDBBasicWhereConditionType<T, SqlDBWhereConditionSelectOne<T>> {
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
  value: Array<Array<any>>;
}
