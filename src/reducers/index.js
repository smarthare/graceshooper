import { combineReducers } from 'redux'
import ShopReducer from './reducer_shop'
import CartReducer from './reducer_cart'

const rootReducer = combineReducers({
  shop: ShopReducer,
  cart: CartReducer
})

export default rootReducer
