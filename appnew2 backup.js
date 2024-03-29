// v.2022 


gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(Observer);

let locoScroll;

/*TURN OFF GSAP MESSAGES*/
//gsap.config({ nullTargetWarn: false });

/*
================================================================================
PRELOADER
================================================================================
*/

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loader');
const loaderInner = select('.inner-loader');
const progressBar = select('.progress');
const loaderMask = select('.loader__mask');

/*
================================================================================
IMAGES LOADED 
================================================================================
*/

function init() {

  // show loader on page load
  gsap.set(loader, {autoAlpha: 1});

  // scale loader down
  gsap.set(loaderInner, {scaleY: 0.015, transformOrigin: 'bottom'});

  // make a tween that scales the loader
  const progressTween = gsap.to(progressBar, {paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right'});

  // setup variables
  let loadedImageCount = 0,
    imageCount;
  const container = select('#main');

  // setup Images loaded
  const imgLoad = imagesLoaded(container);
  imageCount = imgLoad.images.length;

  // set the initial progress to 0
  updateProgress(0);

  // triggered after each item is loaded
  imgLoad.on('progress', function () {
    // increase the number of loaded images
    loadedImageCount++;
    // update progress
    updateProgress(loadedImageCount);
  });

  // update the progress of our progressBar tween
  function updateProgress(value) {
    // console.log(value/imageCount)
    // tween progress bar tween to the right value
    gsap.to(progressTween, {
      progress: value / imageCount,
      duration: 0.3,
      ease: 'power1.out'
    })
  }

  // do whatever you want when all images are loaded
  imgLoad.on('done', function (instance) {
    // we will simply init our loader animation onComplete
    gsap.set(progressBar, {
      autoAlpha: 0,
      onComplete: initPageTransitions
    });
  });

}

init();

/*
================================================================================
MAIN JS + LOCOMOTIVE SCROLL + SCROLL TRIGGER PROXY
================================================================================
*/
function initScroll(container) {

   locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
     offset: [0, 0], 
    /* getDirection: true, */
    scrollFromAnywhere: true,
    touchMultiplier: 3.0,
    useKeyboard: true,
   // scrollbarContainer: document.querySelector('#primary'),
   inertia: .75,  
   smartphone: {
     smooth: false,
   },
   tablet: {
     smooth: false,
   } 
  });


// ovo je ubačeno naknadno
/*   locoScroll.on("scroll", function (t) {
    document.documentElement.setAttribute("data-direction", t.direction);
  }); */


  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },

    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
    // we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    // UKLJUČITI SAMO NA MOBILNOJ VERZIJI
     pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });

/* ===== 
// Remove Old Locomotive Scrollbar.
const scrollbar = document.querySelectorAll( '.c-scrollbar' );
    
if ( scrollbar.length > 1 ) {
    scrollbar[0].remove();
}
/* ===== */



/*
================================================================================
ON WINDOW RESIZE
================================================================================
*/

window.addEventListener('resize', function(){
  setTimeout(()=>{
  locoScroll.update();
  ScrollTrigger.refresh();
},200) 
 console.log("RESIZE & REFRESH LOCO&SCROLLTRIGGER");
});




/*
================================================================================
SCROLLTRIGGER DEFAULTS
================================================================================
*/
ScrollTrigger.defaults( {
  scroller: ".smooth-scroll",
});




/*
================================================================================
ALL - FADE IN ON ENTER
================================================================================
*/
  gsap.utils.toArray('.block1').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
       // markers: true,
        /* scroller: ".smooth-scroll", */
        start: 'top bottom',
        toggleActions: 'play reverse play reverse',
        end: "top top",
      },
      y: 100,
      opacity: 0
    })
  });
  console.log("Scrolltrigger animacija loaded");

