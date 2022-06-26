// import { io } from 'socket.io-client'
import { Message, Room, User } from './types'
import { sendMessage } from './main'

// const socket = io('ws://localhost:3001')
// let roomData: Room
// let usersData: Array<User>
// let messagesAll: Array<Message> = []

export const createChatRoom = (room: string) => {
    $('<h2>').text(`Welcome to ${room} room`).appendTo('.chat')

    const $messages = $('<ul>').addClass('chat__messages').appendTo('.chat')
    const $sendForm = $('<form>').addClass('chat__send-form').appendTo('.chat')
    const $messageInput = $('<input>').attr('type', 'text').addClass('chat__message-input').appendTo($sendForm)
    const $sendButton = $('<button>').text('Send').addClass('chat__send-message-button').appendTo($sendForm)

    sendMessage($messages, $messageInput, $sendButton)
}

export const displayMessages = (messages: Array<Message>) => {
    messages.forEach((message: Message) => {
        const messageData = $('<li>').text(`[${ message.userName }]: ${ message.createdAt } \r\n ${ message.text }`)
        $('.chat__messages').append(messageData)
    })
}

// getMessages()
