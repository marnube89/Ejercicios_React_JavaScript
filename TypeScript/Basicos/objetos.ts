//En caso de que queramos que el objeto que recibamos dentro de nuestra funcion sea opcional, 
//pondremos un ? a lado del nombre del atributo
function saluDos(persona: { nombre: string; apellido?: string}){
    if (persona.apellido !== undefined){
        console.log(`${persona.nombre} se apellida ${persona.apellido}`)
    }else{
        console.log(`${persona.nombre} no tiene apellido`)
    }
}

//Al declarar un objeto nuevo, podremos declarar sus propiedades de la siguiente manera
const persona1 = {nombre: "Mario", apellido: "Yusta"}
const persona2 = {nombre: "Pepe"}

//En este caso persona2 no tiene el atributo de apellido, al entrar en la funcion el apellido se asignara 
//automaticamente para ser "undefined" que es la manera que tiene ts para decir que es nulo o no tiene valor

saluDos(persona1);
saluDos(persona2);