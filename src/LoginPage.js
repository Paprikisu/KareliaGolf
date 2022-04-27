import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./loginpageStyle.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  // Kirjaudu sisään firebaseen funktio
  const signIn = (e) => {
    e.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .then(auth => {
      navigate('/home')

    })
    .catch(error => alert(error.message))
  };

  return (
    <div className="main">
      <div className="login_background"></div>
      <div className="login_content">
        <div className="login_form">
          <h2 className="login_formHeader">Kirjaudu sisään</h2>
          <div className="login_formContent">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="Email"
              placeholder="Sähköposti"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="Password"
              placeholder="Salasana"
            />
            <button type="submit" onClick={signIn} className="login_formButton">
              Kirjaudu sisään
            </button>
          </div>
          <div className="login_formRegister">
            <h5>Unohditko salasanan?</h5>
            <Link to="/passwordReset">
              <h5> Palauta salasana </h5>
            </Link>
            <h5>Etkö omista tunnuksia?</h5>
            <h5 className="login_formRegisterInfo">Tee tunnukset </h5>
            <Link to="/register">
              <h5> tässä </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
