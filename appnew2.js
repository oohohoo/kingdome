// v.2022 

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(Observer);

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

  if (document.querySelector('.smooth-scroll')) {
		locoScroll = new LocomotiveScroll({
			el: document.querySelector(".smooth-scroll"),
			smooth: true,
			offset: [0, 0],
			getDirection: true,
			scrollFromAnywhere: true,
			//touchMultiplier: 3.0,
			useKeyboard: true,
			inertia: 0.8,
			mobile: {
				//breakpoint: 0,
				smooth: true,
				getDirection: true,
			},
			tablet: {
				//  breakpoint: 0,
				touchMultiplier: 2,
				smooth: true,
				getDirection: true,
			},
		});

		// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
		locoScroll.on("scroll", ScrollTrigger.update);

		// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
		ScrollTrigger.scrollerProxy(".smooth-scroll", {
			scrollTop(value) {
				return arguments.length
					? locoScroll.scrollTo(value, 0, 0)
					: locoScroll.scroll.instance.scroll.y;
			}, // we don't have to define a scrollLeft because we're only scrolling vertically.
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},

			// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters,
			// we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
			// UKLJUČITI SAMO NA MOBILNOJ VERZIJI
			pinType: document.querySelector(".smooth-scroll").style.transform
				? "transform"
				: "fixed",
		});

/*
================================================================================
ON WINDOW RESIZE
================================================================================
*/
		
window.addEventListener('resize', function(){
  setTimeout(()=>{
    if (document.querySelector('.smooth-scroll')) {
  locoScroll.update();
    };
  ScrollTrigger.refresh();
},200) 
 console.log("RESIZE & REFRESHHHH LOCO & SCROLL");
});


/*
================================================================================
100vh fix mobile menu
================================================================================
*/

		/*
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
*/

/*
================================================================================
LOCOMOTIVE SCROLL REFRESH AFTER ALL / ne briši
================================================================================
*/
		//if($('.smooth-scroll').length >0 ){
		// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
		//ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
		// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
		ScrollTrigger.refresh();
		console.log("SCROLL REFRESH 2");

		/*   document.addEventListener('load', function(){
    locoScroll.update();
}); */
		//}
		/*
================================================================================
LOCOMOTIVE SCROLL UPDATED AFTER IMAGESLOADED
================================================================================
*/

		imagesLoaded("#main", { background: true }, function () {
			locoScroll.update();
			console.log("LOCO SCROLL UPDATE AFTER IMAGES LOADED ALL IMAGES");
		});
	}

}

