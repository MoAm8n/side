// start  Initialize Swiper
var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
        },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
            "@0.00": {
            slidesPerView: 2,
            spaceBetween: 10,
            },
            "@0.65": {
            slidesPerView: 3,
            spaceBetween: 10,
            },
            "@1.10": {
            slidesPerView: 4,
            spaceBetween: 10,
            },
            "@1.65": {
            slidesPerView: 5,
            spaceBetween: 10,
            },
            "@2.00": {
            slidesPerView: 5,
            spaceBetween: 10,
            },
        },
});
// end Initialize Swiper
