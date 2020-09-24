const functions = require('firebase-functions');
const admin = require('firebase-admin');

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

exports.getHistory = (req, res) => {
    db.collection('history')
        .orderBy('history_dt', 'desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    id : doc.id,
                    type: doc.data().type,
                    title : doc.data().title,
                    link : doc.data().link,
                    user_id : doc.data().user_id,
                    history_dt : doc.data().history_dt

                });
            });
            return res.json(screams);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};



exports.visit = (req, res) => {

    let msg = "작성 완료되었습니다. 정보는 2주간 보관 후 폐기됩니다.";
    db.collection("covid19").add({
        name: "홍광락",
        phone : "01042922493",
        birth : "19800106",
        tableNo: req.query.tableNo,
        created : new Date()
    }).then(() =>{

    })
        .catch((error) => {
            msg =  "작성 설패".concat(error);
        });

    return res.json({"message":msg});
};