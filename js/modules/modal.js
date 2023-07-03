function modal() {
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
};

module.exports = modal;