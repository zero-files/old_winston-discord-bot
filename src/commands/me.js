import {MessageEmbed} from "discord.js"
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

    let embed = new MessageEmbed({image: {url:"https://i.imgur.com/FI5whva.png"}})
        .setColor("#603085")
        .setAuthor(message.member.nickname || message.author.username, message.author.avatarURL())
        .setDescription(roleplay)

    return message.channel.send(embed)
})

module.exports = me