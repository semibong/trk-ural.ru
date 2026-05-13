$(document).ready(function() {
    Fancybox.bind('[data-fancybox]');

    if (typeof AOS !== 'undefined') {
        const addAos = (selector, animation, options = {}) => {
            $(selector).each(function (index) {
                const delay = options.delayStep ? index * options.delayStep : options.delay;

                $(this).attr({
                    'data-aos': animation,
                    'data-aos-duration': options.duration || 800,
                    'data-aos-offset': options.offset || 90,
                    'data-aos-once': options.once !== undefined ? options.once : true
                });

                if (delay) {
                    $(this).attr('data-aos-delay', delay);
                }

                if (options.anchorPlacement) {
                    $(this).attr('data-aos-anchor-placement', options.anchorPlacement);
                }
            });
        };

        const removeAos = (selector) => {
            $(selector).removeAttr('data-aos data-aos-duration data-aos-offset data-aos-once data-aos-delay data-aos-anchor-placement')
                .removeClass('aos-init aos-animate');
        };

        const removeInitialAos = () => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            $('[data-aos]').each(function () {
                if ($(this).closest('.introduction').length) {
                    return;
                }

                const rect = this.getBoundingClientRect();
                const isVisibleOnLoad = rect.top < viewportHeight && rect.bottom > 0;

                if (isVisibleOnLoad) {
                    removeAos(this);
                }
            });
        };

        const cleanupAosElement = (element) => {
            const $element = $(element);

            if ($element.data('aos-cleaned')) {
                return;
            }

            $element.data('aos-cleaned', true);

            const duration = Number($element.attr('data-aos-duration')) || 800;
            const delay = Number($element.attr('data-aos-delay')) || 0;

            setTimeout(() => {
                removeAos(element);
            }, duration + delay + 50);
        };

        const showVisibleIntroductionAos = () => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            $('.introduction [data-aos]').each(function () {
                const rect = this.getBoundingClientRect();
                const isVisibleOnLoad = rect.top < viewportHeight && rect.bottom > 0;

                if (isVisibleOnLoad) {
                    $(this).addClass('aos-init aos-animate');
                }
            });
        };

        const observeAnimatedAosElements = () => {
            if (!window.MutationObserver) {
                return;
            }

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type !== 'attributes' || mutation.attributeName !== 'class') {
                        return;
                    }

                    const element = mutation.target;

                    if (element.matches('[data-aos].aos-animate')) {
                        cleanupAosElement(element);
                    }
                });
            });

            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['class'],
                subtree: true
            });
        };

        addAos('main .title-mini', 'fade-up', { duration: 350 });
        addAos('main .title', 'fade-up', { duration: 420 });

        addAos('.introduction-stats, .introduction-quick, .shops-list', 'fade-up', { duration: 850, delayStep: 100 });
        addAos('.introduction-stats__item, .introduction-info__item, .introduction-quick__item', 'fade-up', { duration: 700, delayStep: 80 });

        addAos('.index-about-top, .index-about__block, .rent-connect__block, .about__content, .about-image, .gallery__slider, .map__item, .index-map__item, .contacts-map__item, .shop-map__item, .shops-map, .shops-sort, .shops__sidebar, .rent__content, .rents-text, .rents-subtitle, .nmu-subtitle, .rents-form .form, .new__content, .marketing__content, .table', 'fade-up', { duration: 850, delayStep: 100 });
        addAos('.index-about__place, .index-about__schedule, .index-about__opportunity', 'zoom-in-up', { duration: 750, delayStep: 100 });
        addAos('.index-about__place__item, .index-about__opportunity__item', 'fade-up', { duration: 600, delayStep: 60 });

        addAos('.films-card, .news-card, .shops-card, .rents-list__item, .contacts__item, .marketing__item, .gallery__item, .about__file, .shop-card, .shop-text, .rent__slider, .rent-info, .rent-char, .rent-description, .form-input, .form-textarea', 'fade-up', { duration: 700, delayStep: 100 });
        addAos('.shops-letter', 'fade-up', { duration: 420, delayStep: 45 });
        addAos('.contacts-map__item, .shop-map__item, .shops-map__item', 'zoom-in', { duration: 850 });
        addAos('.rent-connect__buttons .btn', 'fade-up', { duration: 700, delayStep: 100 });

        removeInitialAos();
        showVisibleIntroductionAos();
        observeAnimatedAosElements();

        document.addEventListener('aos:in', (event) => {
            cleanupAosElement(event.detail);
        });

        AOS.init({
            easing: 'ease-out-cubic',
            mirror: false,
            once: true
        });

        $('.aos-animate[data-aos]').each(function () {
            cleanupAosElement(this);
        });
    }

    $('input[type=tel]').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });
    
    $('.form-select select').each((_, e) => {
        const placeholder = $(e).data('placeholder');
        
        $(e).select2({
            placeholder: placeholder,
            width: 'element'
        });
    });

    $('.theme-change').on('click', function() {
        if ($('body').hasClass('light')) {
            $('body').removeClass('light');
            $('body').addClass('dark');
        } else {
            $('body').removeClass('dark');
            $('body').addClass('light');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            $('.modal').removeClass('modal-opened');
            $('body').removeClass('noscroll');
            window.scroll(0, scrollTop);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;

                let startTimestamp = null;

                function animation(timestamp) {
                    if (!startTimestamp) startTimestamp = timestamp;

                    const elapsed = timestamp - startTimestamp;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeInOut = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

                    window.scrollTo(0, startPosition + distance * easeInOut);

                    if (elapsed < duration) {
                        window.requestAnimationFrame(animation);
                    }
                }
            }

            window.requestAnimationFrame(animation);
        });
    });

    let scrollTop = 0;
    window.addEventListener('scroll', function () {
        if (!$('body').hasClass('noscroll')) {
            scrollTop = window.scrollY;
        }
    });

    $('.header__burger-btn').on('click', function () {
        const burger = $('.burger');
        const body = $('body');
        
        $(this).toggleClass('active');
        burger.toggleClass('burger-opened');

        $('.shops-filter').removeClass('shops-filter-opened');

        if (burger.hasClass('burger-opened')) {
            body.addClass('noscroll');
            body.css('top', `-${scrollTop}px`);
        } else {
            body.removeClass('noscroll');
            window.scroll(0, scrollTop);
        }
    });

    $('.shops-filter-btn').on('click', function () {
        const filter = $('.shops-filter');
        const body = $('body');
        
        $(this).toggleClass('active');
        filter.toggleClass('shops-filter-opened');

        if (filter.hasClass('shops-filter-opened')) {
            body.addClass('noscroll');
            body.css('top', `-${scrollTop}px`);
        } else {
            body.removeClass('noscroll');
            window.scroll(0, scrollTop);
        }
    });

    $('.shops-filter__close').on('click', function () {
        $('.shops-filter').removeClass('shops-filter-opened');
        $('body').removeClass('noscroll');
        window.scroll(0, scrollTop);
    });

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 800) {
            $('.up').removeClass('up-invisible');
        } else {
            $('.up').addClass('up-invisible');
        }
    });

    $('.up').on('click', () => {
        const body = $("html, body");
        body.animate({
            scrollTop: 0
        }, 500, 'swing');
    });

    if ($('.table').length) {
        $('.table').each(function () {
            const $table = $(this);
            const $content = $table.find('.table__content');
            const $scrollWrap = $table.find('.table__controls-scroll');
            const $scroll = $scrollWrap.find('span');
            const $btnLeft = $table.find('.table__controls-btn_left');
            const $btnRight = $table.find('.table__controls-btn_right');

            function updateScroll() {
                const content = $content[0];
                const contentWidth = content.scrollWidth;
                const visibleWidth = $content.outerWidth();
                const scrollLeft = $content.scrollLeft();

                if (contentWidth <= visibleWidth) {
                    $scroll.css({ width: 0 });

                    $btnLeft.css({ opacity: 0, 'pointer-events': 'none' });
                    $btnRight.css({ opacity: 0, 'pointer-events': 'none' });

                    $scrollWrap.addClass('table__controls-scroll_left table__controls-scroll_right');
                    return;
                }

                const scrollRatio = visibleWidth / contentWidth;
                const scrollWidth = visibleWidth * scrollRatio;
                const scrollLeftPos = (scrollLeft / contentWidth) * visibleWidth;

                $scroll.css({
                    width: scrollWidth + 'px',
                    left: scrollLeftPos + 'px'
                });

                const isAtStart = scrollLeft <= 0;
                const isAtEnd = scrollLeft + visibleWidth >= contentWidth - 1;

                if (isAtStart) {
                    $btnLeft.css({ opacity: 0, 'pointer-events': 'none' });
                    $scrollWrap.addClass('table__controls-scroll_left');
                } else {
                    $btnLeft.css({ opacity: 1, 'pointer-events': 'auto' });
                    $scrollWrap.removeClass('table__controls-scroll_left');
                }

                if (isAtEnd) {
                    $btnRight.css({ opacity: 0, 'pointer-events': 'none' });
                    $scrollWrap.addClass('table__controls-scroll_right');
                } else {
                    $btnRight.css({ opacity: 1, 'pointer-events': 'auto' });
                    $scrollWrap.removeClass('table__controls-scroll_right');
                }
            }

            $content.on('scroll', updateScroll);

            $btnLeft.on('click', function () {
                $content.animate({
                    scrollLeft: $content.scrollLeft() - 200
                }, 200);
            });

            $btnRight.on('click', function () {
                $content.animate({
                    scrollLeft: $content.scrollLeft() + 200
                }, 200);
            });

            $(window).on('resize', updateScroll);

            updateScroll();
        });
    }

    if ($('.shops-list').length) {
        const shopsListSlider = new Swiper('.shops-list__slider', {
            speed: 1000,
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 14,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });
    }

    if ($('.films').length) {
        const filmsSlider = new Swiper('.films__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 18,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.films__slider .slider-progressbar',
                draggable: true
            },
            breakpoints: {
                993: {
                    slidesPerView: 4
                }
            }
        });
    }

    if ($('.news-list').length) {
        const newsListSlider = new Swiper('.news-list__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 18,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.news-list__slider .slider-progressbar',
                draggable: true
            },
            breakpoints: {
                993: {
                    slidesPerView: 3
                }
            }
        });
    }

    if ($('.gallery').length) {
        const gallerySlider = new Swiper('.gallery__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 15,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.gallery__slider .slider-progressbar',
                draggable: true
            },
            breakpoints: {
                993: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    }

    if ($('.rent').length) {
        const rentThumbs = new Swiper('.rent__slider .rent-thumbs', {
            speed: 1000,
            slidesPerView: 3,
            spaceBetween: 10,
            breakpoints: {
                993: {
                    spaceBetween: 19
                }
            }
        });

        const rentSlider = new Swiper('.rent__slider .rent-slider', {
            speed: 1000,
            effect: 'fade',
            allowTouchMove: false,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.rent__slider .slider-progressbar',
                draggable: true
            },
            thumbs: {
                swiper: rentThumbs
            }
        });
    }
});
