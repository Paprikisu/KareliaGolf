import React, { useState } from 'react'
import "./AccountMngPg.css"
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
        alert("Sähköposti Vaihdettu onnistuneesti");
      }).catch(error => alert(error.message))
    }).catch(error => alert(error.message))
  }

  //Vaihda salasana
  function onChangePassword() {
    reauthenticate(currentPassword).then((e) => {
      updatePassword(user, newPassword).then((e) => {
        alert("Salasana Vaihdettu Onnistuneesti!");
      }).catch((error) => { alert(error); });
    }).catch((error) => { alert(error); });
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



              </div> 
    
        </div>

    </div>
  )
}

export default AccountMngPg