import { GOT_CATEGORIES, PRODUCTS_FOR_CATEGORY } from '../actions';

const initialState = {
  categories: [],
  searchTerm: '',
  selectedCategory: {},
  searchProducts: [],
  selectedProduct: {},
  reviewsProduct: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return Object.assign({}, state, { categories: action.payload });
    case PRODUCTS_FOR_CATEGORY:
      return Object.assign({}, state, {
        searchTerm: '',
        selectedCategory: action.payload,
        searchedProducts: action.payload.products,
        selectedProduct: {},
        reviewsProduct: []
      });
    default:
      return state;
  }
};
