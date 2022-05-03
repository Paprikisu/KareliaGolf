import React from 'react'
import "./Home.css"
import {useNavigate} from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const goToSimulaatio = e => {
    navigate('/simulaatio')
  }
  const goToHalli = e => {
    navigate('/sisahalli')
  }
  return (
    <div className="main">
        <div className="backgrounddrop">
        </div>
            <div className="content">
              
              <div className="form_home">
                
                  <h2 className="FormHeader_Home">Ajanvarausvalikko</h2>

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