import React from 'react'
import "./Header.css"
import {Navigate, useNavigate} from 'react-router-dom';
import {NavLink,Link} from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import Button from '@mui/material/Button';


// Kuvake importit -----------
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {iconsmaterial} from '@mui/icons-material';
import circularProgressClasses from '@mui/material';



function Header() {

  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();




  //Navigoi toiselle sivulle
  const goToProfile = e => {
    navigate('/account_management')
  }
  const goToMain = e => {
    navigate('/home')
  }
  const goToHalli = e => {
    navigate('/reservation')
  }
  // Kirjaudu ulos
  const handleAuthentication = () => {
    if (user) {
        auth.signOut();
        navigate('/')
        
    }
}

//Navigation bar responsiivisuus toiminnallisuus
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav_links');
  const navLinks = document.querySelectorAll('.nav_links li');
  
  
  burger.addEventListener('click', () => {
      
      //toggle nav
      nav.classList.toggle('nav-active');

      //animate links
      navLinks.forEach((link, index) => {
          if(link.style.animation) {
              link.style.animation = '';
          
          }else{
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
          }
          
      });
      //burger animation
      burger.classList.toggle('toggle');
  });

}



  return (
    <nav class="navbar">

        <ul class="nav_links">
            <Button onClick={goToMain} variant="text" endIcon={<HomeIcon />}> Pääsivu </Button>
            <div className='dropdown' >
              <Button variant="text" endIcon={<DateRangeIcon />}> Ajanvaraus </Button>
                <ul>
                  <li onClick={goToHalli}><a href="#">Sisähalli</a></li>
                  <li onClick={goToHalli}><a href="#">Simulaatio</a></li>
                </ul>
            </div>
            <div className='dropdown' >
              <Button variant="text" endIcon={<AccountCircleIcon />}> {user ? user.email.slice(0, user.email.indexOf('@')) : ""} </Button>
                <ul>
                  <li onClick={goToProfile}><a>Käyttäjänhallinta <SettingsIcon fontSize='@default'/></a></li>
                  <li onClick={handleAuthentication}><a>Kirjaudu Ulos <LogoutIcon fontSize="@default" /></a></li>
                </ul>
            </div>
        </ul>
       
       <div onClick={navSlide} className="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>    
    </nav>
  )
}


export default Header