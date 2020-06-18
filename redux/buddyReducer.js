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

// @flow
import * as ActionTypes from './ActionTypes'

type State = {
  +alertTimes: Array<object>,
  +checkinInterval: number,
  +checkinTime: string,
  +email: string,
  +errMess: string,
  +isAdded: boolean,
  +lastAlertTime: string,
  +snooze: number
}

type Action = {
  type: 'ADD_BUDDY_REQUESTED',
  errMess: string
} | {
  type: 'ADD_BUDDY_REJECTED',
  errMess: string
} | {
  type: 'ADD_BUDDY_FULFILLED',
  errMess: string
} | {
  type: 'GET_DOCUMENT_REQUESTED',
  errMess: string
} | {
  type: 'GET_DOCUMENT_REJECTED',
  errMess: string,
  isAdded: boolean
} | {
  type: 'GET_DOCUMENT_FULFILLED',
  alertTimes: Array<object>,
  checkinInterval: number,
  checkinTime: string,
  errMess: string,
  isAdded: boolean,
  snooze: number
} | {
  type: 'SET_LAST_ALERT_TIME',
  lastAlertTime: string,
}

export const Buddy = (
  state: State = {
    alertTimes: [],
    checkinInterval: null,
    checkinTime: '',
    email: '',
    errMess: '',
    isAdded: null,
    lastAlertTime: '',
    snooze: 9
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ADD_BUDDY_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.ADD_BUDDY_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.ADD_BUDDY_FULFILLED:
      return {
        ...state,
        email: action.payload,
        errMess: ''
      }

    case ActionTypes.GET_DOCUMENT_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.GET_DOCUMENT_REJECTED:
      return {
        ...state,
        errMess: action.payload,
        isAdded: false
      }

    case ActionTypes.GET_DOCUMENT_FULFILLED:
      return {
        ...state,
        alertTimes: action.payload[1],
        checkinInterval: action.payload[2],
        checkinTime: action.payload[3],
        errMess: '',
        isAdded: action.payload[0],
        snooze: action.payload[4]
      }

    // TODO: Shouldn't this be fleshed out to requested/rejected/fulfilled?
    case ActionTypes.SET_LAST_ALERT_TIME:
      return {
        ...state,
        lastAlertTime: action.payload
      }

    default:
      return state
  }
}