/*
================================================================================
HOME - LOGO ANIMACIJA
================================================================================
*/

  gsap.timeline({
    scrollTrigger: {
       /* scroller: ".smooth-scroll", */
        trigger: "#start",
        /* markers: true, */
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "+=10000000", // end after scrolling 500px beyond the start
        toggleActions: 'play reverse play reverse',
        invalidateOnRefresh: true,
  
    }
  })

  .to(".header_redflag",  {width:'4rem', height:'4rem', top: '-1.25rem', duration: 0.7, ease: "expo.inOut", }, 0)
  .to("#di", {morphSVG: {shape: "#sq"}, duration: 0.7, ease: "expo.inOut"}, 0)
  .to(".header-znak", { scale: 0.6, duration: 0.7, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, 0)
/*   .to("#ticker",  {autoAlpha:0, duration: 0.1}); */


/*
================================================================================
HOME - KUPOLA DRAWSVG
================================================================================
*/

gsap.timeline({
  scrollTrigger: {
     /* scroller: ".smooth-scroll", */
     trigger: "#kingdomeare",
      /* markers: true, */
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: "bottom 0%", // end after scrolling 500px beyond the start
     /*  scrub: true, */
      /* pin:true, */
      toggleActions: 'play reverse play reverse',
      // invalidateOnRefresh: true,
  }
})

.set("#podloga", {opacity:0})

.from("#plane path", {
	drawSVG:0, delay:1, repeat: -1, yoyo: true, duration:1, ease:"power1.in", stagger:0.1})
.to("#podloga", {
	opacity:1, delay:6})


  /*
================================================================================
HOME - ROTATE WIREFRAME
================================================================================
*/


  var rotate = gsap.timeline({
    scrollTrigger:{
      trigger: "#kupolewrap",
      pin: true,
      scrub:0.2,
      start: 'top 80%',
      end:'+=10000',
      transformOrigin:"center center",
      invalidateOnRefresh:true
    }
  })
  .to('#wireframe', {
    rotation:360*5,
    duration:1, ease:'none',
    
  })
  
 



/*
================================================================================
HOME - BIG KINGDOME SPLITTXT
================================================================================
*/

/* const title = document.querySelector(".splitone"),
      splittitle = new SplitText(".splitone");

ScrollTrigger.create({
  trigger: title,
  start: "top 75%",
  end: "bottom top",
  // scroller: ".smooth-scroll", 
  // markers: true, 
  onEnter: () => action.duration(2).play(),
  onLeave: () => action.pause(0),
  onEnterBack: () => action.duration(2).play(0),
  onLeaveBack: () => action.pause(0), 
  toggleActions: "restart pause restart none",
});
                        
  
var action = gsap.timeline({paused:true})
.from(splittitle.chars, {y: 220, stagger:0.01, ease: "expo.inOut"});

 */
/*
================================================================================
HOME - PARALLAX PANEL - BIG FONT KINGDOME
================================================================================
*/

/* var inparallax = gsap.timeline({
  scrollTrigger: {
    trigger: ".img__wrapper",
    scroller: ".smooth-scroll",
    scrub: true,
    pin: false,
  },
}); 
inparallax.from(".img__background", {
  yPercent: -80,
  ease: "none",
}).to(".img__background", {
  yPercent: 80,
  ease: "none",
}); 
 */

/*
================================================================================
HOME - PARALLAX PANEL SOLO FOR EACH
================================================================================
*/








/* NEW*/
/*
const projectTriggers = document.querySelectorAll(".section-full-image");

projectTriggers.forEach(addTimeline);

function addTimeline(project, index) {
  const image = project.querySelector(".img__background");
  
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".img__wrapper",
      scroller: ".smooth-scroll",
      scrub: true,
      pin: false,
    }
  })
  .from(image, {
    yPercent: -80,
  ease: "none",
  })
  .to(image, {
    yPercent: 80,
  ease: "none",
  });
  
}
*/

const sectionsold = gsap.utils.toArray(".section-full-image");

sectionsold.forEach((section) => {
  
  let image = section.querySelector(".img__background");
//gsap.set(image, {yPercent: -80})


  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".img__wrapper",
    //  start: 'top 90%',
    //  end: "top top",
      scroller: ".smooth-scroll",
   //  markers: true,
      scrub: true,
      pin: false
    }
  });

  tl.from(image, {
    yPercent: -80,
  //  rotate:34,
    ease: "none",
  });
  tl.to(image, {
    yPercent: 80,
  ease: "none",
  });
});


/*
================================================================================
ALL - BOTTON HOVER
================================================================================
*/

gsap.set(".bar", {xPercent: -100, transformOrigin:"left center"})
gsap.set(".button-arrow", {x:'-5%'})
const btns = gsap.utils.toArray(".btn")

btns.forEach((btn) =>{
  let tl = gsap.timeline({paused:true, defaults:{duration:0.5, ease:"expo.out"}})
  let bar = btn.querySelector(".bar")
  let arrow = btn.querySelector(".button-arrow")
  let exitTime = 0
  tl.to(bar, {xPercent:0})
  tl.to(arrow, {x:'0.5rem'},"<")
    .addPause("exit")
  exitTime = tl.duration()
  tl.to(bar, {xPercent:100})
  tl.to(arrow, {x:'0rem'},"<")

   btn.addEventListener("mouseenter", () => {
    if(tl.time() < exitTime){
      tl.play()
    } else {
      tl.restart()
    }
  })

  btn.addEventListener("mouseleave", () => {
    if(tl.time() < exitTime){
      tl.reverse()
    } else {
      tl.play()
    }
  })
})

/*
================================================================================
POPUP - WIZDOME
================================================================================
*/

gsap.from(".actual-message", 0.4, {
  marginTop: "10%",
  autoAlpha: 0,
  ease: Back.easeOut,
  delay: 1.5
});
gsap.to(".popup", 0.4, {
  autoAlpha: 1,
  delay: 10
});

$(".popup-close, .popup").click(function() {
  gsap.to(".actual-message", 0.2, {
    marginTop: "10%",
    autoAlpha: 0,
    ease: "ease-in"
  });

  gsap.to(".popup", 0.2, { 
    autoAlpha: 0
  });
}); 


/*
================================================================================
HOME - PRODUCT HOVER 
================================================================================
*/
/* function homeProductHover() { */


/*   gsap.set(".rg__long", {autoAlpha:0, yPercent:-10}); */
  
  
  gsap.utils.toArray(".products-item").forEach(container => {
   
    let   dome = container.querySelector(".fake-king"),
    // wrap = container.querySelector(".rg__wrap"),
        name = container.querySelector(".product-title"),
        //short = container.querySelector(".rg__short"),
        long = container.querySelector(".rg__long"),
        white = container.querySelector(".whiteback"),
  
        tl = gsap.timeline({ defaults: { ease: "expo.inOut", duration: 0.5}, 
        paused: true });
    
    
    tl.to(dome, { yPercent: 100, autoAlpha:0 })
    
  // .to(wrap, { backgroundColor:"#B6FA00" }, 0)
      //.to(wrap, { backgroundColor:"rgba(40, 40, 42, 0.14)" }, 0)
      .to(name, { yPercent:-10, autoAlpha:0 }, 0)
     // .to(short, { yPercent:-8, autoAlpha:0 }, 0)
      .to(long, {autoAlpha:1, yPercent:10}, 0)
      .to(white, {yPercent:-45}, 0);
      
       
    container.addEventListener("mouseenter", () => tl.play() );
    container.addEventListener("mouseleave", () => tl.reverse() );
  });

 
  
/*   } */


