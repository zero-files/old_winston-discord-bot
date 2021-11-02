import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Navidad extends Command {
    readonly name = "navidad"
    readonly description = "Frases de Navidad"

    #frases: Array<string> = [ 
        "¡Feliz, feliz Navidad, la que hace que nos acordemos de las ilusiones de nuestra infancia, le recuerde al abuelo las alegrías de su juventud, y le transporte al viajero a su chimenea y a su dulce hogar!",
        "La Navidad no es una temporada, es un sentimiento.",
        "No hay nada como la Navidad para el reencuentro con los seres queridos. Mis mayores deseos de felicidad y unión para ti. Gracias por ser una persona con magia pues logras que la dulzura llegue a cada rincón de mi hogar.",
        "Los mejores deseos y regalos de la Navidad no son materiales, sino personales. Queridos abuelos, os envío mis felicitaciones en estas fechas tan señaladas, para que siempre encontréis mi abrazo sea cual sea la época del año. ¡Feliz Navidad!",
        "Nunca dejes pasar un solo día sin expresar tu amor a los seres queridos. La Navidad es la mejor época para recordar que el año puede estar lleno de momentos felices si no perdemos el espíritu navideño.",
        "La Navidad es el día que une todos los tiempos.",
        "El mejor mensaje de Navidad es el que sale del silencio de nuestros corazones y calienta con ternura los corazones de los que nos acompañan en nuestro viaje por la vida.",
        "Que esta Navidad  sea brillante, traiga alegría, amor y encienda un Año Nuevo lleno de luz y esperanza.",
        "La Navidad es sinónimo de amor… es un momento en que el amor de Dios y de los seres humanos debe prevalecer sobre el odio y la amargura… un momento en que nuestros pensamientos, acciones y el espíritu de nuestras vidas manifiesten la presencia de Dios.",
        "Te deseo una feliz Navidad y un próspero año nuevo, que todos tus objetivos se logren y que disfrutes de tus sueños.",
        "La Navidad comenzó en el corazón de Dios. Pero sólo se completa cuando llega al corazón del hombre."
    ];
    public executed(message:Message):void {
        message.channel.send( `> _${this.random_response( this.#frases )}_` );
    }
}