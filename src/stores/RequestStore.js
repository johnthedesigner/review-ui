import { Store, toImmutable } from 'nuclear-js'
import reactor from '../reactor'
import {
  TRACK_REQUEST
} from '../constants/actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({})
  },

  initialize() {
    this.on(TRACK_REQUEST, trackRequest)
  }
})

// All store handlers transform `(currentState, payload) => (newState)`

/**
 * Transforms an array of reviews to a map keyed by review._id, and merges it
 * with the current state.
 */
function trackRequest(state, payload) {
  let newRequest = toImmutable(payload)
    .toMap()
  return state
    .setIn(['requests'], newRequest)
}
