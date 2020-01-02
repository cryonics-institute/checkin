/**
 * Redux reducer for the project, Cryonics Check-In, that stores the state for
 * Firebase authorization.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Cryonics Check-In.
 *
 * Cryonics Check-In is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Cryonics Check-In is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Cryonics Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

import { REHYDRATE } from 'redux-persist'
import * as ActionTypes from './ActionTypes'

export const Auth = (
  state = {
    errMess: null,
    isHydrated: null,
    isLoading: null,
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
        isLoading: true
      }

    case ActionTypes.REGISTRATION_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isLoading: false
      }

    case ActionTypes.REGISTRATION_FULFILLED:
      return {
        ...state,
        errMess: null,
        isLoading: false,
        user: action.payload
      }

    case REHYDRATE:
      return {
        ...state,
        errMess: action.payload.auth !== undefined
          ? action.payload.auth.errMess
          : null,
        isHydrated: true,
        isLoading: action.payload.auth !== undefined
          ? action.payload.auth.isLoading
          : null,
        isPatient: action.payload.auth !== undefined
          ? action.payload.auth.isPatient
          : null,
        user: action.payload.auth !== undefined
          ? action.payload.auth.user
          : null
      }

    case ActionTypes.SIGNIN_REQUESTED:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypes.SIGNIN_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isLoading: false
      }

    case ActionTypes.SIGNIN_FULFILLED:
      return {
        ...state,
        errMess: null,
        isLoading: false,
        user: action.payload
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isLoading: false
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        errMess: null,
        isLoading: false,
        user: null
      }

    default:
      return state
  }
}
