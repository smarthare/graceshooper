import axios from "axios";

//action types

const GET_ORDERS_BY_ID = "GET_ORDERS_BY_ID";

//action creators
export function getOrdersById(orders) {
  return { type: GET_ORDERS_BY_ID, orders };
}

//thunk creators
export function fetchOrdersById(id) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/orders/${id}`)
      .then(res => dispatch(getOrdersById(res.data)))
      .catch(err => console.error(err));
  };
}

//reducer

export default function users(orders = [], action) {
  switch (action.type) {
    case GET_ORDERS_BY_ID:
      return action.orders;

    default:
      return orders;
  }
}
