import { Message, MessageEmbed } from "discord.js";
import Command from "../bot/Command";
import axios from "axios";

export default class Billy extends Command {
    readonly name = "billy"
    readonly description = "Be like Billy"
    private __capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    private __normalize(str){
        return str
            .replace(/ /g,"%20")
            .normalize("NFD")
            .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
            .normalize();
    }
    public executed(message:Message, ...words:string[]):void {
        let wws = this.__normalize( words.join( " " ) );
        let splts = wws.split( "," );
        let name: string | null = null;
        let sex: string | null = null;
        if( splts.length >= 2 )
        {
            name = this.__normalize(splts[ 0 ].trim( ));
            sex = splts[ 1 ];
            if( sex != "m" || sex != "f" ) sex = "m";
        }
        else
        {
            name = this.__normalize(wws.trim( ));
            sex = "m";
        }
        name = this.__capitalize( name );
        axios.get( `https://belikebill.ga/billgen-API.php?default=1&name=${name}&sex=${sex}` )
            .then(response => {
                if( response.data.error === 404 ) {
                    message.channel.send( "No se ha encontrado nada" );
                    return;
                }
                message.channel.send({files:[response.data]}).catch(() =>
                    message.channel.send("El enlace obtenido está roto.")
                );
            })
            .catch(e => {
                message.channel.send( "No se ha encontrado nada" );
                console.error(e);
            });
    }
}
