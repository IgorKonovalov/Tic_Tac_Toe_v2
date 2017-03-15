import React, {PropTypes, Component} from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'
import {tileHeight, tileWidth} from '../shared/cssvars'

export default class Tile extends Component {
  constructor(props) {
    super(props)
    this.state = {socket: props.socket}
    this.clickTile = this.clickTile.bind(this)
  }

  clickTile() {
    if (this.props.value === '') {
      // eslint-disable-next-line
      if (this.props.playerNum == this.props.playerTurn) {
        this.props.socket.emit('click', {
          gameCode: this.props.gameCode,
          row: this.props.row,
          col: this.props.col,
          value: this.props.playerValue})
      } else {
        console.log('cannot press')
      }
    }
  }

  render() {
    return (
      <TileContainer onClick={this.clickTile}>
        <TileText>{this.props.value}</TileText>
      </TileContainer>
    )
  }
}

const TileContainer = styled.div`
  background-color: hsl(240, 100%, 5%);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${tileHeight};
  width: ${tileWidth};
  border-radius: 5px;
  border: 1px solid #FFF;
  &:hover {
    box-shadow: inset 0px 0px 16px #FFF;
  }
`

const TileText = styled.p`
  font: 120px sans-serif;
  color: #FFF;
`
