import axios from "axios";

//action types

const GET_PRODUCTS = "GET_PRODUCTS";

//action creators
export function getProducts(products) {
  return { type: GET_PRODUCTS, products };
}

//helper function
function fetchAllProducts(dispatch) {
  return axios
    .get("/api/products")
    .then(res => {
      return dispatch(getProducts(res.data));
    })
    .catch(err => console.error(err));
}

//thunk creators
export function fetchProducts() {
  return function thunk(dispatch) {
    return fetchAllProducts(dispatch);
  };
}

export function deleteProduct(id) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/products/${id}`)
      .then(() => fetchAllProducts(dispatch))
      .catch(err => console.error(err));
  };
}

export function updateProduct(product) {
  return function thunk(dispatch) {
    return axios
      .put(`/api/products/${product.id}`, {
        title: product.title,
        description: product.description,
        price: product.price,
        inventory: product.inventory
      })
      .then(() => fetchAllProducts(dispatch))
      .catch(err => console.error(err));
  };
}

export function addProduct(product) {
  return function thunk(dispatch) {
    return axios
      .post("/api/products", {
        product: {
          title: product.title,
          description: product.description,
          price: product.price,
          inventory: product.inventory
        }
      })
      .then(() => fetchAllProducts(dispatch))
      .catch(err => console.error(err));
  };
}

//reducer

export default function Products(products = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    default:
      return products;
  }
}
