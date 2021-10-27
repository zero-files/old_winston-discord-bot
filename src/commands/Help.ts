import CommandChannel from "../bot/CommandChannel";
import { Message, MessageEmbed } from "discord.js";
import Command from "../bot/Command";

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func): Array< string >
{
    let fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
    {
        return [ ];
    }
    return result.shift( );
}

export default class Help extends Command {
    readonly name = "help";
    readonly description = "Muestra los diferentes comandos del bot.";

    private cmdInfos: string[][];
    private embed: MessageEmbed;

    constructor(){
        super();
        this.cmdInfos = [];
        this.embed = new MessageEmbed();
    }

    public executed(message:Message, ...words:string[]){
        message.channel.send(this.embed);
    }

    public makeEmbed(){
        (<CommandChannel>this.channel).suscriptors.forEach(command => {
            let cmd = (<any>command);
            let params = getParamNames(cmd.executed);
            let desc = (<Command>command).description;
            if( params.length > 0 ) 
            {
                desc += "[ ";
                desc += params.join( " " );
                desc += " ]";
            }
            this.cmdInfos.push([(<Command>command).name, desc]);
        });
        let fieldData: Array<{name:string, value:string}> = [];

        this.cmdInfos.forEach(info => {
            fieldData.push({name: info[0], value: info[1]});
        });
        
        this.embed.setTitle("Comandos")
                  .setDescription("Esta es una lista de los comandos actualmente habilitados:")
                  .addFields(fieldData);
    }
}