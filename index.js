const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const config = require('./config');
app.set('jwt-secret', config.secret);
app.use(cors());
const authMiddleware = require('./middlewares/auth')
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const router = require('express').Router();
const  {getAllScreams } = require ("./handlers/topics");
const  {login,check} = require ("./handlers/auth");
const  { visit} = require ("./handlers/covid19");
app.get('/topics', getAllScreams);
app.get('/login', login);
app.get('/visit', visit);
app.use('/check',authMiddleware);
app.get('/check', check);

exports.api = functions.region('us-central1').https.onRequest(app);
