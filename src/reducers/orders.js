import axios from "axios";

// action types
const GET_ORDERS = "GET_ORDERS";
const GET_USER_ORDERS = "GET_USER_ORDERS";
const CANCEL_ORDER = "CANCEL_ORDER";
const CLEAR_ORDERS = 'CLEAR_ORDERS'

// action creators
export function getUserOrders(orders) {
  return { type: GET_USER_ORDERS, orders };
}

export function getOrders(orders) {
  return { type: GET_ORDERS, orders };
}

export const clearUserOrders = () => ({ type: CLEAR_ORDERS })


// reducer
// TO DO need to add reducer for getUserOrders
export default function users(orders = [], action) {
  switch (action.type) {
    case GET_ORDERS:

      return action.orders
    case CLEAR_ORDERS:
      return [{}]
    default:
      return orders;
  }
}

// thunk creators
export const fetchUserOrders = () => dispatch => {
  return axios
    .get(`/api/orders/currentUser`)
    .then(res => dispatch(getUserOrders(res.data)))
    .catch(err => console.error(err));
};

export const fetchOrders = () => dispatch => {
  return axios
    .get("/api/orders")
    .then(res => dispatch(getOrders(res.data)))
    .catch(err => console.error(err));
};
