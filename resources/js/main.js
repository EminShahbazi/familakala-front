const headerCats = (function () {
    // Cache DOM
    const $container = $("#js-header-cats");
    const $toggler = $container.find("#js-header-cats-toggler");

    // EventListners
    $toggler.on("click", toggleCats);

    // Event Handlers
    function toggleCats(e) {
        $container.toggleClass("show-all");
    }
})();
