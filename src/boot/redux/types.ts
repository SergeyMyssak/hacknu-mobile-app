import { Action } from 'redux';
import { AllEffect, ForkEffect } from 'redux-saga/effects';

/**
 * More explicit action that will be passed into reducers args at every dispatch.
 * @template P - actions payload.
 * @template M - actions metadata, not required one.
 */
export interface IAction<P = any, M = any> extends Action<ActionType> {
  payload?: P;
  meta?: M;
}

/**
 * Action creators representation.
 * @template P - actions payload.
 * @template M - actions metadata, not required one.
 */
export type ActionCreator<P = any, M = any> = (payload?: P, meta?: M) => IAction<P, M>;

// Actions type.
export type ActionType = string;

// For any saga iterator types.
export type AnySaga = (action?: IAction) => Iterator<any>;

// Saga yielding iterator type.
export type SagaIterator = Iterator<AllEffect<ForkEffect>>;

// Saga that yields with SagaIterator.
export type Saga = () => SagaIterator;

// Saga combiner util types.
export type WatcherIterator = Iterator<ForkEffect>;
export type Watcher = () => WatcherIterator;

// Watcher tree interface, for better interaction with watchers.
export interface IWatcherTree extends ITree<AnySaga> {}

export interface ITree<V> {
  [key: string]: V;
}
