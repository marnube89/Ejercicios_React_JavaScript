import { useState } from 'react'
import FilmPage from './components/FilmPage';
import LoginForm from './components/Login';

import './App.css'


export default function App() {
  const [username, setUsername] = useState('') 
  const logged = username.length > 0
  
  return (
    <main>
      {logged ? (
        <FilmPage logOut={() => setUsername('')} username={username}/>
        ) : (
        <LoginForm setUsername={setUsername}/>
        )}
    </main>
  )
}