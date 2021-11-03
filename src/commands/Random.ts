import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Random extends Command {
    readonly name = "random"
    readonly description = "Random"

    public executed(message:Message):void {
        let verbs, nouns, adjectives, adverbs, preposition;
            nouns = ["pájaro", "reloj", "chico", "plástico", "pato", "profesor", "abuela", "camiseta", "hámster", "perro"];

            verbs = ["pateó", "corrió", "voló", "esquivó", "rebanó", "rodó", "murió", "respiró", "durmió", "mató"];
            adjectives = ["guap@", "loc@", "profesional", "enamoradiz@", "vag@", "ásper@", "suave", "caliente", "vibrante", "babos@"];
            adverbs = ["despacio", "elegantemente", "precisamente", "rápido", "tristemente", "humildemente", "orgulloso", "impactante", "calmado", "apasionadamente"];
            preposition = ["abajo "," hacia "," arriba "," sobre "," sobre "," abajo "," arriba "," a través "," a través "," hacia "];

        function sentence() {
            let rand1 = Math.floor(Math.random() * 10);
            let rand2 = Math.floor(Math.random() * 10);
            let rand3 = Math.floor(Math.random() * 10);
            let rand4 = Math.floor(Math.random() * 10);
            let rand5 = Math.floor(Math.random() * 10);
            let rand6 = Math.floor(Math.random() * 10);
            //                let randCol = [rand1,rand2,rand3,rand4,rand5];
            //                let i = randGen();
            let content = "El " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + verbs[rand4] + " porque algun@s " + nouns[rand1] + " " + adverbs[rand1] + " " + verbs[rand1] + " " + preposition[rand1] + " a " + adjectives[rand2] + " " + nouns[rand5] + " el cual, se convirtió a " + adjectives[rand3] + ", " + adjectives[rand4] + " " + nouns[rand6] + ".";
            return content;
        }
        message.channel.send( `> _${sentence( )}_` );
    }
}