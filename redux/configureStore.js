import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Auth } from './authReducer'
import { Checkin } from './checkinReducer'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(
      {
        auth: Auth,
        checkin: Checkin
      }
    ),
    applyMiddleware(thunk, logger)
  )

  return store
}
