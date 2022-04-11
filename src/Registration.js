import React, { useState } from 'react'
import "./registrationstyle.css"
import { Link, useNavigate } from "react-router-dom";
import { auth } from './firebase';

function Registration() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) =>{
            // Onnistuneesti luotiin uusi käyttäjä
            console.log(auth);
            if(auth) {
                navigate('/home')
            }
        })
        .catch(error => alert(error.message))

        
    }
  return (
    <div className="main">
        <div className="backgrounddrop">
        </div>
            <div className="content">

                <div className="form">
                    <h2 className="FormHeader">Luo ajanvaraus tunnus täällä</h2>
                    <p className="FormInfo">Ajanvaraus tunnuksen luontiin tarvitset voimassa olevan klubi jäsenyyden.
                    Anna alla olevaan "Jäsennumero" kenttään oma Jäsen numerosi ja täytä oikeat tietosi.
                    Tiedot tarkastetaan, minkä jälkeen saat käyttäjätunnuksesi toimintaan.
                    </p>
                    <div className="form-contents">
                        <input type="number" step="none" id="membershipnumber" placeholder="Jäsennumero"/>
                        <input type="text" id="FirstName" placeholder="Etunimi"/>
                        <input type="text" id="LastName" placeholder="Sukunimi"/>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="Email" placeholder="Sähköposti"/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="Salasana"/>
                        <input type="password" id="password-2" placeholder="Salasana uudelleen"/>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" id="accept-terms" name="" value=""/>
                        <label for="accept-terms"><span className="accept-terms-label" data-loc-id="signupAcceptTermsLabel">
                            Olen lukenut ja hyväksyn  <a href="#" target="blank">käyttöehdot</a>.</span>
                        </label>
                        
                    </div>
                    <button type="button" onClick={register} className="submitBtn" to="/registration">Rekisteröidy</button>

                
                </div>
    
            </div>

    </div>
  )
}

export default Registration