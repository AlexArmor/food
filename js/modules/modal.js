function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modalWindow = document.querySelector(modalSelector);

    document.addEventListener('keydown', onEscapePress);
    function onEscapePress(event) {
        if (event.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    }

    modalWindow.addEventListener('click', onBackDropClick);
    function onBackDropClick(event) {
        if (event.target === event.currentTarget || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector)
        }
    }

    modalTrigger.forEach(element => element.addEventListener('click', () => openModal(modalSelector, modalTimerId)));

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
};

export default modal;
export { openModal, closeModal };