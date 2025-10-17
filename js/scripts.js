document.addEventListener("DOMContentLoaded", function () {
  //filter
  const formFilter = document.getElementById("mainFilterForm");
  const globalResetBtn = document.getElementById("globalResetBtn");
  const sectionResetBtns = document.querySelectorAll(".section-reset-btn");
  const filterButtonOpen = document.querySelectorAll(".js-filter-open");
  const filterButtonClose = document.querySelector(".js-filter-close");
  if (formFilter) {
    globalResetBtn.addEventListener("click", function () {
      formFilter.reset();
      console.log("Все фильтры сброшены");
    });
    sectionResetBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const sectionName = this.getAttribute("data-section");
        resetSection(sectionName);
      });
    });
    function resetSection(sectionName) {
      const inputs = formFilter.querySelectorAll(
        `input[name="${sectionName}[]"]`
      );
      inputs.forEach((input) => {
        input.checked = false;
      });
    }
    formFilter.addEventListener("submit", function (e) {
      e.preventDefault();
      applyFilters();
    });
    function applyFilters() {
      document.body.classList.remove("filter-show");
      console.log("Фильтры применены");
    }
  }
  if (filterButtonOpen) {
    filterButtonOpen.forEach(function (button) {
      button.addEventListener("click", function (event) {
        document.body.classList.add("filter-show");
        event.preventDefault();
      });
    });
  }
  if (filterButtonClose) {
    filterButtonClose.addEventListener("click", function (event) {
      document.body.classList.remove("filter-show");
      event.preventDefault();
    });
  }

  //fancybox
  Fancybox.bind("[data-fancybox]", {
    //settings
  });

  //tooltip
  tippy("[data-title]", {
    content(reference) {
      const dataTitle = reference.getAttribute("data-title");
      return dataTitle.replace(/\n/g, "<br>");
    },
    allowHTML: true,
  });

  //btn tgl and add
  let tglButtons = document.querySelectorAll(".js-btn-tgl");
  let addButtons = document.querySelectorAll(".js-btn-add");
  let buttonsTglOne = document.querySelectorAll(".js-btn-tgl-one");
  for (i = 0; i < tglButtons.length; i++) {
    tglButtons[i].addEventListener("click", function (e) {
      this.classList.contains("active")
        ? this.classList.remove("active")
        : this.classList.add("active");
      e.preventDefault();
      return false;
    });
  }
  for (i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function (e) {
      if (!this.classList.contains("active")) {
        this.classList.add("active");
        e.preventDefault();
        return false;
      }
    });
  }
  buttonsTglOne.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let toggleButtonsWrap = this.closest(".js-toggle-buttons");

      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        toggleButtonsWrap
          .querySelectorAll(".js-btn-tgl-one")
          .forEach(function (btn) {
            btn.classList.remove("active");
          });
        this.classList.add("active");
      }
      return false;
    });
  });

  //js popup wrap
  const togglePopupButtons = document.querySelectorAll(".js-btn-popup-toggle");
  const closePopupButtons = document.querySelectorAll(".js-btn-popup-close");
  const popupElements = document.querySelectorAll(".js-popup-wrap");
  const wrapWidth = document.querySelector(".wrap").offsetWidth;
  const bodyElem = document.querySelector("body");
  function popupElementsClear() {
    document.body.classList.remove("menu-show");
    document.body.classList.remove("search-show");
    popupElements.forEach((element) => element.classList.remove("popup-right"));
  }
  function popupElementsClose() {
    togglePopupButtons.forEach((element) => {
      if (window.innerWidth < 1024) {
        if (
          !element.closest(".no-close-mobile") &&
          !element.closest(".no-close")
        ) {
          element.classList.remove("active");
        }
      } else if (window.innerWidth > 1023) {
        if (
          !element.closest(".no-close-desktop") &&
          !element.closest(".no-close")
        ) {
          element.classList.remove("active");
        }
      } else {
        if (!element.closest(".no-close")) {
          element.classList.remove("active");
        }
      }
    });
  }
  function popupElementsContentPositionClass() {
    popupElements.forEach((element) => {
      let pLeft = element.offsetLeft;
      let pWidth = element.querySelector(".js-popup-block").offsetWidth;
      let pMax = pLeft + pWidth;
      if (pMax > wrapWidth) {
        element.classList.add("popup-right");
      } else {
        element.classList.remove("popup-right");
      }
    });
  }
  for (i = 0; i < togglePopupButtons.length; i++) {
    togglePopupButtons[i].addEventListener("click", function (e) {
      popupElementsClear();
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        popupElementsClose();
        this.classList.add("active");
        if (this.closest(".popup-catalog-wrap")) {
          document.body.classList.add("menu-show");
        }
        if (this.closest(".popup-search-wrap")) {
          document.body.classList.add("search-show");
        }
        if (this.closest(".popup-filter-wrap")) {
          document.body.classList.add("filter-show");
        }
        popupElementsContentPositionClass();
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  for (i = 0; i < closePopupButtons.length; i++) {
    closePopupButtons[i].addEventListener("click", function (e) {
      popupElementsClear();
      popupElementsClose();
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  document.onclick = function (event) {
    if (!event.target.closest(".js-popup-block")) {
      popupElementsClear();
      popupElementsClose();
    }
  };
  popupElements.forEach((element) => {
    if (element.classList.contains("js-popup-select")) {
      let popupElementSelectItem = element.querySelectorAll(
        ".js-popup-block li a"
      );
      if (element.querySelector(".js-popup-block .active")) {
        element.classList.add("select-active");
        let popupElementActive = element.querySelector(
          ".js-popup-block .active"
        ).innerHTML;
        let popupElementButton = element.querySelector(".js-btn-popup-toggle");
        popupElementButton.innerHTML = "";
        popupElementButton.insertAdjacentHTML("beforeend", popupElementActive);
      } else {
        element.classList.remove("select-active");
      }
      for (i = 0; i < popupElementSelectItem.length; i++) {
        popupElementSelectItem[i].addEventListener("click", function (e) {
          this.closest(".js-popup-wrap").classList.add("select-active");
          if (
            this.closest(".js-popup-wrap").querySelector(
              ".js-popup-block .active"
            )
          ) {
            this.closest(".js-popup-wrap")
              .querySelector(".js-popup-block .active")
              .classList.remove("active");
          }
          this.classList.add("active");
          let popupElementActive = element.querySelector(
            ".js-popup-block .active"
          ).innerHTML;
          let popupElementButton = element.querySelector(
            ".js-btn-popup-toggle"
          );
          popupElementButton.innerHTML = "";
          popupElementButton.insertAdjacentHTML(
            "beforeend",
            popupElementActive
          );
          popupElementsClear();
          popupElementsClose();
          if (!this.closest(".js-tabs-nav")) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
      }
    }
  });

  //js tabs
  const tabsNav = document.querySelectorAll(".js-tabs-nav");
  const tabsBlocks = document.querySelectorAll(".js-tab-block");
  const tabsButtonTitle = document.querySelectorAll(".js-tab-title");
  const tabsButtonContent = document.querySelectorAll(".js-tab-content");
  function tabsActiveStart() {
    for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
      if (tabsBlocks[iTab].classList.contains("active")) {
        tabsBlocks[iTab].classList.remove("active");
      }
    }
    for (i = 0; i < tabsNav.length; i++) {
      let tabsNavElements = tabsNav[i].querySelectorAll("[data-tab]");
      for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
        if (tabsNavElements[iElements].classList.contains("active")) {
          let tabsNavElementActive = tabsNavElements[iElements].dataset.tab;
          for (j = 0; j < tabsBlocks.length; j++) {
            if (
              tabsBlocks[j].dataset.tab
                .toString()
                .indexOf(tabsNavElementActive) > -1
            ) {
              console.log(
                tabsBlocks[j].dataset.tab
                  .toString()
                  .indexOf(tabsNavElementActive)
              );
              tabsBlocks[j].classList.add("active");
            }
          }
        }
      }
    }
  }
  for (i = 0; i < tabsButtonTitle.length; i++) {
    tabsButtonTitle[i].addEventListener("click", function (e) {
      this.classList.toggle("active");
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  for (i = 0; i < tabsNav.length; i++) {
    tabsNav[i].addEventListener("click", function (e) {
      if (e.target.closest("[data-tab]")) {
        let tabsNavElements = this.querySelector("[data-tab].active");
        tabsNavElements ? tabsNavElements.classList.remove("active") : false;
        e.target.closest("[data-tab]").classList.add("active");
        tabsActiveStart();
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  }
  tabsActiveStart();

  // Popups
  let popupCurrent;
  let popupsList = document.querySelectorAll(".popup-outer-box");
  let autoCloseTimeout;

  document.querySelectorAll(".js-popup-open").forEach(function (element) {
    element.addEventListener("click", function (e) {
      document.querySelector(".popup-outer-box").classList.remove("active");
      document.body.classList.add("popup-open");
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout);
        autoCloseTimeout = null;
      }

      for (i = 0; i < popupsList.length; i++) {
        popupsList[i].classList.remove("active");
      }

      popupCurrent = this.getAttribute("data-popup");
      document
        .querySelector(`.popup-outer-box[id="${popupCurrent}"]`)
        .classList.add("active");
      if (popupCurrent === "popup-cart-added") {
        autoCloseTimeout = setTimeout(function () {
          document.body.classList.remove("popup-open");
          document
            .querySelector(`.popup-outer-box[id="${popupCurrent}"]`)
            .classList.remove("active");
          autoCloseTimeout = null;
        }, 1000);
      }

      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  });

  document.querySelectorAll(".js-popup-close").forEach(function (element) {
    element.addEventListener("click", function (event) {
      document.body.classList.remove("popup-open");
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout);
        autoCloseTimeout = null;
      }

      for (i = 0; i < popupsList.length; i++) {
        popupsList[i].classList.remove("active");
      }
      event.preventDefault();
      event.stopPropagation();
    });
  });

  document.querySelectorAll(".popup-outer-box").forEach(function (element) {
    element.addEventListener("click", function (event) {
      if (!event.target.closest(".popup-box")) {
        document.body.classList.remove("popup-open");
        document.body.classList.remove("popup-open-scroll");
        if (autoCloseTimeout) {
          clearTimeout(autoCloseTimeout);
          autoCloseTimeout = null;
        }

        document.querySelectorAll(".popup-outer-box").forEach(function (e) {
          e.classList.remove("active");
        });
        return false;
      }
    });
  });

  //slider
  const sliderstiles = document.querySelectorAll(".slider-tiles");

  sliderstiles.forEach((container) => {
    const swiperEl = container.querySelector(".swiper");
    const paginationEl = container.querySelector(".slider-tiles-pagination");
    const nextEl = container.querySelector(".button-slider-tiles-next");
    const prevEl = container.querySelector(".button-slider-tiles-prev");

    if (!swiperEl) return;

    new Swiper(swiperEl, {
      loop: false,
      slidesPerView: 2,
      spaceBetween: 0,
      autoHeight: false,
      speed: 400,
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      autoplay: false,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
      freeMode: true,
      breakpoints: {
        600: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: {
          slidesPerView: 5,
        },
      },
    });
  });

  //slider
  const slidersreviews = document.querySelectorAll(".slider-reviews");

  slidersreviews.forEach((container) => {
    const swiperEl = container.querySelector(".swiper");
    const paginationEl = container.querySelector(".slider-reviews-pagination");
    const nextEl = container.querySelector(".button-slider-reviews-next");
    const prevEl = container.querySelector(".button-slider-reviews-prev");

    if (!swiperEl) return;

    new Swiper(swiperEl, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 400,
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      autoplay: false,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  });

  //slider
  const slidersmain = document.querySelectorAll(".slider-main");

  slidersmain.forEach((container) => {
    const swiperEl = container.querySelector(".swiper");
    const paginationEl = container.querySelector(".slider-main-pagination");
    const nextEl = container.querySelector(".button-slider-main-next");
    const prevEl = container.querySelector(".button-slider-main-prev");

    if (!swiperEl) return;

    new Swiper(swiperEl, {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: false,
      speed: 400,
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      autoplay: false,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
    });
  });

  //slider order add
  const slidersadd = document.querySelectorAll(".slider-add");

  slidersadd.forEach((container) => {
    const swiperEl = container.querySelector(".swiper");
    const nextEl = container.querySelector(".button-slider-add-next");
    const prevEl = container.querySelector(".button-slider-add-prev");

    if (!swiperEl) return;

    new Swiper(swiperEl, {
      loop: false,
      slidesPerGroup: 1,
      slidesPerView: 3,
      spaceBetween: 0,
      autoHeight: true,
      speed: 400,
      pagination: false,
      autoplay: false,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
      breakpoints: {
        1200: { slidesPerView: 4 },
        1400: { slidesPerView: 5 },
      },
    });
  });

  //slider photos thumbs preview
  document
    .querySelectorAll(".tiles-thumbs-slider-box")
    .forEach(function (container) {
      const thumbsEl = container.querySelector(".slider-photos-thumbs .swiper");
      const mainEl = container.querySelector(".slider-photos-main .swiper");
      const nextTBtn = container.querySelector(
        ".button-slider-photos-thumbs-next"
      );
      const prevTBtn = container.querySelector(
        ".button-slider-photos-thumbs-prev"
      );
      const mainPag = container.querySelector(".slider-photos-main-pagination");
      const isInsidePopup = container.closest(".popup-box") !== null;
      const previewParams = {
        loop: false,
        slidesPerGroup: 1,
        slidesPerView: "auto",
        spaceBetween: 0,
        threshold: 5,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        freeMode: true,
        navigation: {
          nextEl: nextTBtn,
          prevEl: prevTBtn,
        },
      };
      if (isInsidePopup) {
        previewParams.direction = "vertical";
        previewParams.breakpoints = {
          768: {
            direction: "horizontal",
          },
        };
      }
      const swiperPhotosPreview = new Swiper(thumbsEl, previewParams);
      const swiperPhotosMain = new Swiper(mainEl, {
        loop: false,
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 400,
        threshold: 5,
        freeMode: false,
        watchSlidesProgress: true,
        navigation: false,
        pagination: {
          el: mainPag,
          clickable: true,
        },
        thumbs: {
          swiper: swiperPhotosPreview,
        },
      });
    });
});
