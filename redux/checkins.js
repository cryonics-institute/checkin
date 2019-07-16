import * as ActionTypes from './ActionTypes'

export const checkins = (
  state = {
    isLoading: true,
    errMess: null,
    checkins: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GetCheckinsFulfilled:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        checkins: action.payload
      }

    case ActionTypes.GetCheckinsRequested:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        checkins: []
      }

    case ActionTypes.GetCheckinsRejected:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload
      }

    default:
      return state
  }
}
