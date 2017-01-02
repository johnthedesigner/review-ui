import { normalize, Schema, arrayOf } from 'normalizr'

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

function generateSlug(entity,id) {
  return entity.id
}
// Normalize Reviews API Response
const reviewSchema = new Schema('reviews')
const reviewThingSchema = new Schema('things')
const errorSchema = new Schema('errors', {idAttribute:'name'})
reviewSchema.define({
  thing: reviewThingSchema,
  error: errorSchema
})

// Normalize Things API Response
const thingSchema = new Schema('things')
const thingReviewsSchema = new Schema('reviews')
thingSchema.define({
  reviews: arrayOf(thingReviewsSchema),
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

      var reviewId = normalizedReview.result
      var reviewsToMerge = normalizedReview.entities.reviews
      var thingsToMerge = normalizedReview.entities.things

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
      return Object.assign({},state,{
        feed: {
          isLoading: true
        }
      })

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

    case POST_NEW_THING:
      consoleGroup('POST_NEW_THING',[action])
      return Object.assign({},state,{
        currentThing: {
          isLoading: true
        }
      })

    case REQUEST_THING:
      consoleGroup('REQUEST_THING',[action])
      return Object.assign({},state,{currentThing: {isLoading: true}})

    case RECEIVE_THING:
      consoleGroup('RECEIVE_THING',[action])
      let normalizedThing = normalize(action.thing, thingSchema)

      var thingId = normalizedThing.result
      var reviewsToMerge = normalizedThing.entities.reviews
      var thingsToMerge = normalizedThing.entities.things

      // If we got an error in our response, use it in place of review object
      if (normalizedThing.entities.errors) {
        thingId = action.id
        thingsToMerge[thingId] = normalizedThing.entities.errors
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
        currentThing: {
          id: thingId,
          isLoading: false
        }
      })

    case REQUEST_THINGS:
      consoleGroup('REQUEST_THINGS',[action])
      return Object.assign({},state,{
        thingList: {
          isLoading: true
        }
      })

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
      // consoleGroup('Thing Reducer Default',[action])
      return state
  }
}
