import { Message } from "discord.js";
import Command from "../bot/Command";
import GoogleImages from "google-images";
import {URL} from "url";

export default class ImageSearch extends Command {
    readonly name = "img"
    readonly description = "Buscador de imágenes en google."
    private google_images:GoogleImages;
    private responses = [
        "No creo poder encontrar lo que pedides.",
        "No, creo que no hay nada de eso.",
        "Qué imagen más específica pedís.",
        "Pides cosas que no puedo encontrar.",
        "Hmmm creo que solo hay paigeeworlds como resultado."
    ]
    private banned_urls:string[] = ["lookaside.fbsbx.com", "i.paigeeworld.com", "i.ytimg.com", "cloudfront.net", "www.movistarplus.es"]

    constructor(engine_id: string, api_key: string){
        super();
        this.google_images = new GoogleImages(engine_id, api_key);
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
            this.google_images.search(query)
                .then(images => {
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
                .catch(() => {
                    const response = this.random_response(this.responses);
                    message.channel.send(response);
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
