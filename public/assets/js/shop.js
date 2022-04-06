"use strict";

var filterProducts = function () {
  var minPrice = null;
  var maxPrice = null; // Cache DOM

  var priceSlider = document.getElementById("price-slider");
  var $priceMin = $("#price-filter-min");
  var $priceMax = $("#price-filter-max");
  var $priceButton = $("#price-filter-submit"); // Events
  // Init

  init();

  function init() {
    minPrice = $priceMin.data("value");
    maxPrice = $priceMax.data("value");

    if (priceSlider) {
      noUiSlider.create(priceSlider, {
        start: [minPrice, maxPrice],
        connect: true,
        direction: "rtl",
        range: {
          min: $priceMin.data("range"),
          max: $priceMax.data("range")
        }
      });
      priceSlider.noUiSlider.on("update", function (values, handle) {
        minPrice = Math.round(values[0]);
        maxPrice = Math.round(values[1]);
        $priceMin.html(Math.round(values[0]).toLocaleString("fa-IR", {
          style: "decimal"
        }));
        $priceMax.html(Math.round(values[1]).toLocaleString("fa-IR", {
          style: "decimal"
        }));
      });
    }
  }
}();