import './app.css'
import { useState } from 'react';


function Casilla ({ valor, funEstado }){
    return (
        <button className="casilla" onClick={funEstado}>{valor}</button>
    )
}

function Reset ({ fun }){
    return(
        <button className='reset' onClick={fun}>Reiniciar</button>
    )
}

export function App (){
    const [isPlayerX, setIsPlayerX] = useState(true);
    const [tablero, setTablero] = useState(Array(9).fill(null))
    let frase = 'Jugador: X'

    function reinicio(){
        const tableroLimpio = Array(9).fill(null);
        setTablero(tableroLimpio)
        frase = 'Jugador: X'
        setIsPlayerX(true)
    }

    function calculoGanador(){
        const jugadas = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for (let i = 0; i<jugadas.length; i++){
            const [a,b,c] = jugadas[i];
            if(tablero[a] && tablero[a]===tablero[b] && tablero[b]===tablero[c]){
                return tablero[a];
            }
        }
        return null;

    }

    function cambioEstado (i){
        const nextCasillas = tablero.slice();
        
        if(calculoGanador(tablero) || nextCasillas[i]){
            return
        }

        if(isPlayerX){
            nextCasillas[i] = 'X'
        }else{
            nextCasillas[i] = 'O'
        }
        setTablero(nextCasillas)
        setIsPlayerX(!isPlayerX)
        
    }

    const ganador = calculoGanador(tablero);
    if(ganador){
        frase = `Ganador: ${ ganador }`
    }else{
        frase = isPlayerX ? 'Jugador: X' : 'Jugador: O'
    }

    return (
        <>
            <p className='titulo'>{ frase }</p>
            <br />
            <div className="filaTablero">
                <Casilla valor={tablero[0]} funEstado= { () => cambioEstado(0) }></Casilla>
                <Casilla valor={tablero[1]} funEstado= { () => cambioEstado(1) }></Casilla>
                <Casilla valor={tablero[2]} funEstado= { () => cambioEstado(2) }></Casilla>
            </div>
            <div className="filaTablero">
                <Casilla valor={tablero[3]} funEstado= { () => cambioEstado(3) }></Casilla>
                <Casilla valor={tablero[4]} funEstado= { () => cambioEstado(4) }></Casilla>
                <Casilla valor={tablero[5]} funEstado= { () => cambioEstado(5) }></Casilla>
            </div>
            <div className="filaTablero">
                <Casilla valor={tablero[6]} funEstado= { () => cambioEstado(6) }></Casilla>
                <Casilla valor={tablero[7]} funEstado= { () => cambioEstado(7) }></Casilla>
                <Casilla valor={tablero[8]} funEstado= { () => cambioEstado(8) }></Casilla>
            </div>
            <Reset fun={() => reinicio()}/>
        </>
    )
}