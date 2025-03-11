import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal';

import filmImage from '../assets/filmImage.jpeg'
import '../App.css'


//Usuario e icono de usuario
function User(props: { username:string; }){
  return(
    <div className='user'>
      <div className='peloto'></div>
      <p>{ props.username }</p>
    </div>
  )
}

//Menu de ordenacion
function OrderListMenu(props: { setOrder: (b: boolean) => void; }){
  const [orderType, setOrderType] = useState(true);

  return (
    <div className='orderMenu'>
      <Button onClick={() => props.setOrder(orderType)}>Ordenar</Button>
      <Form.Select onChange={(event) => {
        let value = event.target.value 
        setOrderType(Number(value) === 0)
      }}>
        <option value={0}>Ascendente</option>
        <option value={1}>Descendente</option>
      </Form.Select>
    </div>
  )
}

//Modal que muestra la snopsis de la pelicula
function FilmModal(props: {filmDesc: string, filmTitle: string}){
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>Ver Descripcion</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>{ props.filmTitle }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{ props.filmDesc }</p>
          <Button variant='secundary' onClick={() => setShow(false)} className='modal-close'>Cerrar</Button>
        </Modal.Body>
      </Modal>
    </>
  )

}


//Tarjeta de info de pelicula
function FilmCard( props : { title: string; info: string; description: string }){
  const [checked, setChecked] = useState(false)
  return (
    <Card>
      <Card.Img src={filmImage}/>
      <Card.Body>
        <Card.Title>{ props.title }</Card.Title>
        <Card.Text>{ props.info }</Card.Text>
        <Form.Check onChange={() => setChecked(!checked)} checked={ checked }/>
        <FilmModal filmDesc={ props.description } filmTitle={ props.title }/>
      </Card.Body>
    </Card>
  )
}

//Lista de tarjetas
function CardList(props: { order: boolean; DATA: any[]}){
  let orderedFilms = props.order ? props.DATA.slice().sort((a, b) => Date.parse(a.release_date as string) - Date.parse(b.release_date as string)) : props.DATA.slice().sort((a, b) => Date.parse(b.release_date as string) - Date.parse(a.release_date as string))

  //El as string obliga a la variable a que se lea solo como string

  //Ordenar antes de mapear los elementos
  //props.order ? orderedCards.sort((a, b) => Date.parse(a.key as string) - Date.parse(b.key as string)) : orderedCards.sort((a, b) => Date.parse(b.key as string) - Date.parse(a.key as string))

//Ver por no hacer esto

  // if(order){
  //   //Ascendente
  //   cards.sort()
  // }else{
  //   //Descendente
  //   cards.sort().reverse()
  // }

  return (<ul>{ 
    orderedFilms.map(film => {
      //El key indica al programa la clave de cada valor de una lista
      return <li key={film.episode_id}>
        <FilmCard 
          title= { film.title } 
          description= { film.opening_crawl } 
          info= { `Director: ${film.director}\nFecha: ${film.release_date}` } 
        />
      </li>
    })
    }</ul>)
}

export default function FilmPage(props: {logOut: () => void; username: string; data: any[]}){
    const [order, setOrder] = useState(true);
  
    return (
      <div className='filmPage'>
        <header>
          <User username={ props.username }/>
          <Button onClick={() => props.logOut()}>Log Out</Button>
        </header>
        <div className='listBody'>
          <OrderListMenu setOrder={(b:boolean) => setOrder(b)}/>
          <CardList order={order} DATA={props.data}/>
        </div>
      </div>
    )
  }