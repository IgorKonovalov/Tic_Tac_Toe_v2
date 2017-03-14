import http from 'http'
import compression from 'compression'
import express from 'express'
import socketIO from 'socket.io'
import bodyParser from 'body-parser'

import {APP_NAME, STATIC_PATH, WEB_PORT} from '../shared/config'
import {isProd} from '../shared/util'
import {helloEndpointRoute} from '../shared/routes'
import renderApp from './render-app'
import setUpSocket from './socket'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send(renderApp(APP_NAME))
})

server.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})

setUpSocket(io)
