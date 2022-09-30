# Alura Geek | Challenge Front-End 2022
Alura Geek, a (fictitious) geek company, has contacted us to develop their e-commerce website. Our task is to create responsive and interactive pages: Home, Login, Products, Add Product (administrative page) and Product Details. 

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | Alura Geek
| :label: Tecnologias | HTML, CSS, JavaScript
| :rocket: URL         | 
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

During the first week, I focused on developing the Home Page. 

Some elements are not displayed in the mobile layout, but only in larger screens (over 768px). The opposite also happens. In order to control this, I added the CSS properties `display: none` and `display: block` for those elements, whenever necessary. 

The Home Page has 3 galleries to display products in different categories: "Star Wars", "Consoles" and "Others". I decided to use **Flexbox** to display these products, since the gallery can be considered as a single line that should break to adapt to the screen's width. To enable line-break, I added the property `flex-wrap: wrap` to the gallery element. I also added a `width` property (in percentage) to each product, so they can grow/shrink depending on the size of the screen.

I decided to use **Grid** in the footer section for tablet and desktop layouts, because every layout place the elements of this section in different positions, as can be seen in the image below:

![footer layout for desktop, tablet and mobile screens](https://user-images.githubusercontent.com/19349339/193277824-13b765c0-f659-4584-bce3-582b8d36acfd.png)

By using `grid-template-areas`, it became easier to place the elements accordingly for each layout. 

```css
/* min-width: 768px (tablet) */
.footer__container {
    grid-template-areas: 
        "logo contact"
        "links contact";
    grid-template-columns: 1fr 2fr;
    ...
}

/* min-width: 1024px (desktop) */
.footer__container {
    grid-template-areas: "logo links contact";
    grid-template-columns: 1fr 1fr 2fr;
    ...
}

```

### Week 2

...

### Week 3

...

### Final Remarks

...