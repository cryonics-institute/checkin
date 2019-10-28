/**
 * Redux action-creators for the project, Cryonics Check-In.
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

import { Alert } from 'react-native'
import moment from 'moment'
import * as ActionTypes from './ActionTypes'
import { auth, db } from '../firebase/firebase'
import NavigationService from '../services/NavigationService'

/**
 * Take a string representing a time in AM/PM format from a Time-Input component
 * and return the hour in 24-hour format.
 * @param  {String} time  String from Time-Input Component.
 * @return {String}       Hour in 24-Hour Format.
 */
const convertTo24Hour = (time) => {
  const period = time.slice(-2).toUpperCase()
  const hour = parseInt(time.slice(-8, -6))

  if (period === 'AM') {
    if (hour === 12) {
      return '00'
    } else if (hour < 10) {
      return '0' + hour
    } else {
      return hour.toString()
    }
  } else {
    if (hour === 12) {
      return hour.toString()
    } else {
      return (hour + 12).toString()
    }
  }
}

/**
 * Add a new document to Firebase for the currently authorized user.  The
 * document includes the sign-in and check-in times, both set to the current
 * time, and the check-in interval.  After Firebase returns a promise that the
 * document has been created, an action for document-fulfillment is initiated,
 * the setTimer action creator is called with the check-in interval, and the
 * navigation service is told to navigate to the patient's app-stack.
 * @return {Promise}  A promise to create a new Firebase document.
 */
