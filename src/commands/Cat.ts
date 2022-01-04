import { Message, MessageEmbed } from "discord.js";
import Command from "../bot/Command";
import axios from "axios";

export default class Cat extends Command {
    readonly name = "cat"
    readonly description = "Unos gatos"
    public executed(message:Message):void {
        axios.get( `https://api.thecatapi.com/v1/images/search` )
            .then(response => {
                if( response.data.error === 404 ) {
                    message.channel.send( "No se ha encontrado nada" );
                    return;
                }
                message.channel.send({files:[response.data.url]}).catch(() =>
                    message.channel.send("El enlace obtenido está roto.")
                );
            })
            .catch(e => {
                message.channel.send( "No se ha encontrado nada" );
                console.error(e);
            });
    }
}
