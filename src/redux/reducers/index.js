import { combineReducers } from "redux";

import burgerBuilderReducer from "./burgerBuilder";
import orderReducer from "./orders";

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  order: orderReducer,
});

export default rootReducer;
