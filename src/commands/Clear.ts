import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Clear extends Command {
    readonly name = "clear";
    readonly description = "Elimina tantos mensajes como se desee, excluyendo el mensaje del comando.";

    public executed(message:Message, ...words:string[]){
        if(!words[0]){
            message.channel.send("No has especificado ninguna cantidad de mensajes a borrar.");
            return;
        }

        const msgNum = parseInt(words[0], 10);
        if(!isNaN(msgNum)){
            const messages = message.channel.messages.fetch({limit: msgNum, before: message.id})
                .then(collection => {
                    collection.forEach((msg) => {
                        msg.delete();
                    })
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