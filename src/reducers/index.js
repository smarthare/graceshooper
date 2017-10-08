import { combineReducers } from "redux";
import TestsReducer from "./reducer_tests";
import users from "./users";
import orders from "./orders";
import categories from "./categories";

const rootReducer = combineReducers({
  tests: TestsReducer,
  users,
  orders,
  categories
});

export default rootReducer;
