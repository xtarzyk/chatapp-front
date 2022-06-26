import { io } from 'socket.io-client'
import { handleRoute } from './utils'
import { Message, Room, User } from './types'
import { displayMessages } from './chat'

const socket = io('ws://localhost:3001')
const currentPath = window.location.pathname

let roomData: Room
let userData: User
let messagesAll: Array<Message> = []

export const joinRoom = ($roomInput: JQuery<HTMLElement>, $nameInput: JQuery<HTMLElement>, $button: JQuery<HTMLElement>) => {
    $button.on('click', () => {
        const room = $roomInput.val() as string
        const name = $nameInput.val() as string

        if(room && name) {
            socket.emit('room', room)
            socket.emit('name', name)
            $roomInput.val('')
            $nameInput.val('')
            // window.location.assign(`/room/${room}`)
            window.history.pushState({}, '', `${room}`)
            handleRoute(room)
            getUserData()
            getRoomData()
        }
    })
}

export const getRoomData = () => {
    socket.on('getRoomData', (room: Room) => {
        const newRoom: Room = {
            roomId: room.roomId,
            roomName: room.roomName
        } 
        console.log(room)
        
        roomData = newRoom

        const roomMessages = messagesAll.filter(message => message.roomId === roomData.roomId)
        console.log(roomMessages)
        displayMessages(roomMessages)
    })
}

export const getUserData = () => {
    socket.on('getUserData', (user: User) => {
        const newUser: User = {
            userId: user.userId,
            userName: user.userName
        }
        console.log(user)
        
        userData = newUser
    })
}

const getMessages = () => {
    socket.emit('getMessages', (messages: Array<Message>) => {
        messagesAll = messagesAll.concat(messages)
        console.log(messagesAll)
    })
}

export const sendMessage = ($messages: JQuery<HTMLElement>, $messageInput: JQuery<HTMLElement>, $sendButton: JQuery<HTMLElement>) => {
    $sendButton.on('click', (event) => {
        const messageValue = $messageInput.val()
        event.preventDefault()
        if (messageValue) {
            socket.emit('sendMessage', {
                roomId: roomData.roomId,
                userId: userData.userId,
                userName: userData.userName,
                text: messageValue
            })
            $messageInput.val('')
            console.log('Message send', messageValue)
        }
    })

    socket.on('receiveMessage', message => {
        console.log('receiveMessage', message)
        $('<li>').text(`[${ message.userName }]: ${ message.createdAt } \r\n ${ message.text }`).appendTo($messages)
    })
}

handleRoute(currentPath)
getMessages()