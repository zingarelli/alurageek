// validate input content, using Constraint validation API
export function validateField(input) {

    // element that will show validation error
    const errorMessageElement = input.parentElement.querySelector('.input__validation-message');

    // check which type of validation failed        
    if(input.validity.valueMissing) { // blank input
        // add custom text to be shown if the user clicks on the submit button
        input.setCustomValidity('Este campo não pode ficar em branco');

        // add custom text to be shown below the input field
        errorMessageElement.innerText = 'Este campo não pode ficar em branco';

        //change input style
        input.classList.add('input--invalid');
    }       
    else if (input.validity.typeMismatch){ // invalid e-mail
        input.setCustomValidity('Por favor, verifique se o e-mail foi digitado corretamente');
        errorMessageElement.innerText = 'Por favor, verifique se o e-mail foi digitado corretamente';
        input.classList.add('input--invalid');
    } else if (input.validity.tooLong) { // input exceed maxLength
        const maxLength = input.getAttribute('maxLength');
        input.setCustomValidity(`Você ultrapassou o número máximo de ${maxLength} caracteres`);
        errorMessageElement.innerText = `Você ultrapassou o número máximo de ${maxLength} caracteres`;
        input.classList.add('input--invalid');
    }
    else { // it's a valid input
        // reset validation texts and styles
        errorMessageElement.innerText = '';
        input.classList.remove('input--invalid');
        input.setCustomValidity('');
    }           
}

// check input length and show message when it's close to max length
export function checkMaxLength(input) {
    const currentLength = input.value.length;
    const maxLength = input.getAttribute('maxLength');
    const charactersAvailable = maxLength - currentLength;
    const errorMessageElement = input.parentElement.querySelector('.input__validation-message');

    if(charactersAvailable <= 10) {
        // warn the user how many characters are left
        errorMessageElement.innerText = `${charactersAvailable} caracteres disponíveis.`
    }
    else {
        errorMessageElement.innerText = '';
    }
}