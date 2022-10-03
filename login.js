const login_form = document.querySelector('.login'); //form to login to the admin page

// needs to validade login credentials. For now, it just redirects to products list page
login_form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location = 'produtos.html';
})
