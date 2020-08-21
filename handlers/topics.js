const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();



exports.getAllScreams = (req, res) => {
    db.collection('topics')
        .orderBy('course_count', 'desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    id : doc.id,
                    desc: doc.data().desc,
                    title : doc.data().title,
                    imgUrl : doc.data().img_url,
                    level : doc.data().level,
                    courseCount : doc.data().course_count,
                    who: doc.data().who

                });
            });
            return res.json(screams);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

exports.topics = functions.https.onRequest((request, response) => {
    db.collection('video')
        .orderBy('likeCount', 'desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    vid: doc.data().vid,
                    title : doc.data().title,
                    tags : doc.data().tags,
                    likeCount: doc.data().likeCount

                });
            });
            return response.json(screams);
        })
        .catch((err) => {
            console.error(err);
            response.status(500).json({ error: err.code });
        });
});



exports.login = (req, res) => {
    return res.json({"isLogin":true})
};