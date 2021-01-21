import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Ping extends Command {
    readonly name = "ping"
    readonly description = "Mide la latencia entre el usuario y el bot."

    public executed(message:Message):void {
        message.channel.send("`Pinging...`")
            .then(sent => {
                sent.edit(`Pong! (${sent.createdTimestamp - message.createdTimestamp}ms)`);
            });
    }
}
