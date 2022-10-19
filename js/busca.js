import { displayProducts } from "./gerencia-produtos.js";

// get keywords from the parameters of the URL 
const params = new URLSearchParams(document.location.search);
const keywords = params.get('busca');

displayProducts('search', keywords);
