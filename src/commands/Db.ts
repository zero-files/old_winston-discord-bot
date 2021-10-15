import { Message } from "discord.js";
import Command from "../bot/Command";
import * as fs from "fs/promises";

export default class Db extends Command {
    readonly name = "db";
    readonly description = "Guarda, elimina y muestra diferentes archivos ";

    constructor(){
        super();

    }
    public executed(message:Message, ...words:string[]){
        
    }
}