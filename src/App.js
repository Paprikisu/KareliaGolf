import React, { useEffect } from 'react';


import LoginPage from './LoginPage'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './Registration';
import Reservationhalli from './Reservationhalli';
import Reservationsimulaatio from './Reservationsimulaatio';
import Home from './Home'
import AccountMngPg from './AccountMngPg'
import Header from './Header/Header';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import PasswordReset from './PasswordReset'



function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads

    auth.onAuthStateChanged(authUser => {

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

            <Route path="/home"  element ={[<Header/>, <Home />]} />

            <Route path="/account_management"  element ={[<Header/>, <AccountMngPg />]} />

            <Route path="/sisahalli"  element ={[<Header/>, <Reservationhalli/>]} />

            <Route path="/simulaatio"  element ={[<Header/>, <Reservationsimulaatio />]} />

            <Route path="/passwordReset" element ={[<PasswordReset />]} />


          </Routes>

      



      
      
        </div>
    </Router>
  );
}

export default App;
