import { Store, toImmutable } from 'nuclear-js'
import {
  RECEIVE_REVIEWS,
  LIKE_BUTTON
} from '../constants/actionTypes'

// example product:
// {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "image": "../common/assets/ipad-mini.png"}

export default Store({
  getInitialState() {
    return toImmutable({
      reviews: {},
      loading: {}
    })
  },

  initialize() {
//    this.on(RECEIVE_REVIEWS, receiveReviews)
//    this.on(LIKE_BUTTON, likeButton)
  }
})

// All store handlers transform `(currentState, payload) => (newState)`

/**
 * Transforms an array of reviews to a map keyed by review._id, and merges it
 * with the current state.
 */
function receiveReviews(state, payload) {
  console.log(payload.status)
  if (payload.status === 'pending') {
    console.log('Reviews pending...')
    return state
      .mergeIn(['loading'], toImmutable({receive_reviews: 'pending'}))
  } else {
    let newReviews = toImmutable(payload.reviews)
      .toMap()
      .mapKeys((k, v) => v.get('_id'))
    return state
      .mergeIn(['reviews'], newReviews)
      .mergeIn(['loading'], toImmutable({receive_reviews: 'done'}))
  } 
}

function likeButton(state, payload) {
  if (payload.status === 'pending') {
    console.log('Like button pending...')
    return state
      .setIn(['loading'], toImmutable({like_button: 'pending'}))
  } else {
    let newReview = toImmutable(payload.review)
      .toMap()
      .mapKeys((k, v) => v.get('_id'))
    return state
      .mergeIn(['reviews'], newReview)
      .mergeIn(['loading'], toImmutable({like_button: 'done'}))
  } 
}
