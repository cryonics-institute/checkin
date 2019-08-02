import * as ActionTypes from './ActionTypes'

export const Document = (
  state = {
    signinTime: null,
    checkinTime: null,
    errMess: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_DOCUMENT_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.GET_DOCUMENT_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.GET_DOCUMENT_FULFILLED:
      return {
        ...state,
        signinTime: action.payload[0],
        checkinTime: action.payload[1],
        errMess: null
      }

    default:
      return state
  }
}
