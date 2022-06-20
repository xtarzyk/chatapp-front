import { io } from 'socket.io-client'

const socket = io('ws://localhost:3001')

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
    joinRoom($roomInput, $nameInput, $button)
}

const joinRoom = ($roomInput: JQuery<HTMLElement>, $nameInput: JQuery<HTMLElement>, $button: JQuery<HTMLElement>) => {
    
    $button.on('click', () => {
        const room = $roomInput.val()
        if($roomInput.val() && $nameInput.val()) {
            socket.emit('room', room)
            socket.emit('name', $nameInput.val())
            $roomInput.val('')
            $nameInput.val('')
            window.location.assign(`/room/${room}`)
        }
    })
}