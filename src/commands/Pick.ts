import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Pick extends Command {
    readonly name = "pick"
    readonly description = "Elije un usuario random de las menciones dadas."

    public executed(message:Message):void {
        if(message.mentions.everyone) {
            message.channel.send("No me hagas elegir entre tantos, mejor no.");
            return;
        }

        const users = message.mentions.users;
        const random_user = users.random(1)[0];

        message.channel.send(`<@${random_user.id}>, **${message.author.username}** te ha elegido aleatoriamente.`);
    }
}
