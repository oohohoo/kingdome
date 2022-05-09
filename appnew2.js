// v.2022 

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
//gsap.registerPlugin(Observer);

let locoScroll;

/*TURN OFF GSAP MESSAGES*/
gsap.config({ nullTargetWarn: false });

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



var swiper = new Swiper(".swiper-container", {
 // loopedSlides: 6,
  loop: true,
  spaceBetween: 24,
  slidesPerView: "auto",
  freeMode: false,
  grabCursor: true,
  mousewheel: false,

  autoplay: {
    delay: 3000,
disableOnInteraction: false,
  },

     //   resistanceRatio:0.2,
     // longSwipes:true,
   //   longSwipesRatio:0.5,
    //  touchRatio:5,
        //loopFillGroupWithBlank: false,
       // paginationClickable: true,
       // mousewheelControl: true,
        parallax: true,
       // preloadImages: true,
        //updateOnImagesReady: true,
       centeredSlides: true,
      // slidesOffsetBefore: 100,
        speed: 400,
        breakpoints: {
                        500: {
                            spaceBetween: 30,
                            loopedSlides: 3,
                            slidesPerView: 1
                        },
                        1e3: {
                            loopedSlides: 3,
                            spaceBetween: 85,
                            slidesPerView: 1.1
                        },
                        1200: {
                           // spaceBetween: 100,
                          //  slidesPerView: 1.2
                        }
                    }
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
  console.log("IMAGES LOADED - LOCOSCROLL UPDATED ČEK DIS");
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

  //const image = select('.loader-img-img');
  const mask = select('.loader__image--mask');
  const lines = selectAll('.loader__title--mask');
  const loaderContent = select('.loader__content');

  /*
  const fadeintxt = select('.home-hero-heading-wrapper');
  const txtdonji = select('.txtdonji');
  const video = select('.aspect-video');
*/
const loader = select('.loader');
const loaderInner = select('.inner-loader');
const progress = select('.progress');


/* 
//  const loader = select('.loader'); 
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
*/
  tlLoaderIn

    .set(loaderContent, {autoAlpha: 1})
    .set(".txt", {yPercent: 100})
    .set(mask, {yPercent: 0})
    .set(".imgg", {yPercent: 100})
   // .set(".homeani1", {autoAlpha:0})
   // .set(".aspect-video", {scale:2})
    /* .set(fadeintxt, {autoAlpha: 0}) */
    
    //.set(".main", {y: 150})

     .to(loaderInner, {scaleY: 1, transformOrigin: 'bottom', ease: 'power1.inOut'}) 
    /* .to(fadeintxt, {autoAlpha: 1, ease: 'power1.inOut'}) */
   //.from(targets, {opacity:0, yPercent: 100, ease: "expo.inOut", stagger: 0.15})
   //.from(txtdonji, {opacity:0, yPercent: 100, ease: "expo.inOut"}, "+=0.2")
  

  

    .addLabel('revealImage')
    /* .to(image, {yPercent: 0}, 'revealImage-=0.5') */
    /* .to(".txt", {yPercent: 0, stagger: 0.2}, 'revealImage-=0.4'); */
  //.to(image, {yPercent: 0}, 'revealImage-=0.5') 
  .to(".imgg", {yPercent: 0})
  /* .to(".txt", {yPercent: 0}) */
  //.to(".txt", {yPercent: 0, stagger: 0.3}, 'revealImage-=0.4')
  //.to(".smallprint", {yPercent: 0})


  




  // LOADER OUT
  const tlLoaderOut = gsap.timeline({
    id: 'tlLoaderOut',
    defaults: {duration: 1.2, ease: 'power2.inOut'}, delay: 0});

  tlLoaderOut
  .to(".imgg", {autoAlpha:0})
   /*  .to(lines, {yPercent: -500, stagger: 0.2}, 0) */
    .to([loader, loaderContent], {yPercent: -100}, 0)
    //.to(fadeintxt, {autoAlpha: 0, ease: 'power1.inOut'}, 0)
    //.to(".aspect-video", { scale:1, duration: 1.5, ease:'expo.inOut'}, "+=0.2")
    //.to(".homeani1", {autoAlpha:1, stagger: 0.12, ease: "expo.inOut"}, "<")
    //.from(".header_redflag", { yPercent:-100, duration: 1, ease:'expo.inOut'}, "<0.25")
   // .to(".fake-video", { yPercent:-1000, duration: 0.2}, "<0.25")
    
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
  fullscreenMenu();
  scrollToTop();
  headerHide();
  underline();
  popupWizdome();
  buttonHover();
  logoTransformOnScroll();
  akapowPinned();
  rotateWireframe();
  parallaxPanel();
  productsTabs();
  //initNavigation();
  //initHeaderTilt();

}

/* 
  ScrollTrigger.refresh(true); // ScrollTrigger Refresh
  console.log("scrolltrigger refreshed AFTER all script load"); */
   /* $(document).ready(function() {  */
  setTimeout(() => {
    ScrollTrigger.refresh(true);
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
  console.log('pageTransitionIn');
  // timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({defaults: {duration: 0.6, ease: 'power1.inOut'} });
  tl
    .set(loaderInner, {autoAlpha: 0})
    .fromTo(loader, {yPercent: -100}, {yPercent: 0})
    .fromTo(loaderMask, {yPercent: 80}, {yPercent: 0}, 0)
   // .to(container, {y: 150}, 0);

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
  console.log('pageTransitionOut');
  // timeline to move loader away down
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power1.inOut'},
  // OVDJE SE INICIRA PONOVO SAV JS CONTENT / AKO ZATREBA
    onComplete: () => initContent()
  });
  tl
    .to(loader, {yPercent: 100})
    .to(loaderMask, {yPercent: -80}, 0)
   // .from(container, {y: -150}, 0);
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
  /*
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
*/

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
   /*  killScrollTriggers(); */
   if (ScrollTrigger.getAll().length > 0) {
    ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
       // console.log("scrolltrigger killed...");
    });
}
 
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

