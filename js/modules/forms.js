function forms() {
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
};

module.exports = forms;