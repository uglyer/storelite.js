/**
 * SqlDB
 * @author uglyer
 * @date 2022/11/8 22:50
 */
export interface SqlDB {
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
