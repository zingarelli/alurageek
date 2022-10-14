// validate input content, using Constraint validation API
export function validateField(input) {

    // element that will show validation error
    const errorMessageElement = input.parentElement.querySelector('.input__validation-message');

    // check which type of validation failed        
    if (input.validity.typeMismatch){ // invalid e-mail
        // add custom text to be shown if the user clicks on the submit button
        input.setCustomValidity('Por favor, verifique se o e-mail foi digitado corretamente');

        // add custom text to be shown below the input field
        errorMessageElement.innerText = 'Por favor, verifique se o e-mail foi digitado corretamente';

        //change input style
        input.classList.add('input--invalid');
    } else if (input.validity.tooLong) { // input exceed maxLength
        const maxLength = input.getAttribute('maxLength');
        input.setCustomValidity(`Você ultrapassou o número máximo de ${maxLength} caracteres`);
        errorMessageElement.innerText = `Você ultrapassou o número máximo de ${maxLength} caracteres`;
        input.classList.add('input--invalid');
    } else if (input.validity.rangeUnderflow) { // negative price
        input.setCustomValidity('Por favor, insira um valor acima de 1 centavo.');
        errorMessageElement.innerText = 'Por favor, insira um valor acima de 1 centavo.';
        input.classList.add('input--invalid');
    } else if (input.validity.stepMismatch || input.validity.badInput) { // malformed price 
        input.setCustomValidity('Por favor, utilize duas casas decimais');
        errorMessageElement.innerText = 'Por favor, utilize duas casas decimais';
        input.classList.add('input--invalid');
    } else if(input.validity.valueMissing) { // blank input        
        input.setCustomValidity('Este campo não pode ficar em branco');        
        errorMessageElement.innerText = 'Este campo não pode ficar em branco';        
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

// show a message when user tries to type a letter in an input where only numbers are allowed
export function checkIfKeyIsANumber(event) {
    const errorMessageElement = event.target.parentElement.querySelector('.input__validation-message');
    if(event.key.match(/^[a-zA-Z]$/g)) {
        errorMessageElement.innerText = 'Por favor, digite somente números e vírgula para separar os centavos.';
    } 
    else {
        errorMessageElement.innerText = '';
    }
}