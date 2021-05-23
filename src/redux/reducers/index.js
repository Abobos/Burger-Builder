import { combineReducers } from "redux";

import authReducer from "./auth";
import burgerBuilderReducer from "./burgerBuilder";
import orderReducer from "./orders";

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

export default rootReducer;
