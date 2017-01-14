import { consoleGroup } from '../../utils/utils'
import {
  POST_NEW_REVIEW,
  RECEIVE_CURRENT_REVIEW,
  RECEIVE_REVIEW_FEED,
  RECEIVE_REVIEWS,
  REQUEST_CURRENT_REVIEW,
  REQUEST_REVIEW_FEED,
} from './constants'

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

    case RECEIVE_CURRENT_REVIEW:
      consoleGroup('RECEIVE_CURRENT_REVIEW',[action])
      return Object.assign({},state,{ // Merge new review into state tree
        currentReview: {
          id: action.id,
          isLoading: false
        }
      })

    case RECEIVE_REVIEW_FEED:
      consoleGroup('RECEIVE_REVIEW_FEED',[action])
      return Object.assign({},state,{
        feed: {
          items: action.items,
          isLoading: false
        }
      })

    case RECEIVE_REVIEWS:
      consoleGroup('RECEIVE_REVIEWS',[action])
      return Object.assign({},state,{
        reviewsById: Object.assign(
          {},
          state.reviewsById,
          action.reviews
        )
      })

    case REQUEST_CURRENT_REVIEW:
      consoleGroup('REQUEST_CURRENT_REVIEW',[action])
      return Object.assign({},state,{
        currentReview: {
          isLoading: true
        }
      })

    case REQUEST_REVIEW_FEED:
      consoleGroup('REQUEST_REVIEW_FEED',[action])
      return Object.assign({},state,{
        feed: {
          isLoading: true
        }
      })

    default:
      // consoleGroup('Thing Reducer Default',[action])
      return state
  }
}
