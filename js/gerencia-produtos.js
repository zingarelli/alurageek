/*
    List of functions to display, add, edit and remove products
*/

const MAX_ITEMS = 6; // number of items to display for each category
const MAX_ITEMS_MOBILE = 4; // number of items visible on mobile and tablet screens

const productsCatalog = document.querySelector('.products__catalog'); // element that display products

// load and display products in the page
export async function displayProducts() {
    // retrieve products from API
    const productsResponse = await getProducts();

    // create and populate products galleries
    productsResponse.forEach(category => {
        // create gallery for each category of products
        const gallery = createGallery(category['categoryName']);

        // add products to the gallery
        const products = category['products'];
        addProductsToGallery(products, gallery);
    });
}

// return a list of products retrieved from an API
async function getProducts() {
    try{
        /*
            I'm simulating an API response with a JSON file already included
            in the project. For production, this needs to be modified to a
            real API URL and errors should be handled more carefully.
        */
        const url = '../api/produtos.json';
        const response = await fetch(url);
        const productsList = await response.json();
    
        return productsList;
    } catch(err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }
}

// create a gallery element and add it to the products catalog
function createGallery(categoryName) {
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');
    gallery.innerHTML = `
        <div class="gallery__header">
            <h2 class="gallery__title">${categoryName}</h2>
            <a href="#" class="gallery__anchor">Ver tudo &#10132;</a>
        </div>
    `;
    productsCatalog.appendChild(gallery);
    
    // return the gallery to append products
    return gallery;
}

// add a list of products to a gallery, based on the 
// maximum of items defined to be displayed for each category
function addProductsToGallery(products, gallery){
    const listOfProducts = document.createElement('div');
    listOfProducts.classList.add('gallery__items');

    for(let i = 0; i < MAX_ITEMS; i++) {
        const product = createProductCard(products[i]);

        // mobile and tablet layouts have fewer items, so we hide the surplus
        if(i >= MAX_ITEMS_MOBILE) {
            product.classList.add('item__card--visibility');
        }

        listOfProducts.appendChild(product);
    };

    gallery.appendChild(listOfProducts);
}

// create a card element to display information regarding a product
function createProductCard(product){
    const productCard = document.createElement('div');
    productCard.classList.add('item__card');
    productCard.innerHTML = `
        <div class="item__card">
            <img src="${product.picture}" alt="Foto do produto" class="item__image">
            <p class="item__name">${product.name}</p>
            <p class="item__price">R$ ${product.price}</p>
            <a href="detalhe-produto.html/?id=${product.id}" class="item__anchor">Ver produto</a>
        </div>
    `;
    return productCard;
}
