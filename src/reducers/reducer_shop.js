import { } from '../actions';

const initialState = {
  categories: [],
  searchProducts: [],
  selectedProduct: {},
  ratingsProduct: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};