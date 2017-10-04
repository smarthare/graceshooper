import { combineReducers } from 'redux';
import TestsReducer from './reducer_tests';

const rootReducer = combineReducers({
  tests: TestsReducer,
});

export default rootReducer;
