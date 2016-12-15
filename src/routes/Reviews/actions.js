import { ADD_REVIEW } from './constants'

export function addReview (review) {
  return {
    type : ADD_REVIEW,
    review : review
  }
}
