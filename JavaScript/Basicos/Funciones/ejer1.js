// function FuncionClasicaUnParametro(a) {
// return 'Soy a: ' + a;
//      }
const fn1 = (a) => {
    return 'Soy a: ' + a;
    // return `Soy a: ${a}`
}

// function FuncionClasicaDosParametro(a, b) {
//     return 'Soy a: ' + a + ' Soy b:' + b;
//     }
const fn2 = (a,b) => {
    return 'Soy a: ' + a + ' Soy b:' + b;
    // return `Soy a: ${a} Soy b: ${b}`
}

// function FuncionClasicaUnParametroSegundaVersion(a) {
//     var a1 = 'Soy a: ' + a;
//     var a2 = 'Yo soy Manuelillo: ' + a;
    
//     return a1 + a2;
//     }
const fn3 = (a) => {
    var a1 = 'Soy a: ' + a;
    var a2 = 'Yo soy Manuelillo: ' + a;

    // var a1 = `Soy a: ${a}`
    // var a2 = `Yo spy Manuelillo: ${a}`

    return a1 + a2;
}

// function FuncionClasicaDosParametroSegundaVersion(a, b) {
//     var a1 = 'Soy a: ' + a;
//     var a2 = 'Soy b: ' + b;
    
//     return 'aaa' + a1 + 'bbb' + a1 + a2;
//     }
const fn4 = (a,b) => {
    var a1 = 'Soy a: ' + a;
    var b1 = 'Soy b: ' + b;

    // var a1 = `Soy a: ${a}`
    // var b1 = `Soy b: ${b}`

    return 'aaa' + a1 + 'bbb' + a1 + b1;
}

// function FuncionPrueba(a) {
//     var miVariable = FuncionClasicaUnParametro(a);
//     return miVariable;
//     }
const fn5 = (a) => {
    var miVariable = fn1(a);
    return miVariable;
}

// function FuncionPoltergueist(a, b) {

//     var a1 = FuncionClasicaUnParametro(a);
//     var a2 = FuncionClasicaDosParametro(a, b);
//     var a3 = FuncionClasicaDosParametroSegundaVersion(b);
    
//     return 'Blabla' + a1 + ' bleble' + a2 + ' blibli' + a3;
//     }
const fn6 = (a,b) => {
    var a1 = fn1(a);
    var a2 = fn2(a);
    var a3 = fn4(a);

    return 'Blabla' + a1 + 'bleble' + a2 + 'blibli' + a3;
    // return `Blabla ${a1} bleble ${a2} blibli ${a3}`
}

//apartado b
const fn7 = (a,b,c) => {return {a1: a, b1: b, c1: c}}

