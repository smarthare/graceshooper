import axios from 'axios';
// Will need to work with user part of the state to get user/address

const initialState = {
  // user: {}, <= this part of the state should focus on a single thing
  // Maybe addresses
  cart: { lineItems: [] }
}

/*
  ACTION TYPE
 */
const GET_USER_CART = 'GET_USER_CART'
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_LINEITEM = 'REMOVE_LINEITEM';
// This action removes cart from store and add the returned (from db) order into orders store.
// However, need to handle both a user submission and a guest submission
const SUBMIT_CART = 'SUBMIT_CART';

/*
  ACTION CREATOR
 */
const getUserCart = cart => ({ type: GET_USER_CART, cart })
const addToCart = lineItem => ({ type: ADD_TO_CART, lineItem })
const removeLineItem = lnId => ({ type: REMOVE_LINEITEM, lnId })
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
export default (cart = initialState, action) => {
  switch (action.type) {
    case GET_USER_CART:
      return action.cart
    case ADD_TO_CART:
      return { lineItems: [ action.lineItem, ...cart.lineItems ], ...cart }
    case REMOVE_LINEITEM:
      return { lineItems: cart.lineItems.filter(ln => ln.id !== action.lnId), ...cart }
    default:
      return cart;
  }
};

/*
  THUNK
 */
// export const get
// export const addProductToCart = (productId) => dispatch => {
//   axios.
// }

