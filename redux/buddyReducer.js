/**
 * Redux reducer for the project, Cryonics Check-In, that stores the state for
 * buddy objects.
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

export const Buddy = (
  state = {
    alertTimes: [],
    checkinTime: null,
    email: null,
    errMess: null,
    isSignedIn: null,
    lastAlertTime: null,
    snooze: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_BUDDY_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.ADD_BUDDY_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.ADD_BUDDY_FULFILLED:
      return {
        ...state,
        email: action.payload
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
        snooze: action.payload[4]
      }

    case ActionTypes.SET_LAST_ALERT_TIME:
      return {
        ...state,
        lastAlertTime: action.payload
      }

    default:
      return state
  }
}
