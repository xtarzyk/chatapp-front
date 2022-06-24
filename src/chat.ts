import { io } from 'socket.io-client'
import { Message, Room, User } from './types'

const socket = io('ws://localhost:3001')
let roomData: Room
let userData: User
let messagesAll: Array<Message> = []

export const createChatRoom = (room: string) => {
    $('<h2>').text(`Welcome to ${room} room`).appendTo('.chat')

    const $messages = $('<ul>').addClass('chat__messages').appendTo('.chat')
    const $sendForm = $('<form>').addClass('chat__send-form').appendTo('.chat')
    const $messageInput = $('<input>').attr('type', 'text').addClass('chat__message-input').appendTo($sendForm)
    const $sendButton = $('<button>').text('Send').addClass('chat__send-message-button').appendTo($sendForm)

    sendMessage($messages, $messageInput, $sendButton)
}

const displayMessages = (messages: Array<Message>) => {
    messages.forEach((message: Message) => {
        const messageData = $('<li>').text(`${message.text}`)
        $('.chat__messages').append(messageData)
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

const sendMessage = ($messages: JQuery<HTMLElement>, $messageInput: JQuery<HTMLElement>, $sendButton: JQuery<HTMLElement>) => {
    $sendButton.on('click', (event) => {
        const messageValue = $messageInput.val()
        event.preventDefault()
        if (messageValue) {
            socket.emit('sendMessage', {
                roomId: roomData.roomId,
                userId: userData.userId,
                text: messageValue 
            })
            $messageInput.val('')
            console.log('Message send', messageValue)
        }
    })

    socket.on('receiveMessage', message => {
        console.log('receiveMessage', message)
        $('<li>').text(`[${userData.userName}]: ${message.text}`).appendTo($messages)
    })
}

getMessages()
