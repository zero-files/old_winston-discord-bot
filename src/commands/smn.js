import Command from "../utils/Command"
import axios from "axios"

const smn = new Command({
    name: "SMN Ar",
    trigger: "smn",
    author: "Minienzoo",
    description: "Muestra el tiempo de alguna ciudad Argentina según el Servicio Meteorológico Nacional Argentino.",
    parameters: [{
        name: "city",
        description: "Nombre de la ciudad Argentina."
    }],
    category: "search"
})

/**
 * @param {string} str 
 * @returns {string}
 */
function normalize(str){
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
        .normalize()
}

let wrong = 0

smn.setCommand(async (message, ...city) => {
    city = city.join(" ")
    if(!city) return message.channel.send("Indica el nombre de la ciudad.")

    let smndata = await axios.get("https://ws.smn.gob.ar/map_items/weather")
        .then(response => response.data)
        .catch(() => undefined)
    
    if(!smndata) return message.channel.send("Ha ocurrido un error al buscar la información. ")
    
    /** @type {{name:string,province:string, weather:{temp:number, st:number|null}}[]} */
    let weather = JSON.parse(JSON.stringify(smndata, ["name", "province", "weather", "temp", "st"], 2))

    let cityweather = weather.find(wcity => normalize(wcity.name) === normalize(city))

    if(!cityweather) {
        wrong++
        if(wrong === 5){
            wrong = 0
            return message.channel.send("Por favor, solo ciudades argentinas.")
        }
        return message.channel.send(`La ciudad '${city}' no ha sido encontrada.`)  
    }
    wrong = 0
    return message.channel.send(`En ${cityweather.name} (${cityweather.province}), hace ${cityweather.weather.st || cityweather.weather.temp}°C`)
})

module.exports = smn