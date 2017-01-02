import fetch from 'node-fetch'
import { browserHistory } from 'react-router'

import { consoleGroup } from '../../utils/utils'
import {
  POST_NEW_REVIEW,
  POST_NEW_THING,
  RECEIVE_REVIEW,
  RECEIVE_REVIEWS,
  RECEIVE_THING,
  RECEIVE_THINGS,
  REQUEST_REVIEW,
  REQUEST_REVIEWS,
  REQUEST_THING,
  REQUEST_THINGS,
} from './constants'

export function requestReview() {
  return {
    type: REQUEST_REVIEW
  }
}

export function receiveReview(review,id) {
  return {
    type : RECEIVE_REVIEW,
    review : review,
    id: id
  }
}

export function fetchReview(id) {
  return dispatch => {
    dispatch(requestReview())
    return fetch(`https://review-api.herokuapp.com/api/reviews/${id}/?filter[include]=thing`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveReview(json,id))
      })
  }
}

export function postNewReview() {
  return {
    type: POST_NEW_REVIEW
  }
}

export function createNewReview(review, access_token) {
  return dispatch => {
    dispatch(postNewReview())
    let body = JSON.stringify(review)
    let options = {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`https://review-api.herokuapp.com/api/reviews?access_token=${access_token}`,options)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveReview(json))
        browserHistory.push(`/review/${json.id}`)
      })
  }
}

export function requestReviews() {
  return {
    type: REQUEST_REVIEWS
  }
}

function receiveReviews(json) {
  return {
    type: RECEIVE_REVIEWS,
    reviews: json
  }
}

export function fetchReviews() {
  return dispatch => {
    dispatch(requestReviews())
    return fetch('https://review-api.herokuapp.com/api/reviews?filter[include]=thing')
      .then(response => response.json())
      .then(json => {
        dispatch(receiveReviews(json))
      })
  }
}

export function requestThing() {
  return {
    type: REQUEST_THING
  }
}

export function receiveThing(thing,id) {
  return {
    type : RECEIVE_THING,
    thing : thing,
    id: id
  }
}

export function fetchThing(id) {
  return dispatch => {
    dispatch(requestThing())
    return fetch(`https://review-api.herokuapp.com/api/things/${id}/?filter[include]=reviews`)
      .then(response => response.json())
      .then(json => dispatch(receiveThing(json,id)))
  }
}

export function requestThings() {
  return {
    type: REQUEST_THINGS
  }
}

function receiveThings(json) {
  return {
    type: RECEIVE_THINGS,
    things: json
  }
}

export function postNewThing() {
  return {
    type: POST_NEW_THING
  }
}

export function createNewThing(thing, access_token) {
  return dispatch => {
    dispatch(postNewThing())
    let body = JSON.stringify(thing)
    let options = {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`https://review-api.herokuapp.com/api/things?access_token=${access_token}`,options)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveThing(json))
        browserHistory.push(`/thing/${json.id}`)
      })
  }
}

export function fetchThings() {
  return dispatch => {
    dispatch(requestThings())
    return fetch('https://review-api.herokuapp.com/api/things?filter[include]=reviews')
      .then(response => response.json())
      .then(json => dispatch(receiveThings(json)))
  }
}
