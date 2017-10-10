import { GOT_NEW_DATA, GOT_SINGLE_TEST } from '../actions';

const initialState = {
  tests: [
    { id: 1, name: 'AJ Frank' },
    { id: 2, name: 'Di Fan' },
    { id: 3, name: 'Vince Rios' }
  ],
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
