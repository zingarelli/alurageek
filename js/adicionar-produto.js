import { validateField, checkMaxLength, checkIfKeyIsANumber } from "./valida-input.js";

const adminButton = document.querySelector('.header__admin');

// form and input elements
const form = document.querySelector('.product');
const inputs = document.querySelectorAll('.product input, .product select, .product textarea');

// when the user clicks on the admin button, redirects to "all products" page
adminButton.addEventListener('click', () => {
    window.location = 'produtos.html';
})

// input validation
inputs.forEach( input => {
    input.addEventListener( 'blur', e => validateField(e.target) );
    // check max length for inputs that have this attribute
    if (input.getAttribute('maxLength')) {
        input.addEventListener( 'input', e => checkMaxLength(e.target) );
    }
    // check if user is typing number for inputs of type='number'
    if (input.type === 'number') {
        input.addEventListener( 'keyup', e => checkIfKeyIsANumber(e) );
    }
});

// add a product
form.addEventListener('submit', e => {
    e.preventDefault();

    // element that will show a success/fail message
    const text = e.target.querySelector('.form__message');

    // send the message to back end
    const success = addProduct();

    if(success) {        
        text.innerText = 'Produto adicionado com sucesso!';
        text.classList.add('form__message--success')

        setTimeout(() => {
            text.classList.remove('form__message--success')
            text.innerText = '';
        }, 5000);
    } 
    else {
        text.innerText = 'Erro ao salvar o produto. Por favor, verifique se os campos foram preenchidos corretamente.';
        text.classList.add('form__message--error')

        setTimeout(() => {
            text.classList.remove('form__message--error')
            text.innerText = '';
        }, 5000);
    }

    // clear inputs
    form.reset(); 
})

// send product data to be handled by the back end
function addProduct() {
    let invalidInput = 0;

    // check if there's any invalid input
    inputs.forEach( input => {
        if(!input.validity.valid){
            invalidInput++;
        }
    })

    // for now, we're only validating input fields. Next step: mock an API response and save product using localstorage
    if(invalidInput > 0) {
        return false;
    }
    else {
        return true;
    }
}