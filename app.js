
// provjeri, ali mislim da ode idu svi ovi scroll trigger init i smoothscroll


function init(){
    
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
  
	tl.fromTo(".nav-wrapper", {height: "0%", transformOrigin: "top center"}, {duration: 0.1, height: "100%"})
		.to(".fs-menu--column", {yPercent:0, duration:0.4, stagger:0.05, ease: "Expo.inOut"}, "<")
		.to(".open", {autoAlpha:0}, "<")
		.to(".close", {autoAlpha:1}, "<")
    
		.from(".main-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<0.3")
		.from(".small-link", {x:-40, stagger:0.1, opacity:0, duration:0.3, ease: "power1.out"}, "<")
		.from(".wg-element-wrapper", {opacity:0, duration:0.3}, "<0.5")
    
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

}

window.addEventListener('load', function(){
  init();
});





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
  ease: "power4.inOut" 
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




