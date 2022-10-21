/*
    List of functions to display, add, edit and remove products
*/

const MAX_ITEMS = 6; // number of items to display for each category
const MAX_ITEMS_MOBILE = 4; // number of items visible on mobile and tablet screens

const productsCatalog = document.querySelector('.products__catalog'); // element that display products

/**
 * Load products list and display it in the page, based on the category
 * @param type Type of layout to display products. Use "all" to show all products in a single gallery, 
 * "split" to display a gallery of products for each available category, "search" to show products
 * based on a set of keywords, and "category" to show products for a category
 * @param key (optional) A set of keywords to search products by name, product Id or a category Id
 */
//TODO: refactor this function, it's too big and full of responsibilities
export async function displayProducts(type, key) {
    // retrieve products from API
    const productsResponse = await getProducts();

    // display all products
    if (type === 'all') {
        const gallery = createGallery();

        addTitleToGallery(gallery, 'Todos os produtos');
        addButtonToGallery(gallery, 'adicionar-produto.html', 'Adicionar produto');
        addAllProductsToGallery(productsResponse, gallery);
        // products in the admin page have edit/remove buttons
        addButtonsToProducts(gallery);
    }
    // display products, divided by category
    else if (type === 'split') {
        productsResponse.forEach(category => {
            const gallery = createGallery();
            const products = category['products'];
            const quantity = products.length;
            const maxItems = quantity < MAX_ITEMS ? quantity : MAX_ITEMS;
            const maxItemsMobile = quantity < MAX_ITEMS_MOBILE ? quantity : MAX_ITEMS_MOBILE;

            addTitleToGallery(gallery, category['categoryName']);
            addLinkToGallery(gallery, `categoria.html?cat=${category['categoryId']}`, 'Ver tudo &#10132;')
            addProductsToGallery(gallery, products, maxItems, maxItemsMobile);
        });
    }
    // display all products for a single category
    else if (type === 'category') {
        const category = await getProducstByCategory(key);
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
    // display products given a keyword search
    else if (type === 'search') {
        const products = await getProductsByKeywords(key);
        const gallery = createGallery();

        if (products.length > 0) {
            addTitleToGallery(gallery, "Resultado da Busca");
            addProductsToGallery(gallery, products, products.length, products.length);
        }
        else {
            addTitleToGallery(gallery, "A busca não retornou nenhum resultado!");
        }
    }
    // display related products
    else if (type == 'related') {
        const products = await getRelatedProducts(key);
        
        if(products) {
            const gallery = createGallery();
            const quantity = products.length;
            const maxItems = quantity < MAX_ITEMS ? quantity : MAX_ITEMS;
            const maxItemsMobile = quantity < MAX_ITEMS_MOBILE ? quantity : MAX_ITEMS_MOBILE;

            addTitleToGallery(gallery, 'Produtos similares');
            addProductsToGallery(gallery, products, maxItems, maxItemsMobile);
        }
    }
}

// display a single product on the page
export async function displayProductDetails(productId) {
    const product = await getProductById(productId);

    if (product) {
        // display product
        createProductDetailsSection(product);

        // display related products
        displayProducts('related', productId);
    }
    else {
        const gallery = createGallery();
        addTitleToGallery(gallery, "Erro! Produto não encontrado.");
    }

}

// return a list of products retrieved from an API
async function getProducts() {  
    try {
        /*
            I'm simulating an API response with a JSON saved in a GitHub Gist. 
            For production, this needs to be modified to a real API URL and 
            errors should be handled more carefully.
        */
        const url = 'https://gist.githubusercontent.com/zingarelli/2bd16935f38e0b7337f233becf02a9fd/raw/d342b77a8384153918403f5897daddfe24b91d13/produtos.json';
        const response = await fetch(url);
        const productsList = await response.json();

        return productsList;
    } catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }
}

/*
    Functions getProductsBy...() would send a request to API passing the 
    searching parameter in order to receive products. Since there is no 
    back end in this project, I'm using the JSON file included in the 
    project and querying results from it.
*/

