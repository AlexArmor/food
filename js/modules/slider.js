function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    //Slider

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

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
    const dots = [];
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
        if (offset === (deleteAllNonNumbers(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteAllNonNumbers(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        console.log("slideIndex", slideIndex);
        console.log("slides.length", slides.length);

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

            slideIndex = Number(slideTo);
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
};

export default slider;