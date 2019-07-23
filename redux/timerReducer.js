import * as ActionTypes from './ActionTypes'

export const Timer = (
  state = {
    isLoading: true,
    errMess: null,
    id: null
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
        id: action.payload
      }

    case ActionTypes.CLEAR_TIMER_REQUESTED:
      return {
        ...state,
        isLoading: true,
        errMess: null
      }

    case ActionTypes.CLEAR_TIMER_REJECTED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload
      }

    case ActionTypes.CLEAR_TIMER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        id: null
      }

    default:
      return state
  }
}
