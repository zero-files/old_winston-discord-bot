import { Message } from "discord.js";
import Command from "../bot/Command";
import axios from "axios";

const API_KEY = "fe19f5c345eca91ce21223666047a8a6";

export default class Temp extends Command {
    readonly name = "temp"
    readonly description = "Muestra el tiempo en cualquier lugar del mundo. !temp [city] [country]"

    private __capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public executed(message:Message, city: string, country: string ):void {
        if(!city)
        {
            message.channel.send("Indica el nombre de la ciudad.");
        }
        else if(!country)
        {
            message.channel.send("Indica el nombre del país.");
        } 
        else
        {
            axios.get(  `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=es&units=metric&appid=${API_KEY}` )
                .then(response => {
                    const data = response.data;

                    if(data["cod"] === "200" )
                    {
                        //let icon = "http://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + "@2x.png";
    
                        let description = this.__capitalize( data["weather"][0]["description"] );
                        let temp = data["main"]["temp"];
                        let temp_min = data["main"]["temp_min"];
                        let temp_max = data["main"]["temp_max"];
                        message.channel.send(`En ${city} (${country}) tiene un tiempo de ${description} con una temperatura de ${temp}°C sobre (${temp_min}, ${temp_max})`);
                    }
                    else
                    {
                        message.channel.send(`La ciudad \`${city}\` no ha sido encontrada.`);
                    }
                })
                .catch(e => {
                    message.channel.send("No puedo consultar el tiempo en este momento...");
                    console.error(e);
                });
        }
    }
}
