/**
 * Redux reducer for the project, Check-In, that stores the state for
 * Firebase authorization.
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
  +errMess: string,
  +user: Object
}

type Action = {
  type: 'REGISTRATION_REQUESTED'
} | {
  type: 'REGISTRATION_REJECTED',
  payload: string
} | {
  type: 'REGISTRATION_FULFILLED',
  payload: { user: Object }
} | {
  type: 'SIGNIN_REQUESTED'
} | {
  type: 'SIGNIN_REJECTED',
  payload: string
} | {
  type: 'SIGNIN_FULFILLED',
  payload: { user: Object }
} | {
  type: 'SIGNOUT_REQUESTED'
} | {
  type: 'SIGNOUT_REJECTED',
  payload: string
} | {
  type: 'SIGNOUT_FULFILLED'
}

export const Auth = (
  state: State = {
    errMess: '',
    user: null
  },
  action: Action
): State => {
  switch (action.type) {
    case ActionTypes.REGISTRATION_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.REGISTRATION_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.REGISTRATION_FULFILLED:
      return {
        ...state,
        errMess: '',
        user: action.payload.user
      }

    case ActionTypes.SIGNIN_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.SIGNIN_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SIGNIN_FULFILLED:
      return {
        ...state,
        errMess: '',
        user: action.payload.user
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        errMess: '',
        user: null
      }

    default:
      return state
  }
}
