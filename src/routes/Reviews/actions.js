import { ADD_REVIEW } from './constants'

export function addReview (title) {
  return {
    type : ADD_REVIEW,
    title : title
  }
}
