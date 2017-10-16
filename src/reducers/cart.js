import axios from 'axios'
/*
  ACTION TYPE
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_LINE = 'REMOVE_LINE'
const SUBMIT_CART = 'SUBMIT_CART'

/*
  ACTION CREATOR
 */
const getUserCart = cart => ({ type: GET_CART, cart })
const addLineToCart = lineItem => ({ type: ADD_TO_CART, lineItem })
const removeLineFromCart = lineItem => ({ type: REMOVE_LINE, lineItem })
const submitUserCart = () => ({ type: SUBMIT_CART })

/*
  REDUCER
 */
export default (prevState = {lineItems: []}, action) => {
  switch (action.type) {
    case GET_CART:
      return Object.assign(prevState, action.cart)
    case ADD_TO_CART:
      const
        oldLns = prevState.lineItems,
        newLns = oldLns.slice(),
        lnIdx = oldLns.findIndex(el => el.productId === action.lineItem.productId)

      lnIdx < 0 ? newLns.splice(lnIdx, 0, action.lineItem)
                : newLns.splice(lnIdx, 1, action.lineItem)
      return { ...prevState, lineItems: newLns }
    case REMOVE_LINE:
      return {
        ...prevState,
        lineItems: prevState.lineItems.filter(ln => ln !== action.lineItem)
      }
    case SUBMIT_CART:
      return {lineItems: []}
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
    .catch(err => console.log('error fetching cart for user', err))
}

export const addProductToCart = (productId, quantity) => dispatch => {
  // Not addressing guest here. Potentially need to rewrite the order model
  // It might makes more sense to directly add lineItem if possible
  return axios.post('/api/orders/lineItems', { productId, quantity })
    .then(result => result.data)
    .then(lineItem => dispatch(addLineToCart(lineItem)))
    .catch(console.log)
}

export const deleteLnFromCart = (lineItem) => dispatch => {
  if (!lineItem.id) return dispatch(removeLineFromCart(lineItem))
  return axios.delete(`/api/orders/lineItems/${lineItem.id}`)
    .then(() => dispatch(removeLineFromCart(lineItem)))
    .catch(console.log)
}

export const submitCart = () => dispatch => {
  return axios.put('/api/orders/')
    .then(() => dispatch(submitUserCart()))
    .catch(console.log)
}
