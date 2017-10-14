import axios from 'axios'
/*
  ACTION TYPE
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_LINE = 'REMOVE_LINE'

/*
  ACTION CREATOR
 */
const getUserCart = cart => ({ type: GET_CART, cart })
const addLineToCart = lineItem => ({ type: ADD_TO_CART, lineItem })
const removeLineFromCart = lineItem => ({ type: REMOVE_LINE, lineItem })

/*
  REDUCER
 */
export default (prevState = {lineItems: []}, action) => {
  console.log('prevState:', prevState)
  switch (action.type) {
    case GET_CART:
      return Object.assign(prevState, action.cart)
    case ADD_TO_CART:
      return { ...prevState, lineItems: prevState.lineItems.concat(action.lineItem) }
    case REMOVE_LINE:
      return {
        ...prevState,
        lineItems: prevState.lineItems.filter(ln => ln !== action.lineItem)
      }
    default:
      return prevState
  }
}

/*
  THUNK
 */
export const fetchCart = () => dispatch => {
  return axios.get('/api/orders/cart')
    .then(result => result.data)
    .then(cart => dispatch(getUserCart(cart)))
    .catch(() => console.log('error fetching cart for user'))
}

export const addProductToCart = (productId, quantity) => dispatch => {
  // Not addressing guest here. Potentially need to rewrite the order model
  // It might makes more sense to directly add lineItem if possible
  return axios.post('/api/orders/lineItems', { productId, quantity })
    .then(result => result.data)
    .then(lineItem => {
      dispatch(addLineToCart(lineItem))
    })
}

export const deleteLnFromCart = (lineItem) => dispatch => {
  // if guest, simply dispatch
  if (!lineItem.id) return dispatch(removeLineFromCart(lineItem))
  return axios.delete(`/api/orders/lineItem/${lineItem.id}`)
    .then(() => dispatch(removeLineFromCart(lineItem)))
}