/*
================================================================================
ALL - UNDERLINE GSAP
================================================================================
*/

// Mouseenter function
function enterAnimation(link, e, index) {
  link.tl.tweenFromTo(0, "midway");
}
// Mouseleave function
function leaveAnimation(link, e) {
  link.tl.play();
}
// Animations variables
let workLinkUnderlineAnimEnter;
let workLinkUnderlineAnimLeave;

// Get all links
let workLinks = document.querySelectorAll(".link-inline");

workLinks.forEach((link, index, value) => {
  
  let underline = link.querySelector(".underline");
  link.tl = gsap.timeline({paused: true});
  
  link.tl.fromTo(underline, {width: "0%", left: "0%",}, 
  {width: "100%", duration: 0.3, ease: "power1.out",});
  		
  link.tl.add("midway");
  
  link.tl.fromTo(underline, {width: "100%", left: "0%",}, 
  {width: "0%", left: "100%", duration: 0.3, ease: "power1.in", immediateRender: false});

  // Mouseenter
  link.addEventListener("mouseenter", (e) => {
    enterAnimation(link, e, index);
  });

  // Mouseleave
  link.addEventListener("mouseleave", (e) => {
    leaveAnimation(link, e);
  });

});

/* AKAPOWL PINNED HOME*/

gsap.set(".panel3", { zIndex: (i, target, targets) => targets.length - i });

var imagesxx = gsap.utils.toArray('.panel3:not(.purple)');

imagesxx.forEach((image, i) => {
   
   var tl = gsap.timeline({
     
     scrollTrigger: {
			trigger: ".black",
      scroller: ".smooth-scroll",
       
       start: () => "top -" + (window.innerHeight * (i)),
       
       end: () => "+=" + window.innerHeight,
       scrub: true,
       toggleActions: "play none reverse none",
       invalidateOnRefresh: true,     
     }
     
   })
   
   tl
   .fromTo(image, { height: () => { return "100%" } }, { height: () => { return "0%" }, ease: "none" })
   ;
   
});
 

ScrollTrigger.create({

			trigger: ".black",
      scroller: ".smooth-scroll",
    markers: false,
  
    /*---*/
    pin: ".picturewrap",
  
    start: () => "top top",
    end: () => "+=" + ((imagesxx.length) * window.innerHeight),
    invalidateOnRefresh: true,
   
});

console.log("Hello world!");


/* HEADER HIDE*/

const showAnim = gsap.from('.header', { 
  yPercent: -300,
  paused: true,
  duration: 0.2
}).progress(1);

ScrollTrigger.create({
  trigger: ".section-home-kingdome-are",
  scroller: ".smooth-scroll",
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
  }
});



/* PHOTOSWIPE + SWIPER + ZOOM */

/**
 * Photoswipe 4
 * easier & modern implementation with constructor & es6
 * Note: History, PID & Hash URL are not implemented in this demo
 * @author Sylvain Proov
 */

 class PhotoSwipeGallery {

  constructor(el, options) {
    this.el = el
    this.extraOptions = options
    this.items = this.el.querySelectorAll('figure')
    this.slides = []
    this.parseItems()
    this.attachEvents()
    this.options = {
      // Core Default Options
      history: false,
      preload: [1, 1],
      getThumbBoundsFn: (index) => {
        const thumb = this.items[index].querySelector('img')
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        const  rect = thumb.getBoundingClientRect()
        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
      }
    }
  }
  
  parseItems () {
    for (const [index, item] of this.items.entries()) {
      const size = item.querySelector('a').getAttribute('data-size').split('x')
      
      this.slides[index] = {
        src: item.querySelector('a').getAttribute('href'),
        msrc: item.querySelector('img').getAttribute('src'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      }
      if (item.querySelector('figcaption')) {
        this.slides[index].title = item.querySelector('figcaption').innerHTML
      }
    }
  }
  
  openPhotoSwipe (index) {
    this.options.index = index
    if (this.extraOptions !== undefined) {
       Object.assign(this.options, this.extraOptions)
    }
    const pswp = document.querySelector('.pswp')
    const gallery = new PhotoSwipe( pswp, PhotoSwipeUI_Default, this.slides, this.options)
    gallery.init()
  }

  attachEvents () {
    for (const [i, item] of this.items.entries()) {
      item.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault()
        this.openPhotoSwipe(i)
      })
    }
  }
}

// Custom Options
// see https://photoswipe.com/documentation/options.html
const gallery2 = document.querySelector('.js-photoswipe-2')
const PhotoSwipeGallery2 = new PhotoSwipeGallery(gallery2, {
  fullscreenEl: false,
  shareEl: false,
  zoomEl: false,
  tapToToggleControls: false
})


/**
 * Swiper Freemode
 */
const swiperFreemode = document.querySelectorAll('.js-swiper-freemode')

if (swiperFreemode.length) {
  for (const swiper of swiperFreemode) {

    // Swiper instance
    const swiperFreeModeInstance = new Swiper(swiper, {
      slidesPerView: '1.2',
      grabCursor: true,
     // freeMode: true,
      spaceBetween: 20,
      speed: 700,
       navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      init: false
    })

    // Init only if there is 3 or more slides
    const nbSlides = swiper.querySelectorAll('.swiper-slide')

    if (nbSlides.length > 2) {
      swiperFreeModeInstance.init()
    }
  }
}

/**/ 

/* CUBERTO MOUSE FOLLOWER */

