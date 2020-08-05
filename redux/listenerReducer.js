/**
 * Redux reducer for the project, Check-In, that stores in state all
 * JavaScript listeners used throughout the app.
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
  +errorMessage: string,
  +interval: number,
  +listeners: Array<number>
}

type Action = {
  type: typeof ActionTypes.REMOVE_LISTENERS_REQUESTED
} | {
  type: typeof ActionTypes.REMOVE_LISTENERS_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.REMOVE_LISTENERS_FULFILLED,
  listeners: Array<number>
} | {
  type: typeof ActionTypes.SET_LISTENER_REQUESTED
} | {
  type: typeof ActionTypes.SET_LISTENER_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.SET_LISTENER_FULFILLED,
  listeners: Array<number>
} | {
  type: typeof ActionTypes.SET_LISTENER_INTERVAL_REQUESTED
} | {
  type: typeof ActionTypes.SET_LISTENER_INTERVAL_REJECTED,
  errorMessage: string
} | {
  type: typeof ActionTypes.SET_LISTENER_INTERVAL_FULFILLED,
  interval: number
}

export const Listener = (
  state: State = {
    errorMessage: '',
    interval: 0,
    listeners: []
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.REMOVE_LISTENERS_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.REMOVE_LISTENERS_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.REMOVE_LISTENERS_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        listeners: []
      }

    case ActionTypes.SET_LISTENER_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_LISTENER_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.SET_LISTENER_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        listeners: action.listeners
      }

    case ActionTypes.SET_LISTENER_INTERVAL_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_LISTENER_INTERVAL_REJECTED:
      return {
        ...state,
        errorMessage: action.errorMessage
      }

    case ActionTypes.SET_LISTENER_INTERVAL_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        interval: action.interval
      }

    default:
      return state
  }
}
