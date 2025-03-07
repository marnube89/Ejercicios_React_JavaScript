import {sumar} from './fichero1';

console.log(sumar(1, 4));

import * as MiModulo from './fichero1';

export default function calculo (a, b){
    return MiModulo.multiplicar(MiModulo.sumar(a,b), MiModulo.pi);
}