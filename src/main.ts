import { io } from 'socket.io-client'
import { createForm } from './form'

const socket = io('ws://localhost:3001')
// const $chat: JQuery<HTMLElement> = $('.chat')

createForm()

socket.emit('hello from client')

socket.on('hello from server', (...args) => {
  // hmmm...???
})