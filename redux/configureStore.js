import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { checkins } from './checkins'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(
      {
        checkins
      }
    ),
    applyMiddleware(thunk, logger)
  )

  return store
}
