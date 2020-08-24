/**
 * Redux thunk actions for the project, Check-In.
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

// TODO: Add Flow Types
import { Alert } from 'react-native'
import moment from 'moment'
import auth from '@react-native-firebase/auth'
import db from '@react-native-firebase/firestore'
import * as ActionCreators from './ActionCreators'

/**
 * Helper function that checks whether an object exists or not.
 * @param  {Object} object  Any object that can be undefined or null.
 * @return {boolean}        True or false.
 */
const exists = (object) => {
  if (typeof object !== 'undefined' && object !== null) {
    return true
  } else {
    return false
  }
}

/**
 * Add a buddy to be be tracked by the current user.  First, a setListener
 * action creator is called with the buddy's e-mail.  After that promise is
 * returned, an action for add-buddy-fulfillment is initiated.
 * @param  {String}   email E-mail of the buddy to be added.
 * @return {Promise}        A promise to add a buddy to be tracked by standby.
 */
export const addBuddy = (email) => (dispatch, getState) => {
  dispatch(ActionCreators.addBuddyRequested())

  return Promise.resolve(dispatch(setListener(email)))
    .then(
      () => dispatch(ActionCreators.addBuddyFulfilled(email)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.addBuddyRejected(error.message)))
}

/**
 * Add a new document to Firebase for the currently authorized user.  The
 * document includes the sign-in and check-in times, both set to the current
 * time, and the check-in interval.  After Firebase returns a promise that the
 * document has been created, an action for document-fulfillment is initiated.
 * @return {Promise}  A promise to create a new Firebase document.
 */
export const addDocument = (email) => (dispatch, getState) => {
  const now = (new Date()).toISOString()
  const user = {
    checkinTime: now,
    isSignedIn: true,
    snooze: 9 // TODO: This should be changed so snooze is not reset on login.
  }

  dispatch(ActionCreators.addDocumentRequested())

  return db().collection('users').doc(email).get()
    .then(
      doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data())

          const deviceToken = getState().device.token
          let deviceTokens = doc.data().deviceTokens
          if (exists(deviceTokens)) {
            if (!deviceTokens.includes(deviceToken)) {
              deviceTokens.push(deviceToken)
            }
          } else {
            deviceTokens = [deviceToken]
          }

          if (exists(doc.data().subscribers)) {
            return db().collection('users').doc(email).set(
              {
                alertTimes: getState().inputs.alertTimes,
                checkinTime: user.checkinTime,
                deviceTokens: deviceTokens,
                snooze: user.snooze,
                subscribers: doc.data().subscribers
              }
            )
          } else {
            return db().collection('users').doc(email).set(
              {
                alertTimes: getState().inputs.alertTimes,
                checkinTime: user.checkinTime,
                deviceTokens: deviceTokens,
                snooze: user.snooze
              }
            )
          }
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')

          return db().collection('users').doc(email).set(
            {
              alertTimes: getState().inputs.alertTimes,
              checkinTime: user.checkinTime,
              deviceTokens: [getState().device.token],
              snooze: user.snooze
            }
          )
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => dispatch(ActionCreators.addDocumentFulfilled(user)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.addDocumentRejected(error.message)))
}

/**
 * Initiate a check-in by updating the check-in time and the check-in interval
 * in the currently authorized user's Firebase document.  After that
 * promise is returned, an action for check-in-fulfillment is initiated and
 * a timer is set to alert the user to check-in again after the interval has
 * elapsed.
 * @return {Promise}        A promise to update the check-in time and interval.
 */
export const checkin = () => (dispatch, getState) => {
  const now = (new Date()).toISOString()
  const user = { checkinTime: now }

  dispatch(ActionCreators.checkinRequested())

  return db().collection('users').doc(getState().auth.user.email).update(
    {
      checkinTime: user.checkinTime
    }
  )
    .then(
      () => db().collection('users').doc(getState().auth.user.email).update(
        { wasCheckedForAlerts: false }
      ),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => dispatch(removeTimers()),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => dispatch(ActionCreators.checkinFulfilled(user.checkinTime)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.checkinRejected(error.message)))
    .finally(() => { dispatch(setTimer()) })
}

