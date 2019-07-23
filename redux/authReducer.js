import * as ActionTypes from './ActionTypes'

// The auth reducer. The starting state sets authentication based on a token
// being in local storage. In a real app, we would also want a util to check if
// the token is expired.
export const Auth = (
  state = {
    isLoading: false,
    isAuthenticated: false,
    errMess: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false
      }

    case ActionTypes.SIGNIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message
      }

    case ActionTypes.SIGNIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: null
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: action.message
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: null
      }

    default:
      return state
  }
}
