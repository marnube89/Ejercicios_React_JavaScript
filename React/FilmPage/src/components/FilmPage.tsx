import { useState } from 'react'
import filmImage from '../assets/filmImage.jpeg'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal';

//import fetchData from '../data/dataAccess'
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
  return (
    <Card>
      <img src={filmImage}/>
      <Card.Body>
        <Card.Title>{ props.title }</Card.Title>
        <Card.Text>
          { props.info }
        </Card.Text>
        <FilmModal filmDesc={ props.description } filmTitle={ props.title }/>
      </Card.Body>
    </Card>
  )
}

//Lista de tarjetas
function CardList(props: { order: boolean; DATA: any[]}){
  const cards = props.DATA.map(value => {
    //El key indica al programa la clave de cada valor de una lista
    return <li key= { value.release_date }>
      <FilmCard 
        title= { value.title } 
        description= { value.opening_crawl } 
        info= { `Director: ${value.director}\nFecha: ${value.release_date}` } 
      />
    </li>
  })
  let orderedCards = cards.slice()

  //El as string obliga a la variable a que se lea solo como string
  props.order ? orderedCards.sort((a, b) => Date.parse(a.key as string) - Date.parse(b.key as string)) : orderedCards.sort((a, b) => Date.parse(b.key as string) - Date.parse(a.key as string))

//Ver por no hacer esto

//Posible respuesta:
//Primero se podria resumir en una operacion ternaria como la de ariba
//Segundo, aqui estamos mutando directamente el array original ademas de que no le estamos pasando un criterio de ordenacion
//Tercero, el reverse no ordena con un criterio inverso, si no que le da la vuelta a todo el array

  // if(order){
  //   //Ascendente
  //   cards.sort()
  // }else{
  //   //Descendente
  //   cards.sort().reverse()
  // }

  return (<ul>{ orderedCards }</ul>)
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