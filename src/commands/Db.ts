import { Message } from "discord.js";
import Command from "../bot/Command";
var fs = require("fs");

export default class Db extends Command {
    readonly name = "db";
    readonly description = "Guarda, elimina y muestra diferentes archivos ";

    public executed(message:Message, ...words:string[]){

    }
}