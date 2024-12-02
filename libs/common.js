$(document).ready(function () {

	let topBannerTextSlider = new Swiper(".top-banner__text-slider", {
		slidesPerView: 1,
		autoHeight: true,
		autoplay: {
			delay: 5000,
		},
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	let topBannerImgSlider = new Swiper(".top-banner__img-slider", {
		slidesPerView: 1,
		autoplay: {
			delay: 5000,
		},
		loop: true,
	});

	topBannerTextSlider.controller.control = topBannerImgSlider;
	topBannerImgSlider.controller.control = topBannerTextSlider;

	let showcasePlatesSlider = new Swiper(".showcase-plates__slider", {
		slidesPerView: 1.2,
		spaceBetween: 0,
		loop: true,
		breakpoints: {
			450: {
				slidesPerView: 2,
				spaceBetween: 0,
			},
      767: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    },
	});

	let productsPlatesSlider = new Swiper(".products-plates__slider", {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		breakpoints: {
			450: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			767: {
        slidesPerView: 2.7,
        spaceBetween: 20,
      },
      1420: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	let postersPlatesSlider = new Swiper(".posters-plates__slider", {
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		breakpoints: {
			450: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			767: {
        slidesPerView: 2.7,
        spaceBetween: 20,
      },
      1420: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	let bannerGallerySlider = new Swiper(".banner-gallery__slider", {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	Fancybox.bind("[data-fancybox]", {
		placeFocusBack: false,
	});

	new AirDatepicker('.blog-main__date-select-range', {
		range: true,
		position: 'bottom right',
		multipleDatesSeparator: ' - ',
		onSelect() {
				if (!$('.blog-main__date-select-range').hasClass('picked')) {
					$('.blog-main__date-select-range').addClass("picked");
				}
				var blogDateRangeValue = $('.blog-main__date-select-range').val();
				$('.blog-main__date-select-current').val(blogDateRangeValue);
				$('.blog-main__date-select-bttn span').text(blogDateRangeValue);
		}
	});

	$('.product-card__tabs-nav a').on('click', function (e) {
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			var productCardTabID =  $(this).attr('href');
			$('.product-card__tabs-nav a').stop().removeClass('active');
			$('.product-card__tabs-content-section').stop().removeClass('active');
			$(this).stop().addClass('active');
			$('.product-card__tabs-content-section' + productCardTabID).stop().addClass('active');
		}
	});

	$('.dflt-content-drop__top').on('click', function (e) {
		e.preventDefault();
		if (!$(this).parent().hasClass('active')) {
			$(this).parent().stop().addClass('active');
		} else {
			$(this).parent().stop().removeClass('active');
		}
	});

	$('.header__catalog-bttn').on('click', function (e) {
		e.preventDefault();
		const body = document.querySelector('body');
		if (!$(this).hasClass('active')) {
			$(this).parent().stop().addClass('active');
			$(this).stop().addClass('active');
			body.classList.add('stop-scroll');
		} else {
			$(this).parent().stop().removeClass('active');
			$(this).stop().removeClass('active');
			body.classList.remove('stop-scroll');
		}
	});


	$('.dflt-number-input').each(function() {

		var spinner = $(this),
			input = spinner.find('.dflt-number-input__field'),
			btnUp = spinner.find('.dflt-number-input__bttn-up'),
			btnDown = spinner.find('.dflt-number-input__bttn-down'),
			min = input.attr('min'),
			max = input.attr('max');

		btnUp.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

		btnDown.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

	});

	var productCardSliderNav = new Swiper(".product-card__photo-slider-nav-inner", {
		loop: true,
		spaceBetween: 8,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
		breakpoints: {
			450: {
				slidesPerView: 3,
				spaceBetween: 8,
			},
      1030: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
    },
		navigation: {
			nextEl: ".product-card__photo-slider-nav-next",
			prevEl: ".product-card__photo-slider-nav-prev",
		},
	});

	var productCardSliderMain = new Swiper(".product-card__photo-slider-main", {
		loop: true,
		spaceBetween: 16,
		slidesPerView: 2,
		thumbs: {
			swiper: productCardSliderNav,
		},
	});

	var otherBlogPostSlider = new Swiper(".blog-post__other-posts-slider", {
		breakpoints: {
			100: {
				slidesPerView: 1.1,
			},
			450: {
				slidesPerView: 2,
			},
			600: {
				slidesPerView: 3,
				spaceBetween: 24,
				enabled: true,
			},
      1200: {
				slidesPerView: 1,
				spaceBetween: 0,
				enabled: false,
      },
    },
	});

	if (!$('.dflt-choices select').length == 0) {
		var dfltChoicesSelect = new Choices('.dflt-choices select', {
			itemSelectText: '',
			searchEnabled: false,
		});
	}

	$('.header__search-bttn').on('click', function () {
		if (!$(this).parent().hasClass('active')) {
			$(this).parent().stop().addClass('active');
			$(this).stop().addClass('active');
		} else {
			$(this).parent().stop().removeClass('active');
			$(this).stop().removeClass('active');
		}
	});

	/*$('.header__search-form > input').on('focus', function () {
		if (!$(this).parent().hasClass('active')) {
			$(this).parent().stop().addClass('active');
		}
	}).on('blur', function () {
		if ($(this).parent().hasClass('active')) {
			$(this).parent().removeClass('active');
		}
	});

	$('.header__search-form > button').on('click', function (e) {
		e.preventDefault();
		$(this).siblings('input').val('').trigger('focus');
	});*/

	$('.header__search-form > input').on('focus', function () {
    if (!$(this).parent().hasClass('active')) {
        $(this).parent().stop().addClass('active');
    }
    if ($(this).val().length > 0) {
        $(this).siblings('button').addClass('active');
    }
	}).on('input', function () {
			if ($(this).val().length > 0) {
					$(this).siblings('button').addClass('active');
			} else {
					$(this).siblings('button').removeClass('active');
			}
	}).on('blur', function () {
			if ($(this).parent().hasClass('active')) {
					$(this).parent().removeClass('active');
			}
	});

	$('.header__search-form > button').on('click', function (e) {
			e.preventDefault();
			$(this).siblings('input').val('').trigger('focus');
			$(this).removeClass('active');
	});

	/*$('.catalog-main-menu__list a').on('click', function (e) {
		e.preventDefault();
		if (!$(this).parent().hasClass('active')) {
			var catalogMainTabID =  $(this).attr('href');
			$('.catalog-main-menu__list a').parent().stop().removeClass('active');
			$('.catalog-main-menu__point-tab').stop().removeClass('active');
			$(this).parent().stop().addClass('active');
			$('.catalog-main-menu__point-tab' + catalogMainTabID).stop().addClass('active');
		}
	});

	$('.catalog-secondary-tabs__nav a').on('click', function (e) {
		e.preventDefault();
		if (!$(this).parent().hasClass('active')) {
			var catalogSecondaryTabID =  $(this).attr('href');
			$('.catalog-secondary-tabs__nav a').parent().stop().removeClass('active');
			$('.catalog-secondary-tabs__section').stop().removeClass('active');
			$(this).parent().stop().addClass('active');
			$('.catalog-secondary-tabs__section' + catalogSecondaryTabID).stop().addClass('active');
		}
	});*/


	$('.blog-main__date-select-bttn').on('click', function (e) {
		e.preventDefault();
		if (!$(this).parent().hasClass('active')) {
			$(this).parent().stop().addClass('active');
		}
	});

	$('.blog-main__date-select-all').on('click', function (e) {
		e.preventDefault();
		var blogDateBttnText = $(this).text();
		$('.blog-main__date-select-current').val('all_time');
		$('.blog-main__date-select-bttn span').text(blogDateBttnText);
	});

	$('.blog-main__date-select-range').on('click', function () {
		if (!$(this).val() == "") {
			$('.blog-main__date-select-current').val($(this).val());
			$('.blog-main__date-select-bttn span').text($(this).val());
		}
	});

	$(document).mouseup(function(e) {
		
		var clickOutsideHidding = $(".header__catalog-bttn, .header__catalog-dropdown, .header__catalog, .blog-main__date-select, .air-datepicker-global-container");

		if (!clickOutsideHidding.is(e.target) && clickOutsideHidding.has(e.target).length === 0) {
			clickOutsideHidding.removeClass('active');
			$('body').removeClass('stop-scroll');
		}
	});

});