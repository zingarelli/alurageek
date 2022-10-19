import { displayProducts } from "./gerencia-produtos.js";

// get category from the parameters of the URL 
const params = new URLSearchParams(document.location.search);
const categoryId = params.get('cat');

displayProducts('category', categoryId);