/*
================================================================================
PRELOADER --> vodi na --> INIT CONTENT
================================================================================
*/
function initLoader() {

  const tlLoaderIn = gsap.timeline({
    id: 'tlLoaderIn',
    defaults: {duration: 0.5, ease: 'power2.out'},
    onComplete: () => initContent()
  });

  //const image = select('.loader-img-img');
 // const mask = select('.loader__image--mask');
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


  tlLoaderIn

    .set(loaderContent, {autoAlpha: 1})
    .set(".txt", {yPercent: 100})
    //.set(mask, {yPercent: 0})
    .set(".imgg", {yPercent: 100})
   // .set(".hamby", {autoAlpha:0})
   // .set(".aspect-video", {scale:2})
    /* .set(fadeintxt, {autoAlpha: 0}) */
    
    .set(".main", {y: 150})

     .to(loaderInner, {scaleY: 1, transformOrigin: 'bottom', ease: 'power1.inOut'}) 

     .addLabel('revealImage')

  .to(".imgg", {yPercent: 0})
   .to(".txt", {yPercent: 0}) 












  // LOADER OUT
  const tlLoaderOut = gsap.timeline({
    id: 'tlLoaderOut',
    defaults: {duration: 0.5, ease: 'power2.inOut'}, delay: 0});

  tlLoaderOut
  .to(".imgg", {yPercent:100})
   /*  .to(lines, {yPercent: -500, stagger: 0.2}, 0) */
    .to([loader, loaderContent], {yPercent: -100}, 0)
    //.to(fadeintxt, {autoAlpha: 0, ease: 'power1.inOut'}, 0)
    //.to(".aspect-video", { scale:1, duration: 1.5, ease:'expo.inOut'}, "+=0.2")
    //.to(".hamby", {autoAlpha:1, stagger: 0.12, ease: "expo.inOut"}, "<")
    //.from(".header-red-flag", { yPercent:-100, duration: 1, ease:'expo.inOut'}, "<0.25")
   // .to(".fake-video", { yPercent:-1000, duration: 0.2}, "<0.25")
    
    .to('.main', {y: 0}, 0);

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
	select("body").classList.remove("is-loading");

	// your custom script
	var myscripts = {
		init: function () {
			if ($("body").hasClass("page-home")) {
				this.home();
			} else if ($("body").hasClass("page-products")) {
				this.products();
			} else if ($("body").hasClass("page-howwework")) {
				this.howwework();
			} else if ($("body").hasClass("page-product-single")) {
				this.pageproductsingle();
			} else if ($("body").hasClass("page-contact")) {
				this.contact();
			} else if ($("body").hasClass("page-faq")) {
				this.faq();
			}
		},
		home: function () {
			logoTransformOnScroll();
			heroPanelAnimation();
			startStopVideo();
			swiperSolo();
			headerHide();
		},
		products: function () {
			//projectMainSwiper();
			productObserver();
		},
		howwework: function () {
			heroPanelAnimation();
			logoTransformOnScroll();
			headerHide();
			akapowPinned();
			logoMarquee();
			startStopVideo();
		},
		pageproductsingle: function () {
			heroPanelAnimation();
			headerHide();
			logoTransformOnScroll();
			productsTabs();
			swiperSolo();
		},
		contact: function () {
			webflowInteractions();
			//  openMobileMenu();
		},
		faq: function () {
			headerHide();
			logoTransformOnScroll();
			// openMobileMenu();
		},
	};

	// LOAD THIS SCRIPTS ON EVERY PAGE
	initScroll();
	fullscreenMenu();
	scrollToTop();
	// underline();
	//popupWizdome();
//	buttonHover();
	yearUpdate();
	fadeInOnEnter();
	cubertoCursor();
	//initNavigation();
	//initHeaderTilt();

	myscripts.init();

	setTimeout(() => {
		ScrollTrigger.refresh(true);
	}, 1000);
	console.log("SCROLL TRIGGER REFRESHED AFTER 1 SECOND");
}

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
  const tl = gsap.timeline({defaults: {duration: 1.2, ease: 'quart.inOut'} });
  tl
    .set(loaderInner, {autoAlpha: 0})
    .fromTo(loader, {yPercent: 100}, {yPercent: 0})
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
  const tl = gsap.timeline({defaults: {duration: 1.2,ease: 'quart.inOut'},
  // OVDJE SE INICIRA PONOVO SAV JS CONTENT / AKO ZATREBA
    onComplete: () => initContent()
  });
  tl
    .to(loader, {yPercent: -100})
    .to(loaderMask, {yPercent: -80}, 0)
   // .from(container, {y: -150}, 0);
  return tl;
}


/*
================================================================================
BARBA PAGE TRANSITION IN 2
================================================================================
*/
function pageFadeIn({
  container
}) {
  // timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({defaults: {duration: 0.6,ease: 'power3.out'}});
  tl
    .to(container, {autoAlpha:0}, 0);
  return tl;
}

/*
================================================================================
BARBA PAGE TRANSITION OUT 2
================================================================================
*/
function pageFadeOut({
  container
}) {
  // timeline to move loader away down
  const tl = gsap.timeline({defaults: {duration: 0.6, ease: 'power3.inOut'},
    // OVDJE SE INICIRA PONOVO SAV JS CONTENT / AKO ZATREBA
    onComplete: () => initContent()
  });
  tl
    .from(container, {autoAlpha:0}, 0);
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
   
  });
   //kill scrolltrigger
  barba.hooks.beforeLeave(() => {
    if($('.smooth-scroll').length >0 ){
      locoScroll.destroy();
      console.log("LOCO DESTROY");
   }

   if (ScrollTrigger.getAll().length > 0) {
    ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
        console.log("SCROLLTRIGGER DESTROY");
    });
};

