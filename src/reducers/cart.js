import axios from 'axios'
// Will need to work with user part of the state to get user/address

const initialState = {
  cart: { lineItems: [
      {productId: 1, quantity: 1, price: null},
      {productId: 2, quantity: 10, price: null},
      {productId: 3, quantity: 3, price: null},
      {productId: 4, quantity: 15, price: null}
  ] }
}

/*
  ACTION TYPE
 */
const FETCH_CART = 'FETCH_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_LINE = 'REMOVE_LINE'

/*
  ACTION CREATOR
 */
const fetchUserCart = cart => ({ type: FETCH_CART, cart })
const addLineToCart = lineItem => ({ type: ADD_TO_CART, lineItem })
const removeLineFromCart = lineItem => ({ type: REMOVE_LINE, lineItem })

/*
  REDUCER
 */
export default (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return Object.assign(prevState, action.cart)
    case ADD_TO_CART:
      return { lineItems: [ action.lineItem, ...prevState.lineItems ], ...prevState }
    case REMOVE_LINE:
      return {
        lineItems: prevState.lineItems.filter(ln => ln !== action.lineItem),
        ...prevState
      }
    default:
      return prevState
  }
}

/*
  THUNK
 */
export const getUserCart = (userId) => dispatch => {
  return axios.get('/cart')
    .then(result => result.data)
    .then(cart => dispatch(fetchUserCart(cart)))
    .catch(() => console.log('error fetching cart for user'))
}

export const addProductToCart = (productId, quantity) => dispatch => {
  // Not addressing guest here. Potentially need to rewrite the order model
  // It might makes more sense to directly add lineItem if possible
  return axios.post('/lineItems', { productId, quantity })
    .then(lineItem => dispatch(addLineToCart(lineItem)))
}

export const deleteLnFromCart = (lineItem) => dispatch => {
  // if guest, simply dispatch
  if (!lineItem.id) return dispatch(removeLineFromCart(lineItem))
  return axios.delete(`/lineItem/${lineItem.id}`)
    .then(() => dispatch(removeLineFromCart(lineItem)))
}
