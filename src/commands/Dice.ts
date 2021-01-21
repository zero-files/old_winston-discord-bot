import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Dice extends Command {
    readonly name = "dice"
    readonly description = "Arroja un número aleatorio según se indique"

    public executed(message:Message, sides:string):void {
        let n = Number(sides);
        if(!n || n <= 0) n = 6;
        message.channel.send(`> :game_die: **${Math.floor(Math.random() * n) + 1}**`);
    }
}
