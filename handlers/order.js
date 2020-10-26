const functions = require('firebase-functions');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const moment = require('moment');


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

 });


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



exports.compltOrder = (req, res) => {

    const {oid} = req.body; // {email:'devkids@kakao.com',password:'usr-9cfe92cd'};

    console.log(req.body);

    const respond = (   oid

    ) => {
        res.json({
            message: 'signup in successfully '.concat(oid),
            oid : oid
        })
    }

    const compltOrder = (oid) => {

        const p = new Promise((resolve, reject) => {

            //db.collection("CafeROrder").doc(oid)
            const doc = db.collection("CafeROrder").doc(oid);

            doc.update({status:2}).then(function() {
                console.log("order updated");

                resolve(oid);


            });



            /**
            db.collection("CafeROrder").add({
                odt:  odt,
                status: status,
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
             **/

        });


        return p;


    } // error occured

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    compltOrder(oid)
        .then(respond)
        .catch(onError)

};



exports.cancelOrder = (req, res) => {

    const {cost,items, odt,status,userInfo} = req.body; // {email:'devkids@kakao.com',password:'usr-9cfe92cd'};

    console.log(req.body);

    const respond = (   oid

    ) => {
        res.json({
            message: 'signup in successfully '.concat(oid),
            oid : oid
        })
    }

    const cancelOrder = (cost,items, odt,status,userInfo) => {

        const p = new Promise((resolve, reject) => {
            const oid = odt;
            db.collection("CafeROrder").add({
                odt:  odt,
                status: status,
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

        });


        return p;


    } // error occured

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    cancelOrder(cost,items, odt,status,userInfo)
        .then(respond)
        .catch(onError)

};

exports.orderList = (req, res) => {

    const d = moment().add(-11,'days').format('YYYYMMDDhhmmss');

    db.collection('CafeROrder')
        .where('odt','>',d)
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


