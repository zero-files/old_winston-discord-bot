import {Client, Message, MessageEmbed} from "discord.js"
import {readdirSync} from "fs"
import path from "path"
import Command from "../utils/Command"

/**
 * @typedef Bot_Options
 * @property {string} prefix Prefijo del bot, por defecto "!"
 * @property {string} name Asigna un nombre al bot.
 * @property {string} on_ready_log Mensaje de consola para cuando el bot esté listo. 
 * @property {string} commands_folder Carpeta contenedora de comandos.
 * @property {string} help_command Trigger para el comando de ayuda, por defecto "help"
 *
 */

/**
 * Crea un custom bot 
 * @extends Client
 */
class Bot extends Client {
    /**
     * Crea el bot según el objeto de configuración
     * @param {Bot_Options} options
     */
    constructor(options){
        super() //Crea una nueva instancia de Client
        
        if(!options) options = {}

        /** Lista de comandos */
        this.commandList = []

        /**
         * Lista de instancias de Command
         * @type {Command[]}
         */
        this.commands = []

        /** El prefijo */
        this.prefix = options.prefix || "!"

        /** El nombre de bot */
        this.name = options.name || "Bot"

        /** Comando de ayuda */
        this.help_command = options.help_command ? options.help_command.toLowerCase().trim() : "help"

        /** Ubicación de los comandos */
        this.commands_folder = options.commands_folder || ""

        /** Memoria interna del bot */
        this.memory = new Map()

        this.on("ready", () => console.log(options.on_ready_log || "Bot is ready"))
    }

    /**
     * Función previa al encendido del bot.
     * 
     * Debe ser sobreescrita.
     * 
     * Puede retornar una Promise.
     */
    prestart(){
        return true
    }

    /**
     * Enciende el bot
     * @param {string} token Api Token del Bot
     */
    async start(token){
        await this.commander()
        await this.prestart()

        this.login(token)
    }

    /**
     * Se encarga de manejar y ejecutar los comandos
     * @param {Message} message El objeto Message de discord.js
     */
    commandHandler(message){
        let messageWithoutPrefix = message.content.split(" ")[0] === this.prefix ?
            message.content.split(" ").slice(1).join(" ").toLowerCase().trim() :
            message.content.slice(this.prefix.length).toLowerCase().trim()
    
        let userCommand = messageWithoutPrefix.split(" ")[0].trim()
        let params = messageWithoutPrefix.split(" ").slice(1).map(parameter => parameter.trim()).filter(parameter => parameter !== "")
        
        if(this.commandList.indexOf(userCommand) === -1) return

        let command = this.commands.find(command => command.trigger === userCommand)

        if(!command) return

        try { command.exe()(message, ...params) }
        catch (e) {
            console.log(e)
            return message.channel.send(`Ha ocurrido un error en este comando. Contacta con el desarrollador: ${command.author}`)
        }
    }

    /**
     * Importa todos los comandos
     * @private
     */
    commander(){
        return new Promise(resolve => {
            let commandFiles = readdirSync(this.commands_folder)
        
            for(let i = 0; i < commandFiles.length; i++){
                let file = commandFiles[i]
                if(file.startsWith("_") || !file.endsWith(".js")) continue
                
                let module = require(path.join(this.commands_folder, file))
                let command = module.default || module

                if(!command instanceof Command) continue
                if(!command.trigger) continue
    
                this.commands.push(command)
                this.commandList.push(command.trigger)
            }

            resolve()
        })
    }

    /**
     * Agrega comandos al Bot
     * @param {Command} command
     */
    addCommand(command){
        if(command instanceof Command && command.trigger){
            this.commands.push(command)
            this.commandList.push(command.trigger)
        }
    }

    /**
     * Crea el comando de ayuda
     * @returns {Command}
     */
    createHelpCommand(){
        const help = new Command({
            name: "Help",
            trigger: this.help_command,
            description: "Comando de ayuda.",
            category: "utility",
            author: this.name,
            parameters: ["Comando"]
        })

        const tips = [
            "Visita mi repositorio oficial https://github.com/winston-bot/winston-discord-bot"
        ]

        const fullHelpEmbed = new MessageEmbed()
            .setColor("#007cbe")
            .setTitle("Comandos")
            .setDescription(`Lista completa de comandos.\nUsa \`${this.prefix}${this.help_command}\` \`<command>\` para ver más información sobre ese comando.`)
            .setFooter(`Tip: ${tips[Math.floor(Math.random() * tips.length)]}`, "https://i.imgur.com/hY4CqMQ.png")

        for(let i = 0; i < this.commands.length; i++){
            let command = this.commands[i]
            fullHelpEmbed.addField(`${this.prefix}${command.trigger}`, command.description)
        }
        
        help.setCommand((message, userCommand) => {
            if(userCommand) {
                const commandHelpEmbed = new MessageEmbed()
                    .setColor("#007cbe")
                    .setFooter(`Tip: ${tips[Math.floor(Math.random() * tips.length)]}`, "https://i.imgur.com/hY4CqMQ.png")

                let command = this.commands.find(command => command.trigger === userCommand)
                
                if(!command) return message.channel.send(`El comando '${userCommand}' no existe.`)

                commandHelpEmbed.setTitle(command.name)
                commandHelpEmbed.setDescription(command.description)
                commandHelpEmbed.addField("Trigger", command.trigger)
                commandHelpEmbed.addField("Category", command.category)
                commandHelpEmbed.addField('\u200b', '\u200b')
                commandHelpEmbed.addField("Parameters", "Parameters list.\n`*` is required")
                
                command.parameters.forEach(parameter => {
                    commandHelpEmbed.addField(parameter, "Sin descripcion", true)
                })

                commandHelpEmbed.addField('\u200b', '\u200b')
                commandHelpEmbed.addField("Author", command.author)

                return message.channel.send(commandHelpEmbed)
            } else return message.channel.send(fullHelpEmbed)
        })

        return help
    }
}

export default Bot