// return a list of products whose name matches one of the keywords
async function getProductsByKeywords(keywords) {
    const productsList = [];
    try {
        //get all products
        const products = await getProducts();

        // filter by name in each category category
        products.forEach(category => {
            productsList.push(...category['products'].filter(({ name }) => {
                // in case the user has typed more than one word, 
                // we'll do the search for each word and return the
                // product only once
                let itemFound = false;
                //TODO: use a different loop to stop the loop and return early if a conditional is true
                keywords.split(' ').forEach(key => {
                    if (name.toLowerCase().includes(key.toLowerCase())) {
                        itemFound = true;
                    }
                })
                return itemFound;
            }))
        })
    }
    catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }
    return productsList;
}

// return a list of products for a given category 
async function getProducstByCategory(categoryId) {
    try {
        // get all products
        const products = await getProducts();
        for (const category of products) {
            if (category['categoryId'] === categoryId) {
                return category;
            }
        }
    }
    catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }

    //return an empty array if the category doesn't exist
    return null;
}

// return a data from a single product for a given ID
async function getProductById(productId) {
    try {
        // get all products
        const products = await getProducts();

        // look for the product in every category
        for (const category of products) {
            const product = (category['products'].filter(({ id }) => id === productId));
            if (product.length > 0) return product[0];
        }
    }
    catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }

    return null;
}

// return products related to a given product
async function getRelatedProducts(productId) {
    try {
        // I'm simulating related products by returning random products of the same category

        // get category
        const categoryId = await getCategory(productId);

        // get random products, excluding the current one
        const products = await getRandomProducts(categoryId, productId)

        if(products) return products;
    }
    catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }

    return null;
}

// return random products from a category (simulating related products)
// current product is exclued from the search
async function getRandomProducts(categoryId, productId) {
    try {
        const category = await getProducstByCategory(categoryId);

        if (category) {
            // excluding current product
            const products = category['products'].filter(({ id }) => id !== productId);

            // shuffle the order of the products
            const productsShuffled = shuffleArray(products);

            // there's a limited number of products to display
            const quantity = productsShuffled.length;
            const maxItems = quantity < MAX_ITEMS ? quantity : MAX_ITEMS;

            if (maxItems > 0) return productsShuffled.slice(0, maxItems);
        }
    }
    catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }

    return null;
}

// copied from https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
// shuffle elements of an array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// return the Id of the category of a given product
async function getCategory(productId) {
    try {
        // get all products
        const products = await getProducts();

        // look for the product in every category
        for (const category of products) {
            const product = (category['products'].filter(({ id }) => id === productId));
            // return category ID
            if (product.length > 0) return category.categoryId;
        }
    }
    catch (err) {
        console.log('Erro ao receber produtos da API\n' + err);
    }

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
        <img src="${product.picture}" onclick="location.href='detalhe-produto.html?id=${product.id}'" alt="Foto do produto" class="item__image">
        <p class="item__name">${product.name}</p>
        <p class="item__price">R$ ${product.price}</p>
        <a href="detalhe-produto.html?id=${product.id}" class="item__anchor">Ver produto</a>
    `;
    return productCard;
}

// create a section with details of a single product
function createProductDetailsSection(product) {
    const productSection = document.createElement('section');
    productSection.classList.add('item');
    productSection.innerHTML = `
        <div class="item__banner" aria-label="Imagem do produto ${product.name}"></div>
        <div class="item__content">
            <h1 class="item__title">${product.name}</h1>
            <p class="item__price">R$ ${product.price}</p>
            <p class="item__description">${product.description}</p>
        </div>
    `
    productsCatalog.appendChild(productSection);

    // the image for the banner is a background-image in CSS, 
    // so we need to change this property in CSS 
    // (yes, this is an ugly solution. TODO: refactor HTML and CSS)
    changeProductBanner(product.picture)
}

// change background-image property with a new image
function changeProductBanner(image) {
    const itemBanner = document.querySelector('.item__banner');
    itemBanner.style.backgroundImage = `url(${image})`;
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

// add edit and remove buttons (represented by icons) to products
function addButtonsToProducts(gallery) {
    const items = gallery.querySelectorAll('.item__card');

    // TODO: for future releases, this needs to be changed to add onclick function and product id
    // maybe add this when the product element is being created 
    items.forEach(item => {
        const buttons = document.createElement('div');
        buttons.classList.add('item__management');
        buttons.innerHTML = `
            <button class="item__management-button item__management-button--delete" aria-label="Deletar item"></button>
            <button class="item__management-button item__management-button--edit" aria-label="Editar item"></button>
        `

        item.appendChild(buttons);        
    })
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

    addProductsToGallery(gallery, products, products.length, products.length);
}