gsap.registerPlugin(ScrollTrigger);

let locoScroll;

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader = select('.loaderx');
const loaderInner = select('.inner-loader');
const progressBar = select('.progress');
const loaderMask = select('.loader__mask');

function init() {

  // show loader on page load
  gsap.set(loader, {autoAlpha: 1});

  // scale loader down
  gsap.set(loaderInner, {scaleY: 0.025, transformOrigin: 'bottom'});

  // make a tween that scales the loader
  const progressTween = gsap.to(progressBar, {paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right'});

  // --- IMAGES LOADED
  // setup variables
  let loadedImageCount = 0,
    imageCount;
  const container = select('.smooth-scroll');

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

// PRELOADER INIT
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
    .set(".main", {y: 150})

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
    .to('.main', {y: 0}, 0);

  const tlLoader = gsap.timeline();
  tlLoader
    .add(tlLoaderIn)
    .add(tlLoaderOut);
}

// INIT CONTENT
function initContent() {

  select('body').classList.remove('is-loading');
  initLocomotiveScroll();
console.log("CONTENT FUNCTIONS LOADED");

  //initNavigation();
  //initHeaderTilt();

}
//
// LOCOMOTIVESCROLL
function initLocomotiveScroll() {


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
    getDirection: true,
    scrollFromAnywhere: true,

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
    // pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  /*
  ================================================================================
  SCROLLTRIGGER TEST
  ================================================================================
 */
  gsap.utils.toArray('.block1').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        markers: true,
        scroller: '[data-scroll-container]',
        start: 'top bottom',
        end: "top top",
      },
      y: 100,
      opacity: 0
    })
  });
}

// HOME ANIMATIONS

function homeanimations() {
 
const mask = select('.b-img');
const text = select('.b-header');

const tl = gsap.timeline({
defaults: {
	duration: 0.9, ease: 'power4.out'
}
});

tl
   .from(mask, {rotate:45});
   console.log("image mask shit");
   return tl
}        

/*
BARBA
*/

// BARBA PAGE IN
function pageTransitionIn({
  container
}) {
 // console.log('pageTransitionIn');
  // timeline to stretch the loader over the whole screen
  const tl = gsap.timeline({defaults: {duration: 0.8,ease: 'power1.inOut'} });
  tl
    .set(loaderInner, {autoAlpha: 0})
    .fromTo(loader, {yPercent: -100}, {yPercent: 0})
    .fromTo(loaderMask, {yPercent: 80}, {yPercent: 0}, 0)
    .to(container, {y: 150}, 0);

  return tl;
}

// ---  BARBA PAGE OUT
function pageTransitionOut({
  container
}) {
  //console.log('pageTransitionOut');
  // timeline to move loader away down
  const tl = gsap.timeline({defaults: {duration: 0.8,ease: 'power1.inOut'},
    onComplete: () => initContent()
  });
  tl
    .to(loader, {yPercent: 100})
    .to(loaderMask, {yPercent: -80}, 0)
    .from(container, {y: -150}, 0);
  return tl;
}

// ---  BARBA PAGE TRANS
function initPageTransitions() {
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
  });

// -- BARBA INIT
  barba.init({
   debug: true,
    transitions: [{once() {
        // do something once on the initial page load
        initLoader();
     		homeanimations();
       
        
         console.log("MAKNI FOTKU");
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

      beforeEnter({next}) {
        console.log("BEFORE ENTER");
    //   ScrollTrigger.refresh();
   // destroy all ScrollTriggers
      // ScrollTrigger.getAll().forEach(t => t.kill());
      //  console.log("scrolltrigger killed");
      },
      
       afterEnter({next}) {
        homeanimations();
console.log("HOME ANIMATIONS LOADED");
        console.log("AFTER ENTER");

      }

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

  function init() {
    initLoader();
  }
}