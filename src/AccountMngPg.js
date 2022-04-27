import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./AccountMngPg.css"
import { db } from './firebase'
import { Timestamp } from 'firebase/firestore'
import { getAuth, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";



function AccountMngPg() {

  const [newEmail, setEmail] = useState('');
  const [cnfrmPassword, setcnfrmPassword] = useState('');
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');

  // ----------------- Käyttäjän hallinta -----------------
  
  function reauthenticate(CurrentPassword) {
    var user = getAuth().currentUser;
    var cred = EmailAuthProvider.credential(
        user.email, CurrentPassword);
    return reauthenticateWithCredential(user, cred);
  }


  const user = getAuth().currentUser;

  //Vaihda sähköposti
  function onChangeEmail() {
    reauthenticate(cnfrmPassword).then ((e) =>{
      updateEmail(user, newEmail).then((e) =>{
        alert("Sähköposti vaihdettu onnistuneesti");
      }).catch(error => alert(error.message))
    }).catch(error => alert(error.message))
  }


//Tulosta tiedot---------
  function getUserReservations() {
    var currUser = getAuth().currentUser
    if(currUser) {
      var reservations = db.collection("reservations")            
      var query = reservations.where("Varaaja", "==", (currUser.email))
      query.get().then((snapshot) => {
          if(snapshot.empty) {
            alert("Ei varauksia")
          } else {
            const omatVaraukset = Array()
            snapshot.forEach(tulos => {
              omatVaraukset.push(tulos.data())
              alert("Varauksen tiedot: " + tulos.data().Varausaika + " " + tulos.data().Varauspäivä + " Ovikoodi: " + tulos.data().ovikoodi)
            })
          }
      })
    }
  }

//Admin-toiminto vanhan varausdata poistoon, tulee vaatimaan kirjoitusoikeudet kokoelmaan
  function adminDatabaseUpkeep(){

    var reservations_randomvalues = db.collection("testi")            
    var query = reservations_randomvalues.where("timestamp", "<", Timestamp.now())
    query.get().then(function(snapshot) {      
      snapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
  }
  
  //Luetaan uusi jäsennumerolista tiedostosta
  const readJasennumerotFile = async (e) => {
    e.preventDefault()
    var reader = new FileReader()

    //Luetaan tiedosto
    reader.onload = async (e) => { 
      const text = (e.target.result)

      //Pätkitään rivi kerrallaan
      var splitJasennumerot = text.split(/\r?\n/);

      //Collection jäsennumeroille
      var jasennumerotCollection = db.collection("jasennumerot") 

      //Tehdään kysely ja poistetaan jäsennumerot jotka eivät ole annetussa tiedostossa
      jasennumerotCollection.get().then(function(snapshot) {
        snapshot.forEach((doc) => {
          if (!(splitJasennumerot.includes(doc.data().jasennumero))) {
            doc.ref.delete()
          }
        })
      })
      //Sitten lisätään uudet numerot
      .then(

        //Käydään jäsennumerot yksi kerrallaan läpi
        splitJasennumerot.forEach((jasennumero) => {
          
          //Jos jäsennro löytyy jo listasta (snapshot on tyhjä), lisätään kokoelmaan
          var query = jasennumerotCollection.where("jasennumero", "==", jasennumero)
          var snapshot = query.get().then(function(snapshot) {

            if (snapshot.empty == true) {
              db
              .collection("jasennumerot")
              .add({
                jasennumero: jasennumero
              })  
            }  
          })
        })
      )

    };
    reader.readAsText(e.target.files[0])
  }

  //Luetaan uusi ovikoodilista tiedostosta
  const readOvikooditFile = async (e) => {
    e.preventDefault()
    var reader = new FileReader()

    //Luetaan tiedosto
    reader.onload = async (e) => { 
      const ovikooditText = (e.target.result)

      //Pätkitään rivi kerrallaan
      var splitOvikoodit = ovikooditText.split(/\r?\n/);

      //Collection koodeille
      var ovikooditCollection = db.collection("ovikoodit") 

      //Tehdään kysely ja poistetaan koodit jotka eivät ole annetussa tiedostossa
      ovikooditCollection.get().then(function(snapshot) {
        snapshot.forEach((doc) => {
          if (!(splitOvikoodit.includes(doc.data().koodi))) {
            doc.ref.delete()
          }
        })
      })
      //Sitten lisätään uudet koodit
      .then(

        //Käydään koodit yksi kerrallaan läpi
        splitOvikoodit.forEach((ovikoodi) => {
          
          //Jos koodi löytyy jo listasta (snapshot on tyhjä), lisätään kokoelmaan
          var query = ovikooditCollection.where("koodi", "==", ovikoodi)
          var snapshot = query.get().then(function(snapshot) {

            if (snapshot.empty == true) {
              db
              .collection("ovikoodit")
              .add({
                koodi: ovikoodi
              })  
            }  
          })
        })
      )

    };
    reader.readAsText(e.target.files[0])
  }

if (user) {
 
  //Palautetaan normaali sivusto jos käyttäjä on kirjautunut sisään
  return (
    <div className="main">

        <div className="backgrounddrop">
        </div>

        <div className="content">
          
          <div className="form_am">


            <div className="formAM_1">


              <h2 className="FormHeader_am">Käyttäjänhallinta</h2>

              <h3 className="FormHeader_am" id='SP'>
                  Käytössä oleva sähköpostisi:
                </h3>
                
                <p className='Spostitxt'>{user.email}</p>


              <div className="form_am-contents">
                <p className="FormAMInfo">
                  Vaihda sähköposti:
                </p>
                <input type="text" value={newEmail} onChange={e => setEmail(e.target.value)} id="emailtxt" placeholder="Uusi Sähköposti"/>
                <input type="password" value={cnfrmPassword} onChange={e => setcnfrmPassword(e.target.value)} id="password" placeholder="Vahvista salasanalla"/>
                <button type="button" onClick={onChangeEmail} className="confirmBtn">Vaihda sähköposti</button>
              </div>          

              <div className="form_am-contents">
                <p className="FormAMInfo">
                  Omat varaukset
                </p>
                <button type="button" onClick={getUserReservations} className="confirmBtn">Hae omat varaukset</button>
              </div>

              <div className="form_am-contents">
                <h2 className="FormHeader_am">Järjestelmänvalvojan työkalut:</h2>
                <button type="button" onClick={adminDatabaseUpkeep} className="confirmBtn">Poista vanhat varaukset</button>
                <p>Vedä päivitetty jäsennumerolista (tekstitiedosto) alla olevaan kohtaan päivittääksesi tietokannan jäsennumerot</p>               
                <input type="file" onChange={(e) => readJasennumerotFile(e)}/>
                <p>Ovikoodien päivitys</p>               
                <input type="file" onChange={(e) => readOvikooditFile(e)}/>

              </div>
            </div>



          </div> 
    
        </div>

    </div>
  )
  //Jos käyttäjä ei ole kirjautunut sisään, palautetaan linkki kirjautumissivulle
  } else {
    return (
      <div className="main">

        <div className="backgrounddrop">
        </div>
        
        <div className="content">
          <div className="loginLink">
            <h1><Link to="/">Kirjaudu sisään, ole hyvä!</Link></h1>
          </div>
        </div>

      </div>
    )
  }
}

const Note = (props) => {
  return (
    <li>{props.content}</li>
  )
}

export default AccountMngPg

