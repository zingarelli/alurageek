const searchIcon = document.querySelector('.header__search-icon');
const searchBox = document.querySelector('.header__searchbox');

// hide icon and show search box
searchIcon.addEventListener('click', () => {
    searchBox.classList.add('header__searchbox--mobile');
    searchBox.focus();
    searchIcon.style.display = 'none';
})

// if the window is resized, ensure the visibility of the icons are respecting the original layout
onresize = () => {
    searchBox.classList.remove('header__searchbox--mobile');
    if(window.innerWidth < 768){
        searchIcon.style.display = 'block';
    }
    else {
        searchIcon.style.display = 'none';
    }
}