"use strict";

var headerCats = function () {
  // Cache DOM
  var $container = $("#js-header-cats");
  var $toggler = $container.find("#js-header-cats-toggler"); // EventListners

  $toggler.on("click", toggleCats); // Event Handlers

  function toggleCats(e) {
    $container.toggleClass("show-all");
  }
}();