//barba.use(barbaPrefetch);

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
      rotateWireframe();
      parallaxPanel();
      homeProductHover();
      akapowPinned();
      initVideo();
      document.getElementById('video').play();
      
  
  
    }},{
    namespace: 'products',
    beforeEnter(){
       projectMainSwiper();

    }},{
      namespace: 'productsingle',
    beforeEnter(data) {
      productsTabs(); 
      fullscreen3D();
      productsoloAccordion(); 
   
    }},{
      
    namespace: 'howwework',
    beforeEnter(data) {
      akapowPinned();

     
   
    }},{
    namespace: 'contact',
    beforeEnter(data) {
     
      
    }},{
      namespace: 'faq',
      beforeEnter(data) {
        faqPrivacyPin();
        productsoloAccordion(); 
    
        
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
     //  fullscreenMenu();
       //homeanimations();
      
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
      
  

     },
     
     beforeEnter({next}) {
    //  hideMenu();
    //initVideo();
    //console.log("video initializzzzzzz");
    
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



}



/*
================================================================================
FULLSCREEN MENU
================================================================================
*/
function fullscreenMenu() {
  // OPEN MENU FROM CLICK
const openmenu = document.getElementById('openmenux');
const closemenu = document.getElementById('closemenux');
//const menuhover = document.getElementById('menuhover');


const { gsap } = window;
/*
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
*/

openmenu.addEventListener("click", () => {
		show();
});

closemenu.addEventListener("click", () => {
		hide();
});

// --- SHOW
function show() {
	let tl = gsap.timeline();

	gsap.set(".nav-wrapper, .nav-toggle", {pointerEvents: "none"});
  gsap.set(".fs-menu--column", {yPercent:-100})
  gsap.set(".fs-menu-header", {yPercent:-110})
 
  gsap.set(".close, .fs-nav-item, .fadein", {autoAlpha:0})
 
  //gsap.set(".line-wrapper", {yPercent:100})

 

	tl.fromTo(".nav-wrapper", {height: "0%", transformOrigin: "top center"}, {duration: 0.1, height: "100%"})
    .to(".fs-menu--column", {yPercent:0, duration:0.8, ease: "power2.inOut"}, "<")
    .to(".fs-menu-header", {yPercent:0, duration:0.8, ease: "power2.out"}, "<0.2")
   
    .to(".fs-nav-item", {autoAlpha:1, duration:0.5,stagger:0.1,  ease: "power2.inOut"}, "<0.1")
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

		tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.4, stagger:0.05, ease: "power2.inOut"})
		.to(".nav-wrapper", { duration: 0.1, transformOrigin: "top center", height: "0%"})
		.to(".open", {autoAlpha:1}, "<")
		.to(".close", {autoAlpha:0}, "<")
    .set(" .nav-toggle", { pointerEvents: "all"});
	
}


