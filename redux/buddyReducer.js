/**
 * Redux reducer for the project, Check-In, that stores the state for
 * buddy objects.
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
  +alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  checkinInterval: ?number,
  +checkinTime: string,
  +email: string,
  +errorMessage: string,
  isAdded: ?boolean,
  +lastAlertTime: string,
  +snooze: number
}

type Action = {
  type: 'ADD_BUDDY_REQUESTED'
} | {
  type: 'ADD_BUDDY_REJECTED',
  errorMessage: string
} | {
  type: 'ADD_BUDDY_FULFILLED',
  email: string
} | {
  type: 'GET_DOCUMENT_REQUESTED'
} | {
  type: 'GET_DOCUMENT_REJECTED',
  errorMessage: string
} | {
  type: 'GET_DOCUMENT_FULFILLED',
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  checkinInterval: ?number,
  checkinTime: string,
  isAdded: ?boolean,
  snooze: number
} | {
  type: 'SET_LAST_ALERT_TIME_REQUESTED'
} | {
  type: 'SET_LAST_ALERT_TIME_REJECTED',
  errorMessage: string
} | {
  type: 'SET_LAST_ALERT_TIME_FULFILLED',
  lastAlertTime: string
}

export const Buddy = (
  state: State = {
    alertTimes: [],
    checkinInterval: null,
    checkinTime: '',
    email: '',
    errorMessage: '',
    isAdded: null,
    lastAlertTime: '',
    snooze: 9
  },
  action: Action
): State => {
  switch (action.type) {
    case ActionTypes.ADD_BUDDY_REQUESTED:
      return {
        ...state,
        email: ''
      }

    case ActionTypes.ADD_BUDDY_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.ADD_BUDDY_FULFILLED:
      return {
        ...state,
        email: action.email,
        errorMessage: ''
      }

    case ActionTypes.GET_DOCUMENT_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.GET_DOCUMENT_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isAdded: false
      }

    case ActionTypes.GET_DOCUMENT_FULFILLED:
      return {
        ...state,
        alertTimes: action.alertTimes,
        checkinInterval: action.checkinInterval,
        checkinTime: action.checkinTime,
        errorMessage: '',
        isAdded: action.isAdded,
        snooze: action.snooze
      }

    case ActionTypes.SET_LAST_ALERT_TIME_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_LAST_ALERT_TIME_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.SET_LAST_ALERT_TIME_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        lastAlertTime: action.lastAlertTime
      }

    default:
      return state
  }
}
