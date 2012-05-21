/*!
 *
 * Avalanche
 * Like the world needs another slider
 * Author: Derek Wheelden
 * Requires: jQuery 1.6+
 *
 * Copyright (c) 2012, Derek Wheelden (derek[dot]wheelden[at]gmail[dot]com)
 *
 */

;(function ( $, window, document, undefined ) {

    $.fn.avalanche = function( options ) {

        var settings = {
            $element      : this,
            slideDuration : 1000
        };

        options && $.extend(settings, options);

        var properties = {
            sliderWidth  : settings.$element.width(),
            sliderHeight : settings.$element.height(),
            slideCount   : $(settings.$element).find(".slide").length,
            position     : 0
        };

        var methods = {
            moveSlides : function () {

                $(settings.$element).find(".slide").each(function(index) {
                    $(this).css({
                        position : 'absolute',
                        left : properties.sliderWidth * index
                    });
                });

            },
            buildUI : function () {

                $('<div/>', {
                        'class' : 'bulletContainer'
                }).appendTo('.slider');

                for (var i = 0; i < properties.slideCount; i++) {
                    var slideOffset = i * properties.sliderWidth * -1,
                        firstBullet = (!i) ? ' active' : '';

                    $('<span/>', {
                        'class'       : 'bullet' + firstBullet,
                        'data-offset' : slideOffset,
                        'html'        : '&bull;',
                        click         : function() {
                            methods.switchSlides(this);
                        }
                    }).appendTo('.bulletContainer');

                }

            },
            switchSlides : function (that) {

                var offset = $(that).attr('data-offset');
                            
                $('.active').removeClass('active');
                $(this).addClass('active');
                $('.slideContainer').animate({ left: offset }, settings.slideDuration);

            }
        };

        return this.each(function() {

            if (properties.slideCount > 1) {
                methods.moveSlides();
            }

            methods.buildUI();

        });

    };

})( jQuery, window, document );