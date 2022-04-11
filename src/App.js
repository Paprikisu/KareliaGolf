import React, { useEffect } from 'react';
import logo from './logo.svg';

import LoginPage from './LoginPage'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './Registration';
import Reservation from './Reservation';
import Home from './Home'
import Header from './Header/Header';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads

    // Vain testausta varten --- Poista ennen käyttöönottoa
    auth.onAuthStateChanged(authUser => {
      console.log('käyttäjä on >> ', authUser)

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (

    <Router>
        <div className="App">
          <Routes>

            <Route path="/" element ={[<LoginPage />]} />

            <Route path="/register"  element ={[<Registration />]} />

            <Route path="/reservation"  element ={[<Reservation />]} />

            <Route path="/home"  element ={[<Header/>, <Home />]} />

            <Route path="/sisahalli"  element ={[<sisahalli />]} />

            <Route path="/simulaatio"  element ={[<simulaatio />]} />

          </Routes>

      



      
      
        </div>
    </Router>
  );
}

export default App;
