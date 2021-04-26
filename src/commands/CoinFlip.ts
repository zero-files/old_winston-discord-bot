import { Message } from "discord.js";
import Command from "../bot/Command";

export default class CoinFlip extends Command {
    readonly name = "coinflip"
    readonly description = "Gira la moneda, ¿cara o cruz?"
    private responses = ["Ha salido: **Cara**", "Ha salido: **Cruz**"]

    public executed(message:Message):void {
        const response = this.random_response(this.responses);
        message.channel.send(response);
    }
}
