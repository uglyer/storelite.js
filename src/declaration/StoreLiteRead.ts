/**
 * StoreLiteReadSync 读取同步操作接口
 * @author uglyer
 * @date 2022/11/3 18:40
 */
export interface StoreLiteReadSync<
  D = {},
  L = { [key: string]: { id: string } },
> {
  /**
   * 原生读取
   * @param tableName 表名
   * @param sql 订阅 sql 执行语句
   */
  rawRead<TYPE>(tableName: 'dictionary' | keyof L, sql: string): TYPE;

  /**
   * 读取字典数据
   * @param target
   */
  readDictionary<TYPE>(target: (target: D) => TYPE): TYPE;

  /**
   * 订阅列表(完整列表所有数据)
   * @param target
   */
  readList<TABLE extends keyof L>(target: TABLE): Array<L[TABLE]>;

  /**
   * 订阅指定 id 的列表成员
   * @param target
   * @param id
   */
  readListItemById<TABLE extends keyof L>(
    target: TABLE,
    id: string,
  ): L[TABLE] | null;

  /**
   * 订阅指定 id 列表的多个成员
   * @param target
   * @param id
   */
  readListByIds<TABLE extends keyof L>(
    target: TABLE,
    id: Array<string>,
  ): Array<L[TABLE]>;
}

/**
 * StoreLite 读取异步操作接口
 * @author uglyer
 * @date 2022/11/3 11:27
 */
export interface StoreLiteReadAsync<
  D = {},
  L = { [key: string]: { id: string } },
> {
  /**
   * 原生读取
   * @param tableName 表名
   * @param sql 订阅 sql 执行语句
   */
  rawRead<TYPE>(tableName: 'dictionary' | keyof L, sql: string): Promise<TYPE>;

  /**
   * 读取字典数据
   * @param target
   */
  readDictionary<TYPE>(target: (target: D) => TYPE): Promise<TYPE>;

  /**
   * 订阅列表(完整列表所有数据)
   * @param target
   */
  readList<TABLE extends keyof L>(target: TABLE): Promise<Array<L[TABLE]>>;

  /**
   * 订阅指定 id 的列表成员
   * @param target
   * @param id
   */
  readListItemById<TABLE extends keyof L>(
    target: TABLE,
    id: string,
  ): Promise<L[TABLE] | null>;

  /**
   * 订阅指定 id 列表的多个成员
   * @param target
   * @param id
   */
  readListByIds<TABLE extends keyof L>(
    target: TABLE,
    id: Array<string>,
  ): Promise<Array<L[TABLE]>>;
}
