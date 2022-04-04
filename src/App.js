import React from 'react';
import logo from './logo.svg';

import LoginPage from './LoginPage'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './Registration';

function App() {
  return (

    <Router>
        <div className="App">
          <Routes>

            <Route path="/" element ={[<LoginPage />]} />

            <Route path="/register"  element ={[<Registration />]} />




          </Routes>

      



      
      
        </div>
    </Router>
  );
}

export default App;
