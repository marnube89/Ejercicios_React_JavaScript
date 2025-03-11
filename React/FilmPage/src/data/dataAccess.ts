import { useEffect, useState } from 'react'
import data from './films.json'

//Ejercicio 1
export function fetchData(){
    return data
}

//Ejercicio 2
export function fetchExternalData(){
    const [data, setData] = useState(new Array())

    useEffect(() => {
        fetch('https://swapi.dev/api/films')
            .then(res => res.json())
            .then(data => setData(data.results))
    },[])

    return data
    
}