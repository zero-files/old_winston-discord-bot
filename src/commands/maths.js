import Command from "../utils/Command"
const math = require("mathjs")

const maths = new Command({
    name: "Maths",
    trigger: "math",
    author: "Mounster Chef",
    description: "Evalúa una expresión matemática",
    parameters: [
        {
            name: "elements",
            description: "Los números y letras a evaluar"
        }
    ],
    category: "maths"
})

maths.setCommand((message, ...elements) => {
    if(!elements.join()) return message.channel.send("No has introducido ninguna expresión") 
    else{
        let formula = elements.join(" ")
        let result
        try {
           result = math.evaluate(formula)
        } catch(e){
          return message.channel.send("No creo que pueda calcular eso.")
        }
      
        return message.channel.send("El resultado es " + result)
    }
})


module.exports = maths