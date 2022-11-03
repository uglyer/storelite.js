import { StoreLiteSubscribe } from '@/declaration/StoreLiteSubscribe';
import {
  StoreLiteSetAsync,
  StoreLiteSetSync,
} from '@/declaration/StoreLiteSet';
import {
  StoreLiteReadAsync,
  StoreLiteReadSync,
} from '@/declaration/StoreLiteRead';
import {
  StoreLiteDeleteAsync,
  StoreLiteDeleteSync,
} from '@/declaration/StoreLiteDelete';

/**
 * StoreLite 同步执行接口
 * @author uglyer
 * @date 2022/11/3 14:00
 */
export interface StoreLiteSync<
  D = {},
  L = { [key: string]: { id: string } },
  TAG = 'observe',
> extends StoreLiteSubscribe<D, L, TAG>,
    StoreLiteReadSync<D, L>,
    StoreLiteSetSync<D, L>,
    StoreLiteDeleteSync<D, L> {}

/**
 * StoreLite 异步执行接口(Worker)
 * @author uglyer
 * @date 2022/11/3 14:00
 */
export interface StoreLite<
  D = {},
  L = { [key: string]: { id: string } },
  TAG = 'observe',
> extends StoreLiteSubscribe<D, L, TAG>,
    StoreLiteReadAsync<D, L>,
    StoreLiteSetAsync<D, L>,
    StoreLiteDeleteAsync<D, L> {}
