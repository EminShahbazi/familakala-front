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
        $body.addClass("no-scroll show-mask");
        $menu.addClass("open");
    }

    function closeMenu() {
        $menu.removeClass("open");
        $body.removeClass("no-scroll show-mask");
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
        $body.addClass("no-scroll");
        $pageLoading.addClass("open");
    }

    function hide() {
        $pageLoading.removeClass("open");
        $body.removeClass("no-scroll");
    }

    return {
        show: show,
        hide: hide,
    };
})();

jQuery.fn.tabs = function () {
    this.each(function () {
        // cache DOM
        const $tabs = $(this);
        const $togglers = $tabs.find(".js-tab-toggler");
        const $contents = $tabs.find(".js-tab-content");

        // Events
        $togglers.on("click", selectTab);

        // Event Handlers
        function selectTab() {
            const $this = $(this);
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
        const $this = $(this);
        const $toggler = $($this.data("toggler"));
        const $close = $this.find(".js-modal-close");

        // Event Listners
        $toggler.on("click", openModal);
        $this.on("click", closeModal);
        $close.on("click", closeModalBtn);

        // Event Handlers
        function openModal() {
            $body.addClass("no-scroll");
            $this.addClass("open");
        }

        function closeModal(e) {
            if (e.target === e.currentTarget) {
                $body.removeClass("no-scroll");
                $this.removeClass("open");
            }
        }
        function closeModalBtn(e) {
            $body.removeClass("no-scroll");
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
        const $this = $(this);
        const $title = $this.find(".js-rate-title");
        const $inputs = $this.find(".js-rate-input");
        const $labels = $this.find(".js-rate-label");

        // helpers
        const titles = ["خیلی بد", "بد", "متوسط", "خوب", "خیلی خوب"];

        // Event Listners
        $inputs.on("change", handleRateChange);

        // Event Handlers
        function handleRateChange(e) {
            const $input = $(e.target);
            const value = parseInt($input.val());

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
