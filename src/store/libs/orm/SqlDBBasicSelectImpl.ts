import { SqlDBBasicSelect } from '@/declaration/SqlDB';
import { SqlDBWhereConditionBasicImpl } from '@/store/libs/orm/SqlDBWhereConditionBasicImpl';

const SqlString = require('sqlstring');

/**
 * 筛选语句基类
 * @author uglyer
 * @date 2022/11/17 22:20
 */
export abstract class SqlDBBasicSelectImpl<T, C>
  extends SqlDBWhereConditionBasicImpl<T, C>
  implements SqlDBBasicSelect<T, C>
{
  protected sqlOrderBy: string | null = null;
  protected sqlGroupBy: string | null = null;
  protected sqlLimit: string | null = null;

  /**
   * 排序
   * @param k
   * @param order
   */
  orderBy<K extends keyof T>(k: K | K[], order: 'ASC' | 'DESC'): C {
    this.sqlOrderBy = `ORDER BY ${Array.isArray(k) ? k.join(',') : k} DESC`;
    return this.getInstance();
  }

  /**
   * 限制记录数
   * @param count 需要多少条数据
   */
  limit(count: number): C;
  /**
   * 限制记录数
   * @param offset 过滤多少条数据
   * @param count 需要多少条数据
   */
  limit(offset: number, count: number): C;
  limit(v1: number, v2?: number): C {
    if (typeof v2 == 'number') {
      this.sqlLimit = `LIMIT ${v2} OFFSET ${v1}`;
    } else {
      this.sqlLimit = `LIMIT ${v1}`;
    }
    return this.getInstance();
  }

  /**
   * 分组
   * @param k
   */
  groupBy<K extends keyof T>(k: K | K[]): C {
    this.sqlGroupBy = `GROUP BY ${Array.isArray(k) ? k.join(',') : k}`;
    return this.getInstance();
  }
}
