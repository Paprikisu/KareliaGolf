import React from 'react';
import logo from './logo.svg';

import LoginPage from './LoginPage'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './Registration';
import Reservation from './Reservation';
import Home from './Home'

function App() {
  return (

    <Router>
        <div className="App">
          <Routes>

            <Route path="/" element ={[<LoginPage />]} />

            <Route path="/register"  element ={[<Registration />]} />

            <Route path="/reservation"  element ={[<Reservation />]} />

            <Route path="/home"  element ={[<Home />]} />




          </Routes>

      



      
      
        </div>
    </Router>
  );
}

export default App;
