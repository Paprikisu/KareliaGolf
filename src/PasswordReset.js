import React, {useState} from 'react'
import './loginpageStyle.css'
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';


function PasswordReset() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const passReset = () => {
    if (email === ""){
      alert("Kenttä ei saa olla tyhjä")
    }
    else{

    
    auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Palautus sähköposti lähetetty!")
      navigate("/")

    // Password reset email sent!
    // ..
    })
   .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    
  });
  }

  }


  return (
    <div className="main">
    <div className="login_background"></div>
    <div className="login_content">
      <div className="login_form">
        <h2 className="login_formHeader">Palauta salasana</h2>
        <div className="login_formContent">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email"
            placeholder="Sähköposti"
          />
          
          <button type="submit" onClick={passReset} className="login_formButton">
            Lähetä sähköposti
          </button>
       
          
        </div>
      </div>
    </div>
  </div>
  );
}

export default PasswordReset;