const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest(
//   (request, response) => {
//     console.log('Hello from Firebase!')
//     response.send('Hello from Firebase!')
//   }
// )

// TODO: Set up a scheduled function, following the guide at the following URL:
// https://firebase.google.com/docs/functions/schedule-functions
exports.scheduledFunction = functions.pubsub.schedule(
  // 'every 5 minutes'
  'every 1 minutes'
).onRun(
  context => {
    console.log('This will be run every 5 minutes!')

    return admin.firestore().collection('checkin').doc('user').get()
      .then(
        doc => {
          if (typeof doc !== "undefined") {
            // Response is a message ID string.
            console.log('Successfully retrieved document.')

            const registrationToken = doc.data()['a@a.aa'].registrationToken
            const message = {
              token: registrationToken,
              notification: {
                title: "Test",
                body: "Successfully retrieved document."
              }
            }

            // Send a message to the device corresponding to the provided token.
            return admin.messaging().send(message)
          } else {
            throw new Error(registrationToken)
          }
        }
      )
      .then(
        response => {
          if (typeof response !== "undefined") {
            // Response is a message ID string.
            console.log('Successfully sent message.')
            return null
          } else {
            throw new Error(registrationToken)
          }
        }
      )
      .catch(error => {console.log('Error sending message: ', error)})
  }
)

// TODO: What you really need is a notification to be sent when the document
// does not change.
exports.pushNotification = functions.firestore.document('checkin/user').onWrite(
  (change, context) => {
    console.log('The Firebase Firestore user document has changed.')
    const before = change.before.data()
    const after = change.after.data()
    console.log(before)
    console.log(before['a@a.aa'])
    console.log(after)
    console.log(after['a@a.aa'])

    // TODO: Compare the before and after data to see which field changed.

    const registrationToken = after['a@a.aa'].registrationToken
    const message = {
      token: registrationToken,
      notification: {
        title: "Test",
        body: "This is a test."
      }
    }
    console.log(registrationToken)

    // Send a message to the device corresponding to the provided token.
    return admin.messaging().send(message)
      .then(
        response => {
          if (typeof response !== "undefined") {
            // Response is a message ID string.
            console.log('Successfully sent message.')
            return null
          } else {
            throw new Error(registrationToken)
          }
        }
      )
      .catch(error => {console.log('Error sending message: ', error)})
  }
)

/**
 * Set a timer that will issue an alert for the currently authorized patient to
 * check-in after an interval of time.
 * @param  {Boolean} isTest     Whether called by unit test (optional).
 * @return {Promise}            Promise to set a timer.
 */
// setTimer = (isTest = false) => (dispatch, getState) => {
//   const checkinAlert = () => {
//     Alert.alert(
//       'Check In?',
//       'Your buddy will be alerted if not.',
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             console.log('OK Pressed')
//             dispatch(removeTimers())
//             dispatch(checkin())
//           }
//         },
//         {
//           text: 'Cancel',
//           onPress: () => {
//             console.log('Cancel Pressed')
//             dispatch(removeTimers())
//           },
//           style: 'cancel'
//         }
//       ],
//       { cancelable: false }
//     )
//   }
//
//   dispatch(setTimerRequestedAction())
//
//   return Promise.resolve(
//     dispatch(
//       setTimerInterval(
//         // TODO: Should these parameters be fetched from Firestore?
//         getState().inputs.array,
//         getState().patient.checkinTime,
//         (new Date()).toISOString()
//       )
//     )
//   )
//     .then(
//       interval => {
//         dispatch(removeTimers())
//         return interval
//       },
//       error => {
//         var errorMessage = new Error(error.message)
//         throw errorMessage
//       }
//     )
//     .then(
//       interval => {
//         console.log('TIMEOUT SHOULD SET TO: ' + interval)
//
//         if (isTest) {
//           return interval
//         } else {
//           if (interval > 0) {
//             const timer = Promise.resolve(
//               setTimeout(
//                 () => {
//                   dispatch(setTimer(isTest))
//                 },
//                 interval
//               )
//             )
//             return timer
//           } else {
//             checkinAlert()
//             return null
//           }
//         }
//       },
//       error => {
//         var errorMessage = new Error(error.message)
//         throw errorMessage
//       }
//     )
//     .then(
//       timer => {
//         console.log('TIMER ID: ' + timer)
//         dispatch(setTimerFulfilledAction(timer))
//         return null
//       },
//       error => {
//         var errorMessage = new Error(error.message)
//         throw errorMessage
//       }
//     )
//     .catch(error => dispatch(setTimerRejectedAction(error.message)))
// }
