import API from '../fixtures/api'
import reactor from '../reactor'
import {
    RECEIVE_REVIEWS,
    RECEIVE_REVIEW,
    UPDATE_REVIEW_STORE,
    LIKE_BUTTON,
} from '../constants/actionTypes'

export default {
  fetchReviews() {
    API.getReviews(reviews => {
      reactor.dispatch(RECEIVE_REVIEWS, { reviews })
    });
  },

  fetchReview(id) {
    API.getReview(id, review => {
      reactor.dispatch(RECEIVE_REVIEW, { review })
    });
  },

  likeButton(id) {
    reactor.dispatch(LIKE_BUTTON, { status: 'pending' })
    API.likeButton(id, review => {
      reactor.dispatch(LIKE_BUTTON, { review })
    });
  }
}