function cards() {
    class ProductCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        };

        changeToUAH() {
            this.price = this.price * this.transfer;
        };

        markup() {
            const itemMarkup = `<div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          </div>`;
            this.parent.insertAdjacentHTML('beforeend', itemMarkup);
        }
    }

    // const data = [{
    //   img: { src: "img/tabs/vegy.jpg", alt: "vegy" },
    //   title: 'Меню "Фитнес"',
    //   description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //   price: "229"
    // },
    // {
    //   img: { src: "img/tabs/elite.jpg", alt: "elite" },
    //   title: 'Меню “Премиум”',
    //   description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //   price: "550"
    // },
    // {
    //   img: { src: "img/tabs/post.jpg", alt: "post" },
    //   title: 'Меню "Постное"',
    //   description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //   price: "430"
    // }]
    // const menuRoot = document.querySelector('.menu__field>.container');

    // getResource('http://localhost:3000/menu').then(data => {
    //   data.forEach(({ img, altimg, title, descr, price }) => {
    //     new ProductCard(img, altimg, title, descr, price, ".menu__field>.container").markup()
    //   });
    // });

    // const menuMarkup = data.map((element) => new ProductCard(element).markup()).join('');

    axios.get('http://localhost:3000/menu').then(({ data }) => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new ProductCard(img, altimg, title, descr, price, ".menu__field>.container").markup()
        });
    });
};

module.exports = cards;