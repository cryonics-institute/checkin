/**
 * Redux reducer for the project, Check-In, that stores in state all
 * JavaScript timers used throughout the app.
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
  +timers: Array<number>
}

type Action = {
  type: 'SET_TIMER_REQUESTED',
  errorMessage: string
} | {
  type: 'SET_TIMER_REJECTED',
  errorMessage: string
} | {
  type: 'SET_TIMER_FULFILLED',
  errorMessage: string,
  timers: Array<number>
} | {
  type: 'SET_TIMER_INTERVAL_REQUESTED',
  errorMessage: string
} | {
  type: 'SET_TIMER_INTERVAL_REJECTED',
  errorMessage: string
} | {
  type: 'SET_TIMER_INTERVAL_FULFILLED',
  errorMessage: string,
  interval: number
} | {
  type: 'REMOVE_TIMERS_REQUESTED',
  errorMessage: string
} | {
  type: 'REMOVE_TIMERS_REJECTED',
  errorMessage: string
} | {
  type: 'REMOVE_TIMERS_FULFILLED',
  errorMessage: string,
  timers: Array<number>
}

export const Timer = (
  state: State = {
    errorMessage: '',
    interval: null,
    timers: []
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SET_TIMER_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_TIMER_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.SET_TIMER_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        timers: action.payload
          ? state.timers.concat(action.payload)
          : state.timers
      }

    case ActionTypes.SET_TIMER_INTERVAL_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.SET_TIMER_INTERVAL_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.SET_TIMER_INTERVAL_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        interval: action.payload
      }

    case ActionTypes.REMOVE_TIMERS_REQUESTED:
      return {
        ...state,
        errorMessage: ''
      }

    case ActionTypes.REMOVE_TIMERS_REJECTED:
      return {
        ...state,
        errorMessage: action.payload
      }

    case ActionTypes.REMOVE_TIMERS_FULFILLED:
      return {
        ...state,
        errorMessage: '',
        timers: []
      }

    default:
      return state
  }
}
