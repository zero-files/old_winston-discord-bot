import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Dice extends Command {
    readonly name = "dice"
    readonly description = "Arroja un número aleatorio según se indique"

    public executed(message:Message, sides:string, amount:string):void {
        let n = Number(sides);
        let a = Number(amount);

        if(!n || n <= 0) n = 6;
        if(!a) a = 1;

        if(a > 5) {
            message.channel.send("Solo puedes tirar cinco dados como máximo.");
            return;
        }

        const responses:string[] = [];

        for(let i = 0; i < a; i++) {
            responses.push(`> :game_die: **${Math.floor(Math.random() * n) + 1}**`);
        }

        message.channel.send(responses.join("\n"));
    }
}
