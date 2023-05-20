window.addEventListener("DOMContentLoaded", () => {
  //Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => item.classList.remove("tabheader__item_active"));
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");

    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", ({ target }) => {
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadLine = '2023-05-09T00:00:00.000+03:00'

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function gerZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = gerZero(t.days);
      hours.innerHTML = gerZero(t.hours);
      minutes.innerHTML = gerZero(t.minutes);
      seconds.innerHTML = gerZero(t.seconds);

      if (t.total <= 0) {
        clearInterval()
      }
    }
  }

  setClock('.timer', deadLine);

  const modalOpenBTN = document.querySelectorAll('[data-modal]');
  const modalWindow = document.querySelector('.modal');

  function openModal() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEcapePress);
    modalWindow.addEventListener('click', onBackDropClick);
    clearInterval(modalTimerId);
  };

  function closeModal() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
    modalWindow.removeEventListener('click', onBackDropClick);
    window.removeEventListener('keydown', onEcapePress);
  }

  function onEcapePress(event) {
    if (event.code === "Escape") {
      closeModal();
    }
  }

  function onBackDropClick(event) {
    if (event.target === event.currentTarget || event.target.getAttribute('data-close') == '') {
      closeModal()
    }
  }

  modalOpenBTN.forEach(element => element.addEventListener('click', openModal));

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

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
          <div class="menu__item-total"><span>${this.price}</span>" грн/день"</div>
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


  const forms = document.querySelectorAll('form');

  forms.forEach(item => {
    bindPostData(item);
  });

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };

  // async function getResource(url) {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }
  //   return await res.json();
  // }

  axios.get('http://localhost:3000/menu').then(({ data }) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new ProductCard(img, altimg, title, descr, price, ".menu__field>.container").markup()
    });
  });

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure)
        }).finally(() => {
          form.reset();
        });

      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      // fetch('server.php', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify(object)
      // })
      //   .then(data => data.text())
      //   .then(data => {
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //   }).catch(() => {
      //     showThanksModal(message.failure);
      //   }).finally(() => {
      //     form.reset();
      //   });
    })
  };

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  //Slider

  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider-inner');

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  })

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot-indicator');
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener('click', () => {
    if (offset === deleteAllNonNumbers(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteAllNonNumbers(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addZeroIfItNeeds();
    // if (slides.length < 10) {
    //   current.textContent = `0${slideIndex}`
    // } else {
    //   current.textContent = slideIndex;
    // }

    setOpacityForTheDots();
    // dots.forEach(dot => dot.style.opacity = '.5');
    // dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
    if (offset === 0) {
      offset = deleteAllNonNumbers(width) * (slides.length - 1);
    } else {
      offset -= deleteAllNonNumbers(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    addZeroIfItNeeds();
    // if (slides.length < 10) {
    //   current.textContent = `0${slideIndex}`
    // } else {
    //   current.textContent = slideIndex;
    // }

    setOpacityForTheDots();
    // dots.forEach(dot => dot.style.opacity = '.5');
    // dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteAllNonNumbers(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      addZeroIfItNeeds();
      // if (slides.length < 10) {
      //   current.textContent = `0${slideIndex}`
      // } else {
      //   current.textContent = slideIndex;
      // }

      setOpacityForTheDots();
      // dots.forEach(dot => dot.style.opacity = '.5');
      // dots[slideIndex - 1].style.opacity = 1;
    })
  })

  function addZeroIfItNeeds() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`
    } else {
      current.textContent = slideIndex;
    }
  }

  function setOpacityForTheDots() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  function deleteAllNonNumbers(value) {
    return +value.replace(/\D/g, '');
  }

});