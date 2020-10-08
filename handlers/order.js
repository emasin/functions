const functions = require('firebase-functions');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


const mysql = require('mysql');




exports.addOrder = (req, res) => {

    const {cost,items, odt,status} = req.body; // {email:'devkids@kakao.com',password:'usr-9cfe92cd'};
    console.log("items",items);
    console.log(req.body);


    const respond = (   oid

    ) => {
        res.json({
            message: 'signup in successfully '.concat(oid),
            oid : oid
        })
    }

const addOrder = (cost,items, odt,status) => {

    var connection = mysql.createConnection({
        host: 'db.devkids.co.kr',
        port: 19202,
        user: 'devkids',
        password: 'Tlem2019!!',
        database: 'user_db'
    });

    const p = new Promise((resolve, reject) => {
        const oid = odt;
        resolve(oid);
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






    addOrder(cost,items, odt,status)
        .then(respond)
        .catch(onError)


};


