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
  // +alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  +checkinInterval: number,
  +checkinTime: string,
  +errMess: string,
  +isSignedIn: boolean,
  +lastAlertTime: string,
  +longestSnooze: number,
  +shortestInterval: number,
  +snooze: number
}

type Action = {
  type: 'ADD_DOCUMENT_REQUESTED',
  errMess: string
} | {
  type: 'ADD_DOCUMENT_REJECTED',
  errMess: string
} | {
  type: 'ADD_DOCUMENT_FULFILLED',
  checkinTime: string,
  errMess: string,
  isSignedIn: boolean,
  snooze: number
} | {
  type: 'CHECKIN_REQUESTED',
  errMess: string
} | {
  type: 'CHECKIN_REJECTED',
  errMess: string
} | {
  type: 'CHECKIN_FULFILLED',
  checkinTime: string,
  errMess: string
} | {
  type: 'MUTATE_INPUTS_REQUESTED',
  errMess: string
} | {
  type: 'MUTATE_INPUTS_REJECTED',
  errMess: string
} | {
  type: 'MUTATE_INPUTS_FULFILLED',
  errMess: string//,
  // alertTimes: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: 'REMOVE_INPUTS_REQUESTED',
  errMess: string
} | {
  type: 'REMOVE_INPUTS_REJECTED',
  errMess: string
} | {
  type: 'REMOVE_INPUTS_FULFILLED',
  errMess: string//,
  // alertTimes: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: 'SET_LAST_ALERT_TIME',
  errMess: string,
  lastAlertTime: string
} | {
  type: 'SET_SHORTEST_INTERVAL_REQUESTED',
  errMess: string
} | {
  type: 'SET_SHORTEST_INTERVAL_REJECTED',
  errMess: string
} | {
  type: 'SET_SHORTEST_INTERVAL_FULFILLED',
  errMess: string,
  shortestInterval: number
} | {
  type: 'SET_SNOOZE_REQUESTED',
  errMess: string
} | {
  type: 'SET_SNOOZE_REJECTED',
  errMess: string
} | {
  type: 'SET_SNOOZE_FULFILLED',
  errMess: string,
  snooze: number
} | {
  type: 'SIGNOUT_REQUESTED',
  errMess: string
} | {
  type: 'SIGNOUT_REJECTED',
  errMess: string
} | {
  type: 'SIGNOUT_FULFILLED',
  // alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  checkinInterval: number,
  checkinTime: string,
  errMess: string,
  isSignedIn: boolean,
  lastAlertTime: string,
  longestSnooze: number,
  shortestInterval: number,
  snooze: number
}

export const User = (
  state: State = {
    // alertTimes: [],
    checkinInterval: null,
    checkinTime: '',
    errMess: '',
    isSignedIn: null,
    lastAlertTime: '',
    longestSnooze: 60,
    shortestInterval: 1800000,
    snooze: 9
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DOCUMENT_REQUESTED:
      return {
        ...state,
        errMess: ''
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
        errMess: '',
        isSignedIn: action.payload.isSignedIn,
        snooze: action.payload.snooze
      }

    case ActionTypes.CHECKIN_REQUESTED:
      return {
        ...state,
        errMess: ''
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
        errMess: ''
      }

      // case ActionTypes.MUTATE_INPUTS_REQUESTED:
      //   return {
      //     ...state,
      //     errMess: ''
      //   }
      //
      // case ActionTypes.MUTATE_INPUTS_REJECTED:
      //   return {
      //     ...state,
      //     errMess: action.payload
      //   }
      //
      // case ActionTypes.MUTATE_INPUTS_FULFILLED:
      //   return {
      //     ...state,
      //     alertTimes: action.payload,
      //     errMess: ''
      //   }
      //
      // case ActionTypes.REMOVE_INPUTS_REQUESTED:
      //   return {
      //     ...state,
      //     errMess: ''
      //   }
      //
      // case ActionTypes.REMOVE_INPUTS_REJECTED:
      //   return {
      //     ...state,
      //     errMess: action.payload
      //   }
      //
      // case ActionTypes.REMOVE_INPUTS_FULFILLED:
      //   return {
      //     ...state,
      //     alertTimes: action.payload,
      //     errMess: ''
      //   }

    // TODO: Shouldn't this be fleshed out to requested/rejected/fulfilled?
    case ActionTypes.SET_LAST_ALERT_TIME:
      return {
        ...state,
        errMess: '',
        lastAlertTime: action.payload
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_FULFILLED:
      return {
        ...state,
        errMess: '',
        shortestInterval: action.payload
      }

    case ActionTypes.SET_SNOOZE_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.SET_SNOOZE_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_SNOOZE_FULFILLED:
      return {
        ...state,
        errMess: '',
        snooze: action.payload
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
        // alertTimes: [],
        checkinInterval: null,
        checkinTime: '',
        errMess: '',
        isSignedIn: null,
        lastAlertTime: '',
        longestSnooze: 60,
        shortestInterval: 3600000,
        snooze: 9
      }

    default:
      return state
  }
}
