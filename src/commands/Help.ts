import CommandChannel from "../bot/CommandChannel";
import { Message, MessageEmbed } from "discord.js";
import Command from "../bot/Command";

export default class Help extends Command {
    readonly name = "help";
    readonly description = "Guarda, elimina y muestra diferentes archivos ";

    private cmdInfos: string[][];
    private embed: MessageEmbed;

    constructor(){
        super();
        this.cmdInfos = [[]];
        this.embed = new MessageEmbed();
    }

    public executed(message:Message, ...words:string[]){
        message.channel.send(this.embed);
    }

    public makeEmbed(){
        (<CommandChannel>this.channel).suscriptors.forEach(command => {
            this.cmdInfos.push([(<Command>command).name, (<Command>command).description]);
            console.log((<Command>command).name+" "+ (<Command>command).description)
        });
        let fieldData: Array<{name:string, value:string}> = [];

        for(const info in this.cmdInfos){
            fieldData.push({name: info[0], value: info[1]})
        }
        
        this.embed.setTitle("Comandos")
                  .setDescription("Esta es una lista de los comandos actualmente habilitados:")
                  .addFields(fieldData);
    }
}