const cursor = new MouseFollower({
  el: ".cursor",
  container: document.body,
  className: "mf-cursor",
  innerClassName: "mf-cursor-inner",
  textClassName: "mf-cursor-text",
  mediaClassName: "mf-cursor-media",
  mediaBoxClassName: "mf-cursor-media-box",
  iconSvgClassName: "mf-svgsprite",
  iconSvgStatePrefix: "-",
  iconSvgSrc: "",
  dataAttr: "cursor",
  hiddenState: "-hidden",
  textState: "-text",
  iconState: "-icon",
  activeState: "-active",
  mediaState: "-media",
  stateDetection: {
      "-pointer": "a,button",
      "-hidden": "iframe"
  },
  speed: 0.55,
  ease: "expo.out",
  overwrite: true,
  skewing: 0,
  skewingText: 2,
  skewingIcon: 2,
  skewingMedia: 2,
  skewingDelta: 0.001,
  skewingDeltaMax: 0.15,
  stickDelta: 0.15,
  showTimeout: 20,
  showOnEnter: true,
  hideOnLeave: true,
  hideTimeout: 300,
  hideMediaTimeout: 300,
  initialPos: [-window.innerWidth, -window.innerHeight],
});




/*
================================================================================
LOCOMOTIVE SCROLL REFRESH AFTER ALL / ne briši
================================================================================
*/
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
  console.log("Scrolltrigger refreshed after all!");


/*   document.addEventListener('load', function(){
    locoScroll.update();
}); */

/*
================================================================================
LOCOMOTIVE SCROLL UPDATED AFTER IMAGESLOADED
================================================================================
*/

imagesLoaded("#main", { background: true }, function () {
  locoScroll.update();
  console.log("IMAGES LOADED - LOCOSCROLL UPDATED");
  });



  /*
================================================================================
LOCOMOTIVE 4 SCROLL TO TOP
================================================================================
*/
$( "#tostart" ).on( "click", function() {
  locoScroll.scrollTo( '#start', {
    'offset': 0,
    'duration': 1500,
    'easing': [0.25, 0.00, 0.35, 1.00],
    'disableLerp': true
  });
  
  console.log("SCROLLTOTOP");
});

  
}

/*
================================================================================
PRELOADER --> vodi na --> INIT CONTENT
================================================================================
*/
function initLoader() {

  const tlLoaderIn = gsap.timeline({
    id: 'tlLoaderIn',
    defaults: {duration: 1.1, ease: 'power2.out'},
    onComplete: () => initContent()
  });

  const image = select('.loader-img-img');
  const mask = select('.loader__image--mask');
  const lines = selectAll('.loader__title--mask');
  const loaderContent = select('.loader__content');

  const fadeintxt = select('.home-hero-heading-wrapper');
  const txtdonji = select('.txtdonji');
  const video = select('.aspect-video');

 


 /*  const loader = select('.loader'); */
  const loaderInner = select('.inner-loader');

  const titles = document.querySelectorAll('[data-split-this-container] > div');
  let targets = [];

  titles.forEach(title => {
    if (title.classList.contains("txtgornji")) {
      targets.push(title);
    } else {
      targets.push(new SplitText(title, {type: "words"}).words);
    }
  });

  tlLoaderIn

    .set(loaderContent, {autoAlpha: 1})
    .set(".txt", {yPercent: 100})
    .set(mask, {yPercent: 0})
    .set(image, {yPercent: 100})
    .set(".homeani1", {autoAlpha:0})
    .set(".aspect-video", {scale:2})
    /* .set(fadeintxt, {autoAlpha: 0}) */
    
    //.set(".main", {y: 150})

    /* .to(loaderInner, {scaleY: 1, transformOrigin: 'bottom', ease: 'power1.inOut'}) */
    /* .to(fadeintxt, {autoAlpha: 1, ease: 'power1.inOut'}) */
   .from(targets, {opacity:0, yPercent: 100, ease: "expo.inOut", stagger: 0.15})
   .from(txtdonji, {opacity:0, yPercent: 100, ease: "expo.inOut"}, "+=0.2")
  

  

    .addLabel('revealImage')
    /* .to(image, {yPercent: 0}, 'revealImage-=0.5') */
    /* .to(".txt", {yPercent: 0, stagger: 0.2}, 'revealImage-=0.4'); */



  




  // LOADER OUT
  const tlLoaderOut = gsap.timeline({
    id: 'tlLoaderOut',
    defaults: {duration: 1.2, ease: 'power2.inOut'}, delay: 0});

  tlLoaderOut

   /*  .to(lines, {yPercent: -500, stagger: 0.2}, 0) */
    .to([loader, loaderContent], {yPercent: -100}, 0)
    .to(fadeintxt, {autoAlpha: 0, ease: 'power1.inOut'}, 0)
    .to(".aspect-video", { scale:1, duration: 1.5, ease:'expo.inOut'}, "+=0.2")
    .to(".homeani1", {autoAlpha:1, stagger: 0.12, ease: "expo.inOut"}, "<")
    .from(".header_redflag", { yPercent:-100, duration: 1, ease:'expo.inOut'}, "<0.25")
    .to(".fake-video", { yPercent:-1000, duration: 0.2}, "<0.25")
    
    //.to('.main', {y: 0}, 0);

  const tlLoader = gsap.timeline();
  tlLoader
    .add(tlLoaderIn)
    .add(tlLoaderOut);
}

/*
================================================================================
INIT CONTENT --> vodi na --> INIT SCROLL
================================================================================
*/
function initContent() {

  select('body').classList.remove('is-loading');
  initScroll();
console.log("Locoscroll+Scrolltrigger loaded after preloader done");

  //initNavigation();
  //initHeaderTilt();

}

/* 
  ScrollTrigger.refresh(true); // ScrollTrigger Refresh
  console.log("scrolltrigger refreshed AFTER all script load"); */
   /* $(document).ready(function() {  */
  setTimeout(() => {
    ScrollTrigger.refresh(true);
    console.log("Locoscrollupdated + SCROLLTRIGGER NAKON 10000 SEKUNDI");
  }, 1000);
