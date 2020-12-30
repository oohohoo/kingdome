<!-- Advanced Forms Code -->
<script src="https://cdn.jsdelivr.net/gh/brotame/advanced-webflow-forms@1.1/dist/awf.js"></script>

<!-- Advanced Forms Init -->

var Webflow = Webflow || [];
Webflow.push(function () {
  new AWF.MSF({hiddeButtonsOnSubmit: true, scrollTopOnStepChange: false, formSelector: '#msf', nextSelector: '#msf-next'});
  
});





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






// CLEVER MARQUEE
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


/*

// SWIPER 2 SA MOUSEWHEEL SPEEDOM


(function() {

    var swiper2;

    var options = {
        speed: 300,
         freeMode: true,
        direction: 'horizontal',
        loop: true,
        	 grabCursor: true,
       // slidesPerView: 'auto',
        loopedSlides: 11,
          mousewheel: {
          eventsTarget:'.swiper-wrapper2',
    //invert: true,
    //sensitivity: 0.7,
  },
        //centerSlides: true,
        /*effect: 'coverflow',
        coverflow: {
            rotate: 10,
            stretch: 10,
            depth: 200,
            modifier: 1,
            slideShadows: true
        },*/
        
        /*
        watchSlidesVisibility: true
    };

    swiper2 = new Swiper('.swiper-container2', options);


    window.addEventListener('mousewheel', mousewheel);
    window.addEventListener('DOMMouseScroll', mousewheel);

    function mousewheel(event) {
        var offset;
        if (event.wheelDelta) {
            offset = event.wheelDelta;
        } else {
            offset = event.detail * -30;
        }
        setWrapperTranslate(swiper, offset);
    }

    function setWrapperTranslate(swiper, delta) {
        var translate = swiper2.getWrapperTranslate() - delta;
        var sequence = swiper2.virtualSize / 3;

        if (translate < 0) {
            swiper2.setWrapperTranslate((translate) % sequence - sequence);
        } else if (translate > 0) {
            swiper2.setWrapperTranslate((translate) % sequence - sequence*2);
        }

        swiper2.update();
    }
})();




*/



/* BACKUP NNOVI */
// CLEVER MARQUEE
/*
$('.swiper-wrapper .swiper-slide').clone().appendTo(".swiper-wrapper");

gsap.to( $(".swiper-slide"), 
    {
    duration:20,
    //x: 'auto',
  	// x: -( $('.swiper-slide').width() ), 
      x: -( $('img').width() ),
     ease: "none", 
     repeat: -1
    }
);
*/


/*
/// --- SWIPER + MARQUEE

let SwiperTop = new Swiper('.swiper-top', {
  spaceBetween: 0,
  centeredSlides: true,
  speed:2000,
  autoplay: {
    delay: 1,
  },
  loop: true,
  grabCursor: true,
  slidesPerView:'5',
  allowTouchMove: true,
  disableOnInteraction: false
});


*/
/*
// MANFRED MARQUEEE GSAP 3
gsap.set('.swiper-wrapper',{xPercent:-50,yPercent:-50})
// gsap.set('#no02',{y:50})
// gsap.set('#no03',{y:120})

var boxWidth = 250,
    totalWidth = boxWidth * 11,  //  * n of boxes
    no01 = document.querySelectorAll("#no01 .swiper-slide"),
    dirFromLeft = "+=" + totalWidth,
    dirFromRight = "-=" + totalWidth;

var mod = gsap.utils.wrap(0, totalWidth);

function marquee(which, time, direction){
  gsap.set(which, {
    x:function(i) {
      return i * boxWidth;
    }
  });
  var action = gsap.timeline()
  .to(which,  {
  x: direction,
  modifiers: {
    x: x => mod(parseFloat(x)) + "px"
  },
    duration:time, ease:'none',
    repeat:-1,
  });
  return action
}

var master = gsap.timeline()
.add(marquee(no01, 15, dirFromRight), 1)
*/


/*

//MARQUEE GALLERY MOVE
jQuery(function($){ 

    $(".swiper-wrapper").each(function(ix, ex){
            var $tickerWrapper = $(ex);
			var $list = $tickerWrapper.find(".swiper-wrapper");
			var $clonedList = $list.clone();
			var listWidth = 10;

			$list.find("li").each(function (i) {
						listWidth += $(this, i).outerWidth(true);
			});

			var endPos = $tickerWrapper.width() - listWidth;

			$list.add($clonedList).css({
				"width" : listWidth + "px"
			});

			$clonedList.addClass("cloned").appendTo($tickerWrapper);

			//TimelineMax
			var infinite = new gsap.timeline({repeat: -1, paused: true});
			var time = 30;

			infinite
			  .fromTo($list, time, {rotation:0.01,x:0}, {force3D:true, x: -listWidth, ease: Linear.easeNone}, 0)
			  .fromTo($clonedList, time, {rotation:0.01, x:listWidth}, {force3D:true, x:0, ease: Linear.easeNone}, 0)
			  .set($list, {force3D:true, rotation:0.01, x: listWidth})
			  .to($clonedList, time, {force3D:true, rotation:0.01, x: -listWidth, ease: Linear.easeNone}, time)
			  .to($list, time, {force3D:true, rotation:0.01, x: 0, ease: Linear.easeNone}, time)
			  .progress(1).progress(0)
			  .play();

			//Pause/Play        
			$tickerWrapper.on("mouseenter", function(){
				infinite.pause();
			}).on("mouseleave", function(){
				infinite.play();
			});
    });    			
});		

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

/*
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

*/
// --- 



// contact form


