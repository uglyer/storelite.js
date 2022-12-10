import {
  SqlDB,
  SqlDBBasicWhereCondition,
  SqlDBBasicWhereConditionType,
  SqlDBExecResults,
  SqlDBExtends,
  SqlDBModel,
  SqlDBWhereConditionSelectList,
  SqlDBWhereConditionSelectOne,
} from '@/declaration/SqlDB';
import { SqlDBExecResultsFormat } from '@/store/utils/SqlDBExecResultsFormat';
import { EntityMetadata } from '@/store/libs/ioc/EntityMetadata';
import { SqlDBModelImpl } from '@/store/libs/orm/SqlDBModelImpl';

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

/**
 * SqlDBExtends 扩展实现类
 * @author uglyer
 * @date 2022/11/12 23:49
 */
export class SqlDBExtendsImpl implements SqlDBExtends {
  constructor(protected db: SqlDB) {}

  /**
   * 是否为 StoreLite 扩展对象
   */
  isStoreLite(): boolean {
    return true;
  }

  /**
   * 创建函数
   * @param funcName
   * @param handler
   */
  create_function<T>(funcName: string, handler: T): void {
    return this.db.create_function(funcName, handler);
  }

  /**
   * 执行语句
   * @param sql
   */
  exec(sql: string): SqlDBExecResults {
    return this.db.exec(sql);
  }

  /**
   * 查找单条记录, 如果sql语句有多个返回结果, 只取第一个
   * @param sql
   */
  findOne<T>(sql: string): T | null {
    const result = this.exec(sql);
    if (result.length == 0 || result[0].values.length == 0) {
      return null;
    }
    return SqlDBExecResultsFormat.toEntity(result[0]);
  }

  /**
   * 获取模型操作对象
   * @param entity
   */
  getModel<T>(entity: T): SqlDBModel<T> {
    const viewName = EntityMetadata.getViewName(entity);
    return new SqlDBModelImpl(this, viewName);
  }
}
