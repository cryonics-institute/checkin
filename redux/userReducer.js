/**
 * Redux reducer for the project, Check-In, that stores the state for
 * user objects.
 *
 * @author Michael David Gill <michaelgill1969@gmail.com>
 * @license
 * Copyright 2019 Cryonics Institute
 *
 * This file is part of Check-In.
 *
 * Check-In is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Check-In is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Check-In.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as ActionTypes from './ActionTypes'

export const User = (
  state = {
    alertTimes: [],
    checkinInterval: null,
    checkinTime: null,
    errMess: null,
    isSignedIn: null,
    lastAlertTime: null,
    longestSnooze: 60,
    shortestInterval: 1800000,
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
        checkinTime: action.payload.checkinTime,
        errMess: null,
        isSignedIn: action.payload.isSignedIn,
        snooze: action.payload.snooze
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

    case ActionTypes.MUTATE_INPUTS_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.MUTATE_INPUTS_FULFILLED:
      return {
        ...state,
        alertTimes: action.payload,
        errMess: null
      }

    case ActionTypes.REMOVE_INPUTS_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.REMOVE_INPUTS_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.REMOVE_INPUTS_FULFILLED:
      return {
        ...state,
        alertTimes: action.payload,
        errMess: null
      }

    case ActionTypes.SET_LAST_ALERT_TIME:
      return {
        ...state,
        lastAlertTime: action.payload
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_FULFILLED:
      return {
        ...state,
        shortestInterval: action.payload
      }

    case ActionTypes.SET_SNOOZE_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.SET_SNOOZE_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_SNOOZE_FULFILLED:
      return {
        ...state,
        snooze: action.payload
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        alertTimes: [],
        checkinInterval: null,
        checkinTime: null,
        errMess: null,
        isSignedIn: null,
        lastAlertTime: null,
        longestSnooze: 60,
        shortestInterval: 3600000,
        snooze: null
      }

    default:
      return state
  }
}
