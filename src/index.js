if(process.env.NODE_ENV == "development") require("dotenv").config()
import Bot from "./bot/bot"
import path from "path" 
import {get, put} from "./database/database"

Array.prototype.remove = function(element){ let i = this.indexOf(element); if(i != -1) this.splice(i, 1) }

const bot = new Bot({
    on_ready_log: "Beepboop o/",
    prefix: process.env.PREFIX || "$",
    name: "Winston",
    commands_folder: path.resolve("./src/commands/")
})

var waitingList = []

async function main(){
    bot.prestart = () => new Promise((resolve, reject) => {
        bot.addCommand(bot.createHelpCommand())
        resolve()
    })

    var presets = await get.presets()

    bot.on("message", message => {
        if(!presets) presets = await get.presets()

        /** @type {{lang:string, prefix:string}} */
        let server = presets[message.guild.id] || undefined
        if(!server) {
            if(waitingList.indexOf(message.guild.id) != -1) return
            else {
                waitingList.push(message.guild.id)
                await put.serverData({
                    modules: { PLACEHOLDER:"PLACEHOLDER" },
                    config: {
                        lang: "es",
                        prefix: bot.prefix
                    },
                    data: { name: message.guild.name }
                })
                presets = await get.presets()
                waitingList.remove(message.guild.id)
                return
            }
        }

        if(!message.content.startsWith(bot.prefix) || message.author.bot) return
        bot.commandHandler(message)
    })

    bot.start(process.env.BOTKEY)
}

main()
