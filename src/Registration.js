import React from 'react'
import "./registrationstyle.css"

function Registration() {
  return (
    <div class="main">
        <div class="backgrounddrop">
        </div>
            <div class="content">

                <div class="form">
                    <h2 class="FormHeader">Luo ajanvaraus tunnus tässä</h2>
                    <p class="FormInfo">Ajanvaraus tunnuksen luontiin tarvitset voimassa olevan klubi jäsenyyden.
                    Anna alla olevaan "Jäsennumero" kenttään oma Jäsen numerosi ja täytä oikeat tietosi.
                    Tiedot tarkastetaan, minkä jälkeen saat käyttäjätunnuksesi toimintaan
                    </p>
                    <div class="form-contents">
                        <input type="number" step="none" id="membershipnumber" placeholder="Jäsennumero"/>
                        <input type="text" id="FirstName" placeholder="Etunimi"/>
                        <input type="text" id="LastName" placeholder="Sukunimi"/>
                        <input type="text" id="Email" placeholder="Sähköposti"/>
                        <input type="password" id="password" placeholder="Salasana"/>
                        <input type="password" id="password-2" placeholder="Salasana uudelleen"/>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="accept-terms" name="" value=""/>
                        <label for="accept-terms"><span class="accept-terms-label" data-loc-id="signupAcceptTermsLabel">
                            Olen lukenut ja hyväksyn  <a href="#" target="blank">käyttöehdot</a>.</span>
                        </label>
                    </div>
                    <button type="button" class="submitBtn" onclick="validate()">Kirjaudu</button>
                    

                
                </div>
    
            </div>

    </div>
  )
}

export default Registration