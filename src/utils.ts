import { createChatRoom } from './chat'
import { createForm } from './form'

export const handleRoute = (room: string) => {
    const currentPath = window.location.pathname

    if (currentPath !== '/') {
        $('.chat__form-container').remove()
        createChatRoom(room)
        return
    }
    createForm()
}
