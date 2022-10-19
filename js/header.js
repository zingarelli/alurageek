const searchIcon = document.querySelector('.header__search-icon');
const searchBox = document.querySelector('.header__searchbox');
const currentWindowWidth = window.innerWidth;

// redirect to results page when Enter is pressed
searchBox.addEventListener('keydown', e => {
    if(e.keyCode === 13) {
        window.location.href = `resultado.html?busca=${e.target.value}`;
    }
})

// hide icon and show search box
searchIcon.addEventListener('click', () => {
    searchBox.classList.add('header__searchbox--mobile');
    searchBox.focus();
    searchIcon.style.display = 'none';
})

/**
 * If the window is resized, ensure the visibility of the icons are 
 * respecting the original layout. This will only be applied if there
 * were a change in the width. This step is necessary because when 
 * a keyboard is open on mobile, this trigger onresize event due to
 * a change in the height (changes in height don't affect the layout).
 * */ 
onresize = () => {
    // changes will be applied only if the window width changed
    if(currentWindowWidth !== window.innerWidth){
        searchBox.classList.remove('header__searchbox--mobile');
        if(window.innerWidth < 768){
            searchIcon.style.display = 'block';
        }
        else {
            searchIcon.style.display = 'none';
        }
    }
}