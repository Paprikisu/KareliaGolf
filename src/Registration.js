import React, { useState } from 'react'
import "./registrationstyle.css"
import { useNavigate } from "react-router-dom";
import { auth, db } from './firebase';

function Registration() {

    const navigate = useNavigate();
    const [membershipnumber, setMembershipnumber] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');


    const register = e => {

        //Tarkastetaan että käyttäjällä on voimassaoleva jäsennumero
        var jasennumerot = db.collection("jasennumerot")            
        var query = jasennumerot.where("jasennumero", "==", membershipnumber)
        var snapshot = query.get().then(function(snapshot) {
  
            //Jos jäsennumero löytyy tietokannasta, hyväksytään käyttäjä jos muut ehdot täyttyvät
             if (snapshot.empty == false) {
                
                var kayttajat = db.collection("users")            
                var query = kayttajat.where("jäsennumero", "==", membershipnumber)
                var snapshot = query.get().then(function(snapshot) {
                    if(snapshot.empty == true) {
                        //Yksinkertainen tarkastus, että kentissä on jotain ja salasanakenttien sisällöt täsmäävät
                        if(name.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 5 && password == passwordAgain) {
                            e.preventDefault();

                            auth.createUserWithEmailAndPassword(email, password)
                            .then((auth) =>{
                                // Onnistuneesti luotiin uusi käyttäjä
                                db.collection("users").add({
                                    jäsennumero: membershipnumber,
                                    nimi : name,
                                    sukunimi : lastname,
                                    sähköposti : email
                                })

                                if(auth) {
                                    navigate('/home')
                                }
                            })
                            .catch(error => alert(error.message))
                        } else {
                            alert("Virhe: tarkista tiedot ja varmista että kaikki kentät on täytetty oikein.")
                        }
                    } else {
                        alert("Virhe: jäsennumerolla on jo olemassaoleva käyttäjätunnus")
                    }
                })
            } else {
                alert("Virheellinen jäsennumero")
            }     
        })
    }
    
  return (
    <div className="main">
        <div className="backgrounddrop">
        </div>
            <div className="content">

                <div className="form">
                    <h2 className="FormHeader">Luo ajanvaraustunnus täällä</h2>
                    <p className="FormInfo">Ajanvaraustunnuksen luontiin tarvitset voimassa olevan jäsenyyden.
                    Anna alla olevaan "Jäsennumero" kenttään oma jäsennumerosi seurassa ja täytä muut tietosi.
                    Tiedot tarkastetaan, minkä jälkeen saat käyttäjätunnuksesi toimintaan.
                    </p>
                    <div className="form-contents">
                    <input type="number" value={membershipnumber} onChange={e => setMembershipnumber(e.target.value)} step="none" id="membershipnumber" placeholder="Jäsennumero"/>
                        <input type="text" value={name} id="FirstName" onChange={e => setName(e.target.value)} placeholder="Etunimi"/>
                        <input type="text" value={lastname} id="LastName" onChange={e => setLastname(e.target.value)} placeholder="Sukunimi"/>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="Email" placeholder="Sähköposti"/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="Salasana"/>
                        <input type="password" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} id="password-2" placeholder="Salasana uudelleen"/>
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