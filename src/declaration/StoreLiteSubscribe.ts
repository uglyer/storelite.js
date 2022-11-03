/**
 * StoreLiteSubscribe 订阅操作接口
 * @author uglyer
 * @date 2022/11/3 18:40
 */
export interface StoreLiteSubscribe<
  D = {},
  L = { [key: string]: { id: string } },
  TAG = 'observe',
> {
  /**
   * 原生订阅事件
   * @param tableName 表名
   * @param sql 订阅 sql 执行语句
   * @param onChange
   */
  rawSubscribe<TYPE>(
    tableName: 'dictionary' | keyof L,
    sql: string,
    onChange: (data: TYPE, info: { tag: TAG }) => void,
  ): () => void;

  // observeDictionaryWithFilter<TYPE, FIELD extends keyof TYPE>(target: (target: D) => TYPE, filter: () => , onChange: (data: Pick<TYPE,"1"|"1">, info: { tag: TAG }) => void): () => void;

  /**
   * 订阅字典数据
   * @param target
   * @param onChange
   */
  subscribeDictionary<TYPE>(
    target: (target: D) => TYPE,
    onChange: (data: TYPE, info: { tag: TAG }) => void,
  ): () => void;

  /**
   * 订阅列表(完整列表所有数据)
   * @param target
   * @param onChange
   */
  subscribeList<TABLE extends keyof L>(
    target: TABLE,
    onChange: (data: Array<L[TABLE]>, info: { tag: TAG }) => void,
  ): () => void;

  /**
   * 订阅指定 id 的列表成员
   * @param target
   * @param id
   * @param onChange
   */
  subscribeListItemById<TABLE extends keyof L>(
    target: TABLE,
    id: string,
    onChange: (data: L[TABLE] | null, info: { tag: TAG }) => void,
  ): () => void;

  /**
   * 订阅指定 id 列表的多个成员
   * @param target
   * @param id
   * @param onChange
   */
  subscribeListByIds<TABLE extends keyof L>(
    target: TABLE,
    id: Array<string>,
    onChange: (data: Array<L[TABLE]>, info: { tag: TAG }) => void,
  ): () => void;
}
