import * as ActionTypes from './ActionTypes'

export const Timer = (
  state = {
    errMess: null,
    interval: 5000,
    maximumInterval: 24000,
    minimumInterval: 1000,
    timers: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_TIMER_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.SET_TIMER_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_TIMER_FULFILLED:
      return {
        ...state,
        errMess: null,
        timers: state.timers.concat(action.payload)
      }

    case ActionTypes.SET_TIMER_INTERVAL:
      return {
        ...state,
        interval: action.payload
      }

    case ActionTypes.REMOVE_TIMER:
      return {
        ...state,
        timers: action.payload
      }

    case ActionTypes.REMOVE_TIMERS:
      return {
        ...state,
        timers: []
      }

    default:
      return state
  }
}
