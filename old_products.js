const slider = document.getElementById("js-cta-slider");
const sliderCounter = document.getElementById("js-cta-slider-counter");
const sliderNext = document.getElementById("js-cta-slider-next");
const sliderPrevious = document.getElementById("js-cta-slider-previous");

const interleaveOffset = 0.75;

	

// svaka fotka ima: data-swiper-parallax-y: "35%"

const swiper = new Swiper(slider, {
  autoplay: false,
  parallax: true,
  loop: true,
  effect: "slide",
  direction: "vertical", // put horizontal
  speed: 1000,
  grabCursor: true,
  watchSlidesProgress: true, // turn off for horizontal
  //mousewheelControl: true,
  mousewheelControl: 1,
  mousewheel: true,
  pagination: {
    el: sliderCounter,
    type: "custom",
    renderCustom: function(swiper, current, total) {
      let i = current ? current : 0;
      return `${("0" + i).slice(-2)} / ${("0" + total).slice(-2)}`;
    }
  },
  navigation: {
    nextEl: sliderNext,
    prevEl: sliderPrevious
  },
});