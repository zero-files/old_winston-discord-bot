import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Ascii extends Command {
    readonly name = "ascii";
    readonly description = "Devuelve un arte ASCII de PogChamp.";

    public executed(message:Message, ...words:string[]){
        if(!words[0]){
            message.channel.send("No has elegido ningún ASCII-art.");
            return;
        }
        switch (words[0].toLowerCase()) {
            case "pog":
                message.channel.send("⠄⠄⠄⠄⠄⢠⡦⡟⠻⠛⠙⠉⠈⠄⠄⠈⠻⠛⣾⣦⣤⣀⠄⠄\n\
⠄⠄⠄⣰⡿⠟⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⠋⠽⢿⣧⠄\n\
⠄⢀⣴⠞⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢼⠆⠄\n\
⠄⣼⠇⠄⠄⠄⠄⠄⠄⠄⠄⣀⣠⣤⣶⣿⣶⣦⣤⣀⠄⣻⡃⠄\n\
⠄⡿⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⢸⣧⠄\n\
⠄⢿⡀⠄⠄⠄⠄⠄⠄⠄⢠⣾⣿⣿⣋⣩⣭⣝⣿⣿⠛⢰⡇⠄\n\
⠄⢸⡇⠄⠄⢀⠄⠄⠄⠄⣾⣿⣿⣿⣟⣯⠉⢉⣿⠋⣟⢻⡇⠄\n\
⠄⠄⢹⡀⢳⡗⠂⣠⠄⠄⣿⣿⣿⣿⣿⣭⣽⣿⣿⣿⣉⣸⠇⠄\n\
⠄⠄⠈⣷⠄⢳⣷⣿⠄⠄⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄\n\
⠄⠄⠄⠘⣧⠄⠈⠙⠄⠄⠄⠉⠙⠛⠛⣿⣿⣷⣤⣄⢿⡿⠃⠄\n\
⠄⠄⠄⠄⠉⠳⣄⡀⠄⠄⠄⢢⣦⣾⣿⠿⠿⠛⠉⢉⣽⠇⠄⠄\n\
⠄⠄⠄⠄⠄⠄⠘⠿⣄⢀⠄⣀⣝⢻⣿⡿⠒⣀⣀⣸⠁⠄⠄⠄\n\
⠄⠄⠄⠄⠄⠄⠄⠄⠈⠳⣤⠁⠙⠎⢻⣄⠄⠄⣸⠋⠄⠄⠄⠄\n\
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⠶⢦⣄⣀⣣⠴⠃⠄⠄⠄⠄⠄");
                break;
            case "troll":
                message.channel.send("░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄\n\
░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄\n\
░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█\n\
░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░█\n\
░▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░█\n\
█▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒█\n\
█▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█\n\
░█▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█\n\
░░█░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█\n\
░░░█░░██░░▀█▄▄▄█▄▄█▄████░█\n\
░░░░█░░░▀▀▄░█░░░█░███████░█\n\
░░░░░▀▄░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█\n\
░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░█\n\
░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░█\n\
░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░█");
                break;
            case "fasilito":
                message.delete();
                message.channel.send("━━━━-╮\n\
╰┃ ┣▇━▇\n\
 ┃ ┃  ╰━▅╮\n\
 ╰┳╯ ╰━━┳╯F A S I L I T O\n\
  ╰╮ ┳━━╯ \n\
 ▕▔▋ ╰╮╭━╮ \n\
╱▔╲▋╰━┻┻╮╲╱▔▔▔╲\n\
▏  ▔▔▔▔▔▔▔  O O┃\n\
╲╱▔╲▂▂▂▂╱▔╲▂▂▂╱\n\
 ▏╳▕▇▇▕ ▏╳▕▇▇▕\n\
 ╲▂╱╲▂╱ ╲▂╱╲▂╱")
                break;
            default:
                message.channel.send("No tenemos ningún `"+words[0]+"` en la base de datos.");
                return;
        }
        message.delete();
    }
}