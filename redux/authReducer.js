import * as ActionTypes from './ActionTypes'

// The auth reducer. The starting state sets authentication based on a token
// being in local storage. In a real app, we would also want a util to check if
// the token is expired.
export const Auth = (
  state = {
    errMess: null,
    isAuthenticated: false,
    isLoading: false,
    isPatient: null,
    user: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SELECT_STATUS:
      return {
        ...state,
        isPatient: action.payload
      }

    case ActionTypes.REGISTRATION_REQUESTED:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true
      }

    case ActionTypes.REGISTRATION_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isAuthenticated: false,
        isLoading: false
      }

    case ActionTypes.REGISTRATION_FULFILLED:
      return {
        ...state,
        errMess: null,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }

    case ActionTypes.SIGNIN_REQUESTED:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true
      }

    case ActionTypes.SIGNIN_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isAuthenticated: false,
        isLoading: false
      }

    case ActionTypes.SIGNIN_FULFILLED:
      return {
        ...state,
        errMess: null,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: true
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isAuthenticated: true,
        isLoading: false
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        errMess: null,
        isAuthenticated: false,
        isLoading: false,
        user: null
      }

    default:
      return state
  }
}
