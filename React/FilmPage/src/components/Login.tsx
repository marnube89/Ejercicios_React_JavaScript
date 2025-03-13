import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../App.css'

export default function LoginForm({setUsername}: {setUsername: (name: string) => void;}){
    const [user, setUser] = useState('');
    return (
        <div className='loginBackground'>
            <Form className='formulario' onSubmit={() => {setUsername(user)}}>
                <h2 className='loginTittle'>Inicio de sesion</h2>
                <Form.Group className='group1' controlId='user'>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type='text' placeholder='User' value={user} required onChange={(event)=>setUser(event.target.value)}/>
                    <Form.Text>Introduce tu nombre de usuario</Form.Text>
                </Form.Group>
                <Form.Group className='group2' controlId='contraseña'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='Password' required/>
                </Form.Group>
                <Button className='loginButton' type='submit'>Iniciar sesion</Button>
            </Form>
        </div>
    )
}



