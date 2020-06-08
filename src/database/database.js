const admin = require("firebase-admin")
const key = require("./key")

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: `https://${process.env.PID}.firebaseio.com`
});

const db = admin.firestore()

const get = {
}

const put = {
}

const del = {
}

const patch = {
}

const check = {
}


module.exports = {
    get,
    put,
    del,
    patch,
    check,
}