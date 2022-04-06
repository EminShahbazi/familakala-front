const filterProducts = (function () {
    let minPrice = null;
    let maxPrice = null;

    // Cache DOM
    const priceSlider = document.getElementById("price-slider");
    const $priceMin = $("#price-filter-min");
    const $priceMax = $("#price-filter-max");
    const $priceButton = $("#price-filter-submit");

    // Events

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
                    max: $priceMax.data("range"),
                },
            });

            priceSlider.noUiSlider.on("update", function (values, handle) {
                minPrice = Math.round(values[0]);
                maxPrice = Math.round(values[1]);
                $priceMin.html(
                    Math.round(values[0]).toLocaleString("fa-IR", {
                        style: "decimal",
                    })
                );
                $priceMax.html(
                    Math.round(values[1]).toLocaleString("fa-IR", {
                        style: "decimal",
                    })
                );
            });
        }
    }
})();

$("#category-desc-more").on("click", function (e) {
    $(e.target).parents(".category-desc").toggleClass("show-all");
});
