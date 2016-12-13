import { Store, toImmutable } from 'nuclear-js'
import reactor from '../reactor'
import {
  LOGIN
} from '../constants/actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({})
  },
  
  initialize() {
    this.on(LOGIN, login)
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

function login(state, payload) {
  if(payload.data != undefined) {
    let auth = toImmutable(payload.data)
    return state
      .merge(auth)
  } else {
    return state
  }
}
