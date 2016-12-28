import _ from 'lodash'
import { normalize, Schema, arrayOf } from 'normalizr'

import { consoleGroup } from '../../utils/utils'
import {
  POST_NEW_REVIEW,
  RECEIVE_NEW_REVIEW,
  REQUEST_REVIEWS,
  RECEIVE_REVIEWS,
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
        isLoading: true
      })

    case RECEIVE_NEW_REVIEW:
      consoleGroup('RECEIVE_NEW_REVIEW',[action])

      let normalizedReview = normalize(action.review, reviewSchema)
      consoleGroup('**Review Normalized',[normalizedReview])

      return Object.assign({},state,{
        reviewsById: Object.assign(
          {},
          state.reviewsById,
          normalizedReview.entities.reviews
        )
      })

    case REQUEST_REVIEWS:
      consoleGroup('REQUEST_REVIEWS',[action])
      return Object.assign({},state,{feed: {isLoading: true}})

    case RECEIVE_REVIEWS:
      consoleGroup('RECEIVE_REVIEWS',[action])

      let normalizedReviews = normalize(action.reviews, arrayOf(reviewSchema))
      consoleGroup('**Reviews Normalized',[normalizedReviews])

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
      consoleGroup('New State, Received Reviews',[newState])
      return newState

    default:
      consoleGroup('Review Reducer Default',[action])
      return state
  }
}