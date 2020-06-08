if(process.env.NODE_ENV == "development") require("dotenv").config()
import Bot from "./bot/bot"

const bot = new Bot({
    on_ready_log: "Beepboop o/",
    prefix: process.env.PREFIX || "$",
    name: "Winston"
})

async function main(){
    bot.start(process.env.BOTKEY);
}

main()
