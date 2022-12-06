import { StoreLiteSync } from '@/declaration/StoreLite';
import { SqlDB, SqlDBExtends } from '@/declaration/SqlDB';
import { StoreLiteDynamicForm } from '@/store/libs/StoreLiteDynamicForm';

/**
 * StoreLite 实现上下文
 * @author uglyer
 * @date 2022/11/8 22:58
 */
export class StoreLiteContext<
  D = {},
  L = { [key: string]: { id: string } },
  TAG = 'observe',
> implements StoreLiteSync<D, L, TAG>
{
  /**
   * 动态表单操作类
   * @protected
   */
  protected dynamicForm: StoreLiteDynamicForm<D, L>;

  constructor(db: SqlDBExtends, entities: { dictionary: D; list: L }) {
    this.dynamicForm = new StoreLiteDynamicForm(db, entities);
  }

  deleteDictionary<TYPE>(target: (target: D) => TYPE): void;
  deleteDictionary<K extends keyof D, TYPE extends D[K]>(key: K): void;
  deleteDictionary(target): void {}

  deleteListById<TABLE extends keyof L>(
    tableName: TABLE,
    ids: string | string[],
  ): number {
    return 0;
  }

  rawRead<TYPE>(tableName: 'dictionary' | keyof L, sql: string): TYPE {
    return undefined;
  }

  rawSubscribe<TYPE>(
    tableName: 'dictionary' | keyof L,
    sql: string,
    onChange: (data: TYPE, info: { tag: TAG }) => void,
  ): () => void {
    return function () {};
  }

  readDictionary<TYPE>(target: (target: D) => TYPE): TYPE {
    return undefined;
  }

  readList<TABLE extends keyof L>(target: TABLE): Array<L[TABLE]> {
    return undefined;
  }

  readListByIds<TABLE extends keyof L>(
    target: TABLE,
    id: Array<string>,
  ): Array<L[TABLE]> {
    return undefined;
  }

  readListItemById<TABLE extends keyof L>(
    target: TABLE,
    id: string,
  ): L[TABLE] | null {
    return undefined;
  }

  setDictionary<TYPE>(target: (target: D) => TYPE, value: TYPE): void;
  setDictionary<K extends keyof D, TYPE extends D[K]>(
    key: K,
    value: TYPE,
  ): void;
  setDictionary(target, value): void {}

  setListById<TABLE extends keyof L>(
    tableName: TABLE,
    data:
      | L[TABLE]
      | Omit<L[TABLE], 'id'>
      | Array<L[TABLE] | Omit<L[TABLE], 'id'>>,
  ): void {}

  subscribeDictionary<TYPE>(
    target: (target: D) => TYPE,
    onChange: (data: TYPE, info: { tag: TAG }) => void,
  ): () => void {
    return function () {};
  }

  subscribeList<TABLE extends keyof L>(
    target: TABLE,
    onChange: (data: Array<L[TABLE]>, info: { tag: TAG }) => void,
  ): () => void {
    return function () {};
  }

  subscribeListByIds<TABLE extends keyof L>(
    target: TABLE,
    id: Array<string>,
    onChange: (data: Array<L[TABLE]>, info: { tag: TAG }) => void,
  ): () => void {
    return function () {};
  }

  subscribeListItemById<TABLE extends keyof L>(
    target: TABLE,
    id: string,
    onChange: (data: L[TABLE] | null, info: { tag: TAG }) => void,
  ): () => void {
    return function () {};
  }
}
