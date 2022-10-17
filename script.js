import { displayProducts } from './js/gerencia-produtos.js';

const loginBtn = document.querySelector('.header__login'); // button to access login page

// redirect to the login page
loginBtn.addEventListener('click', () => {
    window.location = 'login.html';
})

// show products when the home page loads
displayProducts();