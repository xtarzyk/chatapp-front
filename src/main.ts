import { io } from 'socket.io-client'
// import { handleRoute } from './utils'
// import { Message, Room, User } from './types'

const socket = io('ws://localhost:3001')
const currentPath = window.location.pathname

let username: string
let currentRoom: string
// let roomMessages: Array<Object> = []

export const createForm = () => {
    const $formContainer = $('<div>').addClass('chat__form-container')
    const $form = $('<form>').addClass('chat__form').appendTo($formContainer)
    const $formRoom = $('<div>').addClass('chat__form-room').appendTo($form)
    const $formName = $('<div>').addClass('chat__form-name').appendTo($form)
    const $button = $('<input>').addClass('chat__form-button').attr('type', 'button').attr('value', 'Enter').appendTo($form)
    const $roomLabel = $('<label>').attr('for', 'room').text('Room:').appendTo($formRoom)
    const $nameLabel = $('<label>').attr('for', 'name').text('Your name:').appendTo($formName)
    const $roomInput = $('<input>').attr('type', 'text').appendTo($formRoom)
    const $nameInput = $('<input>').attr('type', 'text').appendTo($formName)

    $formContainer.appendTo('.chat')

    $button.on('click', () => {
        const room = $roomInput.val() as string
        const name = $nameInput.val() as string

        if(room && name) {
            socket.emit('joinRoom', { room, user: name })
            $roomInput.val('')
            $nameInput.val('')
            // window.location.assign(`/room/${room}`)
            window.history.pushState({}, '', `${room}`)
            handleRoute(room)
        }
    })
}

socket.on('getRoomUser', ({ room, user }, messages) => {
    console.log(room)
    currentRoom = room
    console.log(username)
    username = user
    displayMessages(messages)
})

const renderMessage = (message: Object) => {
    const $messageData = $('<div>').addClass('chat__message')
    const $messageHeader = $('<div>').addClass('chat__message-header').appendTo($messageData)
    const $userName = $('<p>').addClass('chat__message-username').text(`${ message.user }`).appendTo($messageHeader)
    const $timeSpan = $('<span>').addClass('chat__message-timespan').text('00:00').appendTo($messageHeader)
    const $messageText = $('<p>').text(`${ message.text }`).appendTo($messageData)
    $('.chat__messages').append($messageData)
}

const createChatRoom = (room: string) => {
    $('<h2>').text(`Welcome to ${room} room`).appendTo('.chat')

    const $messages = $('<ul>').addClass('chat__messages').appendTo('.chat')
    const $sendForm = $('<form>').addClass('chat__send-form').appendTo('.chat')
    const $messageInput = $('<input>').attr('type', 'text').addClass('chat__message-input').appendTo($sendForm)
    const $sendButton = $('<button>').text('Send').addClass('chat__send-message-button').appendTo($sendForm)

    $sendButton.on('click', (event) => {
        const messageValue = $messageInput.val()
        event.preventDefault()
        if (messageValue) {
            socket.emit('sendMessage', {
                user: username,
                room,
                text: messageValue
            })
            $messageInput.val('')
            console.log('Message send', messageValue)
        }
    })

    socket.on('receiveMessage', message => {
        console.log('receiveMessage', message)
        renderMessage(message)
        // $('<div>').addClass('chat__message').text(`[${ message.user }]: ${ message.text }`).appendTo($messages)
    })
}

const displayMessages = (messages: Array<Object>) => {
    messages.forEach((message: Object) => {
        renderMessage(message)
    })
}

const handleRoute = (room: string) => {
    const currentPath = window.location.pathname

    if (currentPath !== '/') {
        $('.chat__form-container').remove()
        createChatRoom(room)
        return
    }
    createForm()
}

handleRoute(currentPath)
