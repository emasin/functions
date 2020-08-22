const functions = require('firebase-functions');
const admin = require('firebase-admin');



const db = admin.firestore();

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