const functions = require('firebase-functions');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


const mysql = require('mysql');




exports.login = (req, res) => {

    const {username, password} = req.body;




    const secret = req.app.get('jwt-secret');

    const check = (user) => {

        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
                debugger
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id : user.USER_ID,
                            username: user.USER_NM,
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'devkids.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                })
                return p;


        }
    }

    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

const findUser = (username) => {

    var connection = mysql.createConnection({
        host: 'database-1.cxzihv8lxxxj.ap-northeast-2.rds.amazonaws.com',
        post: 3306,
        user: 'root',
        password: 'tmxpdlwjdrmf2020',
        database: 'blossomme'
    });

    const p = new Promise((resolve, reject) => {

    connection.connect();
        connection.query("select * from comt_user where login_id = ?", ['devkids@kakao.com'], function (err, rows, fields) {
            connection.end();
            if (!err) {

                var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                    'fields : ' + JSON.stringify(fields);
                //res.send(result);
                //return res.json(rows[0]);

                if(rows == null)
                            reject("notfound")
                else
                      resolve(rows[0]);


            } else {
                console.log('query error : ' + err);
                throw new Error('notfound')
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


    findUser(username)
        .then(check)
        .then(respond)
        .catch(onError)


};



exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

