import reactor from '../reactor'
import {
    RECEIVE_REVIEWS,
    RECEIVE_REVIEW,
    UPDATE_REVIEW_STORE,
    LIKE_BUTTON,
} from '../constants/actionTypes'

export default {
  trackRequest(requestType, status) {
    reactor.dispatch(requestType, {status: status})
  },
