import { combineReducers } from 'redux'

import locationReducer from './location'
import reviews from '../routes/Reviews/reducer'
import user from '../routes/User/reducer'

const makeRootReducer = combineReducers({
    location: locationReducer,
    reviews,
    user
  })

export default makeRootReducer
