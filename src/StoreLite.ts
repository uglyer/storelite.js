import { StoreLiteSync } from '@/declaration/StoreLite';
// @ts-ignore
import wasmUrl from 'sql.js/dist/sql-wasm.wasm';
import { SqlDB, SqlDBExtends } from '@/declaration/SqlDB';
import { SqlDBExtendsImpl } from '@/store/libs/SqlDBExtends';

/**
 * StoreLite 入口
 * @author uglyer
 * @date 2022/11/8 22:44
 */
export default class StoreLite {
  /**
   * 动态导入 sql.js
   * @protected
   */
  protected static sqlib: Promise<any> | null = null;

  /**
   * 获取数据库实例
   * @protected
   */
  static getDB(): Promise<SqlDBExtends> {
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
    return this.sqlib.then((SQL) => {
      const db = new SQL.Database();
      return new SqlDBExtendsImpl(db);
    });
  }

  /**
   * 创建同步库
   */
  static async createSyncStore<
    D = {},
    L = { [key: string]: { id: string } },
    TAG = 'observe',
  >(entities: { dictionary: D; list: L }): Promise<StoreLiteSync<D, L, TAG>> {
    const db = await this.getDB();
    const module = await import('./store/StoreLiteContext');
    return new module.StoreLiteContext<D, L, TAG>(db, entities);
  }
}
