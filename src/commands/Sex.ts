import { Message } from "discord.js";
import Command from "../bot/Command";

export default class Sex extends Command {
    readonly name = "sex"
    readonly description = "Frases"

    #frases: Array<string> = [ 
        "Pero yo os digo que todo el que mire a una mujer para codiciarla ya cometió adulterio con ella en su corazón.",
        "Cuando la mujer vio que el árbol era bueno para comer, y que era agradable a los ojos, y que el árbol era deseable para alcanzar sabiduría, tomó de su fruto y comió; y dio también a su marido que estaba con ella, y él comió.",
        "Porque todo lo que hay en el mundo, la pasión de la carne, la pasión de los ojos y la arrogancia de la vida, no proviene del Padre, sino del mundo.",
        "Porque mientras estábamos en la carne, las pasiones pecaminosas {despertadas} por la ley, actuaban en los miembros de nuestro cuerpo a fin de llevar fruto para muerte.",
        "¿O no sabéis que los injustos no heredarán el reino de Dios? No os dejéis engañar: ni los inmorales, ni los idólatras, ni los adúlteros, ni los afeminados, ni los homosexuales, ni los ladrones, ni los avaros, ni los borrachos, ni los difamadores, ni los estafadores heredarán el reino de Dios.",
        "Por tanto, considerad los miembros de vuestro cuerpo terrenal como muertos a la impureza, las pasiones, los malos deseos y la avaricia, que es idolatría.",
        "Pues los que son de Cristo Jesús han crucificado la carne con sus pasiones y deseos.",
        "Huye, pues, de las pasiones juveniles y sigue la justicia, la fe, el amor {y} la paz, con los que invocan al Señor con un corazón puro.",
        "Amados, os ruego como a extranjeros y peregrinos, que os abstengáis de las pasiones carnales que combaten contra el alma.",
        "Porque todo lo que hay en el mundo, la pasión de la carne, la pasión de los ojos y la arrogancia de la vida, no proviene del Padre, sino del mundo."
    ];
    public executed(message:Message):void {
        message.channel.send( `> _${this.random_response( this.#frases )}_` );
    }
}