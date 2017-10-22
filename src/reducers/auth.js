import axios from 'axios'

/*
  ACTION TYPE
 */
const SET = 'SET_CURRENT_USER'
const REMOVE = 'REMOVE_CURRENT_USER'

/*
  ACTION CREATOR
 */
const setCurrUser = user => ({ type: SET, user })
const removeCurrUser = () => ({ type: REMOVE })

/*
  REDUCER
 */
export default (currentUser = {}, action) => {
  switch (action.type) {
    case SET:
      return action.user
    case REMOVE:
      return {}
    default:
      return currentUser
  }
}

/*
  THUNK
 */
export const auth = (credentials, history, formName) => dispatch => {
  return axios.post(`/api/auth/${formName}`, credentials)
    .then(result => result.data)
    .then(user => {
      dispatch(setCurrUser(user))
      history.push('/account/')
    })
    .catch(err => dispatch(setCurrUser({err})))
}

export const fetchUserSession = () => (dispatch, getState) => {
  return axios.get('/api/auth')
    .then(result => result.data)
    .then(user => dispatch(setCurrUser(user)))
    .catch(() => console.log('not logged in'))
}

export const logout = history => dispatch => {
  return axios.delete('/api/auth')
    .then(() => {
      dispatch(removeCurrUser())
      history.push('/')
    })
    // .catch(() => console.log('problem during logout'))
}
