import { ActionCreator, ActionType, IAction } from './types';

/**
 * Creates new action by IAction interface.
 * @param type - namespaced action type.
 * @param payload - actions payload, assume that its going to be serialized and pushed into the state.data.
 * @param meta - actions metadata, like filters, ids, language settings or more.
 */
export const createAction = <P = any, M = {}>(
  type: ActionType,
  payload?: P,
  meta?: M,
): IAction<P, M> => ({ type, payload, meta });

/**
 * Action creator short util function.
 * @param type - namespaced action type.
 */
export const createActionCreator = <P = any, M = {}>(type: ActionType): ActionCreator<P, M> => (
  payload?: P,
  meta?: M,
): IAction<P, M> => createAction(type, payload, meta);
