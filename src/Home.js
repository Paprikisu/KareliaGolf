import React from 'react'
import "./Home.css"

function Home() {
  return (
    <div className="main">
        <div className="backgrounddrop">
        </div>
            <div className="content">
              <nav class="navbar">
                  <ul class="nav_links">
                      <li><a href="#"class="Mainmenubar">Main</a></li>
                      <li><a href="#"class="Mainmenubar">Ajanvaraus</a></li>
                      <li><a href="#"class="Mainmenubar">About</a></li>
                  </ul>
                  
                  <div class="burger">
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
                  </div>    
              </nav>
              <div className="form_home">
                
                  <h2 className="FormHeader_Home">Ajanvaraus valikko</h2>

                  <div className="HomeValikkoFlex">

                    <p className="FormInfo_Home">Varaa aika sisähalliin</p>
                    <button type="button" className="GoToReservation_Btn" to="/registration">Sisähalli</button>
                  </div> 


                    <div className="HomeValikkoFlex">

                    <p className="FormInfo_Home">Varaa aika simulaatioon</p>
                    <button type="button" className="GoToReservation_Btn" to='/'>Simulaatio</button>
                </div>

        </div>
    
        </div>

    </div>
  )
}


export default Home