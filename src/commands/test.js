import Command from "../utils/Command"

const test = new Command({
    name: "Test",
    trigger: "test",
    author: "Minienzoo",
    description: "Comando usado para previsualizaciones",
    parameters: [],
    category: "utility"
})

test.setCommand(message => {
    message.channel.send("Testeado!")
})

module.exports = test