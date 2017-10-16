import axios from 'axios'

// action types
const GET_ORDERS = 'GET_ORDERS'
const CANCEL_ORDER = 'CANCEL_ORDER'
const CLEAR_ORDERS = 'CLEAR_ORDERS'

// action creators
export const getUserOrders = orders => ({ type: GET_ORDERS, orders })
export const clearUserOrders = () => ({ type: CLEAR_ORDERS })

// reducer
export default function users (orders = [{}], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case CLEAR_ORDERS:
      return [{}]
    default:
      return orders
  }
}

// thunk creators
export const fetchOrders = () => dispatch => {
  return axios.get(`/api/orders/`)
    .then(res => dispatch(getUserOrders(res.data)))
    .catch(err => console.error(err))
}
