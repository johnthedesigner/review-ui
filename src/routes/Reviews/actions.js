import fetch from 'node-fetch'
import { browserHistory } from 'react-router'
import { normalize, Schema, arrayOf } from 'normalizr'

import { consoleGroup } from '../../utils/utils'
import { receiveThings } from '../Things/actions'
import {
  LIKE_REVIEW_ERROR,
  POST_NEW_REVIEW,
  RECEIVE_CURRENT_REVIEW,
  RECEIVE_CURRENT_REVIEW_ERROR,
  RECEIVE_REVIEW_FEED,
  RECEIVE_REVIEWS,
  REQUEST_CURRENT_REVIEW,
  REQUEST_REVIEW_FEED,
} from './constants'

// Normalize Reviews API Response
const reviewSchema = new Schema('reviews')
const reviewThingSchema = new Schema('things')
const errorSchema = new Schema('errors', {idAttribute:'name'})
reviewSchema.define({
  thing: reviewThingSchema,
  error: errorSchema
})

export function postNewReview() {
  return {
    type: POST_NEW_REVIEW
  }
}

function receiveCurrentReview(id) {
  return {
    type: RECEIVE_CURRENT_REVIEW,
    id: id
  }
}

function receiveCurrentReviewError(error) {
  return {
    type: RECEIVE_CURRENT_REVIEW,
    error: error
  }
}

function receiveReviewFeed(items) {
  return {
    type: RECEIVE_REVIEW_FEED,
    items: items
  }
}

export function receiveReviews(reviews) {
  return {
    type: RECEIVE_REVIEWS,
    reviews: reviews
  }
}

export function requestCurrentReview() {
  return {
    type: REQUEST_CURRENT_REVIEW
  }
}

export function requestReviewFeed() {
  return {
    type: REQUEST_REVIEW_FEED
  }
}

export function fetchCurrentReview(id) {
  return dispatch => {
    dispatch(requestCurrentReview())
    let filterProps = {
      include: [
        'likes',
        {thing: 'likes'}
      ]
    }
    let filter = JSON.stringify(filterProps)
    return fetch(`https://review-api.herokuapp.com/api/reviews/${id}/?filter=${filter}`)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(receiveCurrentReviewError(json.error))
        } else {
          let normalized = normalize(json, reviewSchema)
          dispatch(receiveReviews(normalized.entities.reviews))
          dispatch(receiveThings(normalized.entities.things))
          dispatch(receiveCurrentReview(normalized.result))
        }
      })
  }
}

export function fetchReviewList() {
  return dispatch => {
    dispatch(requestReviewFeed())
    let filterProps = {
      include: [
        'likes',
        {thing: 'likes'}
      ]
    }
    let filter = JSON.stringify(filterProps)
    return fetch(`https://review-api.herokuapp.com/api/reviews?filter=${filter}`)
      .then(response => response.json())
      .then(json => {
        let normalized = normalize(json, arrayOf(reviewSchema))
        dispatch(receiveReviews(normalized.entities.reviews))
        dispatch(receiveThings(normalized.entities.things))
        dispatch(receiveReviewFeed(normalized.result))
      })
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
        if (json.error) {
          dispatch(createNewReviewError(json.error))
        } else {
          let normalized = normalize(json, reviewSchema)
          dispatch(receiveReviews(normalized.entities.reviews))
          dispatch(receiveThings(normalized.entities.things))
          dispatch(receiveCurrentReview(normalized.result))
          browserHistory.push(`/review/${json.id}`)
        }
      })
  }
}

function createNewReviewError(error) {
  return {
    type: CREATE_NEW_REVIEW_ERROR,
    error: error
  }
}

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
