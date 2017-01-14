import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
import { mockState, testState } from './mockState'

export default (initialState = testState) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk,logger]
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      autoRehydrate(),
      ...enhancers
    )
  )
  store.asyncReducers = {}
  persistStore(store)

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
