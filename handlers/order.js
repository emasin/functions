const functions = require('firebase-functions');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


const mysql = require('mysql');


const db = admin.firestore();

exports.addOrder = (req, res) => {

    const {cost,items, odt,status,userInfo} = req.body; // {email:'devkids@kakao.com',password:'usr-9cfe92cd'};

    console.log(req.body);


    const respond = (   oid

    ) => {
        res.json({
            message: 'signup in successfully '.concat(oid),
            oid : oid
        })
    }

const addOrder = (cost,items, odt,status,userInfo) => {

    const p = new Promise((resolve, reject) => {
        const oid = odt;
        db.collection("CafeROrder").add({
            odt:  odt,
            ststus: status,
            cpst: cost,
            items: items,
            userInfo:userInfo
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            resolve(oid);
        }).catch(function(error) {

            console.error("Error adding document: ", error);
            throw new Error('error ' + err);
        });


        /**


    connection.connect();
        connection.query("insert into TB_USER (user_id,pwd,hp,nickname,sid) values (?,?,?,?,?)", [user_id,pwd,hp,nickname,sid], function (err, rows, fields) {
            connection.end();
            if (!err) {

                var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                    'fields : ' + JSON.stringify(fields);

                //res.send(result);
                //return res.json(rows[0]);
                console.log("rows.insertId",rows.insertId);
                //return result.insertId;
                resolve(rows.insertId);
            } else {
                console.log('query error : ' + err);
                throw new Error('error ' + err)
            }

        });

        **/});


    return p;


} // error occured

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }






    addOrder(cost,items, odt,status,userInfo)
        .then(respond)
        .catch(onError)


};


exports.orderList = (req, res) => {
    db.collection('CafeROrder')
        .where('odt','>','20201010000000')
        .orderBy('odt', 'desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    id : doc.id,
                    userInfo: doc.data().userInfo,
                    status : doc.data().status,
                    odt : doc.data().odt,
                    items: doc.data().items

                });
            });
            return res.json(screams);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};


