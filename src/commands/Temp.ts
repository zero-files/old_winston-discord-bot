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

    private __normalize(str){
        return str
            .replace(/ /g,"%20")
            .normalize("NFD")
            .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
            .normalize();
    }

    private __replaceIcon(icon)
    {
        switch(icon){
            case "01d":
            case "01n":
                return ":sunny";
            case "02d":
            case "02n":
                return ":partly_sunny";
            case "03d":
            case "03n":
                return ":white_sun_cloud";
            case "04d":
            case "04n":
                return ":cloud";
            case "09d":
            case "09n":
                return ":cloud_rain";
            case "10d":
            case "10n":
                return ":white_sun_rain_cloud";
            case "11d":
            case "11n":
                return ":cloud_lightning";
            case "13d":
            case "13n":
                return ":snowflake";
            case "50d":
            case "50n":
                return ":fog";
        }
        return ":desgracia:";
    }

    public executed(message:Message, ...words:string[]):void {
        let country = words.pop( );
        let city = this.__normalize( words.join( " " ) );
        if(!city) {
            message.channel.send("Indica el nombre de la ciudad.");
        } else if(!country) {
            message.channel.send("Indica el nombre del país.");
        } else {
            axios.get(  `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=es&units=metric&appid=${API_KEY}` )
                .then(response => {
                    const data = response.data;

                    if(data["cod"] === 200 ) {
                        let icon = this.__replaceIcon( data["weather"][0]["icon"] );
                        //let icon = "http://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + "@2x.png";
    
                        let description = this.__capitalize( data["weather"][0]["description"] );
                        let temp = data["main"]["temp"];
                        let temp_min = data["main"]["temp_min"];
                        let temp_max = data["main"]["temp_max"];
                        message.channel.send(`> ${icon}: En *${data.name}* (${data.sys.country}) hay __${description}__ con una temperatura de ${temp}°C sobre (${temp_min}°C, ${temp_max}°C)`);
                    } else {
                        message.channel.send(`La ciudad \`${city}\` no ha sido encontrada.`);
                    }
                })
                .catch(e => {
                    if(e.response.data["cod"] === "404"){
                        message.channel.send(`La ciudad \`${city}\` no ha sido encontrada.`);
                        return;
                    }
                    message.channel.send("No puedo consultar el tiempo en este momento...");
                    console.error(e);
                });
        }
    }
}
