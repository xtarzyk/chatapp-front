import { io } from 'socket.io-client'

const socket = io('ws://localhost:3001')
let roomUserData: Object = []

const createForm = () => {
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
    joinRoom($roomInput, $nameInput, $button)
}

const createChatRoom = (room: string) => {
    $('<h2>').text(`Welcome to ${room} room`).appendTo('.chat')

    const $messages = $('<ul>').addClass('chat__messages').appendTo('.chat')
    const $sendForm = $('<form>').addClass('chat__send-form').appendTo('.chat')
    const $messageInput = $('<input>').attr('type', 'text').addClass('chat__message-input').appendTo($sendForm)
    const $sendButton = $('<button>').text('Send').addClass('chat__send-message-button').appendTo($sendForm)

    sendMessage($messages, $messageInput, $sendButton)
}

const joinRoom = ($roomInput: JQuery<HTMLElement>, $nameInput: JQuery<HTMLElement>, $button: JQuery<HTMLElement>) => {
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
            getRoomUserData(name, room)
            handleRoute(room)
        }
    })
}

const getRoomUserData = (userName: string, roomName: string) => {
    socket.emit('userName', userName)
    socket.on('getUserData', (user) => {
        console.log(user)
    })

    socket.emit('roomName', roomName)
    socket.on('getRoomData', room => {
        console.log(room)
    })
}

const sendMessage = ($messages: JQuery<HTMLElement>, $messageInput: JQuery<HTMLElement>, $sendButton: JQuery<HTMLElement>) => {
    $sendButton.on('click', (event) => {
        const messageValue = $messageInput.val()
        console.log(messageValue)
        event.preventDefault()
        if (messageValue) {
            socket.emit('sendMessage', { text: messageValue })
            $messageInput.val('')
            console.log('Message send', messageValue)
        }
    })

    socket.on('receiveMessage', message => {
        console.log('receiveMessage', message)
        $('<li>').text(message).appendTo($messages)
    })
}

export const handleRoute = (room: string) => {
    const currentPath = window.location.pathname

    if (currentPath !== '/') {
        $('.chat__form-container').remove()
        createChatRoom(room)
        return
    }
    createForm()
}