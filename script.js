const loginBtn = document.querySelector('.header__login'); // button to access login page

// ----- Events

// redirect to the login page
loginBtn.addEventListener('click', () => {
    window.location = 'login.html';
})