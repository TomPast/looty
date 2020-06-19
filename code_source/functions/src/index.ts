import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import increment = firebase.database.ServerValue.increment;

const onNewPlayer = require('./onNewPlayer');
const onFinTour = require('./onFinTour');
const onUpdateCartes = require('./onUpdateCartes');
const onNewManche = require('./onNewManche');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.onNewPlayer = onNewPlayer.onNewPlayer;
exports.onFinTour = onFinTour.onFinTour;
exports.onUpdateCartes = onUpdateCartes.onUpdateCartes;
exports.onNewManche = onNewManche.onNewManche;

