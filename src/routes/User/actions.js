import { browserHistory } from 'react-router'

import { consoleGroup } from '../../utils/utils'
import {
  RECEIVE_LOG_IN,
  RECEIVE_LOG_IN_ERROR,
  RECEIVE_LOG_OUT,
  RECEIVE_NEW_USER,
  RECEIVE_NEW_USER_ERROR,
  REQUEST_LOG_IN,
  REQUEST_LOG_OUT,
  REQUEST_NEW_USER,
} from './constants'
import {
  newUserMessage
} from '../../store/messages/messageCreators'

export function requestLogOut() {
  return {
    type: REQUEST_LOG_OUT
  }
}

export function receiveLogOut(response) {
  return {
    type: RECEIVE_LOG_OUT,
    response: response
  }
}

export function fetchLogOut(user) {
  return dispatch => {
    dispatch(requestLogOut())
    return fetch(`https://review-api.herokuapp.com/api/reviewers/logout?access_token=${encodeURI(user.auth.id)}`, {
      method: 'POST',
      body: {}
    })
    .then(response => {
      dispatch(receiveLogOut(response))
    })
  }
}

export function requestLogIn() {
  return {
    type: REQUEST_LOG_IN
  }
}

export function receiveLogIn(response) {
  return {
    type : RECEIVE_LOG_IN,
    response : response
  }
}

export function receiveLogInError(error) {
  return {
    type : RECEIVE_LOG_IN_ERROR,
    error : error
  }
}

export function fetchLogIn(credentials) {
  return dispatch => {
    dispatch(requestLogIn())
    return fetch('https://review-api.herokuapp.com/api/reviewers/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if (!json.error) {
        dispatch(receiveLogIn(json))
      } else {
        dispatch(receiveLogInError(json.error))
      }
    })
  }
}

export function requestNewUser() {
  return {
    type: REQUEST_NEW_USER
  }
}

export function receiveNewUser(response) {
  return {
    type : RECEIVE_NEW_USER,
    response : response,
    alert: {
      message: newUserMessage(response.username)
    }
  }
}

export function receiveNewUserError(error) {
  return {
    type : RECEIVE_NEW_USER_ERROR,
    error : error
  }
}

export function fetchNewUser(credentials) {
  return dispatch => {
    dispatch(requestNewUser())
    return fetch('https://review-api.herokuapp.com/api/reviewers', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if (!json.error) {
        dispatch(receiveNewUser(json))
        browserHistory.push(`/login`)
      } else {
        dispatch(receiveNewUserError(json.error))
      }
    })
  }
}
