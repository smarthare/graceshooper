import axios from "axios"

// action types
const GET_ORDERS = "GET_USER_ORDERS"
const CANCEL_ORDER = 'CANCEL_ORDER'
const CLEAR_ORDERS = 'CLEAR_ORDERS'

// action creators
const getUserOrders = orders => ({ type: GET_ORDERS, orders })
const cancelUserOrder = orderId => ({ type: CANCEL_ORDER, orderId })
export const clearUserOrders = () => ({ type: CLEAR_ORDERS })

// reducer
export default function users (prevState = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case CANCEL_ORDER:
      const
        orderIdx = prevState.findIndex(el => el.id === action.orderId),
        oldOrder = prevState[orderIdx],
        newOrders = prevState.slice(),
        updatedOrder = { ...oldOrder, status: 'Cancelled' }

      newOrders.splice(orderIdx, 1, updatedOrder)

      return newOrders
    case CLEAR_ORDERS:
      return [{}]
    default:
      return prevState
  }
}

// thunk creators
export const fetchOrders = () => dispatch => {
  return axios
    .get(`/api/orders/`)
    .then(res => dispatch(getUserOrders(res.data)))
    .catch(err => console.error(err))
}

export const cancalOrder = id => dispatch => {
  return axios
    .put(`/api/orders/${id}`, {status: 'Cancelled'})
    .then(() => dispatch(cancelUserOrder(id)))
    .catch(err => console.error(err))
}
