const admin = require('firebase-admin')
const functions = require('firebase-functions')
const moment = require('moment')

admin.initializeApp(functions.config().firebase)

exports.checkCheckins = functions.pubsub.schedule(
  'every 1 minutes'
).onRun(
  context => {
    console.log('This will be run every minute!')

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

              const tokens = []
              registrationTokens.forEach(
                token => {
                  console.log('Array contains ' + token)
                  if (token !== null) {
                    tokens.push(token)
                  }
                }
              )

              if (tokens.length > 0) {
                const message = {
                  tokens: tokens,
                  notification: {
                    title: 'Check In?',
                    body: 'Your buddy will be alerted if not.'
                  }
                }

                // Send a message to the device corresponding to the provided
                // token.
                return admin.messaging().sendMulticast(message)
              } else {
                return null
              }
            } else {
              throw new Error('The registration-token array was undefined.')
            }
          }
        )
      .then(
        response => {
          if (typeof response !== 'undefined') {
            // Response is a message ID string.
            if (response !== null) {
              console.log(
                response.successCount + ' messages were sent successfully.'
              )
            } else {
              console.log(
                'The checkCheckins function completed successfully.'
              )
            }

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
  const alertMinutes = alertTimes.filter(alert => alert.validity).map(
    alert => (((((parseInt(alert.time.slice(-13, -11), 10) * 60) +
      parseInt(alert.time.slice(-10, -8), 10)) * 60) +
      parseInt(alert.time.slice(-7, -5), 10)) * 1000) +
      parseInt(alert.time.slice(-4, -1), 10)
  )

  if (alertMinutes.length !== 0) {
    const now = (new Date()).toISOString()
    const checkinMinutes = (((((parseInt(checkinTime.slice(-13, -11), 10) * 60) +
        parseInt(checkinTime.slice(-10, -8), 10)) * 60) +
        parseInt(checkinTime.slice(-7, -5), 10)) * 1000) +
        parseInt(checkinTime.slice(-4, -1), 10)
    const nowMinutes = (((((parseInt(now.slice(-13, -11), 10) * 60) +
        parseInt(now.slice(-10, -8), 10)) * 60) +
        parseInt(now.slice(-7, -5), 10)) * 1000) +
        parseInt(now.slice(-4, -1), 10)

    return Promise.resolve(
      findClosestCheckinTimes(alertMinutes, checkinMinutes, nowMinutes)
    )
      .then(
        alertTime => {
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
  } else {
    return Promise.resolve()
      .then(
        () => {
          return 1
        },
        error => {
          var errorMessage = new Error(error.message)
          throw errorMessage
        }
      )
      .catch(error => {console.log('INTERVAL CALCULATION ERROR: ', error)})
  }
}

/**
 * Find the check-in times immediately before and after the last check-in and
 * immediately before and after now.
 * @param  {Array} alertMinutes     Array of minutes since 1970 to check in.
 * @param  {Integer} checkinMinutes Minutes from midnight to last check-in.
 * @param  {Integer} nowMinutes     Minutes from midnight to now.
 * @return {Promise}                Times before and after check-in and now.
 */
const findClosestCheckinTimes = (alertMinutes, checkinMinutes, nowMinutes) => {
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

          if (timeBeforeCheckin === null || timeBeforeCheckin === undefined) {
            timeBeforeCheckin = result.array[result.array.length - 1]
            timeAfterCheckin = result.array[0]
          }

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
