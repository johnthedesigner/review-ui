import fetch from 'node-fetch'
import { browserHistory } from 'react-router'

import { consoleGroup } from '../../utils/utils'
import {
  REQUEST_REVIEWS,
  RECEIVE_REVIEWS,
  POST_NEW_REVIEW,
  RECEIVE_NEW_REVIEW
} from './constants'

export function postNewReview() {
  return {
    type: POST_NEW_REVIEW
  }
}

export function receiveNewReview (review) {
  return {
    type : RECEIVE_NEW_REVIEW,
    review : review
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
      .then(json => dispatch(receiveNewReview(json)))
      .then(() => browserHistory.push('/reviews'))
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
    return fetch('https://review-api.herokuapp.com/api/reviews')
      .then(response => response.json())
      .then(json => dispatch(receiveReviews(json)))
  }
}
