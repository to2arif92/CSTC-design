$(document).ready(function () {

    /*
        Hide Navbar --- Waypoints.js config
    */
    // toggle "navbar-no-bg" class
    $('.hide-nav').waypoint(function () {
        $('nav').toggleClass('navbar-no-bg');
    });

    /*
        Background slideshow
    */
    //$('.top-content').backstretch("img/backgrounds/2.jpg");

    /*$('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });*/

    /*
        Wow
    */
    //new WOW().init();


    // Slider --- Slick.js config
    $('.js-slick').slick({
        autoplay: true,
        autoplaySpeed: 10000,
        arrows: false,
        dots: true,
        draggable: false,
        fade: true,
        speed: 1000,
        swipe: true,
        touchMove: true
    });

    $('.js-slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(slick.$slides).removeClass('is-animating');
    });

    $('.js-slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $(slick.$slides.get(currentSlide)).addClass('is-animating');
    });
});
