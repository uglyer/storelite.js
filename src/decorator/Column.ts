import { ColumnType } from '@/declaration/ColumnTypes';
import 'reflect-metadata';
import {
  EntityColumnTypes,
  EntityJsTypes,
} from '@/declaration/EntityColumnTypes';
import { EntityMetadata } from '@/store/libs/ioc/EntityMetadata';

const jsTypeMap = new Map<any, EntityJsTypes>([
  [String, 'string'],
  [Boolean, 'boolean'],
  [Number, 'number'],
  [Object, 'object'],
]);

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function Column(
  type: ColumnType,
  options: Partial<EntityColumnTypes> | null = null,
): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol) {
    const designType = Reflect.getMetadata('design:type', object, propertyName);
    if (!jsTypeMap.has(designType)) {
      console.error('unknown designType', designType, object, propertyName);
      throw Error('unknown designType');
    }
    const jsType = jsTypeMap.get(designType)!;
    if (jsType == 'object' && type != 'json') {
      console.error(
        'js type is object but db type is not json',
        type,
        object,
        propertyName,
      );
      throw Error('js type is object but db type is not json');
    }
    const typeInfo: EntityColumnTypes = {
      fieldName: propertyName.toString(),
      dbType: type,
      jsType,
      primaryKey: false,
    };
    if (options != null) {
      Object.assign(typeInfo, options);
    }
    EntityMetadata.addColumn(object, typeInfo);
  };
}
