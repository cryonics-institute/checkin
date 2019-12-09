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
    alertTimes: [],
    checkinInterval: null,
    checkinTime: null,
    email: null,
    errMess: null,
    interval: null,
    isAlertActive: false,
    isSignedIn: null,
    lastAlertTime: null,
    listeners: [],
    signinTime: null,
    snooze: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DOCUMENT_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.ADD_DOCUMENT_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.ADD_DOCUMENT_FULFILLED:
      return {
        ...state,
        alertTimes: action.payload.alertTimes,
        checkinTime: action.payload.checkinTime,
        errMess: null,
        isSignedIn: action.payload.isSignedIn,
        signinTime: action.payload.signinTime,
        snooze: action.payload.snooze
      }

    case ActionTypes.ADD_PATIENT_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.ADD_PATIENT_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.ADD_PATIENT_FULFILLED:
      return {
        ...state,
        email: action.payload
      }

    case ActionTypes.CHECKIN_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.CHECKIN_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.CHECKIN_FULFILLED:
      return {
        ...state,
        checkinTime: action.payload,
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
        alertTimes: action.payload[1],
        checkinInterval: action.payload[2],
        checkinTime: action.payload[3],
        errMess: null,
        isSignedIn: action.payload[0],
        signinTime: action.payload[4],
        snooze: action.payload[5]
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

    case ActionTypes.SET_ALERT_ACTIVE:
      return {
        ...state,
        isAlertActive: true
      }

    case ActionTypes.SET_LAST_ALERT_TIME:
      return {
        ...state,
        lastAlertTime: action.payload
      }

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
        listeners: action.payload
          ? state.listeners.concat(action.payload)
          : state.listeners
      }

    case ActionTypes.SET_LISTENER_INTERVAL_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.SET_LISTENER_INTERVAL_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_LISTENER_INTERVAL_FULFILLED:
      return {
        ...state,
        interval: action.payload
      }

    default:
      return state
  }
}
