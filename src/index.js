if(process.env.NODE_ENV == "development") require("dotenv").config()
import Bot from "./bot/bot"
import path from "path"

Array.prototype.remove = function(element){ let i = this.indexOf(element); if(i != -1) this.splice(i, 1) }

const bot = new Bot({
    on_ready_log: "Beepboop o/",
    prefix: process.env.PREFIX || "$",
    name: "Winston",
    commands_folder: path.resolve("./src/commands/")
})

async function main(){
    bot.prestart = () => new Promise((resolve, reject) => {
        bot.addCommand(bot.createHelpCommand())
        resolve()
    })

    bot.on("message", async message => {
        if(!message.content.startsWith(bot.prefix) || message.author.bot) return
        bot.commandHandler(message)
    })

    bot.start(process.env.BOTKEY)
}

main()
