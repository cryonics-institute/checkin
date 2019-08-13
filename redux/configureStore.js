import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Auth } from './authReducer'
import { Patient } from './patientReducer'
import { Timer } from './timerReducer'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(
      {
        auth: Auth,
        patient: Patient,
        timer: Timer
      }
    ),
    applyMiddleware(thunk, logger)
  )

  return store
}
