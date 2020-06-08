import Command from "../utils/Command"

const dice = new Command({
    name: "Dice",
    trigger: "dice",
    author: "Minienzoo",
    description: "Arroja un número aleatorio según se indique",
    parameters: [{
        name: "sides",
        description: "Cantidad de caras del dado"
    }],
    category: "game"
})

dice.setCommand((message, sides) => {
    let n = Number(sides)
    if(!n || n <= 0) n = 6
    return message.channel.send(`> :game_die: **${Math.floor(Math.random() * n) + 1}**`)
})

module.exports = dice