/**
 * Get the sign-in and check-in times and the check-in interval in the Redux
 * store using a buddy's Firebase document.  First, the document is retrieved
 * from Firebase.  After that promise is returned, the appropriate state
 * parameters are updated.  Finally, an action for get-document-fulfillment is
 * initiated.
 * @param  {String}   email A buddy's e-mail.
 * @return {Promise}        A promise to update check-in state parameters.
 */
// TODO: Can do better with the database rules for Firestore?
// https://firebase.google.com/docs/firestore/security/overview
export const getDocument = (email) => (dispatch, getState) => {
  dispatch(ActionCreators.getDocumentRequested())

  return db().collection('users').doc(email).get()
    .then(
      doc => {
        if (doc.exists) {
          console.log('Document exists!')

          if (exists(doc.data().subscribers)) {
            console.log('Subscriber defined!')
          } else {
            console.log('Subscriber undefined!')
            db().collection('users').doc(email).update({ subscribers: {} })
          }
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
        return doc
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      doc => {
        if (doc.exists) {
          console.log('Document exists!')

          const uid = getState().auth.user.uid
          if (
            exists(doc.data().subscribers) &&
            exists(doc.data().subscribers[uid])
          ) {
            console.log('Subscriber defined!')
            const token = getState().device.token
            const subscriberData =
              doc.data().subscribers[uid].includes(token)
                ? doc.data().subscribers[uid]
                : doc.data().subscribers[uid].concat([token])
            db().collection('users').doc(email).update(
              {
                ['subscribers.' + uid]: subscriberData
              }
            )
          } else {
            console.log('Subscriber undefined!')
            const subscriberData = [getState().device.token]
            db().collection('users').doc(email).update(
              {
                ['subscribers.' + uid]: subscriberData
              }
            )
          }
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
        return doc
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      doc => {
        if (doc.exists) {
          return [
            true,
            doc.data().alertTimes,
            exists(doc.data().checkinInterval)
              ? doc.data().checkinInterval
              : 0,
            doc.data().checkinTime,
            doc.data().snooze
          ]
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')

          return [false, [], null, '', 9]
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      data => dispatch(ActionCreators.getDocumentFulfilled(data)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.getDocumentRejected(error.message)))
}

/**
 * Hide the tip on the user's home screen.
 */
export const hideTip = () => dispatch => {
  dispatch(ActionCreators.hideTipRequested())

  try {
    dispatch(ActionCreators.hideTipFulfilled())
  } catch (error) {
    dispatch(ActionCreators.hideTipRejected(error))
  }
}

/**
 * Initialize the device reducer in the Redux store with the device token.
 * @param {String} deviceToken  A user's device token.
 */

export const initializeStore = (deviceToken) => dispatch => {
  dispatch(ActionCreators.initializeStoreRequested())

  try {
    dispatch(ActionCreators.initializeStoreFulfilled(deviceToken))
  } catch (error) {
    dispatch(ActionCreators.initializeStoreRejected(error))
  }
}

/**
 * Mutate an alert in the alertTimes array if it exists or add it if it does not
 * exist.
 * @param  {String}   id        Unique identifier for input.
 * @param  {String}   time      Time entered into input.
 * @param  {Boolean}  validity  Is the time valid?
 */
export const mutateInput = (id, time, validity) => (dispatch, getState) => {
  const convertTo24Hour = (time) => {
    const getHourString = (time) => {
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

    if (moment().isDST()) {
      return Number(getHourString(time)) - 1
    } else {
      return Number(getHourString(time))
    }
  }

  try {
    if (getState().inputs.alertTimes !== null) {
      dispatch(ActionCreators.mutateInputRequested())

      const hours = time.length > 0
        ? convertTo24Hour(time)
        : 0
      const minutes = time.length > 0 ? time.slice(-5, -3) : 0

      const input = {
        id: id,
        time: (new Date(1970, 0, 1, hours, minutes)).toISOString(),
        validity: validity
      }
      const index = getState().inputs.alertTimes.findIndex(
        input => input.id === id
      )
      let inputsArray = null

      if (index === -1) {
        inputsArray = [
          ...getState().inputs.alertTimes.filter(input => input.id !== id),
          input
        ]
      } else {
        inputsArray = [
          ...getState().inputs.alertTimes.slice(0, index),
          input,
          ...getState().inputs.alertTimes.slice(index + 1)
        ]
      }

      return db().collection('users').doc(getState().auth.user.email).update(
        {
          alertTimes: inputsArray
        }
      )
        .then(
          () => dispatch(ActionCreators.mutateInputFulfilled(inputsArray)),
          error => {
            var errorMessage = new Error(error.message)
            throw errorMessage
          }
        )
        .catch(
          error => dispatch(ActionCreators.mutateInputRejected(error.message))
        )
        .finally(
          () => {
            if (inputsArray.filter(alert => alert.validity).length > 0) {
              dispatch(setTimer())
            }
          }
        )
    } else if (getState().inputs.alertTimes == null) {
      throw new Error('Input array is null or undefined.')
    } else {
      throw new Error(
        'Error encountered in the function, mutateInput, of ActionCreators.js'
      )
    }
  } catch (error) {
    dispatch(ActionCreators.mutateInputRejected(error))
  }
}

/**
 * Register a new account for a user on Firebase.  After that promise is
 * returned, an action for registration-fulfillment is initiated and a request
 * to add a document for that user is initiated.
 * @param  {String}   creds Username and password for the user.
 * @return {Promise}        A promise to create a new user.
 */
export const register = (creds) => (dispatch, getState) => {
  dispatch(ActionCreators.registrationRequested())

  return auth().createUserWithEmailAndPassword(creds.username, creds.password)
    .then(
      userCredential => {
        dispatch(addDocument(userCredential.user.email))
        return userCredential
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      userCredential => {
        dispatch(checkin())
        return userCredential
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      userCredential => dispatch(
        ActionCreators.registrationFulfilled(
          { user: userCredential.user, creds: creds }
        )
      ),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      error => dispatch(ActionCreators.registrationRejected(error.message))
    )
}

/**
 * Remove an input in the inputs array.
 * @param  {String} id  Unique identifier for input.
 */
export const removeInput = (id) => (dispatch, getState) => {
  dispatch(ActionCreators.removeInputsRequested())

  const inputsArray = getState().inputs.alertTimes.filter(
    input => input.id !== id
  )

  return db().collection('users').doc(getState().auth.user.email).update(
    {
      alertTimes: inputsArray
    }
  )
    .then(
      () => dispatch(ActionCreators.removeInputsFulfilled(inputsArray)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      error => dispatch(ActionCreators.removeInputsRejected(error.message))
    )
    .finally(() => { dispatch(setTimer()) })
}

/**
 * Remove an input in the inputs array.
 * @param  {String} id  Unique identifier for input.
 */
export const removeInputs = () => (dispatch, getState) => {
  dispatch(ActionCreators.removeInputsRequested())

  return db().collection('users').doc(getState().auth.user.email).update(
    {
      alertTimes: []
    }
  )
    .then(
      () => dispatch(ActionCreators.removeInputsFulfilled([])),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      error => dispatch(ActionCreators.removeInputsRejected(error.message))
    )
    .finally(() => { dispatch(setTimer()) })
}

/**
 * Remove all listeners added in the addBuddy action from the array of
 * listeners in the Redux store.
 */
export const removeListeners = () => (dispatch, getState) => {
  dispatch(ActionCreators.removeListenersRequested())

  return Promise.all(
    [getState().listener.listeners.forEach(listener => clearTimeout(listener))]
  )
    .then(
      () => dispatch(ActionCreators.removeListenersFulfilled()),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      error => dispatch(ActionCreators.removeListenersRejected(error.message))
    )
}

/**
 * Remove all timers from the array of timers in the Redux store.
 */
export const removeTimers = () => (dispatch, getState) => {
  dispatch(ActionCreators.removeTimersRequested())

  return Promise.all(
    [getState().timer.timers.forEach(timer => clearTimeout(timer))]
  )
    .then(
      () => dispatch(ActionCreators.removeTimersFulfilled()),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      error => dispatch(ActionCreators.removeTimersRejected(error.message))
    )
}

/**
 * Remove all timers from the array of timers in the Redux store.
 */
export const setInputParameters = (height) => dispatch => {
  dispatch(ActionCreators.setInputParametersRequested())

  try {
    dispatch(ActionCreators.setInputParametersFulfilled(height))
  } catch (error) {
    dispatch(ActionCreators.setInputParametersRejected(error))
  }
}

/**
 * Set the last time the buddy should have checked in.
 * @param {String} lastAlertTime  Time buddy should have checked in.
 */
export const setLastAlertTime = (lastAlertTime) => dispatch => {
  dispatch(ActionCreators.setLastAlertTimeRequested())

  try {
    dispatch(ActionCreators.setLastAlertTimeFulfilled(lastAlertTime))
  } catch (error) {
    dispatch(ActionCreators.setLastAlertTimeRejected(error))
  }
}

/**
 * Set a recurring listener that will check if a buddy that the user is
 * following has checked in within the alotted interval plus the snooze or else
 * alert standby that the buddy has not checked in.
 * @param  {String} email   E-mail of the buddy to be added.
 * @param  {Boolean} isTest Whether called by unit test (optional).
 * @return {Promise}        Promise to create listener after interval.
 */
export const setListener = (email, isTest = false) => (dispatch, getState) => {
  const noCheckinAlert = () => {
    Alert.alert(
      'Check-In Alert',
      'Your buddy has not checked in.\nMake contact immediately!',
      [
        {
          text: 'Dismiss',
          onPress: () => {
            console.log('Dismiss Pressed')
            dispatch(removeListeners())
          },
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
  }

  dispatch(ActionCreators.setListenerRequested())

  return Promise.resolve(
    dispatch(getDocument(email))
  )
    .then(
      () => {
        if (getState().buddy.isAdded) {
          return dispatch(
            setListenerInterval(
              getState().buddy.alertTimes,
              getState().buddy.checkinTime
            )
          )
        } else {
          return 60000
        }
      }
    )
    .then(
      interval => {
        // TODO: You will need to remove correct listener when more are added.
        dispatch(removeListeners())
        return interval
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      interval => {
        if (isTest) {
          return interval
        } else {
          if (interval !== null) {
            if (interval > 0) {
              const listener = Promise.resolve(
                setTimeout(
                  () => {
                    dispatch(setListener(email, isTest))
                  },
                  interval
                )
              )
              return listener
            } else {
              noCheckinAlert()
              return null
            }
          } else {
            return null
          }
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      listener => exists(listener)
        ? dispatch(
          ActionCreators.setListenerFulfilled(
            getState().listener.listeners.concat(listener)
          )
        )
        : dispatch(
          ActionCreators.setListenerFulfilled(getState()().listener.listeners)
        ),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.setListenerRejected(error.message)))
}

/**
 * Set the interval for the setListener function.
 * @param   {Array} alertTimes  Array of scheduled alert times.
 * @param   {Date} checkinTime  Last time buddy checked in.
 * @param   {Boolean} isTest    Whether called by unit test (optional).
 * @return  {Integer} The interval between alerts.
 */
export const setListenerInterval = (
  alertTimes,
  checkinTime,
  isTest = false
) => (dispatch, getState) => {
  const now = (new Date()).toISOString()
  const nowInMs = (((((parseInt(now.slice(-13, -11), 10) * 60) +
    parseInt(now.slice(-10, -8), 10)) * 60) +
    parseInt(now.slice(-7, -5), 10)) * 1000) +
    parseInt(now.slice(-4, -1), 10)
  const nowToMidnight = 86400000 - nowInMs

  const alertsInMs = alertTimes.filter(alert => alert.validity).map(
    alert => {
      return {
        timeInMs: ((((((parseInt(alert.time.slice(-13, -11), 10) * 60) +
          parseInt(alert.time.slice(-10, -8), 10)) * 60) +
          parseInt(alert.time.slice(-7, -5), 10)) * 1000) +
          parseInt(alert.time.slice(-4, -1), 10) + nowToMidnight) % 86400000,
        timeInIso: alert.time
      }
    }
  ).sort((el1, el2) => el1.timeInMs - el2.timeInMs)

  dispatch(ActionCreators.setListenerIntervalRequested())

  if (alertsInMs.length !== 0) {
    const checkinInMs = ((((((parseInt(checkinTime.slice(-13, -11), 10) * 60) +
        parseInt(checkinTime.slice(-10, -8), 10)) * 60) +
        parseInt(checkinTime.slice(-7, -5), 10)) * 1000) +
        parseInt(checkinTime.slice(-4, -1), 10) + nowToMidnight) % 86400000
    const snoozeInMs = getState().buddy.snooze * 60000

    const interval = moment(now) - moment(checkinTime) > 86400000 + snoozeInMs
      ? 0
      : moment(now) - moment(checkinTime) > 86400000
        ? (86400000 + snoozeInMs) - (moment(now) - moment(checkinTime))
        : alertsInMs[alertsInMs.length - 1].timeInMs < checkinInMs
          ? alertsInMs[0].timeInMs + snoozeInMs
          : alertsInMs[alertsInMs.length - 1].timeInMs + snoozeInMs > 86400000
            ? alertsInMs[alertsInMs.length - 1].timeInMs + snoozeInMs - 86400000
            : 0

    return Promise.resolve(interval)
      .then(
        result => {
          dispatch(ActionCreators.setListenerIntervalFulfilled(result))
          return result
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .then(
        result => {
          const lastAlertTime = moment(
            alertsInMs[alertsInMs.length - 1].timeInIso
          )

          dispatch(setLastAlertTime(lastAlertTime))
          return result
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch(
        error => dispatch(
          ActionCreators.setListenerIntervalRejected(error.message)
        )
      )
  } else {
    return Promise.resolve(60000)
      .then(
        interval => {
          dispatch(ActionCreators.setListenerIntervalFulfilled(interval))
          return interval
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch(
        error => dispatch(
          ActionCreators.setListenerIntervalRejected(error.message)
        )
      )
  }
}

/**
 * Sets the shortest interval between alerts used to limit snooze.
 * @param {Integer} interval   Shortest interval between alerts.
 */
export const setShortestInterval = (interval) => (dispatch, getState) => {
  dispatch(ActionCreators.setShortestIntervalRequested())

  return db().collection('users').doc(getState().auth.user.email).update(
    { shortestInterval: interval }
  )
    .then(
      () => dispatch(ActionCreators.setShortestIntervalFulfilled(interval)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(
      error => dispatch(
        ActionCreators.setShortestIntervalRejected(error.message)
      )
    )
}

/**
 * Set the user's snooze interval, which indicates the delay between when the
 * user is alerted to check in and when the standby is alerted that the user
 * has failed to check in.
 * @param {Integer} interval  Delay between user and standby alerts.
 */
export const setSnooze = (snooze) => (dispatch, getState) => {
  dispatch(ActionCreators.setSnoozeRequested())

  return db().collection('users').doc(getState().auth.user.email).update(
    { snooze: snooze }
  )
    .then(
      () => dispatch(ActionCreators.setSnoozeFulfilled(snooze)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.setSnoozeRejected(error.message)))
}

/**
 * Set a timer that will issue an alert for the currently authorized user to
 * check-in after an interval of time.
 * @param  {Boolean} isTest     Whether called by unit test (optional).
 * @return {Promise}            Promise to set a timer.
 */
export const setTimer = (isTest = false) => (dispatch, getState) => {
  const checkinAlert = () => {
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
        }
      ],
      { cancelable: false }
    )
  }

  dispatch(ActionCreators.setTimerRequested())

  return Promise.resolve(
    dispatch(
      setTimerInterval(
        getState().inputs.alertTimes,
        getState().user.checkinTime
      )
    )
  )
    .then(
      interval => {
        dispatch(removeTimers())
        return interval
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      interval => {
        if (isTest) {
          return interval
        } else {
          if (interval !== null) {
            if (interval > 0) {
              const timer = Promise.resolve(
                setTimeout(
                  () => {
                    dispatch(setTimer(isTest))
                  },
                  interval
                )
              )
              return timer
            } else {
              checkinAlert()
              return null
            }
          } else {
            return null
          }
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      timer => exists(timer)
        ? dispatch(
          ActionCreators.setTimerFulfilled(
            getState().timer.timers.concat(timer)
          )
        )
        : dispatch(ActionCreators.setTimerFulfilled(getState().timer.timers)),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.setTimerRejected(error.message)))
}

/**
 * Set the interval for the setTimer function.
 * @param   {Array} alertTimes  Array of scheduled alert times.
 * @param   {Date} checkinTime  Last time user checked in.
 * @param   {Array} now         Now as a JS Date object.
 * @param   {Boolean} isTest    Whether called by unit test (optional).
 * @return  {Integer}           Interval to wait before check-in alert.
 */
export const setTimerInterval = (
  alertTimes,
  checkinTime,
  isTest = false
) => (dispatch, getState) => {
  const now = (new Date()).toISOString()
  const nowInMs = (((((parseInt(now.slice(-13, -11), 10) * 60) +
    parseInt(now.slice(-10, -8), 10)) * 60) +
    parseInt(now.slice(-7, -5), 10)) * 1000) +
    parseInt(now.slice(-4, -1), 10)
  const nowToMidnight = 86400000 - nowInMs

  const alertsInMs = alertTimes.filter(alert => alert.validity).map(
    alert => {
      return {
        timeInMs: ((((((parseInt(alert.time.slice(-13, -11), 10) * 60) +
          parseInt(alert.time.slice(-10, -8), 10)) * 60) +
          parseInt(alert.time.slice(-7, -5), 10)) * 1000) +
          parseInt(alert.time.slice(-4, -1), 10) + nowToMidnight) % 86400000,
        timeInIso: alert.time
      }
    }
  ).sort((el1, el2) => el1.timeInMs - el2.timeInMs)

  if (alertsInMs.length !== 0) {
    const checkinInMs = ((((((parseInt(checkinTime.slice(-13, -11), 10) * 60) +
        parseInt(checkinTime.slice(-10, -8), 10)) * 60) +
        parseInt(checkinTime.slice(-7, -5), 10)) * 1000) +
        parseInt(checkinTime.slice(-4, -1), 10) + nowToMidnight) % 86400000

    dispatch(ActionCreators.setTimerIntervalRequested())

    const interval = moment(now) - moment(checkinTime) > 86400000
      ? 0
      : alertsInMs[alertsInMs.length - 1].timeInMs < checkinInMs
        ? alertsInMs[0].timeInMs
        : 0

    return Promise.resolve(interval)
      .then(
        result => {
          dispatch(ActionCreators.setTimerIntervalFulfilled(result))
          return result
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .then(
        result => {
          if (!isTest) {
            updateCheckinInterval(result)
          }

          return result
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch(
        error => dispatch(
          ActionCreators.setTimerIntervalRejected(error.message)
        )
      )
  } else {
    return Promise.resolve(60000)
      .catch(
        error => dispatch(
          ActionCreators.setTimerIntervalRejected(error.message)
        )
      )
  }
}

/**
 * Sign in a user on Firebase.  After that promise is returned, an action for
 * sign-in-fulfillment is initiated and a request to add a document for that
 * user in initiated.
 * @param  {String}   creds Username and password for the user.
 * @return {Promise}        A promise to sign-in a user.
 */
export const signIn = (creds, isAutomatic = false) => (dispatch, getState) => {
  dispatch(ActionCreators.signinRequested(creds))

  return auth().signInWithEmailAndPassword(creds.username, creds.password)
    .then(
      userCredential => {
        dispatch(addDocument(userCredential.user.email))
        return userCredential
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      userCredential => {
        if (isAutomatic) {
          dispatch(checkin())
          return userCredential
        } else {
          return userCredential
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      userCredential => dispatch(
        ActionCreators.signinFulfilled(
          { user: userCredential.user, creds: creds }
        )
      ),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => dispatch(ActionCreators.signinRejected(error.message)))
}

// TODO: Change this to a "remove data" capability in a settings screen.
/**
 * Sign out user on Firebase, which first removes that user's document on
 * Firebase.  After those promises are returned, an action for sign-out-
 * fulfillment is initiated, a request to remove timers is initiated.
 * @return {Promise}  A promise to sign-out a user.
 */
export const signOut = () => (dispatch, getState) => {
  dispatch(ActionCreators.signoutRequested())

  return auth().signOut()
    .then(
      () => dispatch(removeTimers()),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => dispatch(removeListeners()),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .then(
      () => dispatch(ActionCreators.signoutFulfilled()),
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => { dispatch(ActionCreators.signoutRejected(error.message)) })
}

/**
 * Updates the check-in interval on the Firestore for the currently-authorized
 * user.
 * @param {Integer} interval  Milliseconds until next check-in.
 * @return {Promise}  A promise to update the check-in interval.
 */
export const updateCheckinInterval = (interval) => (getState) => {
  return db().collection('users').doc(getState().auth.user.email).update(
    {
      checkinInterval: interval
    }
  )
    .catch(
      error => console.log(error)
    )
}
