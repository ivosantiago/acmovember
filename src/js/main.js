$(function(){

	//bind parallax effect to scroll
	$(window).bind('scroll',function(e){

		var scrolledY = $(window).scrollTop();

   		
		$('#header').parallaxScroll({
			factor: 0.4,
    		scrollType: 'background'
		});

   	});

   	//trigger flipshow
   	$('.fc-slideshow').flipshow();

   	//tooltip with names
    $.simpTooltip({
			position_x: 10,
			position_y: 10
	  });

	  //links
	  var inplacelinks = $(".inplace_link");
    inplacelinks.each(function () {
	  		var t = $(this).attr('href');
        $(this).click(function (e) {
        		e.preventDefault();
            go_to($(t));
        });
    });
 
});

//animation in page
function go_to(destination) {
    var body = $('body');
    body.data("scrolling", true);
    $('html, body').animate({
        scrollTop: destination.offset().top
    }, 800, 'easeInOutExpo', function () {
        body.data("scrolling", false);
    });
}