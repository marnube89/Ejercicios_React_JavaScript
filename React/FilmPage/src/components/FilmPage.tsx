import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal';

import filmImage from '../assets/filmImage.jpeg'
import { Film } from '../hooks/useFilms.ts';
import { useFilms } from '../hooks/useFilms.ts';
import '../App.css'



export default function FilmPage({logOut, username}: {logOut: () => void; username: string}){
  const {error, films} = useFilms();  

  if (error) return <ErrorModal title='Error de conexion' body={error.message}/>

  return (<MainFilmPage logOut={logOut} username={username} films={films}/>)
}

//mirar errorboundaries | componentDidCatch

function MainFilmPage({logOut, username, films}: {logOut: () => void; username: string, films: Film[]}) {
  const [order, setOrder] = useState(true);
       
  return (
    <div className='filmPage'>
      <header>
        <User username={username} />
        <Button onClick={() => logOut()}>Log Out</Button>
      </header>
      <div className='listBody'>
        <OrderListMenu setOrder={setOrder} />
        <CardList films={orderFilms(order, films)} />
      </div>
    </div>
  )
}

function ErrorModal({title, body}: {title: string, body: string}){
  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ body }</Modal.Body>
    </Modal>
  )
}

function orderFilms(order: boolean, films: Array<Film>){
  return order 
  ? films.slice().sort((a, b) => a.date.valueOf() - b.date.valueOf()) 
  : films.slice().sort((a, b) => b.date.valueOf() - a.date.valueOf())
}

//Usuario e icono de usuario
function User({ username }: { username:string }){
  return(
    <div className='user'>
      <div className='pfpImage'></div>
      <p>{ username }</p>
    </div>
  )
}

//Menu de ordenacion
function OrderListMenu({ setOrder }: { setOrder: (isAsc: boolean) => void; }){
  const [orderType, setOrderType] = useState(true);
  const asc = 0
  const des = 1

  return (
    <div className='orderMenu'>
      <Button onClick={() => setOrder(orderType)}>Ordenar</Button>
      <Form.Select onChange={(event) => {
        let value = event.target.value 
        setOrderType(Number(value) === asc)
      }}>
        <option value={asc}>Ascendente</option>
        <option value={des}>Descendente</option>
      </Form.Select>
    </div>
  )
}

//Modal que muestra la snopsis de la pelicula
function FilmDescriptionModal({filmDesc, filmTitle}: {filmDesc: string, filmTitle: string}){
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>Ver Descripcion</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>{ filmTitle }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{ filmDesc }</p>
          <Button variant='secundary' onClick={() => setShow(false)} className='modal-close'>Cerrar</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}


//Tarjeta de info de pelicula
function FilmCard( {title, info, description} : { title: string; info: string; description: string }){
  return (
    <Card>
      <Card.Img src={filmImage}/>
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text>{ info }</Card.Text>
        <FilmDescriptionModal filmDesc={ description } filmTitle={ title }/>
      </Card.Body>
    </Card>
  )
}

//Lista de tarjetas
function CardList({ films }: { films: Film[] }){
  
  return (<ul>{ 
    films.map(film => {
      //El key indica al programa la clave de cada valor de una lista
      return <li key={film.id}>
        <FilmCard 
          title= { film.title } 
          description= { film.description } 
          info= { `Director: ${film.director}\nFecha: ${film.date}` } 
        />
      </li>
    })
    }</ul>)
}

