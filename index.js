const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');


app.use(cors());
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const  {topic,getAllScreams} = require ("./handlers/topics");
app.get('/topics', getAllScreams);
exports.api = functions.region('us-central1').https.onRequest(app);
