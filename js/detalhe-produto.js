import { displayProductDetails } from './gerencia-produtos.js'
// get product ID from the parameters of the URL 
const params = new URLSearchParams(document.location.search);
const productId = params.get('id');

// display product
displayProductDetails(productId);

// display related products