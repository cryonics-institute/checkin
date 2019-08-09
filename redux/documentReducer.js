import * as ActionTypes from './ActionTypes'

export const Document = (
  state = {
    checkinTime: null,
    errMess: null,
    isPatientSignedIn: null,
    signinTime: null
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
        errMess: action.payload,
        isPatientSignedIn: null
      }

    case ActionTypes.GET_DOCUMENT_FULFILLED:
      return {
        ...state,
        checkinTime: action.payload[2],
        errMess: null,
        isPatientSignedIn: action.payload[0],
        signinTime: action.payload[1]
      }

    default:
      return state
  }
}
