const $body = $(document.body);
const $bodyMask = $("#js-body-mask");

const mobileMenu = (function () {
    // Cache DOM
    const $menuToggler = $("#js-mobile-menu-toggler");
    const $menu = $("#js-mobile-menu");
    const $togglers = $menu.find(".mobile-nav-item .heading");

    // Event Listners
    $menuToggler.on("click", openMenu);
    $togglers.on("click", openMenuItem);
    $bodyMask.on("click", closeMenu);

    // Event Handles
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
})();
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

const pageLoading = (function () {
    // Cache DOM
    const $pageLoading = $("#js-page-loading");

    // Functions
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
        hide: hide,
    };
})();
