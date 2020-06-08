import {Client} from "discord.js"

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
     * Prepara al bot para ser iniciado
     * @param {string} token Api Token del Bot
     */
    async start(token){
        this.login(token)
    }
}

export default Bot
