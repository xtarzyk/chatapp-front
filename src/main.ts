import { io } from 'socket.io-client'
import { handleRoute } from './form'

const socket = io('ws://localhost:3001')

// window.onpopstate = handleRoute
const currentPath = window.location.pathname
handleRoute(currentPath)
