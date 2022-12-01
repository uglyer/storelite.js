import { ColumnType } from '@/declaration/ColumnTypes';
import 'reflect-metadata';
import { EntityJsTypes } from '@/declaration/EntityColumnTypes';
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
export function Column(type: ColumnType): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol) {
    const designType = Reflect.getMetadata('design:type', object, propertyName);
    if (!jsTypeMap.has(designType)) {
      console.error('unknown designType', designType, object, propertyName);
      throw Error('unknown designType');
    }
    const jsType = jsTypeMap.get(designType)!;
    EntityMetadata.addColumn(object, propertyName.toString(), type, jsType);
  };
}
