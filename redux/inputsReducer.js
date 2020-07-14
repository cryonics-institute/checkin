/**
 * Redux reducer for the project, Check-In, that stores information for
 * time inputs on the users home screen.
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
  +errMess: string,
  +height: number,
  +showTip: boolean
}

type Action = {
  type: 'HIDE_TIP_REQUESTED',
  errMess: string
} | {
  type: 'HIDE_TIP_REJECTED',
  errMess: string
} | {
  type: 'HIDE_TIP_FULFILLED',
  errMess: string,
  showTip: boolean
} | {
  type: 'MUTATE_INPUTS_REQUESTED',
  errMess: string
} | {
  type: 'MUTATE_INPUTS_REJECTED',
  errMess: string
} | {
  type: 'MUTATE_INPUTS_FULFILLED',
  errMess: string,
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: 'REMOVE_INPUTS_REQUESTED',
  errMess: string
} | {
  type: 'REMOVE_INPUTS_REJECTED',
  errMess: string
} | {
  type: 'REMOVE_INPUTS_FULFILLED',
  errMess: string,
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: 'SET_INPUT_PARAMETERS_REQUESTED',
  errMess: string
} | {
  type: 'SET_INPUT_PARAMETERS_REJECTED',
  errMess: string
} | {
  type: 'SET_INPUT_PARAMETERS_FULFILLED',
  errMess: string,
  height: number
} | {
  type: 'SIGNOUT_REQUESTED',
  errMess: string
} | {
  type: 'SIGNOUT_REJECTED',
  errMess: string
} | {
  type: 'SIGNOUT_FULFILLED',
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  errMess: string,
  height: number,
  showTip: boolean
}

export const Inputs = (
  state: State = {
    alertTimes: [],
    errMess: '',
    height: null,
    showTip: true
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.HIDE_TIP_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.HIDE_TIP_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.HIDE_TIP_FULFILLED:
      return {
        ...state,
        errMess: '',
        showTip: false
      }

    case ActionTypes.MUTATE_INPUTS_REQUESTED:
      return {
        ...state,
        errMess: ''
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
        errMess: ''
      }

    case ActionTypes.REMOVE_INPUTS_REQUESTED:
      return {
        ...state,
        errMess: ''
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
        errMess: ''
      }

    case ActionTypes.SET_INPUT_PARAMETERS_REQUESTED:
      return {
        ...state,
        errMess: ''
      }

    case ActionTypes.SET_INPUT_PARAMETERS_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_INPUT_PARAMETERS_FULFILLED:
      return {
        ...state,
        errMess: '',
        height: action.payload
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
        alertTimes: [],
        errMess: '',
        height: null,
        showTip: true
      }

    default:
      return state
  }
}
