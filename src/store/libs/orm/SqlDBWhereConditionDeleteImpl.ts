import { SqlDBWhereConditionBasicImpl } from '@/store/libs/orm/SqlDBWhereConditionBasicImpl';

/**
 * SqlDBWhereConditionDeleteImpl
 * @author uglyer
 * @date 2022/12/12 20:28
 */
export class SqlDBWhereConditionDeleteImpl<
  T,
> extends SqlDBWhereConditionBasicImpl<T, SqlDBWhereConditionDeleteImpl<T>> {
  /**
   * 获取C实例
   * @protected
   */
  protected getInstance(): SqlDBWhereConditionDeleteImpl<T> {
    return this;
  }
}
