import React from 'react'
import "./Home.css"
import {useNavigate} from 'react-router-dom';
import Header from './Header/Header';

function Home() {
  const navigate = useNavigate();
  const goToSimulaatio = e => {
    navigate('/reservation')
  }
  const goToHalli = e => {
    navigate('/reservation')
  }
  return (
    <div className="main">
        <div className="backgrounddrop">
        </div>
            <div className="content">
              <Header/>
              <div className="form_home">
                
                  <h2 className="FormHeader_Home">Ajanvaraus valikko</h2>

                  <div className="HomeValikkoFlex">

                    <p className="FormInfo_Home">Varaa aika sisähalliin</p>
                    <button onClick={goToHalli} type="button" className="GoToReservation_Btn" to="/registration">Sisähalli</button>
                  </div> 


                    <div className="HomeValikkoFlex">

                    <p className="FormInfo_Home">Varaa aika simulaatioon</p>
                    <button onClick={goToSimulaatio} type="button" className="GoToReservation_Btn" to='/'>Simulaatio</button>
                </div>

        </div>
    
        </div>

    </div>
  )
}


export default Home