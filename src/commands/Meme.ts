import { Message, MessageEmbed } from "discord.js";
import Command from "../bot/Command";
import axios from "axios";

export default class Meme extends Command {
    readonly name = "meme"
    readonly description = "Unos memillos."
    readonly subReddits = ["dankmeme", "meme", "cursedimages"];
    public executed(message:Message, ...channels: string[]):void {
        if( channels.length === 0 ) {
            channels = ["cursedimages"];
        }
        let channel = channels.join( "" );
        if( channel === "nsfw" ) {
            message.channel.send( `Este es un canal cristiano, **<@${message.author.id}>** <:dogerime:673501205607219230>` );
            return;
        }
        const random = this.random_response(this.subReddits);
        axios.get( `https://www.reddit.com/r/${channel}/random/.json` )
            .then(response => {
                if( response.data.error === 404 ) {
                    message.channel.send( "No se ha encontrado nada" );
                    return;
                }
                /*let [list] = response.data;
                const [post] = list.data.children;

                const memeImage = post.data.url;*/
                let children = [ ];
                if( response.data?.data )
                {
                    children = response.data.data.children;
                } else {
                    children = response.data[0].data.children;
                }
                let memeImage: string|null = null;
                let tries = 10;
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