/* }); */ 
/*
================================================================================
BARBA PAGE TRANSITION IN
================================================================================
*/
function pageTransitionIn({
  container
}) {
 // console.log('pageTransitionIn');
  // timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power1.inOut'} });
  tl
    .set(loaderInner, {autoAlpha: 0})
    .fromTo(loader, {yPercent: -100}, {yPercent: 0})
    .fromTo(loaderMask, {yPercent: 80}, {yPercent: 0}, 0)
    //.to(container, {y: 150}, 0);

  return tl;
}

/*
================================================================================
BARBA PAGE TRANSITION OUT
================================================================================
*/
function pageTransitionOut({
  container
}) {
  //console.log('pageTransitionOut');
  // timeline to move loader away down
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power1.inOut'},
  // OVDJE SE INICIRA PONOVO SAV JS CONTENT / AKO ZATREBA
    onComplete: () => initContent()
  });
  tl
    .to(loader, {yPercent: 100})
    .to(loaderMask, {yPercent: -80}, 0)
    //.from(container, {y: -150}, 0);
  return tl;
}


/*
================================================================================
BARBA GLOBAL HOOKS + PREFETCH + INIT + VIEWS + TRANSITIONS
================================================================================
*/
function initPageTransitions() {
   // do something before the transition starts
   barba.hooks.once(() => {
   // initLoader();
    //logoAnimacija();
    //fullscreenMenu();
    //homeProductHover();
  });

  // do something before the transition starts
  barba.hooks.before(() => {
    select('html').classList.add('is-transitioning');
  });
  // do something after the transition finishes
  barba.hooks.after(() => {
    select('html').classList.remove('is-transitioning');
  });

  /* OVO JE UBAČENO*/
  barba.hooks.after((data) => {
    let js = data.next.container.querySelectorAll('main script');
    if(js != null){
            js.forEach((item) => {
                console.log(js)
                eval(item.innerHTML);
            });
    }
   console.log("SCRIPTS EVALUATED NO PROBLEM");
});


barba.hooks.afterLeave((data) => {
  // Set <body> classes for "next" page
  var nextHtml = data.next.html;
  var response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml)
  var bodyClasses = $(response).filter('notbody').attr('class')
  $("body").attr("class", bodyClasses);
  //  console.log("BODY CLASSES UPDATED");
});




 // scroll to the top of the page
  barba.hooks.enter(() => {
        window.scrollTo(0, 0);
        //strigtest();
   
  });
   //kill scrolltrigger
  barba.hooks.beforeLeave(() => {
    locoScroll.destroy();
    console.log("Locomotive scroll destroyed!");
   /*  killScrollTriggers(); */
   if (ScrollTrigger.getAll().length > 0) {
    ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
       // console.log("scrolltrigger killed...");
    });
}
    console.log("All ScrollTriggers destroyed!");
 
  });
  //init scrolltrigger
   barba.hooks.afterEnter(() => {
    
   // console.log("možda ode učitat locoscroll");
    
  });
 

/*
================================================================================
BARBA PREFETCH
================================================================================
*/

barba.use(barbaPrefetch);
console.log("Prefetch loaded");
/*


================================================================================
BARBA INIT 
================================================================================
*/

barba.init({
  timeout: 7000,
  debug: true,
  prefetch: true,
/*
================================================================================
BARBA VIEWS
================================================================================
*/  
  views: [{
    namespace: 'home',
    beforeEnter(data) {
   
    /*   bigLogo();
      homeProductHover();
      simpleTicker();
      simpleTickerShow(); */
      homeAboutSlider(); 
     // document.getElementById('video').play();
      

    console.log("home JS triggered!");
    }},{
    namespace: 'products',
    beforeEnter(){
      // productsMainSwiper();
       projectMainSwiper();
    //  resetLogo();
    //  simpleTickerHide(); 
    console.log("products JS triggered!");
    }},{
      namespace: 'productsingle',
    beforeEnter(data) {
      //soloProductsLottie(container);
      /* simpleTickerHide();*/
      productsoloAccordion(); 
    console.log("productsingle JS triggered!");
    }},{
    namespace: 'howwework',
    beforeEnter(data) {
      /* simpleTickerHide(); */
    console.log("howwework JS triggered!");
    }},{
    namespace: 'contact',
    beforeEnter(data) {
      //resetLogo();
    //simpleTickerHide();
    console.log("contact JS triggered!");
    }},{
    namespace: 'privacy',
    beforeEnter(data) {
      productsoloAccordion(); 
      /* simpleTickerHide(); */
     // resetLogo();
    //  window.Webflow && window.Webflow.require('ix2').init();  
    //Webflow.require('ix2').init();
    //console.log("Webflow reinit ulalalalalala");
     // contactForm();
    console.log("privacy JS triggered!");
      
    }},{
      namespace: 'faq',
      beforeEnter(data) {
        productsoloAccordion(); 
        /* simpleTickerHide(); */
       // resetLogo();
      //  window.Webflow && window.Webflow.require('ix2').init();  
      //Webflow.require('ix2').init();
      //console.log("Webflow reinit ulalalalalala");
       // contactForm();
      console.log("faq JS triggered!");
        
      }

}],
/*
================================================================================
BARBA TRANSITIONS
================================================================================
*/  
   transitions: [
         {
    // ROUTE AKO IDE NA ABOUT IDE DRUGA ANIMACIJA
    

    once({next}) {
       // do something once on the initial page load
       initLoader();
      /*  homeProductHover(); */
       //homeYoutube();
       //logoAnimacija();
       fullscreenMenu();
       //homeanimations();
        console.log("ONCE + logoanimacija1");
     },

     async leave({current}) {
       // animate loading screen in
       await pageTransitionIn(current);
       console.log("LEAVE");
       
     },
     enter({next}) {
       // animate loading screen away
       pageTransitionOut(next);
         console.log("NEXT");
     },
     
     afterEnter({next}) {
      //killandinitWebflow ();
     
      //animationEnter();
      //logoAnimacija();
      //fullscreenMenu();
      //homeProductHover();
      //homeYoutube();
      productsMainSwiper();
           console.log("AFTER ENTER + logoanimacija2");

     },
     
     beforeEnter({next}) {
      hideMenu();
    //  videoReload();
      //
       /*
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require('ix2').init();   
      */

     
     },
  
   



   }],

 /*
 ================================================================================
 PREVENT / CLICKS DURRING TRANSITION AND CURRENT LINK + SCROLL TO TOP
 ================================================================================
 */
prevent: ({
  event,
  href
}) => {
  if (event.type === 'click') {

    // prevent the user to reload the page if the location is the same
    if (href === window.location.href) {
      event.preventDefault();
      event.stopPropagation();
      // automatically scroll to the top of the page on same location
   //   locoScroll.scrollTo('#top')
      return true;
    }
    if (barba.transitions.isRunning) {
      event.preventDefault();
      event.stopPropagation();

      return true;
    }
  }
}
});


