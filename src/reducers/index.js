import { combineReducers } from "redux";
import TestsReducer from "./reducer_tests";
import users from "./users";
import orders from "./orders";
import categories from "./categories";
import ShopReducer from './reducer_shop'
import CartReducer from './reducer_cart'

const rootReducer = combineReducers({
  tests: TestsReducer,
  users,
  orders,
  categories,
  shop: ShopReducer,
  cart: CartReducer
});

export default rootReducer;
