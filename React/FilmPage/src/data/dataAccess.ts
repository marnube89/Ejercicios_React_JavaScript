import { useEffect, useState } from 'react'
import data from './films.json'

//Ejercicio 1
export function fetchData(){
    return data
}

export type FilmData = {
    episode_id: string,
    title: string,
    opening_crawl: string,
    director: string,
    release_date: string
}

type filmDataArray = { results: Array<FilmData> }

//Ejercicio 2
export function fetchExternalData(){
    const [data, setData] = useState(new Array<FilmData>())

    //Este useEfect se ejecuta una vez al montarse la web
    useEffect(() => {
        fetch('https://swapi.dev/api/films')
            .then(res => res.json())
            .then((data: filmDataArray) => setData(data.results))
    },[])

    return data
    
}