Webflow.destroy();
console.log("WEBFLOW DESTROY");
 
  });
  //init scrolltrigger
   barba.hooks.afterEnter(() => {
    
/* AUTOPLAY VIDEOS*/
    var vids = document.querySelectorAll("video"); vids.forEach(vid => { var playPromise = vid.play(); if (playPromise !== undefined) { playPromise.then(_ => {}).catch(error => {}); }; });
   // console.log("možda ode učitat locoscroll");
   });
 

/*
================================================================================
BARBA PREFETCH
================================================================================
*/

barba.use(barbaPrefetch);

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
	views: [
		{
			namespace: "home",
			beforeEnter(data) {
				homeProductHover();
			},
		},
		{
			namespace: "products",
			beforeEnter(data) {
				productObserver();
			},
		},
		{
			namespace: "productsingle",
			beforeEnter(data) {
				productsTabs();
				fullscreen3D();
				productsoloAccordion();
				swiperSolo();
			},
		},
		{
			namespace: "howwework",
			beforeEnter(data) {
				akapowPinned();
				logoMarquee();
			},
		},
		{
			namespace: "contact",
			beforeEnter(data) {
				webflowInteractions();
			},
			afterEnter() {

			},
		},
		{
			namespace: "faq",
			beforeEnter(data) {
				productsoloAccordion();
			},
		},
	],
	/*
================================================================================
BARBA TRANSITIONS
================================================================================
*/

	transitions: [
		{
			// ROUTE AKO IDE NA ABOUT IDE DRUGA ANIMACIJA

			once({ next }) {
				// do something once on the initial page load
				initLoader();
			},

			async leave({ current }) {
				// animate loading screen in
				await pageTransitionIn(current);
				console.log("LEAVE");
			},
			enter({ next }) {
				// animate loading screen away
				pageTransitionOut(next);
				console.log("NEXT");
			},

			afterEnter({ next }) {},

			beforeEnter({ next }) {

			},
		},
	],

	/*
 ================================================================================
 PREVENT / CLICKS DURRING TRANSITION AND CURRENT LINK + SCROLL TO TOP
 ================================================================================
 */
	prevent: ({ event, href }) => {
		if (event.type === "click") {
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
	},
});

/*
================================================================================
INIT LOADER
================================================================================
*/

function init() {
  initLoader();
}

}

