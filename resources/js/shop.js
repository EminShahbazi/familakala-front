const filterProducts = (function () {
    let page = 1;
    let sortBy = null;
    let minPrice = null;
    let maxPrice = null;
    let brands = [];
    let colors = [];

    // Cache DOM
    const $productsListWrapper = $("#products-list-wrapper");
    const $paginationLinks = $productsListWrapper.find(".js-pagination-link");

    const priceSlider = $("#price-slider")[0];
    const $priceMin = $("#price-filter-min");
    const $priceMax = $("#price-filter-max");
    const $priceButton = $("#price-filter-submit");

    const $brandsInput = $("input.brand");
    const $brandsLabels = $("label.brand");
    const $colorsInput = $("input.color");
    const $sortInput = $("input.sort");

    const $mobileFiltersToggler = $("#products-filters-toggler");
    const $mobileFilters = $("#products-filters");

    const $brandsSearch = $("#brands-search");

    // Events
    $paginationLinks.on("click", changePage);
    $priceButton.on("click", alterQueryString);
    $brandsInput.on("change", handleBrandChange);
    $colorsInput.on("change", handleColorChange);
    $sortInput.on("change", handleSortChange);

    $mobileFiltersToggler.on("click", openFilters);
    $bodyMask.on("click", closeFilters);

    $brandsSearch.on("keyup", searchBrands);

    // Init
    init();

    function init() {
        sortBy = $sortInput.filter(":checked").val();
        minPrice = $priceMin.data("value");
        maxPrice = $priceMax.data("value");

        if (priceSlider) {
            noUiSlider.create(priceSlider, {
                start: [minPrice, maxPrice],
                connect: true,
                direction: "rtl",
                range: {
                    min: $priceMin.data("range"),
                    max: $priceMax.data("range"),
                },
            });

            priceSlider.noUiSlider.on("update", function (values, handle) {
                minPrice = Math.round(values[0]);
                maxPrice = Math.round(values[1]);
                $priceMin.html(Math.round(values[0]));
                $priceMax.html(Math.round(values[1]));
            });
        }
    }

    // Event Handlers
    function changePage(e) {
        e.preventDefault();
        const $this = $(e.currentTarget);
        page = $this.data("page");
        alterQueryString(false);
    }

    function handleBrandChange(e) {
        const id = $(e.target).val(); //e.target.dataset.id;
        const index = brands.findIndex((b) => b == id);
        if (index === -1) {
            brands.push(id);
        } else {
            brands.splice(index, 1);
        }

        page = 1;
        alterQueryString();
    }

    function handleColorChange(e) {
        const id = $(e.target).val(); //e.target.dataset.id;
        const index = brands.findIndex((b) => b == id);
        if (index === -1) {
            colors.push(id);
        } else {
            colors.splice(index, 1);
        }

        page = 1;
        alterQueryString();
    }

    function handleSortChange(e) {
        sortBy = $(e.target).val();
        page = 1;
        $("#pl-orderby-modal").removeClass("open");
        alterQueryString();
    }

    function openFilters() {
        $body.addClass("has-overlay");
        $mobileFilters.addClass("open");
    }

    function closeFilters() {
        $mobileFilters.removeClass("open");
        $body.removeClass("has-overlay");
    }

    function searchBrands() {
        const term = $(this).val();

        var regex = new RegExp("^" + term, "i");
        const $found = $brandsLabels.filter(function () {
            return regex.test($(this).text());
        });

        $brandsLabels.not($found).hide();
        $found.show();
    }

    // Helper Functions
    function alterQueryString(resetPage = true) {
        let query = [];

        if (resetPage) {
            query.push("page=1");
        } else if (page) {
            query.push("page=" + page);
        }

        if (
            minPrice !== $priceMin.data("range") ||
            maxPrice !== $priceMax.data("range")
        ) {
            if (minPrice) {
                query.push("min_price=" + minPrice);
            }

            if (maxPrice) {
                query.push("max_price=" + maxPrice);
            }
        }

        if (sortBy) {
            query.push("sort_by=" + sortBy);
        }

        if (brands.length) {
            brands.forEach((b) => {
                query.push("brands[]=" + b);
            });
        }

        if (colors.length) {
            colors.forEach((b) => {
                query.push("colors[]=" + b);
            });
        }

        const queryString = "?" + query.join("&");
        history.pushState({}, "", queryString);
        getProducts(queryString);
    }

    function getProducts(querystring) {
        pageLoading.show();

        $.ajax({
            url: "/API_PATH" + location.pathname + querystring,
            success: function (data) {
                // set new HTML data
                $productsListWrapper.html(data.products);
                // attach event listner for the new pagination links
                $(".js-pagination-link").on("click", changePage);
                // scroll to products list top
                $([document.documentElement, document.body]).animate(
                    {
                        scrollTop: $productsListWrapper.offset().top,
                    },
                    500
                );
            },
            complete: function () {
                pageLoading.hide();
            },
        });
    }
})();

$("#category-desc-more").on("click", function (e) {
    $(e.target).parents(".category-desc").toggleClass("show-all");
});
