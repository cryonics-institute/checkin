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
  +errorMessage: string,
  +height: number,
  +showTip: boolean
}

type Action = {
  type: typeof ActionTypes.HIDE_TIP_REQUESTED
} | {
  type: typeof ActionTypes.HIDE_TIP_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.HIDE_TIP_FULFILLED,
  showTip: boolean
} | {
  type: typeof ActionTypes.MUTATE_INPUTS_REQUESTED
} | {
  type: typeof ActionTypes.MUTATE_INPUTS_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.MUTATE_INPUTS_FULFILLED,
  inputs: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: typeof ActionTypes.REMOVE_INPUTS_REQUESTED
} | {
  type: typeof ActionTypes.REMOVE_INPUTS_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.REMOVE_INPUTS_FULFILLED,
  inputs: Array<{| id: string, time: string, validity: boolean |}>
} | {
  type: typeof ActionTypes.SET_INPUT_PARAMETERS_REQUESTED
} | {
  type: typeof ActionTypes.SET_INPUT_PARAMETERS_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.SET_INPUT_PARAMETERS_FULFILLED,
  height: number
} | {
  type: typeof ActionTypes.SIGNOUT_REQUESTED
} | {
  type: typeof ActionTypes.SIGNOUT_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.SIGNOUT_FULFILLED,
  alertTimes: Array<{| id: string, time: string, validity: boolean |}>,
  height: number,
  showTip: boolean
}

export const Inputs = (
  state: State = {
    alertTimes: [],
    errorMessage: '',
    height: 0,
    showTip: true
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.HIDE_TIP_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.HIDE_TIP_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.HIDE_TIP_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        showTip: false
      }

    case ActionTypes.MUTATE_INPUTS_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.MUTATE_INPUTS_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.MUTATE_INPUTS_FULFILLED:
      return {
        ...state,
        alertTimes: action.inputs,
        errorMessage: ''
      }

    case ActionTypes.REMOVE_INPUTS_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.REMOVE_INPUTS_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.REMOVE_INPUTS_FULFILLED:
      return {
        ...state,
        alertTimes: action.inputs,
        errorMessage: ''
      }

    case ActionTypes.SET_INPUT_PARAMETERS_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_INPUT_PARAMETERS_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.SET_INPUT_PARAMETERS_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        height: action.height
      }

    case ActionTypes.SIGNOUT_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SIGNOUT_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.SIGNOUT_FULFILLED:
      return {
        ...state,
        alertTimes: [],
        errorMessage: '',
        height: null,
        showTip: true
      }

    default:
      return state
  }
}
