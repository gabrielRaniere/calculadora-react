import './App.css';
import React from 'react';
import {PiClockClockwiseLight} from 'react-icons/pi'

import Tela from './components/tela';
import Buttons from './components/buttons';
import HistoricoTag from './components/historico';


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teclas: [
        'C', 'x2', '√', '/',
        '7', '8', '9', 'x',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        'apagar', '0', '.', '='],

      numeroValue: '0',
      valorAnt: 0,
      operador: '',
      historico: [],
      btnClicked: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {historico} = this.state;

    if(this.state.numeroValue.length === 0) {
      this.setState({
        numeroValue: '0'
      })
    }

    if(prevState.historico !== historico) {
      return
    }
  }

  handleChange() {
    return;
  }

  updateHistory() {
    const {valorAnt, numeroValue, operador, historico} = this.state;
    const copy = [...historico];

    const commit = `${valorAnt} ${operador} ${numeroValue} = `;

    this.setState({
        historico: [...copy, commit]
    })
  }

  alteraEstado = (operator, obj, resultProperty) => {
    let {valorAnt, numeroValue} = this.state;
    valorAnt = Number(valorAnt);
    numeroValue = Number(numeroValue);

    let result = 0;
    if(operator === '+') result = valorAnt + numeroValue;
    if(operator === '-') result = valorAnt - numeroValue;
    if(operator === 'x') result = valorAnt * numeroValue;
    if(operator === '/') result = valorAnt / numeroValue;

    obj[`${resultProperty}`] = result;


    this.setState(obj);
  }
  // calculos
  calculate(btn) {
    let { valorAnt, operador} = this.state;

    this.updateHistory();

    if(btn !== '=') {

      this.alteraEstado(operador, {numeroValue: '0', operador: btn}, 'valorAnt')
      return;
    }
    if(valorAnt === 0) {
      return;
    }

    this.alteraEstado(operador, { valorAnt: 0, operador: '' }, 'numeroValue')
  }

  setaOperadores(operator) {
    if(this.state.operador !== '') {
      return;
    }

    switch (operator) {
      case 'x2':
        this.setState({
          numeroValue: this.state.numeroValue * this.state.numeroValue
        })
        break

      case '√':
        this.setState({
          numeroValue: Math.sqrt(this.state.numeroValue)
        })
        break

      case '+':
        this.setState({
          valorAnt: this.state.numeroValue,
          numeroValue: '0',
          operador: '+'
        })
        break

        case '-':
          this.setState({
          valorAnt: this.state.numeroValue,
          numeroValue: '0',
          operador: '-'
        })
        break

        case 'x':
        this.setState({
          valorAnt: this.state.numeroValue,
          numeroValue: '0',
          operador: 'x'
        })
        break

        case '/':
        this.setState({
          valorAnt: this.state.numeroValue,
          numeroValue: '0',
          operador: '/'
        })
        break

      default:
        console.log('oi')
    }

  }

  clean = () => {
    this.setState({
      numeroValue: '0',
      valorAnt: 0,
      operador: '',
    })
  }

  handleClick = (e) => {
    const value = e.target.innerText;
    const { numeroValue, teclas, operador } = this.state;

    if((value === '.' && numeroValue.indexOf('.') !== -1)) {
      return;
    }

    if(value === 'C') {
      this.clean();
      return;
    }

    // APAGAR
    if(teclas.indexOf(value) === -1 && numeroValue !== '0') {
      const spliced = String(numeroValue).slice(0, -1);

      this.setState({
        numeroValue: spliced
      })

      return;
    }
    // ADICIONAR NUMEROS
    if((value >= 0 && value <= 9) || value === '.') {
      if(numeroValue === '0' && value !== '.') {

        this.setState({
          numeroValue: value
        })
        return;
      }

      this.setState({
        numeroValue: numeroValue + value
      })
      return;
    }
    // operações

    if(value === '=' || operador) {
      this.calculate(value)
      return;
    }
    // OPERADOR APERTADO
    this.setaOperadores(value)
  }

  HandleOpenHistory = () => {
    this.setState({
      btnClicked: !this.state.btnClicked
    })
  }

  render() {
    const { teclas, numeroValue, valorAnt, operador, btnClicked, historico } = this.state;

    if(!btnClicked) {
      return (
        <div className='container-calc'>
          <div className='history'>
            <PiClockClockwiseLight className='clock' onClick={this.HandleOpenHistory}/>
          </div>

          <Tela
            numeroValue={String(numeroValue)}
            handleChange={this.handleChange}
            PreValue={valorAnt}
            operador={operador}
          />

          < Buttons
            teclas={teclas}
            handleClick={this.handleClick}
          />
      </div>
      )
    }

    return (
      <div className='container-calc'>
        <div className='history'>
          <PiClockClockwiseLight className='clock' onClick={this.HandleOpenHistory}/>
        </div>

        <Tela
          numeroValue={String(numeroValue)}
          handleChange={this.handleChange}
          PreValue={valorAnt}
          operador={operador}
        />

        <HistoricoTag
          handleclose={this.HandleOpenHistory}
          history={historico}
        />

    </div>
    )
  }
}
