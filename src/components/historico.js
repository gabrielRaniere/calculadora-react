import React from "react";
import './historico.css';

export default function HistoricoTag(props) {

  if(props.history.length > 0) {
    return (
      <div className="shaddow-historico" onClick={props.handleclose}>
        <div className="historico">
          <div className="no-history">
            {props.history.map(conta => {
              return (
                <div className="historico-conta">{conta}</div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="shaddow-historico" onClick={props.handleclose}>
      <div className="historico">
        <div className="no-history">Ainda não há histórico...</div>
      </div>
    </div>
  )
}
