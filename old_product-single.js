


// --- 011 - ACCORDION --------------------------------------------------------------------------	









// -- VIDEK SCROLL LOTTIE

class ScrubControlledAnimation {
  constructor() {
    this.DOM = {
      animationWrapper: ".js-scrub-controlled-animation-wrapper",
      animation: ".js-scrub-controlled-animation",
      states: {}
    };

    this.animationWrapper = document.querySelector(this.DOM.animationWrapper);

    this.animation = document.querySelector(this.DOM.animation);

    this.init();
  }

  init() {
    console.log("ScrubControlledAnimation init()");

    if (this.animation) {
      this.scrubAnimation();
    }
  }

  scrubAnimation() {
    const scrubAnimationOptions = {
      container: this.animation,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: this.animation.getAttribute("data-animation-source")
    };

    /**
     *
     */
    let scrubAnimation = lottie.loadAnimation(scrubAnimationOptions);

    scrubAnimation.addEventListener("DOMLoaded", () => {
      this.loadAnimation(scrubAnimation);
    });
  }

  loadAnimation(animation) {
    const scrubAnimationTimeline = gsap.timeline({}).to(
      { frame: 0 },
      {
        duration: 1,
        frame: animation.totalFrames - 1,
        onUpdate: function () {
          animation.goToAndStop(Math.round(this.targets()[0].frame), true);
        }
      },
      "start"
    );

    ScrollTrigger.create({
      trigger: this.animationWrapper,
      animation: scrubAnimationTimeline,
       scroller: ".smooth-scroll",
      // markers: true,
      pin:"#kingpin",
      start: "top 20%",
      end: "bottom top",
      scrub: 0.4
    });
  }
}

new ScrubControlledAnimation();








// --- LOGO ANIMACIJA 

gsap.timeline({
  scrollTrigger: {
     scroller: ".smooth-scroll",
			trigger: "#logotrigger",
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: "+=10000000", // end after scrolling 500px beyond the start
			toggleActions: 'play reverse play reverse',
      invalidateOnRefresh: true,

  }
})
.to(".red-flag",  {width:'4em', height:'4em', top: '-1.25em', duration: 0.5, ease: "expo.inOut", })
.to(".znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, "<")


// -- ELIPSE PIN
ScrollTrigger.create({
scroller: ".smooth-scroll",
  trigger: "#elipsepin",
  start: "top 30%", 
//  end: "bottom 30%",
 end: "+=90%",
  pin: ".elipse",
   invalidateOnRefresh: true,
});

/*
gsap.timeline({
  scrollTrigger: {
     scroller: ".smooth-scroll",
			trigger: "#elipsepin",
       start: "top 30%", 
      end: "+=90%",
      pin: ".elipse-wrapper",
			toggleActions: 'play reverse play reverse',
      invalidateOnRefresh: true,

  }
})
*/
//.to(".elipse",  {autoAlpha:0, duration: 0.5, ease: "expo.inOut", })
//.to(".znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, "<")








/*

// LOTTIE SCROLL FOR ROTATION
ScrollLottie({
 target: '#lottiewindow',
 scroller: ".smooth-scroll",
 path: 'https://uploads-ssl.webflow.com/5ecf72e4a8033653b5813402/5f26c88bac3de0b645af52b8_apple.json', 
 duration: 8, 
 speed: 'medium'
})

*/

// --- 

