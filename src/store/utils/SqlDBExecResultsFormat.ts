import { SqlDBExecResult } from '@/declaration/SqlDB';

/**
 * sql 执行结果格式化工具
 * @author uglyer
 * @date 2022/12/7 19:04
 */
export class SqlDBExecResultsFormat {
  /**
   * 转换为实体类（多个）
   * @param result
   */
  static toEntities<T>(result: SqlDBExecResult): T[] {
    const list: T[] = [];
    for (let i = 0; i < result.values.length; i++) {
      const obj = {} as any;
      for (let j = 0; j < result.columns.length; j++) {
        obj[result.columns[j]] = result.values[i][j];
      }
      list.push(obj);
    }
    return list;
  }

  /**
   * 转换为实体类（单个）
   * @param result
   * @param index
   */
  static toEntity<T>(result: SqlDBExecResult, index = 0): T {
    const obj = {} as any;
    for (let i = 0; i < result.columns.length; i++) {
      obj[result.columns[i]] = result.values[index][i];
    }
    return obj;
  }
}
