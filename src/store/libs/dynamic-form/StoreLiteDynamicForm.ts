import { SqlDB, SqlDBExtends, SqlDBModel } from '@/declaration/SqlDB';
import { EntityMetadata } from '@/store/libs/ioc/EntityMetadata';
import { EntityColumnTypes } from '@/declaration/EntityColumnTypes';
import { StoreLiteRawEntity } from '@/store/libs/dynamic-form/StoreLiteRawEntity';

/**
 * 动态表单
 * 单表维护数据, 自动创建视图用于查询
 * @author uglyer
 * @date 2022/11/9 22:59
 */
export class StoreLiteDynamicForm<
  D = { [key: string]: { _id: number } },
  L = { [key: string]: { _id: number } },
> {
  /**
   * 真实存储的表名
   */
  static TABLE_NAME = 'store_lite_data';
  /**
   * 字典表名
   */
  static DICTIONARY_TABLE_NAME = 'dictionary';

  /**
   * 原始表实体类
   * @protected
   */
  protected rawTableEntity = new StoreLiteRawEntity();

  constructor(
    protected db: SqlDBExtends,
    protected entities: { dictionary: D; list: L },
  ) {
    this.initDB();
    this.initView();
  }

  /**
   * 初始化数据库
   * 执行建表
   * TODO 新增 环境变量 string, meta 字段 用于参数所属的环境变量, 其他原数据信息
   * @protected
   */
  protected initDB() {
    EntityMetadata.defineViewName(
      this.rawTableEntity,
      StoreLiteDynamicForm.TABLE_NAME,
    );
    this.db.exec(EntityMetadata.toCreateTableSql(this.rawTableEntity));
    this.db.exec(EntityMetadata.toCreateIndexSql(this.rawTableEntity));
  }

  /**
   * 字典视图名称
   * @param key
   * @protected
   */
  protected dictionaryViewName(key: string): string {
    return `DICTIONARY_${key.toUpperCase()}_VIEW`;
  }

  /**
   * 列表视图名称
   * @param key
   * @protected
   */
  protected listViewName(key: string): string {
    return `LIST_${key.toUpperCase()}_VIEW`;
  }

  /**
   * 创建视图
   * @param tableName
   * @param columns
   * @protected
   */
  protected createView(tableName: string, columns: EntityColumnTypes[]) {
    const columnSql = columns
      .map(
        (it) =>
          `json_extract(content, '$.${it.dbFieldName}') as ${it.fieldName}`,
      )
      .join(',');
    const sql = `CREATE VIEW ${tableName} AS
SELECT ${StoreLiteDynamicForm.TABLE_NAME}.id as _id, ${columnSql}
FROM ${StoreLiteDynamicForm.TABLE_NAME} where table_name = '${tableName}';`;
    this.db.exec(sql);
  }

  /**
   * 初始化视图
   * @protected
   */
  protected initView() {
    const { dictionary, list } = this.entities;
    const dictionaryKeys = Object.keys(dictionary);
    const listKeys = Object.keys(list);
    for (let i = 0; i < dictionaryKeys.length; i++) {
      const key = dictionaryKeys[i];
      // @ts-ignore
      const obj = dictionary[key];
      const column = EntityMetadata.getColumns(obj);
      if (column == null) {
        throw Error(`get entity metadata error:${obj.toString()}`);
      }
      if (column.length == 0) {
        throw Error(`get entity metadata size is zero:${obj.toString()}`);
      }
      const tableName = this.dictionaryViewName(key);
      EntityMetadata.defineViewName(obj, tableName);
      this.createView(tableName, column);
    }
    for (let i = 0; i < listKeys.length; i++) {
      const key = listKeys[i];
      // @ts-ignore
      const obj = list[key];
      const column = EntityMetadata.getColumns(obj);
      if (column == null) {
        throw Error(`get entity metadata error:${obj.toString()}`);
      }
      if (column.length == 0) {
        throw Error(`get entity metadata size is zero:${obj.toString()}`);
      }
      const tableName = this.listViewName(key);
      EntityMetadata.defineViewName(obj, tableName);
      this.createView(tableName, column);
    }
  }

  /**
   * 通过字典键名称获取字典模型操作对象
   * @param key
   * @protected
   */
  protected getDictionaryModel<K extends keyof D, T extends D[K]>(
    key: K,
  ): SqlDBModel<T> {
    return this.db.getModel(this.entities.dictionary[key]) as any;
  }

  /**
   * 更新字典数据
   * @param key
   * @param value 传递 null 表示删除 TODO 增量更新时需要自行确保数据已经实例化一次
   */
  setDictionary<K extends keyof D>(key: K, value: D[K] | null) {
    const tableName = this.dictionaryViewName(key.toString());
    const content = value == null ? null : JSON.stringify(value);
    const beforeData = this.getDictionaryModel(key)
      .selectOne(['_id' as any])
      .do<{ _id: number }>();
    if (value == null) {
      if (beforeData == null) {
        // 数据不存在不需要任何处理
        return;
      }
      const sql = `DELETE
                   FROM ${StoreLiteDynamicForm.TABLE_NAME}
                   WHERE ID = ${beforeData._id}`;
      this.db.exec(sql);
    } else if (beforeData == null) {
      // 不存在, 插入
      const sql = `INSERT INTO ${StoreLiteDynamicForm.TABLE_NAME} (table_name, content)
                   VALUES ('${tableName}', '${content}')`;
      this.db.exec(sql);
    } else {
      // 已经存在, 更新
      const sql = `UPDATE ${StoreLiteDynamicForm.TABLE_NAME}
                   set content = '${content}'
                   WHERE id = ${beforeData._id}`;
      this.db.exec(sql);
    }
  }

  /**
   * 更新字典数据
   * @param key
   */
  getDictionary<K extends keyof D>(key: K): D[K] | null {
    return this.getDictionaryModel(key).selectOne().do();
  }
}
