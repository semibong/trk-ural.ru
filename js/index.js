$(document).ready(function() {
    Fancybox.bind('[data-fancybox]');

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