import { Store, toImmutable } from 'nuclear-js'
import reactor from '../reactor'
import {
  RECEIVE_REVIEW,
  RECEIVE_REVIEWS,
  LIKE_BUTTON
} from '../constants/actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({})
  },

  initialize() {
    this.on(RECEIVE_REVIEW, receiveReview)
    this.on(RECEIVE_REVIEWS, receiveReviews)
    this.on(LIKE_BUTTON, likeButton)
  }
})

// All store handlers transform `(currentState, payload) => (newState)`

/**
 * Transforms an array of reviews to a map keyed by review._id, and merges it
 * with the current state.
 */
function receiveReview(state, payload) {
  if(payload.data.reviews != undefined) {
    let newReview = toImmutable(payload.data.reviews)
      .toMap()
      .mapKeys((k, v) => v.get('_id'))
    return state
      .mergeIn(['reviews'], newReview)
      .setIn(['current_review'], payload.id)
  } else {
    return state
  }
}

function receiveReviews(state, payload) {
  if(payload.status === 'ok') {
    let newReviews = toImmutable(payload.data.reviews)
      .toMap()
      .mapKeys((k, v) => v.get('_id'))
    return state
      .mergeIn(['reviews'], newReviews)
  } else {
    return state
  }
}

function likeButton(state, payload) {
  if (payload.status === 'ok') {
    let newReview = toImmutable(payload.data.reviews)
      .toMap()
      .mapKeys((k, v) => v.get('_id'))
    return state
      .mergeIn(['reviews'], newReview)
  } else {
    console.log('Like button pending...')
    return state
  } 
}
