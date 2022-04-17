$(document).ready(function () {
    const initSlides = (function () {
        const $mainSlider = $("#product-main-slider");
        const $navSlider = $("#product-nav-slider");

        $mainSlider.slick({
            // lazyLoad: "ondemand",
            rtl: true,
            arrows: false,
            dots: true,
            infinite: false,
            asNavFor: "#product-nav-slider",
            slidesToShow: 1,
            slidesToScroll: 1,
        });

        $navSlider.slick({
            dots: false,
            // rtl: true,
            vertical: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: $("#product-nav-slider-prev"),
            nextArrow: $("#product-nav-slider-next"),
            asNavFor: "#product-main-slider",
            infinite: false,
            focusOnSelect: true,
            // centerMode: true,
        });
    })();

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

    $("#comments-slider").slick({
        infinite: false,
        slidesToShow: 1.2,
        slidesToScroll: 1,
        arrows: false,
        mobileFirst: true,
        // prevArrow: $("#js-discounts-slider-prev"),
        // nextArrow: $("#js-discounts-slider-next"),
        rtl: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3.5,
                },
            },
            {
                breakpoint: 860,
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
                    slidesToShow: 1.5,
                },
            },
        ],
    });

    $("#product-info-tabs").tabs();
    $("#product-review-tabs").tabs();
});