/*
================================================================================
FULLSCREEN MENU
================================================================================
*/
function fullscreenMenu() {
  // OPEN MENU FROM CLICK
const openmenu = document.getElementById('openmenu');
const closemenu = document.getElementById('closemenux');

new SplitText(".doublesplit", { type: "lines", linesClass: "lineChild" });
new SplitText(".doublesplit", { type: "lines", linesClass: "lineParent" });

// OPEN CLOSE FUNCTION
openmenu.addEventListener("click", () => {
		show();
});

closemenu.addEventListener("click", () => {
		hide();
});


// VANJSKI GHOST 
gsap.set(".xnav", {scaleY: 0})
// MENU LINKS 
gsap.set(".lineChild", {yPercent:100})


// --- SHOW
function show() {
	let tl = gsap.timeline();

//	gsap.set(".xnav, .hamburger-menu, .fs-menu-close", {pointerEvents: "none"});
//gsap.set(".fs-menu--column", {autoAlpha:1})
//  gsap.set(".close, .fs-nav-item, .fadein", {autoAlpha:0})



// VANJSKI GHOST 
tl.to(".xnav", {scaleY: 1, transformOrigin: "bottom center", duration:0.1}) 
// UNUTARNJI  
    .fromTo(".nav--trans", {scaleY: 0, transformOrigin: "bottom center"},
		{duration: 0.5, scaleY: 1, ease: "Expo.inOut"}, 0)
  
// UNUTARNJI 
   // .to(".fs-menu--column", {autoAlpha:1, duration:0.1}, "<0.1")
   .fromTo(".clip", {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    webkitClipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 2.5,
  },
  {
    
         
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",  

    ease: "Expo.inOut",
    })
    .to(".fs-menu-close", {autoAlpha:1, stagger:0.01}, "<")
    .from(".nav-image", {autoAlpha:0, scale:1.1})
    
    
// MENU LINKS 
    .to(".lineChild", {autoAlpha:1, yPercent:0, stagger:0.05})
    .to(".nav-super", {autoAlpha:1, stagger:0.01})
   
    // LOGO RESET

    .to(".header-red-flag",  {width:'3rem', height:'3rem', top: '0.5rem', duration: 0.5, ease: "expo.inOut", }, 0) 
    .to("#di", {morphSVG: {shape: "#sq"}, duration: 0.5, ease: "expo.inOut"}, 0)
    .to(".header_znak", { scale: 0.7, duration: 0.5, transformOrigin: 'center center', yPercent: -65, ease:'expo.inOut'}, 0)


  //  .to(".fs-nav-item", {autoAlpha:1, duration:0.5, stagger:0.05,  ease: "quart.inOut"}, "<0.1")
    //.to(".fadein", {autoAlpha:1, duration:0.3, ease: "quart.inOut"}, "<0.1")

// MENU OPENCLOSE
		.to(openmenu, {autoAlpha:0}, "<")
		.to(closemenu, {autoAlpha:1}, "<")
   
		//.to(".line-wrapper", {yPercent:30, stagger:0.1, duration:0.4, ease: "power1.inOut"}, "<0.1")
	//	.from(".nav-wrap", {yPercent:100, stagger:0.05, opacity:0, duration:0.4, ease: "quart.inOut"}, "<0.1")
		//.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.1")
    
   // .set(".xnav, .hamburger-menu, .fs-menu-close", {pointerEvents: "all"}, "<")

}
// --- HIDE
function hide() {
	let tl = gsap.timeline();

//	gsap.set(".xnav, .hamburger-menu, .fs-menu-close", {pointerEvents: "none"});

  // MENU LINKS 
  tl.to(".lineChild", {autoAlpha:1, yPercent:100, stagger:0.01}, 0)
  .to(".nav-super", {autoAlpha:0,  stagger:0.01}, "<")
  .fromTo(".clip", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",  
    duration: 2.5,
  },
  {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    webkitClipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
           
    ease: "Expo.inOut",
  }, "<")

  .to(".fs-menu-close", {autoAlpha:0})
  /* .to(".fs-nav-item", {autoAlpha:0, duration:0.5,stagger:0.05,  ease: "quart.inOut"}, "<0.1") */
  
    

  // .to(".fs-menu--column", {autoAlpha:0, duration:0.1}, "-=0.1")
   // UNUTARNJI  
   .to(".nav--trans", { duration: 0.5, transformOrigin: "bottom center", scaleY: 0, ease: "Expo.inOut", }, "+=0.1")

	 // VANJSKI GHOST 	
   .to(".xnav", { duration: 0.1, transformOrigin: "bottom center", scaleY: 0}) 

    // LOGO RESET BACK

    .to(".header-red-flag",  {width:'6.1875rem', height:'8.4375rem', top: '0rem', duration: 0.5, ease: "expo.inOut", }, 0) 
    .from("#sq", {morphSVG: {shape: "#di"}, duration: 0.5, ease: "expo.inOut"}, 0)
    .to(".header_znak", { scale: 1, duration: 0.5, transformOrigin: 'center center', yPercent: 0, ease:'expo.inOut'}, 0)


   // MENU OPENCLOSE
		.to(openmenu, {autoAlpha:1}, "<")
		.to(closemenu, {autoAlpha:0}, "<")
   // .set(" .nav-toggle", { pointerEvents: "all"});

}


