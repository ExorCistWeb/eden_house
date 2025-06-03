document.addEventListener('DOMContentLoaded', function() {
    const initLanguageSelector = () => {
        const langSelector = document.getElementById('langSelector');
        if (!langSelector) return;

        langSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            langSelector.classList.remove('active');
        });

        const langOptions = document.querySelectorAll('.lang_option');
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const lang = this.dataset.lang;
                const flagSrc = this.querySelector('img').src;
                const langText = this.querySelector('.p2').textContent;

                const selectLang = langSelector.querySelector('.select_lang');
                selectLang.innerHTML = `
                    <img src="${flagSrc}" alt="${langText}">
                    <p class="p2">${langText}</p>
                    <img src="./img/icon/down_arrow.svg" alt="">
                `;

                console.log('Language changed to:', lang);
                langSelector.classList.remove('active');
            });
        });
    };


    initLanguageSelector();
});
var swiper = new Swiper(".gallerySwiper", {
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".gallerySwiperMain", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});