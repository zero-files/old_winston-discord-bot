import { Message } from "discord.js";
import Command from "../bot/Command";

export default class CoinFlip extends Command {
    readonly name = "coinflip"
    readonly description = "Gira la moneda, ¿cara o cruz?"
    private responses = ["Ha salido: **Cara**", "Ha salido: **Cruz**"]

    public executed(message:Message, ...words: string[]):void {
        if( words.length > 0 ) {
            let messages = words.join( " " );
            let splt = messages.split( "," );
            if( splt.length === 2 ) {
                const response = this.random_response([
                    `Ha salido: **${splt[0]}**`, 
                    `Ha salido: **${splt[1]}**`
                ]);
                message.channel.send(response);
                return;
            }
        }
        const response = this.random_response(this.responses);
        message.channel.send(response);
    }
}
