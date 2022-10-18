/*
    List of functions to display, add, edit and remove products
*/

const MAX_ITEMS = 6; // number of items to display for each category
const MAX_ITEMS_MOBILE = 4; // number of items visible on mobile and tablet screens

const productsCatalog = document.querySelector('.products__catalog'); // element that display products

/**
 * Load products list and display it in the page, based on the category
 * @param categoryId Id of a category to fetch products from. Use "all" to fetch all products, or
 * "split" to display a gallery of products to each available category.
 */
export async function displayProducts(categoryId) {
    // retrieve products from API
    const productsResponse = await getProducts();

    // display all products
    if (categoryId === 'all') { 
        const gallery = createGallery();

        addTitleToGallery(gallery, 'Todos os produtos');
        addButtonToGallery(gallery, 'adicionar-produto.html', 'Adicionar produto');
        addAllProductsToGallery(productsResponse, gallery);
    }
    // display products, divided by category
    else if (categoryId === 'split') { 
        productsResponse.forEach(category => {
            const gallery = createGallery();
            const products = category['products'];

            addTitleToGallery(gallery, category['categoryName']);
            addLinkToGallery(gallery, `categoria.html?cat=${category['categoryId']}`, 'Ver tudo &#10132;')
            addProductsToGallery(gallery, products, MAX_ITEMS, MAX_ITEMS_MOBILE);
        });
    }
    // display all products for a single category
    else { 
        const category = getCategory(productsResponse, categoryId);
        const gallery = createGallery();

        if (category != null) {
            const products = category['products'];

            addTitleToGallery(gallery, category['categoryName']);
            addProductsToGallery(gallery, products, products.length, products.length);
        }
        else { // category doesn't exist
            addTitleToGallery(gallery, 'A categoria informada não existe!');
        }
    }
}

// return a list of products retrieved from an API
async function getProducts() {
    try {
        /*
            I'm simulating an API response with a JSON file already included
            in the project. For production, this needs to be modified to a
            real API URL and errors should be handled more carefully.
        */
        const url = '../api/produtos.json';
        const response = await fetch(url);
        const productsList = await response.json();

        return productsList;
    } catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }
}

// return category from the list of products given a category Id
function getCategory(products, categoryId) {
    for (const category of products) {
        if (category['categoryId'] === categoryId) {
            return category;
        }
    }

    //return an empty array if the category doesn't exist
    return null;
}

// create a gallery element and add it to the products catalog
function createGallery() {
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');
    gallery.innerHTML = `
        <div class="gallery__header">
            <h2 class="gallery__title"></h2>
        </div>
    `;

    //add gallery to the page
    productsCatalog.appendChild(gallery);

    // return the gallery to append products
    return gallery;
}

// create a card element to display information regarding a product
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('item__card');
    productCard.innerHTML = `
        <div class="item__card">
            <img src="${product.picture}" alt="Foto do produto" class="item__image">
            <p class="item__name">${product.name}</p>
            <p class="item__price">R$ ${product.price}</p>
            <a href="detalhe-produto.html?id=${product.id}" class="item__anchor">Ver produto</a>
        </div>
    `;
    return productCard;
}

// add a name to the gallery element
function addTitleToGallery(gallery, name) {
    const galleryTitle = gallery.querySelector('.gallery__title');
    galleryTitle.innerText = name;
}

// add a link to the gallery element
function addLinkToGallery(gallery, url, title) {
    const galleryHeader = gallery.querySelector('.gallery__header');

    const link = document.createElement('a');
    link.classList.add('gallery__anchor');
    link.href = url;
    link.innerHTML = title;

    galleryHeader.appendChild(link);
}

// add a button (an anchor tag with different classes) to the gallery element
function addButtonToGallery(gallery, url, title) {
    const galleryHeader = gallery.querySelector('.gallery__header');

    const link = document.createElement('a');
    link.classList.add('button--primary');
    link.href = url;
    link.innerHTML = title;

    galleryHeader.appendChild(link);
}

/**
 * Add a list of products to a gallery
 * @param gallery Gallery to show the products
 * @param products List of products
 * @param maxItems Maximum number of items to display in the page
 * @param maxItemsMobile Maximum number of items to display in mobile/tablet layout
 */
function addProductsToGallery(gallery, products, maxItems, maxItemsMobile) {
    const listOfProducts = document.createElement('div');
    listOfProducts.classList.add('gallery__items');

    for (let i = 0; i < maxItems; i++) {
        const product = createProductCard(products[i]);

        // mobile and tablet layouts have fewer items displayed 
        // in home page, so we hide the surplus
        if (i >= maxItemsMobile) {
            product.classList.add('item__card--visibility');
        }

        listOfProducts.appendChild(product);
    };

    gallery.appendChild(listOfProducts);
}

// add all available products to a single gallery
function addAllProductsToGallery(productsList, gallery) {
    const products = []

    // get products from every category
    productsList.forEach(category => {
        category['products'].forEach(item => {
            products.push(item);
        })
    })

    addProductsToGallery(gallery, products, products.length, products.length)    
}