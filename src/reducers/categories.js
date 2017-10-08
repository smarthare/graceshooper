import axios from "axios";

//action types
const GET_CATEGORIES = "GET_CATEGORIES";

//action creators
export function getCategories(categories) {
  return { type: GET_CATEGORIES, categories };
}

//helper functions

function fetchAllCategories(dispatch) {
  return axios
    .get("/api/categories")
    .then(res => dispatch(getCategories(res.data)))
    .catch(err => console.error(err));
}

//thunk creators
export function fetchCategories() {
  return function thunk(dispatch) {
    return fetchAllCategories(dispatch);
  };
}

export function createCategory(category) {
  return function thunk(dispatch) {
    return axios
      .post(`/api/categories/${category}`)
      .then(() => fetchAllCategories(dispatch))
      .catch(err => console.error(err));
  };
}

export function deleteCategory(id) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/categories/${id}`)
      .then(() => fetchAllCategories(dispatch))
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
