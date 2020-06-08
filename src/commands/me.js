const {RichEmbed} = require("discord.js")
import Command from "../utils/Command"

const me = new Command({
    name: "Me",
    trigger: "me",
    author: "Minienzoo",
    description: "Simula un roleplay",
    parameters: ["roleplay"],
    category: "games"
})

me.setCommand((message, ...rp)=>{
    let roleplay = rp.join(" ").trim()
    if(!roleplay) return

    message.delete()

    let embed = new RichEmbed()
        .setColor("#603085")
        .setAuthor(message.member.nickname || message.author.username, message.author.avatarURL)
        .setImage("https://i.imgur.com/FI5whva.png")
        .setDescription(roleplay)

    return message.channel.send(embed)
})

module.exports = me