import admin from "firebase-admin"
import key from "./key"

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: `https://${process.env.PID}.firebaseio.com`
});

const db = admin.firestore()
const presets = db.collection("presets").doc("presets")
const server = id => db.collection(id)

export const get = {
    presets: () => presets.get().then(doc => doc.data()),
    serverModules: id => server(id).doc("modules").get().then(doc => doc.data()),
    serverData: id => server(id).get().then(q => q.size ? q.docs[0].data() : undefined)
}

export const put = {
    serverData: async data => {
        await server(data.data.id).doc("modules").set(data.modules)
        await server(data.data.id).doc("server").set(data.data)
        await server(data.data.id).doc("config").set(data.config)
        let config = {}
        config[data.data.id] = data.config
        await presets.set(config,{merge:true})
    }
}

export const del = {
}

export const patch = {
}

export const check = {
}
