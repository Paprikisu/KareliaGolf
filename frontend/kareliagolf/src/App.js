import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import axios from 'axios'

//Base URL, backendin osoite
const baseUrl = "http://localhost:3001/api/users"
const loginUrl = "http://localhost:3001/api/login"

//============================================================================
//GET AND POST THINGS
//============================================================================
const getAllUsers = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const postUser = (newUserObject) => {
  const request = axios.post(baseUrl, newUserObject)
  console.log("Posting user")
  return request.then(response => response.data)
}

//============================================================================
//Main app
//============================================================================
const App = () => {

  const [userList, setUserList] = useState([])
  const [newEmail, setNewEmail] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  //============================================================================
  //Event handlerit käyttäjänimen ja salasanan päivittämiseen ruudulle
  //sitä mukaa kuin niitä kirjoitetaan
  //============================================================================
  const emailFieldHandler = (event) => {
    console.log("changing email")
    setNewEmail(event.target.value)
  }

  const usernameFieldHandler = (event) => {
    setNewUsername(event.target.value)
  }

  const passwordFieldHandler = (event) => {
    setNewPassword(event.target.value)
  }

  //============================================================================
  //Uuden käyttäjän luominen
  //============================================================================
  const registerUser = (event) => {
    event.preventDefault()
    console.log("Button pressed")
    //Luodaan olio syötettyjen lomaketietojen perusteella
    const newUserCredentials = {
      email: newEmail,
      username: newUsername,
      password: newPassword,
    }

    postUser(newUserCredentials).then(returnedUser => {
      setNewEmail('')
      setNewUsername('') 
      setNewPassword('')   
    })

  }

  //============================================================================
  //Sivuston rakenne
  //============================================================================
  return (
    <div>      
      <h1>Karelia Golf ajanvaraus</h1>
      <h2>Rekisteröityminen</h2>
      <form onSubmit={registerUser}>
        <h3>Sähköposti</h3>
        <input
          value={newEmail}
          onChange={emailFieldHandler}
        />
        <h3>Käyttäjänimi</h3>
        <input
          value={newUsername}
          onChange={usernameFieldHandler}
        />
        <h3>Salasana</h3>
        <input
          value={newPassword}
          onChange={passwordFieldHandler}
        />
        <br/>
        <button type="submit">Rekisteröidy</button>
      </form>
    </div>
  )
}

const UserListElement = (props) => {
  return (
    <li>{props.content}</li>
  )
}

export default App;
