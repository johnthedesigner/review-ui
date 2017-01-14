import { consoleGroup } from '../../utils/utils'
import {
  POST_NEW_THING,
  RECEIVE_CURRENT_THING,
  RECEIVE_THING_LIST,
  RECEIVE_THINGS,
  REQUEST_CURRENT_THING,
  REQUEST_THING_LIST,
} from './constants'

// Reviews Reducer
export default function reviews(state = {}, action) {
  switch (action.type) {
    case POST_NEW_THING:
      consoleGroup('POST_NEW_THING',[action])
      return Object.assign({},state,{
        currentThing: {
          isLoading: true
        }
      })

    case RECEIVE_CURRENT_THING:
      consoleGroup('RECEIVE_CURRENT_THING',[action])
      return Object.assign({},state,{ // Merge new review into state tree
        currentThing: {
          id: action.id,
          isLoading: false
        }
      })

    case RECEIVE_THING_LIST:
      consoleGroup('RECEIVE_THING_LIST',[action])
      return Object.assign({},state,{
        thingsList: {
          items: action.items,
          isLoading: false
        }
      })

    case RECEIVE_THINGS:
      consoleGroup('RECEIVE_THINGS',[action])
      return Object.assign({},state,{
        thingsById: Object.assign(
          {},
          state.things,
          action.things
        )
      })

    case REQUEST_CURRENT_THING:
      consoleGroup('REQUEST_CURRENT_THING',[action])
      return Object.assign({},state,{
        currentThing: {
          isLoading: true
        }
      })

    case REQUEST_THING_LIST:
      consoleGroup('REQUEST_THINGS',[action])
      return Object.assign({},state,{
        thingList: {
          isLoading: true
        }
      })

    default:
      // consoleGroup('Thing Reducer Default',[action])
      return state
  }
}
