import { Store, toImmutable } from 'nuclear-js'
import { RECEIVE_REVIEWS } from '../constants/actionTypes'

// example product:
// {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "../common/assets/ipad-mini.png"}

export default Store({
  getInitialState() {
    return toImmutable({})
  },

  initialize() {
    this.on(RECEIVE_REVIEWS, receiveReviews)
  }
})

// All store handlers transform `(currentState, payload) => (newState)`

/**
 * Transforms an array of products to a map keyed by product.id, and merges it
 * with the current state.
 */
function receiveReviews(state, { reviews }) {
  let newReviews = toImmutable(reviews)
    .toMap()
    .mapKeys((k, v) => v.get('_id'))
  return state.merge(newReviews)
}
