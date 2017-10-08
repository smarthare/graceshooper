import axios from "axios";

//action types
const GET_CATEGORIES = "GET_CATEGORIES";

//action creators
export function getCategories(categories) {
  return { type: GET_CATEGORIES, categories };
}

//thunk creators
export function fetchCategories() {
  return function thunk(dispatch) {
    return axios
      .get("/api/categories")
      .then(res => dispatch(getCategories(res.data)))
      .catch(err => console.error(err));
  };
}

//reducer
export default function categories(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
}
