import * as ActionTypes from './ActionTypes'

export const Checkins = (
  state = {
    isLoading: true,
    errMess: null,
    checkins: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_CHECKINS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        checkins: []
      }

    case ActionTypes.GET_CHECKINS_REJECTED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload
      }

    case ActionTypes.GET_CHECKINS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        checkins: action.payload
      }

    default:
      return state
  }
}
