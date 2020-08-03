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
  checkinInterval: ?number,
  +checkinTime: string,
  +errorMessage: string,
  +isSignedIn: boolean,
  +lastAlertTime: string,
  +longestSnooze: number,
  +shortestInterval: number,
  +snooze: number
}

type Action = {
  type: 'ADD_DOCUMENT_REQUESTED',
  errorMessage: string
} | {
  type: 'ADD_DOCUMENT_REJECTED',
  errorMessage: string
} | {
  type: 'ADD_DOCUMENT_FULFILLED',
  checkinTime: string,
  errorMessage: string,
  isSignedIn: boolean,
  snooze: number
} | {
  type: 'CHECKIN_REQUESTED',
  errorMessage: string
} | {
  type: 'CHECKIN_REJECTED',
  errorMessage: string
} | {
  type: 'CHECKIN_FULFILLED',
  checkinTime: string,
  errorMessage: string
} | {
  type: 'MUTATE_INPUTS_REQUESTED',
  errorMessage: string
} | {
  type: 'MUTATE_INPUTS_REJECTED',
  errorMessage: string
} | {
  type: 'MUTATE_INPUTS_FULFILLED',
  errorMessage: string//,
  // alertTimes: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: 'REMOVE_INPUTS_REQUESTED',
  errorMessage: string
} | {
  type: 'REMOVE_INPUTS_REJECTED',
  errorMessage: string
} | {
  type: 'REMOVE_INPUTS_FULFILLED',
  errorMessage: string//,
  // alertTimes: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: 'SET_LAST_ALERT_TIME_REQUESTED',
  errorMessage: string
} | {
  type: 'SET_LAST_ALERT_TIME_REJECTED',
  errorMessage: string
} | {
  type: 'SET_LAST_ALERT_TIME_FULFILLED',
  errorMessage: string,
  lastAlertTime: string
} | {
  type: 'SET_SHORTEST_INTERVAL_REQUESTED',
  errorMessage: string
} | {
  type: 'SET_SHORTEST_INTERVAL_REJECTED',
  errorMessage: string
} | {
  type: 'SET_SHORTEST_INTERVAL_FULFILLED',
  errorMessage: string,
  shortestInterval: number
} | {
  type: 'SET_SNOOZE_REQUESTED',
  errorMessage: string
} | {
  type: 'SET_SNOOZE_REJECTED',
  errorMessage: string
} | {
  type: 'SET_SNOOZE_FULFILLED',
  errorMessage: string,
  snooze: number
} | {
  type: 'SIGNOUT_REQUESTED',
  errorMessage: string
} | {
  type: 'SIGNOUT_REJECTED',
  errorMessage: string
} | {
  type: 'SIGNOUT_FULFILLED',
  // alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  checkinInterval: ?number,
  checkinTime: string,
  errorMessage: string,
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
    errorMessage: '',
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
        errorMessage: ''
      }

    case ActionTypes.ADD_DOCUMENT_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.ADD_DOCUMENT_FULFILLED:
      return {
        ...state,
        checkinTime: action.payload.checkinTime,
        errorMessage: '',
        isSignedIn: action.payload.isSignedIn,
        snooze: action.payload.snooze
      }

    case ActionTypes.CHECKIN_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.CHECKIN_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.CHECKIN_FULFILLED:
      return {
        ...state,
        checkinTime: action.payload,
        errorMessage: ''
      }

      // case ActionTypes.MUTATE_INPUTS_REQUESTED:
      //   return {
      //     ...state,
      //     errorMessage: ''
      //   }
      //
      // case ActionTypes.MUTATE_INPUTS_REJECTED:
      //   return {
      //     ...state,
      //     errorMessage: action.payload
      //   }
      //
      // case ActionTypes.MUTATE_INPUTS_FULFILLED:
      //   return {
      //     ...state,
      //     alertTimes: action.payload,
      //     errorMessage: ''
      //   }
      //
      // case ActionTypes.REMOVE_INPUTS_REQUESTED:
      //   return {
      //     ...state,
      //     errorMessage: ''
      //   }
      //
      // case ActionTypes.REMOVE_INPUTS_REJECTED:
      //   return {
      //     ...state,
      //     errorMessage: action.payload
      //   }
      //
      // case ActionTypes.REMOVE_INPUTS_FULFILLED:
      //   return {
      //     ...state,
      //     alertTimes: action.payload,
      //     errorMessage: ''
      //   }

    case ActionTypes.SET_LAST_ALERT_TIME_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_LAST_ALERT_TIME_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.SET_LAST_ALERT_TIME_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        lastAlertTime: action.payload
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.SET_SHORTEST_INTERVAL_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        shortestInterval: action.payload
      }

    case ActionTypes.SET_SNOOZE_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_SNOOZE_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.SET_SNOOZE_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        snooze: action.payload
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        // alertTimes: [],
        checkinInterval: null,
        checkinTime: '',
        errorMessage: '',
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
