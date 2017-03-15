// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import {APP_CONTAINER_SELECTOR} from '../shared/config'
import {isProd} from '../shared/util'
import App from './app.jsx'
import setUpSocket from './socket'


const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = AppComponent =>
  <AppContainer>
    <AppComponent />
  </AppContainer>

ReactDOM.render(wrapApp(App), rootEl)


if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
}