/*
================================================================================
UPDATE ACTIVE CLASS ON THE MENU - BASED ON THE GIVEN URL
================================================================================
*/
/*
function updateMenu(url) {
  const active = document.querySelector('.g-header .nav-link.active');

  if (active !== null) {
    active.classList.remove('active');
  }

  const links = Array.from(document.querySelectorAll('.g-header .nav-link'));

  const index = links.map(link => link.href).findIndex((href) => {
    return url.indexOf(href) !== -1;
  });

  if (index !== -1) {
    links[index].classList.add('active');
  }
}

// hooks that will be triggered before any page transition
// meaning your menu active class will be updated before going to the next page
barba.hooks.before((data) => {
  updateMenu(data.trigger.href);
});
*/
/*
================================================================================
UPDATE ACTIVE CLASS ON THE MENU - BASED ON THE GIVEN URL
================================================================================
*/

function init() {
  initLoader();
}

}




/*
================================================================================
FUNCTION MODULES 
================================================================================
*/


/*
================================================================================
LOGO RESET - to small
================================================================================
*/

function resetLogo() {

  let tlfix = gsap.timeline();

    
/*   tl.to(".red-flag",  {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)", width:'4em', height:'4em', top: '-1.25em', duration: 0.5, ease: "expo.inOut", }, 0)
    .to(".znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, 0) */
      
   

  //  tl.to(".red-flag",  {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 40%, 0% 100%)", width:'4em', height:'4em', top: '-1.25em', duration: 0.5, ease: "expo.inOut", }, 0)
  tlfix.fromTo(".header_redflag", {clipPath:"polygon( 0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)"}, 
  {duration:0.5, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 85% 100%, 0% 100%)"})

 //.to(".red-flag", {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)"})
    .to(".header-znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, 0)

    console.log("logoReseted");

  /*
  gsap.to(".red-flag",  {width:'4em', height:'4em', top: '-1.25em', duration: 0.5, ease: "expo.inOut", })
  gsap.to(".znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, "<")
*/

}

/*
================================================================================
LOGO RESET - to small
================================================================================
*/

function bigLogo() {
  

  let tl = gsap.timeline();

  tl.to(".header_redflag",  {width:'8.5em', height:'12em', top: '-4em', duration: 0.5, ease: "expo.inOut", })
  .fromTo(".header_redflag", {clipPath:"polygon( 0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)"}, 
  {duration:0.5, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)"}, "<")
  .to(".header-znak", { scale: 1, transformOrigin: 'center center', yPercent: 0, ease:'expo.inOut'}, "<")

/* 
 
  gsap.to(".red-flag",  {width:'8.5em', height:'10em', top: '-4em', duration: 0.5, ease: "expo.inOut", })
  gsap.to(".znak", { scale: 1, transformOrigin: 'center center', yPercent: 0, ease:'expo.inOut'}, "<") */

console.log("logoReseted");

}






/****************** OOOLLLLLDDDDD**********************************************************************/



/*
================================================================================
FULLSCREEN MENU
================================================================================
*/
function fullscreenMenu() {
  // OPEN MENU FROM CLICK
const openmenu = document.getElementById('openmenu');
const closemenu = document.getElementById('closemenu');
//const menuhover = document.getElementById('menuhover');


const { gsap } = window;

const btn = document.querySelector(".nav-toggle");

btn.addEventListener("click", () => {
	if (btn.classList.contains("active")) {
		btn.classList.remove("active");
		hide();
	} else {
		btn.classList.add("active");
		show();
	}
});


// --- SHOW
function show() {
	let tl = gsap.timeline();

	gsap.set(".nav-wrapper, .nav-toggle", {pointerEvents: "none"});
  gsap.set(".fs-menu--column", {yPercent:-100})
  gsap.set(".fs-menu-header", {yPercent:-110})
 
  gsap.set(".close, .link-wrapper, .big-body, .fadein", {autoAlpha:0})
 
  //gsap.set(".line-wrapper", {yPercent:100})

 

	tl.fromTo(".nav-wrapper", {height: "0%", transformOrigin: "top center"}, {duration: 0.1, height: "100%"})
    .to(".fs-menu--column", {yPercent:0, duration:0.8, ease: "power2.inOut"}, "<")
    .to(".fs-menu-header", {yPercent:0, duration:0.8, ease: "power2.out"}, "<0.2")
   
    .to(".link-wrapper", {autoAlpha:1, duration:0.5,stagger:0.1,  ease: "power2.inOut"}, "<0.1")
    .to(".fadein", {autoAlpha:1, duration:0.6, ease: "power2.inOut"}, "<0.1")


		.to(".open", {autoAlpha:0}, "<")
		.to(".close", {autoAlpha:1}, "<")
    
		//.to(".line-wrapper", {yPercent:30, stagger:0.1, duration:0.4, ease: "power1.inOut"}, "<0.1")
		.from(".nav-wrap", {yPercent:100, stagger:0.05, opacity:0, duration:0.4, ease: "power1.inOut"}, "<0.1")
		//.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.1")
    
    .set(".nav-wrapper, .nav-toggle", {pointerEvents: "all"}, "<")

}
// --- HIDE
function hide() {
	let tl = gsap.timeline();

	gsap.set(".nav-wrapper, .nav-toggle", {pointerEvents: "none"});

		tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.6, stagger:0.05, ease: "power2.inOut"})
		.to(".nav-wrapper", { duration: 0.1, transformOrigin: "top center", height: "0%"})
		.to(".open", {autoAlpha:1}, "<")
		.to(".close", {autoAlpha:0}, "<")
    .set(" .nav-toggle", { pointerEvents: "all"});
	
}



//-------
// SUBMENU - CHANGE COLOR HOVER / LOOP / ista skripta ko ova poviše ali bez komentara
// loop through each element
$(".nav-wrap").each(function(i, el) {
  var tl = gsap.timeline({paused: true});
  var t = tl
         .to($(el).find('.k-nav'), {color: "#E51E3D", duration: 0.15});
el.animation = t;
$(el).on("mouseenter",function(){
    this.animation.play();
  }).on("mouseleave",function(){
    this.animation.reverse();
  });
});
//-------

/*
	// MENU ICON MOUSEOVER 
menuhover.addEventListener('mouseover', ()=> {  
let menuhovertimeline = gsap.timeline({defaults:{autoAlpha:1}})
//animation.paused( true ); 
menuhovertimeline
.to(".mline2", {width: "100%", duration: 0.1})
.to(".mline3", {width: "100%"}, "<-0.05")
})
// MENU ICON MOUSEOUT 
menuhover.addEventListener('mouseout', ()=> {  
let menuhovertimeline = gsap.timeline({defaults:{autoAlpha:1}})
//animation.paused( true ); 
menuhovertimeline
.to(".mline2", {width: "80%", duration: 0.1})
.to(".mline3", {width: "55%"}, "<-0.05")
})


// EVENT LISTENERS
openmenu.addEventListener("click", function(){ animation.restart(), animation.play(); });
closemenu.addEventListener("click", function(){aniout.restart(), aniout.play(); });
*/


// --- 017 - LOCOMOTIVE 4.0 SCROLL TO  --------------------------------------------------------------------------
$( "#totop" ).on( "click", function() {
	locoScroll.scrollTo( '#start', {
		'offset': 0,
		'duration': 1000,
		//'easing': [0.25, 0.00, 0.35, 1.00],
		'disableLerp': true
	});
	});
}

/*
================================================================================
PRODUCTS - FULLSCREEN SWIPER
================================================================================
*/
function productsMainSwiper() {

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
}

/*
================================================================================
PRODUCTS - SOLO PRODUCT LOTTIE - VIDEK
================================================================================
*/
function soloProductsLottie() {

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
  
/*
================================================================================
PRODUCTS - SOLO PRODUCT LOTTIE ELIPSE PIN
================================================================================
*/
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


}

/*
================================================================================
CONTACT - MULTILEVEL FORMA - NE RADI
================================================================================
*/
function contactForm() {
  var Webflow = Webflow || [];
  Webflow.push(function () {
    new AWF.MSF({hiddeButtonsOnSubmit: true, scrollTopOnStepChange: false, formSelector: '#msf', nextSelector: '#msf-next'});
    
  });


// SWIPER
// HORIZONTAL SWIPER DRAGGABLE

var swipera = new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  direction: 'horizontal',
/* autoplay: {
delay: 1000,
disableOnInteraction: false,
},*/
freeMode: true,
  //resistanceRatio:0.2,
  slidesPerView: 3.2,
 // loopedSlides: 3,

// centeredSlides: 0,
//  longSwipes:true,
//  longSwipesRatio:0.5,
 // touchRatio:5,
loop: true,
grabCursor: true,
  //loopFillGroupWithBlank: false,
 // paginationClickable: true,
  spaceBetween: 30,
 // mousewheelControl: true,
 // parallax: true,
 // preloadImages: true,
  //updateOnImagesReady: true,
 // centeredSlides: true,
 //slidesOffsetBefore: 100,
  //speed: 400,
  breakpoints: {
                  500: {
                      spaceBetween: 30,
                      loopedSlides: 3.2,
                      slidesPerView: 1
                  },
                  1e3: {
                      loopedSlides: 3,
                      spaceBetween: 20,
                      slidesPerView: 3.2
                  },
                  1200: {
                      spaceBetween: 20,
                      slidesPerView: 2.2
                  }
              }

});

