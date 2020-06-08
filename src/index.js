if(process.env.NODE_ENV == "development") require("dotenv").config()
import Bot from "./bot/bot"
import path from "path"

const bot = new Bot({
    on_ready_log: "Beepboop o/",
    prefix: process.env.PREFIX || "$",
    name: "Winston",
    commands_folder: path.resolve("./src/commands/")
})

async function main(){
    bot.on("message", message => {
        if(!message.content.startsWith(bot.prefix) || message.author.bot) return
        bot.commandHandler(message)
    })

    bot.start(process.env.BOTKEY)
}

main()
