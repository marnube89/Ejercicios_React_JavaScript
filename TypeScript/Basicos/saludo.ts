function saludo(nombre: string, fecha: Date){
    console.log(`Saludos ${nombre}, hoy es ${fecha.toDateString()}!`);
}

saludo("Mario", new Date());