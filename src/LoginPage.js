import React from "react";
import { Link } from "react-router-dom";
import "./loginpageStyle.css";

function loginPage() {
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_info">
          <h3>Tervetuloa!</h3>
          <h4>
           Kirjaudu sisään varataksesi ja hallinnoidaksesi <br></br> varauksiasi
          </h4>
        </div>

        <div className="login_form">
          <div className="login_formInput">
            <h2> Kirjaudu sisään </h2>

            <h3> Sähköposti </h3>
            <input type="email"></input>
            <h3> Salasana </h3>
            <input type="password"></input>
            <button type="button" class="submitBtn">Kirjaudu</button>
          </div>

          <div className="login_formRegister">
                <h5 className="login_registerInfo">Tee tunnukset </h5>
            <Link to="/register">
                <h5> tässä </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
