/* simpTooltip - Arthur Camara */
(function ($) {
    $.extend({
        simpTooltip: function (options) {
            var defaults = {
                position_x: -20,
                position_y: 30,
                target: "[data-simptooltip]",
                extraClass: ""
            };
            options = $.extend(defaults, options);
            var targets = $(options.target);

            console.log(targets);

            var xOffset = options.position_x;
            var yOffset = options.position_y;
            targets.hover(function (e) {
                var t = $(this).attr('data-simptooltip');
                $("body").append("<div id='simpTooltip' class='simpTooltip " + options.extraClass + "'>" + t + "</div>");
                $("#simpTooltip").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px").fadeIn("fast");
            }, function () {
                $("#simpTooltip").remove();
            });
            targets.mousemove(function (e) {
                $("#simpTooltip").css("top", (e.pageY + yOffset) + "px").css("left", (e.pageX + xOffset) + "px");
            });
        }
    });
})(jQuery);