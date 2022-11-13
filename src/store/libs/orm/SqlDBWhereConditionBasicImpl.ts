import {
  BaseType,
  SqlDBBasicWhereCondition,
  SqlDBBasicWhereConditionType,
  SqlDBInstruction,
} from '@/declaration/SqlDB';
import { SqlDBBasicWhereConditionImpl } from '@/store/libs/orm/SqlDBBasicWhereConditionImpl';

/**
 * SqlDB Where 条件 基础 DSL 实现类
 * @author uglyer
 * @date 2022/11/13 0:01
 */
export abstract class SqlDBWhereConditionBasicImpl<T, C>
  implements SqlDBBasicWhereConditionType<T, C>
{
  /**
   * 条件集合
   * @protected
   */
  protected list: Array<['AND' | 'OR', string]> = [];

  /**
   * 获取C实例
   * @protected
   */
  protected abstract getInstance(): C;

  /**
   * 添加条件 条件
   * @param type
   * @param handler
   */
  protected andCondition(
    type: 'AND' | 'OR',
    handler: (condition: SqlDBBasicWhereCondition<T>) => void,
  ): C {
    const condition = new SqlDBBasicWhereConditionImpl<T>();
    handler(condition);
    const sql = condition.toSql(type);
    if (sql != null) {
      this.list.push([type, sql]);
    }
    return this.getInstance();
  }

  /**
   * and 条件
   * @param handler
   */
  and(handler: (condition: SqlDBBasicWhereCondition<T>) => void): C {
    return this.andCondition('AND', handler);
  }

  /**
   * or 条件
   * @param handler
   */
  or(handler: (condition: SqlDBBasicWhereCondition<T>) => void): C {
    return this.andCondition('OR', handler);
  }
}
