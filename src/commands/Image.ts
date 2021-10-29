import { Message } from "discord.js";
import Command from "../bot/Command";
import GoogleImages from "google-images";
import {URL} from "url";
import axios from "axios";

export default class ImageSearch extends Command {
    readonly name = "image"
    readonly description = "Buscador de imágenes en google."
    private responses = [
        "No creo poder encontrar lo que pides.",
        "No, creo que no hay nada de eso.",
        "Qué imagen más específica pedís.",
        "Pides cosas que no puedo encontrar.",
        "Hmmm creo que solo hay paigeeworlds como resultado."
    ]
    private banned_urls:string[] = ["lookaside.fbsbx.com", "i.paigeeworld.com", "i.ytimg.com", "cloudfront.net", "www.movistarplus.es"]
    #engine_id: string;
    #api_key: string;
    constructor(engine_id: string, api_key: string){
        super();
        this.#engine_id = engine_id;
        this.#api_key = api_key;
    }

    private filter_banned_urls(images:GoogleImages.Image[]){
        return images.filter(image => {
            const url = new URL(image.url);
            return !(this.banned_urls.includes(url.hostname));
        });
    }

    public executed(message:Message, ...words:string[]):void {
        const query = words.join(" ");
        if(query) {
            axios.get( `https://www.googleapis.com/customsearch/v1?key=${this.#api_key}&cx=${this.#engine_id}:omuauf_lfve&q=${query}` )
                .then(response => {
                    let images = response.data.items; // ARRAY
                    images = this.filter_banned_urls(images);

                    if(images.length === 0) {
                        message.channel.send(`No encontré nada para \`${query}\` en internet.`);
                    } else {
                        const random_index = Math.floor((Math.random() * images.length) + 1);
                        const image_selected = images[random_index].url;
                        message.channel.send({files:[image_selected]}).catch(() =>
                            message.channel.send("El enlace obtenido está roto.")
                        );
                    }
                })
                .catch(e => {
                    const response = this.random_response(this.responses);
                    message.channel.send(response);
                    console.error(e);
                });
        }
        else message.channel.send("¿Qué imagen deseas que busque?");
    }
}

// if(images.length === 0) {
//     message.channel.send(`No encontré nada para \`${query}\` en internet.`);
// } else {
//     const random_number = Math.floor((Math.random() * 5) + 1);
//     const image_selected = images[random_number].url;
//     message.channel.send(image_selected);
// }