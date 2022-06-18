import { io } from 'socket.io-client'
import { createForm } from './form'

const socket = io('ws://localhost:3001')
const chat = document.querySelector('.chat') as HTMLElement

createForm(chat)

socket.emit('hello from client')

socket.on('hello from server', (...args) => {
  // hmmm...???
})