/*
================================================================================
SUBMENU HOVER
================================================================================
*/
// SUBMENU - CHANGE COLOR HOVER / LOOP / ista skripta ko ova poviše ali bez komentara
$(".fade-hover, .hover-opacity, .kupole-info").each(function(i, el) {
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


/*
================================================================================
MENU ICON HOVER
================================================================================
*/

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
ACCORDION
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
				.timeline({
					onReverseComplete: function () {
						locoScroll.update();
					},
				})
				.to(this.icon, { rotate: "90deg", ease: "power3.inOut" })
				.to(this.line, { scaleY: 0, ease: "power3.inOut" }, 0)
				.from(
					this.content,
					{
						height: 0,
						duration: 0.5,
						ease: "power3.inOut",
						onComplete: function () {
							locoScroll.update();
						},
					},
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
FADE IN ON ENTER
================================================================================
*/
function fadeInOnEnter() {
	gsap.set(".batch", {
		y: 50,
	});
	ScrollTrigger.batch(".card", {
		scroller: ".smooth-scroll",
		start: "top bottom-=100px",
		onEnter: (batch) => {
			batch.forEach((card, index) =>
				gsap.to(card.children, { y: 0, autoAlpha: 1, stagger: 0.05 })
			);
		},
		once: true,
	});
}

/*
================================================================================
HOME - LOGO TRANSFORM ON SCROLL
================================================================================
*/
function logoTransformOnScroll() {
  gsap.timeline({
    scrollTrigger: {
      scroller: ".smooth-scroll",
        trigger: "#start",
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "+=10000000", // end after scrolling 500px beyond the start
        toggleActions: 'play reverse play reverse',
        invalidateOnRefresh: true,
    }
  })
  .to(".header-red-flag",  {width:'3rem', height:'3rem', top: '0.5rem', duration: 0.5, ease: "expo.inOut", }, 0) 
  .to("#di", {morphSVG: {shape: "#sq"}, duration: 0.5, ease: "expo.inOut"}, 0)
  .to(".header_znak", { scale: 0.7, duration: 0.5, transformOrigin: 'center center', yPercent: -53, ease:'expo.inOut'}, 0)
}



/*
================================================================================
ALL - POPUP - WIZDOME
================================================================================
*/
function popupWizdome() {
/* SHOW ONCE PER COOKIE*/
var is_modal_show = sessionStorage.getItem('alreadyShow');
  if(is_modal_show != 'alredy shown'){
    setTimeout(showModal,2000);
      function showModal(){
        let tl = gsap.timeline();
          tl.to(".popup", { autoAlpha: 1, ease:'none'}, 0)
            .to(".barba-container", 0.2, {opacity: 0.2}, 0);

  console.log("MODAL TIMEOUT");
 sessionStorage.setItem('alreadyShow','alredy shown');
}
}

$(".popup-close, .popup").click(function() {
 /*  gsap.to(".actual-message", 0.2, {
    marginTop: "10%",
    autoAlpha: 0,
    ease: "ease-in"
  }); */

  gsap.to(".popup", 0.2, { 
    autoAlpha: 0
  });
  gsap.to(".barba-container", 0.2, { 
    opacity: 1
  });
}); 

}
/*
================================================================================
HOME - PRODUCT HOVER 
================================================================================
*/
function homeProductHover() {
	/*   gsap.set(".rg__long", {autoAlpha:0, yPercent:-10}); */

	gsap.utils.toArray(".product-hover").forEach((container) => {
		let imagezoom = container.querySelector(".full-image"),
			linkhover = container.querySelector(".linkhover"),
			// wrap = container.querySelector(".rg__wrap"),
			// name = container.querySelector(".product-title"),
			//short = container.querySelector(".rg__short"),
			// long = container.querySelector(".rg__long"),
			// full-image

			tl = gsap.timeline({
				defaults: { ease: "ease.in", duration: 0.3 },
				paused: true,
			});

		tl.to(imagezoom, { scale: 1.1 }).to(linkhover, { opacity: 0.4 }, 0);
		//.to(wrap, { backgroundColor:"rgba(40, 40, 42, 0.14)" }, 0)
		//.to(name, { yPercent:-10, autoAlpha:0 }, 0)
		// .to(short, { yPercent:-8, autoAlpha:0 }, 0)
		// .to(long, {autoAlpha:1, yPercent:10}, 0)
		// .to(white, {yPercent:-45}, 0);

		container.addEventListener("mouseenter", () => tl.play());
		container.addEventListener("mouseleave", () => tl.reverse());
	});
	console.log("HOME - PRODUCT HOVER ");
}



/*
================================================================================
HOW WE WORK AKAPOWL PINNED
================================================================================
*/
function akapowPinned() {


  gsap.set(".pinned-image", { zIndex: (i, target, targets) => targets.length - i });

  var images = gsap.utils.toArray('.pinned-image:not(.four)');
  
  images.forEach((image, i) => {
     
     var nextImage = image.nextElementSibling;
    
     var imageTimeline = gsap.timeline({
       
       scrollTrigger: {
         
         trigger: ".showcase",
         scroller: ".smooth-scroll",
         
         start: () => "top -" + (window.innerHeight * i),       
         end: () => "+=" + window.innerHeight,
         
         // toggleActions: "play none reverse none",
         
         scrub: true,
         invalidateOnRefresh: true, 
         
       }
       
     })
 
     imageTimeline
      .fromTo(image, { height: () => { return "100%" }  }, { height: () => { return "0%" }, ease: "none" }, 0)
     ;
 
  });
  
  ScrollTrigger.create({
        trigger: ".showcase",
        scroller: ".smooth-scroll",
        start: () => "top top",
        end: () => "+=" + ((images.length) * window.innerHeight),
        pin: '.image-wrap', 
        anticipatePin: 1,
        invalidateOnRefresh: true,
    
  });
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
    trigger: ".navchange",
    scroller: ".smooth-scroll",
    start: "top top",
    end: 99999,
    toggleClass: { targets: ".header, .hamby-line, .w--current", className: "navcolor" },
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
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
  let dur = 0.3;
  let animation;
  
  for (let i = 0; i < targets.length; i++) {
    targets[i].index = i;
    heights.push(articles[i].offsetHeight); // get height of each article
    gsap.set(articles[i], {top: 0, y:0, opacity:0}); // push all articles up out of view
    targets[i].addEventListener("click", doCoolStuff);
  }
  // set initial article and position bubble slider on first tab 
  gsap.set(articles[0], {y:0, opacity:1, zIndex:2});
  gsap.set(".slider-tab", {x:targets[0].offsetLeft, width:targets[0].offsetWidth});
  gsap.set(targets[0], {color:"#1a1815"});
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
      animation.to(targets[old], {color:"#a29f9c", ease:"none"}, 0);
      animation.to(targets[activeTab], {color:"#1a1815", ease:"none"}, 0);
      // slide current article down out of view and then set it to starting position at top
      animation.to(articles[old], {y:0, zIndex:1, opacity:0, ease:"power2.in" }, 0);
      animation.set(articles[old], {y:0[old]});
      // resize article block to accommodate new content
      animation.to(".article-block", {height:heights[activeTab]});
      // slide in new article
      animation.to(articles[activeTab], {duration: 0.3, zIndex:2, opacity:1, y:0, ease: "power2.out"}, "-=0.25");
    }
  }
    
  window.addEventListener('resize', function(){
    gsap.to(".slider-tab", {x:targets[activeTab].offsetLeft, width:targets[activeTab].offsetWidth});
   console.log("SLIDE TABS ON PLACE TRAVEL");
  });
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
});
}

