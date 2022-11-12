import { SqlDBBasicWhereCondition } from '@/declaration/SqlDB';

/**
 * SqlDB Where 条件 DSL 实现类
 * @author uglyer
 * @date 2022/11/12 23:58
 */
export class SqlDBBasicWhereConditionImpl<T>
  implements SqlDBBasicWhereCondition<T>
{
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
   * 条件 全匹配
   */
  eq(...args: any[]): SqlDBBasicWhereCondition<T> {
    return undefined;
  }

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  in<K extends keyof T, V extends T[K]>(
    k: K,
    list: V[],
  ): SqlDBBasicWhereCondition<T> {
    return undefined;
  }

  /**
   * 条件 模糊匹配(需要自行传递匹配符)
   * @param k
   * @param v
   */
  like<K extends keyof T, V extends T[K]>(
    k: K,
    v: V,
  ): SqlDBBasicWhereCondition<T> {
    return undefined;
  }
}
