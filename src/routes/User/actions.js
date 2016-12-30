import { consoleGroup } from '../../utils/utils'
import {
  RECEIVE_LOG_IN,
  RECEIVE_LOG_OUT,
  REQUEST_LOG_IN,
  REQUEST_LOG_OUT,
} from './constants'

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

export function receiveLogIn(user) {
  return {
    type : RECEIVE_LOG_IN,
    user : user
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
        dispatch(receiveLogIn(json))
      })
  }
}