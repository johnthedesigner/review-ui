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
    this.on(RECEIVE_REVIEW, trackRequest)
    this.on(RECEIVE_REVIEWS, trackRequest)
    this.on(LIKE_BUTTON, trackRequest)
  }
})

// All store handlers transform `(currentState, payload) => (newState)`

/**
 * Transforms an array of reviews to a map keyed by review._id, and merges it
 * with the current state.
 */
class RequestObject {
  constructor(type, status, id) {
    this[type] = {}
    if(id != undefined) {
      this[type][id] = {}
      this[type][id].status = status
      this[type][id].isPending = status === 'pending' ? true : false
    } else {
      this[type].status = status
      this[type].isPending = status === 'pending' ? true : false
    }
  }
}

function trackRequest(state, request) {
  let newRequest = toImmutable(new RequestObject(
    request.type,
    request.status,
    request.id
  ))
  return state
    .mergeDeep(newRequest)
}
