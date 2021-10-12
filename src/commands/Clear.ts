import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Clear extends Command {
    readonly name = "clear";
    readonly description = "Elimina tantos mensajes como se desee, excluyendo el mensaje del comando.";

    private clearLimit = 100; 
    public executed(message:Message, ...words:string[]){
        if(!message.member?.permissions.has("MANAGE_MESSAGES")){
            message.channel.send("No tienes permiso para usar este comando.");
            return;
        }
        if(!words[0]){
            message.channel.send("No has especificado ninguna cantidad de mensajes a borrar.");
            return;
        }

        const msgNum = parseInt(words[0], 10);
        
        if(!isNaN(msgNum)){
            if(msgNum > this.clearLimit){
                message.channel.send(`No se pueden eliminar más de ${this.clearLimit} mensajes a la vez`)
                return;
            }
            const messages = message.channel.messages.fetch({limit: msgNum, before: message.id})
                .then(collection => {
                    collection.forEach((msg) => {
                        msg.delete();
                    })
                    message.channel.send("Borrado con éxito.")
                })
                .catch(e => {
                    message.channel.send("No se han podido eliminar los mensajes");
                    console.error(e);
                });
            return;
        }

        message.channel.send("No has introducido un número.")
    }
}