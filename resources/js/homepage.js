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
});
