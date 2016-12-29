import { normalize, Schema, arrayOf } from 'normalizr'

import { consoleGroup } from '../../utils/utils'
import {
  POST_NEW_REVIEW,
  RECEIVE_REVIEW,
  RECEIVE_REVIEWS,
  RECEIVE_THINGS,
  REQUEST_REVIEW,
  REQUEST_REVIEWS,
  REQUEST_THINGS,
} from './constants'

// Normalize Reviews API Response
const reviewSchema = new Schema('reviews')
const thingsSchema = new Schema('things')
const errorSchema = new Schema('errors', {idAttribute:'name'})
reviewSchema.define({
  thing: thingSchema,
  error: errorSchema
})

// Normalize Things API Response
const thingSchema = new Schema('things')
const reviewsSchema = new Schema('reviews')
thingSchema.define({
  reviews: reviewsSchema,
  error: errorSchema
})

// Reviews Reducer
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

      let reviewId = normalizedReview.result
      let reviewsToMerge = normalizedReview.entities.reviews
      let thingsToMerge = normalizedReview.entities.things

      // If we got an error in our response, use it in place of review object
      if (normalizedReview.entities.errors) {
        reviewId = action.id
        reviewsToMerge[reviewId] = normalizedReview.entities.errors
      }

      return Object.assign({},state,{ // Merge new review into state tree
        reviewsById: Object.assign(
          {},
          state.reviewsById,
          reviewsToMerge
        ),
        thingsById: Object.assign(
          {},
          state.thingsById,
          thingsToMerge
        ),
        currentReview: {
          id: reviewId,
          isLoading: false
        }
      })

    case REQUEST_REVIEWS:
      consoleGroup('REQUEST_REVIEWS',[action])
      return Object.assign({},state,{feed: {isLoading: true}})

    case RECEIVE_REVIEWS:
      consoleGroup('RECEIVE_REVIEWS',[action])
      let normalizedReviews = normalize(action.reviews, arrayOf(reviewSchema))

      let receiveReviewsState = Object.assign({},state,{
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
      return receiveReviewsState

      case REQUEST_THINGS:
        consoleGroup('REQUEST_THINGS',[action])
        return Object.assign({},state,{thingList: {isLoading: true}})

      case RECEIVE_THINGS:
        consoleGroup('RECEIVE_THINGS',[action])
        let normalizedThings = normalize(action.things, arrayOf(thingSchema))

        let receiveThingsState = Object.assign({},state,{
          reviewsById: Object.assign(
            {},
            state.reviewsById,
            normalizedThings.entities.reviews
          ),
          thingsById: Object.assign(
            {},
            state.thingsById,
            normalizedThings.entities.things
          ),
          thingsList: {
            items: normalizedThings.result,
            isLoading: false
          }
        })
        return receiveThingsState

    default:
      consoleGroup('Thing Reducer Default',[action])
      return state
  }
}