$('swiper-slide').on('mousedown touchstart', function(event) {
gsap.to('.swiper-slide', {scale: 0.9, duration: 0.4});

});

$('.swiper-slide').on('mouseup touchend', function(event) {
gsap.to('.swiper-slide', {scale:1, duration: 0.4, delay:0.2});
});

  
}

/*
================================================================================
PRODUCT SOLO - ACCORDION
================================================================================
*/
function productsoloAccordion() {
  
  class Accordion {
    constructor(accordion) {
        this.button = accordion.querySelector(".accordion__button");
        this.content = accordion.querySelector(".accordion__content");
        this.icon = accordion.querySelector(".accordion__icon");
        this.line = this.icon.querySelector(".line--scale");
        this.setInitialState();
        this.animation();
        this.eventListener();
    }

    setInitialState() {
        gsap.set(this.content, { height: "auto" });
    }

    animation() {
      this.animation = gsap
          .timeline({onReverseComplete:function() {
            locoScroll.update();
            console.log("locoscroll updated after REVERSE...");
                     } })
          .to(this.icon, { rotate: "90deg", ease: "power3.inOut" })
          .to(this.line, { scaleY: 0, ease: "power3.inOut" }, 0)
          .from(
              this.content,
              { height: 0, duration: 0.5, ease: "power3.inOut", onComplete:function() {
                locoScroll.update();
                console.log("locoscroll updated after accordion...");
                         } },
              0
          )
          .reverse();
          
  }

    eventListener() {
        this.button.addEventListener("click", () => {
            this.animation.reversed
                ? this.animation.reversed(!this.animation.reversed())
                : this.animation.reverse();
        });
    }
}

const accordions = [...document.querySelectorAll(".accordion")];

accordions.forEach((accordion) => new Accordion(accordion));

  
}



