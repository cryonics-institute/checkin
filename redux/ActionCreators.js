/**
 * Redux action creators for the project, Check-In.
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

import * as ActionTypes from './ActionTypes'

/**
 * Initiate an action to add a buddy to be be tracked by the current user.
 */
export const addBuddyRequested = () => (
  {
    type: ActionTypes.ADD_BUDDY_REQUESTED
  }
)

/**
 * Initiate an error indicating that adding a buddy to be be tracked failed.
 * @param  {Error} errorMessage Message describing the add-buddy failure.
 */
export const addBuddyRejected = (errorMessage) => (
  {
    type: ActionTypes.ADD_BUDDY_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that a buddy to be be tracked has been added.
 * @param  {String}   email E-mail of the buddy to be added.
 */
export const addBuddyFulfilled = (email) => (
  {
    type: ActionTypes.ADD_BUDDY_FULFILLED,
    payload: email
  }
)

/**
 * Initiate an action to create a new Firebase document.
 */
export const addDocumentRequested = () => (
  {
    type: ActionTypes.ADD_DOCUMENT_REQUESTED
  }
)

/**
 * Initiate an error indicating that creation of a new Firebase document failed.
 * @param  {Error} errorMessage Message describing the add-document failure.
 */
export const addDocumentRejected = (errorMessage) => (
  {
    type: ActionTypes.ADD_DOCUMENT_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that a new Firebase document has been created.
 */
export const addDocumentFulfilled = (user) => (
  {
    type: ActionTypes.ADD_DOCUMENT_FULFILLED,
    payload: user
  }
)

/**
 * Initiate an action to update a user's check-in time and interval.
 */
export const checkinRequested = () => (
  {
    type: ActionTypes.CHECKIN_REQUESTED
  }
)

/**
 * Initiate an error indicating that updating a user's check-in time and
 * interval failed.
 * @param  {Error} errorMessage Message describing the check-in failure.
 */
export const checkinRejected = (errorMessage) => (
  {
    type: ActionTypes.CHECKIN_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that a user's check-in time and interval has
 * been added.
 */
export const checkinFulfilled = (checkinTime) => (
  {
    type: ActionTypes.CHECKIN_FULFILLED,
    payload: checkinTime
  }
)

/**
 * Initiate an action to update the sign-in and check-in times and the check-in
 * interval in the Redux store.
 */
export const getDocumentRequested = () => (
  {
    type: ActionTypes.GET_DOCUMENT_REQUESTED
  }
)

/**
 * Initiate an error indicating that updating the Redux store has failed.
 * @param  {Error} errorMessage Message describing the check-in failure.
 */
export const getDocumentRejected = (errorMessage) => (
  {
    type: ActionTypes.GET_DOCUMENT_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that updating the Redux store has completed.
 * @param {Array} data  An array of values for the buddy reducer.
 */
export const getDocumentFulfilled = (data) => (
  {
    type: ActionTypes.GET_DOCUMENT_FULFILLED,
    payload: data
  }
)

/**
 * Initiate an action to hide the tip in the Redux store.
 */
export const hideTipRequested = () => (
  {
    type: ActionTypes.HIDE_TIP_REQUESTED
  }
)

/**
 * Initiate an error indicating that hiding the tip has failed.
 * @param  {Error} errorMessage Message describing the check-in failure.
 */
export const hideTipRejected = (errorMessage) => (
  {
    type: ActionTypes.HIDE_TIP_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that hiding the tip has completed.
 */
export const hideTipFulfilled = () => (
  {
    type: ActionTypes.HIDE_TIP_FULFILLED
  }
)

/**
 * Initiate an action to save the device token in the Redux store.
 */
export const initializeStoreRequested = () => (
  {
    type: ActionTypes.INITIALIZE_STORE_REQUESTED
  }
)

/**
 * Initiate an error indicating that saving the device token has failed.
 * @param  {Error} errorMessage Message describing the check-in failure.
 */
export const initializeStoreRejected = (errorMessage) => (
  {
    type: ActionTypes.INITIALIZE_STORE_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that saving the device token has completed.
 * @param {Array} data  A user's device token.
 */
export const initializeStoreFulfilled = (deviceToken) => (
  {
    type: ActionTypes.INITIALIZE_STORE_FULFILLED,
    payload: deviceToken
  }
)

/**
 * Initiate an action to set the inputs array.
 */
export const mutateInputRequested = () => (
  {
    type: ActionTypes.MUTATE_INPUTS_REQUESTED
  }
)

/**
 * Initiate an error indicating that mutation of the inputs array failed.
 * @param  {Error} errorMessage Message describing the input-mutation failure.
 */
export const mutateInputRejected = (errorMessage) => (
  {
    type: ActionTypes.MUTATE_INPUTS_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that setting the inputs array has completed.
 * @param  {Array} inputs Array of input objects.
 */
export const mutateInputFulfilled = (inputs) => (
  {
    type: ActionTypes.MUTATE_INPUTS_FULFILLED,
    payload: inputs
  }
)

/**
 * Initiate an action to register a new user on Firebase.
 */
export const registrationRequested = () => (
  {
    type: ActionTypes.REGISTRATION_REQUESTED
  }
)

/**
 * Initiate an error indicating that the new-user registration has failed.
 * @param  {Error} errorMessage Message describing the registration failure.
 */
export const registrationRejected = (message) => (
  {
    type: ActionTypes.REGISTRATION_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the new-user registration has completed.
 * @param {User}  user  A Firebase User object
 * @see Google. (n.d.). User [Software documentation]. Retrieved from
 * {@link https://firebase.google.com/docs/reference/js/firebase.User}
 */
export const registrationFulfilled = (data) => (
  {
    type: ActionTypes.REGISTRATION_FULFILLED,
    payload: data
  }
)

/**
 * Initiate an action to remove inputs.
 */
export const removeInputsRequested = () => (
  {
    type: ActionTypes.REMOVE_INPUTS_REQUESTED
  }
)

/**
 * Initiate an error indicating that removing inputs has failed.
 * @param  {Error} errorMessage Message describing the registration failure.
 */
export const removeInputsRejected = (message) => (
  {
    type: ActionTypes.REMOVE_INPUTS_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that removing inputs has completed.
 * @param {Array} inputs  Array of input objects.
 */
export const removeInputsFulfilled = (inputs) => (
  {
    type: ActionTypes.REMOVE_INPUTS_FULFILLED,
    payload: inputs
  }
)

/**
 * Initiate an action to remove listeners.
 */
export const removeListenersRequested = () => (
  {
    type: ActionTypes.REMOVE_LISTENERS_REQUESTED
  }
)

/**
 * Initiate an error indicating that removing listeners has failed.
 * @param  {Error} errorMessage Message describing the registration failure.
 */
export const removeListenersRejected = (message) => (
  {
    type: ActionTypes.REMOVE_LISTENERS_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that all listeners have been removed.
 */
export const removeListenersFulfilled = () => (
  {
    type: ActionTypes.REMOVE_LISTENERS_FULFILLED
  }
)

/**
 * Initiate an action to remove timers.
 */
export const removeTimersRequested = () => (
  {
    type: ActionTypes.REMOVE_TIMERS_REQUESTED
  }
)

/**
 * Initiate an error indicating that removing timers has failed.
 * @param  {Error} errorMessage Message describing the registration failure.
 */
export const removeTimersRejected = (message) => (
  {
    type: ActionTypes.REMOVE_TIMERS_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that all timers have been removed.
 */
export const removeTimersFulfilled = () => (
  {
    type: ActionTypes.REMOVE_TIMERS_FULFILLED
  }
)

/**
 * Initiate an action to remove timers.
 */
export const setInputParametersRequested = () => (
  {
    type: ActionTypes.SET_INPUT_PARAMETERS_REQUESTED
  }
)

/**
 * Initiate an error indicating that removing timers has failed.
 * @param  {Error} errorMessage Message describing the registration failure.
 */
export const setInputParametersRejected = (message) => (
  {
    type: ActionTypes.SET_INPUT_PARAMETERS_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that all timers have been removed.
 */
export const setInputParametersFulfilled = (height) => (
  {
    type: ActionTypes.SET_INPUT_PARAMETERS_FULFILLED,
    payload: height
  }
)

/**
 * Initiate an action to set the last alert time.
 */
export const setLastAlertTimeRequested = () => (
  {
    type: ActionTypes.SET_LAST_ALERT_TIME_REQUESTED
  }
)

/**
 * Initiate an error indicating that the last alert time was not set.
 * @param  {Error} errorMessage Message describing the listening failure.
 */
export const setLastAlertTimeRejected = (message) => (
  {
    type: ActionTypes.SET_LAST_ALERT_TIME_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action setting the last time the buddy should checked in.
 * @param {String} lastAlertTime  Time buddy should have checked in.
 */
export const setLastAlertTimeFulfilled = (lastAlertTime) => (
  {
    type: ActionTypes.SET_LAST_ALERT_TIME_FULFILLED,
    payload: lastAlertTime
  }
)

/**
 * Initiate an action to set a listener for buddy check-ins.
 */
export const setListenerRequested = () => (
  {
    type: ActionTypes.SET_LISTENER_REQUESTED
  }
)

/**
 * Initiate an error indicating that the listener was not set.
 * @param  {Error} errorMessage Message describing the listening failure.
 */
export const setListenerRejected = (message) => (
  {
    type: ActionTypes.SET_LISTENER_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the new-user registration has completed.
 * @param {Promise} listener  A promise to set another listener after a timeout.
 */
export const setListenerFulfilled = (listener) => (
  {
    type: ActionTypes.SET_LISTENER_FULFILLED,
    payload: listener
  }
)

/**
 * Initiate an action to set a timer-interval for buddy check-in alerts.
 */
export const setListenerIntervalRequested = () => (
  {
    type: ActionTypes.SET_LISTENER_INTERVAL_REQUESTED
  }
)

/**
 * Initiate an error indicating that the timer-interval was not set.
 * @param  {Error} errorMessage Message describing the timer-interval failure.
 */
export const setListenerIntervalRejected = (message) => (
  {
    type: ActionTypes.SET_LISTENER_INTERVAL_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the timer-interval has been set.
 * @param  {Integer} interval   The interval between alerts.
 */
export const setListenerIntervalFulfilled = (interval) => (
  {
    type: ActionTypes.SET_LISTENER_INTERVAL_FULFILLED,
    payload: interval
  }
)

/**
 * Initiate an action indicating that setting the shortest interval was
 * requested.
 */
export const setShortestIntervalRequested = () => (
  {
    type: ActionTypes.SET_SHORTEST_INTERVAL_REQUESTED
  }
)

/**
 * Initiate an error indicating that the shortest interval was not set.
 * @param  {Error} errorMessage Message describing the interval-setting failure.
 */
export const setShortestIntervalRejected = (message) => (
  {
    type: ActionTypes.SET_SHORTEST_INTERVAL_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the shortest interval has been set.
 * @param  {Integer} interval   Shortest interval between alerts.
 */
export const setShortestIntervalFulfilled = (interval) => (
  {
    type: ActionTypes.SET_SHORTEST_INTERVAL_FULFILLED,
    payload: interval
  }
)

/**
 * Initiate an action to set a snooze for user check-in alerts.
 */
export const setSnoozeRequested = () => (
  {
    type: ActionTypes.SET_SNOOZE_REQUESTED
  }
)

/**
 * Initiate an error indicating that the snooze was not set.
 * @param  {Error} errorMessage Message describing the timer-interval failure.
 */
export const setSnoozeRejected = (message) => (
  {
    type: ActionTypes.SET_SNOOZE_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the snooze has been set.
 * @param  {Integer} snooze   The interval between alerts.
 */
export const setSnoozeFulfilled = (snooze) => (
  {
    type: ActionTypes.SET_SNOOZE_FULFILLED,
    payload: snooze
  }
)

/**
 * Initiate an action to set a timer for user check-in alerts.
 */
export const setTimerRequested = () => (
  {
    type: ActionTypes.SET_TIMER_REQUESTED
  }
)

/**
 * Initiate an error indicating that the timer was not set.
 * @param  {Error} errorMessage Message describing the timer failure.
 */
export const setTimerRejected = (message) => (
  {
    type: ActionTypes.SET_TIMER_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the timer has been set.
 * @param {Integer} timer ID of a time-out object.
 */
export const setTimerFulfilled = (timer) => (
  {
    type: ActionTypes.SET_TIMER_FULFILLED,
    payload: timer
  }
)

/**
 * Initiate an action to set a timer-interval for user check-in alerts.
 */
export const setTimerIntervalRequested = () => (
  {
    type: ActionTypes.SET_TIMER_INTERVAL_REQUESTED
  }
)

/**
 * Initiate an error indicating that the timer-interval was not set.
 * @param  {Error} errorMessage Message describing the timer-interval failure.
 */
export const setTimerIntervalRejected = (message) => (
  {
    type: ActionTypes.SET_TIMER_INTERVAL_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the timer-interval has been set.
 * @param  {Integer}  interval  The interval between alerts.
 */
export const setTimerIntervalFulfilled = (interval) => (
  {
    type: ActionTypes.SET_TIMER_INTERVAL_FULFILLED,
    payload: interval
  }
)

/**
 * Initiate an action to sign-in a user on Firebase.
 */
export const signinRequested = () => (
  {
    type: ActionTypes.SIGNIN_REQUESTED
  }
)

/**
 * Initiate an error indicating that the sign-in has failed.
 * @param  {Error} errorMessage Message describing the sign-in failure.
 */
export const signinRejected = (message) => (
  {
    type: ActionTypes.SIGNIN_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the sign-in has completed.
 * @param {User}  user  A Firebase User object
 * @see Google. (n.d.). User [Software documentation]. Retrieved from
 * {@link https://firebase.google.com/docs/reference/js/firebase.User}
 */
export const signinFulfilled = (data) => (
  {
    type: ActionTypes.SIGNIN_FULFILLED,
    payload: data
  }
)

/**
 * Initiate an action to sign-out a user on Firebase.
 */
export const signoutRequested = () => (
  {
    type: ActionTypes.SIGNOUT_REQUESTED
  }
)

/**
 * Initiate an error indicating that the sign-out has failed.
 * @param  {Error} errorMessage Message describing the sign-in failure.
 */
export const signoutRejected = (message) => (
  {
    type: ActionTypes.SIGNOUT_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the sign-out has completed.
 */
export const signoutFulfilled = () => (
  {
    type: ActionTypes.SIGNOUT_FULFILLED
  }
)
