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
}


    // const formTemplate = `
    //         <$form class="chat__form">
    //             <div class="chat__form-room">
    //                 <label for="room">Room:</label>
    //                 <input type="text" name="room" />
    //             </div>
    //             <div class="chat__form-name">    
    //                 <label for="name">Your name:</label>
    //                 <input type="text" name="name">
    //             </div>
    //             <input type="button" class="chat__form-button" value="Enter" />
    //         </$form>
    // `

    // $formContainer.innerHTML = formTemplate