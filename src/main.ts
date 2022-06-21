import { io } from 'socket.io-client'
import { createForm, handleRoute } from './form'

const socket = io('ws://localhost:3001')

// window.onpopstate = handleRoute
const run = () => setTimeout(() => {
  console.log('loaded!')
  const currentPath = window.location.pathname
  handleRoute(currentPath)}, 1000)

run()

socket.emit('hello from client')

socket.on('hello from server', (...args) => {
  // hmmm...???
})