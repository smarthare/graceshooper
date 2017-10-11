import { combineReducers } from "redux";
// import TestsReducer from "./reducer_tests";
import users from "./users";
import orders from "./orders";
import categories from "./categories";
import ShopReducer from "./reducer_shop";
import products from "./reducer_products";
// import CartReducer from './reducer_cart'

const rootReducer = combineReducers({
  users,
  orders,
  categories,
  products,
  shop: ShopReducer
});

export default rootReducer;
