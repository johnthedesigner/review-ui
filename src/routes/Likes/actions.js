import fetch from 'node-fetch'

import { consoleGroup } from '../../utils/utils'
import { fetchCurrentReview } from '../Reviews/actions'
import { fetchCurrentThing } from '../Things/actions'
import {
  LIKE_REVIEW_ERROR,
  LIKE_THING_ERROR,
  UNLIKE_REVIEW_ERROR,
  UNLIKE_THING_ERROR,
} from './constants'

export function likeReview(reviewId, reviewerId, access_token) {
  return dispatch => {
    let body = JSON.stringify({
      reviewId,
      reviewerId
    })
    let options = {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`https://review-api.herokuapp.com/api/likes?access_token=${access_token}`,options)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(likeReviewError(json.error))
        } else {
          dispatch(fetchCurrentReview(reviewId))
        }
      })
  }
}

function likeReviewError(error) {
  return {
    type: LIKE_REVIEW_ERROR,
    error: error
  }
}

export function unlikeReview(reviewId, likeId, access_token) {
  return dispatch => {
    let options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`https://review-api.herokuapp.com/api/likes/${likeId}?access_token=${access_token}`,options)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(unlikeReviewError(json.error))
        } else {
          dispatch(fetchCurrentReview(reviewId))
        }
      })
  }
}

function unlikeReviewError(error) {
  return {
    type: UNLIKE_REVIEW_ERROR,
    error: error
  }
}

export function likeThing(thingId, reviewerId, access_token) {
  return dispatch => {
    let body = JSON.stringify({
      thingId,
      reviewerId
    })
    let options = {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`https://review-api.herokuapp.com/api/likes?access_token=${access_token}`,options)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(likeThingError(json.error))
        } else {
          dispatch(fetchCurrentThing(thingId))
        }
      })
  }
}

function likeThingError(error) {
  return {
    type: LIKE_THING_ERROR,
    error: error
  }
}

export function unlikeThing(thingId, likeId, access_token) {
  return dispatch => {
    let options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`https://review-api.herokuapp.com/api/likes/${likeId}?access_token=${access_token}`,options)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(unlikeThingError(json.error))
        } else {
          dispatch(fetchCurrentThing(thingId))
        }
      })
  }
}

function unlikeThingError(error) {
  return {
    type: UNLIKE_THING_ERROR,
    error: error
  }
}
