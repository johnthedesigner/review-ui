import fetch from 'node-fetch'
import { browserHistory } from 'react-router'

import { consoleGroup } from '../../utils/utils'
import {
  POST_NEW_REVIEW,
  RECEIVE_REVIEW,
  RECEIVE_REVIEWS,
  REQUEST_REVIEW,
  REQUEST_REVIEWS
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
      .then(json => dispatch(receiveReview(json,id)))
  }
}

export function postNewReview() {
  return {
    type: POST_NEW_REVIEW
  }
}

export function createNewReview(review) {
  return dispatch => {
    dispatch(postNewReview())
    let body = JSON.stringify(review)
    let options = {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch('https://review-api.herokuapp.com/api/reviews',options)
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
      .then(json => dispatch(receiveReviews(json)))
  }
}
