import reactor from '../reactor'
import {
    LOGIN,
    GET_USER
} from '../constants/actionTypes'
import APIUtils from '../utils/APIUtils'
import Storage from '../utils/storage'

class RequestPayload {
  constructor(type, status, message, data, id) {
    this.type = type
    this.status = status
    this.message = message
    this.data = data
    this.id = id
  }
}

const authActions = {
  // Log In
  login(username, password) {
    let PendingRequestPayload = new RequestPayload('LOGIN', 'pending', '', {})
    reactor.dispatch(LOGIN, PendingRequestPayload)
    APIUtils.login(username, password, auth => {
      // Set Auth in Local Storage
      Storage.setItem('auth_token', auth.id)
      Storage.setItem('username', username)
      auth.username = username
      let CompletedRequestPayload = new RequestPayload('LOGIN', 'ok', '', auth)
      reactor.dispatch(LOGIN, CompletedRequestPayload)
      //getUser(auth.userId, auth.id)
    })
  },
  
  // Get User by ID
  getUser(id, token) {
    let PendingRequestPayload = new RequestPayload('GET_USER', 'pending', '', {})
    reactor.dispatch(GET_USER, PendingRequestPayload)
    APIUtils.getUser(id, token, user => {
      let CompletedRequestPayload = new RequestPayload('GET_USER', 'ok', '', user)
      reactor.dispatch(GET_USER, CompletedRequestPayload)
    })
  },

}

export default authActions