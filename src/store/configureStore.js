import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import {composeWithDevTools} from 'redux-devtools-extension' 
import rootReducer from "../reducers";
import rootWorkshopReducer from "../Workshop/ServiceAppointment/store/reducers/index";
import rootCRMReducer from "../CRM/store/reducers/index";

import {
  watchUserAuthentication,
  watchUser,
  watchDialer,
} from "../sagas/watchers";
import { watchServiceAppointment } from "../Workshop/ServiceAppointment/store/sagas/watchers";
import { watchInbound, watchOutbound } from "../CRM/store/saga/watchers";
import { createLogger } from "redux-logger";
function* rootSaga() {
  yield fork(watchUserAuthentication);
  yield fork(watchUser);
  yield fork(watchDialer);
  yield fork(watchServiceAppointment);
  yield fork(watchInbound);
  yield fork(watchOutbound);
}

const configureStore = () => {
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const parentReducer = combineReducers({
    ...rootWorkshopReducer,
    ...rootReducer,
    ...rootCRMReducer,
  });
  return {
    ...createStore(parentReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger))),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;