/*
================================================================================
LOGO MARQUEE
================================================================================
*/

function logoMarquee() {

  //Change width and time on your desire

initMarquee(250, 70)

function initMarquee(boxWidth, time) {
    const boxElement = $('.logo-box');
    const boxLength = boxElement.length;
    const wrapperWidth = boxWidth * boxLength;
    const windowWidth = $(window).width();

    boxElement.parent().css('left', '-' + boxWidth + 'px');
    boxElement.css('width', boxWidth + 'px');

    gsap.set(".logo-box", {
        x: (i) => i * boxWidth
    });

    gsap.to(".logo-box", {
        duration: time,
        ease: "none",
        x: "-=" + wrapperWidth,
        modifiers: {
            x: gsap.utils.unitize(
                function (x) {
                    return parseFloat(x + windowWidth + boxWidth) % wrapperWidth
                }
            )
        },
        repeat: -1
    });
  }
}
 
/*
================================================================================
WEBFLOW INTERACTIONS REINIT
================================================================================
*/

function webflowInteractions() {
  Webflow.ready();
  Webflow.require('ix2').init();
  console.log("WEBFLOW RELOADED");
}

/*
================================================================================
AUTO YEAR UPDATE
================================================================================
*/
function yearUpdate() {
  const year = new Date().getFullYear();
  $('.year').text(year);
}

