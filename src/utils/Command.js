import {Message} from "discord.js"

/**
 * @typedef {{name:string, description:string }} parameters Type parameters
 */

/** Crea un nuevo comando */
class Command {
    /**
     * Define las propiedades del comando
     * @param {Object} properties Propiedades del comando
     * @param {string} properties.name Nombre del comando
     * @param {parameters[]} properties.parameters Parametros del comando
     * @param {string} properties.author Nombre del autor del comando
     * @param {string} properties.description Descripción del comando
     * @param {string} properties.trigger Disparador del comando
     * @param {"utility"} properties.category Categoría del comando
     */
    constructor(properties){
        if(!properties) properties = {}

        /** Todas las propiedades definidas por el autor */
        this.properties = properties

        /** El nombre del comando */
        this.name = properties.name || "Unnamed"

        /** El autor del comando */
        this.author = properties.author || "Unknow"

        /** La descripción del comando */
        this.description = properties.description || "Im a command"

        properties.parameters = properties.parameters || []
        /** Los parametros del comando */
        this.parameters = properties.parameters.filter(parameter => parameter.name)

        /** Disparador del comando */ 
        this.trigger = properties.trigger ? properties.trigger.toLowerCase() : undefined

        /** Categoría del comando */
        this.category = properties.category || "others"

        /**
         * Funcion del comando
         * @private
         */
        this.command = null
    }

    /**
     * Setea el comando
     * @param {(message: Message, ...parameters:string[]) => void} command Funcion del comando
     */
    setCommand(command){
        if(command && !this.command) this.command = command
    }

    /**
     * Ejecuta el comando
     * @return {()=>void}
     */
    exe(){
        const commandNotDefined = message => message.channel.send("Este comando no ha sido definido.")
        if(this.command) return this.command
        else return commandNotDefined
    }

    /**
     * Obtiene toda las propiedades definidas por el autor
     * @return {Object}
     */
    getProperties(){
        return this.properties
    }
}

export default Command
