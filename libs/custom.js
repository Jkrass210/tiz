$(document).ready(function () {
  function onStopScroll() {
    const body = document.querySelector("body");
    body.classList.add("stop-scroll");
  }
  function offStopScroll() {
    const body = document.querySelector("body");
    body.classList.remove("stop-scroll");
  }

  function catalogSecondaryTabs() {
    if (document.querySelectorAll('.catalog-secondary-tabs')) {
      const tabContainers = document.querySelectorAll('.catalog-secondary-tabs');

      tabContainers.forEach(container => {
        const tabLinks = container.querySelectorAll('.catalog-secondary-tabs__nav li');
        const tabSections = container.querySelectorAll('.catalog-secondary-tabs__section');
        container.addEventListener('click', function (e) {
          const target = e.target.closest('a');

          if (target && target.closest('.catalog-secondary-tabs__grid')) {
            return;
          }

          if (target && target.closest('li')) {
            e.preventDefault();
            const clickedIndex = Array.from(tabLinks).indexOf(target.closest('li'));

            tabLinks.forEach(link => link.classList.remove('active'));
            tabSections.forEach(section => section.classList.remove('active'));

            tabLinks[clickedIndex].classList.add('active');
            if (tabSections[clickedIndex]) {
              tabSections[clickedIndex].classList.add('active');
            }
          }
        });
      });
    }
  }

  function openMemu(idBtn, idMenu, classActiveBtn, classActiveMenu, classButtonInMenu, scroll = true) {
    const btn = document.querySelector(idBtn);
    const menu = document.querySelector(idMenu);

    btn.addEventListener("click", () => {
      const isMenuActive = menu.classList.contains(classActiveMenu);
      if (isMenuActive) {
        closeMenu();
      } else {
        btn.classList.add(classActiveBtn);
        menu.classList.add(classActiveMenu);
        if (scroll) {
          onStopScroll();
        }
        document.addEventListener("click", closeMenuOnClickOutside);
      }
    });

    function closeMenu() {
      btn.classList.remove(classActiveBtn);
      menu.classList.remove(classActiveMenu);
      if (scroll) {
        offStopScroll();
      }
      document.removeEventListener("click", closeMenuOnClickOutside);
    }

    function closeMenuOnClickOutside(event) {
      if (!menu.contains(event.target) && !btn.contains(event.target)) {
        closeMenu();
      }
    }
    menu.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains(classButtonInMenu)) {
        closeMenu();
      }
    });
  }


  if (document.querySelector("#btnBurger") && document.querySelector("#menuBurger")) {
    openMemu("#btnBurger", "#menuBurger", "header__burger--active", "header__menu-list-wrapp--active", "header__menu-item-link", true)
  }

  if (document.querySelector("#btnHiddenMenuTabs") && document.querySelector("#hiddenMenuTabs")) {
    openMemu("#btnHiddenMenuTabs", "#hiddenMenuTabs", "active", "active", "link-for-close", false)
  }

  if (document.querySelector("#btnHiddenMenuLinks") && document.querySelector("#hiddenMenuLinks")) {
    document.querySelectorAll(".catalog-main-menu__list-item-btm").forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
      })
    })
    openMemu("#btnHiddenMenuLinks", "#hiddenMenuLinks", "active", "active", "catalog-main-menu__list-item-btm", false)
  }

  if (document.querySelectorAll(".catalog-main-menu__list-item")) {
    const itemTabs = document.querySelectorAll(".catalog-main-menu__list-item");
    const box = document.querySelector("div.catalog-main-menu__content");
    if (window.innerWidth <= 870) {
      itemTabs.forEach((itemTab) => {
        itemTab.classList.remove("active");
      })
    }
    function search() {
      itemTabs.forEach((itemTab) => {
        if (itemTab.classList.contains("tab1")) {
          itemTab.querySelector("#catalogMainTab1").classList.add("active");
        } else if (itemTab.classList.contains("tab2")) {
          itemTab.querySelector("#catalogMainTab2").classList.add("active");
        }
        if (window.innerWidth > 870) {
          if (itemTab.classList.contains("active")) {
            const tab = itemTab.querySelector(
              ".catalog-main-menu__main-tab-wrapp"
            );
            const clonedElement = tab.cloneNode(true);
            box.appendChild(clonedElement);
            catalogSecondaryTabs();
          }
        }
      });
    }
    search();
    itemTabs.forEach((itemTab) => {
      itemTab.querySelector("button").addEventListener("click", () => {
        const currentItemTab = itemTab;
        const isActive = currentItemTab.classList.contains("active");
        itemTabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        box.innerHTML = "";
        if (window.innerWidth <= 870) {
          if (!isActive) {
            currentItemTab.classList.add("active");
          }
        } else {
          currentItemTab.classList.add("active");
        }
        search();
      });
    });
  }

  function moveImageOnResize() {
    if (document.querySelectorAll('.story-line__inner') && document.querySelectorAll('.story-line__col') && document.querySelectorAll('.story-line__row')) {
      if (window.innerWidth <= 1200) {
        const parentElements = document.querySelectorAll('.story-line__inner');
        parentElements.forEach(box => {
          const boxsOne = box.querySelectorAll('.story-line__col')[1];
          const boxsTwo = box.querySelector('.story-line__row');

          const img = boxsOne.querySelector('.story-line__img2');
          if (img && boxsTwo) {
            boxsTwo.prepend(img);
          }
        });
      }
    }
  }

  moveImageOnResize()

  window.addEventListener('resize', function () {
    if (window.innerWidth <= 1200) {
      moveImageOnResize();
    }
  });

  function openModal(btn, classCloseModal, classBoxModal, clearInputs = false, clearInputsOpen = true) {
    const buttonId = btn.id;
    const modal = document.querySelector(`[data-modal-id="${buttonId}"]`);
    const closePop = modal.querySelectorAll(classCloseModal);

    function resetPasswordFields() {
      // Находим все инпуты с классами .inputPassword1 или .inputPassword
      const passwordInputs = modal.querySelectorAll('.inputPassword1, .inputPassword');
      passwordInputs.forEach(input => {
        if (input.type === 'text') {
          input.type = 'password'; // Меняем тип на password
        }
      });

      // Убираем класс .active со всех кнопок внутри модального окна
      modal.querySelectorAll('.form-password__btn-password, .inputPassword__btn-password').forEach(button => {
        button.classList.remove('active');
      });
    }

    function offModal() {
      modal.classList.add('none');
      offStopScroll();

      if (clearInputs) {
        modal.querySelectorAll('input, textarea').forEach(input => {
          input.value = '';
        });
      }

      // Сброс полей пароля при закрытии
      resetPasswordFields();
    }

    modal.classList.remove('none');
    onStopScroll();

    if (clearInputsOpen) {
      modal.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
      });
    }

    // Сброс полей пароля при открытии
    resetPasswordFields();

    modal.querySelectorAll(classBoxModal).forEach(box => {
      box.addEventListener('click', e => {
        if (!e.target.closest(classCloseModal)) {
          e.stopPropagation();
          onStopScroll();
        }
      });
    });

    modal.addEventListener('click', e => {
      offModal();
    });

    closePop.forEach(close => {
      close.addEventListener('click', () => {
        offModal();
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        offModal();
      }
    });
  }

  if (document.querySelector(`[data-modal-id="customTailoringModal1"]`)) {
    const modal = document.querySelector(`[data-modal-id="customTailoringModal1"]`);
    const links = modal.querySelectorAll('.modal__link-open');

    if (links) {
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          openWindow(link, '.modal__box', "customTailoringModal1")
        })
      })
    }
  }

  function openWindow(btn, classWindow, idModal) {
    const buttonId = btn.id;
    const modal = document.querySelector(`[data-modal-id="${idModal}"]`)
    const window = modal.querySelector(`[data-window-id="${buttonId}"]`);

    const windows = modal.querySelectorAll(classWindow)
    windows.forEach(window => {
      window.classList.add('none');
    })
    window.classList.remove('none');
  }

  if (document.querySelector(`[data-modal-id="autorizModal"]`)) {
    const modal = document.querySelector(`[data-modal-id="autorizModal"]`);
    const links = modal.querySelectorAll('.modal__link');

    if (links) {
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          openWindow(link, '.modal__box', "autorizModal")
        })
      })
    }
  }

  if (document.querySelector('#autorizModal') && document.querySelector('[data-modal-id="autorizModal"]') && document.querySelector('#subsModal') && document.querySelector('[data-modal-id="subsModal"]')) {
    const btnOpen = document.querySelectorAll(".open-modal");
    btnOpen.forEach(btn => {
      btn.addEventListener('click', () => {
        openModal(btn, ".modal__close", ".modal__box", true)
      })
    })
  }

  if (document.querySelector('#subsModal')) {
    document.querySelector('#subsModal').addEventListener('click', (e) => {
      e.preventDefault()
    })
  }

  function positionSearchElement() {
    const hiddenElement = document.querySelector('.header__hidden');
    const hiddenSearchElement = document.querySelector('.header__hidden-search');
    const searchElement = document.querySelector('.header__search');
    const searchBox = document.querySelector('.header__search-box');

    const windowWidth = window.innerWidth;
    if (searchElement && searchBox) {
      let referenceElement;

      if (windowWidth <= 870) {
        referenceElement = hiddenSearchElement;
      } else if (windowWidth <= 1370) {
        referenceElement = hiddenElement;
      } else {
        referenceElement = searchBox;
      }

      if (referenceElement && !referenceElement.contains(searchElement)) {
        referenceElement.appendChild(searchElement);
      }
    }
  }

  if (document.querySelector('.header__hidden') && document.querySelector('.header__hidden-search') && document.querySelector('.header__search')) {
    window.addEventListener('resize', positionSearchElement);
    positionSearchElement()
  }

  function openBox(btn, btns, boxs) {
    const buttonId = btn.id;
    const box = document.querySelector(`[data-box-id="${buttonId}"]`);

    btns.forEach(dtn => {
      dtn.classList.remove('active')
    })

    boxs.forEach(box => {
      box.classList.remove('active')
    })

    btn.classList.add('active')
    box.classList.add('active')
  }

  if (document.querySelectorAll('.page-order__payment-info') && document.querySelector("#selectionPayment")) {
    const boxBtns = document.querySelector('#selectionPayment')
    const btns = boxBtns.querySelectorAll('.nav-delivery__btn-payment');
    const boxs = document.querySelectorAll('.page-order__payment-info');

    btns.forEach(btn => {
      btn.addEventListener('click', () => { openBox(btn, btns, boxs) })
    })
  }

  if (document.querySelectorAll('.choice-delivery__box-delivery') && document.querySelector("#selectionDeliveryNav")) {
    const boxBtns = document.querySelector('#selectionDeliveryNav')
    const btns = boxBtns.querySelectorAll('.nav-delivery__btn-delivery-nav');
    const boxs = document.querySelectorAll('.choice-delivery__box-delivery');

    btns.forEach(btn => {
      btn.addEventListener('click', () => { openBox(btn, btns, boxs) })
    })
  }

  if (document.querySelectorAll('.choice-delivery__company') && document.querySelector("#choosingService")) {
    const boxBtns = document.querySelector('#choosingService')
    const btns = boxBtns.querySelectorAll('.btn-choice-delivery');
    const boxs = document.querySelectorAll('.choice-delivery__company');

    btns.forEach(btn => {
      btn.addEventListener('click', () => { openBox(btn, btns, boxs) })
    })
  }

  if (document.querySelectorAll('.btn-choice-delivery') && document.querySelector("#company2boxChoiceDelivery")) {
    const boxBtns = document.querySelector('#company2boxChoiceDelivery')
    const btns = boxBtns.querySelectorAll('.btn-choice-delivery');
    const boxs = document.querySelectorAll('.company-2__box-delivery');

    btns.forEach(btn => {
      btn.addEventListener('click', () => { openBox(btn, btns, boxs) })
    })
  }

  if (document.querySelectorAll('.btn-choice-delivery') && document.querySelector("#company3boxChoiceDelivery")) {
    const boxBtns = document.querySelector('#company3boxChoiceDelivery')
    const btns = boxBtns.querySelectorAll('.btn-choice-delivery');
    const boxs = document.querySelectorAll('.company-3__box-delivery');

    btns.forEach(btn => {
      btn.addEventListener('click', () => { openBox(btn, btns, boxs) })
    })
  }

  function openDrop1(btn, classActiveModal, classActiveBtn) {
    const buttonId = btn.id;
    const drop = document.querySelector(`[data-drop-id="${buttonId}"]`);

    function offDrop() {
      btn.classList.remove(classActiveBtn);
      drop.classList.remove(classActiveModal);
    }

    function onDrop() {
      btn.classList.add(classActiveBtn);
      drop.classList.add(classActiveModal);
    }

    if (drop.classList.contains(classActiveModal)) {
      offDrop();
    } else {
      onDrop();
    }

    document.addEventListener('click', event => {
      if (!btn.contains(event.target) && !drop.contains(event.target)) {
        offDrop();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        offDrop();
      }
    });
  }

  function openDrop(btn, classActiveModal, classActiveBtn, shouldTransferText = false) {
    const buttonId = btn.id;
    const drop = document.querySelector(`[data-drop-id="${buttonId}"]`);
    const input = btn.previousElementSibling.tagName === 'INPUT' ? btn.previousElementSibling : null;

    function offDrop() {
      btn.classList.remove(classActiveBtn);
      drop.classList.remove(classActiveModal);
    }

    function onDrop() {
      btn.classList.add(classActiveBtn);
      drop.classList.add(classActiveModal);
    }

    if (drop.classList.contains(classActiveModal)) {
      offDrop();
    } else {
      onDrop();
    }

    document.addEventListener('click', event => {
      if (!btn.contains(event.target) && !drop.contains(event.target)) {
        offDrop();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        offDrop();
      }
    });

    if (shouldTransferText && input) {
      drop.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
          input.value = item.textContent.trim();
          offDrop();
        });
      });
    }
  }


  if (document.querySelectorAll(".drop-down1__btn")) {
    const btnsDrop = document.querySelectorAll(".drop-down1__btn");
    btnsDrop.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrop(btn, "active", "active", shouldTransferText = true);
      })
    })
  }

  if (document.querySelectorAll(".drop-down3__btn")) {
    const btnsDrop = document.querySelectorAll(".drop-down3__btn");
    btnsDrop.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrop1(btn, "active", "active");
      })
    })
  }

  function initializeTabs(containerClass, buttonClass, contentClass, activeClass) {
    const containers = document.querySelectorAll(`.${containerClass}`);
    containers.forEach(container => {
      const tabButton = container.querySelector(`.${buttonClass}`);
      const contentBlock = container.querySelector(`.${contentClass}`);
      if (tabButton && contentBlock) {
        tabButton.addEventListener('click', (e) => {
          e.preventDefault()
          containers.forEach(otherContainer => {
            if (otherContainer !== container) {
              otherContainer.classList.remove(activeClass);
            }
          });
          container.classList.toggle(activeClass);
        });
      }
      const nestedButtons = contentBlock?.querySelectorAll(`.${buttonClass}`);
      if (nestedButtons) {
        nestedButtons.forEach(nestedButton => {
          const nestedContent = nestedButton.nextElementSibling;
          if (nestedContent && nestedContent.matches(`.${contentClass}`)) {
            nestedButton.addEventListener('click', () => {
              nestedButtons.forEach(otherNestedButton => {
                const otherNestedContent = otherNestedButton.nextElementSibling;
                if (otherNestedButton !== nestedButton) {
                  otherNestedButton.parentElement.classList.remove(activeClass);
                }
              });
              nestedButton.parentElement.classList.toggle(activeClass);
            });
          }
        });
      }
    });
  }

  if (document.querySelector('.catalog-main-menu__list-page')) {
    initializeTabs(
      'catalog-main-menu__list-item-page',
      'catalog-main-menu__list-item-btm-page',
      'catalog-main-menu__points-page',
      'active'
    );
    initializeTabs(
      'catalog-main-menu__point',
      'point__btn',
      'point__list',
      'active'
    );
  }

  if (document.querySelector('.filter-advanced__list')) {
    initializeTabs(
      'filter-advanced__item',
      'filter-advanced__btn-tabs',
      'filter-advanced__list-points',
      'active'
    );
  }

  if (document.querySelector('#swiper-10')) {
    const swiper10 = new Swiper("#swiper-10", {
      pagination: {
        el: ".modal__swiper-pagination",
        type: "fraction",
      },
    });
  }

  if (document.querySelector('#swiper-11')) {
    const swiper11 = new Swiper("#swiper-11", {
      spaceBetween: 16,
      grid: {
        rows: 2,
        fill: 'row',
      },
      breakpoints: {
        1030: {
          slidesPerView: 2,
          grid: {
            rows: 2,
          },
        },
        992: {
          slidesPerView: 1,
          grid: {
            rows: 4,
          },
        },
        450: {
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
        },
        0: {
          slidesPerView: 1,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }

  if (document.querySelector(".filter-advanced__range-container")) {
    const rangeMin = document.getElementById("range-min");
    const rangeMax = document.getElementById("range-max");
    const minBubble = document.getElementById("min-bubble");
    const maxBubble = document.getElementById("max-bubble");
    const sliderTrack = document.querySelector(".filter-advanced__slider-track");

    function setPosition(element, value) {
      const percent =
        ((value - rangeMin.min) / (rangeMax.max - rangeMin.min)) * 100;
      element.style.left = `calc(${percent}% - 30px)`;
    }

    function updateTrack() {
      const minPercent =
        ((rangeMin.value - rangeMin.min) / (rangeMax.max - rangeMin.min)) * 100;
      const maxPercent =
        ((rangeMax.value - rangeMin.min) / (rangeMax.max - rangeMin.min)) * 100;

      // Закрашиваем активную часть трека между ползунками
      sliderTrack.style.background = `linear-gradient(to right, #c4d3d7 0%, #c4d3d7 ${minPercent}%, #53818c ${minPercent}%, #53818c ${maxPercent}%, #c4d3d7 ${maxPercent}%)`;
    }

    function updateValues() {
      const minValue = parseInt(rangeMin.value);
      const maxValue = parseInt(rangeMax.value);

      minBubble.textContent = minValue;
      maxBubble.textContent = maxValue;

      setPosition(minBubble, minValue);
      setPosition(maxBubble, maxValue);
      updateTrack();
    }

    function handlePointerMove(e, isMin) {
      const rect = e.target.parentElement.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const value =
        Math.round((percent / 100) * (rangeMax.max - rangeMin.min)) +
        parseInt(rangeMin.min);

      if (isMin && value < parseInt(rangeMax.value)) {
        rangeMin.value = value;
      } else if (!isMin && value > parseInt(rangeMin.value)) {
        rangeMax.value = value;
      }
      updateValues();
    }

    function addPointerEvents(bubble, isMin) {
      function onPointerDown(e) {
        e.preventDefault();
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
      }

      function onPointerMove(e) {
        handlePointerMove(e, isMin);
      }

      function onPointerUp() {
        // Вызываем updateValues для обновления значений в инпутах и пузырьках
        updateValues();
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      }

      bubble.addEventListener("pointerdown", onPointerDown);
    }

    // Привязываем события к пузырькам
    addPointerEvents(minBubble, true);
    addPointerEvents(maxBubble, false);

    // Инициализация значений при загрузке
    updateValues();
  }

  function initFilterToggle(openButtonId, closeButtonClass) {
    const openButton = document.getElementById(openButtonId);
    const filter = document.querySelector(`[data-filter-id="${openButtonId}"]`);

    if (!openButton || !filter) {
      console.error("Не удалось найти кнопку или фильтр.");
      return;
    }

    const closeButton = filter.querySelector(`.${closeButtonClass}`);
    let isFilterOpen = false;

    function openFilter() {
      filter.classList.remove('none');
      onStopScroll(); // Отключаем скролл при открытии фильтра
      isFilterOpen = true;
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscapePress);
      }, 0);
    }

    function closeFilter() {
      filter.classList.add('none');
      offStopScroll(); // Включаем скролл при закрытии фильтра
      isFilterOpen = false;
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    }

    function handleClickOutside(event) {
      if (!filter.contains(event.target) && event.target !== openButton) {
        closeFilter();
      }
    }

    function handleEscapePress(event) {
      if (event.key === 'Escape') {
        closeFilter();
      }
    }

    openButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isFilterOpen) openFilter();
    });

    closeButton?.addEventListener('click', closeFilter);

    // Обработчик для кликов внутри фильтра
    filter.addEventListener('click', () => {
      if (isFilterOpen) onStopScroll();
    });
  }

  if (document.querySelector('#filterAdvanced')) {
    initFilterToggle("filterAdvanced", "filter-advanced__close")
  }

  function moveSwiper() {
    const swiper = document.getElementById('swiper-11');
    const targetContainer = document.querySelector('.product-card__hidden-box-swiper');
    const originalParent = document.querySelector('.product-card__main');

    if (!swiper || !targetContainer || !originalParent) {
      console.error("Не удалось найти один из элементов.");
      return;
    }

    if (window.innerWidth < 992) {
      if (!targetContainer.contains(swiper)) {
        targetContainer.appendChild(swiper);
      }
    } else {
      if (!originalParent.contains(swiper)) {
        originalParent.insertBefore(swiper, originalParent.firstChild); // Перемещаем в начало
      }
    }
  }

  if (document.getElementById('swiper-11') && document.querySelector('.product-card__hidden-box-swiper')) {
    moveSwiper()
    window.addEventListener('resize', moveSwiper);
  }

  if (document.querySelector('input.dflt-input[type="text"][placeholder="+7"]')) {
    $('input.dflt-input[type="text"][placeholder="+7"]').each(function () {
      $(this).mask('+7 (000) 000-00-00');
    });
  }

  function initPasswordToggle(inputClass, buttonClass, activeClass = 'active') {
    document.querySelectorAll(buttonClass).forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        const input = this.previousElementSibling;
        if (input && input.classList.contains(inputClass.replace('.', ''))) {
          if (input.type === 'password') {
            input.type = 'text';
            this.classList.add(activeClass);
          } else {
            input.type = 'password';
            this.classList.remove(activeClass);
          }
        }
      });
    });
  }

  if (document.querySelectorAll('imput[type="password"]')) {
    initPasswordToggle('.dflt-input', '.inputPassword__btn-password', 'active');
    initPasswordToggle('.dflt-input', '.form-password__btn-password', 'active');
  }

  if (document.querySelectorAll('.header__search')) {
    window.onload = () => {
      document.querySelectorAll('.header__search input').forEach((inputField) => {
        inputField.value = ''; // Очищаем поле при загрузке страницы
        inputField.setAttribute('autocomplete', 'off'); // Отключаем автозаполнение
      });
    };
  }

  function togglePlay() {
    const video = document.getElementById("video");
    const wrapper = document.querySelector(".video-wrapp");
  
    if (video.paused) {
      video.play();
      wrapper.classList.add("video-playing");
    } else {
      video.pause();
      wrapper.classList.remove("video-playing");
    }
  }

  if(document.querySelector('#togglePlay')){
    const togglePlayButton = document.getElementById('togglePlay');
    if (togglePlayButton) {
      togglePlayButton.onclick = togglePlay;
    }

    document.addEventListener("keydown", function(event) {
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }
    });
  }

  if(document.querySelector('.settings-profile__form')){
    const form = document.querySelector('.settings-profile__form');
    window.addEventListener('load', () => {
      setTimeout(() => {
        form.querySelectorAll('input').forEach(input => input.value = '');
      }, 0);
    });
  }

  catalogSecondaryTabs()
});
