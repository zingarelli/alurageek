# Alura Geek | Challenge Front-End 2022
Alura Geek, a (fictitious) geek company, has contacted us to develop their e-commerce website. Our task is to create responsive and interactive pages: Home, Login, Products, Add Product and Product Details. 

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | Alura Geek
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
2. using JavaScript and the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation).

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
Since this project only covers the Front End, I performed a hard-coded authentication, so we can see how the page looks with valid and invalid credentials

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
