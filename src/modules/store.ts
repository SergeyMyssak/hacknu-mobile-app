import { AuthActionTypes } from '@modules/auth/types';
import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reduxThunk from 'redux-thunk';

import rootReducer, { AppState } from './reducers';
import rootSaga from './sagas';

const authPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'],
};

const appReducer = (state, action): AppState => {
  if (action.type === AuthActionTypes.SIGN_OUT_SUCCESS) {
    state = undefined;
  }

  return rootReducer(state, action);
};

const persistedReducer = persistReducer(authPersistConfig, appReducer);

const sagaMiddleware = createSagaMiddleware();
const middleware = __DEV__
  ? applyMiddleware(reduxThunk, sagaMiddleware, reduxLogger)
  : applyMiddleware(reduxThunk, sagaMiddleware);

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor };
export default store;
