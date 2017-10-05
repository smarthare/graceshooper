import { GOT_NEW_DATA, GOT_SINGLE_TEST } from '../actions';

const initialState = {
  tests: [],
  selectedTest: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_NEW_DATA:
      return Object.assign({}, state, { tests: action.payload.tests });
    case GOT_SINGLE_TEST:
      return Object.assign({}, state, { selectedTest: action.payload });
    default:
      return state;
  }
};
