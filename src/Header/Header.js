import React from 'react'
import "./Header.css"
import {useNavigate} from 'react-router-dom';
import {NavLink,Link} from 'react-router-dom';

function Header() {
  return (
    <nav class="navbar">
        <ul class="nav_links">
            <li><a href="#"class="Mainmenubar">Main</a></li>
            <li><a href="#"class="Mainmenubar">Ajanvaraus</a></li>
            <li><a href="#"class="Mainmenubar">About</a></li>
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