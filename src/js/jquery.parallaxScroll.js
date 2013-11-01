/* parallaxScroll - Arthur Camara */

(function ($) {
 
    $.fn.parallaxScroll = function(options) {

    	var defaults = {
    		factor: 0.2,
    		scrollType: 'top'
    	};

    	var settings = $.extend( defaults, options );

    	var scrolledY = $(window).scrollTop();

    	if(settings.scrollType === 'background') {
    		this.css('background-position','center -'+((scrolledY*settings.factor))+'px');
    	} else {
    		this.css(settings.scrollType,'-'+((scrolledY*settings.factor))+'px');
    	}
        return this;
    };

    $.parallaxScroll = function() {

        $(window).bind('scroll',function(e){
        
            $('.parallax').each(function() {

                //set options according to data attributes
                var options = {};
                var attrs = ["factor", "scrollType"];
                for(var i=0, size=attrs.length; i<size; i++) {
                    var attribute = attrs[i];
                    if($(this).attr('data-'+attribute)) {
                        options[attribute] = $(this).data(attribute);
                    }
                }
                
                $(this).parallaxScroll(options);
            });

        });

    }
 
}(jQuery));