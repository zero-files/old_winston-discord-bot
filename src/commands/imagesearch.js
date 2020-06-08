import Command from "../utils/Command"
import GoogleImages from "google-images"
const URL = require("url")
const imgSearch = new GoogleImages(process.env.GCSE, process.env.GAPI);

const imagesearch = new Command({
    name: "Image Search",
    trigger: "img",
    author: "Minienzoo",
    description: "Buscador de imágenes en google",
    parameters: [
        {
            name: "word",
            description: "Imagen a buscar"
        }
    ],
    category: "search"
})

imagesearch.setCommand((message, ...words) => {
    let query = words.join(" ")
    if(!query) return message.channel.send("¿Qué imagen deseas que busque?")
    else {
        imgSearch.search(query).then(imgs => {
            imgs = JSON.parse(JSON.stringify(imgs, ["url"]))
            imgs.filter(img => URL.parse(img).hostname != "fbsbx.com")
            if(imgs.length === 0) return message.channel.send(`No encontré nada para '${query}' en internet.`)
            else return message.channel.send(imgs[Math.floor((Math.random()*3)+1)].url)
        })
    }
})

module.exports = imagesearch