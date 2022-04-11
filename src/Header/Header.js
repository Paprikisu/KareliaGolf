import React from 'react'
import "./Header.css"
import {Navigate, useNavigate} from 'react-router-dom';
import {NavLink,Link} from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {

  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();


  // Kirjaudu ulos
  const handleAuthentication = () => {
    if (user) {
        auth.signOut();
        navigate('/')
        
    }
}

  return (
    <nav class="navbar">
      <h5 className='navbar_userName'> Hei {user ? user.email.slice(0, user.email.indexOf('@')) : ""}</h5>
        <ul class="nav_links">
            <li><a href="#"class="Mainmenubar">Main</a></li>
            <li><a href="#"class="Mainmenubar">Ajanvaraus</a></li>
            <li><a href="#"class="Mainmenubar">About</a></li>
            <li onClick={handleAuthentication}> <a class="Mainmenubar">Kirjaudu ulos</a></li>
        </ul>
        
        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>    
    </nav>
  )
}


export default Header