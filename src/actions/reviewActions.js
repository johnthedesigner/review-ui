import API from '../fixtures/api'
import reactor from '../reactor'
import {
    RECEIVE_REVIEWS,
    RECEIVE_REVIEW,
    UPDATE_REVIEW_STORE,
    LIKE_BUTTON,
    TRACK_REQUEST
} from '../constants/actionTypes'

export default {
  fetchReviews() {
    reactor.dispatch(TRACK_REQUEST, { RECEIVE_REVIEWS: 'pending' })
    API.getReviews(reviews => {
      reactor.batch( function() {
        reactor.dispatch(RECEIVE_REVIEWS, { reviews })
        reactor.dispatch(TRACK_REQUEST, { RECEIVE_REVIEWS: 'ok' })
      })
    });
  },

  fetchReview(id) {
    reactor.dispatch(TRACK_REQUEST, { RECEIVE_REVIEW: 'pending' })
    API.getReview(id, review => {
      reactor.batch( function() {
        reactor.dispatch(RECEIVE_REVIEW, { review })
        reactor.dispatch(TRACK_REQUEST, { RECEIVE_REVIEW: 'ok' })
      })
    });
  },

  likeButton(id) {
    reactor.dispatch(TRACK_REQUEST, { LIKE_BUTTON: 'pending' })
    API.likeButton(id, review => {
      reactor.batch( function() {
        reactor.dispatch(LIKE_BUTTON, { review })
        reactor.dispatch(TRACK_REQUEST, { LIKE_BUTTON: 'ok' })
      })
    });
  }
}