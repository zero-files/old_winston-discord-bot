import Command from "../utils/Command"
var seed = require("seed-random")

const oball = new Command({
    name: "8ball",
    trigger: "8ball",
    description: "Envia una respuesta al azar a una pregunta.",
    category: "utility",
    author: "Minienzoo",
    parameters: [{
            name: "words",
            description: "Palabras de la pregunta"
        }
    ]
})

const responses = [
    "Y... Yo creo que sí.",
    "Es cierto.",
    "Sin lugar a dudas xd",
    "Sí.",
    "Dalo por hecho.",

    "Si te lo digo no me vas a creer.",
    "Si te digo lo que pasará, no ocurrirá.",
    "Según mis cálculos... Los cálculos no dicen nada.",
    "Ni lo confirmo ni lo desmiento.",
    "Es complicado...",

    "No.",
    "No lo creo.",
    "Mi IA dice que no es así.",
    "No cuentes con ello.",
    "Claro que no.",

    "Búscate la respuesta tú mismo."
]

oball.setCommand((message, ...words) => {
    if(!words.join()) return message.channel.send("Hazme una pregunta primero")
    else message.channel.send(responses[Math.floor(seed(words.join())() * responses.length)])
})

module.exports = oball