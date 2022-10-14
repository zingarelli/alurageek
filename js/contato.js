import { checkMaxLength, validateField } from "./valida-input.js";

// form and input elements
const contactForm = document.querySelector('.contact__form'); 
const nameInput = document.getElementById('name');
const messageTxt = document.getElementById('message');

// input validation
nameInput.addEventListener('blur', e => validateField(e.target));
messageTxt.addEventListener('blur', e => validateField(e.target));
nameInput.addEventListener('input', e => checkMaxLength(e.target));
messageTxt.addEventListener('input', e => checkMaxLength(e.target));

// send a message
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // element that will show a success/fail message
    const text = e.target.querySelector('.form__message');

    // send the message to back end
    const success = sendMessage();

    if(success) {        
        text.innerText = 'Mensagem enviada com sucesso!';
        text.classList.add('form__message--success')

        setTimeout(() => {
            text.classList.remove('form__message--success')
            text.innerText = '';
        }, 5000);
    } 
    else {
        text.innerText = 'Ocorreu um erro no envio da mensagem. Por favor, verifique se os campos foram preenchidos corretamente.';
        text.classList.add('form__message--error')

        setTimeout(() => {
            text.classList.remove('form__message--error')
            text.innerText = '';
        }, 5000);
    }

    // clear inputs
    contactForm.reset(); 
})

/* 
    Message should be handled in the back-end and then a success/fail should be received.
    For now, we pretend that the message was sent with sucess.
*/
function sendMessage() {
    if(nameInput.validity.valid && messageTxt.validity.valid)
        return true;
    else
        return false;
}