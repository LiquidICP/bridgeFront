import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configuredReactotron } from 'initialImports/reactotron';
import { StateTransaction } from 'types/store/transaction';
import reducer from './rootReducer';
import rootSaga from './rootSaga';
import { MetamaskState } from './metamask/types';
import { PlugState } from './plug/types';

const sagaMiddleware = createSagaMiddleware();

const metamaskPersistConfig = {
  key: 'metamask',
  storage,
  whitelist: ['address', 'status', 'balance'] as Array<keyof MetamaskState>,
};
const plugPersistConfig = {
  key: 'plug',
  storage,
  whitelist: ['accountId', 'connected'] as Array<keyof PlugState>,
};
const transactionPersistConfig = {
  key: 'transaction',
  storage,
  whitelist: ['from', 'transferAmount'] as Array<keyof StateTransaction>,
};

const reducers = {
  ...reducer,
  metamask: persistReducer(metamaskPersistConfig, reducer.metamask),
  plug: persistReducer(plugPersistConfig, reducer.plug),
  transaction: persistReducer(transactionPersistConfig, reducer.transaction),
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

export default (initialState: { [key: string]: never } = {}) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    window.__REDUX_DEVTOOLS_EXTENSION__ ||
    compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
      configuredReactotron != null
        ? configuredReactotron.createEnhancer()
        : (nope: unknown) => nope,
    ),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};
