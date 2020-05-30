/**
 * Redux reducer for the project, Cryonics Check-In, that stores the device
 * information.
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

export const Device = (
  state = {
    errMess: null,
    token: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.INITIALIZE_STORE_REQUESTED:
      return {
        ...state,
        errMess: null
      }

    case ActionTypes.INITIALIZE_STORE_REJECTED:
      return {
        ...state,
        errMess: action.payload
      }

    case ActionTypes.INITIALIZE_STORE_FULFILLED:
      return {
        ...state,
        errMess: null,
        token: action.payload
      }

    default:
      return state
  }
}
