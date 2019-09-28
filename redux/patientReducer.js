/**
 * Redux reducer for the project, Cryonics Check-In, that stores the state for
 * Patient objects.
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

import * as ActionTypes from './ActionTypes'

export const Patient = (
  state = {
    checkinTime: null,
    checkinInterval: null,
    errMess: null,
    isSignedIn: null,
    email: null,
    signinTime: null,
    listeners: []
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
        checkinInterval: action.payload[3],
        errMess: null,
        isSignedIn: action.payload[0],
        signinTime: action.payload[1]
      }

    // TODO: Set results of actions.
    case ActionTypes.SET_LISTENER_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.SET_LISTENER_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_LISTENER_FULFILLED:
      return {
        ...state,
        errMess: null,
        listeners: state.listeners.concat(action.payload)
      }

    case ActionTypes.REMOVE_LISTENER:
      return {
        ...state,
        listeners: action.payload
      }

    case ActionTypes.REMOVE_LISTENERS:
      return {
        ...state,
        listeners: []
      }

    default:
      return state
  }
}
