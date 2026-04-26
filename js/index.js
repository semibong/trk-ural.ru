$(document).ready(function() {
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

        if (burger.hasClass('burger-opened')) {
            body.addClass('noscroll');
            body.css('top', `-${scrollTop}px`);
        } else {
            body.removeClass('noscroll');
            window.scroll(0, scrollTop);
        }
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
            pagination: {
                el: '.films__slider .slider-progressbar',
                type: 'progressbar'
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
            pagination: {
                el: '.news-list__slider .slider-progressbar',
                type: 'progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 3
                }
            }
        });
    }
});