import axios from 'axios';

// ***** ACTION TYPES *****

export const GOT_CATEGORIES = 'GOT_CATEGORIES';
export const PRODUCTS_FOR_CATEGORY = 'PRODUCTS_FOR_CATEGORY';
export const GOT_NEW_DATA = 'GOT_NEW_DATA';
export const GOT_SINGLE_TEST = 'GOT_SINGLE_TEST';

// ***** ACTION CREATORS *****

export function fetchCategories() {
  return axios.get('/api/categories')
    .then(res => res.data)
    .then(categories => {
      return { type: GOT_CATEGORIES, payload: categories };
    })
}

export function fetchProductsForCat(id) {
  return axios.get(`/api/categories/${ id }`)
    .then(res => res.data)
    .then(category => {
      return { type: PRODUCTS_FOR_CATEGORY, payload: category };
    })
}

//..........
//..........
//..........
//..........

export function removeTest(id) {
  // return axios.delete(`/api/tests/${ id }`)
  // .then(() => fetchData())
}

export function addTest(test) {
  // return axios.post('/api/tests', test)
  // .then(() => fetchData())
}

export function updateTest(test) {
  // return axios.put(`/api/tests/${ test.id }`, test)
  // .then(res => res.data)
  // .then(_test => {
  //   return gotSingleTest(_test.id)
  // })
}
