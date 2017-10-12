import axios from 'axios'
// Will need to work with user part of the state to get user/address

const initialState = {
  // Maybe addresses
}

/*
  ACTION TYPE
 */
// This action removes cart from store and add the returned (from db) order into orders store.
// However, need to handle both a user submission and a guest submission
const BUILD_ORDER_FROM_CART = 'BUILD_ORDER_FROM_CART'
const SUBMIT_CART = 'SUBMIT_CART'

/*
  ACTION CREATOR
 */
  // Handle address and other things here
  /*
    Maybe this goes to orders reducer instead, or at least should fetchOrders right after
    ...Q: should order and cart be put into one file?
    Maybe not, this part might also need to take care of the handling of a guest order
  */
const submitCart = () => ({ type: SUBMIT_CART })

/*
  REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_CART:
    default:
      return cart
  }
}

/*
  THUNK
 */
// export const getUserCart = (userId) => dispatch => {
//   return axios.get('/cart')
//     .then(result => result.data)
//     .then(cart => dispatch(fetchUserCart(cart)))
//     .catch(() => console.log('error fetching cart for user'))
// }
// export const addProductToCart = (productId) => dispatch => {
//   axios.
// }
