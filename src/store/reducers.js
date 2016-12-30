import { combineReducers } from 'redux'

import locationReducer from './location'
import { messages } from './messages'
import reviews from '../routes/Reviews/reducer'
import user from '../routes/User/reducer'

const makeRootReducer = combineReducers({
    location: locationReducer,
    messages,
    reviews,
    user
  })

export default makeRootReducer
