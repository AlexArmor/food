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

export default cards;