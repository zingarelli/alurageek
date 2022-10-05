# Alura Geek | Challenge Front-End 2022
Alura Geek, a (fictitious) geek company, has contacted us to develop their e-commerce website. Our task is to create responsive and interactive pages: Home, Login, Products, Add Product (administrative page) and Product Details. 

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | Alura Geek
| :label: Tecnologias | HTML, CSS, JavaScript
| :rocket: URL         | https://zingarelli.github.io/alurageek/
| :fire: Desafio     | https://www.alura.com.br/challenges/front-end-5

![](https://user-images.githubusercontent.com/19349339/192602092-6af3b6f3-8ec1-489e-8520-302ba9de2db4.png#vitrinedev)

## Project Details
This project is the result of my participation in the [5th Edition of Alura's Front End Challenge](https://www.alura.com.br/challenges/front-end-5). Using a Challenge Based Learning approach, we put our learning into action by solving a real-world challenge. [Alura](https://www.alura.com.br) is a brazilian online school of technology.

### The Challenge: e-commerce for AluraGeek
**AluraGeek** is a brazilian company that sells stuff related to Geek Culture. They're aiming to expand their business to all of Brazil, and for that they **hired us to implement an e-commerce website**. 

As a **Front End Dev**, my tasks are to develop 4 pages:

- **Home Page**: the main content is composed of a banner to display sales or any other relevant information, and three galleries for different categories of products;
- **Login**: a simple login page to enter e-mail and password;
- **Products**: a page that will display all products available for purchase;
- **Add Product**: this will be an administrative page, in which an employee will be able to add a new product to the e-commerce.

The company will be *very pleased* if I also deliver a fifth page: **Product Details**, a page to display information about a single product and a gallery of related products.

It's **very important** for AluraGeek that their e-commerce website is **responsive**, so customers can have a nice shopping experience either on mobile, tablet or PC.

Layout for every page is provided in a [Figma file](https://www.figma.com/file/fR9qvy3gU53s2q5efeMpy9/AluraGeek---Challenge). 

## The Development
AluraGeek expects project updates on a *weekly basis*.

### Mobile-First and BEM Methodology
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

### Week 1

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

### Week 2
In the second week, the focus was to develop pages for administrative purposes: [login](https://zingarelli.github.io/alurageek/login.html), [remove/edit products](https://zingarelli.github.io/alurageek/produtos.html), [add new product](https://zingarelli.github.io/alurageek/adicionar-produto.html). I've also developed the extra page required by the company: [product details](https://zingarelli.github.io/alurageek/detalhe-produto.html).

For now, I'm focused on developing only the appearance of each page and ensure they're responsive, so there are still no login validation nor onclick functions for edit/delete buttons. There are, however, input validation (using the `required` attribute in some input fields) and some onclick events that redirect users for specific pages (for example, if you click on "Adicionar Produto" button in the [Manage Products page](https://zingarelli.github.io/alurageek/produtos.html), you're redirected to the [Add Product page](https://zingarelli.github.io/alurageek/adicionar-produto.html)).

Buttons and input fields shared the same styles on every page, with minor differences here and there, so I took the time to do some refactor in style.css and the HTML files, changing the name of some classes to something more generic (for example: `input__text`, `input__field--content`). This way those styles were reusable and I could focus in only adding styles for minor modifications (like `margin` and `padding`).

I decided to create specific CSS and JS files for every page, helping in managing the small style changes and JavaScript events needed. In order to keep the project well organized, I created directories for CSS and JS files, and each file has the same name of the pages they're related to. Even so, `reset.css`, `style.css` and `script.js` were kept in the root directory: they're not related to only a single page and can be used by every page (or even other CSS and JS files), so I think it's easier to locate and access them in the root directory.

A major refactor was applied in the styles for the "products gallery" sections in the Home Page. In week 1, I decided to use **Flexbox** in these sections, because I was thinking of them as being a single line of items that should break according to the screen's width. I was also using `justify-content: space-between` to space items horizontally. During this week, while developing the Products Page (which also have a "products gallery" section), I noticed that this solution with Flexbox would not be adequate: the last row in the tablet layout had only two items and, due to the `justify-content: space-between` property, one item was placed on the left side of the screen and the other on the right side. This problem can be seen in the image below: 

![items in the last two rows of producst page, using Flexbox](https://user-images.githubusercontent.com/19349339/193615094-5f7a55a3-dc4b-4aee-8cd6-d9c73e91d4a5.png)

I could apply a different `margin` to the last item (using pseudo-class `:last-child`) as a workaround, but the problem would reappear if we had a third item in the last row (the second item would be centered in the available space). So I decided to change the display property to **Grid**, using `grid-template-columns` property to adjust the number of columns and their sizes accordingly for each layout (2 for mobile, 4 for tablet and 6 for desktop). Using this approach, items in the last row are now always displayed side by side. Another advantage is that I no longer need to modify the items' width for every layout - Grid takes care of this, keeping the proportions according to the number of columns. The result of using Grid can be seen in the image below:

![items in the last two rows of producst page, using Grid](https://user-images.githubusercontent.com/19349339/193617405-21a46a38-799e-48a4-ac00-d3c15b3571fd.png)

### Week 3

...

### Final Remarks

...