/*
================================================================================
SUBMENU HOVER
================================================================================
*/
//-------
// SUBMENU - CHANGE COLOR HOVER / LOOP / ista skripta ko ova poviše ali bez komentara
// loop through each element
$(".fs-nav-item, .hover-opacity, .kupole-info").each(function(i, el) {
  var tl = gsap.timeline({paused: true});
  var t = tl
         .to($(el).find('a'), {opacity:0.6,  duration: 0.15});
el.animation = t;
$(el).on("mouseenter",function(){
    this.animation.play();
  }).on("mouseleave",function(){
    this.animation.reverse();
  });
});
//-------

/*
================================================================================
OVO JE MOŽDA NEPOTREBNO
================================================================================
*/
// EVENT LISTENERS
openmenu.addEventListener("click", function(){ animation.restart(), animation.play(); });
closemenu.addEventListener("click", function(){aniout.restart(), aniout.play(); });





/*
================================================================================
MENU ICON HOVER
================================================================================
*/

//const menuhover = document.getElementById('menuhover');


/* OPENMENU HOVER ICON*/
openmenu.addEventListener('mouseover', ()=> {  
  let menuhovertimeline = gsap.timeline({defaults:{autoAlpha:1}})
  //animation.paused( true ); 
  menuhovertimeline
  .to(".half", {width: "100%", duration: 0.2, transformOrigin: "center center"})
  //  .to(".mline3", {width: "100%"}, "<-0.05")
  })
  // MENU ICON MOUSEOUT 
  openmenu.addEventListener('mouseout', ()=> {  
  let menuhovertimeline2 = gsap.timeline({defaults:{autoAlpha:1}})
  //animation.paused( true ); 
  menuhovertimeline2
  .to(".half", {width: "50%", duration: 0.2, transformOrigin: "center center"})
  //  .to(".mline3", {width: "55%"}, "<-0.05")
  })

/* CLOSEMENU HOVER ICON */
  closemenu.addEventListener('mouseover', ()=> {  
    let menuhovertimeline3 = gsap.timeline({defaults:{autoAlpha:1}})
    //animation.paused( true ); 
    menuhovertimeline3
    .to(".closex", {scale:0.8, duration: 0.2, transformOrigin:"50% 50%"})
    //  .to(".mline3", {width: "100%"}, "<-0.05")
    })
    // MENU ICON MOUSEOUT 
    closemenu.addEventListener('mouseout', ()=> {  
    let menuhovertimeline4 = gsap.timeline({defaults:{autoAlpha:1}})
    //animation.paused( true ); 
    menuhovertimeline4
    .to(".closex", {scale:1, duration: 0.2, transformOrigin:"50% 50%"})
    //  .to(".mline3", {width: "55%"}, "<-0.05")
    })
  

  

}


