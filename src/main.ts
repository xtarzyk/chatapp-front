import { io } from 'socket.io-client'

const socket = io('ws://localhost:3001')

socket.emit('hello from client')

socket.on('hello from server', (...args) => {
  // hmmm...???
})