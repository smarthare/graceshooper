import axios from 'axios';

// ***** ACTION TYPES *****

export const GOT_NEW_DATA = 'GOT_NEW_DATA';
export const GOT_SINGLE_TEST = 'GOT_SINGLE_TEST';

// ***** ACTION CREATORS *****

export function removeTest(id) {
  return axios.delete(`/api/tests/${ id }`)
  .then(() => fetchData())
}

export function addTest(test) {
  return axios.post('/api/tests', test)
  .then(() => fetchData())
}

export function fetchData() {
  return Promise.all([
    axios.get('/api/tests')
  ])
  .then(results => {
    const tests = results[0].data;
    return { type: GOT_NEW_DATA, payload: { tests } };
  })
}

export function gotSingleTest(id) {
  return axios.get(`/api/tests/${ id }`)
  .then(res => res.data)
  .then(selectedTest => {
    return { type: GOT_SINGLE_TEST, payload: selectedTest };
  })
}

export function updateTest(test) {
  return axios.put(`/api/tests/${ test.id }`, test)
  .then(res => res.data)
  .then(_test => {
    return gotSingleTest(_test.id)
  })
}
