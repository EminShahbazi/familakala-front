"use strict";

var $body = $(document.body);
var $bodyMask = $("#js-body-mask");

var mobileMenu = function () {
  // Cache DOM
  var $menuToggler = $("#js-mobile-menu-toggler");
  var $menu = $("#js-mobile-menu");
  var $togglers = $menu.find(".mobile-nav-item .heading"); // Event Listners

  $menuToggler.on("click", openMenu);
  $togglers.on("click", openMenuItem);
  $bodyMask.on("click", closeMenu); // Event Handles

  function openMenu() {
    $body.addClass("has-overlay");
    $menu.addClass("open");
  }

  function closeMenu() {
    $menu.removeClass("open");
    $body.removeClass("has-overlay");
  }

  function openMenuItem(event) {
    $(event.target).parent(".mobile-nav-item").toggleClass("active");
  }
}();

var headerCats = function () {
  // Cache DOM
  var $container = $("#js-header-cats");
  var $toggler = $container.find("#js-header-cats-toggler"); // EventListners

  $toggler.on("click", toggleCats); // Event Handlers

  function toggleCats(e) {
    $container.toggleClass("show-all");
  }
}();

var pageLoading = function () {
  // Cache DOM
  var $pageLoading = $("#js-page-loading"); // Functions

  function show() {
    $body.addClass("no-scroll");
    $pageLoading.addClass("open");
  }

  function hide() {
    $pageLoading.removeClass("open");
    $body.removeClass("no-scroll");
  }

  return {
    show: show,
    hide: hide
  };
}();

jQuery.fn.tabs = function () {
  this.each(function () {
    // cache DOM
    var $tabs = $(this);
    var $togglers = $tabs.find(".js-tab-toggler");
    var $contents = $tabs.find(".js-tab-content"); // Events

    $togglers.on("click", selectTab); // Event Handlers

    function selectTab() {
      var $this = $(this);

      if ($this.hasClass("active")) {
        return;
      }

      $togglers.removeClass("active");
      $contents.removeClass("active");
      $this.addClass("active");
      $($this.data("content")).addClass("active");
    }
  });
  return this;
};

jQuery.fn.modal = function () {
  // Cache DOM
  this.each(function () {
    var $this = $(this);
    var $toggler = $($this.data("toggler"));
    var $close = $this.find(".js-modal-close"); // Event Listners

    $toggler.on("click", openModal);
    $this.on("click", closeModal);
    $close.on("click", closeModalBtn); // Event Handlers

    function openModal() {
      $body.addClass("no-scroll");
      $this.addClass("open");
    }

    function closeModal(e) {
      if (e.target === e.currentTarget) {
        $body.removeClass("no-scroll");
        $this.removeClass("open");
      } // if (!$this.is(e.target) && $this.has(e.target).length === 0) {
      //     $body.removeClass("has-overlay");
      //     $this.removeClass("open");
      // }

    }

    function closeModalBtn(e) {
      $body.removeClass("has-overlay");
      $this.removeClass("open");
    }

    if ($this.hasClass("default-open")) {
      openModal();
    }
  });
  return this;
};

jQuery.fn.rateInput = function () {
  this.each(function () {
    // Cache DOM
    var $this = $(this);
    var $title = $this.find(".js-rate-title");
    var $inputs = $this.find(".js-rate-input");
    var $labels = $this.find(".js-rate-label"); // helpers

    var titles = ["خیلی بد", "بد", "متوسط", "خوب", "خیلی خوب"]; // Event Listners

    $inputs.on("change", handleRateChange); // Event Handlers

    function handleRateChange(e) {
      var $input = $(e.target);
      var value = parseInt($input.val());
      $labels.removeClass("checked");

      if (value > 1) {
        $labels.slice(0, value).addClass("checked");
      }

      $title.text(titles[value - 1]);
    }
  });
  return this;
};

$(document).ready(function () {
  $(".modal").modal();
});