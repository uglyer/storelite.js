import {
  SqlDBBasicWhereCondition,
  SqlDBBasicWhereConditionType,
} from '@/declaration/SqlDB';

/**
 * SqlDB Where 条件 基础 DSL 实现类
 * @author uglyer
 * @date 2022/11/13 0:01
 */
export class SqlDBWhereConditionBasicImpl<T, C>
  implements SqlDBBasicWhereConditionType<T, C>
{
  /**
   * and 条件
   * @param handler
   */
  and(handler: (condition: SqlDBBasicWhereCondition<T>) => void): C {
    return undefined;
  }

  /**
   * or 条件
   * @param handler
   */
  or(handler: (condition: SqlDBBasicWhereCondition<T>) => void): C {
    return undefined;
  }
}
