import { Message, MessageEmbed } from "discord.js";
import Command from "../bot/Command";
import axios from "axios";

export default class NNN extends Command {
    readonly name = "nnn"
    readonly description = "Unos NNN."
    public executed(message:Message):void {
        let channel = "nnn"
        axios.get( `https://www.reddit.com/r/nnn/random/.json` )
            .then(response => {
                if( response.data.error === 404 ) {
                    message.channel.send( "No se ha encontrado nada" );
                    return;
                }
                let children = [ ];
                if( response.data?.data )
                {
                    children = response.data.data.children;
                } else {
                    children = response.data[0].data.children;
                }
                let memeImage: string|null = null;
                let tries = 20;
                do {
                    let child = <any>this.random_response( children );
                    if( child.data.preview !== undefined )
                    {
                        memeImage = child.data.url;
                        break;
                    }
                    --tries;
                    if( tries < 0 ) {
                        message.channel.send( "No se ha encontrado nada" );
                        return;
                    }
                } while( memeImage === null );

                message.channel.send({files:[<string>memeImage]}).catch(() =>
                    message.channel.send("El enlace obtenido está roto.")
                );
            })
            .catch(e => {
                message.channel.send( "No se ha encontrado nada" );
                console.error(e);
            });
    }
}