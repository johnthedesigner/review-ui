import { normalize, Schema, arrayOf } from 'normalizr'

import { consoleGroup } from '../../utils/utils'
import {
  RECEIVE_LOG_IN,
  RECEIVE_LOG_IN_ERROR,
  RECEIVE_LOG_OUT,
  REQUEST_LOG_IN,
  REQUEST_LOG_OUT,
} from './constants'

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
  reviews: thingReviewsSchema,
  error: errorSchema
})

// User Reducer
export default function reviews(state = {}, action) {
  switch (action.type) {
    case REQUEST_LOG_IN:
      consoleGroup('REQUEST_LOG_IN',[action])
      return Object.assign({},state,{
        isLoading: true
      })

    case RECEIVE_LOG_IN:
      consoleGroup('RECEIVE_LOG_IN',[action])
      return Object.assign({},state,{
        isLoading: false,
        isLoggedIn: true,
        auth: action.response,
        error: {}
      })

    case RECEIVE_LOG_IN_ERROR:
      consoleGroup('RECEIVE_LOG_IN_ERROR',[action])
      console.log(action)
      return Object.assign({},state,{
        isLoading: false,
        isLoggedIn: false,
        auth: {},
        error: action.response.error
      })

    case REQUEST_LOG_OUT:
      consoleGroup('REQUEST_LOG_OUT',[action])
      return Object.assign({},state,{
        isLoading: true,
        error: {}
      })

    case RECEIVE_LOG_OUT:
      consoleGroup('RECEIVE_LOG_OUT',[action])
      return Object.assign({},state,{
        isLoading: false,
        isLoggedIn: false,
        auth: {},
        error: {}
      })

    default:
      // consoleGroup('Admin Reducer Default',[action])
      return state
  }
}