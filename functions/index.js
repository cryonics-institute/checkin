const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest(
  (request, response) => {
    console.log('Hello from Firebase!');
    response.send('Hello from Firebase!');
  }
);

exports.pushNotification = functions.firestore.document('checkin/user').onWrite(
  (change, context) => {
    console.log('The Firebase Firestore user document has changed.');
    const before = change.before.data();
    const after = change.after.data();
    console.log(before);
    console.log(before['a@a.aa']);

    const registrationToken = after['a@a.aa'].registrationToken
    const message = {
      token: registrationToken,
      notification: {
        title: "Test",
        body: "This is a test."
      }
    };
    console.log(registrationToken);

    // Send a message to the device corresponding to the provided token.
    return admin.messaging().send(message)
      .then(
        (response) => {
          if (typeof response !== "undefined") {
            // Response is a message ID string.
            console.log('Successfully sent message.');
            return null;
          } else {
            throw new Error(registrationToken);
          }
        }
      )
      .catch(error => {console.log('Error sending message: ', error);});
  }
);
