const {RichEmbed} = require("discord.js")
import Command from "../utils/Command"
const {bot} = require('../index')

var getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1)+sub1.length;
        var string1 = this.string.substr(0,SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        }
        else return;
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
};
Array.prototype.remove = function(element){ let i = this.indexOf(element); if(i != -1) this.splice(i, 1) }
String.prototype.remove = function(searchWord){
    var str = this;
    var n = str.search(searchWord);
    while(str.search(searchWord) > -1){
        n = str.search(searchWord);
        str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
    }
    return str;
}
String.prototype.flup = function(){ return this.charAt(0).toUpperCase() + this.slice(1); }
Array.prototype.random = function() { return this[Math.floor(Math.random() * this.length)] }

class Interval {
    constructor(serverid, channelid, name, time, contents){
        this.name = name
        this.time = time
        this.contents = contents
        this.channelid = channelid
        this.serverid = serverid
    }
    start(){ 
        this[this.name] = setInterval(() => {
            let guild = bot.bot.guilds.find(guild => guild.id === this.serverid)
            let channel = guild.channels.find(channel => channel.id === this.channelid)
            
            channel.send(this.contents.random())
        }, (this.time * 1000) * 60)
    }
    finish(){ 
        clearInterval(this[this.name])
    }
}


const intervaler = new Command({
    name: "Intervaler",
    trigger: "setinterval",
    author: "Minienzoo",
    description: "Permite setear intervals",
    parameters: [
        {
            name: "time",
            description: "Intervalo entre mensaje y mensaje"
        },
        {
            name: "name",
            description: "Nombre del interval"
        },
        {
            name: "contents",
            description: "Contentidos del interval"
        }
    ],
    category: "utility"
})

var intervals = {}

intervaler.setCommand((message, ...params)=>{
    if(!params.length) return message.channel.send("Debes colocar todos los parámetros")
                    
    let contents = getFromBetween.get(message.content, "[", "]")
    if(!contents.length) return message.channel.send("Como tercer parámetro, debes escribir el contenido del evento entre corchetes [].")
    contents = contents.filter(content => content)

    let joinparams = params.join(" ")
    try{
        contents.forEach(content => joinparams = joinparams.remove(content))
    } catch {
        return message.channel.send("Ha ocurrido un error, posiblemente en la sintáxis del comando.")
    }
    params = joinparams.split(" ")
    params = params.filter(param => param.indexOf("[") == -1 || param.indexOf("]") == -1)

    let name, time
    
    if(Number(params[0])){ time = Number(params[0]); params.remove(params[0])}
    else if(Number(params[1])){ time = Number(params[1]); params.remove(params[1])}
    if(!time) return message.channel.send("Debes declarar, como segundo parámetro, cada cuántos minutos debe repetirse el evento.")
    
    name = params[0]
    if(!name) return message.channel.send("Como primer parámetro, debes ponerle un nombre al evento.")
    
    if(time <= 0.5) return message.channel.send("No puedo enviar mensajes a esa velocidad.")
    
    if(name && time && contents){
        if(!intervals[message.channel.id]) intervals[message.channel.id] = {}
        intervals[message.channel.id][name] = new Interval(message.guild.id, message.channel.id, name, time, contents)
        intervals[message.channel.id][name].start()
        
        message.channel.send(`El evento '${name.flup()}' ha inicado correctamente. Previsualización: `)
        message.channel.send(contents.random())
        
        //await db.put.intervals(message.guild.id, message.channel.id, name, time, contents)
        return
    } else return message.channel.send("Ha ocurrido un error, posiblemente en la sintáxis del comando.")
})

module.exports = intervaler