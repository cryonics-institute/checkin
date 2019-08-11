import * as ActionTypes from './ActionTypes'

export const Patient = (
  state = {
    checkinTime: null,
    errMess: null,
    isSignedIn: null,
    email: null,
    signinTime: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PATIENT_REQUESTED:
      return {
        ...state,
        email: action.payload,
        errMess: null
      }

    case ActionTypes.ADD_PATIENT_REJECTED:
      return {
        ...state,
        email: null,
        errMess: action.payload
      }

    case ActionTypes.ADD_PATIENT_FULFILLED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.GET_DOCUMENT_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.GET_DOCUMENT_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isSignedIn: null
      }

    case ActionTypes.GET_DOCUMENT_FULFILLED:
      return {
        ...state,
        checkinTime: action.payload[2],
        errMess: null,
        isSignedIn: action.payload[0],
        signinTime: action.payload[1]
      }

    default:
      return state
  }
}
