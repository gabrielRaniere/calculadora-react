import React from "react";
import './tela.css'
import PropTypes from 'prop-types';

export default function Tela(props) {

  return (
    <div className='tela'>
      <div className="prev">{`${props.PreValue} ${props.operador}`}</div>
      <input type='text' value={props.numeroValue} onChange={props.handleChange}/>
    </div>
  )
}


Tela.propTypes = {
  numeroValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}
