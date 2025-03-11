import { useState } from 'react'
import FilmPage from './components/FilmPage';
import LoginForm from './components/Login';
import { fetchExternalData } from './data/dataAccess.ts'
import './App.css'

//Separar componentes
//Mirar error listas


export default function App() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('') 
  const DATA = fetchExternalData()
  
  return (
    <main>
      {logged ? (
        <FilmPage logOut={() => setLogged(false)} username={username} data={DATA}/>
        ) : (
        <LoginForm logIn={() => setLogged(true)} getUser={(s:string) => setUsername(s)}/>
        )}
    </main>
  )
}