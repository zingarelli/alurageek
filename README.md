# Alura Geek | Challenge Front-End 2022

[Veja esta página em português](#detalhes-do-projeto).

Alura Geek, a (fictitious) geek company, has contacted us to develop their e-commerce website. Our task is to create responsive and interactive pages: Home, Login, Products, Add Product and Product Details. 

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | Desafio Front-End: página de e-commerce
| :label: Tecnologias | HTML, CSS, JavaScript
| :rocket: URL         | https://zingarelli.github.io/alurageek/
| :fire: Desafio     | https://www.alura.com.br/challenges/front-end-5

![](https://user-images.githubusercontent.com/19349339/192602092-6af3b6f3-8ec1-489e-8520-302ba9de2db4.png#vitrinedev)

## Project Details
This project is the result of my participation in the [5th Edition of Alura's Front End Challenge](https://www.alura.com.br/challenges/front-end-5). Using a Challenge Based Learning approach, we put our learning into action by solving a real-world challenge. [Alura](https://www.alura.com.br) is a brazilian online school of technology.

# The Challenge: e-commerce for AluraGeek
**AluraGeek** is a brazilian company that sells stuff related to Geek Culture. They're aiming to expand their business to all of Brazil, and for that they **hired us to implement an e-commerce website**. 

As a **Front End Dev**, my tasks are to develop 4 pages:

- **Home Page**: the main content is composed of a banner to display sales or any other relevant information, and three galleries for different categories of products;
- **Login**: a simple login page to enter e-mail and password (for admin purposes);
- **Products**: an administrative page that will display all products available, with buttons to edit/remove a product;
- **Add Product**: another administrative page to add a new product to the e-commerce.

The company will be *very pleased* if I also deliver a fifth page: **Product Details**, a page to display information about a single product and a gallery of related products.

It's **very important** for AluraGeek that their e-commerce website is **responsive**, so customers can have a nice shopping experience either on mobile, tablet or PC.

Layout for every page is provided in a [Figma file](https://www.figma.com/file/fR9qvy3gU53s2q5efeMpy9/AluraGeek---Challenge). 

# The Development
AluraGeek expects project updates on a *weekly basis*.

## Mobile-First and BEM Methodology
I decided to develop the pages using a "mobile-first approach", which means that I will first develop the layout for mobile screens and then proceeded to larger screens, where more space is available to position elements or even add new ones. In order to do that, I'll add new styles using the following media queries:

```css
@media screen and (min-width: 768px){ ... }
@media screen and (min-width: 1024px){ ... }
```

Classes in the HTML file will be named using [BEM methodology](https://getbem.com/introduction/) (Block-Element-Modifier). This is a good way of naming classes and grouping elements, which helps in keeping a well organized code and avoiding conflicts between classes with similar names. For example:

```html
<section class="container">
    <div class="container__box">
        <h1 class="container__title">...</h1>
        <p class="container__text--highlight">...</p>
```

## Week 1

During the first week, I focused on developing the Home Page. You can see the page online by [clicking here](https://zingarelli.github.io/alurageek/).

Some elements are not displayed in the mobile layout, but only in larger screens (over 768px). The opposite also happens. In order to control this, I added the CSS properties `display: none` and `display: block` for those elements, whenever necessary. 

The Home Page has 3 galleries to display products in different categories: "Star Wars", "Consoles" and "Others". I decided to use **Flexbox** to display these products, since the gallery can be considered as a single line that should break to adapt to the screen's width. To enable line-break, I added the property `flex-wrap: wrap` to the gallery element. I also added a `width` property (in percentage) to each product, so they can grow/shrink depending on the size of the screen, but still maintaining the layout proposed for each screen in the Figma file.

In the footer section, I also used Flebox for the mobile layout, since every element was in a single column, so it was easy to position them using only `flex-direction: column`. However, I decided to use **Grid** for tablet and desktop layouts, because they've placed the elements of this section in different positions, as can be seen in the image below:

![footer layout for desktop, tablet and mobile screens](https://user-images.githubusercontent.com/19349339/193277824-13b765c0-f659-4584-bce3-582b8d36acfd.png)

By using `grid-template-areas` and `grid-area`, it became easier to place the elements and change their sizes accordingly for each layout. 

```css
.footer__logo {
    grid-area: logo;
}

.footer__list {
    grid-area: links;
}

.contact {
    grid-area: contact;
}

/* min-width: 768px (tablet) */
.footer__container {
    grid-template-areas: 
        "logo contact"
        "links contact";
    grid-template-columns: 1fr 2fr;
}

/* min-width: 1024px (desktop) */
.footer__container {
    grid-template-areas: "logo links contact";
    grid-template-columns: 1fr 1fr 2fr;
}

```

## Week 2
In the second week, the focus was to develop pages for administrative purposes: [login](https://zingarelli.github.io/alurageek/login.html), [remove/edit products](https://zingarelli.github.io/alurageek/produtos.html), [add new product](https://zingarelli.github.io/alurageek/adicionar-produto.html). I've also developed the extra page required by the company: [product details](https://zingarelli.github.io/alurageek/detalhe-produto.html).

For now, I'm focused on developing only the appearance of each page and ensure they're responsive, so there are still no login validation nor onclick functions for edit/delete buttons. There are, however, input validation (using the `required` attribute in some input fields) and some onclick events that redirect users for specific pages (for example, if you click on "Adicionar Produto" button in the [Manage Products page](https://zingarelli.github.io/alurageek/produtos.html), you're redirected to the [Add Product page](https://zingarelli.github.io/alurageek/adicionar-produto.html)).

Buttons and input fields shared the same styles on every page, with minor differences here and there, so I took the time to do some refactor in style.css and the HTML files, changing the name of some classes to something more generic (for example: `input__text`, `input__field--content`). This way those styles were reusable and I could focus in only adding styles for minor modifications (like `margin` and `padding`).

I decided to create specific CSS and JS files for every page, helping in managing the small style changes and JavaScript events needed. In order to keep the project well organized, I created directories for CSS and JS files, and each file has the same name of the pages they're related to. Even so, `reset.css`, `style.css` and `script.js` were kept in the root directory: they're not related to only a single page and can be used by every page (or even other CSS and JS files), so I think it's easier to locate and access them in the root directory.

A major refactor was applied in the styles for the "products gallery" sections in the Home Page. In week 1, I decided to use **Flexbox** in these sections, because I was thinking of them as being a single line of items that should break according to the screen's width. I was also using `justify-content: space-between` to space items horizontally. During this week, while developing the Products Page (which also have a "products gallery" section), I noticed that this solution with Flexbox would not be adequate: the last row in the tablet layout had only two items and, due to the `justify-content: space-between` property, one item was placed on the left side of the screen and the other on the right side. This problem can be seen in the image below: 

![items in the last two rows of producst page, using Flexbox](https://user-images.githubusercontent.com/19349339/193615094-5f7a55a3-dc4b-4aee-8cd6-d9c73e91d4a5.png)

I could apply a different `margin` to the last item (using pseudo-class `:last-child`) as a workaround, but the problem would reappear if we had a third item in the last row (the second item would be centered in the available space). So I decided to change the display property to **Grid**, using `grid-template-columns` property to adjust the number of columns and their sizes accordingly for each layout (2 for mobile, 4 for tablet and 6 for desktop). Using this approach, items in the last row are now always displayed side by side. Another advantage is that I no longer need to modify the items' width for every layout - Grid takes care of this, keeping the proportions according to the number of columns. The result of using Grid can be seen in the image below:

![items in the last two rows of producst page, using Grid](https://user-images.githubusercontent.com/19349339/193617405-21a46a38-799e-48a4-ac00-d3c15b3571fd.png)

## Weeks 3 and 4
The last two weeks are dedicated to apply JavaScript to enable several functionalities:

- validate form fields;
- handle authentication (login);
- dinamically display products;
- show results when a user searches for a product (using search bar);
- perform the necessary actions when the user clicks on a link or a button.

### Form Validation
There are [two ways of performing a client-side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation): 

1. built-in form validation using HTML;
2. using JavaScript and the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#complex_constraints_using_the_constraint_validation_api).

For studies purposes, I decided to use both, in order to get acquainted with each of these approaches and understand how and when it's good to apply them. 

#### Form validation using HTML

HTML5 provides several validation attributes that can be applied to form elements to ensure a built-in form validation. CSS also provides `:valid`, `:invalid` and other pseudo-classes that can be used to apply different styles depending on whether a form field is valid or not.

For this project, I used the validation attributes below (each has the MDN link for more information):

- [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required);
- [`type="..."`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type);
- [`maxLength="..."`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength);
- [`min="0.01"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min): so the price of a product has to be at least R$0,01 (one cent of brazilian Real);
- [`step="0.01"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step): to keep the increase/decrease of a price at a minimum of one cent of brazilian Real;

I consider that there are two disadvantages on relying only in the HTML built-in form validation:

1. Most of the validation will happen only after the user clicks on the "Submit" button;
2. Each browser has its own way of handling this type of validation, so error messages and some styles are not fully customizable.

#### Form validation using JavaScript

With JavaScript I can take control of when, which and how validation will happen. 

I decided that validation should happen whenever the user switch between input fields, so an error message can be displayed prior to the form submission. For that, I added validation to `onblur` events. Example:

```js
nameInput.addEventListener('blur', e => validateField(e.target));
```

Some input fields have a maximum number of characters. For them I've also added an `input` event to check for changes and warn the user when there are less than 10 characters available. Example:

```js 
nameInput.addEventListener('input', e => checkMaxLength(e.target));
```

The price field also has a `keyup` event to check if user is trying to type a character that is not a number, a comma or a dot, warning the user if that's the case:

```js
input.addEventListener( 'keyup', e => checkIfKeyIsANumber(e) );
```

I also used the Constraint Validation API to check validity of input fields and to customize the error message of the HTML built-in form validation:

- `input.validity`: it's a property that returns a `ValidityState` object, which contains several other properties like `valueMissing` and `typeMismatch` that can be used to check which type of validation has failed;
- `input.setCustomValidity(message)`: this is the method that enables to change the default error message shown by the browser when validation fails.

I created JavaScript files for each form available and a specific file to handle validation (`valida-input.js`), exporting the validation functions to be used by the the other files.

Here's a gif of the validation in action in the "Add a Product" page:

![form validation for blank fields and with a maximum number of characters](https://user-images.githubusercontent.com/19349339/196252799-8ee0b9bf-948c-4d18-96b2-ce0a6ecc2ef1.gif)

### Authentication
Since this project only covers the Front End, I performed a hard-coded authentication, so we can see how the page looks with valid and invalid credentials.

For testing purposes, you can use the following credentials:

    e-mail: admin@alurageek.com

    password: my$trongP4ssw0rd

I **did not** add any type of "login wall" to the pages, which means that the user can still access administrative pages even when not logged in. This is something that I'm still not familiar with, so it's a **feature that should be added in future releases of this project**.

### Dinamically displaying products
This was **the biggest challenge in this project**. Instead of having products hard-coded in HTML files, they should be added using JavaScript, by fetching data from an API. Such API was not provided.

With no back end nor an API, I needed to improvise and simulate back-end processing and API responses. This is when things started to get messy and my JavaScript code started to become complex and confusing... **I need to improve my skills and tackle this challenge again in the future, creating a cleaner and more organized code**. For now, here's what I've done:

I simulated an API response by creating a JSON file with several products and their information, stored as an array of objects. Products were divided by category, each category having an array of products. The file can be accessed in `/api/produtos.json`. Here's a snippet of how data is stored in this file:

```json
[
    {
        "categoryName": "Star Wars",
        "categoryId": "1",
        "products": [
            {
                "id": "1",
                "picture": "img/star-wars/caneca.png",
                "name": "Caneca Stormtrooper",
                "price": "45,00",
                "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptates maiores pariatur laudantium fuga. Vel odio incidunt libero aperiam"
            }
            /* other products... */
        ]
    },
    {
        "categoryName": "Consoles",
        "categoryId": "2",
        "products": [ /* ... */]
    },
    /* other categories... */
]
```
I used [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to get data from the JSON file. At first, I was using `'../api/produtos.json'` as the URL for the `fetch()` method, and it worked when running this project on localhost. However, when I uploaded it to GitHub, the base URL changed and sometimes it returned an invalid URL. So I put the content of `produtos.json` file in a GitHub Gist and added it as the URL for the `fetch()` method.

```js
const url = 'https://gist.githubusercontent.com/zingarelli/2bd16935f38e0b7337f233becf02a9fd/raw/d342b77a8384153918403f5897daddfe24b91d13/produtos.json';
const response = await fetch(url);
const productsList = await response.json();
```

I created several functions to simulate communication with an API, like retrieving product data by id (`getProductById()`), a list of products by category (`getProducstByCategory()`), etc. 

In order to dinamically display the products, I created a function `displayProducts(type, key)` that was responsible for invoking other functions to get data and create all the HTML elements necessary to display a gallery of products. 

I wanted `displayProducts()` to be generic, handling different types of layout required by each page. For example: Home page shows products by category, each category having its own gallery and a maximum of 6 products (4 on mobile/tablet screens); Products page shows all products in a single gallery; and so on. In order to achieve that, I added two parameters: 

- `type`: a string, to handle the layout for each page;
- `key`: an optional number parameter to query products by name, id or category.

Values for these arguments were retrieved from a query string (parameters sent after `?` in a URL). I parsed these values using `location.search` property and `URLSearchParams` interface:

```js
// example of an URL: https://zingarelli.github.io/alurageek/resultado.html?busca=yoda
const params = new URLSearchParams(document.location.search);
const keywords = params.get('busca'); // 'yoda'
```

`displayProducts()` turned out to become quite a complex function, full of responsibilities and conditions. In future releases, **I plan on refactoring it**.

All functions related to displaying products and retrieving products data are on a single JavaScript file `gerencia-produtos.js`. I'm **not fully satisfied with this approach** and plan to change it in the future. Maybe create three files: one to create the HTML elements, one to handle the (simulated) API requests and one to intermediate between those two files to display products (maybe that's what they call a "controller"?).

### Search box
Users can search for products using the search box on top of every page. Keywords typed in this input are passed to another page as a query string. I filter the database, looking for products whose name includes any of these keywords. The result, if any, is show in a new page, `resultado.html`. When no product is found, an appropriated message is show to the user. 

In mobile layout, the search box is not visible (there's a magnifier icon instead), so I added a `click` event to this icon in order to display the search box when the user clicks on the icon.

![Search box is visible when the user clicks on the magnifier icon](https://user-images.githubusercontent.com/19349339/197269079-1be34dd2-cac1-4036-a8fb-7bfb6a71dcbb.gif)

### Interactivity 
The last requisite was to enable buttons and links (or at least most of them) to actually work. For example, when the user clicks on a product, s/he is redirected to another page showing details of such product. Other example is when clicking on the button to send a message: the message is not *actually* sent, but a "success" message is displayed. 

In Home page, there's a link on every category of products that redirects the user to see all products of that category. I created a new page to show these products: `categoria.html`.

The only links that do nothing are those in the footer, since their pages were not developed. Buttons to edit/remove a product also do nothing. In future releases, **I plan on using local storage to simulate these edit/remove actions**. 

## Pages created
- [Home](https://zingarelli.github.io/alurageek/index.html)
- [Login](https://zingarelli.github.io/alurageek/login.html)
- [Add a product](https://zingarelli.github.io/alurageek/adicionar-produto.html)
- [Show all products](https://zingarelli.github.io/alurageek/produtos.html)
- [Show products of a category](https://zingarelli.github.io/alurageek/categoria.html?cat=1) (using "Star Wars" category)
- [Details of a single product](https://zingarelli.github.io/alurageek/detalhe-produto.html?id=15) (details for a Sonic figurine)
- [Search results](https://zingarelli.github.io/alurageek/resultado.html?busca=yoda) (using "yoda" as keyword search).

## What's in the future?
Here I list some features to be added in future releases of this project:

- Administrative pages should only be accessed by authenticated users. Maybe create a cookie or session to confirm if the user is logged in;

- Add a product: right now, when all fields are valid and the user clicks on the button to add a product, only a "success" message is displayed. Maybe we can use [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to simulate that the product was added to the database. That would also involve several changes in the code in order to use local storage to get data of products, instead of using the JSON file;

- Edit/Remove a product: similar to add a product, we can use local storage to simulate a product was edited or removed from the database;

- Better JavaScript coding and organization: 
    - I created several JavaScript files to handle specific functions and behaviors for each page/feature, but I believe this could be improved. Maybe using some design pattern would help me;

    - Regarding the code, I created some really ugly functions, like `displayProducts()`, that have a lot of complexities and resposibilities, and I need to refactor them;

    -  Other thing that I need to refactor is how I simulate an API - maybe I should create a single JavaScript file to handle requests and responses, decoupling these responsibilities from other parts of the code, so that it would be easier when changing this to an actual API;
    
    - I also want to develop functions to create different HTML elements required to display products (I've already developed some of them), to sort of emulate what React does.

# Thank you 🫶

I'd like to thank Alura Team as whole for creating this challenge, specially [Mônica Hillman](https://www.linkedin.com/in/monicamhillman/), [Antônio Evaldo](https://www.linkedin.com/in/antonio-evaldo/) and [Vinícius Morais](https://br.linkedin.com/in/vinícius-morais). It was really satisfying putting into action what I've learned in the courses, simulating a real project, dealing with tasks and deadlines, and also sharing my results and asking for the help of other participants. 

Another "thank you" goes to folks in Discord that have also participated in this challenge. We shared tips, codes, discussed approaches to tackle the tasks and had fun 😄

---

# Detalhes do projeto

Este projeto é o resultado da minha participação na [5ª edição do Desafio de Front End da Alura](https://www.alura.com.br/challenges/front-end-5). Por meio de uma abordagem de aprendizado baseado em desafios, nós colocamos nossos conhecimentos em ação resolvendo um desafio do mundo real. A [Alura](https://www.alura.com.br) é uma escola online de tecnologia brasileira.

# O desafio: página de e-commerce da AluraGeek

A **AluraGeek** é uma empresa (fictícia) brasileira que vende produtos relacionados à cultura Geek. Eles planejam expandir seus negócios para todo o Brasil e por isso **nos contrataram para implementar a página de e-commerce deles**. 

Como um **desenvolvedor Front End**, minhas tarefas são desenvolver 4 páginas: 

- **Página Inicial**: o conteúdo principal é composto por um banner para destacar alguma promoção ou qualquer outra informação que a empresa achar relevante, e três galerias para diferentes categorias de produtos;

- **Login**: uma página simples de login para digitar um e-mail e senha (área de login para tarefas administrativas);

- **Produtos**: uma página administrativa que irá mostrar todos os produtos disponíveis, com botões para editar/remover produtos;

- **Adicionar Produto**: outra página administrativa para adicionar um novo produto ao site.

A empresa ficará *muito feliz* se eu também entregar uma quinta página: **Detalhes do Produto**, uma página para mostrar informações sobre um único produto e uma galeria com produtos relacionados.

É de **suma importância** para a AluraGeek que seu site de e-commerce seja **responsivo**, para que todos os clientes tenham uma boa experiência de compra, seja pelo celular, tablet ou computador.

O layout para cada página está disponível em um [arquivo Figma](https://www.figma.com/file/fR9qvy3gU53s2q5efeMpy9/AluraGeek---Challenge). 

# O desenvolvimento

A AluraGeek espera atualizações sobre o projeto *semanalmente*.

## Mobile-First e metodologia BEM

Eu decidi por desenvolver as páginas usando uma abordagem "mobile-first", isto é, primeiro eu irei desenvolver o layout para telas de celular (layout mobile) e depois prosseguir para telas maiores, onde há mais espaço disponível para posicionar os elementos ou até mesmo adicionar novos. Para conseguir isso, vou adicionar novos estilos utilizando as "media queries" abaixo:

```css
@media screen and (min-width: 768px){ ... }
@media screen and (min-width: 1024px){ ... }
```

As classes dos elementos HTML serão nomeadas utilizando a [metodologia BEM](https://getbem.com/introduction/) (Block-Element-Modifier, ou Bloco-Elemento-Modificador). Esta é uma boa maneira de dar nomes às classes e agrupar elementos, favorecendo a manutenção de um código bem organizado e prevenindo conflitos de nomes semelhantes em elementos distintos. Por exemplo:

```html
<section class="container">
    <div class="container__box">
        <h1 class="container__titulo">...</h1>
        <p class="container__texto--destaque">...</p>
```

## Semana 1

Durante a primeira semana, meu foco foi em desenvolver a página inicial. Você pode [vê-la online aqui](https://zingarelli.github.io/alurageek/).

Alguns elementos não são mostrados no layout mobile, mas somente em telas maiores (acima de 768px). O oposto também acontece. Para fazer o controle disso, eu adicionei as propriedades CSS `display: none` e `display: block` nos elementos, conforme necessário.

A página inicial exibe os produtos em três galerias, organizando-os em diferentes categorias: "Star Wars", "Consoles" e "Diversos". Eu decidi por utilizar o **Flexbox** para exibir os produtos, já que a galeria pode ser considerada como uma lista contínua que quebra em uma nova linha para se adaptar ao tamanho da tela. Para possibilitar essa quebra de linha, eu adicionei a propriedade `flex-wrap: wrap` para o bloco que representa uma galeria. Eu também adicionei a propriedade `width` (em porcentagem) para cada produto, de modo que eles pudessem aumentar/diminuir conforme o tamanho da tela, mas ainda assim mantendo o layout proposto no arquivo Figma.

Eu também utilizei o Flexbox na seção de rodapé (para o layout mobile), já que cada elemento era posicionado em uma única coluna, o que facilitava utilizar a propriedade `flex-direction: column` para produzir este efeito. Entretanto, eu optei por utilizar o **Grid** nesta mesma seção para os layouts de tablet e computador, porque os elementos são posicionados de maneira diferentes nestes layouts, como pode ser visto na imagem abaixo:

![seção de rodapé para as telas de computador, tablet e mobile](https://user-images.githubusercontent.com/19349339/193277824-13b765c0-f659-4584-bce3-582b8d36acfd.png)

Utilizando as propriedades `grid-template-areas` e `grid-area`, ficou fácil posicionar os elementos e mudar seus tamanhos de acordo com cada layout. 

```css
.footer__logo {
    grid-area: logo;
}

.footer__list {
    grid-area: links;
}

.contact {
    grid-area: contact;
}

/* min-width: 768px (tablet) */
.footer__container {
    grid-template-areas: 
        "logo contact"
        "links contact";
    grid-template-columns: 1fr 2fr;
}

/* min-width: 1024px (desktop) */
.footer__container {
    grid-template-areas: "logo links contact";
    grid-template-columns: 1fr 1fr 2fr;
}

```

## Semana 2

Para a segunda semana, o foco foi desenvolver as páginas administrativas: [login](https://zingarelli.github.io/alurageek/login.html), [remover/editar produtos](https://zingarelli.github.io/alurageek/produtos.html) e [adicionar um novo produto](https://zingarelli.github.io/alurageek/adicionar-produto.html). Eu também criei a página adicional solicitada pela empresa: [detalhes do produto](https://zingarelli.github.io/alurageek/detalhe-produto.html).

Por enquanto, estou concentrado em desenvolver somente a aparência de cada página e garantir que estejam responsivas, então ainda não há validação de login nem ações de clique para os botões de editar/remover. Há, no entanto, validação de entrada nos campos de texto (utilizando o atributo `required` nos elementos de `input`) e alguns eventos de `onclick` que redirecionam a pessoa para páginas específicas (por exemplo, ao clicar no botão "Adicionar Produto" na [página de administração dos produtos](https://zingarelli.github.io/alurageek/produtos.html), a pessoa é redirecionada para a [página de adicionar produto](https://zingarelli.github.io/alurageek/adicionar-produto.html)).


Botões e campos de texto compartilham dos mesmos estilos em cada página, com somente algumas diferenças aqui e acolá, então eu tirei um tempo para refatorar o arquivo `style.css` e os arquivos HTML, mudando o nome de algumas classes para algo mais genérico (por exemplo: `input__text`, `input__field--content`). Deste modo, os estilos podem ser reutilizáveis e eu posso focar em somente adicionar estilos para pequenas modificações (como  `margin` e `padding`).

Eu decidi criar arquivos CSS e JS específicos para cada página, para facilitar o gerenciamento de pequenas mudanças de estilo e eventos JavaScript necessários. Para manter o projeto bem organizado, eu criei pastas para os arquivos CSS e JS, sendo que cada arquivo possui o mesmo nome da página para o qual eles foram criados. Apesar disso, os arquivos `reset.css`, `style.css` e `script.js` foram mantidos na pasta raiz do projeto: eles não estão diretamente relacionados a uma página específica e podem ser utilizados por todas elas (ou até mesmo pelos outros arquivos CSS e JS), então eu acho que fica mais fácil de localizar e acessar estes três arquivos na raiz do projeto.

Uma grande refatoração foi aplicada nos estilos para as seções de galeria de produtos, que ficam na página inicial. Na semana 1, eu havia decidido utilizar o **Flexbox** nestas seções, porque eu as considerava como uma lista de items que deveriam quebrar de linha de acordo com a largura da tela. Naquele momento, eu estava utilizando a propriedade `justify-content: space-between` para dar espaço horizontal entre os itens da galeria. Durante esta semana, enquanto desenvolvia a página de produtos (que também possui uma seção de galeria), eu percebi que esta solução com o Flexbox não seria adequada: a última linha no layout para tablet possuía somente dois itens e, devido ao `justify-content: space-between`, um item ficava no canto esquerdo da tela e o outro no canto direito, com um grande espaço vazio entre eles, como pode ser visto na imagem abaixo: 

![itens da última linha da página de produtos, utilizando o Flexbox](https://user-images.githubusercontent.com/19349339/193615094-5f7a55a3-dc4b-4aee-8cd6-d9c73e91d4a5.png)

Eu poderia resolver isso utilizando uma `margin` diferente para o último item (com a pseudo-classe `:last-child`), porém um problema semelhante aconteceria se houvesse um terceiro item nessa última linha (o segundo item ficaria centralizado, com o espaço vazio sendo redistribuído, continuando diferente do layout das outras linhas). Então, eu decidi mudar a exibição para o **Grid**, utilizando a propriedade `grid-template-columns` para ajustar o número de colunas e seus tamanhos de maneira adequada a cada layout (2 colunas em telas de celular, 4 para tablet e 6 para computadores). Com esta abordagem, os itens na última linha agora sempre ficam dispostos lado a lado, mantendo as proporções de acordo com o número de colunas. O resultado da aplicação do Grid pode ser visto na imagem abaixo:

![itens da última linha da página de produtos, utilizando o Grid](https://user-images.githubusercontent.com/19349339/193617405-21a46a38-799e-48a4-ac00-d3c15b3571fd.png)

## Semanas 3 e 4

As últimas duas semanas são dedicadas a aplicar o JavaScript para habilitar diferentes funcionalidades: 

- validação de campos de formulário;
- autenticação (página de login);
- mostrar os produtos dinamicamente;
- mostrar os resultados ao se fazer uma busca por um produto (utilizando o campo de busca);
- executar as ações necessárias quando se clica em um link ou botão.

### Validação de formulário

Há [duas maneiras de se efetuar a validação de formulários pelo navegador](https://developer.mozilla.org/pt-BR/docs/Learn/Forms/Form_validation): 

1. validação nativa do HTML;

2. utilizando JavaScript e a [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#complex_constraints_using_the_constraint_validation_api).

Para propósitos de estudo, eu decidi aplicar ambas, para me acostumar com elas e entender como e quando é bom utilizar cada uma.

#### Validação nativa do HTML

O HTML5 disponibiliza diversos atributos para validação que podem ser adicionados a elementos de formulário, proporcionando uma validação nativa. O CSS também provê `:valid`, `:invalid` e outras pseudo-classes que podem ser utilizadas para aplicar estilos específicos para os casos de um campo estar ou não válido.

Para este projeto, eu utilizei os seguintes atributos (cada um possui o link para a página da MDN com mais informações):

- [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required);
- [`type="..."`](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input#atributos);
- [`maxLength="..."`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength);
- [`min="0.01"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min): para que o preço de um produto seja no mínimo R$0,01;
- [`step="0.01"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step): para que os aumentos/decrementos em um preço aconteçam em no mínimo um centavo;

Eu considero que há duas desvantagens em depender somente das validações nativas do HTML:

1. A maioria das validações ocorrem somente após a pessoa clicar no botão de submeter o formulário;
2. Cada navegador tem sua própria maneira de lider com essas validações, então nem todas as mensagens de erro e estilos podem ser totalmente (ou facilmente) customizadas.

#### Validação utilizando JavaScript

Por meio do JavaScript, eu posso controlar quando, o que e como a validação irá ocorrer.

Eu decidi que as validações deveriam ser feitas cada vez que a pessoa mudasse de campo do formulário, de modo que uma mensagem de erro pudesse ser exibida antes de se clicar no botão de submissão. Para isso, eu adicionei a validação nos eventos de `onblur` dos inputs. Exemplo:

```js
nameInput.addEventListener('blur', e => validateField(e.target));
```

Alguns campos têm um número máximo de caracteres. Para eles, eu também adicionei um evento de `input` para verificar mudanças e avisar a pessoa quando faltavam menos de 10 caracteres para chegar ao máximo permitido. Exemplo:

```js 
nameInput.addEventListener('input', e => checkMaxLength(e.target));
```

O campo de preço também possui um evento de `keyup` para verificar se a pessoa está tentando digitar um caracter que não seja um número, vírgula ou ponto, alertando o usuário neste caso:

```js
input.addEventListener( 'keyup', e => checkIfKeyIsANumber(e) );
```

Também utilizei a "Constraint Validation API" para verificar a validade dos campos e para customizar as mensagens de erro resultantes da validação nativa do HTML:

- `input.validity`: é uma propriedade que retorna um objeto `ValidityState`, o qual contém diversas propriedades booleanas tais como `valueMissing` (valor em branco) e `typeMismatch` (tipo incompatível) que podem ser utilizadas para verificar que tipo de validação falhou;

- `input.setCustomValidity(mensagem)`: é este método que possibilita alterar a mensagem de erro padrão exibida pelo navegador quando a validação nativa falha.

Eu criei arquivos JavaScript para cada formulário disponível e um arquivo específico para lidar com as validações (`valida-input.js`), no qual eu exportei as funções de validação para poderem ser utilizadas por outros arquivos.

Segue um GIF com a validação feita na página de adicionar um produto:

![validação de formuário para campos em branco e com um número de caracteres máximo](https://user-images.githubusercontent.com/19349339/196252799-8ee0b9bf-948c-4d18-96b2-ce0a6ecc2ef1.gif)

### Autenticação

Como este projeto cobre somente o Front End, eu fiz uma autenticação "hard-coded" (direto no código), para que pudesse ser visto como a página fica ao utilizar credenciais válidas e inválidas. 

Para efeitos de teste, você pode utilizar as seguintes credenciais:

    e-mail: admin@alurageek.com

    senha: my$trongP4ssw0rd

Eu **não** adicionei nenhum tipo de barreira de login para as páginas, ou seja, a pessoa pode acessar qualquer uma das páginas administrativas mesmo não estando logada. Esta é uma parte que eu ainda não tenho familiaridade para trabalhar, então deixei como uma **funcionalidade a ser adicionada em versões futuras deste projeto**.

### Exibição dinâmica de produtos

Este foi **o maior desafio deste projeto**. Ao invés de colocar manualmente cada produto nos arquivos HTML, eles deveriam ser adicionados utilizando o JavaScript, recuperando os dados de uma API. Tal API não foi disponibilizada.

Sem um back end ou uma API para teste, eu precisei improvisar e simular um back end processando as respostas da API. Foi aí que as coisas começaram a complicar e meu código JavaScript começou a ficar complexo e confuso... **Eu preciso melhorar minhas técnicas e encarar este projeto novamente no futuro, criando um código mais limpo e organizado**. Por enquanto, segue o que eu fiz:

Eu simulei uma resposta da API criando um arquivo JSON com vários produtos e suas informações, armazenados como um array de objetos. Os produtos foram divididos por categoria, cada categoria contendo um array de produtos. O arquivo pode ser acessado em `/api/produtos.json`. Segue um fragmento do código:

```json
[
    {
        "categoryName": "Star Wars",
        "categoryId": "1",
        "products": [
            {
                "id": "1",
                "picture": "img/star-wars/caneca.png",
                "name": "Caneca Stormtrooper",
                "price": "45,00",
                "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptates maiores pariatur laudantium fuga. Vel odio incidunt libero aperiam"
            }
            /* other products... */
        ]
    },
    {
        "categoryName": "Consoles",
        "categoryId": "2",
        "products": [ /* ... */]
    },
    /* other categories... */
]
```

Eu utilizei a [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) para recuperar os dados deste arquivo JSON. No começo, eu utilizei `'../api/produtos.json'` como URL do método `fetch()`, e isso deu certo ao rodar o projeto localmente. No entanto, ao fazer o upload para o GitHub, a URL base mudou e algumas vezes era retornado uma URL inválida. Então, eu coloquei o conteúdo do arquivo `produtos.json` em um Gist no GitHub e utilizei a URL deste gist no método `fetch()`.

```js
const url = 'https://gist.githubusercontent.com/zingarelli/2bd16935f38e0b7337f233becf02a9fd/raw/d342b77a8384153918403f5897daddfe24b91d13/produtos.json';
const response = await fetch(url);
const productsList = await response.json();
```

Eu criei várias funções para simular a comunicação com a API, tais como obtenção de dados pela id (`getProductById()`), obtenção de uma lista de produtos por categoria (`getProducstByCategory()`), etc. 

Para mostrar os produtos dinamicamente na página, eu criei uma função `displayProducts(type, key)`, responsável por fazer chamadas para outras funções que buscavam os dados e criar os elementos HTML necessários para exibir a galeria de produtos. 

Eu queria que a função `displayProducts()` fosse genérica o suficiente para lidar com diferentes tipos de layout que cada página tinha. Por exemplo: a página inicial mostra os produtos por categoria, sendo que cada categoria tem sua própria galeria e um máximo de 6 produtos (4 para telas de celular e tablet); já a página de produtos mostra todos os produtos em uma única galeria; e por aí vai. Para lidar com isso, eu adicionei dois parâmetros à função: 

- `type`: uma string com o tipo de layout a ser aplicado;
- `key`: um parâmetro opcional (número) para fazer a consulta à API por nome, id ou categoria do produto.

Os valores para estes parâmetros eram obtidos da "query string" (valores que são enviados após o `?` em uma URL). Fiz o parse desses valores utilizando a propriedade `location.search` e a interface `URLSearchParams`:

```js
// exemplo de URL: https://zingarelli.github.io/alurageek/resultado.html?busca=yoda
const params = new URLSearchParams(document.location.search);
const keywords = params.get('busca'); // 'yoda'
```

A função `displayProducts()` se tornou bastante complexa, cheia de responsabilidades e condicionais. **Planejo refatorá-la em futuras versões**.

Todas as funções relacionadas à exibição dos produtos e obtenção de dados estão no arquivo JS `gerencia-produtos.js`. Eu **não fiquei totalmente satisfeito com esta abordagem** e planejo mudar isso no futuro. Talvez criar três arquivos: um para criar os elementos HTML, um para lidar com as requisições à API (simuladas), e um para intermediar a comunicação entre as outras duas (talvez seja isso que chamam de "controller"?). 

### Campo de busca

É possível fazer uma busca por produtos utilizando o campo que busca localizado no topo de cada página. As palavras digitadas neste campo são passadas a uma outra página como uma "query string". Eu faço um filtro no banco de dados (o conteúdo JSON, no caso), procurando por produtos cujo nome inclua qualquer uma dessas palavras. O resultado, se houver, é exibido em uma nova página: `resultado.html`. Quando nenhum produto é encontrado, uma mensagem apropriada é mostrada à pessoa. 

No layout mobile, a barra de busca não é visível (no lugar, há um ícone de lupa). Então, eu adicionei um evento de `click` neste ícone para que o campo de busca apareça quando se toca/clica a lupa.

![campo de busca aparecendo quando o usuário clica no ícone de lupa](https://user-images.githubusercontent.com/19349339/197269079-1be34dd2-cac1-4036-a8fb-7bfb6a71dcbb.gif)

### Interatividade

O último requisito era fazer com que os botões e links (ou pelo menos a maioria deles) funcionassem de fato. Por exemplo, quando a pessoa clica em um produto, ela é redirecionada a outra página mostrando os detalhes do produto clicado. Outro exemplo é ao clicar no botão para enviar uma mensagem: a mensagem não é *realmente* enviada, mas uma mensagem de "sucesso" é exibida.

Na página inicial há um link para cada categoria de produtos, o qual redireciona a pessoa para ver todos os produtos daquela categoria. Eu criei uma nova página para exibir estes produtos: `categoria.html`.

Os únicos links que não fazem nada são os que se encontram no rodapé, já que não foram criadas as páginas para eles. Os botões para editar/remover produtos também não fazem nada. Em versões futuras, **eu planejo usar o local storage do navegador para simular esta ação de edição/remoção**. 

## Páginas criadas

- [Home](https://zingarelli.github.io/alurageek/index.html)
- [Login](https://zingarelli.github.io/alurageek/login.html)
- [Adicionar um produto](https://zingarelli.github.io/alurageek/adicionar-produto.html)
- [Mostrar todos os produtos](https://zingarelli.github.io/alurageek/produtos.html)
- [Mostrar os produtos de uma categoria](https://zingarelli.github.io/alurageek/categoria.html?cat=1) (usando a categoria "Star Wars")
- [Detalhes de um único produto](https://zingarelli.github.io/alurageek/detalhe-produto.html?id=15) (detalhes para um boneco do Sonic)
- [Resultado de uma busca](https://zingarelli.github.io/alurageek/resultado.html?busca=yoda) (usando a palavra "yoda")

## O que há para o futuro?

Aqui eu listo algumas funcionalidades a serem adicionadas em futuras versões deste projeto:

- Páginas administrativas deveriam ser acessadas somente por usuários autenticados. Talvez criar um cookie ou uma sessão para confirmar se o usuário está ou não logado;

- Adicionar um produto: atualmente, quando todos os campos estão válidos e a pessoa clica no botão para adicionar o produto, é somente exibida uma mensagem de sucesso (o produto não é de fato adicionado). Talvez eu possa utilizar o [local storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) para simular a inclusão do produto localmente no navegador. Isso também vai envolver várias mudanças no código para começar a recuperar os dados do local storage, ao invés dos dados do JSON;

- Editar/remover um produto: similar a adicionar um produto, posso utilizar o local storage para simular estas ações;

- Deixar o código JavaScript mais organizado e performático:
    - Eu criei vários arquivos JS para lidar com funções e comportamentos específicos para cada página/funcionalidade, mas eu acredito que isso pode ser melhorado. Talvez o uso de padrões de projeto possam me ajudar;
    
    - Com relação ao código, algumas funções ficaram realmente muito feias, como a do `displayProducts()`, que está com muitas responsabilidades e de difícil leitura, tamanha a complexidade. Funções como essa precisam ser refatoradas;

    - Outra coisa que precisa ser refatorada é a maneira como eu simulo a comunicação com uma API - talvez eu deveria criar somente um arquivo JS que lidasse com as requisições e respostas, tirando essas responsabilidades de outras partes do código em outros arquivos, também facilitando quando o projeto fosse portado para lidar com uma API de verdade;

    - Eu também quero desenvolver funções para criar diferentes elementos HTML necessários para exibir os produtos (eu já desenvolvi algumas delas), de modo a emular algo que a biblioteca do React já faz.

# Agradecimentos 🫶

Gostaria de agradecer ao Time da Alura como um todo por criar este desafio, especialmente à [Mônica Hillman](https://www.linkedin.com/in/monicamhillman/), ao [Antônio Evaldo](https://www.linkedin.com/in/antonio-evaldo/) e ao [Vinícius Morais](https://br.linkedin.com/in/vinícius-morais). Foi muito prazeroso colocar em ação o que eu aprendi nos cursos, simulando um projeto real, lidando com tarefas e prazos, e também compartilhando meus resultados e pedindo ajuda dos outros participantes. 

Outro agradecimento vai para todo o pessoal no Discord que participou neste desafio. Nós compartilhamos dicas, códigos, discutimos abordagens para cumprir as tarefas e nos divertimos 😄