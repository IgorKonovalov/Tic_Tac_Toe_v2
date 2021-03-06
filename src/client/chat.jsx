import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styled from 'styled-components'
import {baseColor, hoverColor} from '../shared/cssvars'



export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      socket: props.socket,
      gameCode: props.gameCode,
      name: props.name,
      playerValue: props.playerValue}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.state.socket.on('message', message => {
      this.setState({messages: [message, ...this.state.messages]})
    })
  }

  handleSubmit(event) {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      const message = {
        gameCode: this.state.gameCode,
        body,
        from: this.state.name || this.state.socket.id.slice(0, 5),
        playerValue: this.state.playerValue}
      this.setState({messages: [message, ...this.state.messages]})
      this.state.socket.emit('message', message)
      event.target.value = ''
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}>{message.playerValue}:
        {message.from === 'SERVER' ? <SERVERB>{message.from} </SERVERB> : <B>{message.from} </B>}:
        {message.body}</li>
    })
    return (
      <Container>
        <Input
          type="text"
          placeholder="type a message..."
          onKeyUp={this.handleSubmit} />
        {messages}
      </Container>
    )
  }
}

const Container = styled.div`
  width: 450px;
`
const Input = styled.input`
  flex-grow: 2;
  padding: 1em;
  font-size: 1em;
  width: 100%;
  margin-left: auto;
  margin-right: 0.5rem;
  margin-bottom: 0.3em;
  border: none;
  background-color: ${hoverColor};
  color: ${baseColor};
`

const Label = styled.label`
  flex-basis: 100%;
  display: block;
  font-size: 2em;
  margin-bottom: 1em;
  margin-top: 1em;
  text-align: center;
  color: ${baseColor};
`
const SERVERB = styled.b`
  color: rgb(255,0,0);
`
const B = styled.b`
  color: ${baseColor};
`
