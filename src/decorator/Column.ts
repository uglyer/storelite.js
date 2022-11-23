import { ColumnType } from '@/declaration/ColumnTypes';
import 'reflect-metadata';

/**
 * Column decorator is used to mark a specific class property as a table column.
 * Only properties decorated with this decorator will be persisted to the database when entity be saved.
 */
export function Column(type: ColumnType): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol) {
    const designType = Reflect.getMetadata('design:type', object, propertyName);
    console.log(propertyName, designType);
  };
}
