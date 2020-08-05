/**
 * Redux reducer for the project, Check-In, that securely persists
 * signin information for auto-signin when the app is closed.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * Check-In is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

// @flow
import * as ActionTypes from './ActionTypes'

type State = {
  +errorMessage: string,
  +username: string,
  +password: string
}

type Action = {
  type: typeof ActionTypes.REGISTRATION_REQUESTED
} | {
  type: typeof ActionTypes.REGISTRATION_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.REGISTRATION_FULFILLED,
  userCredential: {| username: string, password: string |}
} | {
  type: typeof ActionTypes.SIGNIN_REQUESTED
} | {
  type: typeof ActionTypes.SIGNIN_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.SIGNIN_FULFILLED,
  userCredential: {| username: string, password: string |}
} | {
  type: typeof ActionTypes.SIGNOUT_REQUESTED
} | {
  type: typeof ActionTypes.SIGNOUT_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.SIGNOUT_FULFILLED
}

export const Token = (
  state: State = {
    errorMessage: '',
    username: '',
    password: ''
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.REGISTRATION_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.REGISTRATION_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.REGISTRATION_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        username: action.userCredential.username,
        password: action.userCredential.password
      }

    case ActionTypes.SIGNIN_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SIGNIN_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.SIGNIN_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        username: action.userCredential.username,
        password: action.userCredential.password
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        username: '',
        password: ''
      }

    default:
      return state
  }
}
