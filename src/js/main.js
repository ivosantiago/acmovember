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
 
});