export const addDocument = () => (dispatch, getState) => {
  dispatch(addDocumentRequestedAction())

  return db.collection('users').doc(getState().auth.user.email).set(
    {
      alertTimes: getState().inputs.array,
      checkinInterval: getState().timer.interval,
      checkinTime: (new Date()).toISOString(),
      signinTime: (new Date()).toISOString()
    }
  )
    .then(
      () => {
        dispatch(addDocumentFulfilledAction())
        dispatch(setTimer(getState().timer.interval))
        NavigationService.navigate('PatientApp')
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(addDocumentRejectedAction(error.message)))
}

/**
 * Initiate an action to create a new Firebase document.
 */
export const addDocumentRequestedAction = () => (
  {
    type: ActionTypes.ADD_DOCUMENT_REQUESTED
  }
)

/**
 * Initiate an error indicating that creation of a new Firebase document failed.
 * @param  {Error} errorMessage Message describing the add-document failure.
 */
export const addDocumentRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.ADD_DOCUMENT_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that a new Firebase document has been created.
 */
export const addDocumentFulfilledAction = () => (
  {
    type: ActionTypes.ADD_DOCUMENT_FULFILLED
  }
)

/**
 * Add a patient to be be tracked by the current standby user.  First, a
 * setListener action creator is called with the patient's e-mail.  After that
 * promise is returned, an action for add-patient-fulfillment is initiated and
 * the navigation service is told to navigate to the standby's app-stack.
 * @param  {String}   email E-mail of the patient to be added.
 * @return {Promise}        A promise to add a patient to be tracked by standby.
 */
export const addPatient = (email) => (dispatch) => {
  dispatch(addPatientRequestedAction(email))

  return Promise.resolve(
    dispatch(setListener(email))
  )
    .then(
      () => {
        dispatch(addPatientFulfilledAction())
        NavigationService.navigate('StandbyHome')
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(addPatientRejectedAction(error.message)))
}

/**
 * Initiate an action to add a patient to be be tracked by the current standby.
 * @param  {String}   email E-mail of the patient to be added.
 */
export const addPatientRequestedAction = (email) => (
  {
    type: ActionTypes.ADD_PATIENT_REQUESTED,
    payload: email
  }
)

/**
 * Initiate an error indicating that adding a patient to be be tracked failed.
 * @param  {Error} errorMessage Message describing the add-patient failure.
 */
export const addPatientRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.ADD_PATIENT_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that a patient to be be tracked has been added.
 */
export const addPatientFulfilledAction = () => (
  {
    type: ActionTypes.ADD_PATIENT_FULFILLED
  }
)

/**
 * Initiate a check-in by updating the check-in time and the check-in interval
 * in the currently authorized user's Firebase document.  After that
 * promise is returned, an action for check-in-fulfillment is initiated and
 * a timer is set to alert the user to check-in again after the interval has
 * elapsed.
 * @return {Promise}        A promise to update the check-in time and interval.
 */
export const checkin = () => (dispatch, getState) => {
  dispatch(checkinRequestedAction())

  return db.collection('users').doc(getState().auth.user.email).update(
    {
      checkinTime: (new Date()).toISOString()
    }
  )
    .then(
      () => {
        dispatch(removeTimers())
      }
    )
    .then(
      () => {
        dispatch(checkinFulfilledAction())
        dispatch(setTimer(getState().timer.interval))
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(checkinRejectedAction(error.message)))
}

/**
 * Initiate an action to update a patient's check-in time and interval.
 */
export const checkinRequestedAction = () => (
  {
    type: ActionTypes.CHECKIN_REQUESTED
  }
)

/**
 * Initiate an error indicating that updating a patient's check-in time and
 * interval failed.
 * @param  {Error} errorMessage Message describing the check-in failure.
 */
export const checkinRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.CHECKIN_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that a patient's check-in time and interval has
 * been added.
 */
export const checkinFulfilledAction = () => (
  {
    type: ActionTypes.CHECKIN_FULFILLED
  }
)

/**
 * Update the sign-in and check-in times and the check-in interval in the Redux
 * store using the currently-authorized user's Firebase document.  First, the
 * document is retrieved from Firebase.  After that promise is returned, the
 * appropriate state parameters are updated.  Finally, an action for get-
 * document-fulfillment is initiated.
 * @param  {String}   email E-mail of the currently-authorized patient.
 * @return {Promise}        A promise to update check-in state parameters.
 */
export const getDocument = (email) => (dispatch) => {
  dispatch(getDocumentRequestedAction())

  return db.collection('users').doc(email).get()
    .then(
      doc => {
        if (doc.exists) {
          const alertTimes = doc.data().alertTimes
          const checkinInterval = doc.data().checkinInterval
          const checkinTime = doc.data().checkinTime
          const signinTime = doc.data().signinTime

          return [true, alertTimes, checkinInterval, checkinTime, signinTime]
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')

          return [false, null, null, null]
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      data => {
        dispatch(getDocumentFulfilledAction(data))
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(getDocumentRejectedAction(error.message)))
}

/**
 * Initiate an action to update the sign-in and check-in times and the check-in
 * interval in the Redux store.
 */
export const getDocumentRequestedAction = () => (
  {
    type: ActionTypes.GET_DOCUMENT_REQUESTED
  }
)

/**
 * Initiate an error indicating that updating the Redux store has failed.
 * @param  {Error} errorMessage Message describing the check-in failure.
 */
export const getDocumentRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.GET_DOCUMENT_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that updating the Redux store has completed.
 * @param {Array} data  An array of values for the patient reducer.
 */
export const getDocumentFulfilledAction = (data) => (
  {
    type: ActionTypes.GET_DOCUMENT_FULFILLED,
    payload: data
  }
)

/**
 * Mutate an input in the inputs array if it exists or add it if it does not
 * exist.
 * @param  {String}   id        Unique identifier for input.
 * @param  {String}   time      Time entered into input.
 * @param  {Boolean}  validity  Is the time valid?
 */
export const mutateInput = (id, time, validity) => (dispatch, getState) => {
  dispatch(mutateInputsRequestedAction())

  const hours = time.length > 0 ? convertTo24Hour(time) : 0
  const minutes = time.length > 0 ? time.slice(-5, -3) : 0

  const input = {
    id: id,
    time: (new Date(1970, 0, 1, hours, minutes)).toISOString(),
    validity: validity
  }
  const index = getState().inputs.array.findIndex(input => input.id === id)

  try {
    if (getState().inputs.array !== null) {
      let inputsArray = null

      if (index === -1) {
        inputsArray = [
          ...getState().inputs.array.filter(input => input.id !== id),
          input
        ]
      } else {
        inputsArray = [
          ...getState().inputs.array.slice(0, index),
          input,
          ...getState().inputs.array.slice(index + 1)
        ]
      }

      return db.collection('users').doc(getState().auth.user.email).update(
        {
          alertTimes: inputsArray
        }
      )
        .then(
          dispatch(
            mutateInputsFulfilledAction(
              inputsArray
            )
          )
        )
        .catch(error => dispatch(mutateInputsRejectedAction(error.message)))
    } else if (getState().inputs.array == null) {
      throw new Error('Input array is null or undefined.')
    } else {
      throw new Error(
        'Error encountered in the function, mutateInput, of ActionCreators.js'
      )
    }
  } catch (error) {
    dispatch(mutateInputsRejectedAction(error.message))
  }
}

/**
 * Initiate an action to set the inputs array.
 */
export const mutateInputsRequestedAction = () => (
  {
    type: ActionTypes.MUTATE_INPUTS_REQUESTED
  }
)

/**
 * Initiate an error indicating that mutation of the inputs array failed.
 * @param  {Error} errorMessage Message describing the input-mutation failure.
 */
export const mutateInputsRejectedAction = (errorMessage) => (
  {
    type: ActionTypes.MUTATE_INPUTS_REJECTED,
    payload: errorMessage
  }
)

/**
 * Initiate an action indicating that setting the inputs array has completed.
 * @param  {Array} inputs Array of input objects.
 */
export const mutateInputsFulfilledAction = (inputs) => (
  {
    type: ActionTypes.MUTATE_INPUTS_FULFILLED,
    payload: inputs
  }
)

/**
 * Register a new account for a patient on Firebase.  After that promise is
 * returned, an action for registration-fulfillment is initiated and a
 * request to add a document for that patient in initiated.
 * @param  {String}   creds Username and password for the patient.
 * @return {Promise}        A promise to create a new patient-user.
 */
export const registerPatient = (creds) => (dispatch) => {
  dispatch(registrationRequestedAction())

  return auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      (userCredential) => {
        dispatch(registrationFulfilledAction(userCredential.user))
        dispatch(addDocument())
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(registrationRejectedAction(error.message)))
}

/**
 * Register a new account for a standby-user on Firebase.  After that promise is
 * returned, an action for registration-fulfillment is initiated and the
 * navigation service is told to navigate to the standby's app-stack.
 * @param  {String}   creds Username and password for the standby-user.
 * @return {Promise}        A promise to create a new standby-user.
 */
export const registerStandby = (creds) => (dispatch) => {
  dispatch(registrationRequestedAction())

  return auth.createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      (userCredential) => {
        dispatch(registrationFulfilledAction(userCredential.user))
        NavigationService.navigate('StandbyApp')
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(registrationRejectedAction(error.message)))
}

/**
 * Initiate an action to register a new user on Firebase.
 */
export const registrationRequestedAction = () => (
  {
    type: ActionTypes.REGISTRATION_REQUESTED
  }
)

/**
 * Initiate an error indicating that the new-user registration has failed.
 * @param  {Error} errorMessage Message describing the registration failure.
 */
export const registrationRejectedAction = (message) => (
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
export const registrationFulfilledAction = (user) => (
  {
    type: ActionTypes.REGISTRATION_FULFILLED,
    payload: user
  }
)

/**
 * Remove an input in the inputs array.
 * @param  {String} id  Unique identifier for input.
 */
export const removeInput = (id) => (dispatch, getState) => {
  dispatch(mutateInputsRequestedAction())

  const inputsArray = getState().inputs.array.filter(input => input.id !== id)

  return db.collection('users').doc(getState().auth.user.email).update(
    {
      alertTimes: inputsArray
    }
  )
    .then(
      dispatch(
        mutateInputsFulfilledAction(
          inputsArray
        )
      )
    )
    .catch(error => dispatch(mutateInputsRejectedAction(error.message)))
}

/**
 * Remove an input in the inputs array.
 * @param  {String} id  Unique identifier for input.
 */
export const removeInputs = (id) => (dispatch, getState) => {
  dispatch(mutateInputsRequestedAction())

  try {
    dispatch(
      mutateInputsFulfilledAction([])
    )
  } catch (error) {
    dispatch(mutateInputsRejectedAction(error))
  }
}

/**
 * Remove a single listener added in the addPatient action from the array of
 * listeners in the Redux store.
 * @param  {Promise} listener A promise to set another listener after a timeout.
 */
export const removeListener = (listener) => (dispatch, getState) => {
  clearTimeout(listener)

  const listeners = getState().patient.listeners
  const index = listeners.indexOf(listener)
  if (index > -1) {
    listeners.splice(index, 1)
  }

  dispatch(removeTimerAction(listeners))
}

/**
 * Remove all listeners added in the addPatient action from the array of
 * listeners in the Redux store.
 */
export const removeListeners = () => (dispatch, getState) => {
  getState().patient.listeners.forEach(
    listener => clearTimeout(listener)
  )
  dispatch(removeListenersAction())
}

/**
 * Initiate an action indicating that all listeners have been removed.
 */
export const removeListenersAction = () => (
  {
    type: ActionTypes.REMOVE_LISTENERS
  }
)

/**
 * Remove a single timer from the array of timers in the Redux store.
 * @param {Integer} timer ID of a time-out object.
 */
export const removeTimer = (timer) => (dispatch, getState) => {
  clearTimeout(timer)

  const timers = getState().timer.timers
  const index = timers.indexOf(timer)
  if (index > -1) {
    timers.splice(index, 1)
  }

  dispatch(removeTimerAction(timers))
}

/**
 * Initiate an action indicating that the timer has been removed.
 * @param {Array} newTimers Array of IDs of time-out objects
 */
export const removeTimerAction = (newTimers) => (
  {
    type: ActionTypes.REMOVE_TIMER,
    payload: newTimers
  }
)

/**
 * Remove all timers from the array of timers in the Redux store.
 */
export const removeTimers = () => (dispatch, getState) => {
  getState().timer.timers.forEach(timer => clearTimeout(timer))
  dispatch(removeTimersAction())
}

/**
 * Initiate an action indicating that all timers have been removed.
 */
export const removeTimersAction = () => (
  {
    type: ActionTypes.REMOVE_TIMERS
  }
)

/**
 * Set the status of the currently-authorized user as patient or standby.
 * @param {Boolean} isPatient Whether user is a patient or standby.
 */
export const selectStatus = (isPatient) => (dispatch) => {
  dispatch(selectStatusAction(isPatient))
}

/**
 * Initiate an action indicating that the user's status has been set.
 * @param {Boolean} isPatient Whether user is a patient or standby.
 */
export const selectStatusAction = (isPatient) => (
  {
    type: ActionTypes.SELECT_STATUS,
    payload: isPatient
  }
)

/**
 * Set a recurring listener that will check if the patient that the standby-user
 * is following has checked in within the alotted interval or else alert standby
 * that the user has not checked in.
 * @param  {String} email E-mail of the patient to listen to.
 * @return {Promise}      Promise to create another listener after an interval.
 */
export const setListener = (email) => (dispatch, getState) => {
  const findClosestCheckinTime = () => {
    const now = moment.utc((new Date(1970, 0, 1, 2, 0)).toISOString()) // .format('HH:mm')
    console.log('NOW: ' + now)

    const alertTimes = getState().patient.alertTimes.map(
      element => moment.utc(element.time)
    )
    alertTimes.sort()
    alertTimes.forEach(
      element => console.log('TIME: ' + element) // .format('HH:mm'))
    )
    // TODO: finish reducer function
    const reducer =
      (accumulator, currentValue) => // {
      //   const accumulatorHour = accumulator.slice(0, 2)
      //   const accumulatorMinute = accumulator.slice(3)
      //   const currentValueHour = currentValue.slice(0, 2)
      //   const currentValueMinute = currentValue.slice(3)
      //   const nowHour = now.slice(0, 2)
      //   const nowMinute = now.slice(3)
      // }
        now - currentValue <= 0 || now - accumulator < now - currentValue
          ? accumulator
          : currentValue

    console.log('LATEST TIME: ' + alertTimes.reduce(reducer))
  }

  const setInterval = () => {
    findClosestCheckinTime()
    const interval = moment.utc(getState().patient.checkinInterval)
    console.log('Interval: ' + interval)
    const lastCheckin = moment.utc(getState().patient.checkinTime)
    console.log('Last Check-In: ' + lastCheckin)
    const now = moment.utc()
    console.log('Now: ' + now)
    const elapsedTime = now - lastCheckin
    console.log('Elapsed Time: ' + elapsedTime)
    if (elapsedTime < interval) {
      console.log('Elapsed Time: ' + elapsedTime)
      return elapsedTime
    } else if (elapsedTime > interval) {
      console.log('Elapsed Time: ' + elapsedTime)
      return 0
    } else {
      console.log('Interval: ' + interval)
      return interval
    }
  }

  const noCheckinAlert = () => {
    Alert.alert(
      'Cryonics-Patient Alert',
      'Your buddy has not checked in.\nMake contact immediately!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed')
            dispatch(setListener(getState().patient.email))
          }
        },
        {
          text: 'Dismiss',
          onPress: () => {
            console.log('Dismiss Pressed')
          },
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
  }

  dispatch(setListenerRequestedAction())

  return dispatch(getDocument(email))
    .then(
      () => {
        dispatch(removeListeners())

        if (getState().patient.isSignedIn) {
          const interval = setInterval()
          if (interval > 0) {
            const listener = Promise.resolve(
              setTimeout(
                () => { dispatch(setListener(getState().patient.email)) },
                interval
              )
            )
            return listener
          } else {
            return noCheckinAlert()
          }
        } else {
          // TODO: Add logic for when patient is signed out, such as an
          // indicator on the standby home screen that says so.
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      listener => {
        dispatch(setListenerFulfilledAction(listener))
        // dispatch(setListener(getState().patient.email))
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(setListenerRejectedAction(error.message)))
}

/**
 * Initiate an action to set a listener for patient check-ins.
 */
export const setListenerRequestedAction = () => (
  {
    type: ActionTypes.SET_LISTENER_REQUESTED
  }
)

/**
 * Initiate an error indicating that the listener was not set.
 * @param  {Error} errorMessage Message describing the listening failure.
 */
export const setListenerRejectedAction = (message) => (
  {
    type: ActionTypes.SET_LISTENER_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the new-user registration has completed.
 * @param  {Promise} listener A promise to set another listener after a timeout.
 */
export const setListenerFulfilledAction = (listener) => (
  {
    type: ActionTypes.SET_LISTENER_FULFILLED,
    payload: listener
  }
)

/**
 * Set a timer that will issue an alert for the currently authorized patient to
 * check-in after an interval of time.
 * @param  {Integer}  interval  The interval between alerts.
 * @return {Promise}            Promise to set a timer.
 */
export const setTimer = (interval) => (dispatch, getState) => {
  const checkinAlert = () => {
    const timers = getState().timer.timers
    if (typeof timers !== 'undefined' && timers.length > 0) {
      Alert.alert(
        'Check In?',
        'Your buddy will be alerted if not.',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed')
              dispatch(removeTimers())
              dispatch(checkin())
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed')
              dispatch(removeTimers())
            },
            style: 'cancel'
          }
        ],
        { cancelable: false }
      )
    }
  }

  dispatch(setTimerRequestedAction())

  return Promise.resolve(
    dispatch(setTimerInterval(interval))
  )
    .then(
      () => {
        const timer = setTimeout(
          () => { checkinAlert() },
          interval
        )
        return timer
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      timer => {
        dispatch(setTimerFulfilledAction(timer))
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(setTimerRejectedAction(error.message)))
}

/**
 * Initiate an action to set a timer for patient check-in alerts.
 */
export const setTimerRequestedAction = () => (
  {
    type: ActionTypes.SET_TIMER_REQUESTED
  }
)

/**
 * Initiate an error indicating that the timer was not set.
 * @param  {Error} errorMessage Message describing the timer failure.
 */
export const setTimerRejectedAction = (message) => (
  {
    type: ActionTypes.SET_TIMER_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the timer has been set.
 * @param {Integer} timer ID of a time-out object.
 */
export const setTimerFulfilledAction = (timer) => (
  {
    type: ActionTypes.SET_TIMER_FULFILLED,
    payload: timer
  }
)

/**
 * Set the interval for the setTimer function.
 * @param  {Integer}  interval  The interval between alerts.
 */
export const setTimerInterval = (interval) => (dispatch, getState) => {
  dispatch(setTimerIntervalRequestedAction())

  db.collection('users').doc(getState().auth.user.email).update(
    {
      checkinInterval: interval
    }
  )
    .catch(error => dispatch(setTimerIntervalRejectedAction(error.message)))
    .finally(
      () => {
        dispatch(setTimerIntervalFulfilledAction(interval))
      }
    )
}

/**
 * Initiate an action to set a timer-interval for patient check-in alerts.
 */
export const setTimerIntervalRequestedAction = () => (
  {
    type: ActionTypes.SET_TIMER_INTERVAL_REQUESTED
  }
)

/**
 * Initiate an error indicating that the timer-interval was not set.
 * @param  {Error} errorMessage Message describing the timer-interval failure.
 */
export const setTimerIntervalRejectedAction = (message) => (
  {
    type: ActionTypes.SET_TIMER_INTERVAL_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the timer-interval has been set.
 * @param  {Integer}  interval  The interval between alerts.
 */
export const setTimerIntervalFulfilledAction = (interval) => (
  {
    type: ActionTypes.SET_TIMER_INTERVAL_FULFILLED,
    payload: interval
  }
)

/**
 * Sign in a patient on Firebase.  After that promise is returned, an action for
 * sign-in-fulfillment is initiated and a request to add a document for that
 * patient in initiated.
 * @param  {String}   creds Username and password for the patient.
 * @return {Promise}        A promise to sign-in a patient-user.
 */
export const signinPatient = (creds) => (dispatch) => {
  dispatch(signinRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      userCredential => {
        dispatch(signinFulfilledAction(userCredential.user))
        dispatch(addDocument())
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(signinRejectedAction(error.message)))
}

/**
 * Sign in a standby-user on Firebase.  After that promise is returned, an
 * action for sign-in-fulfillment is initiated and a request to add a document
 * for that patient in initiated.
 * @param  {String}   creds Username and password for the standby-user.
 * @return {Promise}        A promise to sign-in a standby-user.
 */
export const signinStandby = (creds) => (dispatch) => {
  dispatch(signinRequestedAction(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      userCredential => {
        dispatch(signinFulfilledAction(userCredential.user))
        NavigationService.navigate('StandbyApp')
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(signinRejectedAction(error.message)))
}

/**
 * Initiate an action to sign-in a user on Firebase.
 */
export const signinRequestedAction = () => (
  {
    type: ActionTypes.SIGNIN_REQUESTED
  }
)

/**
 * Initiate an error indicating that the sign-in has failed.
 * @param  {Error} errorMessage Message describing the sign-in failure.
 */
export const signinRejectedAction = (message) => (
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
export const signinFulfilledAction = (user) => (
  {
    type: ActionTypes.SIGNIN_FULFILLED,
    payload: user
  }
)

/**
 * Sign out a patient on Firebase, which first removes that patient's document on
 * Firebase.  After those promises are returned, an action for sign-out-
 * fulfillment is initiated, a request to remove timers is initiated, and the
 * navigation service is told to navigate to the authorization stack.
 * @return {Promise}  A promise to sign-out a patient-user.
 */
export const signoutPatient = () => (dispatch, getState) => {
  dispatch(signoutRequestedAction())

  return db.collection('users').doc(getState().auth.user.email).delete()
    .then(
      () => {
        auth.signOut()
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => {
        dispatch(removeTimers())
        dispatch(removeInputs())
        dispatch(signoutFulfilledAction())
        NavigationService.navigate('PatientAuth')
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      (error) => {
        signoutRejectedAction(error.message)
      }
    )
}

/**
 * Sign out a standby-user on Firebase.  After those promises are returned, an
 * action for sign-out-fulfillment is initiated, a request to remove listeners
 * is initiated, and the navigation service is told to navigate to the
 * authorization stack.
 * @return {Promise}  A promise to sign-out a standby-user.
 */
export const signoutStandby = () => (dispatch, getState) => {
  dispatch(signoutRequestedAction())

  return auth.signOut()
    .then(
      () => {
        dispatch(removeListeners())
        dispatch(signoutFulfilledAction())
        NavigationService.navigate('StandbyAuth')
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      (error) => {
        signoutRejectedAction(error.message)
      }
    )
}

/**
 * Initiate an action to sign-out a user on Firebase.
 */
export const signoutRequestedAction = () => (
  {
    type: ActionTypes.SIGNOUT_REQUESTED
  }
)

/**
 * Initiate an error indicating that the sign-out has failed.
 * @param  {Error} errorMessage Message describing the sign-in failure.
 */
export const signoutRejectedAction = (message) => (
  {
    type: ActionTypes.SIGNOUT_REJECTED,
    payload: message
  }
)

/**
 * Initiate an action indicating that the sign-out has completed.
 */
export const signoutFulfilledAction = () => (
  {
    type: ActionTypes.SIGNOUT_FULFILLED
  }
)
