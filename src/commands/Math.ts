import { Message } from "discord.js";
import Command from "../bot/Command";
import {evaluate} from "mathjs";

export default class Math extends Command {
    readonly name = "math"
    readonly description = "Evalúa una expresión matemática."

    public executed(message:Message, ...elements:string[]):void {
        const formula = elements.join(" ");

        if(!formula) {
            message.channel.send("No has introducido ninguna expresión");
        } else {
            let result:unknown;
            try {
                result = evaluate(formula);
            } catch {
                message.channel.send("No creo que pueda calcular eso.");
                return;
            }

            message.channel.send(`El resultado es ${result}`);
        }
    }
}
