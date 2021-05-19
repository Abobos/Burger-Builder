import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import reducer from "../reducers/index";

const isDevelopment = process.env.NODE_ENV === "development";

const logger = (store) => {
  return (next) => {
    return (action) => {
      isDevelopment && console.log("[Dispatching]", action, store.getState());
      next(action);
    };
  };
};

const composeEnhancer = isDevelopment
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(logger, thunk))
);

export default store;
