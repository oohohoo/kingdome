

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

$('swiper-container').on('mousedown touchstart', function(event) {
  gsap.to('.swiper-slide', {scale: 0.6, duration: 0.2});
  
});

$('.swiper-container').on('mouseup touchend', function(event) {
 gsap.to('.swiper-slide', {scale:1, duration: 0.4, delay:0.3});
});


