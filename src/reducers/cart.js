import { } from '../actions';
import axios from 'axios';

const initialState = {
  // user: {}, <= this part of the state should focus on a single thing
  // activeCart: {},
  // Maybe addresses
  cart: { lineItems: [] }
}

// ACTION TYPE
export const GET_USER_CART = 'GET_USER_CART'
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_LINEITEM = 'REMOVE_LINEITEM';
// This action removes cart from store and add the returned (from db) order into orders store.
// However, need to handle both a user submission and a guest submission
export const SUBMIT_CART = 'SUBMIT_CART';

// ACTION CREATOR
export function getUserCart (cart) { return { type: GET_USER_CART, cart } }
export function addToCart (lineItem) { return { type: ADD_TO_CART, lineItem } }
export function removeLineItem (lnId) { return { type: REMOVE_LINEITEM, lnId }}
export function submitCart (something) {
  // Handle address and other things here
  /*
    Maybe this goes to orders reducer instead, or at least should fetchOrders right after
    ...Q: should order and cart be put into one file?
    Maybe not, this part might also need to take care of the handling of a guest order
  */
  return { type: SUBMIT_CART, something }
}

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

// THUNK

export const addProductToCart = (productId) => dispatch => {
  axios.
}

