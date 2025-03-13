import { useEffect, useState } from 'react'
import data from '../data/films.json'

//Ejercicio 1
export function fetchData(){
    return data
}

//Tipo de datos que saco de la api
export type FilmData = {
    episode_id: string,
    title: string,
    opening_crawl: string,
    director: string,
    release_date: string
}

//Tipo de datos que va a usar la aplicacion
export type Film = {
    id: string,
    title: string,
    description: string,
    director: string,
    date: Date
}

type FilmDataArray = { results: Array<FilmData> }

//Ejercicio 2
export function useFilms(){
    const [films, setFilms] = useState<Array<Film>>([])
    const [error, setError] = useState<Error>()

    useEffect(() => {
        fetch('https://swapi.dev/api/films')
            .then(res => {
                if(!res.ok){
                    throw new Error(`No se encontraron los datos: error ${res.status}`);
                } 
                return res.json(); 
            })
            .then((data: FilmDataArray) => {setFilms(data.results.map((film) => {
                let formatedFilm: Film = {id: film.episode_id, title: film.title, description: film.opening_crawl, date: new Date(film.release_date as string),  director: film.director}
                return formatedFilm;
            }))})
            .catch((error: unknown) => {
                console.dir(error)
                error instanceof Error ? setError(error) : setError(new Error('Ocurrio un error inesperado'))
            }) 
    },[])


    return {films, error}
    
}