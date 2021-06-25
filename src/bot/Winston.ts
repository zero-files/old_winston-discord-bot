import Bottie from "@enzodiazdev/bottie";
import WinstonProperties from "./WinstonProperties";

import CommandChannel from "./CommandChannel";
import Command from "./Command";

export default class Winston extends Bottie {
    private command_channel:CommandChannel

    constructor(properties:WinstonProperties){
        super(properties);

        this.command_channel = new CommandChannel(this.broker);
        this.on("command", this.command_channel);
    }

    public add_command(command:Command):this {
        this.command_channel.add_suscriptor(command);
        return this;
    }

    public remove_command(command:Command):this {
        this.command_channel.remove_suscriptor(command);
        return this;
    }
}
