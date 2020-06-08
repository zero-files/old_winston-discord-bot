import Command from "../utils/Command"

const ping = new Command({
    name: "Ping",
    trigger: "ping",
    author: "Minienzoo",
    description: "Mide la latencia entre el usuario y el bot.",
    parameters: [],
    category: "utility"
})

ping.setCommand(message => message.channel.send('`Pinging...`').then(sent => sent.edit(`Pong! (${sent.createdTimestamp - message.createdTimestamp}ms)`)))

module.exports = ping