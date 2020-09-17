import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import ReduxLogger from "redux-logger";

import rootReducer from "../data/reducers";
import rootSaga from "../data/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, ReduxLogger)
);
sagaMiddleware.run(rootSaga);

export default store;