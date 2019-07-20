import * as ActionTypes from './ActionTypes'

export const Checkin = (
  state = {
    isLoading: true,
    errMess: null,
    checkin: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_CHECKIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        checkin: []
      }

    case ActionTypes.GET_CHECKIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload
      }

    case ActionTypes.GET_CHECKIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        checkin: action.payload
      }

    default:
      return state
  }
}
