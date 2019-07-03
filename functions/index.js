const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest(
  (request, response) => {
    console.log("Hello!");
    response.send("Hello from Cryonics Check-In!");
  }
);
