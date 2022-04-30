"use strict";

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

var login = function () {
  // constants
  var duration = 120; // State

  var phoneNumber = null;
  var timeLeft = duration;
  var timer; // Catche DOM

  var $modal = $("#login-modal");
  var $screens = $modal.find(".js-login-screen");
  var $otpScreenToggler = $modal.find(".js-login-otp-toggler");
  var $otpScreen = $modal.find("#login-otp");
  var $otpForm = $otpScreen.find(".login-form");
  var $otpPhoneInput = $otpForm.find("#phone");
  var $otpVerifyScreen = $modal.find("#login-otp-verify");
  var $otpVerifyForm = $otpVerifyScreen.find(".login-form");
  var $otpPhoneNumber = $otpVerifyForm.find("#otpv-phone");
  var $otpVerifyInputs = $otpVerifyForm.find(".js-otpv-control");
  var $optVerifyTimer = $otpVerifyForm.find("#otpv-timer-wrapper");
  var $optVerifyCountdown = $optVerifyTimer.find("#otpv-timer");
  var $optVerifyResend = $otpVerifyForm.find("#otpv-resend");
  var $passScreenToggler = $modal.find(".js-login-pass-toggler");
  var $passScreen = $modal.find("#login-pass");
  var $passScreenForm = $modal.find(".login-form");
  var $passScreenPhoneInput = $passScreenForm.find("#phonenumber");
  var $passScreenPassInput = $passScreenForm.find("#password");
  var $passScreenFeedback = $passScreenForm.find("#login-pass-feedback"); // Events

  $otpForm.on("submit", submitOtp);
  $otpVerifyForm.on("submit", submitOtpVerify);
  $optVerifyResend.on("click", resendCode);
  $passScreenForm.on("submit", submitPass);
  $otpScreenToggler.on("click", showOtpScreen);
  $passScreenToggler.on("click", showPassScreen);
  $otpVerifyInputs.on("keyup", goToNextCodeInput); // $otpVerifyInputs.on("keydown", onlyOneChar);
  // Event Listners

  function submitOtp(e) {
    e.preventDefault();
    phoneNumber = $otpPhoneInput.val();
    $.ajax({
      url: "/api/login/otp",
      data: JSON.stringify({
        phone: phoneNumber
      }),
      contentType: "application/json",
      method: "POST",
      success: function success() {
        $otpPhoneNumber.text(phoneNumber);
        $otpScreen.hide();
        $otpVerifyScreen.show();
        startTimer();
      },
      error: function error(xhr) {
        var errors = JSON.parse(xhr.responseText);

        if (errors.phone) {
          $otpPhoneInput.addClass("invalid");
          $otpPhoneInput.next(".form-feedback").text(errors.phone);
        }
      }
    });
  }

  function submitOtpVerify(e) {
    e.preventDefault();
    var code = "";
    $otpVerifyInputs.each(function () {
      code += $(this).val();
    });

    if (code.length !== 5) {
      $otpVerifyInputs.addClass("invalid");
      return;
    }

    $.ajax({
      url: "/api/login/otp-verify",
      data: JSON.stringify({
        phone: phoneNumber,
        code: code
      }),
      contentType: "application/json",
      method: "POST",
      success: function success() {
        location.reload();
      },
      error: function error(xhr) {
        var errors = JSON.parse(xhr.responseText);
        $otpVerifyInputs.addClass("invalid");

        if (errors.code) {
          $otpVerifyForm.find(".form-feedback").text(errors.code);
        }
      }
    });
  }

  function resendCode(e) {
    $.ajax({
      url: "/api/login/otp",
      data: JSON.stringify({
        phone: phoneNumber
      }),
      contentType: "application/json",
      method: "POST",
      success: function success() {
        $otpVerifyInputs.val("").removeClass("invalid");
        $otpVerifyForm.find(".form-feedback").text("").hide();
        resetTimer();
      },
      error: function error(xhr) {}
    });
  }

  function submitPass(e) {
    e.preventDefault();
    var phone = $passScreenPhoneInput.val();
    var password = $passScreenPassInput.val();
    console.log(phone);
    console.log(password);
    $.ajax({
      url: "/api/login/password",
      data: JSON.stringify({
        phone: phone,
        password: password
      }),
      contentType: "application/json",
      method: "POST",
      success: function success() {
        location.reload();
      },
      error: function error(xhr) {
        var error = xhr.responseText;

        if (error) {
          $passScreenFeedback.text(error).show();
        }
      }
    });
  }

  function showPassScreen() {
    $passScreenPhoneInput.removeClass("invalid").val("");
    $passScreenPassInput.removeClass("invalid").val("");
    $passScreenFeedback.text("").hide();
    $screens.hide();
    $passScreen.show();
  }

  function showOtpScreen() {
    phoneNumber = null;
    $otpPhoneInput.removeClass("invalid").val("");
    $otpPhoneInput.next(".form-feedback").text("").hide();
    $screens.hide();
    $otpScreen.show();
  }

  function goToNextCodeInput(e) {
    var keyCode = e.which;
    var $this = $(this);

    if (keyCode == 8 || keyCode == 46) {
      $this.prev(".js-otpv-control").focus();
    } else if (keyCode == 9) {
      $this.select();
    } else if (this.value.length == this.maxLength) {
      $this.next(".js-otpv-control").focus();
    }

    e.preventDefault();
  } // UI functions


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
}();

$(document).ready(function () {
  $(".modal").modal();
});