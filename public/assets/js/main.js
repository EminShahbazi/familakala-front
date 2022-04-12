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
    $body.addClass("has-overlay");
    $pageLoading.show();
  }

  function hide() {
    $pageLoading.hide();
    $body.removeClass("has-overlay");
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

    function selectTab(e) {
      var $this = $(e.target);

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