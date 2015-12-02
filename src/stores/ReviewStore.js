import { Store, toImmutable } from 'nuclear-js'
import reactor from '../reactor'
import {
  RECEIVE_REVIEW
} from '../constants/actionTypes'

// example product:
// {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "../common/assets/ipad-mini.png"}

export default Store({
  getInitialState() {
    return toImmutable({})
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
function receiveReview(state, { review }) {
  let newReview = toImmutable(review)
    .toMap()
    .mapKeys((k, v) => v.get('_id'))  
  return state = (newReview)
}