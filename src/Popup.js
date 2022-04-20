import React from 'react'
import './Popup.css'

function Popup(props) {

  

  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup_inner'>
            <button className='popup_closeBtn' onClick={() => props.setTrigger(false)}>
                Sulje
            </button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Popup