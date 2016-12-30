import { consoleGroup } from '../../utils/utils'
import {
  RECEIVE_LOG_IN,
  RECEIVE_LOG_IN_ERROR,
  RECEIVE_LOG_OUT,
  RECEIVE_NEW_USER,
  RECEIVE_NEW_USER_ERROR,
  REQUEST_LOG_IN,
  REQUEST_LOG_OUT,
  REQUEST_NEW_USER,
} from './constants'

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
        auth: action.response
      })

    case RECEIVE_LOG_IN_ERROR:
      consoleGroup('RECEIVE_LOG_IN_ERROR',[action])
      return Object.assign({},state,{
        isLoading: false,
        isLoggedIn: false,
        auth: {}
      })

    case REQUEST_LOG_OUT:
      consoleGroup('REQUEST_LOG_OUT',[action])
      return Object.assign({},state,{
        isLoading: true
      })

    case RECEIVE_LOG_OUT:
      consoleGroup('RECEIVE_LOG_OUT',[action])
      return Object.assign({},state,{
        isLoading: false,
        isLoggedIn: false,
        auth: {}
      })

    case REQUEST_NEW_USER:
      consoleGroup('REQUEST_NEW_USER',[action])
      return Object.assign({},state,{
        isLoading: true
      })

    case RECEIVE_NEW_USER:
      consoleGroup('RECEIVE_NEW_USER',[action])
      return Object.assign({},state,{
        isLoading: false,
        isLoggedIn: false
      })

    case RECEIVE_NEW_USER_ERROR:
      consoleGroup('RECEIVE_NEW_USER_ERROR',[action])
      return Object.assign({},state,{
        isLoading: false,
        isLoggedIn: false,
        auth: {}
      })

    default:
      // consoleGroup('Admin Reducer Default',[action])
      return state
  }
}