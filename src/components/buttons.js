import React from "react";
import {LuDelete} from 'react-icons/lu';
import './buttons.css';
import PropTypes from 'prop-types';

export default function Buttons(props) {

  return(
    <div className='buttons'>
        {props.teclas.map((btn, i) => {
        if(btn === 'apagar') {
          return <div className='btn' key={i} onClick={props.handleClick}><LuDelete/></div>
        }
        if(btn === '=') {
          return <div className='btn blue' key={i} onClick={props.handleClick}>{btn}</div>
        }
        return <div className='btn' key={i} onClick={props.handleClick}>{btn}</div>
      })}
    </div>
  )
}


Buttons.propTypes = {
  teclas: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
}
