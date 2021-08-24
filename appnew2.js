// OVA VERZIJA RADI BARBA


gsap.registerPlugin(ScrollTrigger);
console.log("ScrollTrigger Loaded!");

let locoScroll;
console.log("Locomotive Loaded");

/*
================================================================================
PRELOADER
================================================================================
*/

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loaderx');
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
    getDirection: true,
    scrollFromAnywhere: true,
    touchMultiplier: 4,
   // scrollbarContainer: document.querySelector('#primary'),
    smartphone: {
          smooth: true,
      },
      tablet: {
          smooth: true,
      
      }
  });

// ovo je ubačeno naknadno
  locoScroll.on("scroll", function (t) {
    document.documentElement.setAttribute("data-direction", t.direction);
  });


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


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
  console.log("Scrolltrigger refreshed!");

/* ===== */
/*
locoScroll.update();
console.log("Locomotive Updated once more");
*/
/*
  // When window reszie, need to update locomotive scroll.
  $( window ).on( 'resize', function() {
    locoScroll.update();
    ScrollTrigger.refresh();
    console.log("JEBOTE RESIZED JEBOTE LOCOSCROLL I SCROLLTRIGGER UPDATED!");
});
*/

/* ===== */

/*
================================================================================
SCROLLTRIGGER TEST
================================================================================
*/
  gsap.utils.toArray('.block1').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
       // markers: true,
        scroller: ".smooth-scroll",
        start: 'top bottom',
        end: "top top",
      },
      y: 100,
      opacity: 0
    })
  });
  console.log("Scrolltrigger animacija loaded");


  // SCROLLTRIGGER TEST 2 - LOGO ANIMACIJA TEST TEST

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
  .to(".red-flag",  {width:'4em', height:'4em', top: '-1.25em', duration: 0.5, ease: "expo.inOut", }, 0)
  .fromTo(".red-flag", {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)"}, 
{duration:0.5, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)"}, "<")
  .to(".znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, 0)
  .to("#demo_3",  {autoAlpha:0, duration: 0.1});


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

  const loader = select('.loaderx');
  const loaderInner = select('.inner-loader');

  tlLoaderIn

    .set(loaderContent, {autoAlpha: 1})
    .set(".txt", {yPercent: 100})
    .set(mask, {yPercent: 0})
    .set(image, {yPercent: 100})
    //.set(".main", {y: 150})

    .to(loaderInner, {scaleY: 1, transformOrigin: 'bottom', ease: 'power1.inOut'})

    .addLabel('revealImage')
    .to(image, {yPercent: 0}, 'revealImage-=0.5')
    .to(".txt", {yPercent: 0, stagger: 0.2}, 'revealImage-=0.4');

  // LOADER OUT
  const tlLoaderOut = gsap.timeline({
    id: 'tlLoaderOut',
    defaults: {duration: 1.2, ease: 'power2.inOut'}, delay: 1});

  tlLoaderOut

    .to(lines, {yPercent: -500, stagger: 0.2}, 0)
    .to([loader, loaderContent], {yPercent: -100}, 0.2)
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

  // scroll to the top of the page
  barba.hooks.enter(() => {
        window.scrollTo(0, 0);
        //strigtest();
   
  });
   //kill scrolltrigger
  barba.hooks.beforeLeave(() => {
    locoScroll.destroy();
    console.log("Locomotive scroll destroyed!");
    killScrollTriggers();
    console.log("All ScrollTriggers destroyed!");
   
    /*window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();          
    console.log("webflow destroy ready init");*/
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
      bigLogo();
      homeYoutube();
      homeProductHover();
      simpleTicker();
      simpleTickerShow();
     // document.getElementById('video').play();
      

    console.log("Home JS triggered!");
    }},{
    namespace: 'products',
    beforeEnter(){
      productsMainSwiper();
      resetLogo();
      simpleTickerHide();
    console.log("Products JS triggered!");
    }},{
      namespace: 'productlottie',
    beforeEnter(data) {
      //soloProductsLottie(container);
      simpleTickerHide();
      productsoloAccordion();
    console.log("Productlottie JS triggered!");
    }},{
    namespace: 'about',
    beforeEnter(data) {
      simpleTickerHide();
    console.log("about JS triggered!");
    }},{
    namespace: 'conversation',
    beforeEnter(data) {
      //resetLogo();
    //simpleTickerHide();
    console.log("about JS triggered!");
    }},{
    namespace: 'contact',
    beforeEnter(data) {
      simpleTickerHide();
     // resetLogo();
    //  window.Webflow && window.Webflow.require('ix2').init();  
    //Webflow.require('ix2').init();
    //console.log("Webflow reinit ulalalalalala");
     // contactForm();
    console.log("contact JS triggered!");
      
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
    
        homeProductHover();
        
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
     // productsMainSwiper();
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
HOME - PRODUCT HOVER 
================================================================================
*/
function homeProductHover() {


gsap.set(".rg__long", {autoAlpha:0, yPercent:-10});


gsap.utils.toArray(".rg__column").forEach(container => {
 
  let   dome = container.querySelector(".rg__dome"),
  // wrap = container.querySelector(".rg__wrap"),
      name = container.querySelector(".rg__name"),
      //short = container.querySelector(".rg__short"),
      long = container.querySelector(".rg__long"),
      white = container.querySelector(".whiteback"),

      tl = gsap.timeline({ defaults: { ease: "Power2.inOut", duration: 0.2}, 
      paused: true });
  
  
  tl.to(dome, { yPercent: -8, autoAlpha:0 })
  
// .to(wrap, { backgroundColor:"#B6FA00" }, 0)
    //.to(wrap, { backgroundColor:"rgba(40, 40, 42, 0.14)" }, 0)
    .to(name, { yPercent:-10, autoAlpha:0 }, 0)
   // .to(short, { yPercent:-8, autoAlpha:0 }, 0)
    .to(long, {autoAlpha:1, yPercent:10}, 0)
    .to(white, {yPercent:10}, 0);
    
     
  container.addEventListener("mouseenter", () => tl.play() );
  container.addEventListener("mouseleave", () => tl.reverse() );
});

}
/*
================================================================================
HOME - YOUTUBE
================================================================================
*/
function homeYoutube() {

/*
================================================================================
YOUTUBE WRAPPER
================================================================================
*/
// --- 012 - OPEN FULLSCREEN VIDEO AND PLAY/PAUSE  --------------------------------------------------------------------------
var trigger = document.querySelector('#play-button');
var tl = gsap.timeline({ paused: true, reversed: true })
//var tl_2 = gsap.timeline({ paused: true, reversed: true})

tl.to('.video-bg', { 
 //yPercent:50,
 //color: '#ff0000',
 height: "100%", 
  duration:1,
  ease: "expo.inOut" 
})


/*tl_2.to(".turning", {
  duration:.75,
  ease: "elastic.out(1, 0.3)", 
  rotation:180,
  opacity:0, 
  overwrite: true, 
})
*/
trigger.addEventListener('click', function () {
  toggleState(tl)
  //toggleState(tl_2)
})

function toggleState(tl) {
  tl.reversed() ? tl.play() : tl.reverse()
}
console.log("YT black background loaded!");
/*function toggleState(tl_2) {
  tl_2.reversed() ? tl_2.play() : tl_2.reverse()
}
*/
/*
================================================================================
HOME - YOUTUBE CROP + FULLSCREEN bez YT pizdarija
================================================================================
*/
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
console.log("YT player loaded!");
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    host: "https://www.youtube.com",
    /* no need to specify player 
    size here since it is handled 
    by the player-size div */
    videoId: "3dz7mhndzoY",
    playerVars: {
      enablejsapi: 1,
      playsinline: 1,
      /*autoplay:1,
      mute:0,*/

      start: 0,
      disablekb: 0
    },
    events: {
      onStateChange: onPlayerStateChange,
       // call this function when player is ready to use
     'onReady': onPlayerReady
    }
  });
}
console.log("YT iFrame ready!");
function onPlayerStateChange(event) {
  console.log("player state: " + player.getPlayerState());
}
console.log("YT player state changed!");
function updateVideoId() {
  let videoId = document.getElementById("videoId").value;
  player.loadVideoById(videoId, -1);
}
console.log("YT update video ID!");
function stopVideo() {
  player.stopVideo();
}
console.log("stop video!");
/*
================================================================================
HOME - YOUTUBE - PLAY/STOP BUTTONS
================================================================================
*/
 // 3. The API calls this function when the video player is ready.
    function onPlayerReady(event) {
        $('#play-button').click(function(event){
            player.playVideo();
        });
    }
    console.log("video player ready!");
    // 4. The API calls this function when the player's state changes.
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            $('#play-button').click(function(event){
            player.pauseVideo();
 					   });
        }
        else {
            $('#play-button').click(function(event){
                player.playVideo();
            });
        } 
    }
    console.log("video player state changed!");
