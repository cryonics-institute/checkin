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

export const Listener = (
  state = {
    errMess: null,
    listeners: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REMOVE_LISTENERS_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.REMOVE_LISTENERS_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.REMOVE_LISTENERS_FULFILLED:
      return {
        ...state,
        errMess: null,
        listeners: []
      }

    case ActionTypes.SET_LISTENER_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.SET_LISTENER_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_LISTENER_FULFILLED:
      return {
        ...state,
        errMess: null,
        listeners: action.payload
          ? state.listeners.concat(action.payload)
          : state.listeners
      }

    case ActionTypes.SET_LISTENER_INTERVAL_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.SET_LISTENER_INTERVAL_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.SET_LISTENER_INTERVAL_FULFILLED:
      return {
        ...state,
        errMess: null
      }

    default:
      return state
  }
}
