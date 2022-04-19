import { UpgradeSharp } from '@mui/icons-material';
import React, { useState } from 'react'
import "./AccountMngPg.css"
import { auth, db } from './firebase';
import { useStateValue } from './StateProvider';


function AccountMngPg() {
 

  const [{ user }, dispatch] = useStateValue();

  const [newEmail, setEmail] = useState('');

  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');



  // ----------------- Käyttäjän hallinta -----------------

  //Vaihda sähköposti
  const onChangeEmail = () =>{
    this.reauthenticate(currentPassword).then(() => {
    var user = auth().currentUser;
    user.updateEmail(newEmail).then(() => {
      console.log("Sähköposti vahdettiin onnistuneesti");
    }).catch((error) => {console.log(error); });
  }).catch((error) => { console.log(error); });
  }

 //Vaihda salasana
  const onChangePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        console.log("Salasana Vaihdettu Onnistuneesti!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }


//Tulosta tiedot---------

  


  return (
    <div className="main">
        <div className="backgrounddrop">
        </div>
            <div className="content">
              
              <div className="form_am">


                <div className="formAM_1">


                  <h2 className="FormHeader_am">Käyttäjänhallinta</h2>

                  <p className="FormInfo">
                  </p>
                  <div className="form_am-contents">
                    <p className="FormAMInfo">
                      Vaihda sähköposti:
                    </p>
                    <input type="text" value={newEmail} onChange={e => setEmail(e.target.value)} id="emailtxt" placeholder="Uusi Sähköposti"/>
                    <input type="password" value={currentPassword} onChange={e => setcurrentPassword(e.target.value)} id="password" placeholder="Vahvista salasanalla"/>
                    <button type="button" onClick={onChangeEmail} className="confirmBtn">Vaihda Sähköposti</button>
                  </div>

                  <div className="form_am-contents">
                    <p className="FormAMInfo">
                      Vaihda salasana:
                    </p>
                    <input type="password" value={currentPassword} onChange={e => setcurrentPassword(e.target.value)} id="password" placeholder="Vanha Salasana"/>
                    <input type="password" value={newPassword} onChange={e => setnewPassword(e.target.value)} id="password" placeholder="Uusi Salasana"/>
                  
                    <button type="button" onClick={onChangePassword} className="confirmBtn">Vaihda Salasana</button>
                  </div>
                </div>


                <div className = "formAM_1"> 
                    <h3 className="FormAMInfo">
                      Käyttäjätiedot
                    </h3>
                    <p className="FormAMInfo">
                      Asiakas Numero: 
                    </p>
                    <p className="FormAMInfo">
                      Etunimi: {user ? user.email.slice(0, user.email.indexOf('@')) : ""}
                    </p>
                    <p className="FormAMInfo">
                      Sukunimi: 
                    </p>
                    <p className="FormAMInfo">
                      Sähköposti:
                    </p>
              </div>

              </div> 
    
        </div>

    </div>
  )
}

export default AccountMngPg