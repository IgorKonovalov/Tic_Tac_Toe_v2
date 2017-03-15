// @flow

export const WEB_PORT = process.env.PORT || 8000
export const STATIC_PATH = '/static'
export const APP_NAME = 'Tic Tac Toe Multiplayer game on React + Socket.io!'

export const WDS_PORT = 7000
export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`


// websockets
export const IO_CONNECT = 'connect'
export const IO_DISCONNECT = 'disconnect'
export const IO_CLIENT_HELLO = 'IO_CLIENT_HELLO'
export const IO_CLIENT_JOIN_ROOM = 'IO_CLIENT_JOIN_ROOM'
export const IO_SERVER_HELLO = 'IO_SERVER_HELLO'
