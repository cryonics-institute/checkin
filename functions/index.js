// TODO: NOTIFICATION ERROR:  Error: tokens must be a non-empty array
/**
 * Firebase Cloud Functions for the project, Cryonics Check-In.
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

const admin = require('firebase-admin')
const functions = require('firebase-functions')
const moment = require('moment')

admin.initializeApp(functions.config().firebase)

/**
 * Checks user documents in the Firestore for whether and/or which devices
 * should receive push notifications alerting the user to check in.
 */
exports.checkCheckins = functions.pubsub.schedule(
  'every 1 minutes'
).onRun(
  context => {
    console.log('This will be run every minute!')

    return admin.firestore().collection('users').get()
      .then(
        querySnapshot => {
          console.log('Successfully retrieved document.')

          const registrationTokens = []

          querySnapshot.forEach(
            doc => {
              // doc.data() is never undefined for query doc snapshots
              registrationTokens.push(
                getRegistrationTokenIfNotCheckedIn(doc.data())
              )
            }
          )

          return Promise.all(registrationTokens)

        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .then(
        registrationTokens => {
          const patientTokens = []
          const standbyTokens = []
          registrationTokens.forEach(
            token => {
              if (token.forPatient !== null) {
                console.log('Array contains ' + token.forPatient)
                patientTokens.push(token.forPatient)
              }
              if (token.forStandbys !== null) {
                token.forStandbys.forEach(
                  standbyToken => {
                    console.log('Array contains ' + standbyToken)
                    standbyTokens.push(standbyToken)
                  }
                )
              }
            }
          )

          return Promise.all(
            [Promise.all(patientTokens), Promise.all(standbyTokens)]
          )
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .then(
        registrationTokens => {
          const patientMessage = {
            tokens: registrationTokens[0],
            notification: {
              title: 'Check In?',
              body: 'Your buddy will be alerted if not.'
            }
          }

          const standbyMessage = {
            tokens: registrationTokens[1],
            notification: {
              title: 'Check-In Alert',
              body: 'Your buddy has not checked in.  Please make contact.'
            }
          }

          return {
            forPatients: patientMessage,
            forStandbys: standbyMessage
          }
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .then(
        messages => {
          // Send a message to the device corresponding to the provided token.
          return Promise.all(
            [
              admin.messaging().sendMulticast(messages.forPatients),
              admin.messaging().sendMulticast(messages.forStandbys)
            ]
          )
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .then(
        responses => {
          // Response is a message ID string.
          if (responses[0] !== null) {
            console.log(
              responses[0].successCount +
              ' messages were sent successfully to patients.'
            )
          } else {
            console.log(
              'The checkCheckins function completed successfully.'
            )
          }

          if (responses[1] !== null) {
            console.log(
              responses[1].successCount +
              ' messages were sent successfully to standbys.'
            )
          } else {
            console.log(
              'The checkCheckins function completed successfully.'
            )
          }

          return null
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch(error => {console.log('NOTIFICATION ERROR: ', error)})
  }
)

/**
 * Set a timer that will issue an alert for the currently authorized patient to
 * check-in after an interval of time.
 * @param  {Boolean} isTest     Whether called by unit test (optional).
 * @return {Promise}            Promise to set a timer.
 */
const getRegistrationTokenIfNotCheckedIn = data => {
  return Promise.resolve(
    getAlert(
      data.alertTimes,
      data.checkinTime,
      data.snooze
    )
  )
    .then(
      alert => {
        if (alert.shouldFire.forPatient && alert.shouldFire.forStandby) {
          return {
            forPatient: data.registrationToken,
            forStandbys: data.subscribers.map(
              subscriber => subscriber.registrationTokens
            ).reduce((acc, val) => acc.concat(val), [])
          }
        } else if (alert.shouldFire.forPatient) {
          return {
            forPatient: data.registrationToken,
            forStandbys: null
          }
        } else {
          return {
            forPatient: null,
            forStandbys: null
          }
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => {console.log('NOTIFICATION ERROR: ', error)})
}

/**
 * Get the interval for the getRegistrationTokenIfNotCheckedIn function.
 * @param   {Array} alertTimes  Array of scheduled alert times.
 * @param   {Date} checkinTime  Last time patient checked in.\
 * @return  {Integer}           Interval to wait before check-in alert.
 */
const getAlert = (alertTimes, checkinTime, snooze) => {
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
    const snoozeInMs = snooze * 60000

    const alert = moment(now) - moment(checkinTime) > 86400000 + snoozeInMs
      ? { shouldFire: { forPatient: true, forStandby: true } }
      : moment(now) - moment(checkinTime) > 86400000
        ? { shouldFire: { forPatient: true, forStandby: false } }
        : alertsInMs[alertsInMs.length - 1].timeInMs + snoozeInMs > checkinInMs
            ? { shouldFire: { forPatient: true, forStandby: true } }
            : alertsInMs[alertsInMs.length - 1].timeInMs > checkinInMs
              ? { shouldFire: { forPatient: true, forStandby: false } }
              : { shouldFire: { forPatient: false, forStandby: false } }

    return Promise.resolve(alert)
      .catch(error => {console.log('INTERVAL CALCULATION ERROR: ', error)})
  } else {
    const alert = { shouldFire: { forPatient: false, forStandby: false } }
    return Promise.resolve(alert)
      .catch(error => {console.log('INTERVAL CALCULATION ERROR: ', error)})
  }
}
