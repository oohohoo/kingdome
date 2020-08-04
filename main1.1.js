
// SMOOTH SCROLL

// --- REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

// --- SMOOTH SCROLL -----------------------------------------

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
  getDirection: true,
  //smoothMobile: true,
  //lerp: .05
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
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

// 

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
    videoId: "jkWWJ9W5300",
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
        spaceBetween: 5,
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


// CUSTOM BOTTUN GETTER SETTER
gsap.set(".customplay", {xPercent: -50, yPercent: -50});

var ball = document.querySelector(".customplay");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var fpms = 60 / 1000;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

gsap.ticker.add((time, deltaTime) => {
  
  var delta = deltaTime * fpms;
  var dt = 1.0 - Math.pow(1.0 - speed, delta); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

