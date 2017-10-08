import { GOT_CATEGORIES } from '../actions';

const initialState = {
  categories: [],
  searchProducts: [],
  selectedProduct: {},
  ratingsProduct: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return Object.assign({}, state, { categories: action.payload });
    default:
      return state;
  }
};