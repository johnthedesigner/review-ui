import _ from 'lodash'
import { normalize, Schema, arrayOf } from 'normalizr'

import { consoleGroup } from '../../utils/utils'
import {
  POST_NEW_REVIEW,
  RECEIVE_REVIEW,
  RECEIVE_REVIEWS,
  REQUEST_REVIEW,
  REQUEST_REVIEWS,
} from './constants'

// TODO: Remove this when the back end provides dates
function getDate() {
  let d = new Date();
  return d
}

// Normalize API Response
const reviewSchema = new Schema('reviews')
const thingSchema = new Schema('things')
reviewSchema.define({
  thing: thingSchema
})

export default function reviews(state = {}, action) {
  switch (action.type) {
    case POST_NEW_REVIEW:
      consoleGroup('POST_NEW_REVIEW',[action])
      return Object.assign({},state,{
        currentReview: {
          isLoading: true
        }
      })

    case REQUEST_REVIEW:
      consoleGroup('REQUEST_REVIEW',[action])
      return Object.assign({},state,{currentReview: {isLoading: true}})

    case RECEIVE_REVIEW:
      consoleGroup('RECEIVE_REVIEW',[action])
      let normalizedReview = normalize(action.review, reviewSchema)

      if (normalizedReview.entities.reviews.undefined) {
        let wrappedReviewWithError = {}
        wrappedReviewWithError[action.id] = action.review
        return Object.assign({},state,{
          reviewsById: Object.assign( // Merge error into reviewsById
            {},
            state.reviewsById,
            wrappedReviewWithError
          ),
          currentReview: {
            id: action.id,
            isLoading: false
          }
        })

      } else {
        return Object.assign({},state,{ // Merge new review into state tree
          reviewsById: Object.assign(
            {},
            state.reviewsById,
            normalizedReview.entities.reviews
          ),
          thingsById: Object.assign(
            {},
            state.thingsById,
            normalizedReview.entities.things
          ),
          currentReview: {
            id: normalizedReview.result,
            isLoading: false
          }
        })
      }

    case REQUEST_REVIEWS:
      consoleGroup('REQUEST_REVIEWS',[action])
      return Object.assign({},state,{feed: {isLoading: true}})

    case RECEIVE_REVIEWS:
      consoleGroup('RECEIVE_REVIEWS',[action])
      let normalizedReviews = normalize(action.reviews, arrayOf(reviewSchema))

      let newState = Object.assign({},state,{
        reviewsById: Object.assign(
          {},
          state.reviewsById,
          normalizedReviews.entities.reviews
        ),
        thingsById: Object.assign(
          {},
          state.thingsById,
          normalizedReviews.entities.things
        ),
        feed: {
          items: normalizedReviews.result,
          isLoading: false
        }
      })
      return newState

    default:
      consoleGroup('Review Reducer Default',[action])
      return state
  }
}