/*
================================================================================
SWIPER PROJECT SOLO
================================================================================
*/

function swiperSolo() {
	var swiper = new Swiper(".swiper-container-solo", {
		loopedSlides: 6,
		loop: true,
		spaceBetween: 24,
		slidesPerView: 1,
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
		// centeredSlides: true,
		// slidesOffsetBefore: 100,
		speed: 1000,
		breakpoints: {
			500: {
				spaceBetween: 24,
				//  loopedSlides: 3,
				slidesPerView: 1,
			},
			1e3: {
				loopedSlides: 3,
				spaceBetween: 24,
				slidesPerView: 1.1,
			},
			1200: {
				spaceBetween: 24,
				slidesPerView: 1.2,
			},
		},
	});
}


/*
================================================================================
START/STOP VIDEO INOUT OF VIEWPORT
================================================================================
*/

function startStopVideo() {


const videos = gsap.utils.toArray('video')

videos.forEach(function(video, i) {
    
  ScrollTrigger.create({
    trigger: video,
    scroller: ".smooth-scroll",
    start: 'top bottom',
    end: 'bottom top',
    onEnter: () => video.play(),
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });
  
})
}

/*
================================================================================
CUBERTO CURSOR
================================================================================
*/
function cubertoCursor() {


var mq = window.matchMedia( "(min-width: 1025px)" );
if (mq.matches) {


setTimeout(() => {

  const xhide = document.querySelector('.my-image');
  const cursor = new MouseFollower({
         el: null,
        container: '.barba-container',
        className: 'mf-cursor',
        innerClassName: 'mf-cursor-inner',
        textClassName: 'mf-cursor-text',
         mediaClassName: 'mf-cursor-media',
        mediaBoxClassName: 'mf-cursor-media-box',
        iconSvgClassName: 'mf-svgsprite',
        iconSvgNamePrefix: '-',
        iconSvgSrc: '',
      dataAttr: 'cursor',
      hiddenState: '-hidden',
      textState: '-text',
      iconState: '-icon',
      activeState: '-active',
      mediaState: '-media',
      stateDetection: {
          '-pointer': 'a,button',
          '-hidden': 'my-image'
      },
      visible: true,
      visibleOnState: false,
      speed: 0.55,
      ease: 'expo.out',
      overwrite: true,
      skewing: 2,
      skewingText: 2,
      skewingIcon: 2,
      skewingMedia: 2,
      skewingDelta: 0.001,
      skewingDeltaMax: 0.15,
      stickDelta: 0.15,
      //showTimeout: 20,
      hideOnLeave: true,
      hideTimeout: 300,
      hideMediaTimeout: 300
     
  });
  
  
  /* function destroyCursor() {
  cursor.destroy();
  console.log("Cursor destroyed EEEEEEEEEEEE");
  } */
  
  /*
  xhide.addEventListener('mouseenter', () => {
     // cursor.hide();
      // cursor.addState('-inverse'); // you can pass multiple states separated by whitespace
  });
  
  xhide.addEventListener('mouseleave', () => {
    //  cursor.show();
      // cursor.removeState('-inverse');
  });
  
  
  // FIXED MAGNETIC ELEMENT
  const box = document.querySelector('.menuu');
  const el = document.querySelector('.myfixedelement');
  
  box.addEventListener('mouseenter', () => {
      cursor.setStick(el);
  });
  
  box.addEventListener('mouseleave', () => {
      cursor.removeStick();
  });
  */
  }, 100);

  

}
else {
  console.log("CUB MOUSE IS OFF");
}    




}




