import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Auth } from './authReducer'
import { Document } from './documentReducer'
import { Timer } from './timerReducer'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(
      {
        auth: Auth,
        document: Document,
        timer: Timer
      }
    ),
    applyMiddleware(thunk, logger)
  )

  return store
}
