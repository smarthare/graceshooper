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
      return currentUser;
  }
}

/*
  THUNK
 */
const login = (credentials, history) => dispatch => {
  return axios.post('api/auth', credentials)
    .then(result => result.data)
    .then(user => {
      dispatch(setCurrUser(user))
      history.push(`/users/${user.id}`)
    })
    .catch(result => { throw result.response.data.error })
}

const fetchFromServer = () => dispatch => {
  return axios.get('api/auth')
    .then(result => result.data)
    .then(user => {
      dispatch(setCurrUser(user))
      // history.push?
    })
    .catch(() => console.log('not logged in'))
}

const logout = () => dispatch => {
  return axios.delete('api/auth')
    .then(() => dispatch(removeCurrUser()))
    // .catch(() => console.log('problem during logout'))
}
