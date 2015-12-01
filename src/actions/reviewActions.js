import API from '../fixtures/api'
import reactor from '../reactor'
import {
    RECEIVE_REVIEWS,
} from '../constants/actionTypes'

export default {
  fetchReviews() {
    API.getReviews(reviews => {
      reactor.dispatch(RECEIVE_REVIEWS, { reviews })
    });
  },
}