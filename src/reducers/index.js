import { combineReducers } from "redux";
import TestsReducer from "./reducer_tests";
import users from "./users";
import orders from "./orders";

const rootReducer = combineReducers({
  tests: TestsReducer,
  users,
  orders
});

export default rootReducer;
