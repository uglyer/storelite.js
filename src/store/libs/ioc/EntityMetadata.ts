import { ColumnType } from '@/declaration/ColumnTypes';
import {
  EntityColumnTypes,
  EntityJsTypes,
} from '@/declaration/EntityColumnTypes';

/**
 * 实体类元数据
 * @author uglyer
 * @date 2022/11/30 22:19
 */
class EntityMetadataImpl {
  /**
   * 添加字段
   */
  addColumn(
    object: Object,
    fieldName: string,
    type: ColumnType,
    jsType: EntityJsTypes,
  ): void {
    let list = Reflect.getMetadata('storelite:type', object.constructor);
    if (!Array.isArray(list)) {
      list = [];
      Reflect.defineMetadata('storelite:type', list, object.constructor);
    }
    (list as EntityColumnTypes[]).push({
      fieldName,
      dbType: type,
      jsType,
    });
  }

  /**
   * 获取字段描述
   * @param object
   */
  getColumns(object: { new (): Object }): EntityColumnTypes[] | null {
    return (
      Reflect.getMetadata('storelite:type', object) ??
      Reflect.getMetadata('storelite:type', object.constructor) ??
      null
    );
  }

  /**
   * 定义视图名称
   * @param object
   * @param viewName
   */
  defineViewName(object: Object, viewName: string): void {
    Reflect.defineMetadata('storelite:view-name', viewName, object);
  }

  /**
   * 获取视图名称（未定义类型将抛出异常）
   * @param object
   */
  getViewName(object: Object): string {
    const viewName = Reflect.getMetadata('storelite:view-name', object);
    if (!viewName) {
      console.error('未定义视图名称', object);
      throw Error('未定义视图名称');
    }
    return viewName;
  }
}

export const EntityMetadata = new EntityMetadataImpl();
