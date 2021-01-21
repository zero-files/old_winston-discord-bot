import { Message } from "discord.js";
import Command from "../bot/Command";
import axios from "axios";

export default class SMN extends Command {
    readonly name = "smn"
    readonly description = "Muestra el tiempo de alguna ciudad Argentina según el Servicio Meteorológico Nacional Argentino."
    private query_attempts = 0

    private normalize(str:string){
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
            .normalize();
    }

    public executed(message:Message, ...words:string[]):void {
        const city = words.join();

        if(!city){
            message.channel.send("Indica el nombre de la ciudad.");
        } else {
            axios.get("https://ws.smn.gob.ar/map_items/weather")
                .then(response => {
                    const cities = JSON.parse(JSON.stringify(response.data, ["name", "province", "weather", "temp", "st"]));
                    const city_weather = cities.find(city_weather => {
                        return (this.normalize(city_weather.name) === this.normalize(city));
                    });

                    if(city_weather){
                        message.channel.send(`En ${city_weather.name} (${city_weather.province}), hace ${city_weather.weather.st || city_weather.weather.temp}°C`);
                        this.query_attempts = 0;

                    } else {
                        this.query_attempts++;
                        if(this.query_attempts === 5){
                            this.query_attempts = 0;
                            message.channel.send("Por favor, solo ciudades argentinas.");

                        } else {
                            message.channel.send(`La ciudad \`${city}\` no ha sido encontrada.`);
                        }
                    }
                })
                .catch(() => {
                    message.channel.send("No puedo consultar el tiempo en este momento...");
                });
        }
    }
}
