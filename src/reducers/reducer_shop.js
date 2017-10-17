import { PRODUCTS_FOR_CATEGORY, WRITE_SEARCH_TERM } from '../actions';

const initialState = {
  searchTerm: '',
  searchCategory: 0,
  selectedCategory: {},
  searchProducts: [],
  selectedProduct: {},
  reviewsProduct: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_FOR_CATEGORY:
      if (action.payload.searchTerm) {
        return Object.assign({}, state, {
          searchTerm: action.payload.searchTerm,
          searchCategory: action.payload.id,
          selectedCategory: action.payload,
          searchProducts: action.payload.products,
          selectedProduct: {},
          reviewsProduct: []
        });
      } else {
        return Object.assign({}, state, {
          searchTerm: '',
          searchCategory: action.payload.id,
          selectedCategory: action.payload,
          searchProducts: action.payload.products,
          selectedProduct: {},
          reviewsProduct: []
        });
      }
    case WRITE_SEARCH_TERM:
      return Object.assign({}, state, {
        searchTerm: action.payload.searchTerm,
        searchCategory: action.payload.searchCategory });
    default:
      return state;
  }
};