/*
================================================================================
HOME - YOUTUBE - ODVOJENI PLAY STOP BOTUNI
================================================================================
*/
/* 
function onPlayerReady(event) {
    // bind events
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
        player.playVideo();
    });
     var stopButton = document.getElementById("stop-button");
    stopButton.addEventListener("click", function() {
        player.stopVideo();
    });
}
*/
 
}

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
  
  var animations = $(".accordion-group").map(createAnimation);

  $(".accordion-menu").click(playAnimation);
  
  function playAnimation(event) {
    
    var selected = this;
    
    animations.each(function(i, animate) {
      animate(selected);
      
    });
  }
  
  function createAnimation(i, element) {
      
    var menu = element.querySelector(".accordion-menu");
    var box  = element.querySelector(".accordion-content");
    
    gsap.set(box, { height: "auto"})
    var tween = gsap.from(box, { duration:0.5, height: 0, ease: Power1.easeInOut }).reverse();
    
    return function(selected) {
      
      var reversed = selected !== menu ? true : !tween.reversed();
      tween.reversed(reversed);
    }
  }
  

  
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
KILL OLD SCROLLTRIGGERS
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
    
    $('#demo_3').t(
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
LOGO RESET - to small
================================================================================
*/

function resetLogo() {

  let tlfix = gsap.timeline();

    
/*   tl.to(".red-flag",  {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)", width:'4em', height:'4em', top: '-1.25em', duration: 0.5, ease: "expo.inOut", }, 0)
    .to(".znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, 0) */
      
   

  //  tl.to(".red-flag",  {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 40%, 0% 100%)", width:'4em', height:'4em', top: '-1.25em', duration: 0.5, ease: "expo.inOut", }, 0)
  tlfix.fromTo(".red-flag", {clipPath:"polygon( 0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)"}, 
  {duration:0.5, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 85% 100%, 0% 100%)"})

 //.to(".red-flag", {clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)"})
    .to(".znak", { scale: 0.6, transformOrigin: 'center center', yPercent: -55, ease:'expo.inOut'}, 0)

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

  tl.to(".red-flag",  {width:'8.5em', height:'12em', top: '-4em', duration: 0.5, ease: "expo.inOut", })
  .fromTo(".red-flag", {clipPath:"polygon( 0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)"}, 
  {duration:0.5, clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)"}, "<")
  .to(".znak", { scale: 1, transformOrigin: 'center center', yPercent: 0, ease:'expo.inOut'}, "<")

/* 
 
  gsap.to(".red-flag",  {width:'8.5em', height:'10em', top: '-4em', duration: 0.5, ease: "expo.inOut", })
  gsap.to(".znak", { scale: 1, transformOrigin: 'center center', yPercent: 0, ease:'expo.inOut'}, "<") */

console.log("logoReseted");

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


