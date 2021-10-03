if(process.env.NODE_ENV == "development") require("dotenv").config();
import { Client } from "discord.js";
import Winston from "./bot/Winston";
import ReadyLog from "./suscriptors/ReadyLog";

import Dice from "./commands/Dice";
import OBall from "./commands/OBall";
import Ping from "./commands/Ping";
import Math from "./commands/Math";
import ImageSearch from "./commands/ImageSearch";
import SMN from "./commands/SMN";
import Pick from "./commands/Pick";
import CoinFlip from "./commands/CoinFlip";
import Ascii from "./commands/Ascii";

class Main {
    public static main(){
        const client = new Client();

        const winston = new Winston({
            name: "Winston",
            prefix: "!",
            discord_client: client
        });

        winston.enable_command_handling();

        const ready_channel = winston.new_EventChannel("ready");
        const ready_log = new ReadyLog();
        ready_channel.add_suscriptor(ready_log);
        winston.on("ready", ready_channel);

        winston.add_command(new Dice())
            .add_command(new OBall())
            .add_command(new Ping())
            .add_command(new Math())
            .add_command(new CoinFlip())
            .add_command(new Pick())
            .add_command(new SMN())
            .add_command(new Ascii());

        const google_engine_id = process.env.GOOGLE_ENGINE_ID;
        const google_api_key = process.env.GOOGLE_API_KEY;
        if(google_engine_id && google_api_key){
            winston.add_command(new ImageSearch(google_engine_id, google_api_key));
        }

        const token = process.env.BOTKEY;
        if(!token) throw new Error("Bot key is not defined");

        winston.start(token);
    }
}

Main.main();
