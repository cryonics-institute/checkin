// TODO: In master branch, add registration token to each document when created.

const admin = require('firebase-admin')
const functions = require('firebase-functions')
const moment = require('moment')

admin.initializeApp(functions.config().firebase)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest(
//   (request, response) => {
//     console.log('Hello from Firebase!')
//     response.send('Hello from Firebase!')
//   }
// )

exports.checkCheckins = functions.pubsub.schedule(
  // 'every 5 minutes'
  'every 1 minutes'
).onRun(
  context => {
    console.log('This will be run every 5 minutes!')

    return admin.firestore().collection('users').get()
      .then(
        querySnapshot => {
          if (typeof querySnapshot !== 'undefined') {
            console.log('Successfully retrieved document.')

            const registrationTokens = []

            querySnapshot.forEach(
              doc => {
                // doc.data() is never undefined for query doc snapshots
                const registrationToken = getRegistrationTokenIfNotCheckedIn(
                  doc.data()
                )
                if (registrationToken !== null) {
                  registrationTokens.push(registrationToken)
                }
              }
            )

            return Promise.all(registrationTokens)
          } else {
            throw new Error('The Firestore document was not retrieved.')
          }
        }
      )
        .then(
          registrationTokens => {
            if (typeof registrationTokens !== 'undefined') {
              console.log('LENGTH: ' + registrationTokens.length)
              registrationTokens.forEach(
                token => console.log('Array contains ' + token)
              )

              const message = {
                tokens: registrationTokens,
                notification: {
                  title: 'Check In?',
                  body: 'Your buddy will be alerted if not.'
                }
              }

              // Send a message to the device corresponding to the provided
              // token.
              // return admin.messaging().sendMulticast(message)
              return null
            } else {
              throw new Error('The registration-token array was undefined.')
            }
          }
        )
      .then(
        response => {
          if (typeof response !== 'undefined') {
            // Response is a message ID string.
            console.log(
              // response.successCount + ' messages were sent successfully.'
              'The checkCheckins function completed successfully.'
            )
            return null
          } else {
            throw new Error('The multicast-messaging response was undefined.')
          }
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
    getInterval(
      data.alertTimes,
      data.checkinTime
    )
  )
    .then(
      interval => {
        if (interval > 0) {
          // wait until next check
          return null
        } else {
          // return the registrationToken to be added to the array
          return data.registrationToken
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
const getInterval = (alertTimes, checkinTime) => {
  const now = (new Date()).toISOString()
  const checkinMinutes = (((((parseInt(checkinTime.slice(-13, -11), 10) * 60) +
      parseInt(checkinTime.slice(-10, -8), 10)) * 60) +
      parseInt(checkinTime.slice(-7, -5), 10)) * 1000) +
      parseInt(checkinTime.slice(-4, -1), 10)
  const nowMinutes = (((((parseInt(now.slice(-13, -11), 10) * 60) +
      parseInt(now.slice(-10, -8), 10)) * 60) +
      parseInt(now.slice(-7, -5), 10)) * 1000) +
      parseInt(now.slice(-4, -1), 10)

  // console.log('LAST CHECK-IN: ' + checkinTime)
  // console.log('NOW: ' + now)
  // console.log('CHECKIN MINUTES: ' + checkinMinutes)
  // console.log('NOW MINUTES: ' + nowMinutes)

  return Promise.resolve(
    findClosestCheckinTimes(alertTimes, checkinMinutes, nowMinutes)
  )
    .then(
      alertTime => {
        // console.log('CHECKIN MINUTES: ' + checkinMinutes)
        // console.log('NOW MINUTES: ' + nowMinutes)
        // console.log('TIME BEFORE NOW: ' + alertTime.beforeNow)
        // console.log('TIME AFTER NOW: ' + alertTime.afterNow)
        // console.log('TIME BEFORE CHECKIN: ' + alertTime.beforeCheckin)
        // console.log('TIME AFTER CHECKIN: ' + alertTime.afterCheckin)
        // console.log(alertTime.beforeNow === alertTime.beforeCheckin)
        // console.log(alertTime.afterNow === alertTime.afterCheckin)

        if ((moment(now) - moment(checkinTime)) > 86400000) {
          return 0
        } else if (alertTime.beforeCheckin === alertTime.afterCheckin) {
          if (nowMinutes > checkinMinutes) {
            if (alertTime.afterCheckin > nowMinutes) {
              const interval = (alertTime.afterCheckin - nowMinutes)
              return interval
            } else if (alertTime.afterCheckin > checkinMinutes) {
              return 0
            } else {
              const interval = (
                (alertTime.afterCheckin - nowMinutes)
              ) + 86400000
              return interval
            }
          } else {
            if (alertTime.afterCheckin > checkinMinutes) {
              return 0
            } else if (alertTime.afterCheckin > nowMinutes) {
              const interval = (alertTime.afterCheckin - nowMinutes)
              return interval
            } else {
              const interval = (
                (alertTime.afterCheckin - nowMinutes)
              ) + 86400000
              return interval
            }
          }
        } else if (alertTime.beforeCheckin < alertTime.afterCheckin) {
          if (
            alertTime.beforeCheckin === alertTime.beforeNow &&
            alertTime.afterCheckin === alertTime.afterNow
          ) {
            const interval = (alertTime.afterCheckin - nowMinutes)
            return interval
          } else {
            return 0
          }
        } else {
          if (
            alertTime.beforeCheckin === alertTime.beforeNow &&
            alertTime.afterCheckin === alertTime.afterNow
          ) {
            if (alertTime.afterCheckin > nowMinutes) {
              const interval = (alertTime.afterCheckin - nowMinutes)
              return interval
            } else {
              const interval = (
                (alertTime.afterCheckin - nowMinutes)
              ) + 86400000
              return interval
            }
          } else {
            return 0
          }
        }
      },
      error => {
        var errorMessage = new Error(error.message)
        throw errorMessage
      }
    )
    .catch(error => {console.log('INTERVAL CALCULATION ERROR: ', error)})
}

/**
 * Find the check-in times immediately before and after the last check-in and
 * immediately before and after now.
 * @param  {Array} alertTimes       Array of times to check in.
 * @param  {Integer} checkinMinutes Minutes from midnight to last check-in.
 * @param  {Integer} nowMinutes     Minutes from midnight to now.
 * @return {Promise}                Times before and after check-in and now.
 */
const findClosestCheckinTimes = (alertTimes, checkinMinutes, nowMinutes) => {

  const alertMinutes = alertTimes.filter(alert => alert.validity).map(
    alert => (((((parseInt(alert.time.slice(-13, -11), 10) * 60) +
      parseInt(alert.time.slice(-10, -8), 10)) * 60) +
      parseInt(alert.time.slice(-7, -5), 10)) * 1000) +
      parseInt(alert.time.slice(-4, -1), 10)
  )
  // console.log('ALERT MINUTES LENGTH: ' + alertMinutes.length)
  // console.log('ALERT MINUTES ZERO: ' + alertMinutes[0])

  if (alertMinutes.length === 1) {
    return Promise.resolve(
      {
        beforeNow: alertMinutes[0],
        afterNow: alertMinutes[0],
        beforeCheckin: alertMinutes[0],
        afterCheckin: alertMinutes[0]
      }
    )
      .then(
        alertTime => {
          return alertTime
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch(error => {console.log('FIND CLOSEST TIMES ERROR: ', error)})
  } else {
    return Promise.resolve(
      {
        array: alertMinutes.sort((el1, el2) => el1 - el2),
        checkinMinutes: checkinMinutes,
        nowMinutes: nowMinutes
      }
    )
      .then(
        result => {
          // result.array.forEach(element => console.log('TIME: ' + element))

          let timeBeforeNow = null
          let timeAfterNow = null
          let timeBeforeCheckin = null
          let timeAfterCheckin = null

          let i = 0
          while (timeBeforeNow === null && i < result.array.length) {
            if (result.nowMinutes < result.array[i]) {
              timeBeforeNow = result.array[i - 1]
              timeAfterNow = result.array[i]
            }
            i += 1
          }

          // console.log('timeBeforeNow: ' + timeBeforeNow)
          if (timeBeforeNow === null || timeBeforeNow === undefined) {
            timeBeforeNow = result.array[result.array.length - 1]
            timeAfterNow = result.array[0]
          }

          let j = 0
          while (timeBeforeCheckin === null && j < result.array.length) {
            if (result.checkinMinutes < result.array[j]) {
              timeBeforeCheckin = result.array[j - 1]
              timeAfterCheckin = result.array[j]
            }
            j += 1
          }

          // console.log('timeBeforeCheckin: ' + timeBeforeCheckin)
          if (timeBeforeCheckin === null || timeBeforeCheckin === undefined) {
            timeBeforeCheckin = result.array[result.array.length - 1]
            timeAfterCheckin = result.array[0]
          }

          // console.log('CHECKIN MINUTES: ' + result.checkinMinutes)
          // console.log('NOW MINUTES: ' + result.nowMinutes)
          // console.log('TIME BEFORE NOW: ' + timeBeforeNow)
          // console.log('TIME AFTER NOW: ' + timeAfterNow)
          // console.log('TIME BEFORE CHECKIN: ' + timeBeforeCheckin)
          // console.log('TIME AFTER CHECKIN: ' + timeAfterCheckin)

          return {
            beforeNow: timeBeforeNow,
            afterNow: timeAfterNow,
            beforeCheckin: timeBeforeCheckin,
            afterCheckin: timeAfterCheckin
          }
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch(error => {console.log('FIND CLOSEST TIMES ERROR: ', error)})
  }
}
