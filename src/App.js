import React from 'react';
import logo from './logo.svg';

import LoginPage from './LoginPage'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './Registration';
import Reservation from './Reservation';
import Home from './Home'
import Header from './Header/Header';

function App() {
  return (

    <Router>
        <div className="App">
          <Routes>

            <Route path="/" element ={[<LoginPage />]} />

            <Route path="/register"  element ={[<Registration />]} />

            <Route path="/reservation"  element ={[<Reservation />]} />

            <Route path="/home"  element ={[<Home />]} />

            <Route path="/sisahalli"  element ={[<sisahalli />]} />

            <Route path="/simulaatio"  element ={[<simulaatio />]} />

          </Routes>

      



      
      
        </div>
    </Router>
  );
}

export default App;
