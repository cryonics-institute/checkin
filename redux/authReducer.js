import * as ActionTypes from './ActionTypes'

// The auth reducer. The starting state sets authentication based on a token
// being in local storage. In a real app, we would also want a util to check if
// the token is expired.
export const Auth = (
  state = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    errMess: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false
      }

    case ActionTypes.LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message
      }

    case ActionTypes.LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        errMess: null
      }

    case ActionTypes.LOGOUT_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true
      }

    case ActionTypes.LOGOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: action.message
      }

    case ActionTypes.LOGOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        errMess: null
      }

    default:
      return state
  }
}
