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
const nodemailer = require('nodemailer')

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

          let deviceTokens = new Set()

          querySnapshot.forEach(
            doc => {
              // doc.data() is never undefined for query doc snapshots
              if (typeof doc.data().wasCheckedForAlerts === 'undefined') {
                deviceTokens.add(
                  getDeviceTokensIfNotCheckedIn(doc.data())
                )

                admin.firestore().collection('users').doc(doc.id).set(
                  { wasCheckedForAlerts: true },
                  { merge: true }
                )
              } else if (!doc.data().wasCheckedForAlerts) {
                deviceTokens.add(
                  getDeviceTokensIfNotCheckedIn(doc.data())
                )

                admin.firestore().collection('users').doc(doc.id).update(
                  { wasCheckedForAlerts: true }
                )
              }
            }
          )

          return Promise.all(deviceTokens)

        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .then(
        deviceTokens => {
          console.log('Successfully retrieved device tokens.')

          const patientTokens = []
          const standbyTokens = []
          deviceTokens.forEach(
            tokenSet => {
              if (tokenSet.forPatient !== null) {
                tokenSet.forPatient.forEach(
                  patientToken => {
                    if (!patientTokens.includes(patientToken)) {
                      console.log('Patient array contains ' + patientToken)
                      patientTokens.push(patientToken)
                    }
                  }
                )
              }
              if (tokenSet.forStandbys !== null) {
                tokenSet.forStandbys.forEach(
                  standbyToken => {
                    if (!standbyTokens.includes(standbyToken)) {
                      console.log('Standby array contains ' + standbyToken)
                      standbyTokens.push(standbyToken)
                    }
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
        deviceTokens => {
          console.log('Successfully transformed device tokens.')

          let patientMessage = null
          if (deviceTokens[0].length > 0) {
            patientMessage = {
              tokens: deviceTokens[0],
              notification: {
                title: 'Check In?',
                body: 'Your buddy will be alerted if not.'
              }
            }
          }

          let standbyMessage = null
          if (deviceTokens[1].length > 0) {
            standbyMessage = {
              tokens: deviceTokens[1],
              notification: {
                title: 'Check-In Alert',
                body: 'Your buddy has not checked in.  Please make contact.'
              }
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
          console.log('Successfully created messages.')

          // Send a message to the device corresponding to the provided token.
          return Promise.all(
            [
              messages.forPatients !== null
                ? admin.messaging().sendMulticast(messages.forPatients)
                : null,
              messages.forStandbys !== null
                ? admin.messaging().sendMulticast(messages.forStandbys)
                : null
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
      // TODO: Adapt the following code to send e-mail alerts using SendGrid.
      // You will need to decide who adds e-mails - patient, standbys, or both -
      // and add a field to the Firestore that includes those e-mails and a
      // toggle so that the recipients are only alerted once.
      // .then(
      //   () => {
      //     // create reusable transporter object using the default SMTP transport
      //     const transporter = nodemailer.createTransport(
      //       {
      //         host: 'smtp.sendgrid.net',
      //         port: 465,
      //         secure: true, // true for 465, false for other ports
      //         auth: {
      //           user: 'apikey',
      //           pass: '' // TODO: Find a way to conceal password.
      //         }
      //       }
      //     )
      //
      //     // send mail with defined transport object
      //     return transporter.sendMail(
      //       {
      //         from: 'foo@example.com', // sender address
      //         to: 'michaelgill1969@gmail.com', // list of receivers
      //         subject: "Nodemailer Test", // Subject line
      //         text: "Hello world?", // plain text body
      //         html: "<b>Hello world?</b>" // html body
      //       }
      //     )
      //   }
      // )
      // .then(
      //   info => {
      //     console.log("Message sent: %s", info.messageId)
      //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      //
      //     // Preview only available when sending through an Ethereal account
      //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      //     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      //
      //     return null
      //   }
      // )
      .catch(error => {console.log('NOTIFICATION ERROR: ', error)})
  }
)

/**
 * Set a timer that will issue an alert for the currently authorized patient to
 * check-in after an interval of time.
 * @param  {Object} data  Data from patient document.
 * @return {Promise}      Object containing arrays of device tokens.
 */
const getDeviceTokensIfNotCheckedIn = data => {
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
          if (
            typeof data.subscribers !== 'undefined' && data.subscribers !== null
          ) {
            return {
              forPatient: data.deviceTokens,
              forStandbys: [].concat.apply([], Object.values(data.subscribers))
            }
          } else {
            return {
              forPatient: data.deviceTokens,
              forStandbys: null
            }
          }
        } else if (alert.shouldFire.forPatient) {
          return {
            forPatient: data.deviceTokens,
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
 * Get the interval for the getDeviceTokensIfNotCheckedIn function.
 * @param   {Array} alertTimes  Array of scheduled alert times.
 * @param   {Date} checkinTime  Last time patient checked in.
 * @param   {Integer} snooze    Interval to wait before firing standby alert.
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
      return ((((((parseInt(alert.time.slice(-13, -11), 10) * 60) +
        parseInt(alert.time.slice(-10, -8), 10)) * 60) +
        parseInt(alert.time.slice(-7, -5), 10)) * 1000) +
        parseInt(alert.time.slice(-4, -1), 10) + nowToMidnight) % 86400000
    }
  ).sort((el1, el2) => el1 - el2)

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
        : alertsInMs[alertsInMs.length - 1] < checkinInMs
          ? { shouldFire: { forPatient: false, forStandby: false } }
          : 86400000 < alertsInMs[alertsInMs.length - 1] + snoozeInMs
            ? { shouldFire: { forPatient: true, forStandby: false } }
            : { shouldFire: { forPatient: true, forStandby: true } }

    return Promise.resolve(alert)
      .catch(error => {console.log('INTERVAL CALCULATION ERROR: ', error)})
  } else {
    const alert = { shouldFire: { forPatient: false, forStandby: false } }
    return Promise.resolve(alert)
      .catch(error => {console.log('INTERVAL CALCULATION ERROR: ', error)})
  }
}
