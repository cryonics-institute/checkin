import * as ActionTypes from './ActionTypes'

export const Timer = (
  state = {
    isLoading: true,
    errMess: null,
    interval: 0
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_TIMER_REQUESTED:
      return {
        ...state,
        isLoading: true,
        errMess: null
      }

    case ActionTypes.SET_TIMER_REJECTED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload
      }

    case ActionTypes.SET_TIMER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        interval: action.payload
      }

    default:
      return state
  }
}
