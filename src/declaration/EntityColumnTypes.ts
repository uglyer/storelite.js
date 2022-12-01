import { ColumnType } from '@/declaration/ColumnTypes';

/**
 * 实体类类型描述
 * @author uglyer
 * @date 2022/11/30 22:23
 */
export interface EntityColumnTypes {
  /**
   * 字段名称
   */
  fieldName: string;
  /**
   * 数据库类型
   */
  dbType: ColumnType;
  /**
   * JS 类型
   */
  jsType: EntityJsTypes;
}

/**
 * 实体 JS 类型
 * @author Unily
 * @date 2022/12/1 20:55
 */
export type EntityJsTypes = 'string' | 'boolean' | 'number' | 'object';
