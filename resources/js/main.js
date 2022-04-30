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

const login = (function () {
    // constants
    const duration = 120;

    // State
    let phoneNumber = null;
    let timeLeft = duration;
    let timer;

    // Catche DOM
    const $modal = $("#login-modal");

    const $otpScreen = $modal.find("#login-otp");
    const $otpForm = $otpScreen.find(".login-form");
    const $otpPhoneInput = $otpForm.find("#phone");

    const $otpVerifyScreen = $modal.find("#login-otp-verify");
    const $otpVerifyForm = $otpVerifyScreen.find(".login-form");
    const $otpPhoneNumber = $otpVerifyForm.find("#otpv-phone");
    const $otpVerifyInputs = $otpVerifyForm.find(".js-otpv-control");
    const $optVerifyTimer = $otpVerifyForm.find("#otpv-timer-wrapper");
    const $optVerifyCountdown = $optVerifyTimer.find("#otpv-timer");
    const $optVerifyResend = $otpVerifyForm.find("#otpv-resend");

    const $passScreen = $modal.find("#login-pass");

    // Events
    $otpForm.on("submit", submitOtp);
    $otpVerifyForm.on("submit", submitOtpVerify);
    $otpVerifyInputs.on("keyup", goToNextCodeInput);
    $optVerifyResend.on("click", resendCode);

    // $otpVerifyInputs.on("keydown", onlyOneChar);

    // Event Listners
    function submitOtp(e) {
        e.preventDefault();
        phoneNumber = $otpPhoneInput.val();

        $.ajax({
            url: "/api/login/otp",
            data: JSON.stringify({ phone: phoneNumber }),
            contentType: "application/json",
            method: "POST",
            success: function () {
                $otpPhoneNumber.text(phoneNumber);
                $otpScreen.hide();
                $otpVerifyScreen.show();
                startTimer();
            },
            error: function (xhr) {
                const errors = JSON.parse(xhr.responseText);
                if (errors.phone) {
                    $otpPhoneInput.addClass("invalid");
                    $otpPhoneInput.next(".form-feedback").text(errors.phone);
                }
            },
        });
    }
    // startTimer();

    function submitOtpVerify(e) {
        e.preventDefault();
        let code = "";
        $otpVerifyInputs.each(function () {
            code += $(this).val();
        });

        if (code.length !== 5) {
            $otpVerifyInputs.addClass("invalid");
            return;
        }

        $.ajax({
            url: "/api/login/otp-verify",
            data: JSON.stringify({ phone: phoneNumber, code: code }),
            contentType: "application/json",
            method: "POST",
            success: function () {
                location.reload();
            },
            error: function (xhr) {
                const errors = JSON.parse(xhr.responseText);
                $otpVerifyInputs.addClass("invalid");

                if (errors.code) {
                    $otpVerifyForm.find(".form-feedback").text(errors.code);
                }
            },
        });
    }

    function resendCode(e) {
        $.ajax({
            url: "/api/login/otp",
            data: JSON.stringify({ phone: phoneNumber }),
            contentType: "application/json",
            method: "POST",
            success: function () {
                $otpVerifyInputs.val("").removeClass("invalid");
                $otpVerifyForm.find(".form-feedback").text("").hide();

                resetTimer();
            },
            error: function (xhr) {},
        });
    }

    function goToNextCodeInput(e) {
        const keyCode = e.which;
        const $this = $(this);

        if (keyCode == 8 || keyCode == 46) {
            $this.prev(".js-otpv-control").focus();
        } else if (keyCode == 9) {
            $this.select();
        } else if (this.value.length == this.maxLength) {
            $this.next(".js-otpv-control").focus();
        }

        e.preventDefault();
    }

    // UI functions
    function startTimer() {
        timer = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timer);
                $optVerifyTimer.hide();
                $optVerifyResend.show();
            }
            $optVerifyCountdown.html(getTimeLeft());
            timeLeft = timeLeft - 1;
        }, 1000);
    }

    function resetTimer() {
        timeLeft = duration;
        clearInterval(timer);
        $optVerifyCountdown.html(getTimeLeft());
        $optVerifyResend.hide();
        $optVerifyTimer.show();
        startTimer();
    }

    function getTimeLeft() {
        return new Date(timeLeft * 1000).toISOString().substr(14, 5);
    }
})();

$(document).ready(function () {
    $(".modal").modal();
});
