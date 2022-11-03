/**
 * StoreLiteSetSync 设置(更新、插入)同步接口
 * @author uglyer
 * @date 2022/11/3 13:43
 */
export interface StoreLiteSetSync<
  D = {},
  L = { [key: string]: { id: string } },
> {
  /**
   * 更新字段数据(自定义节点更新, 如果更新的层级较深, 需要自行确保节点父层已实例化)
   * @param target
   * @param value
   */
  setDictionary<TYPE>(target: (target: D) => TYPE, value: TYPE): void;

  /**
   * 更新字段数据
   * @param key
   * @param value
   */
  setDictionary<K extends keyof D, TYPE extends D[K]>(
    key: K,
    value: TYPE,
  ): void;

  /**
   * 通过 id 设置 列表数据
   * id 记录不存在或id为空插入则插入, 其他情况更新记录
   * @param tableName
   * @param data
   */
  setListById<TABLE extends keyof L>(
    tableName: TABLE,
    data:
      | (L[TABLE] | Omit<L[TABLE], 'id'>)
      | Array<L[TABLE] | Omit<L[TABLE], 'id'>>,
  ): void;
}

/**
 * StoreLiteSetAsync 设置(更新、插入)异步接口
 * @author uglyer
 * @date 2022/11/3 13:43
 */
export interface StoreLiteSetAsync<
  D = {},
  L = { [key: string]: { id: string } },
> {
  /**
   * 更新字段数据(自定义节点更新, 如果更新的层级较深, 需要自行确保节点父层已实例化)
   * @param target
   * @param value
   */
  setDictionary<TYPE>(target: (target: D) => TYPE, value: TYPE): Promise<void>;

  /**
   * 更新字段数据
   * @param key
   * @param value
   */
  setDictionary<K extends keyof D, TYPE extends D[K]>(
    key: K,
    value: TYPE,
  ): Promise<void>;

  /**
   * 通过 id 设置 列表数据
   * id 记录不存在或id为空插入则插入, 其他情况更新记录
   * @param tableName
   * @param data
   */
  setListById<TABLE extends keyof L>(
    tableName: TABLE,
    data:
      | (L[TABLE] | Omit<L[TABLE], 'id'>)
      | Array<L[TABLE] | Omit<L[TABLE], 'id'>>,
  ): Promise<void>;
}
