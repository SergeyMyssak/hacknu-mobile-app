import { all, fork, takeLatest } from 'redux-saga/effects';

import {
  ActionType,
  AnySaga,
  IAction,
  IWatcherTree,
  Saga,
  SagaIterator,
  Watcher,
  WatcherIterator,
} from './types';

/**
 * Returns saga that forks array of sagas with all effect.
 * @param sagas - coming saga that will be forked.
 */
export function combineSagas(sagas: AnySaga[]): Saga {
  return function* (): SagaIterator {
    yield all(sagas.map(fork));
  };
}

/**
 * Utility that creates saga with takeLatest.
 * @param actionType - take every action type.
 * @param cb - call back saga that will be executed after dispatch.
 */
export function createWatcher(actionType: ActionType, cb: AnySaga): Watcher {
  return function* (): WatcherIterator {
    yield takeLatest<IAction>(actionType, cb);
  };
}

/**
 * Maps watcher tree into a saga array and combines them into one saga.
 * @param tree - watcher tree that will be mapped.
 */
export function mapWatcherTreeToSaga(tree: IWatcherTree): Saga {
  return combineSagas(Object.keys(tree).map((key: string) => createWatcher(key, tree[key])));
}
