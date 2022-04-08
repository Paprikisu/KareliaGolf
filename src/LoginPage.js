import React from 'react'
import { Link } from 'react-router-dom'
import "./loginpageStyle.css"

function LoginPage() {
  return (
    <div className='main'>
      <div className='login_background'>
      </div>
      <div className='login_content'>

        <div className='login_form'>
          <h2 className='login_formHeader'>Kirjaudu sisään</h2>
          <div className='login_formContent'>
            <input type="email" id='Email' placeholder='Sähköposti' />
            <input type="password" id='Password' placeholder='Salasana' />
            <button className='login_formButton'>Kirjaudu sisään</button>


          </div>
          <div className="login_formRegister">
                <h5>Etkö omista tunnuksia?</h5>
                <h5 className="login_formRegisterInfo">Tee tunnukset </h5>
            <Link to="/register">
                <h5> tässä </h5>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginPage