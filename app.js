
gsap.registerPlugin(ScrollTrigger);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

//const sections = selectAll('.rg__column');

// create hover effect for each portfolio navigation item
/*const allLinks = gsap.utils.toArray('.portfolio__categories a');
const pageBackground = select('.fill-background');
const largeImage = select('.portfolio__image--l');
const smallImage = select('.portfolio__image--s');
const lInside = select('.portfolio__image--l .image_inside');
const sInside = select('.portfolio__image--s .image_inside');
*/
const loader = select('.loader');
const loaderInner = select('.loader .inner');
const progressBar = select('.loader .progress');
const loaderMask = select('.loader__mask');

// images loaded
function init(){

    // show loader on page load
    gsap.set(loader, {autoAlpha: 1});

    // scale loader down
    gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: 'bottom'});

    // make a tween that scales the loader
    const progressTween = gsap.to(progressBar, {paused: true, scaleX: 0, ease: 'none', transformOrigin: 'right'});

    // setup variables
    // https://codepen.io/desandro/pen/hlzaw
    let loadedImageCount = 0, imageCount;
    const container = select('#main');

    // setup Images loaded
    const imgLoad = imagesLoaded( container );
    imageCount = imgLoad.images.length;

    // set the initial progress to 0
    updateProgress(0);

    // triggered after each item is loaded
    imgLoad.on( 'progress', function() {
        // increase the number of loaded images
        loadedImageCount++;
        // update progress
        updateProgress( loadedImageCount );
    });

    // update the progress of our progressBar tween
    function updateProgress( value ) {
        // console.log(value/imageCount)
        // tween progress bar tween to the right value
        gsap.to(progressTween, {progress: value/imageCount, duration: 0.3, ease: 'power1.out'})
    }

    // do whatever you want when all images are loaded
    imgLoad.on( 'done', function( instance ) {
        // we will simply init our loader animation onComplete
        gsap.set(progressBar, {autoAlpha: 0, onComplete: initPageTransitions});
    });

}

init();

function pageTransitionIn({container}) {
    // console.log('pageTransitionIn');
    // timeline to stretch the loader over the whole screen
    const tl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: 'power1.inOut'
        }
    });
    tl
        .set(loaderInner, { autoAlpha: 0 })
        .fromTo(loader, { yPercent: -100 }, {yPercent: 0 })
        .fromTo(loaderMask, { yPercent: 80 }, {yPercent: 0 }, 0)
        .to(container, { y: 150}, 0);
    return tl;
}

function pageTransitionOut({container}) {
    // console.log('pageTransitionOut');
    // timeline to move loader away down
    const tl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: 'power1.inOut'
        },
        onComplete: () => initContent()
    });
    tl
        .to(loader, { yPercent: 100 })
        .to(loaderMask, { yPercent: -80 }, 0)
        .from(container, { y: -150}, 0);
    return tl;
}

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

    barba.init({
        transitions: [{
            once() {
                // do something once on the initial page load
                initLoader();
            },
            async leave({current}) {
                // animate loading screen in
                await pageTransitionIn(current);
            },
            enter({next}) {
                // animate loading screen away
                pageTransitionOut(next);
            }
        }]
    });
}

function initLoader() {
    
    const tlLoaderIn = gsap.timeline({
        id: 'tlLoaderIn',
        defaults: {
            duration: 1.1,
            ease: 'power2.out'
        },
        onComplete: () => initContent()
    });

    const image = select('.loader__image img');
    const mask = select('.loader__image--mask');
    const line1 = select('.loader__title--mask:nth-child(1) span');
    const line2 = select('.loader__title--mask:nth-child(2) span');
    const lines = selectAll('.loader__title--mask');
    const loaderContent = select('.loader__content');

    tlLoaderIn
        .set(loaderContent, {autoAlpha: 1})
        .to(loaderInner, {
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'power1.inOut'
        })
        .addLabel('revealImage')
        .from(mask, {yPercent: 100}, 'revealImage-=0.6')
        .from(image, {yPercent: -80}, 'revealImage-=0.6')
        .from([line1, line2], {yPercent: 100, stagger: 0.1}, 'revealImage-=0.4');

    const tlLoaderOut = gsap.timeline({
        id: 'tlLoaderOut',
        defaults: {
            duration: 1.2,
            ease: 'power2.inOut'
        },
        delay: 1
    });
    
    tlLoaderOut
        .to(lines, {yPercent: -500, stagger: 0.2}, 0)
        .to([loader, loaderContent], {yPercent: -100}, 0.2)
        .from('#main', {y: 150}, 0.2);

    const tlLoader = gsap.timeline();
    tlLoader
        .add(tlLoaderIn)
        .add(tlLoaderOut);

}



function initContent() {

    select('body').classList.remove('is-loading');
    initSmoothScrollbar();
    initNavigation();
    initHeaderTilt();
    initHoverReveal();
    initPortfolioHover();
    initImageParallax();
    initPinSteps();
    initScrollTo();

}

/*
const updateBodyColor = (color) => {
    // gsap.to('.fill-background', { backgroundColor: color, ease: 'none'});
    document.documentElement.style.setProperty('--bcg-fill-color', color);
}
const getTextHeight = (textCopy) => {
    return textCopy.clientHeight;
}
*/


// provjeri, ali mislim da ode idu svi ovi scroll trigger init i smoothscroll



//function init(){
    
  // start here


// PLAY WHEN ALL CONTENT LOADED
//document.addEventListener ('DOMContentLoaded', ()=> {

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
  gsap.set(".close", {autoAlpha:0})
  //gsap.set(".line-wrapper", {yPercent:100})

	tl.fromTo(".nav-wrapper", {height: "0%", transformOrigin: "top center"}, {duration: 0.1, height: "100%"})
		.to(".fs-menu--column", {yPercent:0, duration:0.5, stagger:0.1, ease: "Expo.inOut"}, "<")
		.to(".open", {autoAlpha:0}, "<")
		.to(".close", {autoAlpha:1}, "<")
    
		.to(".line-wrapper", {yPercent:30, stagger:0.1, duration:0.4, ease: "power1.out"}, "<0.1")
		.from(".nav-wrap", {yPercent:100, stagger:0.05, opacity:0, duration:0.4, ease: "power1.out"}, "<0.1")
		.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.1")
    
    .set(".nav-wrapper, .nav-toggle", {pointerEvents: "all"}, "<")

}
// --- SHOW
function hide() {
	let tl = gsap.timeline();

	gsap.set(".nav-wrapper, .nav-toggle", {pointerEvents: "none"});

		tl.fromTo(".fs-menu--column", {yPercent:0}, {yPercent:-100, duration:0.4, stagger:0.05, ease: "Expo.inOut"})
		.to(".nav-wrapper", { duration: 0.1, transformOrigin: "top center", height: "0%"})
		.to(".open", {autoAlpha:1}, "<")
		.to(".close", {autoAlpha:0}, "<")
    
		.set(" .nav-toggle", { pointerEvents: "all"});
	
}


//-------
// SUPERSCRIPT MOUSEOVER // ISTA ANIMACIJA VIŠE ELEMENATA / LOOP
// loop through each element
$(".link-wrapper").each(function(i, el) {
// set some individual properties
//TweenMax.set($(el).find('.back'), {backgroundColor:'#' + Math.floor(Math.random() * 16777215).toString(16)});
  
// create a timeline for this element in paused state
  var tl = gsap.timeline({paused: true});
  // create your tween of the timeline in a variable
  var t = tl
         //.set(el,{willChange:"transform"})
         //.set($(el).find('.wrap'), {zIndex: 2, overwrite:"all"})
         .from($(el).find('.superscript'), {y:"20px", autoAlpha:0, duration: 0.3, overwrite:"all", ease: "power1.out"})
         .to($(el).find('.main-link'), {duration: 0.3, overwrite:"all", ease: "power1.out"}, "<");
  // store the tween timeline in the javascript DOM node
  el.animation = t;
  //create the event handler
  $(el).on("mouseenter",function(){
    this.animation.play();
  }).on("mouseleave",function(){
    this.animation.reverse();
  });
});
//-------

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
//-------
// LANGUAGE - CHANGE COLOR HOVER / LOOP / ista skripta ko ova poviše ali bez komentara
// loop through each element
$(".lang-wrap").each(function(i, el) {
  var tl = gsap.timeline({paused: true});
  var t = tl
         .fromTo($(el).find('.language'), {color: "#000000"}, {color: "#E51E3D", duration: 0.15});
el.animation = t;
$(el).on("mouseenter",function(){
    this.animation.play();
  }).on("mouseleave",function(){
    this.animation.reverse();
  });
});
//-------

/*
// UNDERLINE
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
let workLinks = document.querySelectorAll(".link-wrapper");

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

 */

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

//}) // DOM CONTENT LOADED - close





// --- 017 - LOCOMOTIVE SCROLL TO  --------------------------------------------------------------------------


// --- 017 - LOCOMOTIVE 4.0 SCROLL TO  --------------------------------------------------------------------------
$( "#totop" ).on( "click", function() {
	locoScroll.scrollTo( '#start', {
		'offset': 0,
		'duration': 1000,
		//'easing': [0.25, 0.00, 0.35, 1.00],
		'disableLerp': true
	});
	});
	


/*

// 02 MARQUE GALLERY - CLEVER MARQUEE -- under construction
$('.swiper-wrapper .swiper-slide').clone().appendTo(".swiper-wrapper");

gsap.to( $(".swiper-slide"), 
    {
    duration:40,
    //x: 'auto',
  	// x: -( $('.swiper-slide').width() ), 
      x: -( $(".swiper-slide").width() ),
     ease: "none", 
     repeat: -1
    }
);



*/






/*}

window.addEventListener('load', function(){
  init();
});

*/



// YOUTUBE WRAPPER -------
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
  toggleState(tl_2)
})

function toggleState(tl) {
  tl.reversed() ? tl.play() : tl.reverse()
}

function toggleState(tl_2) {
  tl_2.reversed() ? tl_2.play() : tl_2.reverse()
}

// --- 020 - YOUTUBE CROP + FULLSCREEN bez YT pizdarija  --------------------------------------------------------------------------

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

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
     /* autoplay:1,
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


function onPlayerStateChange(event) {
  console.log("player state: " + player.getPlayerState());
}

function updateVideoId() {
  let videoId = document.getElementById("videoId").value;
  player.loadVideoById(videoId, -1);
}

function stopVideo() {
  player.stopVideo();
}

// BOTUNI ZA PLAY STOP
 // 3. The API calls this function when the video player is ready.
    function onPlayerReady(event) {
        $('#play-button').click(function(event){
            player.playVideo();
        });
    }

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


/* ODVOJENI PLAY STOP BOTUNI
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




