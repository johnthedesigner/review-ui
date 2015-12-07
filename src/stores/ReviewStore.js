import { Store, toImmutable } from 'nuclear-js'
import reactor from '../reactor'
import {
  RECEIVE_REVIEW
} from '../constants/actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      reviews: {},
      loading: {}
    })
  },

  initialize() {
    this.on(RECEIVE_REVIEW, receiveReview)
  }
})

// All store handlers transform `(currentState, payload) => (newState)`

/**
 * Transforms an array of reviews to a map keyed by review._id, and merges it
 * with the current state.
 */
function receiveReview(state, payload) {
  let newReview = toImmutable(payload.review)
    .toMap()
    .mapKeys((k, v) => v.get('_id'))  
  return state.setIn(['reviews'], newReview)
}
