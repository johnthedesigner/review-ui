import { combineReducers } from 'redux'
import locationReducer from './location'
import reviews from '../routes/Reviews/reducer'

const makeRootReducer = combineReducers({
    location: locationReducer,
    reviews
  })

export default makeRootReducer
