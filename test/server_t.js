import should from 'should'
import io from 'socket.io-client'

const socketURL = 'http://127.0.0.1:8000'

const options = {
  transports: ['websocket'],
  'force new connection': true}

const roomCode = '1234'

describe('The tic tac toe test', () => {

  it('create room from client should receive something', done => {
    const client1 = io.connect(socketURL, options)
    client1.emit('create room', roomCode)
    client1.on('room created', data => {
      should(data).be.exactly(true)
      client1.disconnect()
      done()
    })
  })

  it('player 2 join should start the game', done => {

    const client1 = io.connect(socketURL, options)
    client1.emit('create room', roomCode)
    client1.on('room created', data => {
      const client2 = io.connect(socketURL, options)
      client2.emit('join room', roomCode)
      client2.on('game start', data2 => {
        should(data2).be.exactly('haha')
        client1.disconnect()
        client2.disconnect()
        done()
      })
    })
  })

  it('player 1 can make a move once game is started, player 2 should receive the update', done => {

    const client1 = io.connect(socketURL, options)
    client1.emit('create room', roomCode)
    client1.on('room created', data => {
      const client2 = io.connect(socketURL, options)
      client2.emit('join room', roomCode)
      client2.on('game start', data2 => {
        client1.emit('click', {gameCode: roomCode, row: 0, col: 0, value: 'X'})
        client2.on('update board', data3 => {
          should(data3.gameBoard).be.eql([
              ['X', '', ''],
              ['', '', ''],
              ['', '', '']])
          should(data.gameBoard).be.a.Array
          should(data.playerTurn).be.exactly(2)
          client1.disconnect()
          client2.disconnect()
          done()
        })
      })
    })
  })

  it('player 2 make a move, and player 1 should receive the update', done => {
    let count = 0
    const client1 = io.connect(socketURL, options)
    let board = []
    let playerTurn = 1
    client1.emit('create room', roomCode)
    client1.on('room created', data => {
      const client2 = io.connect(socketURL, options)
      client2.emit('join room', roomCode)
      client1.on('game start', data2 => {
        client2.on('update board', data3 => {
          board = data3.gameBoard
          playerTurn = data3.playerTurn
        })

        client1.emit('click', {gameCode: roomCode, row: 0, col: 0, value: 'X'})
        count++
        client2.emit('click', {gameCode: roomCode, row: 0, col: 1, value: 'O'})
        count++
        setTimeout(() => {
          if (count === 2) {
            should(board).be.eql([
                ['X', 'O', ''],
                ['', '', ''],
                ['', '', '']])
            should(board).be.a.Array
            should(playerTurn).be.exactly(1)
            client1.disconnect()
            client2.disconnect()
            done()
          }
        }, 10)
      })
    })
  })

  it('player 1 should win', done => {
    const count = 0
    const client1 = io.connect(socketURL, options)
    let board = []
    let playerTurn = 1
    client1.emit('create room', roomCode)
    client1.on('room created', data => {
      const client2 = io.connect(socketURL, options)
      client2.emit('join room', roomCode)
      client1.on('game start', data2 => {
        client2.on('update board', data3 => {
          board = data3.gameBoard
          playerTurn = data3.playerTurn
        })

        client2.on('game end', data4 => {
          should(data4).be.eql('First player won!')
          client1.disconnect()
          client2.disconnect()
          done()
        })

        client1.emit('click', {gameCode: roomCode, row: 0, col: 0, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 0, col: 1, value: 'O'})
        client1.emit('click', {gameCode: roomCode, row: 1, col: 0, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 1, col: 1, value: 'O'})
        client1.emit('click', {gameCode: roomCode, row: 2, col: 0, value: 'X'})
      })
    })
  })

  it('player 2 should win', done => {
    const count = 0
    const client1 = io.connect(socketURL, options)
    let board = []
    let playerTurn = 1
    client1.emit('create room', roomCode)
    client1.on('room created', data => {
      const client2 = io.connect(socketURL, options)
      client2.emit('join room', roomCode)
      client1.on('game start', data2 => {

        client1.emit('click', {gameCode: roomCode, row: 2, col: 0, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 0, col: 1, value: 'O'})
        client1.emit('click', {gameCode: roomCode, row: 1, col: 0, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 1, col: 1, value: 'O'})
        client1.emit('click', {gameCode: roomCode, row: 2, col: 0, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 2, col: 1, value: 'O'})

        client2.on('update board', data3 => {
          board = data3.gameBoard
          playerTurn = data3.playerTurn
        })

        client2.on('game end', data4 => {
          should(data).be.eql('Second player won!')
          client1.disconnect()
          client2.disconnect()
          done()
        })
      })
    })
  })

  it('should be a tie game', done => {
    const count = 0
    const client1 = io.connect(socketURL, options)
    const board = []
    const playerTurn = 1
    client1.emit('create room', roomCode)
    client1.on('room created', data => {
      const client2 = io.connect(socketURL, options)
      client2.emit('join room', roomCode)
      client1.on('game start', data2 => {

        client2.on('game end', data3 => {
          should(data3).be.eql('Draw!')
          client1.disconnect()
          client2.disconnect()
          done()
        })


        client1.emit('click', {gameCode: roomCode, row: 0, col: 0, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 0, col: 2, value: 'O'})
        client1.emit('click', {gameCode: roomCode, row: 0, col: 1, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 1, col: 0, value: 'O'})
        client1.emit('click', {gameCode: roomCode, row: 1, col: 2, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 1, col: 1, value: 'O'})

        client1.emit('click', {gameCode: roomCode, row: 2, col: 0, value: 'X'})
        client2.emit('click', {gameCode: roomCode, row: 2, col: 1, value: 'O'})
        client1.emit('click', {gameCode: roomCode, row: 2, col: 2, value: 'X'})

      })
    })
  })
})
