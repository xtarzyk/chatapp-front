export const createForm = (chat: HTMLElement) => {
    const formContainer = document.createElement('div')
    formContainer.innerHTML = `
            <form class="chat__form">
                <div class="chat__form-room">
                    <label for="room">Room:</label>
                    <input type="text" name="room" />
                </div>
                <div class="chat__form-name">    
                    <label for="name">Your name:</label>
                    <input type="text" name="name">
                </div>
                <input type="button" class="chat__form-button" value="Enter" />
            </form>
    `

    formContainer.classList.add('chat__form-container')
    chat.appendChild(formContainer)
}