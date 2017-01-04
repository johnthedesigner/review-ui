import { combineReducers } from 'redux'

import locationReducer from './location'
import { messages } from './messages'
import reviews from '../routes/Reviews/reducer'
import things from '../routes/Things/reducer'
import user from '../routes/User/reducer'

const makeRootReducer = combineReducers({
    location: locationReducer,
    messages,
    reviews,
    things,
    user
  })

export default makeRootReducer
