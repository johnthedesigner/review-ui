import _ from 'lodash'

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

export default function reviews(state = {}, action) {
  switch (action.type) {
    case POST_NEW_REVIEW:
      consoleGroup('POST_NEW_REVIEW',[action])
      return Object.assign({},state,{
        isLoading: true
      })
    case RECEIVE_NEW_REVIEW:
      consoleGroup('RECEIVE_NEW_REVIEW',[action])
      return Object.assign({},state,{
        items: [
          ...state.items,
          action.review
        ]
      })
    case REQUEST_REVIEWS:
      consoleGroup('REQUEST_REVIEWS',[action])
      return Object.assign({},state,{
        isLoading: true
      })
    case RECEIVE_REVIEWS:
      consoleGroup('RECEIVE_REVIEWS',[action])
      let newState = Object.assign({},state,{
        items: [
          ...action.reviews,
          ...state.items
        ]
      })
      consoleGroup('New State, Received Reviews',[newState])
      return newState
    default:
      consoleGroup('Review Reducer Default',[action])
      return state
  }
}