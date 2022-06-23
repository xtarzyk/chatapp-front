import { io } from 'socket.io-client'
import { Room, User, Message } from './types/index'

const socket = io('ws://localhost:3001')
let roomData: Room
let userData: User
let messagesAll: Array<Message> = []

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

const displayMessages = (messages: Array<Message>) => {
    messages.forEach((message: Message) => {
        const messageData = $('<li>').text(`${message.text}`)
        $('.chat__messages').append(messageData)
    })
}

const getRoomData = () => {
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

const getUserData = () => {
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

const joinRoom = ($roomInput: JQuery<HTMLElement>, $nameInput: JQuery<HTMLElement>, $button: JQuery<HTMLElement>) => {
    $button.on('click', async () => {
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

export const handleRoute = (room: string) => {
    const currentPath = window.location.pathname

    if (currentPath !== '/') {
        $('.chat__form-container').remove()
        createChatRoom(room)
        return
    }
    createForm()
}

getMessages()