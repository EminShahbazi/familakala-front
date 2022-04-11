"use strict";

$(document).ready(function () {
  var initSlides = function () {
    var $mainSlider = $("#product-main-slider");
    var $navSlider = $("#product-nav-slider");
    $mainSlider.slick({
      // lazyLoad: "ondemand",
      rtl: true,
      arrows: false,
      dots: true,
      infinite: false,
      asNavFor: "#product-nav-slider",
      slidesToShow: 1,
      slidesToScroll: 1
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
      focusOnSelect: true // centerMode: true,

    });
  }();
});