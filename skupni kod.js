//logoTransformOnScroll();
//rotateWireframe();
parallaxPanel();
//buttonHover();
//popupWizdome();
//homeProductHover();
//underline();
//akapowPinned();
//productsTabs(); 
//headerHide();
//scrollToTop();



OLD class
resetLogo();
bigLogo();
//fullscreenMenu();
//fullscreen3D();
//productsoloAccordion();
//projectMainSwiper();
fadeInOnEnter();


killScrollTriggers(); ???

initVideo(); NERADI



ovi su globalni

fullscreenMenu();
scrollToTop();
headerHide();
underline();
popupWizdome();
buttonHover();
logoTransformOnScroll()


gsap.utils.toArray(".img__background").forEach(layer => {
    gsap.from(layer, {
     yPercent: -80,
    ease: "none",
  }).to(layer, {
    yPercent: 80,
    ease: "none",
  
      scrollTrigger: {
        trigger: layer,
        //markers:true,
             trigger: ".img__wrapper",
      scroller: ".scroller",
      scrub: true,
      pin: false,
    },
      })
    });
  });
  