const functions = require('firebase-functions');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');


const mysql = require('mysql');




exports.login = (req, res) => {

    const {login_id, pwd} = req.body; // {email:'devkids@kakao.com',password:'usr-9cfe92cd'};

    console.log(req.body);


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
                            _id : user.uid,
                            username: user.nickname,
                        },
                        secret,
                        {
                            expiresIn: '1d',
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

const findUser = (username,password) => {

    var connection = mysql.createConnection({
        host: 'db.devkids.co.kr',
        port: 19202,
        user: 'devkids',
        password: 'Tlem2019!!',
        database: 'user_db'
    });

    const p = new Promise((resolve, reject) => {

    connection.connect();
        connection.query("select * from TB_USER where hp = ? and pwd = ?", [username,password], function (err, rows, fields) {
            connection.end();
            if (!err) {
                console.log(`${username} ${password}`);
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
                throw new Error('notfound ' + err )
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


            findUser(login_id,pwd)
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

