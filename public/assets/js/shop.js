"use strict";

var filterProducts = function () {
  var page = 1;
  var minPrice = null;
  var maxPrice = null;
  var brands = [];
  var colors = []; // Cache DOM

  var $productsListWrapper = $("#products-list-wrapper");
  var $paginationLinks = $productsListWrapper.find(".js-pagination-link");
  var priceSlider = $("#price-slider")[0];
  var $priceMin = $("#price-filter-min");
  var $priceMax = $("#price-filter-max");
  var $priceButton = $("#price-filter-submit");
  var $brandsInput = $("input.brand");
  var $colorsInput = $("input.color");
  var $mobileFiltersToggler = $("#products-filters-toggler");
  var $mobileFilters = $("#products-filters"); // Events

  $paginationLinks.on("click", changePage);
  $priceButton.on("click", alterQueryString);
  $brandsInput.on("change", handleBrandChange);
  $colorsInput.on("change", handleColorChange);
  $mobileFiltersToggler.on("click", openFilters);
  $bodyMask.on("click", closeFilters); // Init

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
        $priceMin.html(Math.round(values[0]));
        $priceMax.html(Math.round(values[1]));
      });
    }
  } // Event Handlers


  function changePage(e) {
    e.preventDefault();
    var $this = $(e.currentTarget);
    page = $this.data("page");
    alterQueryString(false);
  }

  function handleBrandChange(e) {
    var id = $(e.target).val(); //e.target.dataset.id;

    var index = brands.findIndex(function (b) {
      return b == id;
    });

    if (index === -1) {
      brands.push(id);
    } else {
      brands.splice(index, 1);
    }

    page = 1;
    alterQueryString();
  }

  function handleColorChange(e) {
    var id = $(e.target).val(); //e.target.dataset.id;

    var index = brands.findIndex(function (b) {
      return b == id;
    });

    if (index === -1) {
      colors.push(id);
    } else {
      colors.splice(index, 1);
    }

    page = 1;
    alterQueryString();
  }

  function openFilters() {
    $body.addClass("has-overlay");
    $mobileFilters.addClass("open");
  }

  function closeFilters() {
    $mobileFilters.removeClass("open");
    $body.removeClass("has-overlay");
  } // Helper Functions


  function alterQueryString() {
    var resetPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var query = [];

    if (resetPage) {
      query.push("page=1");
    } else if (page) {
      query.push("page=" + page);
    }

    if (minPrice !== $priceMin.data("range") || maxPrice !== $priceMax.data("range")) {
      if (minPrice) {
        query.push("min_price=" + minPrice);
      }

      if (maxPrice) {
        query.push("max_price=" + maxPrice);
      }
    }

    if (brands.length) {
      brands.forEach(function (b) {
        query.push("brands[]=" + b);
      });
    }

    if (colors.length) {
      colors.forEach(function (b) {
        query.push("colors[]=" + b);
      });
    }

    var queryString = "?" + query.join("&");
    history.pushState({}, "", queryString);
    getProducts(queryString);
  }

  function getProducts(querystring) {
    pageLoading.show();
    $.ajax({
      url: "/API_PATH" + location.pathname + querystring,
      success: function success(data) {
        // set new HTML data
        $productsListWrapper.html(data.products); // attach event listner for the new pagination links

        $(".js-pagination-link").on("click", changePage); // scroll to products list top

        $([document.documentElement, document.body]).animate({
          scrollTop: $productsListWrapper.offset().top
        }, 500);
      },
      complete: function complete() {
        pageLoading.hide();
      }
    });
  }
}();

$("#category-desc-more").on("click", function (e) {
  $(e.target).parents(".category-desc").toggleClass("show-all");
});