document.addEventListener('DOMContentLoaded', function() {
    // Language Selector
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

    // Gallery Sliders
    const initSliders = (tab) => {
        if (tab === 'exterior') {
            // Слайдер экстерьера
            const galleryThumbs = new Swiper(".gallerySwiper", {
                spaceBetween: 10,
                slidesPerView: 5,
                freeMode: true,
                watchSlidesProgress: true,
            });

            new Swiper(".gallerySwiperMain", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: galleryThumbs,
                },
            });
        } else {
            // Слайдер интерьера
            const galleryThumbsInterior = new Swiper(".gallerySwiperInterior", {
                spaceBetween: 10,
                slidesPerView: 5,
                freeMode: true,
                watchSlidesProgress: true,
            });

            new Swiper(".gallerySwiperMainInterior", {
                spaceBetween: 10,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: galleryThumbsInterior,
                },
            });
        }
    };

    // Инициализация первого слайдера (экстерьер)
    initSliders('exterior');

    // Переключение табов галереи
    const tabButtons = document.querySelectorAll('.gallery_tabs .tabs_btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            // Получаем какой таб нужно показать
            const tabName = this.dataset.tab;

            // Скрываем все табы
            document.querySelectorAll('.gallery_content').forEach(tab => {
                tab.style.display = 'none';
            });

            // Показываем выбранный таб
            document.getElementById(`${tabName}-tab`).style.display = 'block';

            // Переинициализируем слайдеры для выбранного таба
            initSliders(tabName);
        });
    });

    // About Slider
    new Swiper(".about__slider", {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpointsInverse: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".about__swiper-next",
            prevEl: ".about__swiper-prev"
        },
    });

    // FAQ Accordion
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const content = button.nextElementSibling;

            if (button.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });

    // Advantages Image Switcher
    const listItems = document.querySelectorAll('.number_list li');
    const images = document.querySelectorAll('.advantages_img img');

    // Initialize first item as active if none are active
    if (document.querySelectorAll('.number_list li.active').length === 0 && listItems.length > 0) {
        listItems[0].classList.add('active');
        images[0].classList.add('active');
    }

    listItems.forEach((item, index) => {
        const button = item.querySelector('button');

        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior

            // Удаляем класс active у всех элементов
            listItems.forEach(li => li.classList.remove('active'));
            images.forEach(img => img.classList.remove('active'));

            // Добавляем класс active к текущему элементу и соответствующему изображению
            item.classList.add('active');
            images[index].classList.add('active');
        });
    });
    const dropdownBtn = document.querySelector('.dropdown_mobile');
    const tabsPlan = document.querySelector('.tabs_plan');

    if (dropdownBtn && tabsPlan) {
        // Инициализация - скрываем меню
        tabsPlan.classList.remove('drop_plan');

        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            tabsPlan.classList.toggle('drop_plan');
        });

        // Закрытие при клике на кнопку в меню
        const tabButtons = tabsPlan.querySelectorAll('.tabs_btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                tabsPlan.classList.remove('drop_plan');
            });
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', function() {
            tabsPlan.classList.remove('drop_plan');
        });

        // Предотвращаем закрытие при клике внутри меню
        tabsPlan.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Табы с планировками
    const planTabs = document.querySelectorAll('.tabs_plan .tabs_btn');
    const planContents = document.querySelectorAll('.content_plan_tabs .content_tab');

    // Сначала скрываем все кроме первого
    planContents.forEach((content, index) => {
        if (index !== 0) {
            content.style.display = 'none';
        }
    });

    // Обработчики для кнопок табов
    planTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Убираем active у всех кнопок
            planTabs.forEach(t => t.classList.remove('active'));
            // Добавляем active текущей
            tab.classList.add('active');

            // Скрываем все контенты
            planContents.forEach(content => {
                content.style.display = 'none';
            });

            // Показываем соответствующий контент
            planContents[index].style.display = 'flex';
        });
    });
    new Swiper('.infrastructureSwipper', {


        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
    const bottomLine = document.querySelector('.section_bottom_line');
    const widgetTop = document.querySelector('.widget_top');
    const vhHeight = window.innerHeight;

    let lastScrollPosition = 0;
    let isFixed = false;
    let isScrollingUp = false;
    let timeoutId;

    // Инициализация - скрываем элементы вначале
    bottomLine.style.transform = 'translateY(100%)';
    bottomLine.style.transition = 'transform 0.3s ease';
    widgetTop.style.opacity = '0';
    widgetTop.style.transition = 'opacity 0.3s ease';
    widgetTop.style.pointerEvents = 'none'; // Отключаем клики когда кнопка невидима

    // Функция для скрытия кнопки
    const hideWidget = () => {
        widgetTop.style.opacity = '0';
        widgetTop.style.pointerEvents = 'none';
    };

    // Функция для показа кнопки
    const showWidget = () => {
        if (isFixed && isScrollingUp) {
            widgetTop.style.opacity = '1';
            widgetTop.style.pointerEvents = 'auto';
        }
    };

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY || window.pageYOffset;

        // Определяем направление скролла
        isScrollingUp = scrollPosition < lastScrollPosition;
        lastScrollPosition = scrollPosition;

        // Обработка появления/скрытия нижней полоски
        if (scrollPosition >= vhHeight && !isFixed) {
            isFixed = true;
            bottomLine.style.transform = 'translateY(0)';
        } else if (scrollPosition < vhHeight && isFixed) {
            isFixed = false;
            bottomLine.style.transform = 'translateY(100%)';
            hideWidget(); // Скрываем кнопку если вернулись в начало
        }

        // Обработка кнопки "наверх"
        if (isFixed) {
            // При скролле вверх показываем кнопку
            if (isScrollingUp) {
                showWidget();
                // Сбрасываем таймер скрытия если он был
                if (timeoutId) clearTimeout(timeoutId);
            }
            // При скролле вниз скрываем кнопку с задержкой
            else {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(hideWidget, 500);
            }
        }
    });

    // Обработчик клика по кнопке "наверх"
    widgetTop.querySelector('button').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Модалка
    // Находим все кнопки с data-index
    const buttons = document.querySelectorAll('[data-index]');

    // Назначаем обработчик клика
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const modalName = button.getAttribute('data-index');
            const modal = document.querySelector(`[data-index-form="${modalName}"]`);

            if (modal) {
                modal.style.display = 'block';
                // Блокируем скролл страницы
                document.body.classList.add('no-scroll');
            } else {
                console.error('Модальное окно с data-index-form="' + modalName + '" не найдено!');
            }
        });
    });

    // Закрытие модальных окон при клике на крестик или вне окна
    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.close-btn');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            // Разблокируем скролл страницы
            document.body.classList.remove('no-scroll');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                // Разблокируем скролл страницы
                document.body.classList.remove('no-scroll');
            }
        });
    });
});