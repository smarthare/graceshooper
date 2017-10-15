import { combineReducers } from 'redux'
// import TestsReducer from "./reducer_tests";
import auth from './auth'
import cart from './cart'
import users from './users'
import orders from './orders'
import categories from './categories'
import ShopReducer from './reducer_shop'
import products from './reducer_products'
import reviews from './reducer_reviews'

const rootReducer = combineReducers({
  currentUser: auth,
  cart,
  users,
  orders,
  categories,
  products,
  reviews,
  shop: ShopReducer
})

export default rootReducer
export * from './auth'
export * from './cart'
export * from './orders'
export * from './users'
export * from './categories'
export * from './reducer_products'
export * from './reducer_reviews'
