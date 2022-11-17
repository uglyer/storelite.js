import {
  SqlDBBasicWhereCondition,
  SqlDBBasicWhereConditionType,
} from '@/declaration/SqlDB';
import { SqlDBSubWhereConditionImpl } from '@/store/libs/orm/SqlDBSubWhereConditionImpl';

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
  protected whereConditionList: Array<['AND' | 'OR', string]> = [];

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
  protected addCondition(
    type: 'AND' | 'OR',
    handler: (
      condition: SqlDBBasicWhereCondition<T>,
    ) => 'OR' | 'AND' | void | any,
  ): C {
    const condition = new SqlDBSubWhereConditionImpl<T>();
    let subSqlType = handler(condition);
    if (
      !subSqlType ||
      typeof subSqlType != 'string' ||
      (subSqlType != 'OR' && subSqlType != 'AND')
    ) {
      subSqlType = type;
    }
    const sql = condition.toSql(subSqlType);
    if (sql != null) {
      this.whereConditionList.push([type, sql]);
    }
    return this.getInstance();
  }

  /**
   * and 条件
   * @param handler
   */
  and(
    handler: (condition: SqlDBBasicWhereCondition<T>) => 'OR' | 'AND' | void,
  ): C {
    return this.addCondition('AND', handler);
  }

  /**
   * or 条件
   * @param handler
   */
  or(
    handler: (condition: SqlDBBasicWhereCondition<T>) => 'OR' | 'AND' | void,
  ): C {
    return this.addCondition('OR', handler);
  }

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
   * 条件 全匹配
   */
  andEq(...args: any[]): C {
    if (args.length == 1 && typeof args[0] == 'object') {
      return this.addCondition('AND', (condition) => condition.eq(args[0]));
    } else if (args.length == 2) {
      return this.addCondition('AND', (condition) =>
        condition.eq(args[0], args[1]),
      );
    } else {
      console.warn('未知的入参类型#eq', args);
    }
    return this.getInstance();
  }

  /**
   * 条件 为空
   * @param k
   */
  andIsNull<K extends keyof T>(k: K): C {
    return this.addCondition('AND', (condition) => condition.isNull(k));
  }

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
   * 条件 不匹配
   */
  andNotEq(...args: any[]): C {
    if (args.length == 1 && typeof args[0] == 'object') {
      return this.addCondition('AND', (condition) => condition.notEq(args[0]));
    } else if (args.length == 2) {
      return this.addCondition('AND', (condition) =>
        condition.notEq(args[0], args[1]),
      );
    } else {
      console.warn('未知的入参类型#eq', args);
    }
    return this.getInstance();
  }

  /**
   * 条件 不为空
   * @param k
   */
  andNotNull<K extends keyof T>(k: K): C {
    return this.addCondition('AND', (condition) => condition.notNull(k));
  }

  /**
   * 条件 大于
   * @param k
   * @param v
   */
  andMoreThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('AND', (condition) => condition.moreThan(k, v));
  }

  /**
   * 条件 大于或等于
   * @param k
   * @param v
   */
  andMoreThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('AND', (condition) =>
      condition.moreThanOrEq(k, v),
    );
  }

  /**
   * 条件 小于
   * @param k
   * @param v
   */
  andLessThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('AND', (condition) => condition.lessThan(k, v));
  }

  /**
   * 条件 小于或等于
   * @param k
   * @param v
   */
  andLessThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('AND', (condition) =>
      condition.lessThanOrEq(k, v),
    );
  }

  /**
   * 条件 小于或等于
   * @param k
   * @param start
   * @param end
   */
  andBetweenAnd<K extends keyof T, V extends T[K]>(k: K, start: V, end: V): C {
    return this.addCondition('AND', (condition) =>
      condition.betweenAnd(k, start, end),
    );
  }

  /**
   * 条件 模糊匹配(需要自行传递匹配符)
   * @param k
   * @param v
   */
  andLike<K extends keyof T, V extends T[K]>(k: K, v: V): C {
    return this.addCondition('AND', (condition) => condition.like(k, v));
  }

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  andIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C {
    return this.addCondition('AND', (condition) => condition.in(k, list));
  }

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  andNotIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C {
    return this.addCondition('AND', (condition) => condition.notIn(k, list));
  }

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
   * 条件 全匹配
   */
  orEq(...args: any[]): C {
    if (args.length == 1 && typeof args[0] == 'object') {
      return this.addCondition('OR', (condition) => condition.eq(args[0]));
    } else if (args.length == 2) {
      return this.addCondition('OR', (condition) =>
        condition.eq(args[0], args[1]),
      );
    } else {
      console.warn('未知的入参类型#eq', args);
    }
    return this.getInstance();
  }

  /**
   * 条件 为空
   * @param k
   */
  orIsNull<K extends keyof T>(k: K): C {
    return this.addCondition('OR', (condition) => condition.isNull(k));
  }

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
   * 条件 不匹配
   */
  orNotEq(...args: any[]): C {
    if (args.length == 1 && typeof args[0] == 'object') {
      return this.addCondition('OR', (condition) => condition.notEq(args[0]));
    } else if (args.length == 2) {
      return this.addCondition('OR', (condition) =>
        condition.notEq(args[0], args[1]),
      );
    } else {
      console.warn('未知的入参类型#eq', args);
    }
    return this.getInstance();
  }

  /**
   * 条件 不为空
   * @param k
   */
  orNotNull<K extends keyof T>(k: K): C {
    return this.addCondition('OR', (condition) => condition.notNull(k));
  }

  /**
   * 条件 大于
   * @param k
   * @param v
   */
  orMoreThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('OR', (condition) => condition.moreThan(k, v));
  }

  /**
   * 条件 大于或等于
   * @param k
   * @param v
   */
  orMoreThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('OR', (condition) => condition.moreThanOrEq(k, v));
  }

  /**
   * 条件 小于
   * @param k
   * @param v
   */
  orLessThan<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('OR', (condition) => condition.lessThan(k, v));
  }

  /**
   * 条件 小于或等于
   * @param k
   * @param v
   */
  orLessThanOrEq<K extends keyof T, V extends T[K]>(k: K, v: V & number): C {
    return this.addCondition('OR', (condition) => condition.lessThanOrEq(k, v));
  }

  /**
   * 条件 小于或等于
   * @param k
   * @param start
   * @param end
   */
  orBetweenAnd<K extends keyof T, V extends T[K]>(k: K, start: V, end: V): C {
    return this.addCondition('OR', (condition) =>
      condition.betweenAnd(k, start, end),
    );
  }

  /**
   * 条件 模糊匹配(需要自行传递匹配符)
   * @param k
   * @param v
   */
  orLike<K extends keyof T, V extends T[K]>(k: K, v: V): C {
    return this.addCondition('OR', (condition) => condition.like(k, v));
  }

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  orIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C {
    return this.addCondition('OR', (condition) => condition.in(k, list));
  }

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  orNotIn<K extends keyof T, V extends T[K]>(k: K, list: V[]): C {
    return this.addCondition('OR', (condition) => condition.notIn(k, list));
  }

  /**
   * 转为 sql 语句
   * @protected
   */
  protected toSql(): string | null {
    let sql = '';
    for (let i = 0; i < this.whereConditionList.length; i++) {
      if (i == 0) {
        sql += `(${this.whereConditionList[i][1]})`;
      } else {
        sql += ` ${this.whereConditionList[i][0]} (${this.whereConditionList[i][1]})`;
      }
    }
    if (sql == '') {
      return null;
    }
    return sql;
  }
}
