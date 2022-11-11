import { SqlDB, SqlDBExtends } from '@/declaration/SqlDB';

/**
 * 修饰 SqlDB 注入扩展函数
 * @author uglyer
 * @date 2022/11/11 23:12
 */
export function modifySqlDB(db: SqlDB) {
  if (
    typeof (db as SqlDBExtends).isStoreLite == 'function' &&
    (db as SqlDBExtends).isStoreLite()
  ) {
    // 已经处理扩展, 跳过
    return;
  }
  Object.defineProperty(db.constructor.prototype, 'isStoreLite', {
    get(): boolean {
      return true;
    },
  });
}
