import { combineReducers } from "redux";

import burgerBuilderReducer from "./burgerBuilder";

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
});

export default rootReducer;
