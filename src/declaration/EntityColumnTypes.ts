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
  jsType: 'string' | 'boolean' | 'number' | 'object';
}
