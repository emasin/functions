const functions = require('firebase-functions');
const express = require('express');
const app = require('express')();
const cors = require('cors');
const config = require('./config');
//const bodyParser = require('body-parser');

app.set('jwt-secret', config.secret);
app.use(cors());
const authMiddleware = require('./middlewares/auth')
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//const router = require('express').Router();
const  {getAllScreams,getHistory } = require ("./handlers/topics");
const  {login,check} = require ("./handlers/auth");
const  { visit} = require ("./handlers/covid19");
app.options('/write', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send();
});

//app.use(express.json());

app.post('/login', login);
app.get('/topics', getAllScreams);
app.get('/my/history', getHistory);

app.get('/visit', visit);
app.use('/check',authMiddleware);
app.get('/check', check);

exports.api = functions.region('us-central1').https.onRequest(app);
