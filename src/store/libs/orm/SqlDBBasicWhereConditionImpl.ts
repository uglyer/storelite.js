import {
  BaseType,
  SqlDBBasicWhereCondition,
  SqlDBInstruction,
} from '@/declaration/SqlDB';

/**
 * SqlDB Where 条件 DSL 实现类
 * @author uglyer
 * @date 2022/11/12 23:58
 */
export class SqlDBBasicWhereConditionImpl<T>
  implements SqlDBBasicWhereCondition<T>
{
  /**
   * 条件集合
   * @protected
   */
  protected list: Array<
    [SqlDBInstruction, string, BaseType | Array<BaseType>]
  > = [];

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
    if (args.length == 1 && typeof args[0] == 'object') {
      this.eqObjectImpl(args[0]);
    } else if (args.length == 1 && typeof args[0] == 'object') {
      this.eqItem(args[0], args[1]);
    } else {
      console.warn('未知的入参类型#eq', args);
    }
    return this;
  }

  /**
   * 条件 全匹配
   */
  protected eqObjectImpl(model: Partial<T>) {
    const keys = Object.keys(model);
    for (let i = 0; i < keys.length; i++) {
      // @ts-ignore
      this.eqItem(keys[i], model[keys[i]]);
    }
  }

  /**
   * 条件 全匹配
   */
  protected eqItem<K extends keyof T, V extends T[K]>(k: K, v: V) {
    this.list.push(['eq', k as string, v as BaseType]);
  }

  /**
   * 条件 为空
   * @param k
   */
  isNull<K extends keyof T>(k: K): SqlDBBasicWhereCondition<T> {
    this.list.push(['eq', k as string, null]);
    return this;
  }

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
   * 条件 不匹配
   */
  notEq(...args: any[]): SqlDBBasicWhereCondition<T> {
    if (args.length == 1 && typeof args[0] == 'object') {
      this.notEqObjectImpl(args[0]);
    } else if (args.length == 1 && typeof args[0] == 'object') {
      this.notEqItem(args[0], args[1]);
    } else {
      console.warn('未知的入参类型#eq', args);
    }
    return this;
  }

  /**
   * 条件 全匹配
   */
  protected notEqObjectImpl(model: Partial<T>) {
    const keys = Object.keys(model);
    for (let i = 0; i < keys.length; i++) {
      // @ts-ignore
      this.eqItem(keys[i], model[keys[i]]);
    }
  }

  /**
   * 条件 全匹配
   */
  protected notEqItem<K extends keyof T, V extends T[K]>(k: K, v: V) {
    this.list.push(['neq', k as string, v as BaseType]);
  }

  /**
   * 条件 不为空
   * @param k
   */
  notNull<K extends keyof T>(k: K): SqlDBBasicWhereCondition<T> {
    this.list.push(['neq', k as string, null]);
    return this;
  }

  /**
   * 条件 大于
   * @param k
   * @param v
   */
  greaterThan<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T> {
    this.list.push(['greater-than', k as string, v as any]);
    return this;
  }

  /**
   * 条件 大于或等于
   * @param k
   * @param v
   */
  greaterThanOrEq<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T> {
    this.list.push(['greater-than-or-eq', k as string, v as any]);
    return this;
  }

  /**
   * 条件 小于
   * @param k
   * @param v
   */
  lessThan<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T> {
    this.list.push(['less-than', k as string, v as any]);
    return this;
  }

  /**
   * 条件 小于或等于
   * @param k
   * @param v
   */
  lessThanOrEq<K extends keyof T, V extends T[K]>(
    k: K,
    v: V & number,
  ): SqlDBBasicWhereCondition<T> {
    this.list.push(['less-than-or-eq', k as string, v as any]);
    return this;
  }

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
  ): SqlDBBasicWhereCondition<T> {
    this.list.push(['between-and', k as string, [start, end] as any]);
    return this;
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
    this.list.push(['in', k as string, list as BaseType[]]);
    return this;
  }

  /**
   * 条件 in 匹配
   * @param k
   * @param list
   */
  notIn<K extends keyof T, V extends T[K]>(
    k: K,
    list: V[],
  ): SqlDBBasicWhereCondition<T> {
    this.list.push(['not-in', k as string, list as BaseType[]]);
    return this;
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
    this.list.push(['like', k as string, v as BaseType]);
    return this;
  }
}
