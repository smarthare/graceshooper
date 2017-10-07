import { combineReducers } from "redux";
import TestsReducer from "./reducer_tests";
import users from "./users";

const rootReducer = combineReducers({
  tests: TestsReducer,
  users
});

export default rootReducer;
