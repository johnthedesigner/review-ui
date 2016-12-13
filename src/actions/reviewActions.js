import API from '../fixtures/api'
import reactor from '../reactor'
import {
    RECEIVE_REVIEWS,
    RECEIVE_REVIEW,
    UPDATE_REVIEW_STORE,
    LIKE_BUTTON
} from '../constants/actionTypes'

class RequestPayload {
  constructor(type, status, message, data, id) {
    this.type = type
    this.status = status
    this.message = message
    this.data = data
    this.id = id
  }
}

export default {
  // Just get all reviews from fixtures
  fetchReviews() {
    let PendingRequestPayload = new RequestPayload('RECEIVE_REVIEWS', 'pending', '', {})
    reactor.dispatch(RECEIVE_REVIEWS, PendingRequestPayload)
    API.getReviews(reviews => {
      let CompletedRequestPayload = new RequestPayload('RECEIVE_REVIEWS', 'ok', '', {reviews: reviews})
      reactor.dispatch(RECEIVE_REVIEWS, CompletedRequestPayload)
    });
  },
  
  // Get reviews and list of review ids for feed
  fetchReviews() {
    let PendingRequestPayload = new RequestPayload('RECEIVE_REVIEWS', 'pending', '', {})
    reactor.dispatch(RECEIVE_REVIEWS, PendingRequestPayload)
    API.getReviews(reviews => {
      let CompletedRequestPayload = new RequestPayload('RECEIVE_REVIEWS', 'ok', '', {reviews: reviews})
      reactor.dispatch(RECEIVE_REVIEWS, CompletedRequestPayload)
    });
  },

  fetchReview(id) {
    let PendingRequestPayload = new RequestPayload('RECEIVE_REVIEW', 'pending', '', {}, id)
    reactor.dispatch(RECEIVE_REVIEW, PendingRequestPayload)
    API.getReview(id, review => {
      let CompletedRequestPayload = new RequestPayload('RECEIVE_REVIEW', 'ok', '', {reviews: review}, id)
      reactor.dispatch(RECEIVE_REVIEW, CompletedRequestPayload)
    });
  },

  likeButton(id) {
    let PendingRequestPayload = new RequestPayload('LIKE_BUTTON', 'pending', '', {}, id)
    reactor.dispatch(LIKE_BUTTON, PendingRequestPayload)
    API.likeButton(id, review => {
      let CompletedRequestPayload = new RequestPayload('LIKE_BUTTON', 'ok', '', {reviews: review}, id)
      reactor.dispatch(LIKE_BUTTON, CompletedRequestPayload)
    });
  },

  XlikeButton(id) {
    //reactor.dispatch(TRACK_REQUEST, { LIKE_BUTTON: 'pending' })
    API.likeButton(id, review => {
      reactor.batch( function() {
        reactor.dispatch(LIKE_BUTTON, { review })
        //reactor.dispatch(TRACK_REQUEST, { LIKE_BUTTON: 'ok' })
      })
    });
  }
}