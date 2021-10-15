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
        //Como no hay funcionalidad para habilitar o deshabilitar comandos esto se hace una vez nada más.
        (<CommandChannel>this.channel).suscriptors.forEach(command => {
            this.cmdInfos.push([(<Command>command).name, (<Command>command).description]);
        });
        this.embed = new MessageEmbed();
        this.makeEmbed();
    }

    public executed(message:Message, ...words:string[]){
        message.channel.send(this.embed);
    }

    public makeEmbed(){
        let fieldData: Array<{name:string, value:string}> = [];
        for(const info in this.cmdInfos){
            fieldData.push({name: info[0], value: info[1]})
        }
        
        this.embed.setTitle("Comandos")
                  .setDescription("Esta es una lista de los comandos actualmente habilitados:")
                  .addField("", "")
                  .spliceFields(0, this.embed.fields.length, fieldData);
    }
}