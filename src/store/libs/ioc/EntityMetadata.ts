import { Column } from '@/decorator/Column';
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
  ) {
    let list = Reflect.getMetadata('storelite:type', object);
    if (!Array.isArray(list)) {
      list = [];
      Reflect.defineMetadata('storelite:type', list, object);
    }
    (list as EntityColumnTypes[]).push({
      fieldName,
      dbType: type,
      jsType,
    });
    console.log(list);
  }
}

export const EntityMetadata = new EntityMetadataImpl();
