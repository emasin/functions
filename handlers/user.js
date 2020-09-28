const functions = require('firebase-functions');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


const mysql = require('mysql');




exports.addUser = (req, res) => {

    const {user_id,hp, pwd,sid,nickname} = req.body; // {email:'devkids@kakao.com',password:'usr-9cfe92cd'};

    console.log(req.body);


    const respond = (

    ) => {
        res.json({
            message: 'signup in successfully'
        })
    }

const addUser = (user_id,pwd,hp,nickname,sid) => {

    var connection = mysql.createConnection({
        host: 'db.devkids.co.kr',
        post: 19202,
        user: 'devkids',
        password: 'Tlem2019!!',
        database: 'user_db'
    });

    const p = new Promise((resolve, reject) => {

    connection.connect();
        connection.query("insert into TB_USER (user_id,pwd,hp,nickname,sid) values (?,?,?,?,?)", [user_id,pwd,hp,nickname,sid], function (err, rows, fields) {
            connection.end();
            if (!err) {

                var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                    'fields : ' + JSON.stringify(fields);

                //res.send(result);
                //return res.json(rows[0]);
                console.log(result);


            } else {
                console.log('query error : ' + err);
                //throw new Error('error ' + err)
            }

        });

        });


    return p;


} // error occured

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }






    addUser(user_id,pwd,hp,nickname,1)

        .then(respond)
        .catch(onError)


};



exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

