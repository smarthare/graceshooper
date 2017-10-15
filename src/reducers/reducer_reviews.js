import axios from "axios";

//action types

const GET_REVIEWS = 'GET_REVIEWS';

//action creators
export function getReviews(reviews) {
  return { type: GET_REVIEWS, reviews };
}

//helper function
function fetchAllReviews(dispatch) {
  return axios
    .get('/api/reviews')
    .then(res => {

      return dispatch(getReviews(res.data));
    })
    .catch(err => console.error(err));
}

//thunk creators
export function fetchReviews() {
  return function thunk(dispatch) {
    return fetchAllReviews(dispatch);
  };
}

//reducer

export default function Reviews(reviews = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
    console.log('............reviews:', action.reviews)
      return action.reviews;

    default:
      return reviews;
  }
}
