/**
 * StoreLiteDeleteSync 删除同步接口
 * @author uglyer
 * @date 2022/11/3 13:43
 */
export interface StoreLiteDeleteSync<
  D = {},
  L = { [key: string]: { id: string } },
> {
  /**
   * 删除字典数据(如果删除的层级较深, 需要自行确保节点父层已实例化)
   * @param target
   */
  deleteDictionary<TYPE>(target: (target: D) => TYPE): void;

  /**
   * 删除字典数据
   * @param key
   */
  deleteDictionary<K extends keyof D, TYPE extends D[K]>(key: K): void;

  /**
   * 通过 id 删除 列表数据
   * @param tableName
   * @param ids
   */
  deleteListById<TABLE extends keyof L>(
    tableName: TABLE,
    ids: string | string[],
  ): number;
}

/**
 * StoreLiteDeleteAsync 删除异步接口
 * @author uglyer
 * @date 2022/11/3 13:43
 */
export interface StoreLiteDeleteAsync<
  D = {},
  L = { [key: string]: { id: string } },
> {
  /**
   * 删除字典数据(如果删除的层级较深, 需要自行确保节点父层已实例化)
   * @param target
   */
  deleteDictionary<TYPE>(target: (target: D) => TYPE): Promise<void>;

  /**
   * 删除字典数据
   * @param key
   */
  deleteDictionary<K extends keyof D, TYPE extends D[K]>(key: K): Promise<void>;

  /**
   * 通过 id 删除 列表数据
   * @param tableName
   * @param ids
   */
  deleteListById<TABLE extends keyof L>(
    tableName: TABLE,
    ids: string | string[],
  ): Promise<number>;
}
