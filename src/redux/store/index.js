import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import reducer from "../reducers/index";

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("[Dispatching]", action, store.getState());
      next(action);
    };
  };
};

const composeEnhancer =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(logger, thunk))
);

export default store;
