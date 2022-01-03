import { Message, MessageEmbed } from "discord.js";
import Command from "../bot/Command";
import axios from "axios";

export default class Dog extends Command {
    readonly name = "dog"
    readonly description = "Unos perros"
    public executed(message:Message):void {
        axios.get( `https://dog.ceo/api/breeds/image/randomn` )
            .then(response => {
                if( response.data.error === 404 ) {
                    message.channel.send( "No se ha encontrado nada" );
                    return;
                }
                message.channel.send({files:[response.data.message]}).catch(() =>
                    message.channel.send("El enlace obtenido está roto.")
                );
            })
            .catch(e => {
                message.channel.send( "No se ha encontrado nada" );
                console.error(e);
            });
    }
}
