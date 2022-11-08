import { StoreLiteSync } from '@/declaration/StoreLite';
// @ts-ignore
import wasmUrl from 'sql.js/dist/sql-wasm.wasm';
import { SqlDB } from '@/declaration/SqlDB';
import { StoreLiteContext } from '@/store/StoreLiteContext';

/**
 * StoreLite 入口
 * @author uglyer
 * @date 2022/11/8 22:44
 */
class StoreLite {
  /**
   * 动态导入 sql.js
   * @protected
   */
  protected static sqlib: Promise<any> | null = null;

  /**
   * 获取数据库实例
   * @protected
   */
  protected static getDB(): Promise<SqlDB> {
    if (!this.sqlib) {
      // @ts-ignore
      this.sqlib = import('sql.js/dist/sql-wasm.js').then((module) => {
        return module.default({
          locateFile: (file: string) => {
            return wasmUrl;
          },
        });
      });
    }
    return this.sqlib.then((SQL) => new SQL.Database());
  }

  /**
   * 创建同步库
   */
  static async createSyncStore<
    D = {},
    L = { [key: string]: { id: string } },
    TAG = 'observe',
  >(): Promise<StoreLiteSync<D, L, TAG>> {
    const db = await this.getDB();
    const module = await import('./store/StoreLiteContext');
    return new module.StoreLiteContext<D, L, TAG>(db);
  }
}
