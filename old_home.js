

gsap.registerPlugin(ScrollTrigger);

// --- SMOOTH SCROLL -----------------------------------------

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
  getDirection: true,
  scrollFromAnywhere: true,
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










/*
================================================================================
HOME - PRODUCT HOVER 
================================================================================
*/

gsap.set(".rg__long", {autoAlpha:0, yPercent:8});


gsap.utils.toArray(".rg__column").forEach(container => {
  let wrap = container.querySelector(".rg__wrap"),
      dome = container.querySelector(".rg__dome"),
      name = container.querySelector(".rg__name"),
      short = container.querySelector(".rg__short"),
      long = container.querySelector(".rg__long"),

      tl = gsap.timeline({ defaults: { duration: 0.3}, 
      paused: true });
  
  
  tl.to(dome, { yPercent: -8, autoAlpha:0 })
  
// .to(wrap, { backgroundColor:"#B6FA00" }, 0)
    .to(wrap, { backgroundColor:"rgba(40, 40, 42, 0.14)" }, 0)
    .to(name, { yPercent:-8, autoAlpha:0 }, 0)
    .to(short, { yPercent:-8, autoAlpha:0 }, 0)
    .to(long, {autoAlpha:1, yPercent:0}, 0);
    
     
  container.addEventListener("mouseenter", () => tl.play() );
  container.addEventListener("mouseleave", () => tl.reverse() );
});

/*
================================================================================
LOGO ANIMACIJA
================================================================================
*/
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
  toggleState(tl_2)
})

function toggleState(tl) {
  tl.reversed() ? tl.play() : tl.reverse()
}

function toggleState(tl_2) {
  tl_2.reversed() ? tl_2.play() : tl_2.reverse()
}

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

