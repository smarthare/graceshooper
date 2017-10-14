import axios from 'axios'

// action types
const GET_ORDERS = 'GET_ORDERS'
const CANCEL_ORDER = 'CANCEL_ORDER'

// action creators
export function getUserOrders (orders) {
  return { type: GET_ORDERS, orders }
}

// reducer
export default function users (orders = [{}], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
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
