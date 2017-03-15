import React, {PropTypes, Component} from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import {baseColor, hoverColor} from '../shared/cssvars'
import Tile from './tile.jsx'


export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameBoard: [['', '', ''], ['', '', ''], ['', '', '']],
      gameCode: props.gameCode,
      socket: props.socket,
      playerTurn: '1'}
    this.renderBoard = this.renderBoard.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    this.state.socket.on('update board', data => {
      this.setState({
        gameBoard: data.gameBoard,
        playerTurn: data.playerTurn})
    })

    this.state.socket.on('game end', data => {
      this.setState({
        playerTurn: 0,
        message: data})
    })
  }

  handleReset() {
    this.setState({
      message: '',
    })
    this.props.socket.emit('reset board', this.props.gameCode)
  }

  renderBoard() {
    return this.state.gameBoard.map((rows, rowIndex) => {
      const row = rows.map((value, colIndex) => {
        const coord = colIndex.toString() + rowIndex.toString()
        return (
        <Tile
          key={coord}
          socket={this.state.socket}
          row={rowIndex}
          col={colIndex}
          gameCode={this.state.gameCode}
          playerValue={this.props.playerValue}
          value={value}
          playerNum={this.props.playerNum}
          playerTurn={this.state.playerTurn}
        />
        )
      })
      return <RowContainer key={rowIndex}>{row}</RowContainer>
    })
  }
  // eslint-disable-next-line
  render() {
    let message
    if (
      (this.state.message === 'First player won!' && this.props.playerValue === 'X') ||
      (this.state.message === 'Second player won!' && this.props.playerValue === 'O')) {
      message = 'You won!'
    } else if (
      (this.state.message === 'First player won!' && this.props.playerValue === 'O') ||
      (this.state.message === 'Second player won!' && this.props.playerValue === 'X')) {
      message = 'You lost!'
    }
    return (
      <Container>
        <Label>
          Room Code: {this.state.gameCode}
        </Label>
        <Label>
          {message}
        </Label>
        {this.renderBoard()}
        <Button onClick={this.handleReset}>RESET BOARD</Button>
      </Container>
    )
  }
}

const Label = styled.label`
  flex-basis: 100%;
  display: block;
  font-size: 2em;
  margin-bottom: .3em;
  margin-top: .3em;
  text-align: center;
  color: ${baseColor};
`

const Container = styled.div`
  display: block;
  flex: 0;
  align-items: center;
  margin-bottom: 50px;
  width: 450px;
`

const RowContainer = styled.div`
  display: flex;
  width: 450px;
  flex-direction: row;
  align-items: center;
`
const Button = styled.button`
  padding: 0.5em 1.2em;
  margin-bottom: 0.2em;
  font-size: 1.5em;
  flex-grow: 1;
  border-radius: 2px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${hoverColor};
  box-shadow: 1px 1px 1px -1px #7986cb;
  color: ${baseColor};
  &:hover {
    background-color: #3f51b5;
    color: ${hoverColor};
    box-shadow: 2px 2px 2px ${baseColor};
  }
  &:active {
    background-color: #283593;
    color: ${hoverColor};
  }
`
