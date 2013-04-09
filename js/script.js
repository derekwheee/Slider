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
            $element          : this,
            slideDuration     : 3000,
            animationDuration : 1000,
            stopOnClick       : false
        };

        options && $.extend(settings, options);

        var properties = {
            sliderWidth  : settings.$element.width(),
            sliderHeight : settings.$element.height(),
            slideCount   : $(settings.$element).find(".slide").length,
            position     : 0,
            makeSlide    : null
        };

        var methods = {
            positionSlides : function () {

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
                            methods.manualSlide(this);
                        }
                    }).appendTo('.bulletContainer');

                }

            },
            createInterval : function() {
                clearInterval(properties.makeSlide);
                properties.makeSlide = setInterval(function() {
                    methods.autoSlide();
                }, settings.slideDuration);
            },
            manualSlide : function (that) {

                var offset = $(that).attr('data-offset');

                $('.active').removeClass('active');
                $(that).addClass('active');
                $('.slideContainer').animate({ left : offset }, settings.animationDuration);

                if (settings.stopOnClick) {
                    clearInterval(properties.makeSlide);
                } else {
                    methods.createInterval();
                }

            },
            autoSlide : function () {

                var currentPosition = parseInt($('.slideContainer').css("left")) || 0,
                    offset          = properties.sliderWidth,
                    maxOffset       = properties.sliderWidth * (properties.slideCount - 1) * -1;

                if (currentPosition !== maxOffset) {
                    $('.slideContainer').animate({ left : currentPosition - offset }, settings.animationDuration);
                    $('.bulletContainer .active')
                        .removeClass('active')
                        .next()
                        .addClass('active');
                } else {
                    $('.slideContainer').animate({ left : 0 }, settings.animationDuration);
                    $('.bulletContainer > span')
                        .removeClass('active')
                        .first()
                        .addClass('active');
                }

            }

        };

        return this.each(function() {

            if (properties.slideCount > 1) {
                methods.positionSlides();
                methods.createInterval();
            }

            methods.buildUI();

        });

    };

})( jQuery, window, document );