/*
================================================================================
FULLSCREEN 3D
================================================================================
*/
function fullscreen3D() {
  // OPEN MENU FROM CLICK
const openmenu = document.getElementById('open3d');
const closemenu = document.getElementById('close3d');


//const menuhover = document.getElementById('menuhover');


const { gsap } = window;


const openbutt = document.querySelector(".open3d");

openbutt.addEventListener("click", () => {
	//	openbutt.classList.add("active");
		show();

});
const closeclose = document.getElementById('closeclose');
//const closeclose = document.querySelector(".3dclose-button");
closeclose.addEventListener("click", () => {
//	openbutt.classList.remove("active");
		hide();
  //  api.stop();

});


// --- SHOW
function show() {
	let tl = gsap.timeline();

	gsap.set(".nav-wrapper2, .open3d", {pointerEvents: "none"});
  gsap.set(".fs-menu--column", {yPercent:-100})
  //gsap.set(".fs-menu-header", {yPercent:-110})
 
  //gsap.set(".close, .fs-nav-item, .sublink-wrapper, .fadein", {autoAlpha:0})
 
  //gsap.set(".line-wrapper", {yPercent:100})

 

	tl.fromTo(".nav-wrapper2", {height: "0%", transformOrigin: "top center"}, {duration: 0.1, height: "100%"})
    .to(".fs-menu--column", {yPercent:0, duration:0.8, ease: "power2.inOut"}, "<")
    .to(".fs-menu-header", {yPercent:0, duration:0.8, ease: "power2.out"}, "<0.2")
   
   // .to(".fs-nav-item", {autoAlpha:1, duration:0.5,stagger:0.1,  ease: "power2.inOut"}, "<0.1")
   // .to(".fadein", {autoAlpha:1, duration:0.6, ease: "power2.inOut"}, "<0.1")


	//	.to(".open", {autoAlpha:0}, "<")
	//	.to(".close", {autoAlpha:1}, "<")
    
		//.to(".line-wrapper", {yPercent:30, stagger:0.1, duration:0.4, ease: "power1.inOut"}, "<0.1")
		.from(".nav-wrap", {yPercent:100, stagger:0.05, opacity:0, duration:0.4, ease: "power1.inOut"}, "<0.1")
		//.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.1")
    
    .set(".nav-wrapper2, .open3d", {pointerEvents: "all"}, "<")

}
// --- HIDE
function hide() {
	let tl = gsap.timeline();

	gsap.set(".nav-wrapper2, .open3d", {pointerEvents: "none"});

		tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.6, stagger:0.05, ease: "power2.inOut"})
		.to(".nav-wrapper2", { duration: 0.1, transformOrigin: "top center", height: "0%"})
		.to(".open", {autoAlpha:1}, "<")
		.to(".close", {autoAlpha:0}, "<")
    .set(" .open3d", { pointerEvents: "all"});
	
}



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
          
                     } })
          .to(this.icon, { rotate: "90deg", ease: "power3.inOut" })
          .to(this.line, { scaleY: 0, ease: "power3.inOut" }, 0)
          .from(
              this.content,
              { height: 0, duration: 0.5, ease: "power3.inOut", onComplete:function() {
                locoScroll.update();
                
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

/*
================================================================================
INIT VIDEO
================================================================================
*/
function initVideo() {
  
 // let video = body.querySelector('.home-hero-video');
// const video = select('.background-video');
//const video = document.getElementById('video');
////video.setAttribute('autoplay', true);
//video.load();
$('#video').trigger('play');
console.log("video initialised x");

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
	
}


/*
================================================================================
PRODUCTS - FULLSCREEN SWIPER
================================================================================
*/
function projectMainSwiper() {

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
FADE IN ON ENTER
================================================================================
*/
function fadeInOnEnter() {
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
  console.log("FADE IN ON ENTER");
}
  

/*
================================================================================
HOME - LOGO TRANSFORM ON SCROLL
================================================================================
*/
function logoTransformOnScroll() {
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

  console.log("LOGO TRANSFORM ON SCROLL");
}

/*
================================================================================
HOME - ROTATE WIREFRAME
================================================================================
*/
function rotateWireframe() {
  var rotate = gsap.timeline({
    scrollTrigger:{
      trigger: "#wireframe-trigger",
      scroller: ".smooth-scroll",
      //pin: true,
      scrub:true,
      start: 'top 80%',
      end:'+=10000',
     // transformOrigin:"center center",
      invalidateOnRefresh:true
    }
  })
  .to('#wireframe', {
    rotation:360*3,
    duration:3, transformOrigin:"50% 50%", ease:'none',
    
  })

  console.log("ROTATE WIREFRAME");
}

/*
================================================================================
PARALLAX PANEL SOLO FOR EACH
================================================================================
*/
function parallaxPanel() {
  const sections = gsap.utils.toArray(".img__wrapper");

  sections.forEach((section) => {
    
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
      yPercent: -100,
    //  rotate:34,
      ease: "none",
    });
    tl.to(image, {
      yPercent: 100,
    ease: "none",
    });
  });

    console.log("PARALLAX PANEL SOLO FOR EACH");
}


/*
================================================================================
ALL - BOTTON HOVER
================================================================================
*/
function buttonHover() {
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
  console.log("BOTTON HOVER");
}


/*
================================================================================
ALL - POPUP - WIZDOME
================================================================================
*/
function popupWizdome() {
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
  console.log("POPUP - WIZDOME");
}

/*
================================================================================
HOME - PRODUCT HOVER 
================================================================================
*/
function homeProductHover() {
  
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
  console.log("HOME - PRODUCT HOVER ");
}

/*
================================================================================
ALL - UNDERLINE GSAP
================================================================================
*/
function underline() {
  
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
  console.log("UNDERLINE GSAP");
}


/*
================================================================================
HOME + HOW WE WORK AKAPOWL PINNED
================================================================================
*/
function akapowPinned() {

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
    console.log("UHOME + HOW WE WORK AKAPOWL PINNED");
  }

/*
================================================================================
HEADER HIDE
================================================================================
*/
function headerHide() {
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
  

    console.log("HEADER HIDE");
  }


  /*
================================================================================
PRODUCT TABS
================================================================================
*/
function productsTabs() {

  let targets = document.querySelectorAll(".tab-item");
  let articles = document.querySelectorAll(".article");
  let activeTab = 0;
  let old = 0;
  let heights = [];
  let dur = 0.4;
  let animation;
  
  for (let i = 0; i < targets.length; i++) {
    targets[i].index = i;
    heights.push(articles[i].offsetHeight); // get height of each article
    gsap.set(articles[i], {top: 0, y:-heights[i]}); // push all articles up out of view
    targets[i].addEventListener("click", doCoolStuff);
  }
  // set initial article and position bubble slider on first tab 
  gsap.set(articles[0], {y:0});
  gsap.set(".slider-tab", {x:targets[0].offsetLeft, width:targets[0].offsetWidth});
  gsap.set(targets[0], {color:"#28282a"});
  gsap.set(".article-block", {height:heights[0]});
  
  function doCoolStuff() {
    // check if clicked target is new and if the timeline is currently active
    if(this.index != activeTab) {
      //if there's an animation in-progress, jump to the end immediately so there aren't weird overlaps. 
      if (animation && animation.isActive()) {
        animation.progress(1);
      }
      animation = gsap.timeline({defaults:{duration:0.4}});
      old = activeTab;
      activeTab = this.index;
      // animate bubble slider to clicked target
      animation.to(".slider-tab", {x:targets[activeTab].offsetLeft, width:targets[activeTab].offsetWidth});
      // change text color on old and new tab targets
      animation.to(targets[old], {color:"#edeae4", ease:"none"}, 0);
      animation.to(targets[activeTab], {color:"#28282a", ease:"none"}, 0);
      // slide current article down out of view and then set it to starting position at top
      animation.to(articles[old], {y:0, opacity:0, ease:"power2.in" }, 0);
      animation.set(articles[old], {y:0[old]});
      // resize article block to accommodate new content
      animation.to(".article-block", {height:heights[activeTab]});
      // slide in new article
      animation.to(articles[activeTab], {duration: 0.4, opacity:1, y:0, ease: "power2.out"}, "-=0.25");
    }
  }
  
  
  window.addEventListener('resize', function(){
    gsap.to(".slider-tab", {x:targets[activeTab].offsetLeft, width:targets[activeTab].offsetWidth});
   console.log("SLIDE TABS ON PLACE TRAVEL");
  });
  
  

  console.log("PRODUCT TABS");
}



/*
================================================================================
LOCOMOTIVE 4 SCROLL TO TOP
================================================================================
*/

function scrollToTop() {
$( "#tostart" ).on( "click", function() {
  locoScroll.scrollTo( '#start', {
    'offset': 0,
    'duration': 1500,
    'easing': [0.25, 0.00, 0.35, 1.00],
    'disableLerp': true
  });
  
  console.log("SCROLL TO TOP");
});
}


/*
================================================================================
PIN FAQ/PRIVACY HEADER
================================================================================
*/
function faqPrivacyPin() {
const faq = document.querySelector('.faq-header')

ScrollTrigger.create({
  
  id: 'test',
  pin: faq,
  start: 'top 20%',
  end: '+=100%',
  endTrigger: faq.parentElement,
  end: 'bottom 30%'
  
})
}