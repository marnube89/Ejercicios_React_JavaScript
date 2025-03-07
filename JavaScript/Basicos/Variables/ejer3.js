let a = 1

function funA (){
    a = 3
}
funA()
console.log(a)

//Si modifica la variable

/*
const b = 1

function funA (){
    b = 3
}
funA()
console.log(b)
*/
//No modifica la variable

/*
for (let i = 0; i<10; i++){
    console.log(i);
    
}
console.log(i);
*/
//No muestra la variable


for (const i = 0; i<10; i++){
    console.log(i);
    
}
console.log(i);
//No puede alterar una constante