/*
================================================================================
HERO PANEL ANIMATIONS
================================================================================
*/
function heroPanelAnimation() {

gsap.set(".home-hero-video", {opacity:1, scale:1.2})
//gsap.set(".red-flag", {yPercent:100})


/* FIRST ----------------------------- */

var tlin = gsap.timeline({});

mySplitText = new SplitText(".head-split", {
  type: "words, lines, chars", linesClass: "clip-text"
});

tlin.fromTo(mySplitText.chars, {autoAlpha: 0, yPercent: 100}, {
  autoAlpha: 1,
  yPercent: 0,
 // duration: 0.8,
  ease: "power2",
  stagger: {
    each: 0.01,
    from: "random"
  }
}, 0.4)


.to(".home-hero-video, .cta__slider", {scale:1}, 0.3)
.fromTo(".headhead", {xPercent:20}, {xPercent:60, duration: 0.8}, 0.4)
.fromTo(".navin", {yPercent:100}, {yPercent:0, stagger:0.02}, 0.4)
.fromTo(".hamby", {yPercent:100, opacity:0}, {yPercent:0, stagger:0.02, opacity:1}, 0.4)
 


/* SECOND ----------------------------- */
var tlout = gsap.timeline({
  scrollTrigger: {
    scroller: ".smooth-scroll",
    trigger: ".section-home-hero",
    start: "top top",
    end: "bottom top",
    markers: true,
    pin: ".section-home-hero",
    pinSpacing: false,
  //  toggleActions: "restart none none none"
    toggleActions: "restart reverse play reverse"
  }
});

tlout.to(".home-hero-video, .cta__slider", {
  opacity:1,

}, 0.2); 


/* THIRD ----------------------------- */

  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: ".home-hero_component",
      start: "top top",
    end: "bottom top",
     // markers: true,
     // pin: ".section-home-hero",
     // pinSpacing: false,
    //  toggleActions: "restart none none none"
      toggleActions: "restart reverse play reverse"
    }
  });


tl.to(".home-hero-video, .cta__slider", {
  opacity:0.4,

}, 0.2); 


/* .fromTo(mySplitText.chars, {autoAlpha: 0, delay: 1, yPercent: 100}, {
  autoAlpha: 1,
  yPercent: 0,
  duration: 1,
  ease: "power2",
  stagger: {
    each: 0.02,
    from: "random"
  }
}, 0.2); 
 */

}


/*
================================================================================
PROJECT OBSERVER
================================================================================
*/

function productObserver() {


  let sections = document.querySelectorAll(".project-slide"),
  images = document.querySelectorAll(".back"),
  headings = gsap.utils.toArray(".head-split"),
  outerWrappers = gsap.utils.toArray(".outer"),
  innerWrappers = gsap.utils.toArray(".inner"),
  splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text"})),
  currentIndex = -1,
  wrap = gsap.utils.wrap(0, sections.length - 1),
  animating;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
index = wrap(index); // make sure it's valid
animating = true;
let fromTop = direction === -1,
    dFactor = fromTop ? -1 : 1,
    tl = gsap.timeline({
      defaults: {duration: 1, ease: "power2.inOut"},
      onComplete: () => animating = false,
    });
if (currentIndex >= 0) { // The first time this function runs, current is -1
  gsap.set(sections[currentIndex], { zIndex: 0 });
  tl.to(images[currentIndex], { yPercent: -15 * dFactor })
    .set(sections[currentIndex], { autoAlpha: 0 });
}
gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
tl.fromTo([outerWrappers[index], innerWrappers[index]], {yPercent: i => i ? -100 * dFactor : 100 * dFactor}, { yPercent: 0 }, 0)
  .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
  .fromTo(splitHeadings[index].chars, {autoAlpha: 0, yPercent: 200 * dFactor}, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2",
      stagger: {
        each: 0.02,
        from: "random"
      }
    }, 0.2);

currentIndex = index;
}

Observer.create({
type: "wheel,touch,pointer",
wheelSpeed: -1,
onDown: () => {
  !animating && gotoSection(currentIndex - 1, -1)
},
onUp: () => {
  !animating && gotoSection(currentIndex + 1, 1)
},
tolerance: 5,
dragMinimum:10,
wheelSpeed: 2,
preventDefault: true,
});

gotoSection(0, 1);

}