/*
================================================================================
KILL OLD SCROLLTRIGGERS
================================================================================
*/
function killScrollTriggers() {
  
  let triggers = ScrollTrigger.getAll();
  triggers.forEach( trigger => {			
    trigger.kill();
  }); 

  
}
/*
================================================================================
KILL OLD SCROLLTRIGGERS
================================================================================
*/
function killandinitWebflow() {
  
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require( 'ix2' ).init();
  document.dispatchEvent( new Event( 'readystatechange' ) );
  console.log("webflow killed and init");

  
}


/*
================================================================================
INIT VIDEO
================================================================================
*/
function initVideo() {
  
  let video = body.querySelector('.background-video');
// const video = select('.background-video');
  
video.setAttribute('autoplay', true);
video.load();

  console.log("BACKGROOUND VIDEOS RELOADED");

}


/*
================================================================================
t.js SIMPLE TICKER
================================================================================
*/
function simpleTicker() {
  var tickr=[
   
    'HELLO',
    'WE ARE KINGDOME',
    'INNOVATIVE LUXURY CAMPING DOMES',
    ];
    
    $('#ticker').t(
    tickr.join(x='<ins>2</ins><del>*</del>')+x,
    {speed:40,repeat:true,pause_on_click:true}
    );


  console.log("simplde RELOADED");

}


/*
================================================================================
t.js SIMPLE TICKER - HIDE
================================================================================
*/
function simpleTickerHide() {
  gsap.to("#demo_3",  {autoAlpha:0, duration: 0.1});

  console.log("+++++++++++++ticker hiden");

}

/*
================================================================================
t.js SIMPLE TICKER - SHOW
================================================================================
*/
function simpleTickerShow() {
  gsap.to("#demo_3",  {autoAlpha:1, duration: 0.1});

  console.log("+++++++++++++ticker show");

}



/*
================================================================================
HIDE MENU ON CLICK
================================================================================
*/

function hideMenu() {
  
  let tl = gsap.timeline();

	gsap.set(".nav-wrapper, .nav-toggle", {pointerEvents: "none"});

		tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.1, ease: "power2.inOut"})
		.to(".nav-wrapper", { duration: 0.1, transformOrigin: "top center", height: "0%"})
		.to(".open", {duration:0.1, autoAlpha:1}, "<")
		.to(".close", {duration:0.1, autoAlpha:0}, "<")
    .set(" .nav-toggle", { pointerEvents: "all"});
	

console.log("menuHiddeeeeeeeee");

}


/*
================================================================================
HOME - ABOUT AKAPOWL SLIDER
================================================================================
*/
function homeAboutSlider() {
/* AKAPOWL GALLERY*/



}



/*
================================================================================
PROJECT MAIN VERTICAL SWIPER
================================================================================
*/
function projectMainSwiper() {
  /* AKAPOWL GALLERY*/
  
  



var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'vertical',
  loop: true,
  speed: 1200,
  grabCursor: true,
  mousewheel: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    slideChangeTransitionStart: function () {
        // Slide captions
        var swiper = this;
        setTimeout(function () {
          var currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
          var currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
        }, 500);
        gsap.to($(".current-title"), 0.4, {autoAlpha: 0, y: -40, ease: Power1.easeIn});
        gsap.to($(".current-subtitle"), 0.4, {autoAlpha: 0, y: -40, delay: 0.15, ease: Power1.easeIn});
    },
    slideChangeTransitionEnd: function () {
        // Slide captions
        var swiper = this;
        var currentTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
        var currentSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
        $(".slide-captions").html(function() {
          return "<h2 class='current-title'>" + currentTitle + "</h2>" + "<h3 class='current-subtitle'>" + currentSubtitle + "</h3>";
        });
        gsap.from($(".current-title"), 0.4, {autoAlpha: 0, y: 40, ease: Power1.easeOut});
        gsap.from($(".current-subtitle"), 0.4, {autoAlpha: 0, y: 40, delay: 0.15, ease: Power1.easeOut});
    }
  }
});

// Slide captions
var currentTitle = $(mySwiper.slides[mySwiper.activeIndex]).attr("data-title");
var currentSubtitle = $(mySwiper.slides[mySwiper.activeIndex]).attr("data-subtitle");
$(".slide-captions").html(function() {
return "<h2 class='current-title'>" + currentTitle + "</h2>" + "<h3 class='current-subtitle'>" + currentSubtitle + "</h3>";
});



  
  }
  


