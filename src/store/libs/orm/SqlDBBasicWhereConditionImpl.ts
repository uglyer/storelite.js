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
    } else if (args.length == 2) {
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
    } else if (args.length == 2) {
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

  /**
   * 条件转为 sql 语句
   */
  toSql(join: 'and' | 'or'): string | null {
    if (this.list.length == 0) {
      return null;
    }
    const stmts: string[] = [];
    for (let i = 0; i < this.list.length; i++) {
      const stmt = instruction2SqlStmt(
        this.list[i][0],
        this.list[i][1],
        this.list[i][2],
      );
      if (stmt !== null) {
        stmts.push(stmt);
      }
    }
    if (stmts.length == 0) {
      return null;
    }
    return stmts.join(` ${join} `);
  }
}

/**
 * 指令转sql语句片段
 * @param i
 * @param key
 * @param v
 * @constructor
 */
function instruction2SqlStmt(
  i: SqlDBInstruction,
  key: string,
  v: BaseType | Array<BaseType>,
): string | null {
  if (i == 'eq') {
    if (v === null) {
      return `${key} IS NULL`;
    }
    return `${key} = ${v}`;
  } else if (i == 'neq') {
    if (v === null) {
      return `${key} IS NOT NULL`;
    }
    return `${key} != ${v}`;
  } else if (i == 'in' || i == 'not-in') {
    if (!Array.isArray(v)) {
      console.warn('in instruction need an array value', v);
      return null;
    }
    if (v.length == 0) {
      console.warn('in instruction need an array value size more than 0', v);
      return null;
    }
    return `${key} ${i == 'in' ? 'IN' : 'NOT IN'} (${v.join(',')})`;
  } else if (i == 'like') {
    return `${key} LIKE ${v}`;
  } else if (i == 'between-and') {
    if (!Array.isArray(v)) {
      console.warn('between-and instruction need an array value', v);
      return null;
    }
    if (v.length != 2) {
      console.warn('between-and instruction need an array value size is 2', v);
      return null;
    }
    return `${key} BETWEEN ${v[0]} AND ${v[1]}`;
  } else if (i == 'less-than-or-eq') {
    return `${key} <= ${v}`;
  } else if (i == 'less-than') {
    return `${key} < ${v}`;
  } else if (i == 'greater-than-or-eq') {
    return `${key} >= ${v}`;
  } else if (i == 'greater-than') {
    return `${key} > ${v}`;
  } else {
    console.warn('instruction not support yet', i, v);
    return null;
  }
}
