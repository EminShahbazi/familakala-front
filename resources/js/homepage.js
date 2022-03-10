$(document).ready(function () {
    $("#hero-slider").slick({
        dots: true,
        arrows: false,
        fade: true,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: true,
        autoplay: true,
        autoplaySpeed: 2500,
    });

    $("#discounts-slider").slick({
        infinite: false,
        slidesToShow: 5.2,
        slidesToScroll: 1,
        prevArrow: $("#js-discounts-slider-prev"),
        nextArrow: $("#js-discounts-slider-next"),
        rtl: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4.2,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3.2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.2,
                },
            },
        ],
    });

    $("#best-products-slider").slick({
        infinite: false,
        arrows: false,
        slidesToShow: 4.2,
        slidesToScroll: 1,

        // prevArrow: $("#js-discounts-slider-prev"),
        // nextArrow: $("#js-discounts-slider-next"),
        rtl: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3.2,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2.2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    infinite: true,
                },
            },
        ],
    });
});
