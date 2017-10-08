import axios from 'axios';

// ***** ACTION TYPES *****

export const GOT_CATEGORIES = 'GOT_CATEGORIES';
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

export function gotSingleTest(id) {
  return { type: GOT_SINGLE_TEST, payload: { id: 3, name: 'Vince Rios' } };
  // return axios.get(`/api/tests/${ id }`)
  // .then(res => res.data)
  // .then(selectedTest => {
  //   return { type: GOT_SINGLE_TEST, payload: selectedTest };
  // })
}

export function updateTest(test) {
  // return axios.put(`/api/tests/${ test.id }`, test)
  // .then(res => res.data)
  // .then(_test => {
  //   return gotSingleTest(_test.id)
  // })
}
