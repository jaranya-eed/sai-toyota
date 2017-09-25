var Main = (function(self) {
    var my = self, func = {},
        currentSlideIndex = 0, lastSlideIndex = 0, nextSlideIndex = 0,
        bannerImagesList = [], waypoints = [], debugColor = ['#90CAF9','#64B5F6','#42A5F5','#2196F3','#1976D2'];

    func.animateBanner = function (idx) {
        $(".banner-slide-wrapper .banner-slide-item").eq(idx).addClass("running");

        setTimeout(function () {
            var nextIndex = idx + 1;
            if (nextIndex >= bannerImagesList.length) {
                nextIndex = 0;
            }
            $(".banner-slide-wrapper .banner-slide-item").eq(nextIndex).addClass("bring-to-next");
            func.animateBanner(nextIndex);

            setTimeout(function () {
                $(".banner-slide-wrapper .banner-slide-item").eq(idx).removeClass("running bring-to-front");
                $(".banner-slide-wrapper .banner-slide-item").eq(nextIndex).removeClass("bring-to-next").addClass("bring-to-front");
            }, 1100);
        }, 5500);
    };

    my.bannerSlideModule = function () {
        if (bannerImagesList.length > 1) {

            $(".banner-section").addClass('ready');
            $(".banner-slide-wrapper .banner-slide-item").eq(0).addClass("bring-to-front");
            func.animateBanner(0);
        } else {
            $(".banner-section").addClass('ready');
        }
    };
    func.waypointEffect = function () {
        var vpw = verge.viewportW(), i, offsetVal = vpw >= 1024 ? '60%' : '90%';

        if (waypoints.length > 0) {
            for (i = 0; i < waypoints.length; i += 1) {
                if (typeof waypoints[i].destroy === "function") {
                    waypoints[i].destroy();
                }
            }
        }
        waypoints = [];

        $('.detail-section .detail-block-wrapper .image-wrapper').each(function (i) {
            var elem = $(this);
            if (!elem.hasClass("no-waypoint")) {
                waypoints[i] = elem.waypoint({
                    handler: function(direction) {
                        if (!$(this.element).parent().hasClass("displayed")) {
                            $(this.element).parent().addClass("displayed");
                        }
                    },
                    offset: offsetVal
                });
            }
        });
    };

    func.detailBlockHandler = function (init) {
        var vpw = verge.viewportW(),
            sectionPaddTop = 100,
            sectionPaddBottom = 70,
            rowBlockGap = 65,
            block0 = $(".detail-block-wrapper").eq(0),
            block1 = $(".detail-block-wrapper").eq(1),
            block2 = $(".detail-block-wrapper").eq(2),
            block3 = $(".detail-block-wrapper").eq(3),
            block4 = $(".detail-block-wrapper").eq(4),
            block2Margin, block3Margin, block4Margin;

        if (vpw >= 1024) {

            block2Margin = (block1.find(".content-wrapper").outerHeight() + 65 + (block1.find(".image-wrapper").outerHeight() * (5/8))) * -1;

            block3Margin = -95;

            block4Margin = (block3.find(".content-wrapper").outerHeight() + 65 + (block3.find(".image-wrapper").outerHeight() * (5/8))) * -1;

            block0.css("top", sectionPaddTop);
            console.log(sectionPaddTop)
            block1.css("top", block0.outerHeight() + sectionPaddTop + rowBlockGap);
            block2.css("top", block1.position().top + (block1.find(".image-wrapper").outerHeight() * (5/8)));
            block3.css("top", block1.position().top + block1.outerHeight() + rowBlockGap);
            block4.css("top", block2.position().top + block2.outerHeight() + rowBlockGap);
        } else {
            var detailBlock = document.querySelectorAll(".detail-block-wrapper"), i;

            for (i = 0; i < detailBlock.length; i += 1) {
                detailBlock[i].style.top = null;
            }
        }

        if (init) {
            setTimeout(function () {
                if (vpw >= 1024) {
                    $(".detail-section").css({
                        height: block4.position().top + block4.outerHeight()
                    });
                } else {
                    $(".detail-section").get(0).style.height = null;
                }

                func.waypointEffect();
            }, 100);
        }
    };

    func.galleryBlockHandler = function () {
        var df = $.Deferred(), vpw = verge.viewportW(), blockHeight, dblBlockHeight;

        setTimeout(function () {
            if (vpw >= 1024) {
                blockHeight = vpw / 4;
            } else if (vpw < 1023 && vpw >= 480) {
                blockHeight = vpw / 2;
            } else {
                blockHeight = vpw;
            }
            dblBlockHeight = blockHeight;

            if (vpw >= 1024) {
                dblBlockHeight = blockHeight * 2;
                dblBlockHeight -= (25 / 350) * blockHeight;
                // $(".gallery-item-wrapper .map-block").css("height", dblBlockHeight);
            } else {
                // $(".gallery-item-wrapper .map-block").get(0).style.height = null;
            }

            $(".gallery-item-wrapper .gallery-item").css("height", blockHeight);
            $(".gallery-item-wrapper .gallery-item.block-height-2").css("height", dblBlockHeight);

            df.resolve(blockHeight);
        }, 1);

        return df.promise();
    };
    func.galleryModule = function () {
        $(".gallery-item").fancybox({
            openEffect	: 'none',
            closeEffect	: 'none'
        });
    };

    func.eventHandler = function () {
        $(window).on("resizestop.global", 200, function () {
            func.galleryBlockHandler();
            // func.detailBlockHandler(true);
        });
        $("select.wide").change(function () {
            var currentValue = $(this).find("option:selected").val();
            $(".filter-menu-list li a.active").removeClass("active");
            $('.filter-menu-list li a[data-filter="' + currentValue + '"]').addClass("active");
            func.applyFilter(currentValue);
        });

        $('.menu-filter').on('click', '.filter', function(e) {
            e.preventDefault();
            var currentValue = $(this).data("filter");
            if (!$(this).hasClass("active")) {
                /* return if current */
                if($(this).hasClass('active')) return;

                /* active current */
                $(this).addClass('active').siblings().removeClass('active');
                //filter by menu
                var filtered = false;
                var wrapper = $(".show-for-large .filter-carousel");
                if (filtered === false) {
                    wrapper.slick('slickUnfilter');
                    wrapper.slick('slickFilter', '.filter-' + currentValue);
                } else {
                    wrapper.slick('slickUnfilter');
                    wrapper.slick('slickFilter', '.filter-' + currentValue);
                    wrapper.slick('slickGoTo', 0);
                }
            }
        });
    };

    func.sliderFilter = function () {
        $('.filter-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            dots: true,
            infinite: true,
            arrows: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }]
        });

        $('.menu-filter .filter').first().trigger('click');

    }

    func.filterDetail = function () {
        $('select:not(.ignore)').niceSelect();
    }

    func.applyFilter = function (category) {
        var wrapper = $(".show-for-small");
        wrapper.find(".detail-block-wrapper").removeClass("display-filter");

        //Get related item first
        wrapper.find('.detail-block-wrapper[data-category="' + category + '"]').addClass("display-filter")

        //Remove old index and set new one
        wrapper.find(".detail-block-wrapper").removeAttr("data-display-index");
        wrapper.find(".detail-block-wrapper.display-filter").each(function (idx) {
            $(this).attr("data-display-index", idx);
        });

    };

    my.init = function (bannerImgList) {
        // bannerImagesList = bannerImgList;

        setTimeout(function () {
            window.scrollTo(0,1);
        }, 0);

        $("body").addClass("page-ready");
        $("body").foundation();

        func.galleryBlockHandler().done(function () {
            func.galleryModule();
        });

        // func.detailBlockHandler(true);
        func.eventHandler();
        func.sliderFilter();
        func.filterDetail();
        // func.applyFilter("boheme");
        $('.banner-scroll-down-btn').click(function() {
            var windowH = $(window).outerHeight();
            $('html, body').animate({ scrollTop: windowH.offset().top }, 2000);
            return false;
        });
    };

    return my;
})(Main || {});

jQuery(document).ready(function ($) {

    $(window).load(function () {
        $(".loaded").fadeOut();
        $(".preloader").delay(1000).fadeOut("slow");
    });




    jQuery('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 2000);
        return false;
    });

    jQuery('.nav a').bind('click', function () {
        $('html , body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 80
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    jQuery(window).scroll(function () {
        var top = jQuery(document).scrollTop();
        var height = 300;
        //alert(batas);

        if (top > height) {
            jQuery('.navbar-fixed-top').addClass('menu-scroll');
        } else {
            jQuery('.navbar-fixed-top').removeClass('menu-scroll');
        }
    });
    // Scroll up

    $(window).scroll(function(){
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });

    new WOW().init();

});