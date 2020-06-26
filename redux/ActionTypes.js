/**
 * Redux action-types for the project, Check-In.
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
export const ADD_DOCUMENT_REQUESTED: string = 'ADD_DOCUMENT_REQUESTED'
export const ADD_DOCUMENT_REJECTED: string = 'ADD_DOCUMENT_REJECTED'
export const ADD_DOCUMENT_FULFILLED: string = 'ADD_DOCUMENT_FULFILLED'
export const ADD_BUDDY_REQUESTED: string = 'ADD_BUDDY_REQUESTED'
export const ADD_BUDDY_REJECTED: string = 'ADD_BUDDY_REJECTED'
export const ADD_BUDDY_FULFILLED: string = 'ADD_BUDDY_FULFILLED'
export const CHECKIN_REQUESTED: string = 'CHECKIN_REQUESTED'
export const CHECKIN_REJECTED: string = 'CHECKIN_REJECTED'
export const CHECKIN_FULFILLED: string = 'CHECKIN_FULFILLED'
export const GET_DOCUMENT_REQUESTED: string = 'GET_DOCUMENT_REQUESTED'
export const GET_DOCUMENT_REJECTED: string = 'GET_DOCUMENT_REJECTED'
export const GET_DOCUMENT_FULFILLED: string = 'GET_DOCUMENT_FULFILLED'
export const HIDE_TIP_REQUESTED: string = 'HIDE_TIP_REQUESTED'
export const HIDE_TIP_REJECTED: string = 'HIDE_TIP_REJECTED'
export const HIDE_TIP_FULFILLED: string = 'HIDE_TIP_FULFILLED'
export const INITIALIZE_STORE_REQUESTED: string = 'INITIALIZE_STORE_REQUESTED'
export const INITIALIZE_STORE_REJECTED: string = 'INITIALIZE_STORE_REJECTED'
export const INITIALIZE_STORE_FULFILLED: string = 'INITIALIZE_STORE_FULFILLED'
export const MUTATE_INPUTS_REQUESTED: string = 'MUTATE_INPUTS_REQUESTED'
export const MUTATE_INPUTS_REJECTED: string = 'MUTATE_INPUTS_REJECTED'
export const MUTATE_INPUTS_FULFILLED: string = 'MUTATE_INPUTS_FULFILLED'
export const REGISTRATION_REQUESTED: string = 'REGISTRATION_REQUESTED'
export const REGISTRATION_REJECTED: string = 'REGISTRATION_REJECTED'
export const REGISTRATION_FULFILLED: string = 'REGISTRATION_FULFILLED'
export const REMOVE_INPUTS_REQUESTED: string = 'REMOVE_INPUTS_REQUESTED'
export const REMOVE_INPUTS_REJECTED: string = 'REMOVE_INPUTS_REJECTED'
export const REMOVE_INPUTS_FULFILLED: string = 'REMOVE_INPUTS_FULFILLED'
export const REMOVE_LISTENERS_REQUESTED: string = 'REMOVE_LISTENERS_REQUESTED'
export const REMOVE_LISTENERS_REJECTED: string = 'REMOVE_LISTENERS_REJECTED'
export const REMOVE_LISTENERS_FULFILLED: string = 'REMOVE_LISTENERS_FULFILLED'
export const REMOVE_TIMERS_REQUESTED: string = 'REMOVE_TIMERS_REQUESTED'
export const REMOVE_TIMERS_REJECTED: string = 'REMOVE_TIMERS_REJECTED'
export const REMOVE_TIMERS_FULFILLED: string = 'REMOVE_TIMERS_FULFILLED'
export const SET_LAST_ALERT_TIME: string = 'SET_LAST_ALERT_TIME'
export const SET_INPUT_PARAMETERS_REQUESTED: string =
  'SET_INPUT_PARAMETERS_REQUESTED'
export const SET_INPUT_PARAMETERS_REJECTED: string =
  'SET_INPUT_PARAMETERS_REJECTED'
export const SET_INPUT_PARAMETERS_FULFILLED: string =
  'SET_INPUT_PARAMETERS_FULFILLED'
export const SET_LISTENER_INTERVAL_REQUESTED: string =
  'SET_LISTENER_INTERVAL_REQUESTED'
export const SET_LISTENER_INTERVAL_REJECTED: string =
  'SET_LISTENER_INTERVAL_REJECTED'
export const SET_TIMER_INTERVAL_FULFILLED: string =
  'SET_TIMER_INTERVAL_FULFILLED'
export const SET_LISTENER_REQUESTED: string = 'SET_LISTENER_REQUESTED'
export const SET_LISTENER_REJECTED: string = 'SET_LISTENER_REJECTED'
export const SET_LISTENER_FULFILLED: string = 'SET_LISTENER_FULFILLED'
export const SET_TIMER_INTERVAL_REQUESTED: string =
  'SET_TIMER_INTERVAL_REQUESTED'
export const SET_TIMER_INTERVAL_REJECTED: string = 'SET_TIMER_INTERVAL_REJECTED'
export const SET_LISTENER_INTERVAL_FULFILLED: string =
  'SET_LISTENER_INTERVAL_FULFILLED'
export const SET_SHORTEST_INTERVAL_REQUESTED: string =
  'SET_SHORTEST_INTERVAL_REQUESTED'
export const SET_SHORTEST_INTERVAL_REJECTED: string =
  'SET_SHORTEST_INTERVAL_REJECTED'
export const SET_SHORTEST_INTERVAL_FULFILLED: string =
  'SET_SHORTEST_INTERVAL_FULFILLED'
export const SET_SNOOZE_REQUESTED: string = 'SET_SNOOZE_REQUESTED'
export const SET_SNOOZE_REJECTED: string = 'SET_SNOOZE_REJECTED'
export const SET_SNOOZE_FULFILLED: string = 'SET_SNOOZE_FULFILLED'
export const SET_TIMER_REQUESTED: string = 'SET_TIMER_REQUESTED'
export const SET_TIMER_REJECTED: string = 'SET_TIMER_REJECTED'
export const SET_TIMER_FULFILLED: string = 'SET_TIMER_FULFILLED'
export const SIGNIN_REQUESTED: string = 'SIGNIN_REQUESTED'
export const SIGNIN_REJECTED: string = 'SIGNIN_REJECTED'
export const SIGNIN_FULFILLED: string = 'SIGNIN_FULFILLED'
export const SIGNOUT_REQUESTED: string = 'SIGNOUT_REQUESTED'
export const SIGNOUT_REJECTED: string = 'SIGNOUT_REJECTED'
export const SIGNOUT_FULFILLED: string = 'SIGNOUT_FULFILLED'
