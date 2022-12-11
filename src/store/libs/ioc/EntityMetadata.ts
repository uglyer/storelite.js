import { EntityColumnTypes } from '@/declaration/EntityColumnTypes';
import { SqlDBExecResult } from '@/declaration/SqlDB';

/**
 * 实体类元数据
 * @author uglyer
 * @date 2022/11/30 22:19
 */
class EntityMetadataImpl {
  /**
   * 添加字段
   */
  addColumn(object: Object, typeInfo: EntityColumnTypes): void {
    let list = Reflect.getMetadata('storelite:type', object.constructor);
    let map = Reflect.getMetadata('storelite:map', object.constructor);
    if (!Array.isArray(list)) {
      list = [];
      Reflect.defineMetadata('storelite:type', list, object.constructor);
    }
    if (!map) {
      map = new Map<string, EntityColumnTypes>();
      Reflect.defineMetadata('storelite:type-map', map, object.constructor);
    }
    (list as EntityColumnTypes[]).push(typeInfo);
    (map as Map<string, EntityColumnTypes>).set(typeInfo.fieldName, typeInfo);
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
   * 获取字段描述表
   * @param object
   */
  getTypeMap<T>(object: T): Map<string, EntityColumnTypes> | null {
    return (
      Reflect.getMetadata('storelite:type-map', object) ??
      // @ts-ignore
      Reflect.getMetadata('storelite:type-map', object.constructor) ??
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

  /**
   * 转换为实体类（多个）
   * 仅会对实体类中描述的 json 类型进行额外特殊处理
   * @param object
   * @param result
   */
  toEntities<T>(object: T, result: SqlDBExecResult): T[] {
    const map = this.getTypeMap(object as any);
    if (!map) {
      console.error('未定义类型表', object);
      throw Error('未定义类型表');
    }
    const list: T[] = [];
    for (let i = 0; i < result.values.length; i++) {
      // @ts-ignore
      const obj = new object['constructor']() as any;
      for (let j = 0; j < result.columns.length; j++) {
        const key = result.columns[j];
        const type = map.get(key);
        if (type && type.dbType == 'json') {
          obj[key] = JSON.parse(result.values[i][j]);
        } else {
          obj[key] = result.values[i][j];
        }
      }
      list.push(obj);
    }
    return list;
  }

  /**
   * 转换为实体类（单个）
   * 仅会对实体类中描述的 json 类型进行额外特殊处理
   * @param object
   * @param result
   * @param i
   */
  toEntity<T>(object: T, result: SqlDBExecResult, i = 0): T {
    const map = this.getTypeMap(object as any);
    if (!map) {
      console.error('未定义类型表', object);
      throw Error('未定义类型表');
    }
    // @ts-ignore
    const obj = new object['constructor']() as any;
    for (let j = 0; j < result.columns.length; j++) {
      const key = result.columns[j];
      const type = map.get(key);
      if (type && type.dbType == 'json') {
        obj[key] = JSON.parse(result.values[i][j]);
      } else {
        obj[key] = result.values[i][j];
      }
    }
    return obj;
  }

  /**
   * 转换为建表语句
   * @param object
   */
  toCreateTableSql<T>(object: T): string {
    const tableName = this.getViewName(object);
    const columns = this.getColumns(object as any);
    if (!columns) {
      console.error('未定义类型', object);
      throw Error('未定义类型');
    }
    const fields = columns
      .map((it) => {
        let sql = `${it.dbFieldName} ${it.dbType}`;
        if (it.primaryKey) {
          sql += ' not null primary key';
        }
        return sql;
      })
      .join(',');
    return `create table ${tableName}(${fields})`;
  }

  /**
   * 创建索引
   * @param object
   */
  toCreateIndexSql<T>(object: T): string {
    const tableName = this.getViewName(object);
    const columns = this.getColumns(object as any);
    if (!columns) {
      console.error('未定义类型', object);
      throw Error('未定义类型');
    }
    return columns
      .map((it) => {
        return `create index ${tableName}_${it.dbFieldName} on ${tableName} (${it.dbFieldName});`;
      })
      .join('\n');
  }
}

export const EntityMetadata = new EntityMetadataImpl();
